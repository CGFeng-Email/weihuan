<template>
	<page-meta :page-style="'overflow:' + (isScroll ? 'hidden' : 'visible')"></page-meta>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="navigation_wrap">
			<view class="navigation box_border_radius box_shadow">
				<view class="navigation_btn" :class="{ active: head_title_index == 0 }" @click="switchPage(0)">配送蓝</view>
				<view class="navigation_btn" :class="{ active: head_title_index == 1 }" @click="switchPage(1)">自提蓝</view>
			</view>
		</view>
	</view>
	<view :style="{ height: useMenuButton().topView }"></view>
	<view class="main">
		<view class="list box_border_radius box_shadow">
			<block v-for="(item, index) in cartList" :key="item.id">
				<view class="item">
					<uni-swipe-action>
						<uni-swipe-action-item>
							<view class="shopping_item">
								<uni-icons
									class="icon"
									:type="item.check ? 'checkbox-filled' : 'circle'"
									size="24"
									:color="item.check ? '#FF8992' : '#bcbcbc'"
									@click="switchIcon(index)"
								></uni-icons>
								<view class="right_content" @click="jump_order_details">
									<image class="cover box_border_radius" :src="item.src" mode="aspectFill"></image>
									<view class="content">
										<view class="shopping_top">
											<view class="title over2">{{ item.title }}</view>
											<view class="specification">
												<view class="hot spec">畅销</view>
												<view class="isPick spec">不可自提</view>
											</view>
											<view class="spec">{{ item.sku }}</view>
										</view>
										<view class="shopping_bottom">
											<view class="price_box">
												<text class="symbol">￥</text>
												<text class="price">{{ priceToFixed(item.price) }}</text>
											</view>
											<view class="quantity_box">
												<view class="icon" @click.stop="deCrement(index)">
													<i class="iconfont icon-jianhao"></i>
												</view>
												<view class="quantity_number">{{ item.quantity }}</view>
												<view class="icon" @click.stop="inCrement(index)">
													<i class="iconfont icon-jia"></i>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>

							<template v-slot:right>
								<view class="item_del" @click="item_del(index)"><text>删除</text></view>
							</template>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</block>
		</view>
	</view>

	<view class="recomment_title">
		<text class="line"></text>
		<text class="title">猜你喜欢</text>
		<text class="line"></text>
	</view>

	<List :list="shopping_list" @itemClick="jump_order_details"></List>

	<view style="height: 160rpx"></view>

	<view class="bottom_cart">
		<view class="check_all" @click="switch_check_all">
			<uni-icons :type="computedCheckAll ? 'checkbox-filled' : 'circle'" size="24" :color="computedCheckAll ? '#FF8992' : '#bcbcbc'"></uni-icons>
			<text class="text">全选</text>
		</view>
		<view class="right_cart">
			<view class="describe">
				<view class="total_price">
					<text class="name">合计:</text>
					<text class="icon">￥</text>
					<text class="price">{{ priceToFixed(total_price) }}</text>
				</view>
				<view class="details" @click="open_popup">
					<text class="text">共减: ￥20.00</text>
					<text class="price_details">优惠明细</text>
					<uni-icons :type="isScroll ? 'up' : 'down'" size="12" color="#FF0000"></uni-icons>
				</view>
			</view>
			<button class="pay_btn btn_bg" :class="{ disabled_bg: isPayment }" :disabled="isPayment" @click="jump_place_order">去支付</button>
		</view>
	</view>

	<uni-popup ref="cart_popup" type="bottom" @maskClick="hide_popup">
		<view class="cart_popup_content">
			<view class="close" @click="hide_popup">
				<uni-icons type="closeempty" size="20" color="#000"></uni-icons>
			</view>
			<view class="cart_popup_head">
				<view class="title">金额明细</view>
				<view class="lead">实际金额以提交订单页金额为准</view>
			</view>
			<view class="list">
				<view class="lis">
					<view class="name">商品总价</view>
					<view class="total_price">￥{{ priceToFixed(total_price) }}</view>
				</view>
				<view class="lis">
					<view class="name">配送费</view>
					<view class="total_price">￥{{ priceToFixed(total_price) }}</view>
				</view>
				<view class="lis">
					<view class="name">共减</view>
					<view class="total_price">￥{{ priceToFixed(total_price) }}</view>
				</view>
				<view class="lis">
					<view class="name">合计</view>
					<view class="total_price">￥{{ priceToFixed(total_price) }}</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
// 列表组件
import List from '@/pages/shopping/list.vue';
import { ref, computed, watch } from 'vue';
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
// 防止弹窗打开后，页面继续滚动
const isScroll = ref(false);
// 明细弹窗
const cart_popup = ref(null);
// 自提产品:0，物流产品:1
const head_title_index = ref(0);
// 页面切换
function switchPage(i) {
	if (head_title_index.value == i) return;
	uni.showLoading({
		title: '加载中',
		mask: true,
		success: () => {
			setTimeout(() => {
				head_title_index.value = i;
				uni.hideLoading();
			}, 300);
		}
	});
}
// 打开明细弹窗
function open_popup() {
	if (isScroll.value) {
		hide_popup();
	} else {
		isScroll.value = true;
		cart_popup.value.open();
	}
}
// 关闭明细弹窗
function hide_popup() {
	isScroll.value = false;
	cart_popup.value.close();
}

// 购物车列表
const cartList = ref([
	{
		id: 1,
		check: true,
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/product_banner1.png',
		title: '盒子慕斯罐小蛋糕',
		sku: '原味*3+雪域牛乳*3',
		quantity: 1,
		price: 150
	},
	{
		id: 2,
		check: true,
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/product_banner1.png',
		title: '盒子慕斯罐小蛋糕',
		sku: '原味*3+雪域牛乳*3',
		quantity: 1,
		price: 120
	},
	{
		id: 3,
		check: true,
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
		title: '盒子慕斯罐小蛋糕',
		sku: '原味*3+雪域牛乳*3',
		quantity: 1,
		price: 100
	},
	{
		id: 4,
		check: true,
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		sku: '原味*3+雪域牛乳*3',
		quantity: 1,
		price: 80
	},
	{
		id: 5,
		check: true,
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
		title: '盒子慕斯罐小蛋糕',
		sku: '原味*3+雪域牛乳*3',
		quantity: 1,
		price: 70
	},
	{
		id: 6,
		check: true,
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
		title: '盒子慕斯罐小蛋糕',
		sku: '原味*3+雪域牛乳*3',
		quantity: 1,
		price: 50
	}
]);

// 推荐商品列表
const shopping_list = ref([
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: true,
		price: 130,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 120,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 110,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 100,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 180,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: true,
		price: 130,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	}
]);

// 计算属性金额后面补.00
const priceToFixed = computed(() => {
	return (e) => {
		const priceNumber = e + '.00';
		return priceNumber;
	};
});

// 商品icon切换
const switchIcon = (index) => {
	cartList.value[index].check = !cartList.value[index].check;
};

// 购买数量 减
const deCrement = (index) => {
	if (cartList.value[index].quantity <= 1) return;
	cartList.value[index].quantity -= 1;
};

// 购买数量 加
const inCrement = (index) => {
	cartList.value[index].quantity += 1;
};

// 删除
const item_del = (index) => {
	cartList.value.splice(index, 1);
};

// 计算属性 - 全选
const computedCheckAll = computed(() => {
	for (let i in cartList.value) {
		if (!cartList.value[i].check) {
			return false;
			break;
		}
	}

	return true;
});

// 点击切换全选
const switch_check_all = () => {
	console.log('computedCheckAll', computedCheckAll.value);
	const isCheck = !computedCheckAll.value;
	const list = cartList.value.map((item) => {
		item.check = isCheck;
		return item;
	});
	console.log('list', list);
};

// 计算属性 - 总金额
const total_price = computed(() => {
	// 总金额
	let price_number = 0;
	// 计算出每一个商品的金额
	const list = cartList.value.map((item) => {
		return Number(item.price) * Number(item.quantity);
	});

	if (list.length > 0) {
		list.forEach((item) => {
			price_number += item;
		});
	}

	return price_number;
});

// 是否能支付
const isPayment = ref(true);
watch(
	() => cartList.value.map((item) => item.check),
	(newVal, oldVal) => {
		const isIndex = newVal.findIndex((item) => item == true);
		if (isIndex >= 0) {
			isPayment.value = false;
		} else {
			isPayment.value = true;
		}
	},
	{
		immediate: true
	}
);

// 跳转商品详情
const jump_order_details = () => {
	uni.navigateTo({
		url: '/pages/shopping/place_an_order'
	});
};

// 去支付
const jump_place_order = () => {
	uni.navigateTo({
		url: '/pages/shopping/confirm_an_order'
	});
};
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.top {
	background: #fff;
}

.page_title {
	background: #fff;
	display: flex;
}

.main {
	padding: 10rpx 30rpx;
	.list {
		overflow: hidden;
		.item {
			.shopping_item {
				padding: 40rpx 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.icon {
					flex: none;
				}

				.right_content {
					padding-left: 20rpx;
					flex: 1;
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
						}

						.specification {
							display: flex;
							align-items: center;
							padding-top: 10rpx;
							.spec {
								height: 34rpx;
								line-height: 34rpx;
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
								display: flex;
								align-items: center;
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
			}

			.item_del {
				background: #ff0000;
				height: 100%;
				text-align: center;
				padding: 0 50rpx;
				color: #fff;
				font-weight: 500;
				font-size: 26rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}

.total_price {
	padding: 30rpx;
	font-size: 28rpx;
	font-weight: 500;
	display: flex;
	align-items: center;
	.icon {
		color: #ff0000;
	}
	.price {
		color: #ff0000;
		font-size: 38rpx;
		font-weight: bold;
	}
}

.bottom_cart {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	background: #fff;
	padding: 0 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 110;

	.check_all {
		flex: 1;
		display: flex;
		align-items: center;
		.text {
			font-size: 26rpx;
			color: #000;
			padding-left: 8rpx;
		}
	}

	.right_cart {
		display: flex;
		align-items: center;

		.describe {
			padding: 0 20rpx;
			.total_price {
				padding: 0;
				justify-content: flex-end;
				.name {
					text-align: right;
					font-size: 30rpx;
					font-weight: bold;
					padding-right: 4rpx;
				}
			}
			.details {
				font-size: 24rpx;
				.price_details {
					padding-left: 10rpx;
					color: #ff0000;
				}
			}
		}
	}

	.pay_btn {
		width: 230rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 26rpx;
		color: #fff;
		font-weight: 500;
		border-radius: 45rpx;
		flex: none;
	}
}

.cart_popup_content {
	background: #fff;
	border-radius: 20rpx 20rpx 0 0;
	padding: 40rpx 30rpx;
	position: relative;
	.close {
		position: absolute;
		top: 40rpx;
		right: 30rpx;
	}

	.cart_popup_head {
		text-align: center;
		padding-bottom: 10rpx;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		.title {
			font-size: 34rpx;
			font-weight: bold;
		}

		.lead {
			font-size: 24rpx;
			line-height: 34rpx;
			color: #acacac;
			font-weight: 500;
			padding: 10rpx 0;
		}
	}

	.list {
		padding-top: 40rpx;
		.lis {
			display: flex;
			justify-content: space-between;
			padding: 10rpx 0;
			.name {
				font-size: 30rpx;
				font-weight: bold;
			}

			.total_price {
				color: #ff0000;
				font-weight: bold;
				padding: 0;
				font-size: 26rpx;
			}
		}
	}
}
</style>
