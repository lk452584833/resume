import MessageSure from './MessageSure.vue'

const MSG = {
	animateTime: 500, // 弹窗出现，隐藏的动画时间
	defaultTitle: '操作提示:', // 默认提示
	install(Vue, options) {
		if (typeof window !== 'undefined' && window.Vue) {
			Vue = window.Vue
		}
		Vue.component('messagesure', MessageSure) // 全局注册模板
		function BackMsg(text, callBack) {
			let words, titlemsg // 弹窗信息，弹出头部
			if (typeof text === 'string') {
				words = text
				titlemsg = MSG.defaultTitle // string,使用默认titlText
			} else if (text instanceof Object) { // 参数是个对象
				words = text.text || ''
				if ((typeof text.titleText) === 'undefined') { // 参数是个对象的情况下，不存在titleText属性时，使用默认
					titlemsg = MSG.defaultTitle
				} else {
					titlemsg = text.titleText || '' // 存在titleText 属性时，(空的话，表示子组件,title隐藏)
				}
			}
			let VueMsg = Vue.extend({
				render(h) {
					return h('messagesure', {
						props: {
							text: words,
							titleText: titlemsg,
							show: this.show
						},
						on: {
							msgcancel: function() {
								vm.show = false
								let t1 = setTimeout(() => {
									clearTimeout(t1)
									document.body.removeChild(el)
									vm = null
								}, MSG.animateTime)
							},
							msgsure: function() { // 动画效果过后，清除元素，调用回调
								vm.show = false
								let t2 = setTimeout(() => {
									clearTimeout(t2)
									document.body.removeChild(el)
									vm = null
									callBack && (typeof callBack === 'function') && callBack()
								}, MSG.animateTime)
							}
						}
					})
				},
				data() {
					return {
						show: false
					}
				}
			})
			let VueOneMsg = new VueMsg()
			let vm = VueOneMsg.$mount()
			let el = vm.$el
			document.body.append(el)
			vm.show = true
			// 显示之后操作，根据组件方法，取消，确认
		}
		Vue.prototype.$_messagesure = BackMsg
	}
}

export default MSG
