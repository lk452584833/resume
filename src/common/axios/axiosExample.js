import axios from 'axios'

//公用默认值设置
axios.defaults.baseURL = 'https://api.example.com'
axios.defaults.timeout = 1000
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 创建实列， 设置自定义实列默认值
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000, // 默认超时等待时间
  headers: {'X-Custom-Header': 'foobar'}
})
instance.defaults.timeout = 2500 // 优先级高于自定义中设置默认值
instance.get('url', {
  timeout: 5000 // 优先级最高
});

// Interceptors(拦截器)它们被处理之前，您可以拦截请求或响应then或catch。
// 拦截请求前
axios.interceptors.request.use((request) => {
	 // 在请求之前 do some things
    return request
}, (error) => {
	// 请求错误时 Do something
	return Promise.reject(error)
})
// 拦截响应
axios.intercepotrs.response.use(function(response) {
	 return response;
}, function(error) {
	return Promise.reject(error);
})

// 如果您可能需要稍后删除拦截器，则可以。
const  myInterceptor  =  axios.interceptors.request.use(function() {})
axios.interceptors.request.eject(myInterceptor)

// 可以将拦截器添加到AXIOS的自定义实例中。
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});