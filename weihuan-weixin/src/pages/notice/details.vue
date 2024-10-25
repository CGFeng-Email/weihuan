<template>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="return_icon" @click="return_page">
			<uni-icons type="left" size="23" :color="scrollTop == 'white_default' ? '#fff' : '#000'"></uni-icons>
		</view>
		{{ scrollTop != 'white_default' ? '系统公告' : '' }}
	</view>
	<!-- 占位 -->
	<view :style="{ height: useMenuButton().top }"></view>
	<view :style="{ height: useMenuButton().height }"></view>
	<!-- 顶部背景 -->
	<view class="fixed_top_bg">
		<image class="cover" src="/static/img/me_banner.png" mode="widthFix"></image>
	</view>
	<!-- 内容 -->
	<view class="wrap">
		<image class="cover" src="https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/company.png" mode="widthFix"></image>
		<view class="main box_border_radius box_shadow">
			<view class="title">汇聚了众多技术大师的心血，在众多的竞争产品中脱颖而出。</view>
			<view class="author">
				<text class="date">时间：2024-08-22</text>
				<text class="name">来源：炜洹集团</text>
			</view>
			<view class="lead">
				属下首家公司“广州炜洹贸易有限公司”成立于1999年，是华南地区优秀的专业的冷冻食品进口商和餐饮服务商。炜洹诚信为本非常重视商业信誉，从不销售品质低劣的产品，在行内一直享有较高的声誉
				。从2007年至今，连续十四年获得广州市工商局颁发“守合同、重信用企业”称号。
				在2013年，成立“广州炜洹冷藏供应链服务有限公司”，自建15000吨高标准国际冷库，专业冷链运输车队，车队装备GPS行驶温度实时监控仪，严格执行IS09001，ISO14001，ISO45001全方位质量管理体系，严格执行GB/T27341,GB14881,HACCP食品安全控制体系和GB/T
				食品安全管理体系,荣获诚信管理体系5星认证，企业信用等级5星认证(AAA级)，售后服务5星认证(五星级)，在全国率先实行实时库位管理和移动互联网应用管理系统，实时温控数据直接对接商务部全国农产品冷链流通监控平台，通过移动终端无缝对接，接受社会监督，为广大客户提供高质量的安全冷链食品提供保障，为行业打造食品安全冷链供应链新典范
			</view>
			<image class="cover" src="https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/company.png" mode="widthFix"></image>
			<view class="return_btn">
				<view class="btn btn_bg" @click="return_page">返回列表</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
//onPageScroll:滚动事件
import { onPageScroll } from '@dcloudio/uni-app';

// 返回
const return_page = () => {
	uni.navigateBack();
};

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
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.white_default {
	background: transparent;
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
.fixed_top_bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 750rpx;
	z-index: -1;
	.cover {
		width: 750rpx;
	}
}

.wrap {
	padding: 0 30rpx 160rpx;
	.cover {
		width: 100%;
	}
	.main {
		background: #fff;
		padding: 0 20rpx 20rpx;

		.title {
			font-size: 32rpx;
			font-weight: bold;
			line-height: 42rpx;
			padding: 20rpx 0;
			text-align: center;
		}

		.author {
			font-size: 26rpx;
			color: #b7b7b7;
			font-weight: 500;
			text-align: center;
			padding: 20rpx 0;
			text {
				padding: 0 20rpx;
			}
		}

		.lead {
			font-size: 28rpx;
			line-height: 44rpx;
			margin-top: 40rpx;
			margin-bottom: 30rpx;
		}

		.return_btn {
			display: flex;
			justify-content: flex-end;
			padding: 40rpx 0;
			.btn {
				width: 220rpx;
				height: 64rpx;
				line-height: 64rpx;
				border-radius: 32rpx;
				text-align: center;
				color: #fff;
				font-size: 28rpx;
				font-weight: 500;
			}
		}
	}
}
</style>
