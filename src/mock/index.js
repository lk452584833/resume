const Mock = require('mockjs')
const appData = require('./json/person.json')
const info = appData.info
const projects = appData.projects
const works = appData.works
// Mock.mock('/api/seller', 'get', seller)
Mock.mock(/\/api\/info/, 'get', () => {
	return {
		errno: 0,
		data: info
	}
})
Mock.mock('/api/projects', 'get', () => {
	return {
		errno: 0,
		data: projects
	}
})
Mock.mock('/api/works', 'get', () => {
	return {
		errno: 0,
		data: works
	}
})
// 格式： Mock.mock( url, post/get , 返回的数据)
