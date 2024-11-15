<template>
	<view class="item box_shadow box_border_radius" @click="open_details">
		<view class="top_cover">
			<view class="cover_box box_border_radius">
				<image class="cover" :src="item.src" mode="aspectFill"></image>
			</view>
			<view class="cover_content">
				<view class="cover_head">
					<view class="title over2">{{ item.title }}</view>
					<view class="specification">{{ item.specification.map((item) => item.name + '×' + item.num).join('/') }}</view>
				</view>
				<view class="price_box">
					<view class="price">
						<text class="icon">￥</text>
						<text class="number">{{ priceToFixed(item.price) }}</text>
					</view>
					<view class="outmoded">原价：￥{{ priceToFixed(item.outmodend_price) }}</view>
				</view>
			</view>
			<view class="shopping_num">
				<text class="icon">×</text>
				<text class="num">{{ item.num }}</text>
			</view>
		</view>
		<view class="order_details">
			<view class="li">
				<view class="name">订单编号</view>
				<view class="val">{{ item.code }}</view>
			</view>
			<view class="li">
				<view class="name">订单状态</view>
				<view class="val">{{ item.status }}</view>
			</view>
			<view class="li">
				<view class="name">订单日期</view>
				<view class="val">{{ formatTimeFn(item.date) }}</view>
			</view>
		</view>
		<view class="stats">
			<view class="cancel_btn">
				<button class="common_btn btn_bg" @click.stop="stateClick('立即核销')" v-if="cancel">立即核销</button>
			</view>
			<view class="right_state">
				<view class="tips">共{{ item.num }}件商品</view>
				<view class="name">总计：</view>
				<view class="price">
					<text class="icon">￥</text>
					<text class="number">{{ item.total_price }}</text>
				</view>
			</view>
		</view>
		<view class="state_btn" v-if="state_btn">
			<button class="common_btn" @click.stop="stateClick('物流信息')">物流信息</button>
			<button class="common_btn" @click.stop="stateClick('申请售后')">申请售后</button>

			<block v-if="head_title_index == 0">
				<button class="common_btn btn_bg" @click.stop="stateClick('立即支付')">立即支付</button>
			</block>
			<block v-else-if="head_title_index == 1">
				<button class="common_btn btn_bg" @click.stop="stateClick('核销码')">核销码</button>
			</block>
		</view>
	</view>
</template>

<script>
import { formatTime } from '@/hooks/format_time.js';
export default {
	props: {
		item: {
			type: Object,
			default: {}
		},
		// 是否显示底部按钮
		state_btn: {
			type: Boolean,
			default: true
		},
		// 物流: 0
		// 自提：1
		head_title_index: {
			type: Number,
			default: 0
		},
		// 待核销、已核销
		cancel: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		// 计算属性金额后面补.00
		priceToFixed(e) {
			const priceNumber = e + '.00';
			return priceNumber;
		},
		formatTimeFn(e) {
			return formatTime(e);
		},
		stateClick(e) {
			this.$emit('stateClick', e);
		},
		open_details() {
			this.$emit('open_details');
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	background: #fff;
	padding: 30rpx;
	margin-bottom: 30rpx;
	.top_cover {
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
			}
		}

		.shopping_num {
			flex: none;
		}
	}

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

	.shopping_num {
		font-size: 26rpx;
		color: #000;
		font-weight: 500;
	}

	.order_details {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding: 20rpx 0 0;
		margin-top: 20rpx;
		.li {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			.name {
				font-size: 28rpx;
				color: #707070;
				font-weight: 500;
			}

			.val {
				font-size: 26rpx;
				color: #000;
				font-weight: 500;
			}
		}
	}

	.stats {
		padding: 20rpx 0 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.right_state {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.tips {
				font-size: 24rpx;
				color: #9a9a9a;
				font-weight: 500;
				padding-right: 20rpx;
			}

			.name {
				font-size: 26rpx;
				color: #000;
				font-weight: 500;
			}
		}
	}

	.state_btn {
		padding-top: 20rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
	}
}

.common_btn {
	width: 190rpx;
	height: 60rpx;
	border-radius: 30px;
	background: #f1f1f1;
	text-align: center;
	line-height: 60rpx;
	font-size: 26rpx;
	color: #878787;
	font-weight: 500;
	&::after {
		display: none;
	}
}

.btn_bg {
	background: linear-gradient(92.65deg, #ff8992 0%, #fdba80 100%);
	color: #fff;
}
</style>
