<!-- 我的优惠卷 -->
<template>
	<!-- 导航栏组件 -->
	<navigate :list="navigate" :itemIndex="navigateIndex" @itemClick="navigateItem"></navigate>
	<view class="main">
		<view class="list" v-if="list.length > 0">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="box" :class="{ type2: item.status == 2 }" @click="open_details(item)">
					<view class="ide">{{ item.title }}</view>
					<view class="price">{{ item.money }}</view>
					<view class="lead">{{ item.remark }}</view>
					<view class="btn" @click.stop="open_shopping" v-if="item.status == 0">立即使用</view>
					<view class="btn" :class="{ type2_btn: item.status == 1 }" v-else-if="item.status == 1">已使用</view>
					<view class="btn" :class="{ type3_btn: item.status == 2 }" v-else-if="item.status == 2">已过期</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="isMore" v-if="totalPage > 1" :iconSize="14" :contentText="contentText"></uni-load-more>
		<Empty :show="list.length == 0" tips="您还没有相关优惠券" />
	</view>
</template>

<script setup>
import { onReachBottom, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { ref, onMounted } from 'vue';
import Navigate from '../component/navigate.vue';
import { myCoupon } from '@/api/index.js';
import Empty from '../component/empty.vue';

const page = ref(1);
const size = ref(8);
const totalPage = ref(1);
const isMore = ref('more');
const contentText = ref({ contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '到底了' });
const navigateIndex = ref(0);
const navigate = ref([
	{
		title: '全部',
		index: ''
	},
	{
		title: '待使用',
		index: 0
	},
	{
		title: '已使用',
		index: 1
	},
	{
		title: '已过期',
		index: 2
	}
]);
const list = ref([]);

// 切换导航
const navigateItem = (e) => {
	if (navigateIndex.value == e.i) return;
	navigateIndex.value = e.i;
	getMyCoupon();
};

// 跳转优惠券详情
const open_details = (item) => {
	uni.navigateTo({
		url: `/pages/coupon/details?item=${JSON.stringify(item)}`
	});
};

// 使用优惠券
function open_shopping() {
	uni.switchTab({
		url: '/pages/classify/index'
	});
}

// 获取我的优惠卷
const getMyCoupon = async (more = false) => {
	if (more) {
		isMore.value = 'loading';
	} else {
		uni.showLoading({
			title: '加载中...',
			mask: true
		});
		page.value = 1;
	}

	const params = {
		status: navigate.value[navigateIndex.value].index,
		page: page.value,
		size: size.value
	};
	const res = await myCoupon(params);
	console.log('获取我的优惠卷', res);

	if (res.code == 1) {
		if (more) {
			list.value = [...list.value, ...res.data.lists];
			if (page.value >= totalPage.value) {
				return (isMore.value = 'no-more');
			}
			isMore.value = 'more';
		} else {
			list.value = res.data.lists;
			totalPage.value = res.data.page_no;
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
			uni.hideLoading();
		}
	}
};

onShareAppMessage(() => {
	return {
		title: '网上商城 | WakanMALL',
		path: '/pages/index/index'
	};
});

onShareTimeline(() => {
	return {
		title: '网上商城 | WakanMALL',
		path: '/pages/index/index'
	};
});

onMounted(() => {
	getMyCoupon();
});

onReachBottom(() => {
	if (page.value < totalPage.value) {
		page.value++;
		getMyCoupon(true);
	}
});
</script>

<style lang="scss" scoped>
.main {
	padding-bottom: 40rpx;
}
.list {
	padding: 20rpx 20rpx 0;
	display: flex;
	flex-wrap: wrap;
	.item {
		width: 354rpx;
		padding: 0 8rpx;
		margin-bottom: 16rpx;
		.box {
			height: 376rpx;
			border-radius: 14rpx;
			background: linear-gradient(154.39deg, #ff8992 0%, #fdba80 100%);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.ide {
				font-size: 32rpx;
				font-weight: 500;
				color: #fff;
			}

			.price {
				font-size: 82rpx;
				font-weight: 600;
				padding: 10rpx 0;
				color: #fff;
			}

			.lead {
				font-size: 26rpx;
				color: #fff;
				font-weight: 500;
			}

			.btn {
				width: 200rpx;
				height: 64rpx;
				line-height: 64rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #ff8992;
				border-radius: 45rpx;
				background: #fff;
				margin-top: 8rpx;
				text-align: center;
				margin-top: 30rpx;
			}

			.type2_btn {
				background: #000;
				color: #fff;
				opacity: 0.3;
			}

			.type3_btn {
				background: #000;
				color: #fff;
				opacity: 0.2;
			}
		}

		.type2 {
			background: #dfdfdf;
		}
	}
}
</style>
