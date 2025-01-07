<!-- 领劵中心 -->
<template>
	<view class="main">
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="box" @click="open_details(item)">
					<view class="ide">{{ item.title }}</view>
					<view class="price" v-if="item.coupon_type == 1">{{ item.money }}</view>
					<view class="discount" v-else>{{ item.coupon_type_name }}</view>
					<view class="lead">{{ item.remark }}</view>
					<button class="btn" @click.stop="getCouponItem(item.is_get, item.id)">{{ item.is_get == 1 ? '立即使用' : '立即领取' }}</button>
				</view>
			</view>
		</view>
		<uni-load-more :status="isMore" v-if="totalPage > 1" :iconSize="14" :contentText="contentText"></uni-load-more>
		<Empty :show="list.length == 0" tips="您还没有相关收藏商品" />
	</view>
</template>

<script setup>
import { onReachBottom, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { ref, onMounted } from 'vue';
import { couponCenterList, getCoupon } from '@/api/index.js';
import Empty from '../component/empty.vue';

const page = ref(1);
const size = ref(8);
const totalPage = ref(1);
const list = ref([]);
const isMore = ref('more');
const contentText = ref({ contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '到底了' });

// 优惠卷
const getCouponList = async (more = false) => {
	if (more) {
		isMore.value = 'loading';
	} else {
		uni.showLoading({
			title: '加载中...'
		});
		page.value = 1;
	}
	const params = {
		page: page.value,
		size: size.value
	};

	const res = await couponCenterList(params);
	console.log('优惠卷', res);
	if (res.code == 1) {
		if (more) {
			list.value = [...list.value, ...res.data.lists];
		} else {
			list.value = res.data.lists;
			totalPage.value = res.data.page_no;
		}

		if (more) {
			if (page.value >= totalPage.value) {
				return (isMore.value = 'no-more');
			}
			isMore.value = 'more';
		} else {
			uni.hideLoading();
		}
	}
};

// 优惠券详情
const open_details = (item) => {
	uni.navigateTo({
		url: `/pages/coupon/details?item=${JSON.stringify(item)}`
	});
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
				if (res.code == 1) {
					getCouponList();
				}
			}, 1500);
		}
	});
};

onMounted(() => {
	getCouponList();
});

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

onReachBottom(() => {
	if (page.value < totalPage.value) {
		page.value++;
		getCouponList(true);
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
				height: 80rpx;
				line-height: 80rpx;
				font-size: 60rpx;
				font-weight: 600;
				color: #fff;
			}

			.discount {
				height: 80rpx;
				line-height: 80rpx;
				font-size: 40rpx;
				font-weight: 600;
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
		}

		.type2 {
			background: #dfdfdf;
		}
	}
}
</style>
