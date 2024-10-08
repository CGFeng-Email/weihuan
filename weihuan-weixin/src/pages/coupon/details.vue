<!-- 详情 -->
<template>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="return_icon" @click="return_page">
			<uni-icons type="left" size="20" color="#fff"></uni-icons>
		</view>
		{{ scrollTop != 'white_default' ? '我的' : '' }}
	</view>
	<!-- 占位 -->
	<view :style="{ height: useMenuButton().top }"></view>
	<view :style="{ height: useMenuButton().height }"></view>
	<!-- 顶部背景 -->
	<view class="fixed_top_bg">
		<image class="cover" src="/static/img/me_banner.png" mode="widthFix"></image>
	</view>
	<view class="main">
		<view class="coupon_module">
			<view class="bg">
				<image class="cover" src="/static/img/coupon_bg.png" mode="aspectFit"></image>
			</view>
			<view class="content">
				<view class="top_content">
					<view class="price">
						{{ coupon_data.price }}
					</view>
					<view class="tips">
						{{ coupon_data.tips }}
					</view>

					<view class="list">
						<view class="lead">
							<text class="name">使用条件：</text>
							<text class="text">{{ coupon_data.condition }}</text>
						</view>
						<view class="lead">
							<text class="name">有效日期：</text>
							<text class="text">{{ coupon_data.date }}</text>
						</view>
						<view class="lead">
							<text class="name">使用说明：</text>
							<text class="text">{{ coupon_data.explain }}</text>
						</view>
					</view>
				</view>

				<view class="btn" v-if="coupon_data.type == 1" @click="open_shoppingList">立即使用</view>
				<view class="btn" :class="{ type2_btn: coupon_data.type == 2 }" v-else-if="coupon_data.type == 2">已使用</view>
				<view class="btn" :class="{ type3_btn: coupon_data.type == 3 }" v-else>已过期</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
//onPageScroll:滚动事件
import { onPageScroll } from '@dcloudio/uni-app';
// 优惠卷
const coupon_data = ref({
	id: 1,
	price: 150,
	tips: '双12购物节购物优惠券',
	condition: '适应所有商品',
	date: '2024/08/22 至 2024/12/30',
	explain: '超过有效日期会自动失效',
	type: 1
});

const open_shoppingList = () =>{
	uni.switchTab({
		url: '/pages/shopping/index'
	})
}

const return_page = () => {
	uni.navigateBack()
}

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
</script>

<style lang="scss" scoped>
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
.fixed_top_bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 750rpx;
	z-index: -1;
	.cover {
		width: 750rpx;
	}
}

.main {
	padding-top: 180rpx;
}
.coupon_module {
	width: 640rpx;
	height: 920rpx;
	margin: auto;
	position: relative;
	.bg {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.cover {
			width: 100%;
			height: 100%;
		}
	}

	.content {
		height: 100%;
		box-shadow: 0 0 6rpx rgba(0, 0, 0, 0.1);
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 50rpx;
		.top_content {
			.price {
				font-size: 100rpx;
				color: #e80000;
				font-weight: bold;
			}
			.tips {
				font-size: 28rpx;
				color: #7e7e7e;
				font-weight: 500;
				padding: 20rpx 0;
			}
			.list {
				text-align: left;
				padding: 16rpx 0;
			}
			.lead {
				padding: 20rpx 0;
				.name {
					font-size: 30rpx;
					font-weight: bold;
				}

				.text {
					font-size: 28rpx;
					color: #7e7e7e;
					font-weight: 500;
				}
			}
		}

		.btn {
			border-radius: 50rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 30rpx;
			font-weight: bold;
			color: #fff;
			background: linear-gradient(92.65deg, #ff8992 0%, #fdba80 100%);
		}
		
		.type2_btn {
			background: #000;
			color: #fff;
			opacity: .3;
		}
		
		.type3_btn {
			background: #000;
			color: #fff;
			opacity: .2;
		}
	}
}
</style>
