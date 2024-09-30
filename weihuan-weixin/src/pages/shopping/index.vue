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

	<!-- 列表 -->
	<view class="list">
		<block v-for="item in shopping_list" :key="item.src">
			<view class="item" v-if="item.type == 'type1'" @click="jump_place_order">
				<uni-transition mode-class="slide-bottom" :show="item ? true : false">
					<view class="item_wrap"></view>
					<view class="cover_box">
						<image class="cover type1" :src="item.src" mode="aspectFill"></image>
					</view>
				</uni-transition>
			</view>
			<view class="item item3" v-else-if="item.type == 'type3'" @click="jump_place_order">
				<uni-transition mode-class="slide-bottom" :show="item ? true : false">
					<view class="cover_box">
						<image class="cover type3" :src="item.src" mode="aspectFill"></image>
					</view>
				</uni-transition>
			</view>
			<view class="item" v-else @click="jump_place_order">
				<uni-transition mode-class="slide-bottom" :show="item ? true : false">
					<view class="cover_box">
						<image class="cover" :src="item.src" mode="aspectFill"></image>
					</view>
					<view class="content">
						<view class="title">
							<text class="boom" v-if="item.boom">畅销</text>
							<text class="text over2" :class="{ boom_text: item.boom }">{{ item.title }} {{ item.title }}</text>
						</view>
						<view class="total_price">
							<view class="price_box">
								<text class="symbol">￥</text>
								<text class="price">{{ priceToFixed(item.price) }}</text>
							</view>
							<view class="primary_price">
								<text class="primary_symbol">原价:</text>
								<text class="price">￥{{ item.primary_price }}</text>
							</view>
						</view>
						<view class="bottom_cart">
							<view class="left">
								<view class="tips">{{ item.tips }}</view>
								<view class="tips_location">配送至{{ item.location }}</view>
							</view>
							<view class="cart">
								<i class="iconfont icon-gouwuche-tianchong"></i>
							</view>
						</view>
					</view>
				</uni-transition>
			</view>
		</block>
	</view>
</template>

<script setup>
//onPageScroll:滚动事件
import { onPageScroll, onLoad, onShow } from '@dcloudio/uni-app';
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
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
	{ value: 0, text: '炜洹饮食策划管理有限公司' },
	{ value: 1, text: '炜洹冷藏供应链服务有限公司' },
	{ value: 2, text: '美味易网络科技有限公司' },
	{ value: 3, text: '炜洹冷藏供应链服务有限公司' }
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

// 计算属性金额后面补.00
const priceToFixed = computed(() => {
	return (e) => {
		const priceNumber = e + '.00';
		return priceNumber;
	};
});

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

// 列表
.list {
	padding: 24rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	background: #fbfbfb;

	.item {
		width: calc(50% - 10rpx);
		margin-bottom: 20rpx;
		background: #fff;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

		.cover_box {
			.cover {
				display: block;
				width: 100%;
				height: 336rpx;
				object-fit: cover;
			}
			.type1 {
				height: 634rpx;
			}

			.type3 {
				height: 276rpx;
			}
		}

		.content {
			padding: 18rpx;
			.title {
				position: relative;
				.boom {
					position: absolute;
					left: 0;
					top: 0;
					display: inline-block;
					width: 72rpx;
					height: 38rpx;
					line-height: 38rpx;
					text-align: center;
					font-size: 24rpx;
					color: #fff;
					font-weight: 500;
					border-radius: 5rpx;
					background: linear-gradient(83.83deg, #f24d2a 0%, #f59e33 100%);
				}
				.text {
					font-size: 26rpx;
					color: #000;
					font-weight: 600;
					line-height: 38rpx;
				}
				.boom_text {
					text-indent: 3em;
				}
			}

			.total_price {
				padding: 8rpx 0;
				display: flex;
				align-items: center;
				.price_box {
					color: #fc7600;
					font-weight: 600;
					font-size: 36rpx;
					.symbol {
						font-size: 24rpx;
					}
				}

				.primary_price {
					color: #cfcfcf;
					font-weight: 500;
					font-size: 24rpx;
					text-decoration: line-through;
					padding-left: 8rpx;
				}
			}

			.bottom_cart {
				padding-top: 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left {
					flex: 1;
					padding-right: 10rpx;
					.tips {
						font-size: 24rpx;
						color: #4a4a4a;
						line-height: 34rpx;
						padding-bottom: 10rpx;
					}
					.tips_location {
						font-size: 24rpx;
						color: #4a4a4a;
						line-height: 34rpx;
					}
				}

				.cart {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					text-align: center;
					line-height: 64rpx;
					background: #ff8992;
					.iconfont {
						color: #fff;
						font-size: 34rpx;
					}
				}
			}
		}
	}

	.item3 {
		width: 100%;
	}
}
</style>
