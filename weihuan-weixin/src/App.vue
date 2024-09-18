<script>
export default {
	onLaunch: function () {
		// 获取胶囊坐标
		const getMenuButton = uni.getStorageSync('menuButton');
		if (!getMenuButton) {
			// 获取胶囊信息api
			const res = uni.getMenuButtonBoundingClientRect();
			uni.setStorageSync('menuButton', res);
		}
	},
	onShow: function () {},
	onHide: function () {}
};
</script>

<style>
view {
	padding: 0;
	margin: 0;
}

.page_title {
	text-align: center;
	font-size: 36rpx;
	font-weight: 500;
	color: #fff;
}

</style>
