<!-- 自提点详情 -->
<template>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="icon" @click="returnPage">
			<uni-icons type="left" size="20" :color="scrollTop != 'white_default' ? '#000' : '#fff'"></uni-icons>
		</view>
		<text class="title">
			{{ scrollTop != 'white_default' ? '门店详情' : '' }}
		</text>
	</view>

	<view class="main">
		<view class="banner">
			<image class="cover" src="https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop2.png" mode="aspectFill"></image>
			<view class="bottom_radius"></view>
		</view>
		<view class="store">
			<view class="head">
				<text class="title">天河鲜肉生鲜自提点</text>
				<text class="distance">200m</text>
			</view>
			<view class="info">
				<view class="li">联系人：张先生</view>
				<view class="li">联系电话：13636986542</view>
				<view class="li">营业时间：09:00 - 23:00</view>
				<view class="li">地址：广东省广州市天河区中山大道中18号</view>
			</view>
			<view class="location">
				<view class="btn_bg location_btn" @click="openLocation(item)">
					<text class="iconfont icon-dizhi"></text>
					<text class="text">导航</text>
				</view>
			</view>
			<view class="line"></view>
			<view class="lead">
				属下首家公司“广州炜洹贸易有限公司”成立于1999年，是华南地区优秀的专业的冷冻食品进口商和餐饮服务商。炜洹诚信为本非常重视商业信誉，从不销售品质低劣的产品，在行内一直享有较高的声誉
				。从2007年至今，连续十四年获得广州市工商局颁发“守合同、重信用企业”称号。
				在2013年，成立“广州炜洹冷藏供应链服务有限公司”，自建15000吨高标准国际冷库，专业冷链运输车队，车队装备GPS行驶温度实时监控仪，严格执行IS09001，ISO14001，ISO45001全方位质量管理体系，严格执行GB/T27341,GB14881,HACCP食品安全控制体系和GB/T
				22000,ISO22000,CNCA/CTS0012/CTS0013.CCAA0020/CCAA0021食品安全管理体系,荣获诚信管理体系5星认证，企业信用等级5星认证(AAA级)，售后服务5星认证(五星级)，
			</view>
			<image class="cover" src="https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop2.png" mode="widthFix"></image>
			<view class="lead">
				在全国率先实行实时库位管理和移动互联网应用管理系统，实时温控数据直接对接商务部全国农产品冷链流通监控平台，通过移动终端无缝对接，接受社会监督，为广大客户提供高质量的安全冷链食品提供保障，为行业打造食品安全冷链供应链新典范
			</view>
		</view>
	</view>

	<view style="height: 140rpx"></view>
	<!-- 底部栏-购物车 -->
	<view class="fixed_bottom_btn">
		<view class="btn btn_bg">
			<button @click="open_classify">去下单</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
//onPageScroll:滚动事件
import { onPageScroll } from '@dcloudio/uni-app';
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';

// 自提点信息
const pick_up_store = ref({
	id: 6,
	width: 28,
	height: 41,
	latitude: 23.120406941577873,
	longitude: 113.35739805816652,
	store_title: '天河员村生鲜自提点',
	title: '广东省广州市天河区员村南街',
	iconPath: '/static/img/map.png',
	image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop2.png',
	store: '陈先生',
	mobile: 13636986542,
	date: '09:00 - 23:00',
	distance: '200m',
	callout: {
		content: '员村南街',
		display: 'ALWAYS',
		textAlign: 'center',
		padding: '6',
		bgColor: '#fff',
		borderRadius: 8,
		fontSize: 14,
		color: '#000'
	}
});

// 顶部区域滚动
const scrollTop = ref('white_default');
onPageScroll((e) => {
	if (e.scrollTop < 30) {
		scrollTop.value = 'white_default';
	}
	if (e.scrollTop > 30 && e.scrollTop < 60) {
		scrollTop.value = 'white_30';
	} else if (e.scrollTop > 60 && e.scrollTop < 100) {
		scrollTop.value = 'white_60';
	} else if (e.scrollTop > 100) {
		scrollTop.value = 'white_100';
	}
});

// 跳转分类页面
const open_classify = () => {
	uni.setStorageSync('pick_up_store', pick_up_store.value);

	uni.switchTab({
		url: '/pages/classify/index'
	});
};

// 使用应用内置地图查看位置
const openLocation = () => {
	uni.openLocation({
		latitude: 23.128132,
		longitude: 113.365929,
		address: '广东省广州市天河区中山大道中18号',
		name: '天河鲜肉生鲜自提点'
	});
};

// 返回上一页
function returnPage() {
	uni.navigateBack();
}
</script>

<style lang="scss" scoped>
.page_title {
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	text-align: left;
	.icon {
		padding-left: 24rpx;
		position: relative;
		z-index: 20;
	}

	.title {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 26rpx;
	}
}
.white_default {
	background: transparent;
	border-bottom: 0;
}
.white_30 {
	background: rgba(255, 255, 255, 0.3);
}
.white_60 {
	background: rgba(255, 255, 255, 0.6);
}
.white_100 {
	background: rgba(255, 255, 255, 1);
}

.main {
	padding-bottom: 60rpx;
	.banner {
		position: relative;
		.cover {
			width: 750rpx;
			height: 750rpx;
		}

		.bottom_radius {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50rpx;
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
		}
	}

	.store {
		padding: 0 30rpx;
		.head {
			display: flex;
			justify-content: space-between;
			.title {
				font-size: 32rpx;
				line-height: 42rpx;
				font-weight: 600;
				flex: 1;
			}

			.distance {
				font-size: 26rpx;
				color: #c2c2c2;
				flex: none;
			}
		}

		.info {
			padding: 20rpx 0;
			.li {
				font-size: 24rpx;
				line-height: 34rpx;
				color: #999999;
				padding: 6rpx 0;
			}
		}

		.location {
			text-align: right;
			display: flex;
			justify-content: flex-end;
			.location_btn {
				display: inline-block;
				border-radius: 45rpx;
				width: 136rpx;
				height: 54rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.iconfont {
					font-size: 24rpx;
					color: #fff;
				}

				.text {
					font-size: 24rpx;
					color: #fff;
					padding-left: 6rpx;
				}
			}
		}

		.line {
			margin: 30rpx 0;
			height: 1px;
			background: rgba(0, 0, 0, 0.1);
		}

		.lead {
			font-size: 26rpx;
			line-height: 42rpx;
			color: #999999;
			overflow: hidden;
		}

		.cover {
			width: 100%;
			margin: 20rpx 0;
		}
	}
}
</style>
