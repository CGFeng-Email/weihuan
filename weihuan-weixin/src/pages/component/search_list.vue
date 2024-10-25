<template>
	<view class="list">
		<block v-for="(item, index) in list" :key="item.id">
			<view class="item" @click="open_shopping_details">
				<view class="cover_box box_border_radius">
					<image class="cover" :src="item.src" mode="aspectFill"></image>
				</view>
				<view class="cover_content">
					<view class="cover_head">
						<view class="title over2">{{ item.title }}</view>
						<view class="specification">
							{{ item.tips }}
						</view>
					</view>
					<view class="price_box">
						<view class="price">
							<text class="icon">￥</text>
							<text class="number">{{ priceToFixed(item.price) }}</text>
						</view>
						<view class="outmoded">原价：￥{{ priceToFixed(item.outmodend_price) }}</view>
					</view>
				</view>
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
		// 跳转商品详情
		open_shopping_details() {
			uni.navigateTo({
				url: '/pages/shopping/place_an_order'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.list {
	background: #fff;
	.item {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		.cover_box {
			flex: none;
			overflow: hidden;
			height: 190rpx;
			.cover {
				width: 190rpx;
				height: 190rpx;
			}
		}

		.cover_content {
			flex: 1;
			padding: 0 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.cover_head {
				.title {
					font-size: 26rpx;
					line-height: 36rpx;
					font-weight: 600;
				}

				.specification {
					font-size: 24rpx;
					color: #acacac;
					padding: 10rpx 0;
				}
			}

			.price_box {
				display: flex;
				align-items: center;
				.price {
					.icon {
						font-size: 26rpx;
						line-height: 36rpx;
						color: #ff0000;
						font-weight: 500;
					}
					.number {
						font-size: 36rpx;
						color: #ff0000;
						font-weight: 600;
					}
				}
				
				.outmoded {
					font-size: 24rpx;
					line-height: 34rpx;
					color: #cfcfcf;
					text-decoration: line-through;
					padding-left: 10rpx;
				}
			}
		}
	}
}
</style>
