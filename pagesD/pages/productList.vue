<template>
	<view class="gui-bg-gray">
		<view class="gui-margin  search-warp gui-border-box">
					<gui-search @inputting="inputting" @confirm="confirm"></gui-search>
				</view>
		<view class="gui-margin-top">
			<gui-product-list 
			:products="products" 
			@gotoInfo="gotoInfo"></gui-product-list>
		</view>
	</view>
</template>
<script>
import data from '../../GraceUI5/demoData/data.js';
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			products : data.products
		}
	},
	onLoad : function () {
		console.log("product")
		console.log(this.products)
		// 加载产品数据
		/* uni.request({
			url     : 'https://www.graceui.com/api/products/lists',
			success : (res)=>{
				console.log(res);
				this.products = res.data.data;
			}
		}) */
	},
	methods:{
		gotoInfo : function(idx, item){
			console.log('商品索引 : ' + idx);
			var picUrl=item.picUrl;
			console.log('picUrl : '+picUrl);
			if(idx>3){
				graceJS.navigate('../../pagesD/pages/productDetial?picUrl='+picUrl)
				
			}else{
				graceJS.navigate('../../pagesDpic/pages/productDetial?picUrl='+picUrl)
				
			}
			
		}
	}
}
</script>
<style>
</style>