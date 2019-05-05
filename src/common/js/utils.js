/**
* 解析url所有参数以对象形式解析
* @example ?id=123&a=1
* @return Object {id:123,a:1}
*/
function urlParam() {
	let url = window.location.search
	let obj = {}
	let reg = /[?&][^?&]+=[^?&]+/g
	let arr = url.match(reg)
	if (arr) {
		arr.forEach((item) => {
			let tempArr = item.substring(1).split('=')
			let key = decodeURIComponent(tempArr[0])
			let val = decodeURIComponent(tempArr[1])
			obj[key] = val
		})
	}
	return obj
}
/* 獲取URL查詢參數指定name */
function getSearch(param) {
	var search = location.search.substr(1)
	var locate = search.search(param)
	var paramString = ''
	if (locate !== -1) {
		var searchRest = search.substr(locate)
		var len = searchRest.length
		var and = searchRest.search('&')
		if (and === -1) {
			paramString = searchRest.substr(param, len)
		} else {
			paramString = searchRest.substr(param, and)
		}
		var paramArray = paramString.split('=')
		return paramArray[1]
	} else {
		return false
	}
}

/* 返回错误信息弹出，需配合reset.css */
function showBackMsg(data) {
	var $body = document.body
	var $div = document.createElement('div')
	$div.innerText = data
	$div.className = 'errorMsg'
	$body.appendChild($div)
	var $errorMsg = document.getElementsByClassName('errorMsg')
	if ($errorMsg) {
		setTimeout(function() {
			$errorMsg[0].parentNode.removeChild($errorMsg[0])
		}, 1500)
	}
}

/* 獲取并展示上傳圖片 */
/* 说明：fileInput為input:file文檔元素,img為img文檔元素 */
function showImg(fileInput, img) {
	var file = fileInput.files[0]
	if (window.FileReader) {
		var reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = function(e) { // 監聽文件讀取后
			img.setAttribute('src', e.target.result)// e.target.result就是最後的路徑地址
		}
   }
}

/* 將圖片轉化成dataUrl模式 */
function getImgBase64(path, callback) {
	console.log(path)
	var img = new Image()
	img.src = path
	img.onload = function() { // 圖片加載完後觸發
		var canvas = document.createElement('canvas')
		var ctx = canvas.getContext('2d') // 獲取繪畫上下文
		var imgWidth = img.width // 獲取圖片寬度
		var imgHeight = img.height // 獲取圖片高度
		canvas.width = imgWidth // 設置幕布高度
		canvas.height = imgHeight // 設置幕布寬度
		ctx.drawImage(img, 0, 0, imgWidth, imgHeight) // 繪製圖片
		var dataUrl = canvas.toDataURL('image/jpeg') // 繪製圖片
		callback ? callback(dataUrl) : ''
	}
}

/* 複製對象 */
function cloneObject(obj) {
	var newObj = {}
	for (var item in obj) { newObj[item] = obj[item] }
	return newObj
}

/* 複製HTML元素 */
/* **** 導出到Vue **** */
/* main.js中引入
* import utils from './common/js/utils.js'
* Vue.use(utils)
*/
export default {
	install(Vue, options) {
		Vue.prototype.$_urlParam = urlParam
		Vue.prototype.$_showImg = showImg
		Vue.prototype.$_showBackMsg = showBackMsg
		Vue.prototype.$_getSearch = getSearch
		Vue.prototype.$_getImgBase64 = getImgBase64
		Vue.prototype.$_cloneObject = cloneObject
	}
}
