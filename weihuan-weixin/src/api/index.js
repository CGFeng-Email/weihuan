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

// 用户信息
export const getUserData = (params) => {
	return request({
		url: '/mini/user/getUserInfo',
		method: 'post',
		data: params
	})
}


// 获取设备经纬度
export const getPhoneLocation = () => {
	return request({
		url: '/mini/common/getLocation',
		method: 'get'
	})
}

// 上传图片
export const uploadImg = (params) => {
	return request({
		url: '/mini/upload/image',
		method: 'post',
		data: params
	})
}

// 修改用户信息
export const editUserData = (params) => {
	return request({
		url: '/mini/user/saveUserInfo',
		method: 'post',
		data: params
	})
}