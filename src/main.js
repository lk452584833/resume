// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 加载模拟数据mock
import './mock'
// rest.css 和 icon.css
import '../static/css/reset.css'
import './common/css/icon.css'
import utils from './common/js/utils.js'
// 解决移动端300毫秒点击延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.use(utils)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
	store: store,
	data: {
		eventHub: new Vue()
	},
  components: { App },
  template: '<App/>',
  created() {
	router.push({path: '/projects'})
  }
})
