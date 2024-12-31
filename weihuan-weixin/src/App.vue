<script>
// 路由返回键拦截器
import addRouteInterceptor from '@/utils/interceptor.js';
// 版本更新
import autoUpdate from '@/utils/update.js';

export default {
	onLaunch: function () {
		// 获取胶囊坐标
		const getMenuButton = uni.getStorageSync('menuButton');
		if (!getMenuButton) {
			// 获取胶囊信息api
			const res = uni.getMenuButtonBoundingClientRect();
			uni.setStorageSync('menuButton', res);
		}

		// 获取设备信息
		const getSystem = uni.getStorageSync('system');
		if (!getSystem) {
			uni.getSystemInfo({
				success: function (res) {
					uni.setStorageSync('system', res);
				}
			});
		}

		// 路由拦截
		addRouteInterceptor();
		// 更新
		autoUpdate();
	},
	onShow: function () {},
	onHide: function () {}
};
</script>

<style lang="scss">
@import url('/src/static/font/iconfont.css');
@import '@/uni_modules/uv-ui-tools/index.scss';

view,
scroll-view {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

image {
	height: auto;
	vertical-align: bottom;
}

.default_title {
	color: #fff;
}

.head {
	.title {
		font-size: 28rpx;
		font-weight: bold;
	}
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

.navigation_wrap {
	display: inline-block;

	.navigation {
		display: flex;
		text-align: center;
		border-radius: 24rpx 6rpx;
		overflow: hidden;
		margin-left: 20rpx;

		.navigation_btn {
			min-width: 134rpx;
			height: 56rpx;
			line-height: 56rpx;
			font-size: 24rpx;
			font-weight: 500;
			padding: 0 30rpx;
			color: #000;
			border-radius: 24rpx 6rpx;
		}

		.active {
			background: linear-gradient(257.93deg, #fdb681 0%, #ff8992 100%);
			color: #fff;
		}
	}
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
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		padding-left: 20rpx;
		height: 56rpx;
		line-height: 56rpx;
	}
}

.location {
	transition: 0.3s ease;
}

button {
	&::after {
		content: '';
		display: none;
	}

	&::before {
		display: none;
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
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 50rpx;
	}

	button {
		height: 100%;
		line-height: 80rpx;
		background: none;
		font-size: 30rpx;
		color: #fff;
		&::after {
			display: none;
		}
	}
}
.multi {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.btn {
		width: 48%;
	}

	.del {
		background: #dfdfdf;
	}
}

.head_title {
	font-size: 28rpx;
	line-height: 38rpx;
	color: #111;
	font-weight: bold;
	margin-bottom: 20rpx;
}

.line_title {
	position: relative;
	padding-left: 26rpx;
	font-size: 30rpx;
	font-weight: bold;
	color: #373737;
	padding-bottom: 20rpx;
	&::after {
		content: '';
		position: absolute;
		top: 2rpx;
		left: 0;
		width: 12rpx;
		height: 32rpx;
		border-radius: 6px;
		background: linear-gradient(92.65deg, #ff8992 0%, #fdba80 100%);
	}
}

.card_box {
	padding: 30rpx;
	background: #fff;
	margin-bottom: 30rpx;
	overflow: hidden;
	.title {
		font-size: 30rpx;
		font-weight: 600;
		padding-bottom: 30rpx;
	}

	.lead {
		font-size: 30rpx;
		line-height: 40rpx;
		color: #000;
		font-weight: 500;
	}

	.li {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		.name {
			font-size: 28rpx;
			color: #707070;
			font-weight: 500;
		}

		.val {
			font-size: 26rpx;
			color: #000;
			font-weight: 500;
		}
	}
}

.animate {
	transition: 0.4s ease;
}

.recomment_title {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 30rpx 0;
	.line {
		width: 150rpx;
		height: 1px;
		background: #c1c1c1;
	}

	.title {
		font-size: 30rpx;
		font-weight: bold;
		margin: 0 20rpx;
		padding: 0 10rpx;
		position: relative;
		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -2rpx;
			width: 100%;
			height: 20rpx;
			background: #f8c5cc;
			z-index: -1;
		}
	}
}
</style>
