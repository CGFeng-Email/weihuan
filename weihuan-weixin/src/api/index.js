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

// 添加/编辑收货地址
export const addShoppingAddress = (params) => {
	return request({
		url: '/mini/address/addEdit',
		method: 'post',
		data: params
	})
}

// 获取收货地址列表
export const getShoppingAddress = (params) => {
	return request({
		url: '/mini/address/getList',
		method: 'post',
		data: params
	})
}

// 收货地址详情
export const shoppingAddressDetails = (params) => {
	return request({
		url: '/mini/address/detail',
		method: 'post',
		data: params
	})
}

// 删除收货地址
export const delShoppingAddress = (params) => {
	return request({
		url: '/mini/address/delete',
		method: 'post',
		data: params
	})
}

// 公告列表
export const noticeList = () => {
	return request({
		url: '/mini/notice/getList',
		method: 'get'
	})
}

// 公共详情
export const noticeDetails = (id) => {
	return request(({
		url: '/mini/notice/detail?id=' + id,
		method: 'get'
	}))
}

// 领劵中心
export const couponCenter = (params) => {
	return request({
		url: '/mini/coupon/index',
		method: 'post',
		data: params
	})
}

// 领取优惠卷
export const getCoupon = (params) => {
	return request({
		url: '/mini/coupon/receive',
		method: 'post',
		data: params
	})
}

// 我的优惠卷
export const myCoupon = (params) => {
	return request({
		url: '/mini/coupon/mine',
		method: 'post',
		data: params
	})
}

// 自提点列表
export const storeList = (params) => {
	return request({
		url: '/mini/store/getNearByStore',
		method: 'post',
		data: params
	})
}