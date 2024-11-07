<template>
	<view class="main">
		<uni-collapse :accordion="true">
			<block v-for="(item, index) in list" :key="index">
				<uni-collapse-item :show-animation="true" :border="false" :open="index == 0 ? true : false">
					<template v-slot:title>
						<view class="head">
							<image class="cover" src="/static/img/trouble_shooting.png" mode="widthFix"></image>
							<view class="title">{{ item.title }}</view>
						</view>
					</template>
					<view class="content">
						<text class="lead" user-select>
							{{ item.lead }}
						</text>
					</view>
				</uni-collapse-item>
			</block>
		</uni-collapse>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const list = ref([
	{
		title: '汇聚了众多技术大师的心血，在众多的竞争产品中脱颖而出。',
		lead: '属下首家公司“广州炜洹贸易有限公司”成立于1999年，是华南地区优秀的专业的冷冻食品进口商和餐饮服务商。炜洹诚信为本非常重视商业信誉，从不销售品质低劣的产品，在行内一直享有较高的声誉 。从2007年至今，连续十四年获得广州市工商局颁发“守合同、重信用企业”称号。'
	},
	{
		title: '敬天爱人同发展，自利利他齐共赢！',
		lead: '属下首家公司“广州炜洹贸易有限公司”成立于1999年，是华南地区优秀的专业的冷冻食品进口商和餐饮服务商。炜洹诚信为本非常重视商业信誉，从不销售品质低劣的产品，在行内一直享有较高的声誉 。从2007年至今，连续十四年获得广州市工商局颁发“守合同、重信用企业”称号。'
	},
	{
		title: '打造一个国际化、信息化的现代餐饮服务业新标杆。',
		lead: '属下首家公司“广州炜洹贸易有限公司”成立于1999年，是华南地区优秀的专业的冷冻食品进口商和餐饮服务商。炜洹诚信为本非常重视商业信誉，从不销售品质低劣的产品，在行内一直享有较高的声誉 。从2007年至今，连续十四年获得广州市工商局颁发“守合同、重信用企业”称号。'
	},
	{
		title: '成为中国优质食材和专业预制菜供应链平台',
		lead: '属下首家公司“广州炜洹贸易有限公司”成立于1999年，是华南地区优秀的专业的冷冻食品进口商和餐饮服务商。炜洹诚信为本非常重视商业信誉，从不销售品质低劣的产品，在行内一直享有较高的声誉 。从2007年至今，连续十四年获得广州市工商局颁发“守合同、重信用企业”称号。'
	},
	{
		title: '敬天爱人同发展，自利利他齐共赢！',
		lead: '属下首家公司“广州炜洹贸易有限公司”成立于1999年，是华南地区优秀的专业的冷冻食品进口商和餐饮服务商。炜洹诚信为本非常重视商业信誉，从不销售品质低劣的产品，在行内一直享有较高的声誉 。从2007年至今，连续十四年获得广州市工商局颁发“守合同、重信用企业”称号。'
	},
	{
		title: '打造一个国际化、信息化的现代餐饮服务业新标杆。',
		lead: '属下首家公司“广州炜洹贸易有限公司”成立于1999年，是华南地区优秀的专业的冷冻食品进口商和餐饮服务商。炜洹诚信为本非常重视商业信誉，从不销售品质低劣的产品，在行内一直享有较高的声誉 。从2007年至今，连续十四年获得广州市工商局颁发“守合同、重信用企业”称号。'
	}
]);
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

.head {
	padding: 30rpx;
	display: flex;

	.cover {
		width: 32rpx;
		flex: none;
		transform: translateY(3px);
	}

	.title {
		font-size: 30rpx;
		line-height: 42rpx;
		font-weight: 600;
		padding: 0 10rpx;
	}
}

.content {
	padding: 0 20rpx;
	.lead {
		font-size: 26rpx;
		line-height: 40rpx;
		color: #777777;
		font-weight: 500;
	}
}
</style>
