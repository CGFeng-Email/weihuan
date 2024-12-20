<!-- 退换商品 -->
<template>
	<view class="main">
		<!-- 商品 -->
		<GoodsItem :goods="goods"></GoodsItem>

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
						<text class="price">{{ goods.price }}</text>
					</view>
				</view>
				<view class="tips">不可修改，最多¥{{ goods.price }} ，含发货邮费¥{{ orderFreight }}</view>
			</view>
		</view>

		<view class="card_box box_border_radius box_shadow">
			<view class="title">补充描述和凭证</view>
			<view class="input_box">
				<textarea v-model="textarta" maxlength="300" placeholder="请填写反馈内容" class="textarea box_shadow" />
			</view>
			<uni-file-picker ref="file" v-model="upList" fileMediatype="image" mode="grid" return-type="array" limit="1" :auto-upload="false" @select="select" @delete="updelete">
				<view class="up_button">
					<image src="/static/img/up.png" mode="aspectFit"></image>
					<view class="text">上传图片</view>
				</view>
			</uni-file-picker>
		</view>
	</view>

	<bottomButton @bottom_click="bottom_click" title="提交申请"></bottomButton>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import GoodsItem from './goodsItem.vue';
import bottomButton from '../component/bottom.vue';
import { imageBase64 } from '@/hooks/useTool.js';
import { uploadImg, applyFor } from '@/api/index.js';

// 商品id
const goodsId = ref('');
// 售后类型
const afterSaleType = ref('');
// 商品
const goods = ref({});
// 运费
const orderFreight = ref(0);
// 说明备注
const textarta = ref('');
// 静态上传列表
const upList = ref([]);
// 上传到服务器列表
const list = ref([]);
// 上传组件
const file = ref(null);
const statusIndex = ref(-1);
const retreatIndex = ref(-1);
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

function status_change(e) {
	statusIndex.value = e.detail.value;
}

function retreat_change(e) {
	retreatIndex.value = e.detail.value;
}

// 上传
const upload = async (url) => {
	// 转化成base64
	const base64 = await imageBase64(url, 'png');
	// 上传到服务器
	const getUploadImg = await uploadImg({ file: base64 });
	console.log('上传到服务器', getUploadImg);
	if (getUploadImg.code == 1) {
		list.value.push(getUploadImg.data.url);
	}
	console.log('list', list.value);
};

// 选择文件后触发
const select = async (e) => {
	console.log('选择文件后触发', e);
	const tempFilePaths = e.tempFilePaths;
	if (tempFilePaths.length > 0) {
		await upload(tempFilePaths[0]);
	}
};

// 文件从列表移除时触发
function updelete(e) {
	console.log('文件从列表移除时触发', e);
	list.value.splice(e.index, 1);
}

// 提交申请售后
const bottom_click = async () => {
	if (statusIndex.value == -1) {
		uni.showToast({
			title: '请选择货物状态',
			mask: true,
			icon: 'none',
			duration: 2000
		});
		return;
	}
	if (retreatIndex.value == -1) {
		uni.showToast({
			title: '请选择退换原因',
			mask: true,
			icon: 'none',
			duration: 2000
		});
		return;
	}
	const params = {
		order_goods_id: goodsId.value,
		type: afterSaleType.value,
		apply_desc: textarta.value,
		images: list.value,
		goods_status: status_list.value[statusIndex.value].title,
		reason: retreat_list.value[retreatIndex.value].title
	};
	const res = await applyFor(params);
	console.log('提交申请售后', res);
	if (res.code == 1) {
		uni.showToast({
			title: res.msg,
			mask: true,
			icon: 'none',
			duration: 2000,
			success: () => {
				setTimeout(() => {
					uni.navigateBack({
						delta: 2
					});
				}, 2000);
			}
		});
	}
};

onLoad((load) => {
	console.log('load', load);
	goodsId.value = load.goodsId;
	afterSaleType.value = load.type;
	orderFreight.value = load.orderFreight;
	goods.value = JSON.parse(load.goods);
	console.log('goods', goods.value);
});
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
