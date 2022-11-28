<template>
	<view class="gui-padding">
		<view class="gui-list gui-margin-top">
			<form @submit="formSubmit" class="gui-form">
				<view class="gui-margin-top">
					<text class="gui-h4">店铺名称</text>
				</view>
				<view class="gui-border-b">
					<input :value="terminalnodePO.terminalnodeName" type="text" class="gui-form-input gui-text gui-color-gray" name="terminalnodeName" placeholder="请填写店铺名称" />
				</view>
				<view class="gui-margin-top">
					<text class="gui-h4">联系人名称</text>
				</view>
				<view class="gui-border-b">
					<input :value="terminalnodePO.contacts" type="text" class="gui-form-input gui-text gui-color-gray" name="name" placeholder="请填写联系人" />
				</view>
				<!-- <view class="gui-margin-top">
					<text class="gui-text-small gui-color-gray">联系电话</text>
				</view>-->
			
				<view v-show="false"  class="gui-border-b" >
					<input type="number" class="gui-form-input" name="phoneno" :value="mobile" placeholder="请填写联系电话">
				</view> 
				
				<view class="gui-margin-top">
					<text class="gui-h4 gui-icons">所在地区 &#xe603;</text>
				</view>
				<view class="gui-border-b gui-flex gui-rows">
					<input type="text" class="gui-form-input gui-text gui-color-gray gui-flex1" name="area" :value="province+city+area" @tap="openPicker()" disabled placeholder="请选择所在地区">
					<text class="gui-icons gui-list-arrow-right " @tap="getLocation">&#xe61c;</text>
				</view>
				<view class="gui-margin-top">
					<text class="gui-h4">详细地址</text>
				</view>
				<view style="padding-top:15rpx; " class="gui-border-b">
					<input  type="text" class="gui-form-input gui-text gui-color-gray" name="address" :value="address" placeholder="请填写详细地址">
				</view>
				<view class="gui-margin-top">
					<button type="default" class="gui-button gui-bg-blue" formType="submit">
						<text class="gui-icons gui-color-white gui-button-text">&#xe642; 提交</text>
					</button>
				</view>
				<gui-area-picker ref="graceAddressPicker" 
				@confirm="areaConfirm"></gui-area-picker>
			</form>
		</view>
	</view>
</template>
<script>
var  graceChecker = require("@/GraceUI5/js/checker.js");
var graceJS = require('@/GraceUI5/js/grace.js');
import { formatDate, reverseGeocoder, getLocation } from '@/utils'
import { mapGetters, mapMutations } from 'vuex'
export default {
	data() {
		return {
			terminalnodePO:uni.getStorageSync("terminalnodePO"),
			mobile:uni.getStorageSync("mobile"),
			area:'',
			longitude:0,
			latitude:0,
			address:"",
			province:"",
			city:"",
			
		}
	},
	onShow() {
		this.province=this.terminalnodePO.province
		this.city=this.terminalnodePO.city
		this.area=this.terminalnodePO.area
		this.address=this.terminalnodePO.address
	},
	
	methods: {
		
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
		computed: {
		  ...mapGetters(['selectedLocation', 'selectedSearch'])
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
		// 表单提交
		formSubmit : function(e){
			var that=this;
			var rule = [
				{ name: "terminalnodeName", checkType: "string", checkRule: "1,20", errorMsg: "联系人应为1-20个字符" },
				{ name: "area", checkType: "string", checkRule: "1,100", errorMsg: "请选择所在地区" },
				{ name: "address", checkType: "string", checkRule: "5,100", errorMsg: "请正确填写详细地址" }
			];
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if(checkRes){
				uni.showToast({title:"验证通过! 请观察控制台", icon:"none"});
				console.log(formData);
				var addressList=uni.getStorageSync("addressList");
				if(addressList==''){
					addressList=[];
				}
				addressList.push(formData);
				uni.setStorage({
					key:'addressList',
					data:addressList
				});
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
									phone:uni.getStorageSync('mobile'),
									area:that.area,
									address:formData.address,
									longitude: that.longitude,
									latitude: that.latitude,
									province:that.province,
									city:that.city
								}
							}, 
							(res)=>{
								console.log('post 异步请求成功');
								console.log(res);
								var data = res.result;
								if(res.status=="SUCCESS"){
									uni.setStorageSync("businessId",data.businessId);
									that.bindSalesperson();
									
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
		},
		openPicker : function () {
			this.$refs.graceAddressPicker.open();
		},
		areaConfirm : function (e) {
			// 返回选中城市的编号及文本信息
			console.log(e);
			this.area = e.names[2];
			this.province=e.names[0];
			this.city=e.names[1];
		},
		
		bindSalesperson(accountId,allWinCode){
			uni.gRequest.post(
						'jf/jfbbc/bindSalesperson',
						{
							data:{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
								salesmanId: accountId,
								suids:that.suids,
								gysCode: allWinCode
							}
						}, 
						(res)=>{
							console.log('post 异步请求成功');
							console.log(res);
							if(res.status=='SUCCESS'){
								if(global.isLogin()){
									graceJS.navigate("../index/index","switchTab");
								}else{
									graceJS.navigate("../login/login");
								}
								graceJS.msg(res.result);
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
			
			
		}
		
	},
	watch: {
	  selectedLocation (newData) {
	    if (newData) {
			console.log("newData",newData)
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
<style scoped>
.gui-border-b{padding-top:15rpx;}
</style>