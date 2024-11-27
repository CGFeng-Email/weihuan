// 全局请求封装
const base_url = 'http://test.cnmaris.cn';

// 需要修改token，和根据实际修改请求头
function request(params) {
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let header = {}

	if (method == "post") {
		header = {
			'Content-Type': 'application/json'
		};
	}

	// 获取本地token
	if (uni.getStorageSync("token")) {
		header['Authorization'] = 'Bearer ' + uni.getStorageSync("token");
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url + url,
			method: method,
			header: header,
			data: data,
			success: (response) => {
				const res = response;
				// 根据返回的状态码做出对应的操作
				console.log(res.statusCode);
				if (res.statusCode == 200) {
					resolve(res.data);
				} else {
					// 清理本地缓存
					// uni.clearStorageSync();
					switch (res.statusCode) {
						case 401:
							console.log('没有权限，请登录');
							// 如果不是弹窗，可以直接跳转到登录页
							reject('401');
							break;
						case 404:
							console.log('接口不存在');
							uni.showToast({
								title: '请求地址不存在...',
								icon: 'none',
								duration: 2000,
							})
							reject('404');
							break;
						case 500:
						case 501:
						case 503:
							console.log('接口异常500', res.data);
							uni.showToast({
								title: '出现异常错误',
								icon: 'none',
								duration: 2000,
							})
							reject('500');
							break;
						default:
							uni.showToast({
								title: '请重试...',
								duration: 2000,
							})
							break;
					}
				}
			},
			fail: (err) => {
				console.log(err)
				if (err.errMsg.indexOf('request:fail') !== -1) {
					wx.showToast({
						title: '网络异常',
						icon: 'none',
						duration: 2000
					})
				} else {
					wx.showToast({
						title: '未知异常',
						icon: 'none',
						duration: 2000
					})
				}
				reject(err);
			},
			complete() {
				// 不管成功还是失败都会执行
				uni.hideLoading();
				uni.hideToast();
			}
		});
	})
};

export default request