<!-- 产品列表 -->
<template>
	<!-- 列表 -->
	<view class="list">
		<block v-for="item in list" :key="item.src">
			<view class="item" v-if="item.type == 'type1'" @click="itemClick">
				<uni-transition mode-class="slide-bottom" :show="item ? true : false">
					<view class="item_wrap"></view>
					<view class="cover_box">
						<image class="cover type1" :src="item.src" mode="aspectFill"></image>
					</view>
				</uni-transition>
			</view>
			<view class="item item3" v-else-if="item.type == 'type3'" @click="itemClick">
				<uni-transition mode-class="slide-bottom" :show="item ? true : false">
					<view class="cover_box">
						<image class="cover type3" :src="item.src" mode="aspectFill"></image>
					</view>
				</uni-transition>
			</view>
			<view class="item" v-else @click="itemClick">
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

<script>
export default {
	props: {
		list: {
			type: Array,
			default: []
		}
	},
	methods: {
		// 计算属性金额后面补.00
		priceToFixed(e) {
			const priceNumber = e + '.00';
			return priceNumber;
		},
		// 点击item
		itemClick(e) {
			this.$emit('itemClick', e);
		}
	}
};
</script>

<style lang="scss" scoped>
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
