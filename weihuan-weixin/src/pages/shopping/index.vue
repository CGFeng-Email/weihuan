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

	<view class="swiper_wrap">
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
		<!-- 分类导航 -->
		<div class="classify_navigation_wrap">
			<uni-transition ref="transition_ref" mode-class="slide-bottom" :show="loading">
				<view class="classify_navigation">
					<view class="item company">
						<uni-data-select
							class="company_item"
							:clear="false"
							placeholder="所属公司"
							v-model="company_index"
							:localdata="company_list"
							@change="company_change"
						></uni-data-select>
					</view>
					<view class="item spec">
						<view class="text">销量</view>
						<view class="icon">
							<i class="iconfont icon-shang"></i>
							<i class="iconfont icon-xiala active"></i>
						</view>
					</view>
					<view class="item spec">
						<view class="text">价格</view>
						<view class="icon">
							<i class="iconfont icon-shang"></i>
							<i class="iconfont icon-xiala active"></i>
						</view>
					</view>
					<view class="item classify_btn" @click="jump_category">
						<view class="text">分类</view>
						<view class="icon">
							<i class="iconfont icon-shaixuan"></i>
						</view>
					</view>
				</view>
			</uni-transition>
		</div>
	</view>

	<List :list="shopping_list" @itemClick="jump_place_order"></List>
</template>

<script setup>
//onPageScroll:滚动事件
import { onPageScroll, onLoad, onShow } from '@dcloudio/uni-app';
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
// 列表组件
import List from './list.vue';
// 页面加载
const loading = ref(false);

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

// 所属公司company
const company_list = ref([
	{ value: 0, text: '网上超市（默认）' },
	{ value: 1, text: '团购集采' },
	{ value: 2, text: '服务项目' },
	{ value: 3, text: '礼品卡/代金券' }
]);
// 所属公司下标
const company_index = ref(-1);
// 所属公司change
const company_change = (e) => {
	company_index.value = e;
};

// 列表
const shopping_list = ref([
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list1.png',
		type: 'type1'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: true,
		price: 130,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 120,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 110,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 100,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 180,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州'
	},
	{
		type: 'type3',
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list7.png'
	}
]);

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

// 跳转分类
const jump_category = () => {
	uni.navigateTo({
		url: '/pages/shopping/category'
	});
};

// 跳转商品下单页
const jump_place_order = () => {
	uni.navigateTo({
		url: '/pages/shopping/place_an_order'
	});
};

onShow((e) => {
	console.log('onshwo', e);
});

// 页面挂载完毕
onMounted(() => {
	loading.value = true;
	proxy.$refs.transition_ref.init({
		duration: 500,
		timingFunction: 'ease'
	});
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
	z-index: 3;
}

.swiper_banner {
	height: 910rpx;
	.cover {
		width: 100%;
		height: 910rpx;
	}
}

// 导航分类
.classify_navigation_wrap {
	position: absolute;
	bottom: 30rpx;
	left: 0;
	right: 0;
	padding: 0 14rpx;
	margin: auto;
	.classify_navigation {
		padding: 24rpx 30rpx;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 18rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			.text {
				font-size: 26rpx;
				padding-right: 6rpx;
			}

			.icon {
				.iconfont {
					font-size: 26rpx;
					color: #d6d6d6;
				}

				.active {
					color: #ff8992;
				}
			}
		}

		.spec {
			.icon-shang {
				transform: scale(0.7) translateY(8rpx);
			}

			.icon-xiala {
				transform: scale(0.7) translateY(-8rpx);
			}
		}

		.company {
			width: 160rpx;
			.company_item {
				::v-deep .uni-select {
					border: none;
					z-index: 3;
				}
				::v-deep .uni-select__input-box {
					width: 160rpx;
					.uni-select__input-text {
						font-size: 26rpx !important;
						color: #000 !important;
					}
				}
				::v-deep .uni-select__selector {
					width: 450rpx;
					z-index: 3;
				}
			}
		}

		.classify_btn {
			width: 134rpx;
			height: 64rpx;
			border-radius: 32rpx;
			background: linear-gradient(92.65deg, #ff8992 0%, #fdba80 100%);
			.text {
				color: #fff;
			}
			.icon {
				.iconfont {
					color: #fff;
					font-size: 30rpx;
				}
			}
		}
	}
}


</style>
