<template>
	<view style="padding:50rpx;">
		<view style="height:150rpx;"></view>
		<view class="gui-flex gui-rows gui-justify-content-center">
			<gui-image src="../../static/m-logo.png"></gui-image>
		</view>
		<view style="margin-top:80rpx;">
		<!-- 	<form @submit="submit">
				<view>
					<text class="gui-text-small gui-color-gray">账户</text>
				</view>
				<view class="gui-border-b">
					<input type="text" class="gui-form-input" 
					name="username" placeholder="手机号/账号" />
				</view>
				<view class="gui-margin-top">
					<text class="gui-text-small gui-color-gray">密码</text>
				</view>
				<view class="gui-border-b">
					<input type="password" class="gui-form-input" 
					name="password" placeholder="密码" />
				</view>
				<view class="gui-margin-top gui-flex gui-rows gui-space-between" 
				hover-class="gui-tap">
					<text class="gui-text gui-color-gray gui-block-text" @tap="forgetPwd">忘记密码</text>
					<text class="gui-text gui-color-gray gui-block-text gui-text-right" @tap="loginbymsg">快速注册</text>
				</view>
				
			</form> -->
			<view style="margin-top:38rpx;">
				<button type="default" class="gui-button gui-bg-green"   open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber"
				style="border-radius:50rpx;">
					<text class="gui-color-white gui-button-text">一 键 登 录</text>
				</button>
			</view>
		</view>
		
		<view class="gui-flex gui-rows gui-nowrap gui-align-items-center" style="margin-top:80rpx;">
			<view class="gui-title-line"></view>
			<text class="gui-primary-color gui-h6" style="padding-left:50rpx; padding-right:50rpx;">方式登录</text>
			<view class="gui-title-line"></view>
		</view>
		<view class="gui-flex gui-rows gui-nowrap gui-justify-content-center gui-margin-top">
			<view class="other-login-icons" hover-class="gui-tap">
				<text class="other-login-icons gui-color-green gui-icons " >&#xe63e;</text>
			</view>
		</view>
	</view>
</template>
<script>
var GraceRequestConfig = require('@/GraceUI5/js/request/config.js');
var graceChecker = require("@/GraceUI5/js/checker.js");
var graceJS = require('@/GraceUI5/js/grace.js');

export default {
	data() {
		return {}
	},
	methods: {
		decryptPhoneNumber:function(e){
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
								var mobile=res.result.mobile;
								var businessId=res.result.businessId;
								console.log("门店号："+businessId)
								console.log("手机号："+mobile)
								uni.setStorageSync('mobile', mobile);
								if(businessId==null||businessId==''||businessId==undefined){
									graceJS.navigate("../regist/regist_vip");
								}else{
									uni.setStorageSync("businessId",businessId);
									graceJS.navigate("../index/index","switchTab");
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
		
		forgetPwd  : function () { console.log('请自行完善代码'); },
		loginbymsg : function () { graceJS.navigate("../regist/regist_vip") },
		/* submit : function(e){
			
			// 表单数据
			var formData = e.detail.value;
			console.log(formData);
			// 利用 graceUI 的表单验证工具进行验证
			//定义表单规则
			var rule = [
				{name:"username", checkType : "string", checkRule:"5,50", errorMsg:"登录账户输入有误"},
				{name:"password", checkType : "string", checkRule:"6,100", errorMsg:"登录密码至少6个字符"},
			];
			var checkRes = graceChecker.check(formData, rule);
			var now=this;
			
			if(checkRes){ 
				uni.showToast({title:"验证通过!", icon:"none"});
				// 根据项目需要完成数据验证工作
					graceJS.post(
								now.apiUrl+"pms-web/pc/sys/loginApp",
								{account:formData.username, userPassword : formData.password,captchaCode:"",authToken: graceJS.uuid(),lang:""},
								'form',
								{},
								(res) => {
									var data = res.result;
									if(res.status == 'SUCCESS'){
										console.log(data.userToken);
										uni.setStorageSync('account', formData.username);
										uni.setStorageSync('password', formData.password);
										uni.setStorageSync(GraceRequestConfig.localTokenKeyName, data.userToken);
										graceJS.navigate('../index/index');
									}else{
										
									}
									
								},
								(e) => {
									console.log(e);
								}
							);
			}else{
				uni.showToast({ title:graceChecker.error, icon: "none" });
			}
		} */
	}
}
</script>
<style>
.login-logo{width:180rpx; height:180rpx; font-size:80rpx; text-align:center; line-height:120rpx; padding:30rpx; border-radius:18rpx;}
.other-login-icons{width:88rpx; height:88rpx; text-align:center; font-size:70rpx; margin:0rpx;}
</style>