import request from "./request";

// 首页轮播图
export const getIndexBanner = () => {
	return request({
		url: '/mini/ad/getList',
		method: 'get',
	})
}

// 微信登录
export const wxLogin = (params) => {
	return request({
		url: '/mini/user/getOpenidByCode',
		method: 'post',
		data: params
	})
}

// 手机号登录
export const phoneLogin = (params) => {
	return request({
		url: '/mini/user/login',
		method: 'post',
		data: params
	})
}