import axios from 'axios'
import qs from 'qs'

// 创建实列， 设置自定义实列默认值。 创建不同实列处理(如果有多个请求地址，并且它们的请求和响应不同)
const instance = axios.create({
	baseURL: '/api',
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
	return config
}, (error) => {
	return Promise.reject(error)
})
// response拦截
instance.interceptors.response.use((response) => {
	if (response.status === 200) {
		response.msg = '请求成功'
	}
	return response
}, (error) => {
	// 失败处理
	error.code = error.response.status
	switch (error.response.status) {
		case 400: error.message = '错误请求'
		break
		case 401: error.message = '未授权，请重新登录'
		break
		case 403: error.message = '拒绝访问'
		break
		case 404: error.message = '请求错误,未找到该资源'
		break
		case 405: error.message = '请求方法未允许'
		break
		case 408: error.message = '请求超时'
		break
		case 500: error.message = '服务器端出错'
		break
		case 501: error.message = '网络未实现'
		break
		case 502: error.message = '网络错误'
		break
		case 503: error.message = '服务不可用'
		break
		case 504: error.message = '网络超时'
		break
		case 505: error.message = 'http版本不支持该请求'
		break
		default: error.message = `连接错误${error.response.status}`
	}
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
		instance.get(url, {
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
		instance.post(url, qs.stringify(data))
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
	instance.patch(url, data)
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
	instance.put(url, data)
		.then(response => {
		resolve(response.data)
		}, err => {
		reject(err)
	})
	})
}
