<!-- 分类 -->
<template>
	<view class="search">
		<uni-easyinput placeholder="请输入关键字" prefixIcon="search" disabled :inputBorder="false" :styles="{ disableColor: '#F1F1F1', color: '#9D9D9D' }"></uni-easyinput>
	</view>
	<!-- 搜索占位 -->
	<view style="height: 100rpx"></view>

	<!-- 滚动模块 -->
	<view class="main">
		<scroll-view class="left_menus scroll_box" scroll-y enable-back-to-top scroll-anchoring enhanced enable-passive>
			<block v-for="(item, index) in categoryList" :key="item.id">
				<view class="item" :class="{ active: categoryIndex == index }" @click="left_menu_item(index, item.id)">
					<text class="text over1">{{ item.title }}</text>
					<image class="cover" src="/src/static/img/category_active.png" mode="scaleToFill"></image>
				</view>
			</block>
		</scroll-view>
		<scroll-view
			class="right_list scroll_box"
			scroll-y
			:throttle="false"
			enable-back-to-top
			scroll-anchoring
			enhanced
			enable-passive
			:scroll-into-view="categoryScrollId"
			@scroll="rightScroll"
		>
			<block v-for="(item, index) in categoryList" :key="item.id">
				<view class="item right_item" :id="'A' + item.id">
					<uni-transition mode-class="fade" :show="item ? true : false">
						<view class="poster">
							<view class="cover_box">
								<image class="cover" :src="item.poster" mode="widthFix" lazy-load></image>
							</view>
						</view>
						<view class="children">
							<block v-for="item2 in item.children" :key="item2.id">
								<view class="children_item" @click="jump_shoppingList(item, item2)">
									<view class="cover_box">
										<image class="cover" :src="item2.src" mode="aspectFill" lazy-load></image>
									</view>
									<view class="title over1">
										{{ item2.title }}
									</view>
								</view>
							</block>
						</view>
					</uni-transition>
				</view>
			</block>
			<!-- 解决方法：添加第一个模块的高度，再此基础上再增加一点高度 -->
			<view style="height: 400px"></view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
// that
const that = getCurrentInstance();
// 左侧分类导航栏下标
const categoryIndex = ref(0);
// 右侧滚动item模块id
const categoryScrollId = ref('');
// 分类列表
const categoryList = ref([
	{
		id: 23819289,
		title: '海鲜',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1.png',
		children: [
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			}
		]
	},
	{
		id: 34242664,
		title: '进口/国产肉类',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster2.png',
		children: [
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			}
		]
	},
	{
		id: 132131244,
		title: '中餐/宴席食材',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster3.png',
		children: [
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			}
		]
	},
	{
		id: 378647269,
		title: '肉制品',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1.png',
		children: [
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			}
		]
	},
	{
		id: 3264978326,
		title: '特色小吃',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster2.png',
		children: [
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			}
		]
	},
	{
		id: 3671263877,
		title: '中式点心',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster3.png',
		children: [
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			}
		]
	},
	{
		id: 123678638723,
		title: '高档雪糕',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1.png',
		children: [
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			}
		]
	},
	{
		id: 423423343124,
		title: '西式甜品',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster2.png',
		children: [
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			}
		]
	},
	{
		id: 3782163877,
		title: '冷冻果茸',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster3.png',
		children: [
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			}
		]
	},
	{
		id: 1826387126783,
		title: '果茶',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1.png',
		children: [
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			}
		]
	},
	{
		id: 34214235234,
		title: '汤羹',
		poster: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster2.png',
		children: [
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			},
			{
				id: 543123415,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover3.png',
				title: '新鲜海虾'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 3768736478,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover4.png',
				title: '优选螃蟹'
			},
			{
				id: 2718973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover1.png',
				title: '海鱼'
			},
			{
				id: 5453973291,
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/category_poster1_cover2.png',
				title: '龙虾类'
			}
		]
	}
]);

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

// 记录，计算右边每个节点的高度，从第二个开始，累加之前的高度
const rightScrollItemHeight = ref([]);
// 获取右侧滚动模块的每一个item高度，计算滚动切换左侧导航栏下标
const getRightItemHeight = () => {
	let itemHeight = 0;
	const query = uni.createSelectorQuery().in(that);
	query
		.selectAll('.right_item')
		.boundingClientRect((data) => {
			// 累计之前的item高度，生成一个新的数组
			data.forEach((item) => {
				itemHeight += item.height;
				rightScrollItemHeight.value.push(itemHeight);
			});
		})
		.exec();
	console.log('rightScrollItemHeight:', rightScrollItemHeight.value);
};

// 右边scroll - 滚动回调
const rightScroll = (e) => {
	let scrollTop = e.detail.scrollTop;
	console.log('scrollTop', scrollTop);

	if (scrollTop >= rightScrollItemHeight.value[categoryIndex.value]) {
		// 往上滚动
		categoryIndex.value += 1;
		console.log('往上 - categoryIndex', categoryIndex.value);
	} else if (scrollTop < rightScrollItemHeight.value[categoryIndex.value - 1]) {
		// 往下滚动
		categoryIndex.value -= 1;
		console.log('往下 - categoryIndex', categoryIndex.value);
	}
};

// 返回上一页
const jump_shoppingList = (item, item2) => {
	uni.navigateBack()
};

onMounted(() => {
	setTimeout(() => {
		getRightItemHeight();
	}, 600);
});
</script>

<style lang="scss" search>
.search {
	padding: 20rpx;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;

	::v-deep .uni-easyinput {
		.uni-easyinput__content {
			border-radius: 45rpx;
			padding: 0 24rpx;
			.uni-icons {
				font-size: 16px !important;
				color: #ff8992 !important;
			}
			.uni-easyinput__content-input {
				height: 60rpx;
				line-height: 60rpx;
			}
		}
	}
}

.main {
	height: calc(100vh - 100rpx);
	display: flex;
	justify-content: space-between;
}
.scroll_box {
	height: 100%;
	box-sizing: border-box;
}

.left_menus {
	flex: none;
	width: 220rpx;
	background: #fcfcfc;
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

.right_list {
	flex: 1;
	.lis {
		height: 100px;
		background: pink;
		border: 1px solid #000;
	}
	.item {
		padding: 0 26rpx;
		.poster {
			margin-bottom: 40rpx;
			.cover_box {
				.cover {
					width: 100%;
				}
			}
		}
		.children {
			display: flex;
			flex-wrap: wrap;
			.children_item {
				width: 33.33%;
				margin-bottom: 30rpx;
				.cover_box {
					text-align: center;
					margin-bottom: 10rpx;
					.cover {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						overflow: hidden;
					}
				}

				.title {
					font-size: 24rpx;
					color: #000;
					font-weight: 500;
					text-align: center;
				}
			}
		}
	}
}
</style>
