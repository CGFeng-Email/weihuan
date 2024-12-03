<!-- 领劵中心 -->
<template>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { couponCenter, getCoupon } from '@/api/index.js';

// 领劵中心
const list = ref([]);

// 优惠卷
const getCouponList = async () => {
	const res = await couponCenter();
	console.log('优惠卷', res);
	if (res.code == 1) {
		list.value = res.data;
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
				getCouponList();
			}, 1500);
		}
	});
};

onMounted(() => {
	getCouponList();
});
</script>

<style lang="scss" scoped>
.list {
	padding: 20rpx;
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
