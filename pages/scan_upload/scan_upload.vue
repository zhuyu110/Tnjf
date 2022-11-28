<template>
	<gui-page  :customHeader="true"  >
		<view slot="gHeader">
			<!-- 正确提示 -->
			
					<gui-top-message ref="guitopmsg1">
						<view class="gui-bg-green">
							<text class="message-text gui-block-text gui-color-white gui-icons">&#xe7f8; 操作成功</text>
						</view>
					</gui-top-message>
					<!-- 错误提示 -->
					<gui-top-message ref="guitopmsg2">
						<view class="gui-bg-red">
							<text class="message-text gui-block-text gui-color-white gui-icons">&#xe646; 兑换失败</text>
						</view>
					</gui-top-message>
					<view class="gui-flex gui-nowrap gui-rows gui-align-items-center gui-padding">
						<!-- 使用组件实现返回按钮及返回首页按钮 -->
						 <gui-header-leading :onlyBack="true"></gui-header-leading> 
						<!-- 导航文本此处也可以是其他自定义内容 -->
						<text class="gui-h4 gui-ellipsis gui-text-center gui-header-content gui-primary-color">积分兑换</text>
						<!-- 如果右侧有其他内容可以利用条件编译和定位来实现-->
					</view>
		</view>
		<view slot="gBody" class="gui-margin">
		<view class="gui-margin-top-large gui-flex gui-rows gui-space-between">
			<text class="gui-h6 gui-color-gray gui-bold">兑换二维码</text>
			
		</view>
		<view class="gui-flex gui-rows gui-align-items-center gui-margin-top">
			<view class="gui-border1" style="width: 500rpx;">
			<input disabled="true" type="text" class="gui-form-input gui-border1 gui-padding" 
					v-model="QRcode" name="code" placeholder="兑换码...."  />
			 </view>
			 <view class="gui-margin gui-flex1" @tap="scanbtn">
			 	<text class="gui-grids-icon gui-icons gui-color-red gui-h2">&#xe631;</text>
			 </view>
			
		</view>
		
		<!-- <view class="gui-margin-top-large gui-flex gui-rows gui-space-between">
			<text class="gui-h6 gui-color-gray gui-bold">电池防伪码图</text>
		</view>
		<view class="gui-margin-top">
			<gui-upload-images @change="change" ref="uploadimgcom" @uploaded="uploaded" 
			uploadServerUrl="https://您的域名/地址"></gui-upload-images>
		</view> -->
		<view class="gui-margin-top">
		<text class="gui-bg-blue gui-text-center gui-color-white demo-sub-btn gui-block-text" @tap="submit">{{subtxt}}</text>
		</view>
		
	</view>
	</gui-page>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
var graceString = require('@/GraceUI5/js/string.js');
export default {
	
	data() {
		return {
			QRcode:"",
			// 记录需要上传的图片数据
			needPploadedImgs : [],
			// 文本框输入内容记录
			textareaVal      : ' ',
			// 上传按钮名称
			subtxt           : "+ 兑换"
		}
	},
	onLoad:function(){
		// 模拟 api 加载默认图片
		// 不需要默认值删除此函数即可
		/* setTimeout(()=>{
			this.$refs.uploadimgcom.setItems(
			[
				'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/29.png',
				'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/30.png',
				'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/31.png'
			]);
		}, 1000); */
		
		
		
	},
	methods: {
		openmsg1 : function () {
					this.$refs.guitopmsg1.open();
				},
				openmsg2 : function () {
					this.$refs.guitopmsg2.open();
				},
		scanbtn:function(){
			console.log('进入扫码 ');
			var that=this;
			uni.scanCode({
			    onlyFromCamera: true,
			    success: function (res) {
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
					 console.log('条码内容：' + graceString.search(res.result,'tn/',false));
				if(graceString.search(res.result,'tn/',false)>-1){
					var index=res.result.lastIndexOf("tn/");
					 that.QRcode=res.result.substring(index+3,res.result.length);
					  console.log("QRcode="+that.QRcode) ;
				}else{
					graceJS.msg("未识别到兑换码！");
				}		
			}
			});
		},
		
		// 记录选择图片时的待提交数据
		change : function (e) {
			this.needPploadedImgs = e;
		},
		// 提交动态
		// 过程说明 : 
		// 点击提交按钮 > 首先执行组件的上传函数 > 上传成功后获得已经上传的图片数据 > 提交给后端 api 记录整个内容 
		submit : function () {
			// 阻止重复提交
			var that=this;
			if(this.subtxt != '+ 兑换'){
				that.apiLoading=false;
				return ;}
			if(this.QRcode!=null&& this.QRcode!=undefined&&this.QRcode!=''){
				this.subtxt = '提交中，请稍候 ...';
				uni.gRequest.post(
							'jfPoints/saveBatteryCode',
							{
								data:{
									batteryCode:that.QRcode,
								}
							}, 
							(res)=>{
								console.log('post 异步请求成功');
								console.log(res);
								if(res.result){
									that.openmsg1();
								}else{
									that.openmsg2();
								} ;
							},
							(error)=>{
								console.log(error);
							},
							(res) => {
								this.subtxt = '+ 兑换';
							}
						);
				
			}else{
				graceJS.msg("未识别到兑换码！");
			}
			// 判断图片选择数量
			/* if(this.needPploadedImgs.length < 1){
				uni.showToast({title:"请选择图片", icon:"none"}); 
				return ;
			} */
			
			
			
			//this.$refs.uploadimgcom.upload();
			// 代码执行到这里，组件开始执行上传工作
			// uni-app 上传api 一次上传一个图片
			// 组件会一个一个循环上传
			// 上传完毕后会触发组件的 uploaded 事件
			// uploaded 事件意味着上传工作完毕
			// 事件会携带上传完成的图片数据 [数组格式] 
		},
		// 图片上传完毕执行 uploaded 函数
		uploaded : function (uploadedImgs) {
			console.log('图片上传完毕，开始提交数据');
			console.log(uploadedImgs);
			// 组合数据给后端 api 提交
			var sendData = {
				imgs    : uploadedImgs,
				// 其他表单数据
				content : this.textareaVal
			};
			console.log('全部数据 :');
			console.log(sendData);
			// 至此数据以及收集完毕
			// 请自己完成数据提交工作
		}
	}
}
</script>
<style>
.gui-text-area{font-size:26rpx; color:#2B2E3D; height:150rpx; padding:20rpx;}
.demo-sub-btn{padding:10rpx 25rpx; line-height:60rpx; font-size:24rpx; border-radius:6rpx;}
.message-text{line-height:88rpx; font-size:26rpx; text-align:center;}
</style>