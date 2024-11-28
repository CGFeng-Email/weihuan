// 价格后面补12.00操作
function PriceZero(price) {
	var num = parseFloat((price).toFixed(10));
	var s = num.toString();
	var rs = s.indexOf('.');

	// 没有小数点时：
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s
}

// 手机号加密
function MobileEncryption(mobile) {
	if (mobile) {
		return mobile?.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
	} else {
		return '/'
	}
}

// Base64
function imageBase64(url, type) {
	return new Promise((resolve, reject) => {
		uni.getFileSystemManager().readFile({
			filePath: url, //选择图片返回的相对路径
			encoding: 'base64', //编码格式
			success: res => {
				resolve('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
				// resolve(res.data);
			},
			fail: res => reject(res.errMsg)
		})
	})
}

// 截取指定字符后面的字符
function substrText(text, type) {
	const index = text.indexOf(`${type}`);
	const result = text.substr(index + 1, text.length);
	return result
}

export {
	PriceZero,
	MobileEncryption,
	imageBase64,
	substrText
}