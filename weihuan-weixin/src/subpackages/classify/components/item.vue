<template>
	<uni-transition :show="Object.keys(item).length > 0" mode-class="fade" :duration="100">
		<view class="item" @click="itemClick(item.id)">
			<view class="cover_box">
				<uv-image
					class="cover"
					:src="item.images[0]"
					width="180rpx"
					height="180rpx"
					radius="6"
					:lazy-load="true"
					:observeLazyLoad="true"
					:fade="true"
					:showLoading="false"
				></uv-image>
			</view>
			<view class="content">
				<view class="title">
					{{ item.title }}
				</view>
				<view class="specification">
					<block v-for="item2 in item.tags" :key="item2.id">
						<image class="cover" :src="item2.image" mode="heightFix" lazy-load></image>
					</block>
				</view>
				<view class="lead over2">
					{{ item.tips }}
				</view>
				<view class="total_price">
					<view class="price_box">
						<text class="symbol">￥</text>
						<text class="price">{{ item.shop_price }}</text>
					</view>
					<view class="primary_price">
						<text class="primary_symbol">原价:</text>
						<text class="price">￥{{ item.market_price }}</text>
					</view>
				</view>
				<!-- <view class="bottom_cart">
					<view class="cart">
						<i class="iconfont icon-gouwuche-tianchong"></i>
					</view>
				</view> -->
			</view>
		</view>
	</uni-transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['itemClick']);
const props = defineProps({
	item: {
		type: Object,
		default: {}
	}
});

function itemClick(id) {
	emit('itemClick', { id });
}
</script>

<style lang="scss" scoped>
.item {
	display: flex;
	margin-bottom: 20rpx;
	background: #fff;
	border-radius: 10rpx;
	overflow: hidden;
	height: 180rpx;
	padding-left: 20rpx;

	.cover_box {
		width: 180rpx;
		height: 100%;
		flex: none;
		overflow: hidden;
		.cover {
			width: 100%;
			height: auto;
		}
	}
	.content {
		flex: 1;
		padding: 10rpx 20rpx;
		position: relative;
		.title {
			font-size: 26rpx;
			color: #000;
			font-weight: 600;
			line-height: 38rpx;
		}

		.specification {
			display: flex;
			align-items: center;
			padding-top: 10rpx;
			.spec {
				height: 30rpx;
				line-height: 30rpx;
				border-radius: 4rpx;
				margin-right: 10rpx;
				padding: 0 20rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #fff;
				overflow: hidden;
			}

			.hot {
				background: linear-gradient(83.83deg, #f24d2a 0%, #f59e33 100%);
			}

			.isPick {
				background: linear-gradient(83.83deg, #2ac2f2 0%, #0b6ff2 100%);
			}

			.cover {
				width: auto;
				height: 30rpx;
				margin-right: 20rpx;
			}
		}

		.lead {
			font-size: 24rpx;
			line-height: 34rpx;
			color: #4a4a4a;
			padding-right: 40rpx;
			margin: 10rpx 0 0;
		}

		.total_price {
			display: flex;
			align-items: center;
			.price_box {
				color: #fc7600;
				font-weight: 600;
				font-size: 28rpx;
				.symbol {
					font-size: 24rpx;
				}
			}

			.primary_price {
				color: #cfcfcf;
				font-weight: 500;
				font-size: 22rpx;
				text-decoration: line-through;
				padding-left: 12rpx;
			}
		}

		.bottom_cart {
			position: absolute;
			bottom: 20rpx;
			right: 20rpx;
			z-index: 1;

			.cart {
				width: 58rpx;
				height: 58rpx;
				border-radius: 50%;
				text-align: center;
				line-height: 58rpx;
				background: #ff8992;
				.iconfont {
					color: #fff;
					font-size: 30rpx;
				}
			}
		}
	}
}
</style>
