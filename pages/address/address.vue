<template>
	<view class="gui-padding">
		<view class="gui-margin-top gui-flex gui-rows gui-space-between gui-align-items-center">
			<text class="gui-h5 gui-color-gray">常用地址</text>
			<view @tap="addAddress" hover-class="gui-tap">
				<text class="gui-block-text gui-color-blue gui-text">+ 添加地址</text>
			</view>
		</view>
		<view class="gui-list gui-margin-top">
			<view class="gui-list-items" v-for="(item, index) in addressList" :key="index">
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text gui-primary-color">{{item.name}}</text>
						<text class="gui-list-title-desc gui-color-gray">{{item.phoneno}}</text>
					</view>
					<text class="gui-list-body-desc gui-color-gray">{{item.area+item.address}}</text>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-red" :data-index="index" @tap="deleteAddress">&#xe684;</text>
			</view>
		</view>
	</view>
</template>
<script>
	var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			addressList:[{"address":"谁谁谁谁谁谁","area":"吉林省 长春市 南关区","name":"张2","phoneno":"18682120312"} ,{"address":"湖州长兴","area":"吉林省 长春市 南关区","name":"张2","phoneno":"18682120312"}]
		}
	},
	methods: {
		addAddress : function () {
			// 跳转到添加地址页面
			graceJS.navigate("../address/addAddress")
		},
		deleteAddress: function (e) {
			var index=e.currentTarget.dataset.index;
			this.addressList=graceJS.arrayDrop(this.addressList, index, 1);
			uni.setStorage({
				key:'addressList',
				data:this.addressList
			});
			
			
		}
	},
	
	onShow() {
		var addressList=uni.getStorageSync("addressList");
		if(addressList==''){
			addressList=[];
		}
		this.addressList=addressList;
		
	},
	
}
</script>
<style scoped>
</style>