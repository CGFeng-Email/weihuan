<template>
	<!-- 打开弹窗时，禁止滑动页面，必须要在第一个节点 -->
	<page-meta :page-style="'overflow:' + (login_show ? 'hidden' : 'visible')"></page-meta>
	<Skeleton v-if="loading" />
	<view v-else>
		<!-- 登录弹窗 -->
		<login-popup :show="login_show" @maskClick="maskClick"></login-popup>
		<!-- 顶部到胶囊的高度 -->
		<view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view>
		<!-- 标题 -->
		<view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
			{{ scrollTop != 'white_default' ? '炜洹商城' : '' }}
		</view>

		<!-- 地址，搜索 -->
		<view :class="['location', scrollTop, scrollTop != 'white_default' ? 'scroll_loacation' : '']" :style="{ top: useMenuButton().topView }">
			<view class="address" @click="jump_selectAddress">
				<text class="iconfont icon-dizhi"></text>
				<text class="text">{{ address }}</text>
			</view>
			<view class="search" @click="open_shopping_search">
				<text class="iconfont icon-sousuo"></text>
				<text class="text">进口美国3A牛肉</text>
			</view>
		</view>

		<div class="swiper_wrap">
			<!-- 轮播图 -->
			<swiper class="swiper_banner" autoplay :interval="5000" :duration="1000" circular>
				<block v-for="item in swiper_list" :key="item.src">
					<swiper-item class="swiper-item">
						<image class="cover" :src="item.thumb" mode="widthFix"></image>
					</swiper-item>
				</block>
			</swiper>

			<!-- 未登录 -->
			<view class="user" v-if="!mobile">
				<view class="wrap">
					<image class="head_portrait" src="/src/static/img/head_portrait.png" mode="widthFix"></image>
					<view class="content">
						<view class="name">{{ nickName }}</view>
						<view class="lead">为给您提供更好的服务请授权登录</view>
					</view>
					<view class="login_btn" @click="show_login">登录/注册</view>
				</view>
			</view>
			<!-- 已登录 -->
			<view class="user" v-else>
				<view class="wrap" @click="open_personal">
					<view class="head_portrait">
						<image class="cover" :src="headPortrait" mode="widthFix"></image>
						<image class="vip" src="/static/img/head_vip.png" mode="widthFix" lazy-load v-if="isVip == 'SVIP'"></image>
					</view>
					<view class="content">
						<view class="name">
							{{ nickName }}
							<image class="vip" src="/static/img/vip.png" mode="widthFix" lazy-load v-if="isVip == 'SVIP'"></image>
						</view>
						<view class="lead">
							<image class="phone" src="/src/static/img/phone.png" mode="widthFix" lazy-load></image>
							{{ MobileEncryption(mobile) }}
						</view>
					</view>
					<image class="star_cover" src="/src/static/img/user_star.png" mode="widthFix"></image>
				</view>
			</view>
		</div>

		<!-- 分类 -->
		<view class="classify">
			<view class="wrap">
				<block v-for="(item, index) in classify_list" :key="item.src">
					<view class="item" @click="open_classify_item(item.id)" v-if="index < 8">
						<view class="cover_box">
							<image class="cover" :src="item.image" mode="widthFix" lazy-load></image>
						</view>
						<view class="title">{{ item.title }}</view>
					</view>
				</block>
			</view>
		</view>

		<!-- 分发方式 -->
		<view class="distribute">
			<view class="wrap">
				<view class="type">
					<view class="box" @click="open_pickup">
						<view class="title">门店自提</view>
						<view class="lead">在线点单，到自提点取货</view>
						<view class="cover_box">
							<image class="cover" src="/src/static/img/store.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="box" @click="open_classify">
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
						:text="noticeText"
						@click="open_notice"
					></uni-notice-bar>
				</view>
			</view>
		</view>

		<!-- 优惠卷 -->
		<view class="coupon" v-if="coupon_list.length > 0">
			<swiper class="swiper_coupon" skip-hidden-item-layout autoplay :interval="5000" :duration="1000" circular>
				<swiper-item class="item" v-for="(item, index) in coupon_list" :key="index">
					<block v-for="(item2, index2) in item" :key="index2">
						<view class="box" @click="open_coupon_details(item2)">
							<view class="wrap">
								<view class="ide">{{ item2.title }}</view>
								<view class="price" v-if="item2.coupon_type == 1">{{ item2.money }}</view>
								<view class="discount" v-else>{{ item2.coupon_type_name }}</view>
								<view class="lead">{{ item2.remark }}</view>
								<button class="btn" @click.stop="getCouponItem(item2.is_get, item2.id)">{{ item2.is_get == 1 ? '立即使用' : '立即领取' }}</button>
							</view>
						</view>
					</block>
				</swiper-item>
			</swiper>
		</view>

		<!-- 推荐 -->
		<view class="recommend">
			<swiper class="recommend_swiper" autoplay :interval="5000" :duration="1000" circular>
				<block v-for="item in recommend_list" :key="item.src">
					<swiper-item class="item" @click="open_shopping_details">
						<image class="cover" :src="item.src" mode="aspectFit"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>

<script setup>
//onPageScroll:滚动事件
import { onPageScroll } from '@dcloudio/uni-app';
import { ref, onMounted } from 'vue';
import Skeleton from './skeleton.vue';
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
// api
import { getIndexBanner, getUserData, getPhoneLocation, noticeList, couponCenter, getCoupon, classifyList, commonData } from '@/api/index.js';
// 工具函数
import { MobileEncryption } from '@/hooks/useTool.js';
// 加载
const loading = ref(true);
const headPortrait = ref('/static/img/head_portrait.png');
const nickName = ref('微信用户');
const mobile = ref(null);
const isVip = ref('普通会员');
const address = ref(null);
// 登录弹窗
const login_show = ref(false);
// 轮播图
const swiper_list = ref([]);
// 公告
const noticeText = ref('');
// 优惠卷
const coupon_list = ref([]);
// 分类
const classify_list = ref([]);

// 打开登录弹窗
function show_login() {
	login_show.value = true;
}

// 点击登录弹窗遮罩，关闭弹窗
function maskClick(e) {
	if (e.login == 'success') {
		mobile.value = uni.getStorageSync('mobile');
		// 获取用户数据
		getUserDataFn();
		// 优惠卷
		getCouponList();
	}
	login_show.value = false;
}

// 用户信息
const getUserDataFn = async () => {
	const res = await getUserData();
	console.log('用户信息', res);
	nickName.value = res.data.nickname;
	isVip.value = res.data.grade;
	const avatar = res.data.avatar;
	if (avatar) {
		headPortrait.value = avatar;
	}
};

// 优惠卷
const getCouponList = async () => {
	const res = await couponCenter({ size: 21 });

	if (res.code == 1 && res.data.length > 0) {
		const list = [];
		let sonList = [];
		res.data.map((item, index) => {
			if (sonList.length <= 1) {
				sonList.push(item);
			} else {
				sonList.push(item);
				list.push(sonList);
				sonList = [];
			}
		});
		list.push(sonList);
		sonList = [];
		coupon_list.value = list;
		console.log('优惠卷', list);
	}
};

// 领取优惠券
const getCouponItem = async (is_get, id) => {
	if (!id) return;

	// 立即使用
	if (is_get == 1) {
		uni.switchTab({
			url: '/pages/classify/index'
		});
		return;
	}

	uni.showLoading({
		title: '领取中...',
		mask: true
	});

	const res = await getCoupon({ coupon_id: id });
	console.log('领取优惠券', res);

	uni.hideLoading();

	uni.showToast({
		title: res.msg,
		icon: 'none',
		mask: true,
		success: () => {
			setTimeout(() => {
				getCouponList();
			}, 1500);
		}
	});
};

// 优惠券详情
const open_coupon_details = (item) => {
	uni.navigateTo({
		url: `/pages/coupon/details?item=${JSON.stringify(item)}`
	});
};

// 首页轮播图
const getSwiperBanner = async () => {
	const res = await getIndexBanner();
	console.log('banner', res);
	swiper_list.value = res.data.lists;
};

// 获取定位ip
const getLocation = async () => {
	const res = await getPhoneLocation();
	console.log('定位', res);
	if (res.code == 1) {
		address.value = res.data.ad_info.district;
		uni.setStorageSync('location', {
			location: res.data.location,
			address: res.data.ad_info
		});
	}
};

// 获取分类
const getClassify = async () => {
	const params = {
		cate_id: 0,
		is_recommend: 1,
		size: 8
	};
	const res = await classifyList(params);
	console.log('分类', res);
	if (res.code == 1) {
		classify_list.value = res.data;
	}
};

// 获取公告列表
const getNoticeList = async () => {
	const res = await noticeList();
	console.log('公告列表', res);
	if (res.code == 1 && res.data.length > 0) {
		res.data.forEach((item) => {
			noticeText.value += item.title + '：' + item.remark + ' ';
		});
	}
};

// 获取公告数据
const getCommonData = async () => {
	const res = await commonData();
	console.log('公共数据', res);
	if (res.code == 1) {
		// express_list: 物流公司
		// hot_search: 热门搜索词
		// tag_list: 商品标签
		// organ_list: 商品机构
		uni.setStorageSync('commonData', res.data);
	}
};

// 推荐列表
const recommend_list = ref([
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/recommend1.png'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/recommend2.png'
	}
]);

// 跳转选择收货地址
const jump_selectAddress = () => {
	uni.navigateTo({
		url: '/pages/select_address/index'
	});
};

// 领取优惠券
function get_coupon() {
	uni.showToast({
		title: '领取成功',
		icon: 'none',
		duration: 2000,
		mask: true
	});
}

// 跳转分类 (自提)
function open_pickup() {
	uni.switchTab({
		url: '/pages/self_pick_up/index'
	});
}

// 跳转分类 (物流配送)
function open_classify() {
	uni.$emit('delivery_type', { delivery_type: 0 });
	uni.switchTab({
		url: '/pages/classify/index'
	});
}

// 跳转商品分类
function open_classify_item(id) {
	uni.switchTab({
		url: '/pages/classify/index',
		success: () => {
			uni.$emit('classifyMenu', { id });
		}
	});
}

// 跳转公告详情
function open_notice() {
	uni.navigateTo({
		url: '/pages/notice/index'
	});
}

// 跳转推荐
function open_shopping_details() {
	uni.navigateTo({
		url: '/pages/shopping/place_an_order'
	});
}

// 跳转搜索商品页
function open_shopping_search() {
	uni.navigateTo({
		url: '/pages/shopping/shopping_search'
	});
}

// 跳转个人资料页
function open_personal() {
	uni.navigateTo({
		url: '/pages/me/personal_data'
	});
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

onMounted(async () => {
	// 获取swiper轮播图
	await getSwiperBanner();
	// 获取定位ip
	await getLocation();
	// 公告列表
	await getNoticeList();
	// 分类
	await getClassify();
	// 公共数据
	await getCommonData();
	mobile.value = uni.getStorageSync('mobile');
	if (mobile.value) {
		// 获取用户信息
		await getUserDataFn();
		// 优惠卷
		await getCouponList();
	}
	loading.value = false;
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
	padding: 15rpx 30rpx;
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
				border-radius: 50%;
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
	padding: 15rpx 30rpx;
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
	padding: 15rpx;
	background: #f1f1f1;
	padding-bottom: 30rpx;
	.swiper_coupon {
		height: 240rpx;
		.item {
			display: flex;
			.box {
				width: 33.33%;
				padding: 0 15rpx;

				.wrap {
					border-radius: 15rpx;
					color: #fff;
					text-align: center;
					height: 240rpx;
					padding: 20rpx 15rpx;
					background: linear-gradient(154.39deg, #ff8992 0%, #fdba80 100%);
				}

				.ide,
				.lead {
					font-size: 24rpx;
				}

				.price {
					height: 80rpx;
					line-height: 80rpx;
					font-size: 60rpx;
					font-weight: 600;
				}

				.discount {
					height: 80rpx;
					line-height: 80rpx;
					font-size: 40rpx;
					font-weight: 600;
					color: #fff;
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
	padding: 15rpx 30rpx;
	.wrap {
		background: #fff;
		border-radius: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 30rpx 12rpx;
		.item {
			width: 167.5rpx;
			text-align: center;
			padding: 15rpx 0;
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
