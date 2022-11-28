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
			<navigator v-if="dataList.length>0" class="gui-list-items" v-for="(item,index) in dataList" :key="index">
				<view class="gui-list-image gui-relative">
					<image v-if="item.redpacketAmount.length!=8" class="gui-list-image" 
					src="http://cdn.letwind.com/zy/free/lottery/redpack.png"></image>
					<image v-else class="gui-list-image"
					src="../static/images/ic_wlmini"></image>
					<view v-if="item.isReceive" class="gui-badge-point"></view>
				</view>
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text v-if="item.redpacketAmount.length!=8" class="gui-list-title-text gui-primary-color">{{item.redpacketAmount}}元</text>
						<text v-else class="gui-list-title-text gui-primary-color">{{item.redpacketAmount}}</text>
						<text class="gui-list-title-desc gui-color-gray">{{timeTramfor(item.addTime)}}</text>
						<gui-tags v-if="!item.isReceive" text="领取" @tapme="receive(item.id,(item.redpacketAmount.length!=8)?0:1,item.redpacketAmount)" bgClass="gui-bg-red" :size="26" :borderRadius="50"></gui-tags>
						<gui-tags v-else text="已领取"  bgClass="gui-bg-black2" :size="26" :borderRadius="50"></gui-tags>
						
					</view>
					<text class="gui-list-body-desc gui-color-gray"></text>
				</view>
				
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</navigator>
			<text v-if="dataList.length==0" class="gui-block-text gui-icons  gui-color-grey" style="width:400rpx;margin-top: 500rpx;margin-left: 200rpx;">&#xe646;抽奖记录数据空空如也！</text>
		</view>
	</view>
	</gui-page>
</template>
<script>
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
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
			receive(drawId,reqtype,redpacketAmount){
				graceJS.navigate('../pages/activity?drawId='+drawId+"&reqtype="+reqtype+"&redpacketAmount="+redpacketAmount);
			},
			timeTramfor(time){
				return graceJS.toDate(time,'str')
			},
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
							'wealth/redpacket/billPage',
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
			
		}
	}
</script>
<style>
.my-list{margin:30rpx 0; padding:0 30rpx;}
</style>