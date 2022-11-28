<template>
	<view>
		 <image :src="picUrl" mode="widthFix" style="width:750rpx;"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picUrl:""
				
			}
		},
		methods: {
			
		},
		onLoad(option) {
			this.picUrl= option.picUrl;
		}
	}
</script>

<style>

</style>
