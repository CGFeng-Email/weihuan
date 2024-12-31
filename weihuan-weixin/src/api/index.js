import request from "./request";

// 首页轮播图
export const getBanner = (params) => {
	return request({
		url: '/mini/ad/getList',
		method: 'post',
		data: params
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

// 领劵中心 分页
export const couponCenterList = (params) => {
	return request({
		url: '/mini/coupon/getList',
		method: 'post',
		data: params
	})
}

// 领取优惠券
export const getCoupon = (params) => {
	return request({
		url: '/mini/coupon/receive',
		method: 'post',
		data: params
	})
}

// 我的优惠券
export const myCoupon = (params) => {
	return request({
		url: '/mini/coupon/mine',
		method: 'post',
		data: params
	})
}

// 优惠券列表
export const collectList = (params) => {
	return request({
		url: '/mini/goods/collectList',
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

// 自提点详情
export const storeDetails = (params) => {
	return request({
		url: '/mini/store/detail',
		method: 'post',
		data: params
	})
}

// 商品分类
export const classifyList = (params) => {
	return request({
		url: '/mini/goods/getGoodsCate',
		method: 'get',
		data: params
	})
}

// 商品列表
export const shoppingList = (params) => {
	return request({
		url: '/mini/goods/getList',
		method: 'post',
		data: params
	})
}

// 公共数据
export const commonData = () => {
	return request({
		url: '/mini/common/getOpts',
		method: 'post'
	})
}

// 商品详情
export const goodsDetails = (params) => {
	return request({
		url: '/mini/goods/detail',
		method: 'post',
		data: params
	})
}

// 商品规格
export const shoppingSpecification = (id, mod_id) => {
	return request({
		url: `/mini/goods/getGoodsSpec?goods_id=${id}&mod_id=${mod_id}`,
		method: 'get',
	})
}

// 选中的规格获取价格
export const selectSpecification = (params) => {
	return request({
		url: '/mini/goods/getSpecPrice',
		method: 'post',
		data: params
	})
}

// 立即购买
export const immedPayment = (params) => {
	return request({
		url: '/mini/order/buy',
		method: 'post',
		data: params
	})
}

// 加入购物车
export const addCart = (params) => {
	return request({
		url: '/mini/cart/add',
		method: 'post',
		data: params
	})
}

// 最近自提点
export const nearStore = (params) => {
	return request({
		url: '/mini/store/getRecentStore',
		method: 'post',
		data: params
	})
}

// 订单支付
export const OrderPayment = (params) => {
	return request({
		url: '/mini/order/pay',
		method: 'post',
		data: params
	})
}

// 添加收藏，取消收藏
export const isCollect = (params) => {
	return request({
		url: '/mini/goods/setCollect',
		method: 'post',
		data: params
	})
}

// 购物车
export const getCartList = (params) => {
	return request({
		url: '/mini/cart/getList',
		method: 'post',
		data: params
	})
}
// 购物车删除商品
export const delCartShopping = (params) => {
	return request({
		url: '/mini/cart/clear',
		method: 'post',
		data: params
	})
}

// 修改购物车商品数量
export const editCartShopping = (params) => {
	return request({
		url: '/mini/cart/change',
		method: 'post',
		data: params
	})
}

// 订单列表
export const orderList = (params) => {
	return request({
		url: '/mini/order/getList',
		method: 'post',
		data: params
	})
}

// 订单详情
export const orderDetails = (params) => {
	return request({
		url: '/mini/order/detail',
		method: 'post',
		data: params
	})
}

// 取消订单
export const cancelOrder = (params) => {
	return request({
		url: '/mini/order/cancel',
		method: 'post',
		data: params
	})
}

// 查询物流
export const inquireLogistics = (params) => {
	return request({
		url: '/mini/order/express',
		method: 'post',
		data: params
	})
}

// 确认收货
export const confirmRecelve = (params) => {
	return request({
		url: '/mini/order/confirm',
		method: 'post',
		data: params
	})
}

// 申请售后
export const applyFor = (params) => {
	return request({
		url: '/mini/refund/apply',
		method: 'post',
		data: params
	})
}

// 订单核销码
export const orderCode = (params) => {
	return request({
		url: '/mini/order/qrcode',
		method: 'post',
		data: params
	})
}

// 立即核销
export const scanCode = (params) => {
	return request({
		url: '/mini/order/getScanOrder',
		method: 'post',
		data: params
	})
}

// 取消售后
export const cancelApplyFor = (params) => {
	return request({
		url: '/mini/refund/cancel',
		method: 'post',
		data: params
	})
}

// 会员中心
export const memberCenter = (params) => {
	return request({
		url: '/mini/user/userCenter',
		method: 'post',
		data: params
	})
}

// 申请svip
export const applyVip = (params) => {
	return request({
		url: '/mini/user/applySvip',
		method: 'post',
		data: params
	})
}

// 核销列表
export const codeList = (params) => {
	return request({
		url: '/mini/extract/getList',
		method: 'post',
		data: params
	})
}

// 申请开票
export const applyInvoice = (params) => {
	return request({
		url: '/mini/invoice/apply',
		method: 'post',
		data: params
	})
}

// 未开发票订单
export const invoiceOrderList = (params) => {
	return request({
		url: '/mini/invoice/getNotInvoiceOrder',
		method: 'post',
		data: params
	})
}

// 发送验证码
export const sendMobileCode = (params) => {
	return request({
		url: '/mini/user/sendCode',
		method: 'post',
		data: params
	})
}

// 确认核销
export const orderVerification = (params) => {
	return request({
		url: '/mini/order/extract',
		method: 'post',
		data: params
	})
}