import Vue from 'vue'
import Vuex from 'vuex'
import myinfo from './myinfo'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		myinfo
	}
})
