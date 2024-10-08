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

<style lang="scss">
@import url('/src/static/font/iconfont.css');
view {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

image {
	height: auto;
	vertical-align: bottom;
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
	transition: 0.3s ease;
}

.page_title {
	text-align: center;
	font-size: 28rpx;
	font-weight: 500;
	color: #000;
	position: fixed;
	left: 0;
	width: 100%;
	z-index: 10;
	background: transparent;
	transition: 0.3s ease;
	
	.return_icon {
		position: absolute;
		left: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		padding-right: 30rpx;
	}
}

.btn_bg {
	background: linear-gradient(257.93deg, #fdb681 0%, #ff8992 100%);
}

.disabled_bg {
	background: #c1c1c1;
	color: #000 !important;
	&::after {
		display: none;
	}
}

.box_shadow {
	box-shadow: 0 0 6rpx rgba(0, 0, 0, 0.1);
}

.box_border_radius {
	border-radius: 12rpx;
}

.fixed_bottom_btn {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 30rpx 30rpx 50rpx;
	background: #fff;
	z-index: 20;
	.btn {
		overflow: hidden;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 45rpx;
	}

	button {
		height: 100%;
		line-height: 100rpx;
		background: none;
		font-size: 30rpx;
		color: #fff;
	}
}
</style>
