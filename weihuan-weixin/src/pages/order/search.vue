<!-- 商品搜索 -->
<template>
	<view class="search_box">
		<search placeholder="输入商品名称/订单编号" @searchInput="searchInput" @searchConfirm="searchConfirm" />
	</view>
	<view class="" v-if="keyword != ''">
		<Empty imgSrc="/static/img/empty_content.png" tips="没有相关订单信息" :show="list.length == 0 ? true : false" />
	</view>
	<view class="list">
		<block v-for="item in list" :key="item.id">
			<Item :item="item" @orderDetails="orderDetails"></Item>
		</block>
	</view>
	<!-- 搭配建议 -->
	<view class="match" v-if="list.length == 0">
		<view class="btn btn_bg">
			<view class="text">热门推荐</view>
		</view>
		<List :list="hotRecommentList" @itemClick="itemClick"></List>
	</view>
	<uni-load-more :status="isMore" v-if="totalPage > 1"></uni-load-more>
</template>

<script setup>
import { onPageScroll } from '@dcloudio/uni-app';
import { ref, onMounted } from 'vue';
import { orderList, shoppingList } from '@/api/index.js';
import Item from './item.vue';
import search from '../component/search.vue';
import Empty from '../component/empty.vue';
import List from '@/pages/shopping/list.vue';

const keyword = ref('');
const page = ref(1);
const size = ref(10);
const totalPage = ref(1);
const list = ref([]);
// 热门推荐列表
const hotRecommentList = ref([]);
const isMore = ref('more');

// 搜索列表
const getShoppingList = async (more = false) => {
	if (more) {
		isMore.value = 'loading';
	} else {
		uni.showLoading({
			title: '加载中...',
			mask: true
		});
	}

	const params = {
		page: page.value,
		size: size.value,
		keyword: keyword.value
	};
	const res = await orderList(params);
	console.log('搜索列表', res);
	if (res.code == 1) {
		if (more) {
			list.value = [...list.value, ...res.data.lists];
		} else {
			list.value = res.data.lists;
			page.value = 1;
			totalPage.value = res.data.page_no;
		}
	}

	if (more) {
		if (page.value >= totalPage.value) {
			return (isMore.value = 'no-more');
		}
		isMore.value = 'more';
	} else {
		uni.hideLoading();
	}
};

// 热门推荐
const getHotRecommend = async () => {
	const params = {
		page: page.value,
		size: size.value,
		is_recommend: 1
	};
	const res = await shoppingList(params);
	console.log('推荐商品', res);
	if (res.code == 1) {
		hotRecommentList.value = res.data.lists;
	}
};

// 键盘输入时触发
function searchInput(e) {
	keyword.value = e.trim();
	list.value = keyword.value == '' ? [] : statrSearch();
}

// 键盘回车时触发
function searchConfirm(e) {
	if (!e) return;
	keyword.value = e.trim();
	statrSearch();
}

// 开始搜索
const statrSearch = async () => {
	if (keyword.value == '') return;
	await getShoppingList();
};

// 搜索热门关键词
function hotItem(text) {
	keyword.value = text;
	statrSearch();
}

// 触底加载
onPageScroll(() => {
	if (page.value < totalPage.value) {
		page.value++;
		statrSearch();
	}
});

// 跳转商品详情
const itemClick = async (id) => {
	uni.navigateTo({
		url: `/pages/shopping/place_an_order?id=${id}`
	});
};

// 订单详情
const orderDetails = (orderId) => {
	uni.navigateTo({
		url: `/pages/order/details?orderId=${orderId}`
	});
};

onMounted(() => {
	getHotRecommend();
});
</script>

<style lang="scss" scoped>
.search_box {
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
}
.hot {
	padding: 0 20rpx;

	.title {
		font-weight: bold;
		padding: 30rpx 0;
	}
	.list {
		display: flex;
		flex-wrap: wrap;
	}
	.li {
		border-radius: 6rpx;
		border: 1px solid rgba(0, 0, 0, 0.1);
		padding: 10rpx 20rpx;
		font-size: 24rpx;
		color: #000;
		font-weight: 500;
		margin: 0 20rpx 20rpx 0;

		.iconfont {
			font-size: 26rpx;
			color: #ff0000;
		}

		.text {
			padding-left: 8rpx;
		}
	}
}

.list {
	padding: 10rpx 20rpx 40rpx;
}

.match {
	.btn {
		width: 280rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 25rpx 5rpx;
		margin: auto;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #fff;
		font-weight: 500;
		position: relative;
		margin-bottom: 20rpx;
		&::before {
			content: '';
			position: absolute;
			bottom: 12rpx;
			width: 56rpx;
			height: 4rpx;
			border-radius: 2rpx;
			background: #fff;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.match_swiper {
		margin-top: 60rpx;
		height: 434rpx;
		.swiper-item {
			padding: 0 15rpx;

			.item {
				box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
				border-radius: 12rpx;
				overflow: hidden;
			}
			.cover_box {
				.cover {
					width: 100%;
					height: 300rpx;
				}
			}
			.content {
				background: #fff;
				padding: 20rpx 15rpx;
				height: 128rpx;
				.title {
					font-size: 28rpx;
					font-weight: 600;
				}
				.price_box {
					color: #ff0000;
					font-weight: 600;
					font-size: 24rpx;
					padding-right: 20rpx;
					padding-top: 10rpx;
					.price {
						font-size: 28rpx;
						padding-right: 10rpx;
					}

					.primary_price {
						font-weight: 500;
						color: #cbcbcb;
						text-decoration: line-through;
					}
				}
			}
		}
	}
}
</style>
