import Vue from 'vue'
import VueRouter from 'vue-router'
import { initMenu } from '../utils/menus'
Vue.use(VueRouter)
const routes = [
	{
		path: '/',
		name: 'Login',
		component: () => import('../views/Login.vue'),
		hidden: true
	}
]
const router = new VueRouter({
	mode: 'hash',
	routes
})
router.beforeEach((to, from, next) => {
	if (localStorage.getItem('tokenStr')) {
		initMenu(router)
		if (!localStorage.getItem('user')) {
			// 如果没有用户信息就掉接口获取用户信息并存入localStorage
			let data = {
				id: 1,
				name: '系统管理员',
				phone: '15387116515',
				address: '湖北省武汉市',
				username: 'admin',
				userFace: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww1.sinaimg.cn%2Fmw690%2F001Qudtlly1gyzcj8dwb7j60mr0qrac002.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650025665&t=e3090d6dc00305e5cd512ff989d9b2a0'
			}
			return localStorage.setItem('user', JSON.stringify(data)), next()
		}
		next()
	} else {
		if (to.path == '/') {
			next()
		} else {
			next('/?redirect=' + to.path)
		}
	}
})
export default router
