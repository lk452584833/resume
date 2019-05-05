import MessageSure from './MessageSure.vue'

const MSG = {
	animateTime: 1000 ,// 动画,组件切换的的动画时间
	install(Vue, options) {
		if (typeof window !== 'undefined' && window.Vue) {
			Vue = window.Vue
		}
		Vue.components('messagesure', MessageSure) // 全局注册模板
		
		function BackMsg(text, callBack) {
			let words
			let animateTime = MSG.animateTime
			if (typeof text === 'string') {
				words = text
			} else if (text instanceof Object) {
				words = text.text || ''
				if (text.animateTime) {
					animateTime = text.animateTime
				}
			}
			let VueMsg = new Vue.extend({
				render(createElement) {
					let props = {
						text: words,
						show: this.show
					}
					return createElement('messagesure', {
						props: props
					})
					
				},
				data() {
					return {
						show: false
					}
				}
			})
			
		}
		
		
		Vue.prototype.$_messagesure = BackMsg
	}
}

export default MSG