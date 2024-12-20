<template>
	<page-meta :page-style="'overflow:' + (isScroll ? 'hidden' : 'visible')"></page-meta>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="navigation_wrap">
			<view class="navigation box_border_radius box_shadow">
				<view class="navigation_btn" :class="{ active: head_title_index == 0 }" @click="switchPage(0)">配送商品</view>
				<view class="navigation_btn" :class="{ active: head_title_index == 1 }" @click="switchPage(1)">自提商品</view>
			</view>
		</view>
	</view>
	<view :style="{ height: useMenuButton().topView }"></view>

	<view class="head" :style="{ top: useMenuButton().topView }">
		<text class="title">点击以上按钮切换选择 "配送" 或 "自提" 购物车</text>
	</view>

	<view style="height: 31px"></view>

	<view class="main">
		<!-- 购物车列表 -->
		<view class="list box_border_radius box_shadow">
			<block v-for="(item, index) in list" :key="item.id">
				<view class="item">
					<uni-swipe-action>
						<uni-swipe-action-item>
							<view class="shopping_item">
								<uni-icons
									class="icon"
									:type="item.selected == 1 ? 'checkbox-filled' : 'circle'"
									size="24"
									:color="item.selected == 1 ? '#FF8992' : '#bcbcbc'"
									@click="switchIcon(index, item.id, item.goods_num, item.selected)"
								></uni-icons>
								<view class="right_content" @click="hotRecommentItem(item.goods_id, item.spec_key, item.goods_num, item.is_buyable)">
									<view class="cover_box">
										<image class="cover box_border_radius" :src="item.image" mode="widthFix" lazy-load></image>
										<view class="tips" v-if="item.is_buyable != 1">已下架</view>
									</view>
									<view class="content">
										<view class="shopping_top">
											<view class="title over2" :class="{ out_title: item.is_buyable != 1 }">{{ item.goods_name }}</view>
											<view class="spec lead over2">
												<text class="text">{{ item.key_name }}</text>
												<text class="text">库存:{{ item.store_count }}</text>
											</view>
										</view>
										<view class="shopping_bottom">
											<view class="price_box">
												<text class="symbol">￥</text>
												<text class="price">{{ item.goods_price }}</text>
											</view>
											<view class="quantity_box">
												<view class="icon" @click.stop="deCrementUnderscore(index, item.id, item.selected, item.is_buyable)">
													<i class="iconfont icon-jianhao"></i>
												</view>
												<view class="quantity_number">{{ item.goods_num }}</view>
												<view class="icon" @click.stop="inCrementUnderscore(index, item.store_count, item.id, item.selected, item.is_buyable)">
													<i class="iconfont icon-jia"></i>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>

							<template v-slot:right>
								<view class="item_del" @click="delShopping(item.id)"><text>删除</text></view>
							</template>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</block>
		</view>
	</view>

	<Empty imgSrc="https://test.cnmaris.cn/uploads/images/20241220/17347004196747.png" tips="购物车还是空的哦~" :show="list.length > 0 ? false : true"></Empty>

	<!-- 推荐 -->
	<view class="hot_recommend">
		<view class="recomment_title">
			<text class="line"></text>
			<text class="title">猜你喜欢</text>
			<text class="line"></text>
		</view>
		<List :list="hotRecommentList" @itemClick="hotRecommentItem"></List>
	</view>

	<view style="height: 40px"></view>

	<view class="bottom_cart" v-if="list.length > 0">
		<view class="check_all" @click="switch_check_all">
			<uni-icons :type="computedCheckAll ? 'checkbox-filled' : 'circle'" size="24" :color="computedCheckAll ? '#FF8992' : '#bcbcbc'"></uni-icons>
			<text class="text">全选</text>
		</view>
		<view class="right_cart">
			<view class="describe">
				<view class="total_price">
					<text class="name">合计:</text>
					<text class="icon">￥</text>
					<text class="price">{{ totalPrice }}</text>
				</view>
				<view class="details" @click="open_popup">
					<text class="text" v-show="discountsPrice">共减: ￥{{ discountsPrice }}</text>
					<text class="price_details">订单明细</text>
					<uni-icons :type="isScroll ? 'up' : 'down'" size="12" color="#FF0000"></uni-icons>
				</view>
			</view>
			<button class="pay_btn btn_bg" :class="{ disabled_bg: isPayment }" :disabled="isPayment" @click="jump_place_order">去结算</button>
		</view>
	</view>

	<!-- 订单明细 -->
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
					<view class="total_price">￥{{ originalPrice }}</view>
				</view>
				<view class="lis">
					<view class="name">满减金额</view>
					<view class="total_price">￥{{ reduceMoney }}</view>
				</view>
				<view class="lis">
					<view class="name">优惠金额</view>
					<view class="total_price">￥{{ discountsPrice }}</view>
				</view>
				<view class="lis">
					<view class="name">配送费</view>
					<view class="total_price">￥{{ orderFreight }}</view>
				</view>
				<view class="lis">
					<view class="name">合计</view>
					<view class="total_price">￥{{ totalPrice }}</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app';
import { ref, computed, watch, onMounted } from 'vue';
import useMenuButton from '../../hooks/useMenu.js';
import Empty from '@/pages/component/empty.vue';
import List from '@/pages/shopping/list.vue';
import { getCartList, shoppingList, immedPayment, delCartShopping, editCartShopping } from '@/api/index.js';
// 防抖、节流
import _ from 'underscore';

// 防止弹窗打开后，页面继续滚动
const isScroll = ref(false);
// 明细弹窗
const cart_popup = ref(null);
// 0:配送，1:自提
const head_title_index = ref(0);
// 页码
const page = ref(1);
// 条数
const size = ref(20);
// 总页数
const totalPage = ref(1);
// 购物车列表
const list = ref([]);
// 是否显示Empty
const isEmpty = ref(false);
// 热门推荐列表
const hotRecommentList = ref([]);
// 推荐页码
const recommendPage = ref(1);
// 推荐总页数
const recommendTotalPage = ref(1);
// 订单优惠前的总价
const originalPrice = ref(0);
// 优惠金额
const discountsPrice = ref(0);
// 满减金额
const reduceMoney = ref(0);
// 订单运费 运费价格没算进
const orderFreight = ref(0);
// 合计,实际支付金额
const totalPrice = ref(0);

// 获取购物车列表
const getCartListFn = async () => {
	uni.showLoading({
		title: '加载中...'
	});

	const params = {
		page: page.value,
		size: size.value,
		is_self_take: head_title_index.value,
		delivery_type: head_title_index.value == 1 ? 20 : 10
	};
	const res = await getCartList(params);
	console.log('获取购物车列表', res);
	if (res.code == 1) {
		list.value = res.data.lists;
		totalPage.value = res.data.page_no;
		// 获取立即购买数据
		await getImmetPayment();
	}

	uni.hideLoading();
};

// 热门推荐
const getHotRecommend = async () => {
	const params = {
		page: recommendPage.value,
		size: size.value,
		is_recommend: 1,
		is_hot: 1
	};
	const res = await shoppingList(params);
	console.log('推荐商品', res);
	if (res.code == 1) {
		recommendTotalPage.value = res.data.page_no;
		hotRecommentList.value = res.data.lists;
	}
};

// 获取立即购买数据
// isSettle:1 任何修改, isSettle:0 去支付
const getImmetPayment = async (isSettle = 1) => {
	uni.showLoading({
		title: '加载中...'
	});
	// 规格列表
	const buy_goods = [];
	list.value.forEach((item) => {
		if (item.selected == 1) {
			buy_goods.push({
				goods_id: item.goods_id,
				spec_key: item.spec_key,
				goods_num: item.goods_num
			});
		}
	});

	const params = {
		delivery_type: head_title_index.value == 0 ? 10 : 20,
		is_settle: isSettle,
		buy_goods,
		is_cart: 1
	};

	const res = await immedPayment(params);

	console.log('获取立即购买数据', res);

	if (res.code == 1) {
		// 任何修改
		if (isSettle == 1) {
			// 订单优惠前的总价
			originalPrice.value = res.data.total_price;
			// 优惠金额
			discountsPrice.value = res.data.coupon_money;
			// 满减金额
			reduceMoney.value = res.data.reduce_money;
			// 运费
			orderFreight.value = res.data.express_price;
			// 合计,实际支付金额
			totalPrice.value = res.data.pay_price;
		}
		uni.hideLoading();
		// 真正去支付，获取订单id
		if (isSettle == 0) return res;
	}

	uni.hideLoading();
};

// 删除商品
const delShopping = async (id) => {
	const params = {
		ids: [id]
	};
	const res = await delCartShopping(params);
	console.log('删除商品', res);
	if (res.code == 1) {
		// 购物车
		await getCartListFn();
	}
};

// 编辑商品数量
const editShopping = async (id, quantity, isSelected) => {
	const params = {
		id,
		goods_num: quantity,
		selected: isSelected == 1 ? 0 : 1
	};
	const res = await editCartShopping(params);
	console.log('编辑商品数量', res);
};

// 页面切换
function switchPage(i) {
	if (head_title_index.value == i) return;
	head_title_index.value = i;
	page.value = 1;
	getCartListFn();
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

// 商品icon切换
const switchIcon = async (index, id, quantity, isSelected) => {
	list.value[index].selected = list.value[index].selected == 1 ? 0 : 1;
	// 修改购物车商品
	await editShopping(id, quantity, isSelected);
	// 获取立即购买数据
	await getImmetPayment();
};

// 购买数量 减
const deCrement = async (index, id, isSelected, isPay) => {
	if (isPay != 1) return;
	if (list.value[index].goods_num <= 1) return;
	list.value[index].goods_num -= 1;
	// 修改购物车商品
	await editShopping(id, list.value[index].goods_num, isSelected);
	// 获取立即购买数据
	await getImmetPayment();
};
const deCrementUnderscore = _.debounce(deCrement, 200);

// 购买数量 加
const inCrement = async (index, storeCount, id, isSelected, isPay) => {
	if (isPay != 1) return;
	if (list.value[index].goods_num < storeCount) {
		list.value[index].goods_num += 1;
		// 修改购物车商品
		await editShopping(id, list.value[index].goods_num, isSelected);
		// 获取立即购买数据
		await getImmetPayment();
	} else {
		uni.showToast({
			title: '客观小伟没有更多存货了',
			icon: 'none',
			mask: true
		});
	}
};
const inCrementUnderscore = _.debounce(inCrement, 200);

// 计算属性 - 全选
const computedCheckAll = computed(() => {
	for (let i in list.value) {
		// 只要有一个没选中
		if (list.value[i].selected == 0) {
			return false;
			break;
		}
	}
	return true;
});

// 切换全选、全不选
const switch_check_all = () => {
	const isCheck = computedCheckAll.value == 1 ? 0 : 1;
	const lists = list.value.map((item) => {
		item.selected = isCheck;
		return item;
	});
	list.value = lists;
	getImmetPayment();
};

// 计算属性，是否能支付
const isPayment = computed(() => {
	if (list.value.length > 0) {
		for (let i in list.value) {
			// 只要有一个没选中
			if (list.value[i].selected == 1) {
				return false;
				break;
			}
		}
	}

	totalPrice.value = 0;
	// 默认禁止点击
	return true;
});

// 去结算 跳转订单确认
const jump_place_order = () => {
	const buy_goods = [];

	list.value.forEach((item) => {
		console.log('item', item);
		if (item.selected == 1 && item.is_buyable == 1) {
			buy_goods.push({
				goods_id: item.goods_id,
				spec_key: item.spec_key,
				quantity: item.goods_num,
				selectSpecificationTitle: item.key_name,
				image: item.image,
				price: item.goods_price,
				title: item.goods_name,
				outPrice: 21.0,
				storeCount: item.store_count
			});
		}
	});

	const params = {
		delivery_type: head_title_index.value == 1 ? 20 : 10,
		buy_goods,
		isCart: 1
	};

	console.log('params', params);

	// 跳转 确认订单 pages/shopping/confirm_an_order
	uni.navigateTo({
		url: `/pages/shopping/confirm_an_order?params=${JSON.stringify(params)}`
	});
};

// 热门推荐点击
const hotRecommentItem = (id, spec_key, quantity, isPay) => {
	if (isPay != 1) return;
	uni.navigateTo({
		url: `/pages/shopping/place_an_order?id=${id}&spec_key=${spec_key}&quantity=${quantity}`
	});
};

// 开启下拉刷新
onPullDownRefresh(async () => {
	console.log('用户下拉刷新');
	// 购物车
	await getCartListFn();
	// 关闭下拉刷新
	uni.stopPullDownRefresh();
});

onShow(() => {
	console.log('购物车 show');
	// 购物车
	getCartListFn();
});

onMounted(async () => {
	// 热门推荐
	await getHotRecommend();
});
</script>

<style lang="scss" scoped>
.top {
	background: #fff;
}

.page_title {
	background: #fff;
	display: flex;
}

.head {
	padding: 5rpx 30rpx 15rpx;
	position: fixed;
	left: 0;
	background: #fff;
	width: 100%;
	height: 31px;
	z-index: 10;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.main {
	padding: 20rpx 30rpx;
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
					.cover_box {
						flex: none;
						position: relative;
						width: 190rpx;
						.cover {
							width: 100%;
						}

						.tips {
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							background: rgba(0, 0, 0, 0.6);
							color: #fff;
							font-weight: 500;
							border-radius: 45rpx;
							padding: 10rpx 0;
							font-size: 24rpx;
							width: 80%;
							text-align: center;
						}
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

							.out_title {
								color: #b2b2b2;
							}

							.spec {
								font-size: 24rpx;
								color: #acacac;
								padding-top: 10rpx;
							}

							.text {
								padding-right: 20rpx;
							}
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
									min-width: 70rpx;
									text-align: center;
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
				text-align: right;
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
