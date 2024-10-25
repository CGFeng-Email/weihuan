<template>
	<view class="main">
		<OrderItem :item="item" :state_btn="false"></OrderItem>

		<!-- 自提点 -->
		<view class="store_box card_box box_border_radius box_shadow">
			<view class="title">自提点</view>

			<view class="store_info">
				<image class="cover" :src="store.image" mode="aspectFill"></image>
				<view class="content">
					<view class="store_top">
						<view class="title over2">
							{{ store.callout.content }}
						</view>
						<view class="distance">
							{{ store.distance }}
						</view>
					</view>
					<view class="store_bottom">
						<view class="li">
							<text class="name">联系人：</text>
							<text class="text">{{ store.store }}</text>
						</view>
						<view class="li">
							<text class="name">联系电话：</text>
							<text class="text">{{ store.mobile }}</text>
						</view>
						<view class="li">
							<text class="name">营业时间：</text>
							<text class="text">{{ store.date }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="address">
				<view class="location over2">
					{{ store.title }}
				</view>
				<view class="location_btn btn_bg" @click.stop="openLocation">
					<text class="iconfont icon-dizhi"></text>
					<text class="text">导航</text>
				</view>
			</view>
		</view>

		<view class="card_box box_border_radius box_shadow">
			<view class="title">客户信息</view>
			<view class="order_details">
				<view class="li">
					<view class="name">发货时间</view>
					<view class="val">{{ formatTime(item.code) }}</view>
				</view>
				<view class="li">
					<view class="name">收货人</view>
					<view class="val">{{ item.name }}</view>
				</view>
				<view class="li">
					<view class="name">手机号</view>
					<view class="val">{{ item.phone }}</view>
				</view>
				<view class="li">
					<view class="name">地址</view>
					<view class="val">{{ item.address }}</view>
				</view>
				<view class="li">
					<view class="name">物流公司</view>
					<view class="val">{{ item.logistics }}</view>
				</view>
				<view class="li">
					<view class="name">物流单号</view>
					<view class="val">{{ item.logistics_code }}</view>
				</view>
			</view>
		</view>

		<view class="card_box box_border_radius box_shadow">
			<view class="title">订单信息</view>
			<view class="order_details">
				<view class="li">
					<view class="name">订单编号</view>
					<view class="val">{{ item.order_code }}</view>
				</view>
				<view class="li">
					<view class="name">下单时间</view>
					<view class="val">{{ formatTime(item.order_deta) }}</view>
				</view>
				<view class="li">
					<view class="name">订单状态</view>
					<view class="val">{{ item.order_status }}</view>
				</view>
				<view class="li">
					<view class="name">配送费</view>
					<view class="val">{{ item.order_style }}</view>
				</view>
				<view class="li">
					<view class="name">支付状态</view>
					<view class="val">{{ item.order_price_status }}</view>
				</view>
				<view class="li">
					<view class="name">订单备注</view>
					<view class="val">{{ item.order_textarea }}</view>
				</view>
			</view>
		</view>
	
		<Bottom title="确认核销" />
	</view>
</template>

<script setup>
import OrderItem from './item.vue';
import Bottom from '@/pages/component/bottom.vue';
import { ref } from 'vue';
import { formatTime } from '/src/hooks/format_time.js';

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

// 自提点
const store = ref({
	id: 3,
	width: 28,
	height: 41,
	latitude: 23.12463,
	longitude: 113.36199,
	title: '广东省广州市天河区黄埔大道中258号',
	iconPath: '/static/img/map.png',
	image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop.png',
	store: '陈先生',
	mobile: 13636986542,
	date: '09:00 - 23:00',
	distance: '200m',
	callout: {
		content: '黄埔大道中258号店',
		display: 'ALWAYS',
		textAlign: 'center',
		padding: '6',
		bgColor: '#fff',
		borderRadius: 8,
		fontSize: 14,
		color: '#000'
	}
});

// 使用应用内置地图查看位置
const openLocation = (latitude, longitude) => {
	uni.openLocation({
		latitude: store.value.latitude,
		longitude: store.value.longitude,
		address: store.value.title,
		name: store.value.callout.content
	});
};
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

.store_box {
	.store_info {
		display: flex;
		justify-content: space-between;

		.cover {
			width: 210rpx;
			height: 210rpx;
			flex: none;
		}

		.content {
			flex: 1;
			padding-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.store_top {
				display: flex;
				justify-content: space-between;
				.title {
					font-size: 28rpx;
					font-weight: bold;
					flex: 1;
				}

				.distance {
					font-size: 24rpx;
					color: #c2c2c2;
					flex: none;
				}
			}

			.store_bottom {
				.li {
					font-size: 24rpx;
					color: #999999;
					line-height: 34rpx;
					margin-bottom: 8rpx;
				}
			}
		}
	}

	.address {
		margin-top: 20rpx;
		padding-top: 20rpx;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		.location {
			font-size: 24rpx;
			color: #999999;
			flex: 1;
			margin-top: 6rpx;
		}

		.location_btn {
			flex: none;
			width: 124rpx;
			height: 52rpx;
			line-height: 52rpx;
			text-align: center;
			font-size: 24rpx;
			color: #fff;
			border-radius: 45rpx;
			.iconfont {
				font-size: 24rpx;
				padding-right: 8rpx;
			}
		}
	}
}
</style>
