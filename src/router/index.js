import Vue from 'vue'
import VueRouter from 'vue-router'
import Projects from '@/components/projects/projects'
import Works from '@/components/works/works'
import Info from '@/components/info/info'
Vue.use(VueRouter)

const routes = [
	{path: '/projects', component: Projects},
	{path: '/works', component: Works},
	{path: '/info', component: Info}
]

export default new VueRouter({
	routes: routes,
	linkActiveClass: 'active'
})
