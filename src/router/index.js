import Vue from 'vue'
import VueRouter from 'vue-router'
// import Projects from '@/components/projects/projects'
// import Works from '@/components/works/works'
// import Info from '@/components/info/info'
Vue.use(VueRouter)

// const routes = [
// 	{path: '/projects', component: Projects},
// 	{path: '/works', component: Works},
// 	{path: '/info', component: Info}
// ]

const routes = [
	{path: '/projects', component: () => import('@/components/projects/projects')},
	{path: '/works', component: () => import('@/components/works/works')},
	{path: '/info', component: () => import('@/components/info/info')}
]

export default new VueRouter({
	routes: routes,
	// mode: 'history',
	linkActiveClass: 'active'
})
