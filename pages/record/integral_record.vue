<template>
	<gui-page  ref="guipage" 
	:refresh="true" :isLoading="pageLoading"
	 @reload="reload" :loadmore="true"  @loadmorefun="getdata" 
	  :statusBarStyle="statusBarStyle" :isHeaderSized="false">
		<view slot="gBody" >
		<view class="gui-margin gui-margin-top">
			<text class="gui-h5 gui-color-gray gui-bold"></text>
		</view>
		<view class="gui-grids gui-flex gui-rows gui-wrap gui-margin-top gui-bg-gray demo-nav">
					<gui-switch-navigation2 :items="navItems" @change="navchange" 
					:isCenter="true" :size="150" activeColor="#FF0036"></gui-switch-navigation2>
		</view>
		<view class="my-list">
			<navigator v-if="indexType==0" class="gui-list-items" v-for="(item,index) in dataList" :key="order">
				<text v-if="item.type<3" class="gui-list-icon gui-icons gui-color-green">&#xe666;</text>
				<view  class="gui-list-body gui-border-b" v-if="item.type<3">
					<view  class="gui-list-title gui-flex gui-rows gui-space-between" >
							<text v-if="item.type==1" class="gui-list-title-text gui-color-green " style="font-size:25rpx;">兑换成功 \n ({{item.batteryCode}})</text>
							<text v-else-if="item.type==2" class="gui-list-title-text gui-color-green">商品兑换</text>
							<text v-else-if="item.type==0" class="gui-list-title-text gui-color-green">签到领取</text>
							<text class="gui-list-title-desc gui-color-gray">{{item.createOn.year}}-{{item.createOn.strMonth}}-{{item.createOn.strDay}}  {{item.createOn.time}}</text>
					</view>
					<view  class="gui-list-title" >
						<text text class="gui-list-body-desc gui-color-gray">当前积分：{{item.basePoints}}</text>
						<text :class="['gui-list-body-desc',item.type==2? 'gui-color-black':'gui-color-red']">{{item.type==2?'-':'+'}}{{item.points}} </text>
					</view>
				</view>
				<text v-if="item.type<3" class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</navigator>
			
			<navigator v-if="indexType==1" class="gui-list-items" v-for="(item,index) in dataList" :key="order" >
				<text  class="gui-list-icon gui-icons gui-color-green">&#xe666;</text>
				<view class="gui-list-body gui-border-b">
					<view  class="gui-list-title gui-flex gui-rows gui-space-between">
							<text v-if="item.type==1" class="gui-list-title-text gui-color-green " style="font-size:25rpx;">兑换成功 \n ({{item.batteryCode}})</text>
							<text v-else-if="item.type==2" class="gui-list-title-text gui-color-green"style="font-size:25rpx;">兑换成功 \n ({{item.batteryCode}})</text>
							<text v-else-if="item.type==3" class="gui-list-title-text gui-color-green">签到领取</text>
							<text class="gui-list-title-desc gui-color-gray">{{item.createOn.year}}-{{item.createOn.strMonth}}-{{item.createOn.strDay}}  {{item.createOn.time}}</text>
					</view>
					<view  class="gui-list-title">
						<text text class="gui-list-body-desc gui-color-gray">当前积分：{{item.baseEnergy}}</text>
						<text :class="['gui-list-body-desc',item.type==4? 'gui-color-black':'gui-color-red']">{{item.type==4?'-':'+'}}{{item.secondEnergy}} </text>
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
				indexType:0,
				dataList:[],
				currentPage:0,
				pageSize:10,
				pageLoading:true,
				headerStyle     : 'background-color:rgba(255,255,255,0)', // 头部导航样式
				statusBarStyle  : 'background-color:rgba(255,255,255,0)', // 状态栏样式
				titleStyle      : 'opacity:1' ,// 导航标题样式
				navItems : [
								{title:"积分记录", desc:"商城积分"},
								{title:"能量记录", desc:"商城能量"},
								
							]
				
			}
		},
		methods: {
			navchange:function(index){
						console.log(index);
						this.indexType=index;
						this.currentPage=0;
						this.dataList=[];
						this.getdata(index);
						
					},
			reload:function(){
				console.log("下拉刷新")
				this.currentPage=0;
				this.dataList=[];
				this.$refs.guipage.endReload();
				this.getdata(this.indexType);
			},
			getdata:function(index){
				console.log("加载更多")
				this.currentPage+=1;
				console.log(this.currentPage);
				this.$refs.guipage.stoploadmore();
				var url=""
				if(index==0){
					url='jfPoints/getPointsDetailList'
				}else if(index==1){
					url='jf/jfbbc/getBbcStorePointsAuditingList'
				}
				var that=this;
				uni.gRequest.get(
							url,
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
			this.getdata(this.indexType);
		}
	}
</script>
<style>
.demo-nav{width:750rpx; padding:10rpx 30rpx; box-sizing: border-box;}
.my-list{margin:30rpx 0; padding:0 30rpx;}
</style>