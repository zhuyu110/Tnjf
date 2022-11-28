<template>
	<view class="gui-padding ">
		<form @submit="submit">
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label gui-color-white">联系人名称</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input  gui-text-left  " 
					v-model="formData.linkname" name="linkname"  />
				</view>
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label gui-color-white">联系电话</text>
				<view class="gui-form-body">
					<input type="number" class="gui-form-input gui-text-left gui-color-white" 
					v-model="formData.mobile" name="mobile" />
				</view>
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label gui-color-white">联系地址</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input gui-text-left gui-color-white" 
					v-model="formData.address" name="address"  />
				</view>
			</view>
			
			<view class="gui-form-item gui-border-b">
				<view class="gui-margin-top-large  ">
					<text class="gui-text  gui-color-white">上传塑壳上的激光码照片 </text>
					<view class="gui-text-center"style="margin-left: 40rpx;">
					<gui-image src="../../pagesC/static/images/ic_one.png" :width="200" ></gui-image>
					</view>
				</view>
				<view class="gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
					<view class="gui-idcard-items-image" @tap="selectImg1">
						<gui-image :src="idCard1" :width="210" class="gui-margin"></gui-image>
					</view>
				</view>
			</view>
			<input   v-model="formData.dcpic" name="dcpic" v-show="false"/>
			
			<view class="gui-form-item gui-border-b">
				<view class="gui-margin-top-large gui-text-center">
					<text class="gui-text  gui-color-white">电池整体照片需能看到品牌</text>
					<view class="gui-text-center" style="margin-left: 40rpx;">
					<gui-image src="../../pagesC/static/images/ic_two.png" :width="200" ></gui-image>
					</view>
				</view>
				<view class=" gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
					<view class="gui-idcard-items-image" @tap="selectImg2">
						<gui-image :src="idCard2" :width="210" class="gui-margin" ></gui-image>
					</view>
				</view>
			</view>
			<input v-model="formData.dcpic2" name="dcpic2" v-show="false"/>
			<view style="margin-top:50rpx;">
				
				<button type="default" class="gui-button gui-bg-red gui-margin-top" 
				style="border-radius:80rpx;" formType="submit" 
				>
					<text class="gui-icons gui-color-white gui-button-text">&#xe642; 上传</text>
				</button>
			</view>
		
		</form>
		
	
		
		
	</view>
</template>
<script>
	var GraceRequestConfig = require('@/GraceUI5/js/request/config.js');
	var graceChecker = require("@/GraceUI5/js/checker.js");
	var graceJS = require('@/GraceUI5/js/grace.js');
	
export default {
	name:'activityTab0',
	data() {
		return {
			xieyicontent:"",
            idCard1 : '../../pagesC/static/images/ic_pz.png',
            idCard2 : '../../pagesC/static/images/ic_pz.png',
			formData : {
				address: "",
				mobile : "",
				linkname : '',
				dcpic : '',
				dcpic2:"",
			},
        }
	},
	created() {
	
	},
	methods:{
		
		radioChange : function (e) {
					console.log(e);
				},
		selectImg1 : function() {
			var that=this;
			uni.chooseImage({
				count:1,
				sourceType:["camera","album"],
				success:(res) => {
					that.idCard1 = res.tempFilePaths[0];
					uni.gRequest.upload(
						'common/upload',
						that.idCard1,
						'multipartFile', 
						// 附带表单数据，不需要传 {}
						{
							 header:{"Content-Type": "multipart/form-data"}
						},
						(res) => {
							var result=JSON.parse(res);
							if(result.status=="SUCCESS"){
								that.formData.dcpic=result.result;
							}else{
								uni.showToast({title:result.message, icon:"none"});
								this.idCard1 ="../../pagesC/static/images/ic_pz.png"
							}
							},(error) => {
							console.log('上传失败', error);
						},
						(res) => {
							console.log('上传完成', res);
						}
					);
					
				}
			})
		},
		selectImg2 : function() {
			var that=this;
			uni.chooseImage({
				count:1,
				sourceType:["camera","album"],
				success:(res)=>{
					this.idCard2 = res.tempFilePaths[0];
					uni.gRequest.upload(
						'common/upload',
						that.idCard2,
						'multipartFile', 
						// 附带表单数据，不需要传 {}
						{
							 header:{"Content-Type": "multipart/form-data"}
						},
						(res) => {
							var result=JSON.parse(res);
							if(result.status=="SUCCESS"){
								that.formData.dcpic2=result.result;
							}else{
								uni.showToast({title:result.message, icon:"none"});
								this.idCard2 ="../../pagesC/static/images/ic_pz.png"
							}
							},(error) => {
							console.log('上传失败', error);
						},
						(res) => {
							console.log('上传完成', res);
						}
					);
					
				}
			})
		},
		submit : function(e){
			var that=this;
			var rule = [
				{name:"linkname", checkType : "string", checkRule:"1,20", errorMsg:"描述应为1-20个字符"},
				{name:"mobile", checkType : "string", checkRule:"11", errorMsg:"填写正确手机格式"},
				{name:"address", checkType : "string", checkRule:"1,50", errorMsg:"地址应为1-50个字符"}
			];
			var formData = e.detail.value;
			console.log("上传的表单参数",formData);
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				// 当验证 js 不适用某个检查时，使用自定义函数进行检查
				uni.showToast({ title: graceChecker.error, icon: "none" });
				return false;
			}
			if(this.idCard1 == '../../pagesC/static/images/ic_pz.png' ||
			this.idCard2 == '../../pagesC/static/images/ic_pz.png'){
				uni.showToast({title:"请选择电池照片上传", icon:"none"});
				return;
			}
			
			/* uni.gRequest.post(
				'ucenter/ucompany/saveCompany',
				{
					data:that.formData
				}, 
				(res)=>{
					console.log('post 异步请求成功');
					console.log(res);
					graceJS.showLoading("提交中...");
					if(res.success){
					uni.login({
					  provider: 'weixin',
					  success: function (loginRes) {
					    console.log("usercode="+loginRes.code);
						uni.setStorageSync('usercode', loginRes.code);
						graceJS.post(
								that.apiUrl+"auth/wxLogin",
								{authCode:loginRes.code},
								'json',
								{},
								(res) => {
									uni.hideLoading()
									var data = res.data;
									if(res.success){
										uni.setStorageSync('token', data.token);
										uni.setStorageSync('suids', data.user.id);
										uni.setStorageSync(GraceRequestConfig.localTokenKeyName, res.authorization);
										uni.setStorageSync('mobile', data.user.phone);
										uni.setStorageSync("businessId",data.user.companyId);
										uni.setStorageSync("wxaccount",data.user.name);
										uni.setStorageSync("avatar",data.user.userPic);
										uni.setStorageSync("status",data.user.status);
										graceJS.back();
										
									}else{
										uni.setStorageSync('token', "");
										uni.setStorageSync('suids', "");
										uni.setStorageSync(GraceRequestConfig.localTokenKeyName, "");
										uni.setStorageSync('mobile',"");
										uni.setStorageSync("businessId","");
										uni.setStorageSync("wxaccount","");
										uni.setStorageSync("avatar","");
										uni.setStorageSync("status","0");
										
									}
								},
								(e) => {
										uni.hideLoading()
									console.log(e);
								}
						);
					  }
					});
					}else{
						uni.showToast({title:res.message, icon:"none"});
					}
				},
				(error)=>{
					console.log(error);
				},
				(res) => {
				
				}); */
			
			
			
			// 临时文件地址保存在 this.idCard1 和 this.idCard2 
			// 请调用  uni.uploadFile api 完成上传工作
		}
	}
}
</script>
<style>
.gui-idcard-main{margin:25rpx;}
.gui-idcard-desc{background-color:#FFFFFF; color:#666666; line-height:56rpx; font-size:26rpx; padding:20rpx; border-radius:10rpx;}
.gui-idcard-text{line-height:1.8em; margin-top:30rpx; color:#666666;}
.gui-idcard-items{ padding:50rpx; border-radius:10rpx; margin-top:15rpx;}
.gui-idcard-items-image{width:210rpx;}
</style>