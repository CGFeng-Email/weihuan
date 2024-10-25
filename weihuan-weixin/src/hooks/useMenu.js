// 获取小程序顶部胶囊数据，存储到缓存里
function useMenuButton() {
	const getMenuButton = uni.getStorageSync('menuButton');
	const top = getMenuButton.top + 'px';
	const bottom = getMenuButton.bottom + 'px';
	const left = (getMenuButton.left - 20) + 'px';
	const width = getMenuButton.width + 'px';
	const height = (getMenuButton.height + 6) + 'px';
	// 占位符高度
	const topView = (getMenuButton.height + 6) + getMenuButton.top + 'px';
	// 订单页 导航栏的top高度
	const navigateTop =  (getMenuButton.height + 6) + getMenuButton.top + 40 + 'px';
	// 订单页 顶部占位
	const orderView = (getMenuButton.height + 6) + getMenuButton.top + 40 + 42 + 'px';
	return {
		top,
		bottom,
		left,
		width,
		height,
		topView,
		navigateTop,
		orderView
	}
}

export default useMenuButton