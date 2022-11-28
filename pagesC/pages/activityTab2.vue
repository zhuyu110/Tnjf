<template>
	<gui-page ref="guipage" @reload="reload" :refresh="true" :isLoading="pageLoading":customHeader="true" :headerStyle="headerStyle" 
	:statusBarStyle="statusBarStyle" :isHeaderSized="false"
	@scroll="scroll"
	>
		<!-- 页面主体-->
		<view slot="gBody" class="gui-bg-black-opacity3 gui-flex">
				<image src="../static/images/ic_pm_bg.png" 
							mode="aspectFill" style="width:750rpx; height: 1060rpx; position:static;z-index: 1; "></image>
				<text style=" margin-top: 15px;position: absolute;z-index: 7; width: 100%;" class="gui-text-center gui-color-white">第一期耐用榜\n（2022.5.8-2022.5.12）</text>
				<!-- NO2 -->
				<view class=" gui-flex gui-columns gui-align-items-center" style=" position: absolute;z-index: 7; margin-top: 180rpx;margin-left: 60rpx;">
					<image src="../../static/ranking_p2.png" mode="scaleToFill" style="width: 144rpx;height: 170rpx; z-index: 8" >
					</image>
					<image :src="dataList[1].pic"   style="border-radius:120rpx;width: 100rpx;height:100rpx;position: absolute;z-index: 6;margin-top: 44rpx;"></image>
					<text class="gui-text-center gui-ellipsis gui-text-small">{{dataList[1].terminalnodeName==null ?"":dataList[1].terminalnodeName}}</text>
					<text class="gui-text-center gui-h6">{{dataList[1].historyPoints==null?"0":dataList[1].historyPoints}}</text>
				</view>
				
				<!--  -->
				<!-- NO1 -->
				<view class=" gui-flex gui-columns gui-align-items-center" style=" position: absolute;z-index: 7; margin-top: 140rpx;margin-left: 270rpx;">
					<image src="../../static/ranking_p1.png" mode="scaleToFill" style="width: 180rpx;height: 200rpx; z-index: 8" >
					</image>
					<image :src="dataList[0].pic"   style="border-radius:120rpx;width: 120rpx;height:120rpx;position: absolute;z-index: 6;margin-top: 50rpx;"></image>
					<text class="gui-text-center gui-ellipsis gui-text-small" >{{dataList[0].terminalnodeName==null?"":dataList[0].terminalnodeName}}</text>
					<text class="gui-text-center gui-h5">{{dataList[0].historyPoints==null?"0":dataList[0].historyPoints}}</text>
				</view>
				<!--  -->
				<!-- NO3 -->
				<view class=" gui-flex gui-columns gui-align-items-center" style=" position: absolute;z-index: 7; margin-top: 180rpx;margin-left: 540rpx;">
					<image src="../../static/ranking_p3.png" mode="scaleToFill" style="width: 144rpx;height: 170rpx; z-index: 8" >
					</image>
					<image :src="dataList[2].pic"  style="border-radius:120rpx;width: 100rpx;height:100rpx;position: absolute;z-index: 6;margin-top: 44rpx;"></image>
					<text class="gui-text-center gui-ellipsis gui-text-small">{{dataList[2].terminalnodeName==null?"":dataList[2].terminalnodeName}}</text>
					<text class="gui-text-center gui-h5">{{dataList[2].historyPoints==null?"0":dataList[2].historyPoints}}</text>
				</view>
				
				
				<view class="gui-flex gui-columns gui-align-items-center" style=" position: absolute;z-index: 7; margin-top: 420rpx;margin-left: 60rpx;">
					<view class="gui-flex gui-rows gui-align-items-center  gui-bg-red" style="width:600rpx;height: 70rpx;">
						<text class="gui-ellipsis gui-flex1 gui-color-white">排名前三名分别奖励电动车一辆</text>
					</view>
					
					<view class="gui-flex gui-rows gui-align-items-center" style="width:600rpx;height: 70rpx;">
						<text style="width: 40rpx;">4</text>
						<image  class="gui-margin" :src="dataList[3].pic"style="width: 60rpx;height: 60rpx;border-radius: 60rpx;"></image>
						<text class="gui-ellipsis gui-flex1">{{dataList[3].terminalnodeName==null?"":dataList[3].terminalnodeName}}</text>
						<text class="gui-flex1 gui-text-right gui-h5">{{dataList[3].historyPoints==null?"0":dataList[3].historyPoints}}</text>
					</view>
					<view style="width:640rpx; height:1px; background-color:#E1E2E3;" ></view>
					<view class="gui-flex gui-rows gui-align-items-center" style="width:600rpx;height: 70rpx;">
						<text style="width: 40rpx;">5</text>
						<image class="gui-margin" :src="dataList[4].pic" style="width: 60rpx;height: 60rpx;border-radius: 60rpx;"></image>
						<text class="gui-ellipsis gui-flex1" >{{dataList[4].terminalnodeName==null?"":dataList[4].terminalnodeName}}</text>
						<text class="gui-flex1 gui-text-right gui-h5">{{dataList[4].historyPoints==null?"0":dataList[4].historyPoints}}</text>
					</view>
					<view style="width:640rpx; height:2rpx; background-color:#E1E2E3;" ></view>
					
					<view class="gui-flex gui-rows gui-align-items-center" style="width:600rpx;height: 70rpx;">
						<text class="gui-text-center" style="width: 40rpx;">{{dataList[5].rowNo==null?"∞":dataList[5].rowNo}}</text>
						<image class="gui-margin" :src="avatarUrl" style="width: 60rpx;height: 60rpx;border-radius: 60rpx;"></image>
						<text class="gui-ellipsis gui-flex1">{{dataList[5].terminalnodeName}}</text>
						<text class="gui-flex1 gui-text-right gui-h5 ">{{dataList[5].historyPoints==null?"0":dataList[5].historyPoints}}</text>
					</view>
					<view style="width:640rpx; height:2rpx; background-color:#E1E2E3;" ></view>
					
					<view class="gui-flex gui-rows gui-align-items-center" style="width:600rpx;height: 70rpx;">
						<text class="gui-text-center" style="width: 40rpx;">{{dataList[5].rowNo==null?"∞":dataList[5].rowNo}}</text>
						<image class="gui-margin" :src="avatarUrl" style="width: 60rpx;height: 60rpx;border-radius: 60rpx;"></image>
						<text class="gui-ellipsis gui-flex1">{{dataList[5].terminalnodeName}}</text>
						<text class="gui-flex1 gui-text-right gui-h5 ">{{dataList[5].historyPoints==null?"0":dataList[5].historyPoints}}</text>
					</view>
					<view style="width:640rpx; height:2rpx; background-color:#E1E2E3;" ></view>
					
					<view class="gui-flex gui-rows gui-align-items-center" style="width:600rpx;height: 70rpx;">
						<text class="gui-text-center" style="width: 40rpx;">{{dataList[5].rowNo==null?"∞":dataList[5].rowNo}}</text>
						<image class="gui-margin" :src="avatarUrl" style="width: 60rpx;height: 60rpx;border-radius: 60rpx;"></image>
						<text class="gui-ellipsis gui-flex1">{{dataList[5].terminalnodeName}}</text>
						<text class="gui-flex1 gui-text-right gui-h5 ">{{dataList[5].historyPoints==null?"0":dataList[5].historyPoints}}</text>
					</view>
					<view style="width:640rpx; height:2rpx; background-color:#E1E2E3;" ></view>
					
					<view class="gui-flex gui-rows gui-align-items-center" style="width:600rpx;height: 70rpx;">
						<text class="gui-text-center" style="width: 40rpx;">{{dataList[5].rowNo==null?"∞":dataList[5].rowNo}}</text>
						<image class="gui-margin" :src="avatarUrl" style="width: 60rpx;height: 60rpx;border-radius: 60rpx;"></image>
						<text class="gui-ellipsis gui-flex1">{{dataList[5].terminalnodeName}}</text>
						<text class="gui-flex1 gui-text-right gui-h5 ">{{dataList[5].historyPoints==null?"0":dataList[5].historyPoints}}</text>
					</view>
					<view style="width:640rpx; height:2rpx; background-color:#E1E2E3;" ></view>
					
					<view class="gui-flex gui-rows gui-align-items-center" style="width:600rpx;height: 70rpx;">
						<text class="gui-text-center" style="width: 40rpx;">{{dataList[5].rowNo==null?"∞":dataList[5].rowNo}}</text>
						<image class="gui-margin" :src="avatarUrl" style="width: 60rpx;height: 60rpx;border-radius: 60rpx;"></image>
						<text class="gui-ellipsis gui-flex1">{{dataList[5].terminalnodeName}}</text>
						<text class="gui-flex1 gui-text-right gui-h5 ">{{dataList[5].historyPoints==null?"0":dataList[5].historyPoints}}</text>
					</view>
					<view style="width:640rpx; height:2rpx; background-color:#E1E2E3;" ></view>
				</view>
		
			
		</view>
	</gui-page>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	name:"activityTab2",
	data() {
		return {
			isVip:false,
			imgUrls:this.imgUrl,
			avatarUrl:uni.getStorageSync("avatar"),
			dataList:[],
			dialogTitle:"完善信息",
			dialogContent:"完善店铺信息？",
			confirmTxt:"确定",
			pageLoading:true,
			backButtonStyle : 'color:#FFFFFF;', // 返回按钮样式
			headerStyle     : 'background-color:rgba(255,255,255,0)', // 头部导航样式
			statusBarStyle  : 'background-color:rgba(255,255,255,0)', // 状态栏样式
			titleStyle      : 'opacity:0', // 导航标题样式
		}
	},
	// 页面滚动调整导航的透明度
	
	methods: {
		
		close1 : function () {
			this.$refs.guimodal1.close();
		},
		confirm1 : function () {
			// 客户点击确认按钮后的逻辑请在此处实现
			if(this.confirmTxt=="充值"){
				uni.gRequest.get(
							'jfPay/payVip',
							{}, 
							(res)=>{
								console.log('post 异步请求成功');
								console.log(res);
								var orderId=res.result.id;
								if(res.status=="SUCCESS"){
									// 仅作为示例，非真实参数信息。
									var result=res.result.zfReturn;
									var resultjson=JSON.parse(result);
									uni.requestPayment({
									    provider: 'wxpay',
									    timeStamp: resultjson.timeStamp,
									    nonceStr: resultjson.nonce_str,
									    package: 'prepay_id='+resultjson.prepay_id,
									    signType: 'MD5',
									    paySign: resultjson.paySign,
									    success: function (res) {
											uni.gRequest.post(
														'jfPay/successCallbackByVip',
														{
															data:{
																id:orderId
															}
														}, 
														(res)=>{
															console.log('post 异步请求成功');
															console.log(res);
															uni.setStorageSync("isVip",true);
															
														},
														(error)=>{
															console.log(error);
														},
														(res) => {
															uni.hideLoading();
														}
													);
									        console.log('success:' + JSON.stringify(res));
											
									    },
									    fail: function (err) {
											uni.gRequest.post(
														'jfPay/errorCallbackByVip',
														{
															data:{
																id:orderId
															}
														}, 
														(res)=>{
															console.log('post 异步请求成功');
															console.log(res);
															
														},
														(error)=>{
															console.log(error);
														},
														(res) => {
															uni.hideLoading();
														}
													);
									        console.log('fail:' + JSON.stringify(err));
									    }
									});
								}
							},
							(error)=>{
								console.log(error);
							},
							(res) => {
								uni.hideLoading();
							}
						);
			}else{
				graceJS.navigate("../regist/regist_vip")
			}
			
			this.$refs.guimodal1.close();
		},
		
		registVIP:function(){
			console.log("注册vip")
			if(global.isLogin()){
				if(!global.business()){
					this.dialogTitle="完善信息";
					this.dialogContent="完善店铺信息？";
					this.confirmTxt="确定";
				}else{
					if(this.isVip){
						graceJS.showLoading("已成为会员!");
						setTimeout(()=>{uni.hideLoading();},1000)
						return;
					}
					this.confirmTxt="充值";
					this.dialogTitle="注册会员";
					this.dialogContent="确定充值1元成为会员吗?";
				}
			}else{
				graceJS.navigate("../login/login");
			}
				this.$refs.guimodal1.open();
		},
		
		addressList:function(){
			if(global.isLogin()){
				if(!global.business()){
					this.$refs.guimodal1.open();
				}else{
					graceJS.navigate("../address/address")
				}
			}else{
				graceJS.navigate("../login/login");
			}
			
			
		},
		getshoprecord:function(){
			console.log("getshoprecord")
			if(global.isLogin()){
				if(!global.business()){
					this.$refs.guimodal1.open();
				}else{
					graceJS.navigate("../record/shop_record")
				}
			}else{
				graceJS.navigate("../login/login");
			}
		},
		getIntegralrecord:function(){
					console.log("getIntegralrecord")
			if(global.isLogin()){
				if(!global.business()){
					
					this.$refs.guimodal1.open();
				}else{
					graceJS.navigate("../record/integral_record")
				}
			}else{
				graceJS.navigate("../login/login");
			}
			
			
			
		},
		gologin:function(){
			graceJS.navigate('../login/login');
		},
		reload:function(){
			console.log("下拉刷新")
			this.$refs.guipage.endReload();
		},
		getdata:function(){
			console.log("加载更多")
			this.$refs.guipage.stoploadmore();
		},
		scroll:function(e){
			if(e.detail.scrollTop > 100){
				this.backButtonStyle = 'color:#323232;';
				this.headerStyle     = 'background-color:rgba(255,255,255,0.9)';
				this.titleStyle      = 'opacity:1';
			}else{
				this.backButtonStyle = 'color:#FFFFFF;',
				this.headerStyle     = 'background-color:rgba(255,255,255,0)';
				this.titleStyle      = 'opacity:0';
				
			}
		}	
	},
	created() {
		this.pageLoading=false;
		this.isVip=uni.getStorageSync("isVip");
		this.avatarUrl=uni.getStorageSync("avatar");
		this.dataList=uni.getStorageSync("dataList");
		var that=this;
		uni.gRequest.get(
					'jfPoints/getPointsRank',
					{}, 
					(res)=>{
						console.log('get 异步请求成功');
						console.log(res);
						that.dataList = res.result;
						uni.setStorageSync("dataList",that.dataList);
					},
					(error)=>{
						console.log(error);
					},
					(res) => {
						uni.hideLoading();
					}
				);
				
			
				
	}
}
</script>
<style>
.demo{height: 1400rpx;}
.grids_item{height:140rpx ; width: 320rpx; border-radius: 20rpx;  }
.modal-btns{line-height:88rpx; font-size:35rpx; text-align:center; width:200rpx;}
</style>