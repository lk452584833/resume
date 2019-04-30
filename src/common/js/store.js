/**
 * 存储localStorage
 * id, key, val @example 1,favorite,true ,3,favorite,true ,
 * @example  => {"1":{"favorite":true},"2":{"favorite":true}}
 * */
export function saveToLocal(id, key, val) {
	let seller = window.localStorage._info_
	if (!seller) {
		seller = {}
		seller[id] = {}
	} else {
		seller = JSON.parse(seller)
		if (!seller[id]) {
			seller[id] = {}
		}
	}
	seller[id][key] = val
	window.localStorage._info_ = JSON.stringify(seller)
}
/**
 * 获取localStroage
 *  @example loadFromLocal(1,'favorite', false)  => true
 * */
export function loadFromLocal(id, key, def) {
	let seller = window.localStorage._info_
	if (!seller) {
		return def
	}
	seller = JSON.parse(seller)[id]
	if (!seller) {
		return def
	} else {
		return seller[key] || def
	}
}
