<template>
	<!-- 打开弹窗时，禁止滑动页面，必须要在第一个节点 -->
	<page-meta :page-style="'overflow:' + (login_show ? 'hidden' : 'visible')"></page-meta>
	<!-- 登录弹窗 -->
	<login-popup :show="login_show" @maskClick="maskClick"></login-popup>
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
		<view class="wrap" @click="isLogin">
			<view class="head_portrait">
				<image class="cover" :src="headPortrait" mode="widthFix"></image>
			</view>
			<view class="content">
				<view class="name">
					<text class="text">{{ nickName }}</text>
					<image class="vip" src="/static/img/me_index.png" mode="widthFix" lazy-load v-if="isVip == 'SVIP'"></image>
					<image class="vip" src="/static/img/me_v1.png" mode="widthFix" lazy-load v-else-if="isVip == 'vip1'"></image>
					<image class="vip" src="/static/img/me_v2.png" mode="widthFix" lazy-load v-else-if="isVip == 'vip2'"></image>
					<image class="vip" src="/static/img/me_v3.png" mode="widthFix" lazy-load v-else-if="isVip == 'vip3'"></image>
				</view>
				<view class="lead">
					<text class="iconfont icon-shouji"></text>
					<text class="text">{{ MobileEncryption(mobile) || '***********' }}</text>
				</view>
			</view>
			<view class="set" @click.stop="jump_personal_data">
				<uni-icons type="gear" size="22" color="#fff"></uni-icons>
				<text class="text">个人资料</text>
			</view>
		</view>
	</view>
	<!-- 分类 -->
	<view class="classify">
		<view class="item" @click="open_order(order_list[1])">
			<view class="num">{{ wait_take_order_count || '-' }}</view>
			<view class="name">待自提订单</view>
		</view>
		<view class="item" @click="open_coupon">
			<view class="num">{{ coupon_count || '-' }}</view>
			<view class="name">优惠券</view>
		</view>
		<view class="item" @click="open_collect">
			<view class="num">{{ collect_count || '-' }}</view>
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

		<!-- 推荐 -->
		<view class="recommend">
			<swiper class="recommend_swiper" autoplay :interval="5000" :duration="1000" circular>
				<block v-for="item in recommendBannerList" :key="item.src">
					<swiper-item class="item" @click="open_shopping_details(item.id)">
						<image class="cover" :src="item.thumb" mode="aspectFit"></image>
					</swiper-item>
				</block>
			</swiper>
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
import { ref, onMounted, watch, computed } from 'vue';
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
//onPageScroll:滚动事件
import { onPageScroll, onPullDownRefresh, onShow } from '@dcloudio/uni-app';
// api
import { getUserData, getBanner } from '@/api/index.js';
// 工具函数
import { MobileEncryption } from '@/hooks/useTool.js';

// 登录弹窗
const login_show = ref(false);
// 用户名
const nickName = ref('微信用户');
// 手机号
const mobile = ref(null);
// 是否svip
const isVip = ref(null);
// 头像
const headPortrait = ref('/static/img/head_portrait.png');
// 待自提订单数量
const wait_take_order_count = ref('-');
// 已领取优惠卷数量
const coupon_count = ref('-');
// 用户收藏订单数量
const collect_count = ref('-');
// 推荐banner
const recommendBannerList = ref([]);

// 打开登录弹窗
function show_login() {
	login_show.value = true;
}

// 点击登录弹窗遮罩，关闭弹窗
function maskClick() {
	getUserDataFn();
	login_show.value = false;
}

// 判断用户是否登录
function isLogin() {
	if (!mobile.value) {
		show_login();
		return false;
	}
	return true;
}

// 首页轮播图
const getSwiperBanner = async () => {
	const params = {
		pos_type: 2
	};
	const res = await getBanner(params);
	console.log('banner', res);
	if (res.code == 1) {
		recommendBannerList.value = res.data.lists;
	}
};

// 用户信息
const getUserDataFn = async () => {
	uni.showLoading({
		title: '加载中...',
		mask: true
	});
	const res = await getUserData();
	console.log('用户信息', res);

	if (res.code == 1) {
		nickName.value = res.data.nickname;
		isVip.value = res.data.grade;
		wait_take_order_count.value = res.data.wait_take_order_count;
		coupon_count.value = res.data.coupon_count;
		collect_count.value = res.data.collect_count;
		mobile.value = res.data.mobile;
		const avatar = res.data.avatar;
		if (avatar) {
			headPortrait.value = avatar;
		}
	} else {
		mobile.value = null;
		nickName.value = '炜洹游客用户';
		headPortrait.value = '/static/img/head_portrait.png';
		isVip.value = null;
	}

	uni.hideLoading();
};

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
const open_order = async (item) => {
	const getLogin = await isLogin();
	if (!getLogin) return;
	uni.navigateTo({
		url: `${item.url}?index=${item.index}&head_title_index=${item.head_title_index}`
	});
};

// 跳转个人资料
const jump_personal_data = async () => {
	const getLogin = await isLogin();
	if (!getLogin) return;
	uni.navigateTo({
		url: '/pages/me/personal_data'
	});
};

// 跳转我的收藏
const open_collect = async () => {
	const getLogin = await isLogin();
	if (!getLogin) return;
	uni.navigateTo({
		url: '/pages/shopping/collect'
	});
};

// 跳转优惠卷
const open_coupon = async () => {
	const getLogin = await isLogin();
	if (!getLogin) return;
	uni.navigateTo({
		url: '/pages/coupon/index'
	});
};

// 热门推荐 跳转商品下单
function open_shopping_details(id) {
	if (!id) return;
	uni.navigateTo({
		url: `/pages/shopping/place_an_order?id=${id}`
	});
}

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
const open_function_link = async (url) => {
	const getLogin = await isLogin();
	if (!getLogin) return;
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

onShow(() => {
	console.log('我的onShow');
	getUserDataFn();
	getSwiperBanner();
});

// 开启下拉刷新
onPullDownRefresh(async () => {
	await getUserDataFn();
	await getSwiperBanner();
	// 关闭下拉刷新
	uni.stopPullDownRefresh();
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
				border-radius: 50%;
				overflow: hidden;
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
				display: flex;
				align-items: center;
			}
			.vip {
				width: 64rpx;
			}
			.lead {
				font-size: 24rpx;
				color: #fff;
				margin-top: 10rpx;
				display: flex;
				align-items: center;
			}
			.phone {
				width: 14rpx;
			}

			.icon-shouji {
				font-size: 24rpx;
				color: #fff;
				margin-right: 6rpx;
			}
			.text {
				padding-right: 10rpx;
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

.recommend {
	margin: 20rpx 0;
	background: #f1f1f1;
	width: 100vw;
	padding: 0 20rpx;
	transform: translateX(-30rpx);
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
