<!-- 产品列表 -->
<template>
	<!-- 列表 -->
	<view class="list">
		<block v-for="item in list" :key="item.src">
			<view class="item" @click="debounceClick(item.id)">
				<uni-transition mode-class="slide-bottom" :show="item ? true : false">
					<view class="cover_box">
						<image class="cover" :src="item.images[0]" mode="widthFix"></image>
					</view>
					<view class="content">
						<view class="title over1">
							{{ item.title }}
						</view>
						<view class="specification">
							<block v-for="item2 in item.tags" :key="item2.id">
								<image class="cover" :src="item2.image" mode="heightFix" lazy-load></image>
							</block>
						</view>
						<view class="bottom_cart">
							<view class="left">
								<view class="tips">{{ item.cate_name }}</view>
							</view>
							<view class="cart">
								<i class="iconfont icon-gouwuche-tianchong"></i>
							</view>
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
					</view>
				</uni-transition>
			</view>
		</block>
	</view>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import _ from 'underscore';

const id = ref('');
const emit = defineEmits(['itemClick']);

const props = defineProps({
	list: {
		type: Array,
		default: []
	}
});

const returnClick = (id) => {
	emit('itemClick', id);
};

const debounceClick = _.debounce(returnClick, 300);

</script>

<style lang="scss" scoped>
// 列表
.list {
	padding: 24rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	.item {
		width: calc(50% - 10rpx);
		margin-bottom: 20rpx;
		background: #fff;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
		overflow: hidden;

		.cover_box {
			.cover {
				display: block;
				width: 100%;
				overflow: hidden;
			}
		}

		.content {
			padding: 10rpx 18rpx;
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

			.total_price {
				padding: 8rpx 0;
				display: flex;
				align-items: center;
				.price_box {
					// color: #fc7600;
					color: #f00;
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
