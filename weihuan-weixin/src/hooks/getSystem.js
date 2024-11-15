// 获取设备信息
function getSystem() {
	const getSystem = uni.getStorageSync('system');
	// 屏幕高度
	const screenHeight = getSystem.screenHeight;
	return {
		screenHeight
	}
}

export default getSystem