<template>
	<gui-page :isLoading="pageLoading">
		
		<!-- 页面主体 -->
		<view slot="gBody" class="gui-flex" >
			<!-- 头像背景 -->
		<image  src="../static/images/main_head.jpg" mode="widthFix" style="width:750rpx; z-index:-5"></image>
		<view  @tap="getUserInfo" class="gui-flex gui-rows " style="position: absolute; margin-top: 340rpx;margin-left: 60rpx;z-index: 99;">
		<view v-if="avatarUrl===''" class=" ic_img gui-text-small  gui-bg-red gui-color-white ">头像</view>
		<image v-else-if="avatarUrl!==''" :src="avatarUrl" class=" ic_img gui-text-small  gui-bg-red gui-color-white "></image>
		</view>
		<view @tap="getUserInfo" class="border_head_item2 gui-flex gui-columns" style="position: absolute;margin-top: 370rpx;margin-left: 160rpx;">
			<text  class="gui-margin-small gui-color-white " >{{userNames}}</text>
		</view>
		<!-- 徽章背景 -->
		<image v-if="level==1||level==null" class="gui-margin"  src="../static/images/ic_1_bg.png"  style="position: absolute;width:710rpx;height: 290rpx; z-index:-4;margin-top: 480rpx;"></image>
		<image v-else-if="level==2" class="gui-margin"  src="../static/images/ic_2_bg.png"  style="position: absolute;width:710rpx;height: 290rpx; z-index:-4;margin-top: 480rpx;"></image>
		<image v-else-if="level==3" class="gui-margin"  src="../static/images/ic_3_bg.png"  style="position: absolute;width:710rpx;height: 290rpx; z-index:-4;margin-top: 480rpx;"></image>
		<image v-else-if="level==4" class="gui-margin"  src="../static/images/ic_4_bg.png"  style="position: absolute;width:710rpx;height: 290rpx; z-index:-4;margin-top: 480rpx;"></image>
		<image v-else-if="level==5" class="gui-margin"  src="../static/images/ic_5_bg.png" 	style="position: absolute;width:710rpx;height: 290rpx; z-index:-4;margin-top: 480rpx;"></image>
		<image v-else-if="level==6" class="gui-margin"  src="../static/images/ic_6_bg.png"  style="position: absolute;width:710rpx;height: 290rpx; z-index:-4;margin-top: 480rpx;"></image>
		<image v-else-if="level==7" class="gui-margin"  src="../static/images/ic_7_bg.png"  style="position: absolute;width:710rpx;height: 290rpx; z-index:-4;margin-top: 480rpx;"></image>
		<image v-else-if="level==8" class="gui-margin"  src="../static/images/ic_8_bg.png"  style="position: absolute;width:710rpx;height: 290rpx; z-index:-4;margin-top: 480rpx;"></image>
		
		<text  class="gui-margin-small gui-color-white gui-h2" style="position: absolute;margin-top: 500rpx;margin-left: 60rpx;">{{levelName}}</text>
		<text  v-if="level==1" class="gui-margin-small gui-color-white gui-h6" style="position: absolute;margin-top: 580rpx;margin-left: 60rpx;">财富值1-5</text>
		<text  v-if="level==2" class="gui-margin-small gui-color-white gui-h6" style="position: absolute;margin-top: 580rpx;margin-left: 60rpx;">财富值6-15</text>
		<text  v-if="level==3" class="gui-margin-small gui-color-white gui-h6" style="position: absolute;margin-top: 580rpx;margin-left: 60rpx;">财富值16-25</text>
		<text  v-if="level==4" class="gui-margin-small gui-color-white gui-h6" style="position: absolute;margin-top: 580rpx;margin-left: 60rpx;">财富值26-50</text>
		<text  v-if="level==5" class="gui-margin-small gui-color-white gui-h6" style="position: absolute;margin-top: 580rpx;margin-left: 60rpx;">财富值51-80</text>
		<text  v-if="level==6" class="gui-margin-small gui-color-white gui-h6" style="position: absolute;margin-top: 580rpx;margin-left: 60rpx;">财富值81-110</text>
		<text  v-if="level==7" class="gui-margin-small gui-color-white gui-h6" style="position: absolute;margin-top: 580rpx;margin-left: 60rpx;">财富值111-200</text>
		<text  v-if="level==8" class="gui-margin-small gui-color-white gui-h6" style="position: absolute;margin-top: 580rpx;margin-left: 60rpx;">财富值200以上</text>
		
		<view class="progress-box" style=" position: absolute;margin-top:650rpx;margin-left: 60rpx;">
		<progress class="gui-color-white" :percent="gradeRatio" show-info stroke-width="6" font-size="12" activeColor="#ffffff" backgroundColor="#a7a5a5" style="width:350rpx;" />
		</view>
		<text  class="gui-margin-small gui-color-white gui-h6" style="position: absolute;margin-top: 700rpx;margin-left: 60rpx;">当前财富值:{{currentRichHistory}}</text>
		<text  class="gui-margin-small gui-color-white gui-h6" style="position: absolute;margin-top: 500rpx;margin-left: 652rpx; font-size:15rpx">当前等级:\n&nbsp;&nbsp;&nbsp;&nbsp; lv.{{level}}</text>
		<image v-if="level==1" src="../static/images/ic_1.png" mode="widthFix" style="position: absolute;width:200rpx; z-index:-4;margin-top: 500rpx;margin-left: 450rpx;"></image>
		<image v-else-if="level==2" src="../static/images/ic_2.png" mode="widthFix" style="position: absolute;width:200rpx; z-index:-4;margin-top: 500rpx;margin-left: 450rpx;"></image>
		<image v-else-if="level==3" src="../static/images/ic_3.png" mode="widthFix" style="position: absolute;width:200rpx; z-index:-4;margin-top: 500rpx;margin-left: 450rpx;"></image>
		<image v-else-if="level==4" src="../static/images/ic_4.png" mode="widthFix" style="position: absolute;width:200rpx; z-index:-4;margin-top: 500rpx;margin-left: 450rpx;"></image>
		<image v-else-if="level==5" src="../static/images/ic_5.png" mode="widthFix" style="position: absolute;width:200rpx; z-index:-4;margin-top: 500rpx;margin-left: 450rpx;"></image>
		<image v-else-if="level==6" src="../static/images/ic_6.png" mode="widthFix" style="position: absolute;width:200rpx; z-index:-4;margin-top: 500rpx;margin-left: 450rpx;"></image>
		<image v-else-if="level==7" src="../static/images/ic_7.png" mode="widthFix" style="position: absolute;width:200rpx; z-index:-4;margin-top: 500rpx;margin-left: 450rpx;"></image>
		<image v-else-if="level==8" src="../static/images/ic_8.png" mode="widthFix" style="position: absolute;width:200rpx; z-index:-4;margin-top: 500rpx;margin-left: 450rpx;"></image>
		
		<text  class="gui-margin-small gui-color-gray gui-h6" style="position: absolute;margin-top: 700rpx;margin-left: 470rpx; ">全国排名:{{currentRowNo}}</text>
		<text @tap="shardDialog()" class="gui-icons gui-color-gray" style="position: absolute;margin-top: 700rpx;margin-left: 675rpx; ">&#xe615;</text>
		
		<!-- 点击抽奖 -->
		<image  @tap="tab1" src="../static/images/main_cj_bg.png" mode="widthFix" style="position: absolute;width:760rpx; z-index:0;margin-top: 760rpx;"></image>
		<image  @tap="tab2" src="../static/images/ic_sm.png" mode="widthFix" style="width:350rpx;height: 265rpx; position: absolute;margin-top:990rpx ;margin-left: 30rpx;" ></image>
		<image @tap="tab3"src="../static/images/ic_lm.png" mode="widthFix" style="width:355rpx;height: 265rpx; position: absolute;margin-top:995rpx ;margin-left: 380rpx;" ></image>
		<image class="gui-margin" src="../static/images/ic_sm_foot.png"  style="width:710rpx;height: 290rpx;position: absolute;margin-top:1150rpx ;" ></image>
		
	
	<!-- 例子 1 -->
	<gui-popup ref="guipopup1" :canCloseByShade="false"  >
		<view class="gui-relative gui-box-shadow ">
			<official-account style="width: 600rpx;height: 800rpx;"></official-account>
			<text class="gui-block-text   gui-icons gui-color-black  gui-absolute-rt"
			@tap.stop="closepup1">&#xe78a;</text>
		</view>
	</gui-popup>
	
	<gui-popup ref="guipopup2" >
				<view class="gui-flex gui-box-shadow gui-img-in">
					<image src="../static/images/ic_shard_bg.jpg" show-menu-by-longpress mode="widthFix" style="width:750rpx;"  
					></image>
					<!-- <map id="map"  style="position: absolute; margin-left: 90rpx;margin-top: 270rpx; width:400rpx"
					  :latitude="latitude"
					  :longitude="longitude"
					  >
					  
					  <cover-image class="location-icon" 
					    src="../../static/images/location.png">
					  </cover-image>
					</map> -->
					<!-- <view class="gui-flex gui-rows " style="position: absolute; margin-top: 150rpx;margin-left: 250rpx;">
					<view v-if="avatarUrl===''" class=" ic_img gui-text-small  gui-bg-red gui-color-white ">头像</view>
					<image v-else-if="avatarUrl!==''" :src="avatarUrl" class=" ic_img gui-text-small  gui-bg-red gui-color-white "></image>
					</view> -->
					<text class="gui-block-text demo-close gui-icons gui-color-white gui-absolute-rt"
					@tap.stop="closepup2">&#xe78a;</text>
				</view>
	</gui-popup>
	<gui-modal ref="guimodal4"  :isTitle="false"
			closeBtnStyle="color:#000000; font-size:28rpx;">
				<view slot="content" class="gui-img-in ">
					<form @submit="formSubmit" class="gui-form" >
					<view>
					  <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar" >
					   <!-- <image class="avatar" :src="avatarUrl"></image> -->
						
						<image v-if="avatarUrl!==''" :src="avatarUrl" class=" ic_img gui-text-small  gui-bg-red gui-color-white "></image>
						<image v-else src="../static/images/ic_upload.png" class=" ic_img_f gui-text-small   gui-color-white "></image>
					  					  
					  </button> 
					  <text class="gui-h6 " style="margin-left:200rpx">点击上图上传头像</text>
					  <view class="gui-form-item gui-border-b" >
					  	<image
					  	src="../../static/images/ic_mobile.png" 
					  	mode="widthFix" style="width:80rpx;height: 80rpx;"></image>
					  	<view class="gui-form-body">
					  		<input  class="gui-form-input"  v-model="userNames"
					  		type="nickname"  @blur="userNameInput" name="nickname" placeholder="点击获取微信昵称" />
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
	
	<gui-popup ref="guipopup3" >
				<view class="gui-flex gui-box-shadow gui-img-in">
					<image src="../static/images/ic_sjts_bg.png" mode="widthFix" style="width: 650rpx;"    
					></image>
					<image v-if="level==1" src="../static/images/ic_1.png" mode="widthFix"  style="position: absolute; margin-left: 230rpx;margin-top: 140rpx; width:120rpx"/>
					<image v-if="level==2" src="../static/images/ic_2.png" mode="widthFix"  style="position: absolute; margin-left: 230rpx;margin-top: 140rpx; width:120rpx"/>
					<image v-if="level==3" src="../static/images/ic_3.png" mode="widthFix"  style="position: absolute; margin-left: 230rpx;margin-top: 140rpx; width:120rpx"/>
					<image v-if="level==4" src="../static/images/ic_4.png" mode="widthFix"  style="position: absolute; margin-left: 230rpx;margin-top: 140rpx; width:120rpx"/>
					<image v-if="level==5" src="../static/images/ic_5.png" mode="widthFix"  style="position: absolute; margin-left: 230rpx;margin-top: 140rpx; width:120rpx"/>
					<image v-if="level==6" src="../static/images/ic_6.png" mode="widthFix"  style="position: absolute; margin-left: 230rpx;margin-top: 140rpx; width:120rpx"/>
					<image v-if="level==7" src="../static/images/ic_7.png" mode="widthFix"  style="position: absolute; margin-left: 230rpx;margin-top: 140rpx; width:120rpx"/>
					<image v-if="level==8" src="../static/images/ic_8.png" mode="widthFix"  style="position: absolute; margin-left: 230rpx;margin-top: 140rpx; width:120rpx"/>
					<text class="gui-block-text demo-close gui-icons gui-color-white gui-absolute-rt" 
					@tap.stop="closepup3">&#xe78a;</text>
					<gui-tags  @tapme="shardDialog()" text="告诉大家" bgClass="gui-bg-tranform" color="#ffffff" style="position: absolute; margin-left: 50rpx;margin-top: 320rpx;"
								:width="200" :lineHeight="2.2" :size="28" borderColor="#FF0035"></gui-tags>
					<gui-tags  @tapme="closepup3()" text="继续赢财富值" bgClass="gui-bg-red" :width="200" style="position: absolute; margin-left: 320rpx;margin-top: 320rpx;" :lineHeight="2.2" :size="28" borderColor="#FF0035"></gui-tags>
					
				</view>
	</gui-popup>
	
	
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
					<button v-if="!getphoneNUM"  style="background:none;margin-top: 170rpx;margin-left: 150rpx;" class="modal-btns gui-lucky-turntable-btn "   open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"  >
						<text class="gui-color-black  gui-bold gui-h6 "  > </text>
					</button>
					<text  @tap="confirm1" class="modal-btns gui-color-blue" >{{confirmTxt}}</text>
				</view>
			</view>
		</gui-modal>
		
		<gui-modal ref="guimodal2" 
			title="录入抽奖码">
				<view slot="content" class="gui-padding gui-bg-gray">
					<image src="../static/images/ic_zy.png"   style="width: 500rpx;height: 150rpx;"
					></image>
					<input type="text" maxlength="27" style="font-size:30rpx;line-height:100rpx; padding:10rpx;height: 200rpx;"
					v-model="codeContent" @input="uppercase" placeholder="请输入兑换码内容" />
				</view>
				
				<!-- 利用 flex 布局 可以放置多个自定义按钮哦  -->
				<view slot="btns" class="gui-flex gui-rows gui-space-between">
					<view class="modal-btns gui-flex1" style="margin-right:80rpx;">
						<text class="modal-btns gui-color-gray" @tap="close2">取消</text>
					</view>
					<view class="modal-btns gui-flex1" style="margin-left:80rpx;">
						<text class="modal-btns gui-color-blue" @tap="inputBtn()">提交</text>
					</view>
				</view>
			</gui-modal>
		
		</view>
		
	</gui-page>
</template>
<script>
	var face = "https://images.unsplash.com/photo-1663524789625-b8d2ed6cac2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4NHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=60"
	import { formatDate, reverseGeocoder, getLocation } from '@/utils'
	import { mapGetters, mapMutations } from 'vuex'
	var graceJS = require('@/GraceUI5/js/grace.js');
	var graceString = require('@/GraceUI5/js/string.js');
	var GraceRequestConfig = require('@/GraceUI5/js/request/config.js');
export default {
	data() {
		return {
			terminalnodePO:"",
			currentRichHistory:0,
			scenArry:[1011,1017,1025,1047,1124],
			richArry:[0,5,15,25,50,80,110,200],
			codeContent:"",
			QRcode:"",
			getphoneNUM:false,	
			dialogTitle:"完善信息",
			confirmTxt:"确定",
			dialogContent:"完善门店信息？",
			pageLoading:true,
			currentTab:0,
			userNames:"",
			avatarUrl:"",
			longitude: '',
			latitude: '',
			mapContext:null,
			currentRich:0,
			currentRowNo:0,
			level:1,
			levelName:"",
			gradeRatio:0
			}
	},
	onLoad:function(){
		 this.mapContext = uni.createMapContext('map')
		let option =uni.getEnterOptionsSync();
		  console.log('小程序进入场景--------------------' + option.scene);
		  console.log('是否包含--------------------' + this.scenArry.includes(option.scene));
		  /* if(this.scenArry.includes(option.scene)){
			  this.openpup1()
		  } */
		setTimeout(() => {this.pageLoading = false;},1500);
		if(global.isLogin()){
			console.log("getphoneNUM=true")
			this.getphoneNUM=true;
		}else{
			console.log("this.getphoneNUM=false;")
			this.getphoneNUM=false;
		}
		
	},
	methods: {
		openmodel2 : function () {
			 	this.$refs.guimodal4.open();
			 },
			 
		closemodel2 : function () {
			this.$refs.guimodal4.close();
		},	 
		openpup1 : function () {this.$refs.guipopup1.open();},
		closepup1 : function () {this.$refs.guipopup1.close();},
		openpup2 : function () {/* this.getLocation(); */
								this.$refs.guipopup2.open();},
		closepup2 : function () {this.$refs.guipopup2.close();},
		openpup3 : function () {this.$refs.guipopup3.open();},
		closepup3 : function () {this.$refs.guipopup3.close();},
		open1:function(){this.$refs.guimodal1.open()},
		close1 : function () {this.$refs.guimodal1.close();},
		confirm1:function(){
			this.$refs.guimodal1.close();	
			graceJS.navigate("../../pages/regist/newRegist")
		},
				
		open2  : function () {this.$refs.guimodal2.open();},
		close2 : function () {this.$refs.guimodal2.close();},
		getpm(){
			graceJS.navigate("../pages/activity819_bd")
		},
		shardDialog(){
			if(!this.checkLogin()){
				return
			}
			this.closepup3();
			this.openpup2();
			//this.getRichExchange(1,"");
			
		},
		getLocation () {
		var that=this;
		  getLocation()
		    .then(res => {
				console.log('当前位置信息getLocation：', res)
				const { longitude, latitude } = res
				that.mapContext.moveToLocation({
						  longitude: longitude,
						  latitude: latitude
				})
		    })
		    .catch(() => {
		    })
		},
		
		showToast(content){
			graceJS.msg(content);
		},
		tab1:function () {
			
			if(!this.getphoneNUM){
				this.currentTab=1;
			}
			if(!this.checkLogin()){
				return
			}
			graceJS.navigate("../../pagesE/pages/activity")
			
		},
		tab2:function(){
			if(!this.getphoneNUM){
				this.currentTab=2;
				
			}
			if(!this.checkLogin()){
				return
			}
			var  that=this;
			 //扫码兑换
			 uni.scanCode({
			     onlyFromCamera: true,
			     success: function (res) {
			         console.log('条码类型：' + res.scanType);
			         console.log('条码内容：' + res.result);
					 if(res.result!=null&&res.result!=undefined&&res.result!=''){
						that.getRichExchange(0,res.result);
					 }else{
					 	graceJS.msg("兑换码无法识别！");
					 }
			 }
			 });
			
		},
		tab3:function(){
			if(!this.getphoneNUM){
				this.currentTab=3;
			}
			if(!this.checkLogin()){
				return
			}
			this.open2();
		},
		formSubmit : function(e){
			
			console.log("进入提交表单",e)
			var that=this;
			var formData = e.detail.value;
			if(that.avatarUrl==null||that.avatarUrl==""||that.avatarUrl==undefined){
				 that.showToast("请点击选择头像！")
				  return;
			}
			if(that.userNames==null||that.userNames==""||that.userNames==undefined){
				 that.showToast("请输入名称！")
				 return;
			}
			this.closemodel2()
			uni.showLoading({
				title:"请求中...",
				mask:true
			});
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
							uni.hideLoading();
						},
						(error)=>{
							uni.hideLoading();
							console.log(error);
						}
					);
			
			
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
									}
								);
		            },
		            fail:err=>{
		                console.log(err)
						that.userNames="";
						that.avatarUrl="";
		            }
		        }) */
		    },
		
		
		checkLogin(){
			if(!global.business()&&(this.terminalnodePO==null||this.terminalnodePO==""||this.terminalnodePO==undefined)&&this.terminalnodePO.address==null){
				console.log("checkLogin")
				this.open1();
				return  false
			}
			return true;
		},
		getPhoneNumber (e) {
			var that=this;
			console.log(e)
				uni.showLoading({
					title:"请求中...",
					mask:true
				});
				wx.checkSession({
						  success () {
						   console.log("checkSession success")
						  },
						  fail () {
							  console.log("checkSession fail 重新登录")
							   that.getWxCode() 
								return//重新登录
						  }
						})
				//-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击拒绝
					 uni.showToast({
						 title:"你点击了拒绝,请重新授权",
						 icon:"none"
					 })
					 return
				} else { //允许授权执行跳转 
					   console.log("执行获取 手机号解密")
					   setTimeout(()=>{
					   uni.gRequest.get(
					   		'jfLogin/wxUpdatePhoneNumber',
					   		{
					   			data: {encryptedData : e.detail.encryptedData,iv : e.detail.iv}
					   		}, 
					   		(res)=>{
					   			console.log('get 异步请求成功');
					   			console.log(res);
					   			if(res.status=='SUCCESS'){
									uni.hideLoading();
					   				var mobile=res.result.mobile;
					   				console.log("手机号："+mobile)
					   				uni.setStorageSync('mobile', mobile);
					   				that.getphoneNUM=true;
					   				that.confirm1()
					   			
					   			}
					   		},
					   		(error)=>{
								uni.hideLoading();
					   			console.log(error);
					   		}
					   	); 
					},500)
					   
					
				}
						
			
			
		 },
		 // 获取微信授权
		 	getWxCode() { 
		 		let that = this;
		 		uni.showLoading({
		 			title:"请求中...",
		 			mask:true
		 		});
		 		uni.login({
		 			provider: 'weixin',
		 			timeout: 3000,
		 			success: res => {
		 				if (res.code) {
		 					 that.code=res.code;
		 					 console.log("微信获取openid的usercode="+res.code);
		 					 graceJS.post(
		 					 			that.apiUrl+'jf/redpacket/getWxOpenidNologin',
		 					 			{authcode:res.code},
		 					 			'json',
		 					 			{},
		 					 			(res) => {
		 					 				console.log('获取openid结果=',res);
		 					 				if(res.status=="SUCCESS"){
		 					 					 that.openid=res.result;
		 					 				}
		 									uni.hideLoading();
		 					 			},
		 					 			(error) => {
		 					 					console.log(error);
												 uni.hideLoading();
		 					 					 that.showToast("获取openid接口报错")
		 										
		 					 			}
		 					 		);
		 				}
		 			},
		 			fail(err) {
		 				console.log(err)
		 			}
		 		})
		 	},
		 /* 录入兑换 */
		 inputBtn(){
		 	let  that=this;
		 	var result=this.codeContent.toUpperCase();
		 	if(graceString.count(result)!=27){
		 		that.showToast("无效码，编码长度不足27位")
		 		return 
		 	}else if(graceString.search(result,'weixin', false)>-1){
		 		that.showToast("无效码，请输入池盖片上的二维码")
		 		return
		 	}
		 	this.close2();
		 	that.QRcode=result;
		 	  if(that.QRcode!=null&& that.QRcode!=undefined&&that.QRcode!=''){
				  that.getRichExchange(0,that.QRcode);
		 	  }else{
		 		  that.showToast("兑换码无法识别！")
		 	  }
		 	
		 	
		 },
		 /* 获取财富值兑换*/
		 getRichExchange(type,batteryCode){
			 var that=this;
			 uni.showLoading({
			 	title:"请求中...",
				mask:true
			 });
			uni.gRequest.post(
						'jfPoints/saveBatteryCode121',
						{
							data:{
								type:type,
								batteryCode:batteryCode
							}
						}, 
						(res)=>{
							console.log('post 异步请求成功');
							console.log(res);
							uni.hideLoading();
							that.showToast(res.result)
							//that.getRichPointInfo();
						},
						(error)=>{
							uni.hideLoading();
							console.log(error);
						}
					); 
		 },
		 
		 /* 获取当前用户的财富排名和财富值*/
		 getRichPointInfo(){
			 var now=this;
			 uni.gRequest.get(
			 		'jfPoints/getTerminalnodeRichs',
			 		{}, 
			 		(res)=>{
			 			console.log('get 异步请求成功');
			 			console.log(res);
			 			if(res.status=='SUCCESS'){
			 				console.log("getRichPointInfo",res);
			 				if(res.status=="SUCCESS"){
								if(res.result.riches>now.currentRichHistory&&now.richArry.includes(now.currentRichHistory)){
									now.openpup3();
								}
								now.currentRichHistory=res.result.riches;
								uni.setStorageSync("currentRichHistory",now.currentRichHistory);
			 					now.currentRich=res.result.usableRiches;
			 					now.currentRowNo=res.result.rowno;
			 					now.level=res.result.level;
			 					now.levelName=res.result.levelName;
								now.gradeRatio=res.result.gradeRatio;
			 				}
							
			 				
			 			}
			 		},
			 		(error)=>{
			 			console.log(error);
			 		}
			 	);
			 
			 
			 
		 }
	
		 
		 
		 
		 
		
	},
	onShow() {
		console.log("onshow  bgind----------------")
		this.avatarUrl=uni.getStorageSync("avatar");
		this.userNames=uni.getStorageSync('wxaccount')
		this.terminalnodePO=uni.getStorageSync('terminalnodePO')
		
		this.getRichPointInfo();
		this.currentRichHistory=uni.getStorageSync("currentRichHistory");
		console.log("onshow  end----------------",this.avatarUrl)
		if(this.userNames==""||this.avatarUrl==""||this.userNames==null||this.avatarUrl==null||this.userNames==undefined||this.avatarUrl==undefined){
			this.getUserInfo();
		}
		
	},
	
	created() {
		var now=this;
		//默认登录
		uni.login({
		  provider: 'weixin',
		  success: function (loginRes) {
		    console.log("usercode="+loginRes.code);
			
			graceJS.post(
					now.apiUrl+"jfLogin/loginApplets",
					{authcode:loginRes.code},
					'json',
					{},
					(res) => {
						uni.hideLoading();
						var data = res.result;
						console.log(res);
						if(res.status == 'SUCCESS'){
							console.log(data.userToken);
							uni.setStorageSync("points",data.user.points);
							uni.setStorageSync('suids', data.user.id);
							uni.setStorageSync(GraceRequestConfig.localTokenKeyName, data.userToken);
							uni.setStorageSync('mobile', data.user.mobile);
							uni.setStorageSync("businessId",data.user.businessId);
							uni.setStorageSync("isVip",data.user.isVip=="1");
							uni.setStorageSync("wxaccount",data.user.wxaccount);
							uni.setStorageSync("terminalnodePO",data.terminalnodePO);
							//uni.setStorageSync("avatar",data.user.avatar);
						}else{
							uni.setStorageSync("points","");
							uni.setStorageSync('suids', "");
							uni.setStorageSync('mobile', "");
							uni.setStorageSync(GraceRequestConfig.localTokenKeyName, "");
							uni.setStorageSync("businessId",data.user.businessId);
							uni.setStorageSync("isVip",false);
							uni.setStorageSync("wxaccount","");
							uni.setStorageSync("terminalnodePO","");
							//uni.setStorageSync("avatar","");
						}
					},
					(e) => {
						console.log(e);
					}
			);
		  }
		});
	}
}
</script>
<style>
	.demo-close{width:100rpx; height:100rpx; line-height:100rpx; opacity:0.88; text-align:center; font-size:58rpx;}
	
	.progress-box {
		display: flex;
		height: 50rpx;
		margin-bottom: 60rpx;
	}
.modal-btns{line-height:88rpx; font-size:26rpx; text-align:center; width:200rpx;}
.gui-lucky-turntable-btn{width:110rpx; height:110rpx; position:absolute; left: 70rpx;top: 20rpx; z-index:9;}
.pendant{width:88rpx; height:88rpx; border-radius:88rpx; text-align:center; line-height:88rpx; font-size:55rpx;}
 .location-icon {
    width: 64rpx;
    height: 64rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .ic_img{line-height:100rpx;text-align:center; height: 100rpx;border-radius: 60rpx;width: 100rpx;}
  .ic_img_f{line-height:100rpx;text-align:center; height: 100rpx;border-radius: 0rpx;width: 100rpx;}
</style>