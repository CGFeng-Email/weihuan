// 全局请求封装
const base_url = 'https://test.cnmaris.cn';

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
		
		// 获取本地token
		if (uni.getStorageSync("token")) {
			data.token = uni.getStorageSync("token");
			// header['Authorization'] = 'Bearer ' + uni.getStorageSync("token");
		}
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url + url,
			method: method,
			header: header,
			data: data,
			success: (res) => {
				// 根据返回的状态码做出对应的操作
				if (res.statusCode == 200) {
					switch (res.data.code) {
						case -1:
							// 没有权限
							resolve('401');
							break;
						case 0:
							// 异常
							// uni.showToast({
							// 	title: res.data.msg,
							// 	icon: 'none',
							// 	mask: true,
							// 	success: () => {
									
							// 	}
							// })
							resolve(res.data);
							break;
						case 1:
							// 成功
							resolve(res.data);
							break;
					}
				}
			},
			fail: (err) => {
				console.log('接口异常', err)
				if (err.errMsg.indexOf('request:fail') !== -1) {
					wx.showToast({
						title: '网络异常',
						icon: 'none',
						mask: true
					})
				} else {
					wx.showToast({
						title: '未知异常',
						icon: 'none',
						mask: true
					})
				}
				reject(err);
			}
		});
	})
};

export default request