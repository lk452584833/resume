const state = { // 要设置的全局访问的state对象
	userInfo: {
		username: '李凯',
		telphone: '13802545044'
	},
	mystar: 2.5
}
const getters = { // 实时监听state值的变化(最新状态)
	myStar(state) { // 方法名随意,主要是来承载变化的mystar的值
		return state.mystar
	}
}
const mutations = { // 一个对象，里面可以放改变state的初始值的方法
	mystar(state, num) { // 参数除了state之外还可以再传额外的参数(变量或对象);
		state.mystar = num
	}
}
const actions = { // 是个对象变量，最大的作用就是里面的Action方法 可以包含任意异步操作，这里面的方法是用来异步触发mutations里面的方法
	addmystar(context, num) { // 自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
		context.commit('mystar', num)
	}
}
export default{
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
