<template>
	<gui-page @scroll="scroll" ref="guipage" 
	:refresh="true" :isLoading="pageLoading"
	 @reload="reload" :loadmore="true"  @loadmorefun="getdata" 
	  :customHeader="true" :headerStyle="headerStyle" 
	  :statusBarStyle="statusBarStyle" :isHeaderSized="false">
		<!-- 自定义头部导航 -->
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center gui-padding  ">
				<!-- 返回按钮 -->
				<!-- <gui-header-leading :onlyBack="true" :buttonStyle="backButtonStyle"></gui-header-leading> -->
				<!-- 导航文本此处也可以是其他自定义内容 -->
				<text class="gui-h4 gui-ellipsis gui-text-center gui-header-content gui-primary-color gui-margin" 
				:style="titleStyle">首页</text>
			</view>
			<view class="gui-margin">
			<!-- <gui-speaker
			:items="speakerMsgs" 
			:vertical="true" 
			@change="chang2" :current="0" 
			styles=" overflow:hidden; height:60rpx; line-height:60rpx; font-size:28rpx; color:#000000;">
				<text slot="icon" class="gui-block-text gui-icons demo-icon gui-color-black" style="width:100rpx;">&#xe62b;</text>
			</gui-speaker> -->
			</view>
			<gui-modal ref="guimodal2"  :isTitle="false" 
					closeBtnStyle="color:#000000; font-size:28rpx;">
						<view slot="content" class="gui-img-in">
							<form @submit="formSubmit" class="gui-form" >
							<view>
							  <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
							    <image class="avatar" :src="avatarUrl"></image>
							  </button> 
							  <view class="gui-form-item gui-border-b" >
							  	<image
							  	src="../../static/images/ic_mobile.png" 
							  	mode="widthFix" style="width:80rpx;height: 80rpx;"></image>
							  	<view class="gui-form-body">
							  		<input  class="gui-form-input" 
							  		type="nickname"  @blur="userNameInput" name="nickname" placeholder="请输入昵称" />
							  	</view>
							  	<text class="gui-form-icon gui-icons gui-text-center" 
							  	 style="color:'#999999' ">&#xe601;</text>
							  </view>
							  <view class="gui-margin-top">
							  	<button type="default" class="gui-button gui-bg-blue" formType="submit">
							  		<text class="gui-icons gui-color-white gui-button-text">&#xe642; 提交</text>
							  	</button>
							  </view>
							</view>
							</form>
							
						</view>
			</gui-modal>

			
			
			<!-- 例子 1 -->
			<gui-modal ref="guimodal1"  :canCloseByShade="true" 
			:title="dialogTitle" style="margin-top: 300rpx;" >
				<view slot="content" class="gui-padding gui-bg-gray" >
					<text class="gui-block-text gui-text-center gui-text gui-color-red1" 
					style="line-height:100rpx; padding:10rpx;">{{dialogContent}}</text>
				</view>
				<!-- 利用 flex 			布局 可以放置多个自定义按钮哦  -->
				<view slot="btns" class="gui-flex gui-rows gui-space-between">
					<!-- <view class="modal-btns gui-flex1" style="margin-right:80rpx;">
						<text class="modal-btns gui-color-gray" @tap="close1">取消</text>
					</view> -->
					<view class="modal-btns gui-flex1" style="margin-left:0rpx;">
						<button v-if="mobile==''||mobile==null"  style="background:none;margin-top: 170rpx;margin-left: 120rpx;" class="modal-btns gui-lucky-turntable-btn "   open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" @tap="getUserInfo" >
							<text class="gui-color-black  gui-bold gui-h6 "  > </text>
						</button>
						<text  @tap="confirm1" class="modal-btns gui-color-blue" >{{confirmTxt}}</text>
					</view>
				</view>
			</gui-modal>
			
			<gui-popup ref="guipopup2" :canCloseByShade="false"  >
						<view class="gui-relative gui-box-shadow gui-img-in" @tap="close2">
							<!-- <image src="../../static/images/ic_bind_dialog.png"   style="width: 600rpx;height: 650rpx;"  
							></image> -->
						</view>
			</gui-popup> 
			
			<gui-popup ref="guipopup1"  >
				<view class="gui-relative gui-box-shadow gui-img-in">
					<official-account style="width: 600rpx;height: 650rpx;"></official-account>
				</view>
			
			</gui-popup>
			
		</view>
		<!-- 页面主体 -->
		<view slot="gBody" class=" gui-bg-black-opacity3">
			 
			<image   src="../../static/home_head_bg.jpg" 
			mode="widthFix" style="width:750rpx; z-index:-5"></image>
			<!-- head 头部 -->
			<view class="border_head gui-bg-white gui-flex gui-border  gui-columns ">
				
					<view @tap="getUserInfo" class="border_head_item1 gui-flex gui-rows gui-nowrap gui-margin gui-margin-top ">
						<view class="gui-flex gui-rows ">
						<view v-if="avatarUrl===''" class=" ic_img gui-text-small  gui-bg-red gui-color-white ">头像</view>
						<image v-else-if="avatarUrl!==''" :src="avatarUrl" class=" ic_img gui-text-small  gui-bg-red gui-color-white "></image>
						<image v-if="isVip" style="margin-left: 0rpx;margin-top: 10rpx;" src="../../static/ic_vip.png"class="ic_vip_img gui-margin-small" ></image>
						</view>
					</view>
					
					<view @tap="getUserInfo" class="border_head_item2 gui-flex gui-columns" style="margin-top: -90rpx;margin-left: 170rpx;">
						<text v-if="isVip" class="gui-margin-small gui-underline" style="margin-left: 50rpx;">{{userNames==null||userNames==''?"点击获取":userNames}}</text>
						<text v-else class="gui-margin-small gui-underline" >{{userNames==null||userNames==''?"点击获取":userNames}}</text>
						<text class="gui-margin-small ">门店：{{terminalnodePO.terminalnodeName}}</text>
						<text class="gui-margin-small ">共赢商：{{allWinMerchantName}}</text>
					</view>
					
					<!-- <view class="border_head_item2 gui-flex gui-rows gui-space-around gui-align-items-center gui-space-around">
						<button v-if="mobile==''"  style="background:none;" class="gui-lucky-turntable-btn"   open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" @tap="getUserInfo" >
							<text class="gui-color-black  gui-bold gui-h6"  ></text>
						</button>
						
						<view class="gui-flex gui-columns gui-align-items-center" @tap="scan_HD(1)">
							<image  src="../../static/ic_scan.png" mode="widthFix"style="width:50px; height: 50px;" ></image>
							<text class="gui-text-small " style="margin-top: 10px;">扫码积分</text>
						</view>
						<view style="width:1px; height:80px; background-color:#E1E2E3;"></view>
						<view class="gui-flex gui-columns gui-align-items-center" @tap="sign_in">
							<image src="../../static/ic_qiandao.png" mode="widthFix"style="width:50px; height: 50px;" ></image>
							<text class="gui-text-small" style="margin-top: 10px;">签到积分</text>
						</view>
					</view> -->
			</view>
			<!--  -->
		<image @tap="goActivity()"  src="../../static/images/main_head.png" class="gui-margin"
		 style="width:700rpx;margin-top: 190rpx;height: 200rpx;"></image>	
		<!-- 产品中心 -->
		<view class="item_title gui-flex gui-rows gui-align-items-center" style="margin-left: 22px;margin-top:20px ;">
			<image src="../../static/ic_product.png" class="ic_title"></image>
			<text class="gui-bold gui-margin-small"  >产品中心</text>
			<view style="width:1px; height:40rpx; background-color:#E1E2E3;"></view>
			<text class="gui-margin-small gui-color-gray gui-text-small" style="margin-top: 10rpx; ">最齐全的产品介绍</text>
			<text class="gui-text-right gui-text-small gui-flex1 gui-color-gray" @tap="goProduct()">更多</text>
		</view>
		<view @tap="goProductDetial(6)" class="border_item gui-bg-white gui-flex gui-border  gui-columns ">
			<view class="gui-flex gui-rows gui-align-items-center" style="height: 120rpx;">
				<text class="gui-color-black gui-margin gui-ellipsis gui-h6" style="width: 460rpx;">{{product[0]}}</text>
				<text class="gui-text-right gui-text-small gui-flex1 gui-color-gray  " style="margin-right: 10rpx;">2021-09-15</text>
			</view>
			<image src="../../static/product01.jpg"style="width: 660rpx; " class="gui-border"></image>
		</view>
		
		<view @tap="goProductDetial(1)" class="border_item gui-bg-white gui-flex gui-border  gui-columns ">
			<view class="gui-flex gui-rows gui-align-items-center" style="height: 120rpx;">
				<text class="gui-color-black gui-margin gui-ellipsis gui-h6" style="width: 460rpx;">{{product[1]}}</text>
				<text class="gui-text-right gui-text-small gui-flex1 gui-color-gray  " style="margin-right: 10rpx; ">2021-09-15</text>
			</view>
			<image src="../../static/product02.jpg"style="width: 660rpx; " class="gui-border"></image>
		</view>
		<!--  -->
		
		<!-- 消息中心 -->
		<view class="item_title gui-flex gui-rows gui-align-items-center" style="margin-left: 44rpx;margin-top:20rpx ;">
			<image src="../../static/ic_zixun.png" class="ic_title"></image>
			<text class="gui-bold gui-margin-small" >消息中心</text>
			<view style="width:1px; height:40rpx; background-color:#E1E2E3;"></view>
			<text class="  gui-margin-small gui-color-gray gui-text-small" style="margin-top: 10rpx; ">最前沿的行业资讯</text>
			<text class="gui-text-right gui-text-small gui-flex1 gui-color-gray">更多</text>
		</view>
		<view class="gui-flex gui-rows gui-align-items-center gui-space-around" style="width: 660rpx;height: 140rpx; margin-top: 20rpx;margin-left: 44rpx;">
			<view class="border_item_zixun gui-bg-white gui-border">
				<view class="gui-rows  gui-flex"style="position: absolute;">
				<image src="../../static/logo.png" style="width: 80rpx;height: 80rpx;margin-top: 20rpx;" class="gui-margin-small gui-border-radius"></image>
				<view class="gui-flex gui-columns gui-flex1">
				<view @tap="showNull()" class="gui-rows"  style="margin-top: 20rpx;">
					<text class="gui-text-small gui-bg-red gui-color-white gui-text-center" style="width: 60rpx;height: 40rpx;margin-top: 20rpx;">最热</text>
					<text class="gui-text-small gui-underline ">{{product[0]}}</text>
				</view>
				<text class="gui-color-gray gui-text-small gui-text-right gui-margin-small">2021-10-28</text>
				</view>
				</view>
				<!-- <text v-if="!isVip" @tap="registVIP" class="item_vip gui-color-white gui-text-center gui-bg-red4">非会员版不可查看1元加入VIP俱乐部</text> -->
			</view>
			
			<view class="border_item_zixun gui-bg-white gui-border">
				<view class="gui-rows  gui-flex"style="position: absolute;">
				<image src="../../static/logo.png" style="width: 80rpx;height: 80rpx;margin-top: 20rpx;" class="gui-margin-small gui-border-radius"></image>
				<view class="gui-flex gui-columns gui-flex1">
				<view @tap="showNull()" class="  gui-rows"  style="margin-top: 20rpx;">
					<text class="gui-text-small gui-bg-red gui-color-white gui-text-center" style="width: 60rpx;height: 40rpx;margin-top: 20rpx;">最热</text>
					<text class="gui-text-small gui-underline ">{{product[1]}}</text>
				</view>
				<text class="gui-color-gray gui-text-small gui-text-right gui-margin-small">2021-10-28</text>
				</view>
				</view>
				<!-- <text v-if="!isVip"  @tap="registVIP" class="item_vip gui-color-white gui-text-center gui-bg-red4">非会员版不可查看1元加入VIP俱乐部</text> -->
			</view>
		</view>
		
		<!--  -->
		<!-- 活动中心 -->
		<view class="item_title gui-flex gui-rows gui-align-items-center" style="margin-left: 44rpx;margin-top:20rpx ;">
			<image src="../../static/ic_huodong.png" class="ic_title"></image>
			<text class="gui-bold gui-margin-small" >活动中心</text>
			<view style="width:1px; height:40rpx; background-color:#E1E2E3;"></view>
			<text class="  gui-margin-small gui-color-gray gui-text-small" style="margin-top: 10rpx; ">最热门的福利活动</text>
			<text class="gui-text-right gui-text-small gui-flex1 gui-color-gray">更多</text>
		</view>
		<view class="gui-flex gui-rows gui-align-items-center gui-space-around" style="width: 660rpx;height: 140rpx; margin-top: 20rpx;margin-left: 44rpx;">
			<view class="border_item_zixun gui-bg-white gui-border">
				<view class="gui-rows  gui-flex"style="position: absolute;">
				<image src="../../static/logo.png" style="width: 80rpx;height: 80rpx;margin-top: 20rpx;" class="gui-margin-small gui-border-radius"></image>
				<view class="gui-flex gui-columns gui-flex1">
				<view @tap="showNull()" class="  gui-rows"  style="margin-top: 20rpx;">
					<text class="gui-text-small gui-bg-red gui-color-white gui-text-center" style="width: 30px;height: 20px;margin-top: 10px;">最热</text>
					<text class="gui-text-small gui-underline ">{{product[0]}}</text>
					<text></text>
				</view>
				<text class="gui-color-gray gui-text-small gui-text-right gui-margin-small">2021-10-28</text>
				</view>
				</view>
				<!-- <text v-if="!isVip"  @tap="registVIP" class="item_vip gui-color-white gui-text-center gui-bg-red4">非会员版不可查看1元加入VIP俱乐部</text> -->
			</view>
			
			<view class="border_item_zixun gui-bg-white gui-border">
				<view class="gui-rows  gui-flex"style="position: absolute;">
				<image src="../../static/logo.png" style="width: 80rpx;height: 80rpx;margin-top: 10px;" class="gui-margin-small gui-border-radius"></image>
				<view class="gui-flex gui-columns gui-flex1">
				<view @tap="showNull()" class="gui-rows"  style="margin-top: 20rpx;">
					<text class="gui-text-small gui-bg-red gui-color-white gui-text-center" style="width: 30px;height: 20px;margin-top: 10px;">最热</text>
					<text class="gui-text-small gui-underline ">{{product[1]}}</text>
					<text></text>
				</view>
				<text class="gui-color-gray gui-text-small gui-text-right gui-margin-small">2021-10-28</text>
				</view>
				</view>
				<!-- <text v-if="!isVip"  @tap="registVIP" class="item_vip gui-color-white gui-text-center gui-bg-red4" >非会员版不可查看,1元加入VIP俱乐部</text> -->
			</view>
			
			
		</view>
		
		</view>
		<!-- 右下角挂件 -->
				
		<view slot="gPendant" >
		<image @tap="goActivity()" mode="widthFix" style="width: 120rpx;height: 120rpx;margin-bottom: 300rpx;" src="../../static/ic_activity_btn.png"></image>
		</view>
	</gui-page>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
var graceString = require('@/GraceUI5/js/string.js');
var GraceRequestConfig = require('@/GraceUI5/js/request/config.js');
import data from '../../GraceUI5/demoData/data.js';
import { formatDate, reverseGeocoder, getLocation } from '@/utils'
export default {
	data() {
		return {
			
			isBind:false,
			latitude:0,
			longitude:0,
			locationName:'',
			speakerMsgs : [
				{ title: "成为会员，获取双倍积分特权", url: "../shop/shop", opentype: "switchTab"},
				{ title: "兑换的商品每月25号发货到代理商", url: "../shop/shop", opentype: "switchTab"}
			],
			terminalnodePO:'',
			allWinMerchantName:'',//共赢商名称
			suids:'',		
			mobile:'',
			QRcode:'',
			points:"", //积分
			energy:"", //能量
			fire:'', //活力值
			gysCode:'',
			avatarUrl:"",
			confirmTxt:"确定",
			dialogTitle:"完善门店",
			dialogContent:"完善门店信息？",
			isVip:false,
			product:["超跑石墨烯 | 一路超跑，耐用更耐跑","石墨烯领跑者 | 增程之王，双倍动力！"],
			userNames:"点击获取",
			pageLoading:true,
			backButtonStyle : 'color:#FFFFFF;', // 返回按钮样式
			headerStyle     : 'background-color:rgba(255,255,255,0)', // 头部导航样式
			statusBarStyle  : 'background-color:rgba(255,255,255,0)', // 状态栏样式
			titleStyle      : 'opacity:0', // 导航标题样式
			productDetials:data.products,
			
			           
			
		}
	},
	
	methods: {
		formSubmit : function(e){
			this.closemodel2()
			console.log("进入提交表单",e)
			var that=this;
			var formData = e.detail.value;
			console.log()
			uni.gRequest.post(
						'jfLogin/saveUserInfo',
						{
							data:{
								pic: that.avatarUrl,
								wxaccount: that.userNames
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
			
				/* //上传店铺信息
				uni.gRequest.post(
							'jfLogin/register',
							{
								data:{
									terminalnodeName:formData.terminalnodeName,
									contacts:formData.name,
									phone:formData.mobile
								}
							}, 
							(res)=>{
								console.log('post 异步请求成功');
								console.log(res);
								var data = res.result;
								if(res.status=="SUCCESS"){
									uni.setStorageSync("businessId",data.businessId);
									uni.setStorageSync("terminalnodePO",formData);
									graceJS.back()
									if(global.isLogin()){
										//graceJS.navigate("../index/index");
										//graceJS.navigate("../index/index","switchTab");
									}else{
										//graceJS.navigate("../login/login");
									}
								}
							},
							(error)=>{
								console.log(error);
							},
							(res) => {
								uni.hideLoading();
							}
						); */
				
				
					
			
		},
		
		 //获取昵称输入内容
		      onChooseAvatar(e) {
		                 console.log('头像信息》')
		                 console.log(e)
		                 this.avatarUrl = e.detail.avatarUrl;
						 uni.setStorageSync("avatar",this.avatarUrl);
						 
		             },
					  userNameInput(e){
					      this.userNames = e.detail.value
						   uni.setStorageSync("wxaccount",this.userNames );
					 },
		showNull(){
			 graceJS.msg("功能暂未开放，敬请期待！");
		},
		open2  : function () {this.$refs.guipopup2.open();},
		open1  : function () {this.$refs.guipopup1.open();},
		close1 : function () {this.$refs.guipopup1.close();},
		close2 : function () {this.$refs.guipopup2.close();},
		
		getLocation () {
		  getLocation()
		    .then(res => {
				console.log('当前位置信息getLocation：', res)
						const { longitude, latitude } = res
						this.getLocationInfo({ longitude, latitude })
		    })
		    .catch(() => {
		    })
		},
		
		// 获取位置信息
		getLocationInfo (location) {
		  reverseGeocoder(location)
		    .then(res => {
		      console.log('当前位置信息getLocationInfo：', res)
			  console.log('进入绑定业务员')
			 var accountId= uni.getStorageSync("accountId");
			 var allWinCode= uni.getStorageSync("allWinCode");
			 var suids= uni.getStorageSync('suids');
			  this.bindSaleMan(accountId,suids,allWinCode,res.result.address)
		    })
		    .catch(err => {
		     console.log('授权失败：', err)
		    })
		},
		 gup(name, url) {
		    if (!url) url = location.href;
		    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		    var regexS = "[\\?&]" + name + "=([^&#]*)";
		    var regex = new RegExp(regexS);
		    var results = regex.exec(url);
		    return results == null ? null : results[1];
		  },
		goProductDetial(e){
			console.log("goProductDetial",e)
			var picUrl=this.productDetials[e].picUrl;
			console.log("goProductDetial",picUrl)
			if(e==1){
				graceJS.navigate("../../pagesDpic/pages/productDetial?picUrl="+picUrl);
			}else{
				graceJS.navigate("../../pagesD/pages/productDetial?picUrl="+picUrl);
			}
		},
		chang2:function(e){},
		goProduct(){
			console.log("goPage");
			graceJS.navigate("../../pagesD/pages/productList");
		},
		goActivity(){
			graceJS.navigate("../../pagesC/pages/main_activity819");
			//graceJS.navigate("../../pagesE/pages/activity");
			//graceJS.navigate("../../pages/regist/newRegist");
			
		},
		getUserInfo(){
			this.openmodel2();
			/* var that=this;
		        uni.getUserProfile({
		            desc:'Wexin', // 这个参数是必须的
		            success:res=>{
		                console.log("获取用户信息=",res)
						that.userNames=res.userInfo.nickName;
						that.avatarUrl=res.userInfo.avatarUrl;
						uni.setStorageSync("wxaccount",res.userInfo.nickName);
						uni.setStorageSync("avatar",that.avatarUrl);
						uni.gRequest.post(
									'jfLogin/saveUserInfo',
									{
										data:{
											pic: that.avatarUrl,
											wxaccount: that.userNames
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
		            },
		            fail:err=>{
		                console.log(err)
						that.userNames="点击获取";
						that.avatarUrl="";
		            }
		        }) */
		    },
			
			getPhoneNumber (e) {
				var that=this;
				console.log(e)
				new Promise(GraceRequestConfig.getToken.bind(this)).then(()=>{
					uni.gRequest.get(
							'jfLogin/wxUpdatePhoneNumber',
							{
								data: {encryptedData : e.detail.encryptedData,iv : e.detail.iv}
							}, 
							(res)=>{
								console.log('get 异步请求成功');
								console.log(res);
								if(res.status=='SUCCESS'){
									that.mobile=res.result.mobile;
									var businessId=res.result.businessId;
									console.log("门店号："+businessId)
									console.log("手机号："+that.mobile)
									uni.setStorageSync('mobile', that.mobile);
									if(businessId==null||businessId==''||businessId==undefined){
										
									}else{
										uni.setStorageSync("businessId",businessId);
										//that.scan_QR();
									}
									
								}
							},
							(error)=>{
								console.log(error);
							},
							(res) => {
								uni.hideLoading();
							}
						);
				}).catch((e)=>{
					console.log(e);
				});
				
				
				
			 },
			 openmodel2 : function () {
			 	this.$refs.guimodal2.open();
			 },
			 
		closemodel2 : function () {
			this.$refs.guimodal2.close();
		},	 
		close1 : function () {
			this.$refs.guimodal1.close();
		},
		confirm1 : function () {
			// 客户点击确认按钮后的逻辑请在此处实现
			var that=this;
		/* 	if(this.confirmTxt=="充值"){
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
															that.isVip=true;
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
				//graceJS.navigate("../regist/regist_vip")
				
			} */
			graceJS.navigate("../regist/newRegist")
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
					this.confirmTxt="充值";
					this.dialogTitle="注册会员";
					this.dialogContent="确定充值1元成为会员吗?";
				}
			}else{
				graceJS.navigate("../login/login");
			}
				this.$refs.guimodal1.open();
		},
		
		
		scan_bind(){
			var that=this;
			if(global.isLogin()){
				if(!global.business()){
					this.dialogTitle="完善信息";
					this.dialogContent="完善门店信息？";
					this.confirmTxt="确定";
					this.$refs.guimodal1.open();
				}else{
					uni.scanCode({
					    onlyFromCamera: true,
					    success: function (res) {
					        console.log('条码类型：' + res.scanType);
					        console.log('条码内容：' + res.result);
						if(graceString.search(res.result,'accountId=',false)>-1){
							var index=res.result.lastIndexOf("accountId=");
							var index2=res.result.lastIndexOf("allWinCode=");
							that.QRcode=res.result.substring(index+10,index+34);
							that.gysCode=res.result.substring(index2+11,index2+18);
							  console.log("扫描的QRcode="+that.QRcode) ;
							   console.log("扫描的gysCode="+that.gysCode) ;
							  if(that.QRcode!=null&& that.QRcode!=undefined&&that.QRcode!=''&&that.gysCode!=null){
							    that.bindSaleMan(that.QRcode,that.suids,that.gysCode,"");
							  }else{
							  	graceJS.msg("兑换码无法识别！");
							  }
							  
						}else{
							graceJS.msg("兑换码无法识别！");
						}		
					}
					});
					
				}
			}else{
				graceJS.navigate("../login/login");
			}
			console.log("扫码绑定业务员")
			
			
			
		},
		
		scan_HD:function(type){
		
			var that=this;
			if(global.isLogin()){
				if(!global.business()){
					this.dialogTitle="完善信息";
					this.dialogContent="完善门店信息？";
					this.confirmTxt="确定";
					this.$refs.guimodal1.open();
				}else{
					
					uni.scanCode({
					    onlyFromCamera: true,
					    success: function (res) {
					        console.log('条码类型：' + res.scanType);
					        console.log('条码内容：' + res.result);
					
						if(graceString.search(res.result,'tn/',false)>-1){
							var index=res.result.lastIndexOf("tn/");
							 that.QRcode=res.result.substring(index+3,res.result.length);
							  console.log("上传的QRcode="+that.QRcode) ;
							  if(that.QRcode!=null&& that.QRcode!=undefined&&that.QRcode!=''){
							  	uni.gRequest.post(
							  				'jf/jfbbc/scanningBatteryCode',
							  				{
							  					data:{
							  						batteryCode:that.QRcode,
													type:type
							  					}
							  				}, 
							  				(res)=>{
							  					console.log('post 异步请求成功');
							  					console.log(res);
							  					if(res.result){
													graceJS.msg("兑换成功");
							  					}else{
							  						graceJS.msg(res.errorMsg);
							  					} ;
							  				},
							  				(error)=>{
							  					console.log(error);
							  				},
							  				(res) => {
							  				
							  				}
							  			);
							  	
							  }else{
							  	graceJS.msg("兑换码无法识别！");
							  }
							  
						}else{
							graceJS.msg("兑换码无法识别！");
						}		
					}
					});
					
				}
			}else{
				graceJS.navigate("../login/login");
			}
			console.log("扫码")
			
		},
		
		sign_in:function(){
			console.log("签到")
			/* this.$refs.guimodal1.open();
			return; */
			
			
			if(global.isLogin()){
				if(!global.business()){
					this.dialogTitle="完善信息";
					this.dialogContent="完善门店信息？";
					this.confirmTxt="确定";
					this.$refs.guimodal1.open();
				}else{
					this.confirmTxt="充值";
					this.dialogTitle="注册会员";
					this.dialogContent="确定充值1元成为会员吗?";
					graceJS.navigate("../index/ImportCalendar");
				}
			}else{
				graceJS.navigate("../login/login");
			}
			
			
			
		},
		reload:function(){
			console.log("下拉刷新")
			this.$refs.guipage.endReload();
		},
		getdata:function(){
			console.log("加载更多")
			this.$refs.guipage.stoploadmore();
		},
		bindSaleMan(salesmanId,suids,gysCode,address){
			var that=this;
			uni.gRequest.post(
						'jf/jfbbc/bindSalesperson',
						{
							data:{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
								salesmanId:salesmanId,
								suids:suids,
								gysCode: gysCode,
								address:address
							}
						}, 
						(res)=>{
							console.log('post 异步请求成功');
							console.log(res);
							if(res.status=='SUCCESS'){
								graceJS.msg(res.result);
								that.isBind=false;
								uni.setStorageSync("isBind",false);
								that.open2();
							}else{
								graceJS.msg(res.errorMsg);
							} ;
						},
						(error)=>{
							console.log(error);
						},
						(res) => {
						
						}
					);
		},
		
		getSalesmanAndGys(){
			var that=this;
			setTimeout(()=>{
				uni.gRequest.get(
							'jf/jfbbc/getSalesmanAndGys',
							{}, 
							(res)=>{
								console.log('get 异步请求成功');
								console.log(res);
								if(res.status=='SUCCESS'){
									if(res.result.allWinMerchantName!=null){
										that.allWinMerchantName=res.result.allWinMerchantName;
										uni.setStorageSync('allWinMerchantName', res.result.allWinMerchantName);
									}else{
										that.allWinMerchantName="未绑定！"
										uni.setStorageSync('allWinMerchantName', "未绑定！");
									}
									
								}else{
									that.allWinMerchantName="未绑定！"
									uni.setStorageSync('allWinMerchantName', "未绑定！");
								}
							},
							(error)=>{
								console.log(error);
								
							},
							(res) => {
								uni.hideLoading();
							}
						);
			},1000);
			
			
		},
		getTerminalnodePoints(){
			var that=this;
			setTimeout(()=>{
				uni.gRequest.get(
							'jfPoints/getTerminalnodePoints',
							{}, 
							(res)=>{
								console.log('get 异步请求成功');
								console.log(res);
								that.points= res.result.points;
								that.energy=res.result.energy;
								that.fire=res.result.fire;
								uni.setStorageSync("points",res.result.points);
								uni.setStorageSync("energy",res.result.energy);
								uni.setStorageSync("fire",res.result.fire);
								console.log("points="+that.points);
								console.log("energy="+that.energy);
								console.log("fire="+that.fire);
							},
							(error)=>{
								console.log(error);
								that.points= 0;
								that.energy=0;
								that.fire=0;
								uni.setStorageSync("points",0);
								uni.setStorageSync("energy",0);
								uni.setStorageSync("fire",0);
							},
							(res) => {
								uni.hideLoading();
							}
						);
			},1000);
			
		},
		
		// 页面滚动调整导航的透明度
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
	onLoad(options) {
		console.log("options=",options)
		let queryAll =decodeURIComponent(options.q);
		console.log("queryAll=",queryAll)
		let accountId=this.gup("accountId",queryAll);
		let allWinCode=this.gup("allWinCode",queryAll);
		if(accountId!=null&&allWinCode!=null){
			uni.setStorageSync("accountId",accountId);
			uni.setStorageSync("allWinCode",allWinCode);
			uni.setStorageSync("isBind",true);
			this.isBind=true;
			
		}
		console.log("accountId=",accountId)
		console.log("allWinCode=",allWinCode)
		console.log("isBind=",this.isBind)
		
	},
	created() {
		
		console.log("index created")
		var now=this;
		//默认登录
		uni.login({
		  provider: 'weixin',
		  success: function (loginRes) {
			console.log(loginRes);
		    console.log("usercode="+loginRes.code);
			uni.setStorageSync('usercode', loginRes.code);
			graceJS.post(
					now.apiUrl+"jfLogin/loginApplets",
					{authcode:loginRes.code},
					'json',
					{},
					(res) => {
						var data = res.result;
						console.log(res);
						if(res.status == 'SUCCESS'){
							console.log(data.userToken);
							uni.setStorageSync("points",data.user.points);
							uni.setStorageSync("energy",data.user.energy);
							uni.setStorageSync("fire",data.user.fire);
							uni.setStorageSync('suids', data.user.id);
							uni.setStorageSync(GraceRequestConfig.localTokenKeyName, data.userToken);
							uni.setStorageSync('mobile', data.user.mobile);
							uni.setStorageSync("businessId",data.user.businessId);
							uni.setStorageSync("isVip",data.user.isVip=="1");
							uni.setStorageSync("wxaccount",data.user.wxaccount);
							uni.setStorageSync("avatar",data.user.avatar);
							uni.setStorageSync("terminalnodePO",data.terminalnodePO);
						}else{
							uni.setStorageSync("points","");
							uni.setStorageSync("energy","");
							uni.setStorageSync("fire","");
							uni.setStorageSync('suids', "");
							uni.setStorageSync('mobile', "");
							uni.setStorageSync(GraceRequestConfig.localTokenKeyName, "");
							uni.setStorageSync("businessId",data.user.businessId);
							uni.setStorageSync("isVip",false);
							uni.setStorageSync("wxaccount","");
							uni.setStorageSync("avatar","");
							uni.setStorageSync("terminalnodePO","");
						}
					},
					(e) => {
						console.log(e);
					}
			);
		  }
		});
	},
	onShow() {
		
		
		/* this.dialogTitle="温馨提示";
		this.dialogContent="由于系统升级，暂停相关功能，系统升级期间，您现有积分将持续保留，已兑换的礼品，将在近期发货！",
		 */
		this.isBind=uni.getStorageSync('isBind');
		console.log("index onshow",global.isLogin())
		var that=this;
		this.isVip=uni.getStorageSync("isVip");
		this.userNames=uni.getStorageSync("wxaccount");
		this.avatarUrl=uni.getStorageSync("avatar");
		this.mobile=uni.getStorageSync("mobile");
		this.suids=uni.getStorageSync('suids');
		this.pageLoading=false;
		this.terminalnodePO=uni.getStorageSync("terminalnodePO");
		/* if(global.isLogin()){
			this.getSalesmanAndGys();
			this.getTerminalnodePoints();
		}
		if(!global.business()){
			this.dialogTitle="完善信息";
			this.dialogContent="完善门店信息？";
			this.confirmTxt="确定";
			this.$refs.guimodal1.open();
		}
		
		if(this.isBind&&global.business()){
			this.getLocation ();
			
		}
		 */
	}
}
</script>
<style scoped>
@import "@/GraceUI5/css/colors.css";
.gui-lucky-turntable-btn{width:110rpx; height:110rpx; position:absolute; left: 70rpx;top: 20rpx; z-index:9;}
.border_head{height:300rpx ; width: 650rpx; border-radius: 30rpx; margin-top: -120rpx;margin-left: 50rpx; position:absolute}
.border_head_item1{width: 650rpx;height: 100rpx;}
.border_head_item2{width: 650rpx;height: 200rpx;position: relative;}
.ic_img{line-height:140rpx;text-align:center; height: 140rpx;border-radius: 90rpx;width: 140rpx;}
.ic_vip_img{height: 40rpx; width: 40rpx;}
.item_title{ width:650rpx;height: 60rpx;}
.ic_title{width: 40rpx; height: 40rpx;}
.border_item{height:240rpx ; width: 660rpx; border-radius: 20rpx; margin-top: 10rpx;margin-left: 44rpx;}
.border_item_zixun{height:140rpx ; width: 320rpx; border-radius: 20rpx; margin-top: 10rpx; position: relative;}
.item_vip{height:140rpx ; width: 320rpx;line-height: 60rpx;border-radius: 20rpx;z-index: 9;position: absolute;}
.modal-btns{line-height:88rpx; font-size:35rpx; text-align:center; width:200rpx;}
.pendant{width:88rpx; height:88rpx; border-radius:88rpx; text-align:center; line-height:88rpx; font-size:55rpx;}


.avatar-wrapper {
  padding: 0;
  width: 56px !important;
  border-radius: 8px;
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: #fff;
}

.avatar {
  display: block;
  width: 56px;
  height: 56px;
}

.container {
  display: flex;
}
.row{
   border-top: 1px solid #ccc;
   border-bottom: 1px solid #ccc;
   display: flex;
   align-items: center;
   height: 80rpx;
   padding-left: 20rpx;
}
.text1{
    flex: 2;
}
.weui-input{
    flex: 6;
}


</style>



