// api 层，统一管理接口调用
import {get} from './axios.js'

// 组件直接导入 import {getWork} from '@/common/axios/api'
// 使用 getWork().then()
export const getWork = function(data) {
	return get('/api/works', data)
}
export const getInfo = function(data) {
	return get('/api/info', data)
}
export const getProjects = function(data) {
	return get('/api/projects', data)
}

// 挂载到vue原型上，暴露接口,main.js 引入。
// 全局使用:  this.$_axios.getWork().then()
export default {
	install(Vue, options) {
		Vue.prototype.$_axios = {
			getWork: function(data) {
				return get('/api/works', data)
			},
			getInfo: function(data) {
				return get('/api/info', data)
			},
			getProjects: function(data) {
				return get('/api/projects', data)
			}
		}
	}
}
