import Vue from 'vue'
import VueRouter123 from 'vue-router'
import Resource from 'vue-resource'
import Projects from '@/components/projects/projects'
import Works from '@/components/works/works'
import Info from '@/components/info/info'

Vue.use(VueRouter123)
Vue.use(Resource)

const routes123 = [
	{path: '/projects', component: Projects},
	{path: '/works', component: Works},
	{path: '/info', component: Info}
]

export default new VueRouter123({
	routes: routes123,
	linkActiveClass: 'active'
})
