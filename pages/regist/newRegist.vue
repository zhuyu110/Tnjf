<template>
	<gui-page :customHeader="true" :headerStyle="headerStyle" :statusBarStyle="statusBarStyle" :isHeaderSized="false">
		<!-- 自定义头部导航 -->
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center gui-padding">
				<!-- 返回按钮 -->
				<gui-header-leading :onlyBack="true" :buttonStyle="backButtonStyle"></gui-header-leading>
				<!-- 导航文本此处也可以是其他自定义内容 -->
				<text class="gui-h4 gui-ellipsis gui-text-center gui-header-content gui-primary-color" 
				:style="titleStyle">完善信息</text>
			</view>
			<text class=" gui-color-white gui-flex gui-h4 gui-ellipsis gui-text-center  "
			style="margin-top: -50rpx;margin-left: 300rpx;">完善信息</text>
		</view>
		<!-- 页面主体 -->
		<view slot="gBody">
			<image 
			src="../../static/images/ic_regist_head.png" 
			 style="width:750rpx;z-index:-5;height:400rpx ;">
			</image>
				<view class="gui-flex gui-rows " style="margin-top: -200rpx;margin-left: 300rpx;">
				<view v-if="avatarUrl===''" class=" ic_img gui-text-small  gui-bg-red gui-color-white ">头像</view>
				<image v-else-if="avatarUrl!==''" :src="avatarUrl" class=" ic_img gui-text-small  gui-bg-red gui-color-white "></image>
				<image v-if="isVip" src="../../static/ic_vip.png"class="ic_vip_img gui-margin-small" ></image>
				</view>
				
			<view class="demo gui-bg-white " style="margin-left: 120rpx;margin-right: 120rpx;margin-top: 80rpx;">
					<form @submit="formSubmit" class="gui-form" >
						<view class="gui-form-item gui-border-b" >
							<image
							src="../../static/images/ic_username.png" 
							mode="widthFix" style="width:80rpx;height: 80rpx;"></image>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input"  style="float: left;"
								:value="terminalnodePO.contacts" name="name" placeholder="店铺联系人" />
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
								:value="terminalnodePO.terminalnodeName" name="terminalnodeName" placeholder="店铺名称" />
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
								:value="mobile" name="mobile" placeholder="联系电话" />
							</view>
							<text class="gui-form-icon gui-icons gui-text-center" 
							 style="color:'#999999' ">&#xe601;</text>
						</view>
						<view class="gui-form-item gui-border-b" >
							<image
							src="../../static/images/ic_area.png" 
							mode="widthFix" style="width:80rpx;height: 80rpx;"></image>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input" 
								:value="province+city+area" name="area" placeholder="点击右侧定位按钮" disabled @tap="openPicker()" />
							</view>
							<text class="gui-form-icon gui-icons gui-text-center gui-color-red" @tap="getLocation" 
							 >&#xe61c;</text>
						</view>
						<view class="gui-form-item gui-border-b" >
							<image
							src="../../static/images/ic_address.png" 
							mode="widthFix" style="width:80rpx;height: 80rpx;"></image>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input" 
								 name="address" :value="address" placeholder="详细地址"  />
							</view>
							<text class="gui-form-icon gui-icons gui-text-center"
							 style="color:'#999999' ">&#xe601;</text>
						</view>
						
						<view class="gui-margin-top" style="margin-top: 50rpx;">
							<button type="default" class="gui-button gui-bg-blue" formType="submit">
								<text class="gui-icons gui-color-white gui-button-text">&#xe642; 提交</text>
							</button>
						</view>
						<gui-area-picker ref="graceAddressPicker"
						@confirm="areaConfirm"></gui-area-picker>
					</form>
				
			</view>
		</view>
	</gui-page>
</template>
<script>
var  graceChecker = require("@/GraceUI5/js/checker.js");
var graceJS = require('@/GraceUI5/js/grace.js');
import { formatDate, reverseGeocoder, getLocation } from '@/utils'
import { mapGetters, mapMutations } from 'vuex'
export default {
	data() {
		return {
			terminalnodePO:"",
			avatarUrl:"",
			mobile:"",
			backButtonStyle : 'color:#FFFFFF;', // 返回按钮样式
			headerStyle     : 'background-color:rgba(255,255,255,0)', // 头部导航样式
			statusBarStyle  : 'background-color:rgba(255,255,255,0)', // 状态栏样式
			titleStyle      : 'opacity:0', // 导航标题样式
			area:'',
			longitude:0,
			latitude:0,
			address:"",
			province:"",
			city:"",
		}
	},
	onShow() {
		this.avatarUrl=uni.getStorageSync("avatar");
		this.mobile=uni.getStorageSync("mobile");
		this.terminalnodePO=uni.getStorageSync("terminalnodePO");
		this.province=this.terminalnodePO.province
		this.city=this.terminalnodePO.city
		this.area=this.terminalnodePO.area
		this.address=this.terminalnodePO.address
	},
	computed: {
	  ...mapGetters(['selectedLocation', 'selectedSearch'])
	},
	methods:{
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
			  const { lng, lat } = res.result.location;
			  if (this.selectedSearch && (this.selectedSearch.location.lng !== lng || this.selectedSearch.location.lat !== lat)) {
			    this.SET_SELECTED_SEARCH(null)
			  }
			  uni.navigateTo({
			  			url: `/pages/location/select?longitude=${lng}&latitude=${lat}`
			  		})
		     
		    })
		    .catch(err => {
		     console.log('授权失败：', err)
		    })
		},
		
		areaConfirm : function (e) {
			// 返回选中城市的编号及文本信息
			console.log(e);
			this.area = e.names[2];
			this.province=e.names[0];
			this.city=e.names[1];
		},
		openPicker : function () {
			this.$refs.graceAddressPicker.open();
		},
		
		// 表单提交
		formSubmit : function(e){
			console.log("进入提交表单",e)
			var that=this;
			var rule = [
				{ name: "name", checkType: "string", checkRule: "1,20", errorMsg: "店铺联系人必填" },
				{ name: "terminalnodeName", checkType: "string", checkRule: "1,20", errorMsg: "店铺名称应为1-20个字符" },
				{ name: "mobile", checkType: "number", checkRule: "11", errorMsg: "请正确填写联系电话" },
				{ name: "area", checkType: "string", checkRule: "1,20", errorMsg: "地址信息必填" },
				{ name: "address", checkType: "string", checkRule: "1,100", errorMsg: "详细地址必填" }
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
							'jfLogin/register',
							{
								data:{
									terminalnodeName:formData.terminalnodeName,
									contacts:formData.name,
									phone:formData.mobile,
									area:that.area,
									address:formData.address,
									longitude: that.longitude,
									latitude: that.latitude,
									province:that.province,
									city:that.city
								}
							}, 
							(res)=>{
								uni.hideLoading();
								console.log('post 异步请求成功');
								console.log(res);
								var data = res.result;
								if(res.status=="SUCCESS"){
									uni.setStorageSync("businessId",data.businessId);
									uni.setStorageSync("terminalnodePO",formData);
									graceJS.back()
								}else{
									graceJS.msg(res.errorMsg);
								}
							},
							(error)=>{
								uni.hideLoading();
								console.log(error);
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
	},
	watch: {
	  selectedLocation (newData) {
	    if (newData) {
			console.log(newData)
			const { title, location ,ad_info} = newData
			this.longitude = location.lng
			this.latitude = location.lat
			this.address=title;
			this.province=ad_info.province;
			this.city=ad_info.city;
			this.area=ad_info.district;
			
	    }
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