<template>
	<uni-transition mode-class="fade" :show="item ? true : false">
		<view class="item box_shadow box_border_radius" @click="openDetailsClick(item.id)">
			<view class="status">
				<view class="status_title">订单状态</view>

				<view class="payment" v-if="item.status == 10 && item.pay_status == 10">
					<text class="name">等待付款</text>
					<uv-count-down :time="timestamp(item.pay_end_time)" autoStart format="HH:mm:ss" @change="timeChange">
						<view class="time">
							<text class="time__item">{{ timeData.minutes }}分</text>
						</view>
					</uv-count-down>
				</view>
				<view class="text" v-else>
					{{ item.status_name }}
				</view>
				<!-- <view class="text" v-else-if="item.status == 10 && item.pay_status == 20 && item.delivery_type == 10 && item.delivery_status == 10">待发货</view>
				<view class="text" v-else-if="item.status == 10 && item.pay_status == 20 && item.delivery_type == 20 && item.receipt_status == 10">待收货</view>
				<view class="text" v-else-if="item.status == 10 && item.pay_status == 20 && item.delivery_type == 20">待自提</view>
				<view class="text" v-else-if="item.status == 30">已完成</view>
				<view class="text" v-else-if="item.status == 20">已取消</view> -->
			</view>
			<view class="top_cover" v-for="item2 in item.order_goods" :key="item2.id">
				<view class="cover_box box_border_radius">
					<uv-image
						class="cover"
						:src="item2.image"
						width="190rpx"
						height="190rpx"
						radius="6"
						:lazy-load="true"
						:observeLazyLoad="true"
						:fade="true"
						duration="200"
					></uv-image>
					<!-- <image class="cover" :src="item2.image" mode="widthFix"></image> -->
				</view>
				<view class="cover_content">
					<view class="cover_head">
						<view class="title over2">{{ item2.goods_name }}</view>
						<view class="specification">{{ item2.key_name }}</view>
					</view>
					<view class="price_box">
						<view class="price">
							<text class="icon">￥</text>
							<text class="number">{{ item2.pay_price }}</text>
						</view>
						<view class="outmoded">原价:￥{{ item2.market_price }}</view>
					</view>
					<view class="after_sale">
						<button class="btn" v-if="item.status == 30 && item2.is_refund == 0 && item2.is_expire_refund == 0">退款/售后</button>
					</view>
				</view>
				<view class="shopping_num">
					<uni-icons type="closeempty" size="12"></uni-icons>
					<text class="num">{{ item2.goods_num }}</text>
				</view>
			</view>

			<view class="state_btn">
				<!-- 待付款 -->
				<button class="common_btn btn_bg" @click.stop="statusBtnClick({ type: 'payment', data: { order_id: item.id } })" v-if="item.status == 10 && item.pay_status == 10">
					立即支付
				</button>
				<!-- 发货之前 -->
				<button
					class="common_btn"
					@click.stop="statusBtnClick({ type: 'cancel', data: { order_id: item.id } })"
					v-if="item.status == 10 && item.pay_status == 20 && item.delivery_type == 10 && item.delivery_status == 10"
				>
					取消订单
				</button>
				<!-- 待收货状态 -->
				<button
					class="common_btn"
					@click.stop="statusBtnClick({ type: 'logistics', data: { order_id: item.id } })"
					v-if="head_title_index == 0 && item.status == 10 && item.pay_status == 20 && item.delivery_type == 10 && item.receipt_status == 10"
				>
					物流信息
				</button>
				<!-- 核销码，发货之后就展示核销码 -->
				<button
					v-if="head_title_index == 1 && item.status == 10 && item.pay_status == 20 && item.delivery_type == 20"
					class="common_btn btn_bg"
					@click.stop="statusBtnClick('核销码')"
				>
					核销码
				</button>
			</view>
		</view>
	</uni-transition>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { formatTime, timestamp } from '@/hooks/useTool.js';

const emit = defineEmits(['statusBtn', 'orderDetails']);

const props = defineProps({
	item: {
		type: Object,
		default: () => {
			return {};
		}
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
});

// 倒计时时间对象
const timeData = ref({});

// 底部按钮点击
const statusBtnClick = (params) => {
	emit('statusBtn', params);
};

// 跳转详情
const openDetailsClick = (id) => {
	emit('orderDetails', id);
};

// 倒计时
const timeChange = (e) => {
	// console.log(e);
	timeData.value = e;
};
</script>

<style lang="scss" scoped>
.item {
	background: #fff;
	padding: 20rpx 20rpx 10rpx;
	margin-bottom: 20rpx;
	.status {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 20rpx;

		.status_title {
			font-size: 28rpx;
			font-weight: 600;
		}

		.payment {
			font-size: 26rpx;
			font-weight: 500;
			color: fe968d;
			display: flex;
			align-items: center;
			color: #fff;
			border-radius: 24rpx 0 24rpx 0;
			font-size: 24rpx;
			padding: 10rpx 20rpx;
			background: #ff0000;
		}

		.text {
			font-size: 24rpx;
			color: #000;
		}
	}
	.top_cover {
		padding: 10rpx 0;
		position: relative;
		display: flex;
		justify-content: space-between;
		.cover_box {
			flex: none;
			overflow: hidden;
			width: 190rpx;
			height: 190rpx;
			.cover {
				width: 190rpx;
				height: 190rpx;
			}
		}

		.cover_content {
			flex: 1;
			padding: 0 0 0 10rpx;
			.cover_head {
				.title {
					font-size: 26rpx;
					line-height: 36rpx;
					font-weight: 600;
					padding-right: 60rpx;
				}

				.specification {
					font-size: 24rpx;
					color: #acacac;
					padding: 10rpx 0;
				}
			}

			.price_box {
				display: flex;
				align-items: flex-end;
			}
		}

		.shopping_num {
			flex: none;
		}
	}

	.price {
		display: flex;
		align-items: center;
		.icon {
			font-size: 24rpx;
			line-height: 34rpx;
			color: #ff0000;
			font-weight: 500;
		}
		.number {
			font-size: 34rpx;
			color: #ff0000;
			font-weight: 600;
		}
	}

	.outmoded {
		font-size: 24rpx;
		line-height: 34rpx;
		color: #cfcfcf;
		text-decoration: line-through;
		padding-left: 20rpx;
	}

	.shopping_num {
		font-size: 26rpx;
		color: #000;
		font-weight: 500;
		position: absolute;
		top: 12rpx;
		right: 0;
	}

	.after_sale {
		text-align: right;

		.btn {
			// background: #fff;
			font-size: 20rpx;
			padding: 0 24rpx;
			height: 50rpx;
			line-height: 50rpx;
			border-radius: 46rpx;
			display: inline-block;
			margin-left: 20rpx;
			background: #f1f1f1;
			color: #878787;
		}
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
		text-align: right;
		button {
			display: inline-block;
			margin-left: 20rpx;
		}
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
