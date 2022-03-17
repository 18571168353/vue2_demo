import store from '../store'
import { Post } from './api'
export const initMenu = (router) => {
	if (store.state.routes.lenght > 0) {
		// 如果存在路由则返回，不用初始化
		return
	}
	// 此rou为动态获取
	let rou = [
		{
			id: 1,
			path: '/home',
			component: 'Home',
			name: '员工资料',
			icon:'el-icon-s-custom',
			children: [
				{
					id: 11,
					path: '/emp/basic',
					name: '基本资料',
					component: 'EmpBasic',
					children: null
				},
				{
					id: 12,
					path: '/emp/adv',
					name: '高级资料',
					component: 'EmpAdv',
					children: null
				}
			]
		},
		{
			id: 2,
			path: '/home',
			component: 'Home',
			name: '人事管理',
			icon:'el-icon-s-management',
			children: [
				{
					id: 21,
					path: '/per/emp',
					name: '员工资料',
					component: 'PerEmp',
					children: null
				},
				{
					id: 22,
					path: '/per/ec',
					name: '员工奖惩',
					component: 'PerEc',
					children: null
				}
			]
		}
	]
	Post('/api/TokenAuth/Authenticate', {
		phoneNum: '15387116515',
		password: '123qwe',
		code: 'bb8a'
	})
		.then((res) => {
			// rou = res.data.result.bars
			if (rou) {
				// 格式化router
				let fmtRoutes = formatRoute(rou)
				// 添加到路由
				router.addRoutes(fmtRoutes)
				// 将数据存储到vuex
				store.commit('initRoutes', fmtRoutes)
			}
		})
		.catch((err) => {})
}

export const formatRoute = (routes) => {
	let fmtRoutes = []
	routes.forEach((router) => {
		let { path, component, name, children,icon } = router
		if (children && Array.isArray(children) && children.length > 0) {
			// 递归
			children = formatRoute(children)
		}
		let fmRouter = {
			path: path,
			name: name,
			icon:icon,
			children: children,
			component(resolve) {
				if (component.startsWith('Home')) {
					require(['../views/' + component + '.vue'], resolve)
				} else if (component.startsWith('Emp')) {
					require(['../views/emp/' + component + '.vue'], resolve)
				} else if (component.startsWith('Per')) {
					require(['../views/per/' + component + '.vue'], resolve)
				}
			}
		}
		fmtRoutes.push(fmRouter)
	})
	return fmtRoutes
}
