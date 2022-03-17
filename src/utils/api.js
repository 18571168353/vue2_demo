import axios from 'axios' //引入axios
import { Message } from 'element-ui' //引入message
import router from '../router'
export const baseURL = 'http://101.133.234.110:24001'
const service = axios.create({
	baseURL
})
// 请求拦截器
service.interceptors.request.use(
	(config) => {
		if (localStorage.getItem('tokenStr')) {
			config.headers.Authorization = localStorage.getItem('tokenStr')
		}
		return config
	},
	(error) => {
	}
)

// 响应拦截器
service.interceptors.response.use(
	(success) => {
		//响应成功
		if (success.status && success.status == 200) {
			if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
				// 逻辑错误
				Message.error({ message: success.data.message })
			}
			if (success.data.message) {
				// 如果有提示信息就是弹出提示框
				Message.success({ message: success.data.message })
			}
		}
		return success.data
	},
	(error) => {
		//响应失败
		if (error.response.code == 504 || error.response.code == 404) {
			Message.error({ message: '网络连接失败！' })
		} else if (error.response.code == 403) {
			Message.error({ message: '权限不足,请联系管理员!' })
		} else if (error.response.code == 401) {
			Message.error({ message: '请登录！' })
			router.replace('/') //跳转登录页
		} else {
			if (error.replace.data.message) {
				//如果有错误信息则提示
				Message.error({ message: error.replace.data.message })
			} else {
				//没有错误信息提示未知错误
				Message.error({ message: '未知错误！' })
			}
		}
		return
	}
)

// post请求
export const Post = (url, params) => {
	return axios({
		method: 'post',
		url: `${baseURL}${url}`,
		data: params
	})
}

// put请求
export const Put = (url, params) => {
	return axios({
		method: 'put',
		url: `${baseURL}${url}`,
		data: params
	})
}

// get请求
export const Get = (url, params) => {
	return axios({
		method: 'get',
		url: `${baseURL}${url}`,
		data: params
	})
}

// delete请求
export const Delete = (url, params) => {
	return axios({
		method: 'delete',
		url: `${baseURL}${url}`,
		data: params
	})
}
