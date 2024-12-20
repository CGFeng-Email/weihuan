<!-- 商品搜索 -->
<template>
	<search placeholder="输入商品名称/订单编号" @searchInput="searchInput" @searchConfirm="searchConfirm" />
	<Empty imgSrc="https://test.cnmaris.cn/uploads/images/20241220/17347003598480.png" tips="抱歉, 没找到商品" :show="keyword != '' && list.length == 0" />
	<view class="list">
		<block v-for="item in list" :key="item.id">
			<Item :item="item" @itemClick="itemClick"></Item>
		</block>
	</view>
	<uni-load-more :status="isMore" v-if="totalPage > 1"></uni-load-more>
</template>

<script setup>
import { onPageScroll } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { orderList } from '@/api/index.js';
import Item from './item.vue';
import search from '../component/search.vue';
import Empty from '../component/empty.vue';

const keyword = ref('');
const page = ref(1);
const size = ref(10);
const totalPage = ref(1);
const list = ref([]);
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

// 键盘输入时触发
function searchInput(e) {
	keyword.value = e.trim();
	list.value = keyword.value === '' ? [] : list.value;
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
</script>

<style lang="scss" scoped>
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
	padding: 10rpx 20rpx;
}
</style>
