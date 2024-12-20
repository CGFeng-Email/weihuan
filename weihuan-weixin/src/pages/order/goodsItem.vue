<template>
	<view class="shopping box_shadow box_border_radius">
		<image class="cover box_border_radius" :src="goods.image" mode="aspectFill"></image>
		<view class="content">
			<view class="shopping_top">
				<view class="title over2">{{ goods.goods_name }}</view>
				<view class="spec">
					<text>{{ goods.key_name }}</text>
				</view>
			</view>
			<view class="shopping_bottom">
				<view class="price_box">
					<text class="symbol">￥</text>
					<text class="price">{{ goods.price }}</text>
					<text class="primary_price">￥{{ goods.market_price }}</text>
				</view>
				<view class="quantity_box">
					<view class="icon">
						<i class="iconfont icon-jianhao"></i>
					</view>
					<view class="quantity_number">{{ goods.goods_num }}</view>
					<view class="icon">
						<i class="iconfont icon-jia"></i>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
	goods: {
		type: Object,
		default: {}
	}
});
</script>

<style lang="scss" scoped>
.shopping {
	padding: 24rpx;
	background: #fff;
	margin-bottom: 24rpx;
	display: flex;
	justify-content: space-between;
	.cover {
		width: 190rpx;
		height: 190rpx;
		flex: none;
	}

	.content {
		flex: 1;
		padding-left: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.shopping_top {
			.title {
				font-size: 30rpx;
				line-height: 40rpx;
				font-weight: 600;
			}

			.spec {
				font-size: 24rpx;
				color: #acacac;
				padding-top: 10rpx;
			}

			.store_count {
				padding-left: 20rpx;
			}
		}

		.shopping_bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.price_box {
				color: #ff0000;
				font-weight: 600;
				font-size: 24rpx;
				padding-right: 10rpx;
				.price {
					font-size: 34rpx;
					padding-right: 10rpx;
				}

				.primary_price {
					font-weight: 500;
					color: #cbcbcb;
					text-decoration: line-through;
				}
			}

			.quantity_box {
				display: flex;
				align-items: center;
				.icon {
					width: 40rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					line-height: 40rpx;
					background: #d8d8d8;
					border-radius: 8rpx;
					.iconfont {
						font-size: 24rpx;
						color: #000;
						font-weight: 600;
					}
				}

				.quantity_number {
					padding: 0 20rpx;
				}
			}
		}
	}
}
</style>
