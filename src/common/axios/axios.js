import axios from 'axios'
import qs from 'qs'

// 创建实列， 设置自定义实列默认值
const instance = axios.create({
	baseURL: '',
	timeout: 1000,
	headers: {'X-Requested-With': 'XMLHttpRequest'}
})
instance.defaults.timeout = 2000 // 优先级高于自定义

// requets拦截 根据返回情况统一弹出信息处理
instance.interceptors.request.use((config) => {
	config.data = JSON.stringify(config.data)
	config.headers = {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
	console.log(config)
	return config
}, (error) => {
	return Promise.reject(error)
})
// response拦截
instance.interceptors.response.use((response) => {
	console.log(response)
	return response
}, (error) => {
	return Promise.reject(error)
})

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err.data)
		})
	})
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, qs.stringify(data))
			.then(response => {
			resolve(response.data)
			}, err => {
			reject(err)
		})
	})
}

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
	return new Promise((resolve, reject) => {
	axios.patch(url, data)
		.then(response => {
		resolve(response.data)
		}, err => {
		reject(err)
		})
	})
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
	axios.put(url, data)
		.then(response => {
		resolve(response.data)
		}, err => {
		reject(err)
	})
	})
}
