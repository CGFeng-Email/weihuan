// 格式化时间插件
import dayjs from "dayjs";
import moment from "moment";

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

// times: 时间戳
// type： 格式
function formatTime(times, type) {
	// 转化成数字类型
	let timeNumber = parseInt(times);

	// 数字类型无法直接通过length获取长度
	// 如果长度是10那就是秒数
	if (String(times).length == 10) {
		// 统一使用豪秒数来处理时间戳，秒数：10位，毫秒13位
		timeNumber = timeNumber * 1000;
	}

	// 默认解析格式
	let formatString = "YYYY-MM-DD HH:mm:ss";
	if (type) {
		formatString = type
	}

	// 转化
	let date = dayjs(timeNumber).format(formatString);
	return date;
}

// 将时间转化成时间戳
function timestamp(date) {
	// 当前秒时间戳 moment().unix()
	// 当前豪秒时间戳 moment().valueOf()
	const currentTimestamp = moment().valueOf();
	// console.log('当前豪秒时间戳', currentTimestamp);

	// moment()方法将日期或时间字符串转换为Moment对象
	// unix()秒时间戳
	// valueOf()毫秒时间戳
	const timestamp = moment(date).valueOf();
	// console.log('有效毫秒时间戳', timestamp);
	const returnTime = timestamp - currentTimestamp;
	// console.log('returnTime', returnTime);
	// console.log('转化后有效支付秒', timestamp);
	// const time = moment(returnTime).format('HH时mm分');
	// 得到小时
	const totalHours  = moment.duration(returnTime).asHours();
	// 把小时取整
	const hours = Math.floor(totalHours);
	//  获取分钟部分：先获取剩余的小数部分小时（即总小时数减去整数小时部分），然后将这部分小数小时乘以 60 就可以得到对应的分钟数，示例代码如下：
	let minutes = Math.round((totalHours - hours) * 60);
	
	return `${hours}时${minutes}分`
}

export {
	PriceZero,
	MobileEncryption,
	imageBase64,
	substrText,
	formatTime,
	timestamp
}