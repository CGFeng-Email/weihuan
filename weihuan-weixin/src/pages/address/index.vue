<!-- 地址管理 -->
<template>
	<view class="list">
		<block v-for="(item, index) in list" :key="item.id">
			<view class="item box_border_radius box_shadow">
				<view class="content">
					<view class="c_top">
						<view class="title">{{ item.name }}</view>
						<view class="mobile">{{ userMobileComputed(item.mobile) }}</view>
					</view>
					<view class="address">{{ item.address.join('') }}{{ item.content }}</view>
				</view>
				<view class="icon" @click.stop="open_edit_address(item)">
					<uni-icons type="compose" size="24" color="#FE978D"></uni-icons>
				</view>
			</view>
		</block>
	</view>

	<view style="height: 170rpx"></view>
	<view class="fixed_bottom_btn">
		<view class="btn_bg btn">
			<button @click="open_add_address">新增地址</button>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
const list = ref([
	{
		id: 1,
		name: '谷志华',
		mobile: 13428199988,
		address: ['河北省', '石家庄市', '长安区'],
		content: '黄埔大道中258号店'
	},
	{
		id: 2,
		name: '陈先生',
		mobile: 13636986542,
		address: ['江苏省', '南京市', '玄武区'],
		content: '黄埔大道中199店'
	},
	{
		id: 3,
		name: '李先生',
		mobile: 13636986542,
		address: ['浙江省', '温州市', '鹿城区'],
		content: '员村西街7号大院'
	},
	{
		id: 4,
		name: '蔡先生',
		mobile: 13636566542,
		address: ['安徽省', '淮北市', '杜集区'],
		content: '员村南街'
	}
]);
// 手机号码加密
const userMobileComputed = computed(() => {
	return (e) => {
		const phone = String(e);
		return phone.substr(0, 3) + '****' + phone.substring(7);
	};
});

// 跳转编辑地址
const open_edit_address = (item) => {
	uni.navigateTo({
		url: `/pages/address/edit_address?item=${JSON.stringify(item)}`
	});
};

// 跳转新增地址
const open_add_address = () => {
	uni.navigateTo({
		url: '/pages/address/add_address'
	})
}
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.list {
	padding: 30rpx;
	.item {
		margin-bottom: 30rpx;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.content {
			flex: 1;
			.c_top {
				display: flex;
				align-items: center;
			}
			.title {
				font-size: 32rpx;
				font-weight: bold;
			}
			.mobile {
				font-size: 26rpx;
				color: #606060;
				padding-left: 10rpx;
			}

			.address {
				font-size: 26rpx;
				line-height: 36rpx;
				margin-top: 20rpx;
			}
		}

		.icon {
			padding: 30rpx 0 30rpx 30rpx;
		}
	}
}
</style>
