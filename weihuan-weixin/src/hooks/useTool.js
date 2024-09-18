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

export {
	PriceZero
}