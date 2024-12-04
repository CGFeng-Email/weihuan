<template>
	<!-- 搜索 -->
	<view @click="open_search">
		<Search bgColor="#fff0ef" :disabled="true"></Search>
	</view>
	<!-- 菜单栏 -->
	<view class="menu_wrap">
		<MenuChild ref="MenuChildRef" :list="categoryList" :menu_id="menu_id" :current="menu_index" bgColor="#fff0ef" @menuClick="menuClick"></MenuChild>
	</view>
	<!-- 顶部区域占位 -->
	<view style="height: 170rpx"></view>
	<!-- 主体 -->
	<swiper class="swiper" :current="swiperIndex" :duration="1000" @change="swiperChange">
		<block v-for="(item, index) in categoryList" :key="item.id">
			<swiper-item>
				<view class="swiper-item">
					<scroll-view class="left_menus scroll_box" :scroll-y="true" enable-back-to-top scroll-anchoring enhanced enable-passive>
						<block v-for="(item, index) in categoryList" :key="item.id">
							<view class="item" :class="{ active: categoryIndex == index }" @click="left_menu_item(index, item.id)">
								<text class="text over1">{{ item.title }}</text>
								<image class="cover" src="/src/static/img/category_active.png" mode="scaleToFill"></image>
							</view>
						</block>
					</scroll-view>

					<scroll-view class="right_menus scroll_box" :scroll-y="true" enable-back-to-top scroll-anchoring enhanced enable-passive>
						<!-- 分类导航 -->
						<view class="classify_navigation">
							<view class="item company">
								<picker class="picker" mode="selector" :range="company_list" :value="company_index" range-key="value" @change="company_change">
									<input
										type="text"
										class="input"
										v-model="company_list[company_index].value"
										disabled
										placeholder-class="input_placeholder"
										focus
										placeholder="请选择开票类型"
									/>
								</picker>
							</view>
							<view class="item spec">
								<view class="text">销量</view>
								<view class="icon">
									<i class="iconfont icon-shang"></i>
									<i class="iconfont icon-xiala active"></i>
								</view>
							</view>
							<view class="item spec">
								<view class="text">价格</view>
								<view class="icon">
									<i class="iconfont icon-shang"></i>
									<i class="iconfont icon-xiala active"></i>
								</view>
							</view>
						</view>
						<!-- 列表 -->
						<view class="list">
							<block v-for="item2 in item.children" :key="item2.id">
								<Item :item="item2" @itemClick="itemClick"></Item>
							</block>

							<view style="height: 20px"></view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
		</block>
	</swiper>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import Search from '../component/search.vue';
import MenuChild from './menu.vue';
import Item from './item.vue';

const swiperIndex = ref(0);
const menu_id = ref('');
const menu_index = ref(0);

// 主体切换
const MenuChildRef = ref(null);
function swiperChange(e) {
	menu_index.value = e.detail.current;
	menu_id.value = categoryList.value[e.detail.current].id;
	// 调用子组件方法
	MenuChildRef.value.menuItemClick(menu_index.value, menu_id.value);
}

onLoad(() => {
	// 首页分类
	uni.$on('classify_params', (e) => {
		console.log('once - e', e);
		if (e.id) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			// classifyId.value = e.id;
			categoryList.value.forEach((item, index) => {
				if (item.id == e.id) {
					console.log('==', item.id);
					menu_index.value = index;
					menu_id.value = e.id;
					// 调用子组件方法
					MenuChildRef.value.menuItemClick(menu_index.value, menu_id.value);
				}
			});
			setTimeout(() => {
				uni.hideLoading();
			}, 5000);
		}
	});

	// 自提点，去下单
	uni.$on('delivery_type', (e) => {
		console.log('去下单', e);
	});
});

function menuClick(e) {
	menu_id.value = e.id;
	menu_index.value = e.index;
	swiperIndex.value = e.index;
}
// 分类列表
const categoryList = ref([
	{
		id: 23819289,
		title: '海鲜鱼类',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify1.png',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1.png',
		children: [
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: true,
				price: 130,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 120,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 110,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 100,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 180,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			}
		]
	},
	{
		id: 34242664,
		title: '进口肉类',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify2.png',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster2.png',
		children: [
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: true,
				price: 130,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 120,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 110,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 100,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 180,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			}
		]
	},
	{
		id: 132131244,
		title: '西式甜品',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify3.png',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster3.png',
		children: [
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: true,
				price: 130,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 120,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 110,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 100,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 180,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			}
		]
	},
	{
		id: 378647269,
		title: '精品果茶',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify4.png',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1.png',
		children: [
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: true,
				price: 130,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 120,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 110,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 100,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 180,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			}
		]
	},
	{
		id: 3264978326,
		title: '新鲜海鲜',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify5.png',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster2.png',
		children: [
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: true,
				price: 130,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 120,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 110,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 100,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 180,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			}
		]
	},
	{
		id: 3671263877,
		title: '国产肉类',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify6.png',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster3.png',
		children: [
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: true,
				price: 130,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 120,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 110,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 100,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 180,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			}
		]
	},
	{
		id: 3434634327,
		title: '宴席食材',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify7.png',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster3.png',
		children: [
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: true,
				price: 130,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 120,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 110,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 100,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 180,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			}
		]
	},
	{
		id: 6453571263877,
		title: '特色小吃',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify8.png',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster3.png',
		children: [
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: true,
				price: 130,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 120,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 110,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 100,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 180,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			}
		]
	},
	{
		id: 43126827368732,
		title: '薯片零食',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify9.png',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster3.png',
		children: [
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: true,
				price: 130,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 120,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 110,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 100,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 180,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			}
		]
	},
	{
		id: 342424564652,
		title: '特惠饮料',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/classify10.png',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster3.png',
		children: [
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: true,
				price: 130,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 120,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 110,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 100,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 180,
				primary_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			}
		]
	}
]);

// 左侧分类导航栏下标
const categoryIndex = ref(0);
// 左侧分类导航栏
const left_menu_item = (e, id) => {
	console.log('id', id);
	categoryIndex.value = e;
	categoryScrollId.value = 'A' + id;

	// 解决滚动内容后，再次点击时滚动到指定位置
	setTimeout(() => {
		categoryScrollId.value = '';
	}, 800);
};

// 所属公司company
const company_list = ref([
	{ id: 0, value: '网上超市' },
	{ id: 1, value: '团购集采' },
	{ id: 2, value: '服务项目' },
	{ id: 3, value: '礼品卡/代金券' }
]);

// 所属公司下标
const company_index = ref(0);
// 所属公司change
const company_change = (e) => {
	console.log(e);
	// company_index.value = e;
	company_index.value = Number(e.detail.value);
};

// 下单详情
function itemClick() {
	uni.navigateTo({
		url: '/pages/shopping/place_an_order'
	});
}

// 跳转搜索
function open_search() {
	uni.navigateTo({
		url: '/pages/shopping/shopping_search'
	});
}

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
		background: #fcfcfc;

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
