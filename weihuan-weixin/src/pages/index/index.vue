<template>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<uni-transition mode-class="fade" :show="loading">
		<view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
			{{ scrollTop != 'white_default' ? '炜洹商城' : '' }}
		</view>
	</uni-transition>
	<!-- 地址，搜索 -->
	<uni-transition mode-class="fade" :show="loading">
		<view :class="['location', scrollTop, scrollTop != 'white_default' ? 'scroll_loacation' : '']" :style="{ top: useMenuButton().topView }">
			<view class="address" @click="jump_selectAddress">
				<text class="iconfont icon-dizhi"></text>
				<text class="text">广州.荔湾</text>
			</view>
			<view class="search">
				<text class="iconfont icon-sousuo"></text>
				<text class="text">进口美国3A牛肉</text>
			</view>
		</view>
	</uni-transition>

	<div class="swiper_wrap">
		<uni-transition mode-class="fade" :show="loading">
			<!-- 轮播图 -->
			<swiper class="swiper_banner" autoplay :interval="5000" :duration="1000" circular>
				<block v-for="item in swiper_list" :key="item.src">
					<swiper-item class="swiper-item">
						<image class="cover" :src="item.src" mode="widthFix"></image>
					</swiper-item>
				</block>
			</swiper>
		</uni-transition>

		<!-- 用户信息 -->
		<uni-transition mode-class="fade" :show="loading">
			<view class="user" v-if="true">
				<view class="wrap">
					<image class="head_portrait" src="/src/static/img/head_portrait.png" mode="widthFix"></image>
					<view class="content">
						<view class="name">{{ user_title }}</view>
						<view class="lead">
							{{ user_lead }}
						</view>
					</view>
					<view class="login_btn">登录/注册</view>
				</view>
			</view>
			<view class="user" v-else>
				<view class="wrap">
					<view class="head_portrait">
						<image class="cover" src="/static/img/head_portrait.png" mode="widthFix"></image>
						<image class="vip" src="/static/img/head_vip.png" mode="widthFix"></image>
					</view>
					<view class="content">
						<view class="name">
							{{ user_title }}
							<image class="vip" src="/static/img/vip.png" mode="widthFix" lazy-load></image>
						</view>
						<view class="lead">
							<image class="phone" src="/src/static/img/phone.png" mode="widthFix" lazy-load></image>
							{{ userMobileComputed }}
						</view>
					</view>
					<image class="star_cover" src="/src/static/img/user_star.png" mode="widthFix"></image>
				</view>
			</view>
		</uni-transition>
	</div>

	<!-- 分发方式 -->
	<view class="distribute">
		<view class="wrap">
			<view class="type">
				<view class="box">
					<view class="title">自提点</view>
					<view class="lead">在线点单，到自提点取货</view>
					<view class="cover_box">
						<image class="cover" src="/src/static/img/store.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="box">
					<view class="title">物流配送</view>
					<view class="lead">在线点单，货物送到家</view>
					<view class="cover_box">
						<image class="cover" src="/src/static/img/truck.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="advertising">
				<uni-notice-bar
					scrollable
					showIcon
					single
					speed="80"
					background-color="#F1F1F1"
					color="#FD6F23"
					textColor="#000"
					text="精选猕猴桃，德国进口，新品上架，限时抢购"
				></uni-notice-bar>
			</view>
		</view>
	</view>

	<!-- 优惠卷 -->
	<uni-transition mode-class="slide-bottom" :show="loading">
		<view class="coupon">
			<swiper class="swiper_coupon" skip-hidden-item-layout autoplay :interval="5000" :duration="1000" :display-multiple-items="4" circular previous-margin="15px">
				<swiper-item class="item" v-for="(item, index) in 10" :key="index">
					<view class="box">
						<view class="ide">RMB</view>
						<view class="price">150</view>
						<view class="lead">满600可用</view>
						<view class="btn">立即领取</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</uni-transition>
	<!-- 分类 -->
	<uni-transition mode-class="fade" :show="loading">
		<view class="classify">
			<view class="wrap">
				<block v-for="item in classify_list" :key="item.src">
					<view class="item">
						<view class="cover_box">
							<image class="cover" :src="item.src" mode="widthFix" lazy-load></image>
						</view>
						<view class="title">{{ item.title }}</view>
					</view>
				</block>
			</view>
		</view>
	</uni-transition>
	<!-- 推荐 -->
	<uni-transition mode-class="fade" :show="loading">
		<view class="recommend">
			<swiper class="recommend_swiper" autoplay :interval="500000" :duration="1000" circular>
				<block v-for="item in recommend_list" :key="item.src">
					<swiper-item class="item">
						<image class="cover" :src="item.src" mode="aspectFit"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</uni-transition>
</template>

<script setup>
//onPageScroll:滚动事件
import { onPageScroll } from '@dcloudio/uni-app';
import { ref, computed, onMounted } from 'vue';
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
console.log('useMenuButton', useMenuButton());
// 页面加载
const loading = ref(false);
const user_title = ref('炜洹游客用户');
const user_lead = ref('为给您提供更好的服务请授权登录');
const user_mobile = ref('13428198898');

// 轮播图
const swiper_list = ref([
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/banner1.png'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/banner2.png'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/banner3.png'
	}
]);

// 分类列表
const classify_list = ref([
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify1.png',
		title: '海鲜优选'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify2.png',
		title: '进口肉类'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify3.png',
		title: '西式甜品'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify4.png',
		title: '精品果茶'
	}
]);

// 推荐列表
const recommend_list = ref([
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/recommend1.png'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/recommend2.png'
	}
]);

// 手机号码加密
const userMobileComputed = computed(() => {
	return user_mobile.value.substr(0, 3) + '****' + user_mobile.value.substring(7);
});

// 跳转选择收货地址
const jump_selectAddress = () => {
	uni.navigateTo({
		url: '/pages/select_address/index'
	});
};

// 顶部区域滚动
const scrollTop = ref('white_default');
onPageScroll((e) => {
	if (e.scrollTop < 30) {
		scrollTop.value = 'white_default';
	}
	if (e.scrollTop > 30 && e.scrollTop < 60) {
		scrollTop.value = 'white_30';
	} else if (e.scrollTop > 60 && e.scrollTop < 100) {
		scrollTop.value = 'white_60';
	} else if (e.scrollTop > 100) {
		scrollTop.value = 'white_100';
	}
});

// 获取用户经纬度
const getLocation = () => {
	uni.getLocation({
		type: 'wgs84',
		success: (res) => {
			console.log('获取经纬度', res);
		},
		fail: (err) => {
			console.log('err', err);
			uni.authorize({
				scope: 'scope.userLocation',
				success: (authorizeRes) => {
					console.log('authorizeRes', authorizeRes);
				},
				fail: (authoruzeErr) => {
					console.log('authoruzeErr', authoruzeErr);
					uni.showModal({
						content: '当前位置有偏差？快去授权',
						success: function (modal) {
							if (modal.confirm) {
								console.log('去授权');
								uni.openSetting({
									success: (openSetting) => {
										console.log('openSetting', openSetting);
										getLocation();
									},
									fail: (openSettingErr) => {
										console.log('openSettingErr', openSettingErr);
									}
								});
							} else if (modal.cancel) {
								console.log('取消');
							}
						}
					});
				}
			});
		}
	});
};

getLocation();

// 页面挂载完毕
onMounted(() => {
	loading.value = true;
});
</script>

<style lang="scss" scoped>
// 地址，搜索
.location {
	position: fixed;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx 12rpx;
	z-index: 2;

	.address {
		font-size: 26rpx;
		color: #fff;
		font-weight: 500;
		display: flex;
		align-items: center;
		flex: none;
		.text {
			padding: 0 12rpx;
		}
	}

	.search {
		flex: 1;
		height: 60rpx;
		border-radius: 45rpx;
		display: flex;
		align-items: center;
		border: 1px solid rgba(255, 255, 255, 0.7);
		background: rgba(255, 255, 255, 0.3);
		padding: 0 30rpx;
		margin-left: 15rpx;

		.iconfont {
			font-size: 26rpx;
			font-weight: 500;
			color: #fff;
			flex: none;
		}

		.text {
			flex: 1;
			font-size: 24rpx;
			font-weight: 500;
			color: #fff;
			padding-left: 15rpx;
		}
	}
}

.white_default {
	background: transparent;
}
.white_30 {
	background: rgba(255, 255, 255, 0.3);
}
.white_60 {
	background: rgba(255, 255, 255, 0.6);
}
.white_100 {
	background: rgba(255, 255, 255, 1);
}

.scroll_loacation {
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	.address {
		color: #000;
	}
	.search {
		border: 1px solid #f1f1f1;
		background: #f1f1f1;
		.iconfont {
			color: #000;
		}
		.text {
			color: #000;
		}
	}
}

.swiper_wrap {
	position: relative;
}

.swiper_banner {
	height: 985rpx;
	.cover {
		width: 100%;
		height: 985rpx;
	}
}

.user {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 0 30rpx;
	margin: auto;
	background: linear-gradient(to bottom, transparent, #f1f1f1);

	.wrap {
		border-radius: 20rpx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		box-shadow: 0 0 12rpx rgba(0, 0, 0, 0.1);

		.head_portrait {
			width: 104rpx;
			flex: none;
			position: relative;
			.cover {
				width: 100%;
			}

			.vip {
				position: absolute;
				top: -16rpx;
				right: -6rpx;
				width: 37rpx;
			}
		}

		.content {
			flex: 1;
			padding: 0 16rpx;
			.name {
				font-size: 30rpx;
				font-weight: 600;
				color: #000;
			}
			.vip {
				width: 46rpx;
			}
			.lead {
				font-size: 24rpx;
				color: #000;
				margin-top: 10rpx;
			}
			.phone {
				width: 14rpx;
			}
		}

		.login_btn {
			flex: none;
			width: 180rpx;
			height: 60rpx;
			border-radius: 30rpx;
			background: linear-gradient(275.93deg, #fdbc80 0%, #ff8992 100%);
			font-size: 24rpx;
			color: #fff;
			text-align: center;
			line-height: 60rpx;
		}

		.star_cover {
			width: 200rpx;
		}
	}
}

.distribute {
	padding: 30rpx;
	background: #f1f1f1;

	.wrap {
		border-radius: 20rpx;
		background: #fdfdfd;
		box-shadow: 0 0 12rpx rgba(0, 0, 0, 0.1);
		padding-bottom: 42rpx;

		.type {
			display: flex;
			justify-content: space-between;

			.box {
				width: 50%;
				text-align: center;
				padding-top: 46rpx;
				position: relative;
				.title {
					font-size: 38rpx;
					font-weight: 600;
					color: #000;
				}
				.lead {
					font-size: 24rpx;
					color: #fd6f23;
					padding: 10rpx 0;
				}
				.cover {
					width: 218rpx;
				}
			}

			.box:first-child::before {
				content: '';
				position: absolute;
				top: 50%;
				right: 0;
				width: 1px;
				height: 70%;
				transform: translateY(-50%);
				background: rgba(0, 0, 0, 0.1);
			}
		}

		.advertising {
			height: 62rpx;
			padding: 0 30rpx;
		}
	}
}

.coupon {
	background: #f1f1f1;
	padding-bottom: 30rpx;
	.swiper_coupon {
		height: 240rpx;
		.item {
			padding-right: 30rpx;
			.box {
				height: 240rpx;
				border-radius: 15rpx;
				background: linear-gradient(154.39deg, #ff8992 0%, #fdba80 100%);
				color: #fff;
				text-align: center;
				padding: 20rpx 26rpx;

				.ide,
				.lead {
					font-size: 24rpx;
				}

				.price {
					font-size: 60rpx;
					font-weight: 600;
					padding: 4rpx 0;
				}

				.btn {
					height: 44rpx;
					line-height: 44rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #ff8992;
					border-radius: 45rpx;
					background: #fff;
					margin-top: 8rpx;
				}
			}
		}
	}
}

.classify {
	background: #f1f1f1;
	padding: 0 30rpx 30rpx;
	.wrap {
		background: #fff;
		border-radius: 20rpx;
		display: flex;
		padding: 50rpx 0;
		.item {
			width: 25%;
			text-align: center;
			.cover_box {
				padding-bottom: 14rpx;
				.cover {
					width: 100rpx;
				}
			}
			.title {
				font-size: 24rpx;
				color: #000;
				font-weight: 500;
			}
		}
	}
}

.recommend {
	background: #f1f1f1;
	padding: 0 15rpx 30rpx;
	.recommend_swiper {
		width: 100%;
		height: 384rpx;
		.item {
			.cover {
				width: 100%;
				height: 384rpx;
			}
		}
	}
}
</style>
