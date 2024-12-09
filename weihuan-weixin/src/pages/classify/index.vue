<template>
	<!-- 搜索 -->
	<view @click="open_search">
		<Search bgColor="#fff0ef" :disabled="true"></Search>
	</view>
	<!-- 菜单栏 -->
	<view class="menu_wrap" v-if="classify_list.length > 0">
		<MenuChild ref="MenuChildRef" :list="classify_list" :cate_id="cate_id" :current="menu_index" bgColor="#fff0ef" @menuClick="menuClick"></MenuChild>
	</view>
	<!-- 顶部区域占位 -->
	<view style="height: 170rpx"></view>
	<!-- 主体 -->
	<swiper class="swiper" :current="swiperIndex" :duration="700" @change="swiperChange">
		<uni-transition :show="childCategory.length > 0" mode-class="fade" :duration="300">
			<swiper-item v-for="(item, index) in classify_list" :key="item.id">
				<view class="swiper-item">
					<!-- 分类 -->
					<scroll-view class="left_menus scroll_box" :scroll-y="true" enable-back-to-top scroll-anchoring enhanced enable-passive>
						<block v-for="(item, index) in childCategory" :key="item.id">
							<view class="item" :class="{ active: childCategoryIndex == index }" @click="childCategoryItem(index)">
								<text class="text over1">{{ item.title }}</text>
								<image class="cover" src="/src/static/img/category_active.png" mode="scaleToFill"></image>
							</view>
						</block>
					</scroll-view>

					<!-- 右侧商品 -->
					<scroll-view class="right_menus scroll_box" :scroll-y="true" enable-back-to-top scroll-anchoring enhanced enable-passive>
						<!-- 分类导航 -->
						<view class="classify_navigation">
							<view class="item company" v-if="organList.length > 0">
								<picker class="picker" mode="selector" :range="organList" :value="organListIndex" range-key="title" @change="organListChange">
									<input
										type="text"
										class="input"
										v-model="organList[organListIndex].title"
										disabled
										placeholder-class="input_placeholder"
										focus
										placeholder="请选择机构分类"
									/>
								</picker>
							</view>
							<view class="item spec" @click="switchSales">
								<view class="text">销量</view>
								<view class="icon">
									<i class="iconfont icon-shang" :class="{ active: salesIndex == 1 }"></i>
									<i class="iconfont icon-xiala" :class="{ active: salesIndex == 0 }"></i>
								</view>
							</view>
							<view class="item spec" @click="switchPrice">
								<view class="text">价格</view>
								<view class="icon">
									<i class="iconfont icon-shang" :class="{ active: priceIndex == 1 }"></i>
									<i class="iconfont icon-xiala" :class="{ active: priceIndex == 0 }"></i>
								</view>
							</view>
						</view>

						<!-- 列表 -->
						<view class="list">
							<block v-for="item2 in allShoppingList" :key="item2.id">
								<Item :item="item2" @itemClick="itemClick"></Item>
							</block>

							<view style="height: 20px"></view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
		</uni-transition>
	</swiper>
</template>

<script setup>
import { ref, onUnmounted, nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import Search from '../component/search.vue';
import MenuChild from './menu.vue';
import Item from './item.vue';
import Empty from '../component/empty.vue';
import { classifyList, shoppingList } from '@/api/index.js';

// swiper下标
const swiperIndex = ref(0);
// 主体切换
const MenuChildRef = ref(null);
// 分页
const page = ref(1);
// 条数
const size = ref(20);
// 总页数
const totalPage = ref(null);
// 关键词
const keyword = ref('');
// 一级分类下标
const menu_index = ref(0);
// 一级分类分类id
const cate_id = ref('');
// 一级分类
const classify_list = ref([]);
// 二级分类id
const cate_id_2 = ref('');
// 二级分类
const childCategory = ref([]);
// 二级分类下标
const childCategoryIndex = ref(0);
// 销量下标
const salesIndex = ref(0);
// 价格下标
const priceIndex = ref(0);
// 配送方式 '':全部, 0:配送, 1:自提
const is_self_take = ref('');
// 机构
const organList = ref([]);
// 机构下标
const organListIndex = ref(0);
// 商品列表
const allShoppingList = ref([]);

onLoad(async () => {
	uni.showLoading({
		title: '加载中...',
		mask: true
	});
	// 公共数据
	await getCommonData();
	// 一级分类
	await getClassify();
	// 二级分类
	await getClassify();

	// 首页跳转的分类
	uni.$on('classifyMenu', (e) => {
		if (e.id) {
			classify_list.value.forEach((item, index) => {
				if (item.id == e.id) {
					console.log('==');
					// 调用子组件方法
					MenuChildRef.value.menuItemClick(index);
				}
			});
		}
	});

	// 自提点，去下单
	uni.$on('delivery_type', (e) => {
		console.log('去下单', e);
	});

	uni.hideLoading();
});

// swiper切换
function swiperChange(e) {
	// Menu自动切换
	MenuChildRef.value.menuItemClick(e.detail.current);
}

// 一级分类MenuItem点击
function menuClick(e) {
	swiperIndex.value = e.index;
	if (menu_index.value == e.index) return;
	menu_index.value = e.index;
	getClassify();
}

// 获取公共数据
const getCommonData = () => {
	const commonData = uni.getStorageSync('commonData');
	console.log('公共数据', commonData);
	organList.value = commonData.organ_list;
};

// 机构分类
const organListChange = (e) => {
	organListIndex.value = Number(e.detail.value);
	getShoppingList();
};

// 销量
const switchSales = () => {
	if (salesIndex.value == 0) {
		salesIndex.value = 1;
	} else {
		salesIndex.value = 0;
	}
	getShoppingList();
};

// 价格
const switchPrice = () => {
	if (priceIndex.value == 0) {
		priceIndex.value = 1;
	} else {
		priceIndex.value = 0;
	}
	getShoppingList();
};

// 获取分类
const getClassify = async () => {
	// 一级分类id
	if (classify_list.value.length > 0) {
		var id = classify_list.value[menu_index.value].id;
	}

	// cate_id:0 一级分类，传入一级分类id获取二级分类
	const params = {
		cate_id: id || 0,
		size: 20
	};

	const res = await classifyList(params);

	if (res.code == 1) {
		if (!id) {
			console.log('一级分类', res);
			classify_list.value = res.data;
		} else {
			console.log('二级分类', res);
			childCategory.value = res.data;
			// 商品列表
			await getShoppingList();
		}
	}
};

// 商品列表
const getShoppingList = async () => {
	if (classify_list.value.length > 0 && childCategory.value.length > 0) {
		const params = {
			cate_id: classify_list.value[menu_index.value].id,
			cate_id_2: childCategory.value[childCategoryIndex.value].id,
			is_self_take: is_self_take.value,
			organ_id: organList.value[organListIndex.value].id,
			order_by: {
				shop_price: priceIndex.value == 1 ? 'asc' : 'desc',
				total_sales: salesIndex.value == 1 ? 'asc' : 'desc'
			},
			page: page.value,
			size: size.value
		};
		console.log('params', params);
		const res = await shoppingList(params);
		console.log('商品列表', res);
		if (res.code == 1) {
			allShoppingList.value = res.data.lists;
			totalPage.value = res.page_no;
			childCategoryIndex.value = 0;
		}
	}
};

// 左侧分类导航栏
const childCategoryItem = (index) => {
	if (childCategoryIndex.value == index) return;
	childCategoryIndex.value = index;
	nextTick(() => {
		getShoppingList();
	});
};

// 下单详情
function itemClick(params) {
	uni.navigateTo({
		url: `/pages/shopping/place_an_order?id=${params.id}`
	});
}

// 跳转搜索
function open_search() {
	uni.navigateTo({
		url: '/pages/shopping/shopping_search'
	});
}

// 卸载之后
onUnmounted(() => {
	uni.$off('classify_params');
	uni.$off('delivery_type');
});
</script>

<style lang="scss" scoped>
.menu_wrap {
	position: fixed;
	top: 100rpx;
	left: 0;
	width: 100%;
	height: 170rpx;
	z-index: 3;
}

.swiper {
	height: calc(100vh - 270rpx);

	.swiper-item {
		display: flex;
		height: 100%;
	}

	.scroll_box {
		height: 100%;
		box-sizing: border-box;
	}

	.left_menus {
		flex: none;
		width: 180rpx;
		.item {
			padding: 30rpx 26rpx;
			position: relative;
			z-index: 2;
			.text {
				font-size: 26rpx;
				color: #000;
				position: relative;
				z-index: 3;
			}

			.cover {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 102rpx;
				z-index: 1;
				opacity: 0;
			}
		}

		.active {
			.text {
				color: #000;
				font-weight: bold;
			}
			.cover {
				opacity: 1;
			}
		}
	}

	.right_menus {
		flex: 1;

		.list {
			padding: 0 10rpx;
		}
	}
}

.classify_navigation {
	padding: 10rpx 10rpx;
	background: rgba(255, 255, 255, 0.8);
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	left: 0;
	background: #fff;
	z-index: 10;
	.item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;

		.input {
			font-size: 28rpx;
			font-weight: bold;
		}

		.text {
			font-size: 26rpx;
			padding-right: 6rpx;
			font-weight: bold;
		}

		.icon {
			.iconfont {
				font-size: 26rpx;
				color: #d6d6d6;
			}

			.active {
				color: #ff8992;
			}
		}
	}

	.spec {
		.icon-shang {
			transform: scale(0.7) translateY(12rpx);
		}

		.icon-xiala {
			transform: scale(0.7) translateY(-12rpx);
		}
	}

	.company {
		width: 190rpx;
		flex: none;
		position: relative;
		z-index: 10;
		::v-deep .uni-select {
			border: none;
			z-index: 10;
		}

		::v-deep .uni-select__selector {
			width: 300rpx;
			left: 12px;
			top: -10px;
			z-index: 10;
		}

		::v-deep .uni-icons {
			display: none;
		}
	}
}
</style>
