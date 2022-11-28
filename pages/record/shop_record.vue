<template>
	<gui-page  ref="guipage" 
	:refresh="true" :isLoading="pageLoading"
	 @reload="reload" :loadmore="true"  @loadmorefun="getdata" 
	  :statusBarStyle="statusBarStyle" :isHeaderSized="false">
	 
		<view slot="gBody">
		<view class="gui-margin gui-margin-top">
			<text class="gui-h5 gui-color-gray gui-bold"></text>
		</view>
		<view class="my-list">
			<navigator class="gui-list-items" v-for="(item,index) in dataList" :key="index">
				
					<gui-image :src="imgURL+item.orderBVOList[0].imgPath" :width="100" :height="100" borderRadius="10rpx"></gui-image>
			
				<view class="gui-list-body gui-border-b">
					<view  class="gui-list-title">
						<text  class="gui-list-title-text gui-color-blue">{{item.orderBVOList[0].goodsName}}</text>
						<text class="gui-list-title-desc gui-color-gray">{{item.createOn.year}}-{{item.createOn.strMonth}}-{{item.createOn.strDay}}  {{item.createOn.time}}</text>
					
					</view>
					<view  class="gui-list-title">
					<text class="gui-list-body-desc gui-color-gray">商品积分：{{item.orderBVOList[0].basePrice}}</text>
					</view>
					
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</navigator>
			
			
			
		</view>
	</view>
	</gui-page>
</template>
<script>
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
				imgURL:'',
				dataList:[],
				currentPage:0,
				pageSize:10,
				pageLoading:true,
				headerStyle     : 'background-color:rgba(255,255,255,0)', // 头部导航样式
				statusBarStyle  : 'background-color:rgba(255,255,255,0)', // 状态栏样式
				titleStyle      : 'opacity:1' // 导航标题样式
			}
		},
		methods: {
			reload:function(){
				console.log("下拉刷新")
				this.currentPage=0;
				this.dataList=[];
				this.$refs.guipage.endReload();
				this.getdata();
			},
			getdata:function(){
				console.log("加载更多")
				this.currentPage+=1;
				console.log(this.currentPage);
				this.$refs.guipage.stoploadmore();
				var that=this;
				uni.gRequest.get(
							'jfOrder/queryOrderList',
							{
								data:{
									 pageNum:that.currentPage,
									 pageSize:that.pageSize,
								}
							}, 
							(res)=>{
								console.log('post 异步请求成功');
								console.log(res);
								if(res.status=='SUCCESS'){
									that.dataList=graceJS.arrayConcat(that.dataList,res.result.data);
								}
								
							},
							(error)=>{
								console.log(error);
							},
							(res) => {
								uni.hideLoading();
							}
						);
				
			},
			
			
		},
		mounted() {
			this.pageLoading=false;
			this.getdata();
			this.imgURL=this.imgUrl;
			console.log("url="+this.imgUrl)
			
		}
	}
</script>
<style>
	
.my-list{margin:30rpx 0; padding:0 30rpx;}
</style>