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
@import url('/src/static/font/iconfont.css');
view {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

image {
	height: auto;
}

.over1 {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.over2 {
	display: -webkit-box;
	word-break: break-all;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	text-overflow: ellipsis;
}

.over3 {
	display: -webkit-box;
	word-break: break-all;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
	text-overflow: ellipsis;
}

.top {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 10;
	background: transparent;
}

.page_title {
	text-align: center;
	font-size: 32rpx;
	font-weight: 500;
	color: #000;
	position: fixed;
	left: 0;
	width: 100%;
	z-index: 10;
	background: transparent;
}
</style>
