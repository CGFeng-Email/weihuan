<template>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		{{ scrollTop != 'white_default' ? '我的' : '' }}
	</view>
	<!-- 占位 -->
	<view :style="{ height: useMenuButton().top }"></view>
	<view :style="{ height: useMenuButton().height }"></view>
	<!-- 顶部背景 -->
	<view class="fixed_top_bg">
		<image class="cover" src="/static/img/me_banner.png" mode="widthFix"></image>
	</view>
	<!-- 用户信息 -->
	<view class="user">
		<view class="wrap">
			<view class="head_portrait">
				<image class="cover" src="/static/img/head_portrait.png" mode="widthFix"></image>
				<image class="vip" src="/static/img/head_vip.png" mode="widthFix"></image>
			</view>
			<view class="content">
				<view class="name">
					{{ user_title }}
					<image class="vip" src="/static/img/vip2.png" mode="widthFix" lazy-load></image>
				</view>
				<view class="lead">
					<text class="iconfont icon-shouji"></text>
					<text class="text">{{ userMobileComputed }}</text>
				</view>
			</view>
			<view class="set" @click="jump_personal_data">
				<uni-icons type="gear" size="22" color="#fff"></uni-icons>
				<text class="text">个人资料</text>
			</view>
		</view>
	</view>
	<!-- 分类 -->
	<view class="classify">
		<view class="item" @click="open_order(order_list[1])">
			<view class="num">3</view>
			<view class="name">待自提订单</view>
		</view>
		<view class="item" @click="open_coupon">
			<view class="num">5</view>
			<view class="name">优惠券</view>
		</view>
		<view class="item" @click="open_collect">
			<view class="num">28</view>
			<view class="name">我的收藏</view>
		</view>
	</view>

	<view class="main">
		<!-- 我的订单 -->
		<view class="my_order box_border_radius box_shadow">
			<view class="head">
				<view class="title">我的订单</view>
				<view class="right" @click="open_order(order_list[0])">全部订单 >></view>
			</view>
			<view class="list">
				<block v-for="(item, index) in order_list" :key="item.title">
					<view class="item" v-if="item.image" @click="open_order(item)">
						<view class="cover_box">
							<image class="cover" :src="item.image" mode="widthFix"></image>
						</view>
						<view class="name">{{ item.title }}</view>
					</view>
				</block>
			</view>
		</view>

		<!-- 广告 -->
		<view class="advertising">
			<image class="cover" src="/src/static/img/me_advertising.png" mode="widthFix"></image>
		</view>

		<!-- 平台相关 -->
		<view class="function box_border_radius box_shadow">
			<view class="head">
				<view class="title">平台相关</view>
			</view>
			<view class="list function_list">
				<block v-for="(item, index) in functionList" :key="item.id">
					<button open-type="contact" class="item" v-if="item.title == '联系客服'">
						<view class="cover_box">
							<image class="cover" :src="'/static/img/function' + (index + 1) + '.png'" mode="widthFix"></image>
						</view>
						<view class="name">{{ item.title }}</view>
					</button>

					<view class="item" @click="open_function(item)" v-else>
						<view class="cover_box">
							<image class="cover" :src="'/static/img/function' + (index + 1) + '.png'" mode="widthFix"></image>
						</view>
						<view class="name">{{ item.title }}</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
//onPageScroll:滚动事件
import { onPageScroll } from '@dcloudio/uni-app';
const user_title = ref('炜洹游客用户');
// 手机号
const user_mobile = ref('13428198898');

// 手机号码加密
const userMobileComputed = computed(() => {
	return user_mobile.value.substr(0, 3) + '****' + user_mobile.value.substring(7);
});

// 订单列表
const order_list = ref([
	{
		title: '全部订单',
		head_title_index: 0,
		index: 0,
		url: '/pages/order/index'
	},
	{
		title: '自提订单',
		head_title_index: 1,
		index: 0,
		url: '/pages/order/index'
	},
	{
		title: '待付款',
		head_title_index: 0,
		image: '/static/img/order1.png',
		index: 1,
		url: '/pages/order/index'
	},
	{
		title: '待发货',
		head_title_index: 0,
		image: '/static/img/order2.png',
		index: 2,
		url: '/pages/order/index'
	},
	{
		title: '待收货',
		head_title_index: 0,
		image: '/static/img/order3.png',
		index: 3,
		url: '/pages/order/index'
	},
	{
		title: '已完成',
		head_title_index: 0,
		image: '/static/img/order4.png',
		index: 4,
		url: '/pages/order/index'
	}
]);

// 订单列表 click
const open_order = (item) => {
	uni.navigateTo({
		url: `${item.url}?index=${item.index}&head_title_index=${item.head_title_index}`
	});
};

// 跳转个人资料
const jump_personal_data = () => {
	uni.navigateTo({
		url: '/pages/me/personal_data'
	});
};

// 跳转我的收藏
const open_collect = () => {
	uni.navigateTo({
		url: '/pages/shopping/collect'
	});
};

// 跳转优惠卷
const open_coupon = () => {
	uni.navigateTo({
		url: '/pages/coupon/index'
	});
};

// 平台相关 - 功能
const functionList = ref([
	{
		id: 1,
		title: '会员中心',
		url: '/pages/member_center/index'
	},
	{
		id: 2,
		title: '订单核销',
		url: '/pages/order/cancel'
	},
	{
		id: 3,
		title: '领券中心',
		url: '/pages/coupon/center'
	},
	{
		id: 4,
		title: '开票申请',
		url: '/pages/invoice/index'
	},
	{
		id: 5,
		title: '品牌动态'
	},
	{
		id: 6,
		title: '系统公告',
		url: '/pages/notice/index'
	},
	{
		id: 7,
		title: '地址管理',
		url: '/pages/address/index'
	},
	{
		id: 8,
		title: '联系客服'
	}
]);

// 跳转链接
const open_function_link = (url) => {
	uni.navigateTo({
		url
	});
};

// 平台相关
const open_function = (item) => {
	const title = item.title;
	switch (title) {
		case '会员中心':
			open_function_link(item.url);
			break;
		case '订单核销':
			open_function_link(item.url);
			break;
		case '领券中心':
			open_function_link(item.url);
			break;
		case '开票申请':
			open_function_link(item.url);
			break;
		case '系统公告':
			open_function_link(item.url);
			break;
		case '地址管理':
			open_function_link(item.url);
			break;
	}
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
</script>

<style>
page {
	background: #f2f4f5;
}
</style>

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
.user {
	padding: 40rpx 0 40rpx 30rpx;
	.wrap {
		border-radius: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

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
				color: #fff;
			}
			.vip {
				width: 64rpx;
			}
			.lead {
				font-size: 24rpx;
				color: #fff;
				margin-top: 10rpx;
			}
			.phone {
				width: 14rpx;
			}

			.icon-shouji {
				font-size: 24rpx;
				color: #fff;
			}
		}

		.set {
			width: 220rpx;
			height: 80rpx;
			background: rgba(255, 255, 255, 0.3);
			border-radius: 45rpx 0 0 45rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.text {
				font-size: 28rpx;
				padding-left: 10rpx;
				color: #fff;
			}
		}
	}
}

.classify {
	padding: 30rpx 0;
	display: flex;
	.item {
		flex: 33.33%;
		text-align: center;
		.num {
			font-size: 42rpx;
			color: #fff;
			font-weight: bold;
		}

		.name {
			font-size: 28rpx;
			color: #fff;
			padding-top: 8rpx;
		}
	}
}

.main {
	padding: 30rpx;
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 30rpx;
		.title {
			font-size: 32rpx;
			font-weight: 700;
		}

		.right {
			font-size: 24rpx;
			color: #bfbfbf;
		}
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		.item {
			width: 25%;
			text-align: center;

			.cover_box {
				height: 40rpx;
				.cover {
					width: 40rpx;
				}
			}

			.name {
				font-size: 24rpx;
				color: #000;
				font-weight: 500;
				padding-top: 16rpx;
			}
		}
	}

	.my_order {
		padding: 30rpx;
		background: #fff;
	}

	.function {
		padding: 30rpx;
		background: #fff;

		.list {
			.item {
				width: 25%;
				margin-bottom: 30rpx;
			}
			button {
				height: 88rpx;
				background: none;
				padding: 0;
				line-height: 34rpx;
				&::after {
					display: none;
				}
			}
		}
	}

	.advertising {
		padding: 30rpx 0;
		.cover {
			width: 100%;
		}
	}
}
</style>
