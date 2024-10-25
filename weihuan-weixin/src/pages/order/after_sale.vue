<!-- 申请售后 -->
<template>
	<view class="main">
		<OrderItem :item="item" :state_btn="false"></OrderItem>

		<view class="service_type card_box box_border_radius box_shadow">
			<view class="title">选择服务类型</view>
			<view class="ul">
				<block v-for="(item, index) in service_list" :key="item.type">
					<view class="serve_li" @click="open_retreat">
						<image class="cover" :src="item.image" mode="aspectFill"></image>
						<view class="content">
							<view class="name">{{ item.name }}</view>
							<view class="lead">{{ item.lead }}</view>
						</view>
						<uni-icons type="right" size="18" color="#A8A8A8"></uni-icons>
					</view>
				</block>
			</view>
		</view>

		<view class="tips">提醒：不影响二次销售，可享受7天无理由退换货。</view>
	</view>
</template>

<script setup>
import OrderItem from './item.vue';
import { ref } from 'vue';

const item = ref({
	id: 1,
	src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
	type: 'type2',
	title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
	specification: [
		{
			name: '原味',
			num: 3
		},
		{
			name: '雪域牛乳',
			num: 2
		}
	],
	boom: true,
	price: 130,
	outmodend_price: 210,
	total_price: 332,
	tips: '全程冻品冷链运输，保质保鲜',
	location: '广州',
	num: 1,
	code: 2021053100011,
	status: '待付款',
	date: 1729580946317,
	name: '谷志华',
	phone: 13654345217,
	address: '广东省广州市天河区中山大道中38号',
	logistics: '圆通速递',
	logistics_code: 123654231258,
	order_code: 2021053100111,
	order_deta: 1729588815329,
	order_status: '已发货',
	order_style: '包邮',
	order_price_status: '已支付',
	order_textarea: '暂无备注信息'
});

const service_list = ref([
	{
		type: 'price',
		image: '/static/img/service_price.png',
		name: '我要退款（无需退货）',
		lead: '没收到货，或与卖家协商同意不用退货只退款'
	},
	{
		type: 'retreat',
		image: '/static/img/retreat.png',
		name: '我要退货退款',
		lead: '已收到货，需要退还收到的货物'
	},
	{
		type: 'exchange',
		image: '/static/img/exchange.png',
		name: '我要换货',
		lead: '已收到货，需要更换收到的货物'
	}
]);

// 跳转退换商品
function open_retreat() {
	uni.navigateTo({
		url: '/pages/order/retreat'
	})
}
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.main {
	padding: 30rpx;
}

.service_type {
	.ul {
		.serve_li {
			padding: 20rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.cover {
				width: 70rpx;
				height: 70rpx;
				flex: none;
			}

			.content {
				flex: 1;
				padding: 0 30rpx;
				.name {
					font-size: 28rpx;
					font-weight: 500;
					padding: 7rpx 0;
				}

				.lead {
					font-size: 24rpx;
					line-height: 34rpx;
					color: #b8b8b8;
					padding: 7rpx 0;
				}
			}
		}
	}
}

.tips {
	font-size: 24rpx;
	text-align: center;
	color: #9C9C9C;
}
</style>
