<!-- 退换商品 -->
<template>
	<view class="main">
		<OrderItem :item="item" :state_btn="false"></OrderItem>

		<view class="retreat_box card_box box_border_radius box_shadow">
			<view class="title">退货信息</view>
			<view class="retreat_list">
				<view class="retreat_li">
					<view class="name">
						<text class="text">货物状态</text>
						<text class="require">*</text>
					</view>
					<view class="content">
						<picker @change="status_change" :value="statusIndex" :range="status_list" range-key="title">
							<view class="uni-input">
								<text class="details_text" v-if="statusIndex == -1">请选择货物状态</text>
								<text class="text" v-else>{{ status_list[statusIndex].title }}</text>
							</view>
						</picker>
					</view>
					<view class="right_icon">
						<uni-icons type="right" size="18" color="#A8A8A8"></uni-icons>
					</view>
				</view>
				<view class="retreat_li">
					<view class="name">
						<text class="text">退款原因</text>
						<text class="require">*</text>
					</view>
					<view class="content">
						<picker @change="retreat_change" :value="retreatIndex" :range="retreat_list" range-key="title">
							<view class="uni-input">
								<text class="details_text" v-if="retreatIndex == -1">请选择退款原因</text>
								<text class="text" v-else>{{ retreat_list[retreatIndex].title }}</text>
							</view>
						</picker>
					</view>
					<view class="right_icon">
						<uni-icons type="right" size="18" color="#A8A8A8"></uni-icons>
					</view>
				</view>
				<view class="retreat_li">
					<view class="name">
						<text class="text">退款金额</text>
					</view>
					<view class="content">
						<text class="money">￥</text>
						<text class="price">332.00</text>
					</view>
				</view>
				<view class="tips">不可修改，最多¥332.00，含发货邮费¥0.00</view>
			</view>
		</view>

		<view class="card_box box_border_radius box_shadow">
			<view class="title">补充描述和凭证</view>
			<view class="input_box">
				<textarea v-model="textarta" maxlength="300" placeholder="请填写反馈内容" class="textarea box_shadow" />
			</view>
			<uni-file-picker v-model="upList" fileMediatype="image" mode="grid" :limit="5" :auto-upload="false" @select="select" @success="success" @fail="fail" @delete="updelete">
				<view class="up_button">
					<image src="/static/img/up.png" mode="aspectFit"></image>
					<view class="text">
						上传图片
						<br />
						最多5张
					</view>
				</view>
			</uni-file-picker>
		</view>
	</view>
	
	<bottomButton @bottom_click="bottom_click" title="提交申请"></bottomButton>
</template>

<script setup>
import OrderItem from './item.vue';
import bottomButton from '../component/bottom.vue';
import { ref } from 'vue';
const textarta = ref('');
const upList = ref([]);

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

const status_list = ref([
	{
		title: '未拆封完好无损'
	},
	{
		title: '已拆封，无损不影响二次销售'
	},
	{
		title: '已拆封，细微磨损不影响二次销售'
	}
]);

const retreat_list = ref([
	{
		title: '商家无货联系我取消订单'
	},
	{
		title: '商品降价'
	},
	{
		title: '不想要了'
	},
	{
		title: '商品错选/多选'
	},
	{
		title: '地址信息填写错误'
	},
	{
		title: '没用/少用/错用优惠'
	}
]);

const statusIndex = ref(-1);
const retreatIndex = ref(-1);

function status_change(e) {
	statusIndex.value = e.detail.value;
}

function retreat_change(e) {
	retreatIndex.value = e.detail.value;
}

// 选择文件后触发
function select(e) {
	console.log('选择文件后触发', e);
}

// 上传成功
function success(e) {
	console.log('上传成功', e, upList.value);
}

// 上传失败
function fail(e) {
	console.log('上传失败：', e);
}

// 文件从列表移除时触发
function updelete(e) {
	console.log('文件从列表移除时触发', e);
}

function bottom_click() {
	console.log('点击');
	uni.navigateBack()
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

	.retreat_box {
		.retreat_list {
			.retreat_li {
				padding: 12rpx 0;
				display: flex;
				justify-content: space-between;

				.name {
					flex: none;
					.text {
						font-size: 28rpx;
						color: #000;
						font-weight: 500;
					}

					.require {
						color: #ff0000;
					}
				}

				.content {
					flex: 1;
					text-align: right;
					padding: 0 10rpx;

					.details_text {
						font-size: 24rpx;
						color: #b8b8b8;
						font-weight: 500;
					}

					.text {
						font-size: 24rpx;
						line-height: 34rpx;
						color: #000;
						font-weight: 500;
					}

					.money {
						font-size: 24rpx;
						color: #ff0000;
						font-weight: 500;
					}

					.price {
						font-size: 30rpx;
						color: #ff0000;
						font-weight: 600;
					}
				}

				.right_icon {
					flex: none;
					padding-top: 4rpx;
				}
			}
		}

		.tips {
			font-size: 24rpx;
			color: #b8b8b8;
			padding: 10rpx 0;
		}
	}
}

.input_box {
	margin-bottom: 40rpx;
	.input {
		background: #f8f8f8;
		height: 90rpx;
		line-height: 90rpx;
		box-shadow: 4rpx;
		padding: 0 14rpx;
		font-size: 26rpx;
		color: #000;
	}
	.textarea {
		padding: 14rpx;
		box-shadow: 4rpx;
		font-size: 26rpx;
		color: #000;
		height: 160rpx;
		background: #f8f8f8;
	}
}

.up_button {
	text-align: center;
	image {
		width: 45rpx;
		height: 45rpx;
	}
	.text {
		font-size: 24rpx;
		line-height: 34rpx;
		color: #b8b8b8;
		padding-top: 10rpx;
	}
}

</style>
