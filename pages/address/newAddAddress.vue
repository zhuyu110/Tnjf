<template>
	<gui-page :customHeader="true" :headerStyle="headerStyle" :statusBarStyle="statusBarStyle" :isHeaderSized="false">
		<!-- 自定义头部导航 -->
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center gui-padding">
				<!-- 返回按钮 -->
				<gui-header-leading :onlyBack="true" :buttonStyle="backButtonStyle"></gui-header-leading>
				<!-- 导航文本此处也可以是其他自定义内容 -->
				<text class="gui-h4 gui-ellipsis gui-text-center gui-header-content gui-primary-color" 
				:style="titleStyle">完善收获地址</text>
			</view>
			<text class=" gui-color-white gui-flex gui-h4 gui-ellipsis gui-text-center  "
			style="margin-top: -50rpx;margin-left: 300rpx;">填写收获地址</text>
		</view>
		<!-- 页面主体 -->
		<view slot="gBody">
			<image 
			src="../../static/images/ic_regist_head.png" 
			mode="widthFix" style="width:750rpx;z-index:-5;height:600rpx ;">
			</image>
				<view class="gui-flex gui-rows " style="margin-top: -200rpx;margin-left: 300rpx;">
				<view v-if="avatarUrl===''" class=" ic_img gui-text-small  gui-bg-red gui-color-white ">头像</view>
				<image v-else-if="avatarUrl!==''" :src="avatarUrl" class=" ic_img gui-text-small  gui-bg-red gui-color-white "></image>
				<image v-if="isVip" src="../../static/ic_vip.png"class="ic_vip_img gui-margin-small" ></image>
				</view>
				
			<view class="demo gui-bg-white " style="margin-left: 120rpx;margin-right: 120rpx;margin-top: 30rpx;">
					<form @submit="formSubmit" class="gui-form" >
						<view class="gui-form-item gui-border-b" >
							<image
							src="../../static/images/ic_username.png" 
							mode="widthFix" style="width:80rpx;height: 80rpx;"></image>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input"  style="float: left;"
								:value="addressForm.name" name="name" placeholder="个人姓名" />
							</view>
							<text class="gui-form-icon gui-icons gui-text-center" 
							 style="color:'#999999' ">&#xe601;</text>
						</view>
						<view class="gui-form-item gui-border-b" >
							<image
							src="../../static/images/ic_mobile.png" 
							mode="widthFix" style="width:80rpx;height: 80rpx;"></image>
							<view class="gui-form-body">
								<input type="number" class="gui-form-input" 
								:value="addressForm.phone" name="mobile" placeholder="联系电话" />
							</view>
							<text class="gui-form-icon gui-icons gui-text-center" 
							 style="color:'#999999' ">&#xe601;</text>
						</view>
						<view class="gui-form-item gui-border-b" >
							<image
							src="../../static/images/ic_terminalnodeName.png" 
							mode="widthFix" style="width:80rpx;height: 80rpx;"></image>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input" 
								:value="addressForm.address" name="address" placeholder="详细地址" />
							</view>
							<text class="gui-form-icon gui-icons gui-text-center" 
							 style="color:'#999999' ">&#xe601;</text>
						</view>
						<view class="gui-form-item gui-border-b" >
							<image
							src="../../static/images/ic_terminalnodeName.png" 
							mode="widthFix" style="width:80rpx;height: 80rpx;"></image>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input" 
								:value="addressForm.idCard" name="idCard" placeholder="身份证号" />
							</view>
							<text class="gui-form-icon gui-icons gui-text-center" 
							 style="color:'#999999' ">&#xe601;</text>
						</view>
						
						<view class="gui-margin-top">
							<button type="default" class="gui-button gui-bg-blue" formType="submit">
								<text class="gui-icons gui-color-white gui-button-text">&#xe642; 提交</text>
							</button>
						</view>
						
					</form>
				
			</view>
		</view>
	</gui-page>
</template>
<script>
var  graceChecker = require("@/GraceUI5/js/checker.js");
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			addressForm:"",
			avatarUrl:"",
			mobile:"",
			backButtonStyle : 'color:#FFFFFF;', // 返回按钮样式
			headerStyle     : 'background-color:rgba(255,255,255,0)', // 头部导航样式
			statusBarStyle  : 'background-color:rgba(255,255,255,0)', // 状态栏样式
			titleStyle      : 'opacity:0', // 导航标题样式
		}
	},
	onShow() {
		this.avatarUrl=uni.getStorageSync("avatar");
		this.mobile=uni.getStorageSync("mobile");
		
	},
	methods:{
		// 表单提交
		formSubmit : function(e){
			console.log("进入提交表单",e)
			var that=this;
			var rule = [
				{ name: "name", checkType: "string", checkRule: "1,20", errorMsg: "名称必填" },
				{ name: "mobile", checkType: "phone", checkRule: "11", errorMsg: "请填写正确填写联系电话" },
				{ name: "address", checkType: "string", checkRule: "6,100", errorMsg: "请填详细的地址信息至少大于6个字符！" },
				{ name: "idCard", checkType: "idCard", checkRule: "", errorMsg: "请填写正确身份证号" }
			];
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if(checkRes){
				console.log(formData);
				uni.showLoading({
					title:"上传中...",
					mask:true
				});
				//上传店铺信息
				uni.gRequest.post(
							'jfPoints/perfectInformation',
							{
								data:{
									name:formData.name,
									phone:formData.phone,
									address:formData.address,
									idCard:formData.idCard
								}
							}, 
							(res)=>{
								console.log('post 异步请求成功');
								console.log(res);
								var data = res.result;
								if(res.status=="SUCCESS"){
									uni.setStorageSync("businessId",data.businessId);
									graceJS.back()
									/* if(global.isLogin()){
										//graceJS.navigate("../index/index");
										//graceJS.navigate("../index/index","switchTab");
									}else{
										//graceJS.navigate("../login/login");
									} */
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
				uni.showToast({ title: graceChecker.error, icon: "none" });
			}
		}
		
		
	},
	
	// 页面滚动调整导航的透明度
	onPageScroll:function(e){
		if(e.scrollTop > 100){
			this.backButtonStyle = 'color:#323232;';
			this.headerStyle     = 'background-color:rgba(255,255,255,0.9)';
			this.titleStyle      = 'opacity:1';
		}else{
			this.backButtonStyle = 'color:#FFFFFF;',
			this.headerStyle     = 'background-color:rgba(255,255,255,0)';
			this.titleStyle      = 'opacity:0';
			
		}
	}
}
</script>
<style>
	.gui-border-b{padding-top:15rpx;}
.demo{padding:10rpx 0; height:2000px;}
.ic_img{line-height:140rpx;text-align:center; height: 140rpx;border-radius: 90rpx;width: 140rpx;}
.ic_vip_img{height: 40rpx; width: 40rpx;}
</style>