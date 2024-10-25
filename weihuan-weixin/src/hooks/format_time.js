import dayjs from "dayjs";

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

export {
	formatTime
}