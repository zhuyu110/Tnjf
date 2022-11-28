<template>
	<view class="gui-padding">
		<view class="gui-margin-top gui-flex gui-rows gui-space-between gui-align-items-center">
			<text class="gui-h5 gui-color-gray">添加地址</text>
			<view @tap="goback" hover-class="gui-tap">
				<text class="gui-block-text gui-color-blue gui-text gui-icons">&#xe616; 返回列表</text>
			</view>
		</view>
		<view class="gui-list gui-margin-top">
		<!-- 	<form @submit="formSubmit" class="gui-form">
				<view class="gui-margin-top">
					<text class="gui-h4">您的姓名</text>
				</view>
				<view class="gui-border-b">
					<input type="text" class="gui-form-input gui-text gui-color-gray" name="name" placeholder="请填写联系姓名" />
				</view>
				<view class="gui-margin-top">
					<text class="gui-h4">联系电话</text>
				</view>
				<view class="gui-border-b">
					<input type="number" :value="mobile" class="gui-form-input gui-text gui-color-gray" name="phoneno" placeholder="请填写联系电话">
				</view>
				<view class="gui-margin-top">
					<text class="gui-h4 gui-icons">所在地区 &#xe603;</text>
				</view>
				<view class="gui-border-b gui-flex gui-rows" >
					<input type="text" class="gui-form-input gui-text gui-color-gray gui-flex1" name="area" :value="area" @tap="openPicker" disabled placeholder="请选择所在地区">
				</view>
				
				<view class="gui-margin-top">
					<text class="gui-h4">详细地址</text>
				</view>
				<view style="padding-top:15rpx;">
					<input type="text" class="gui-form-input gui-text gui-color-gray":value="address" name="address" placeholder="请填写详细地址">
				</view>
				<view class="gui-margin-top">
					<button type="default" class="gui-button gui-bg-blue" formType="submit">
						<text class="gui-icons gui-color-white gui-button-text">&#xe642; 提交</text>
					</button>
				</view>
				<gui-area-picker ref="graceAddressPicker" 
				@confirm="areaConfirm"></gui-area-picker>
			</form> -->
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
			area:'',
			longitude:0,
			latitude:0,
			mobile:uni.getStorageSync("mobile"),
			address:''
			
		}
	},
	computed: {
	  ...mapGetters(['selectedLocation', 'selectedSearch'])
	},
	methods: {
		getLocation () {
		  getLocation()
		    .then(res => {
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
		      console.log('当前位置信息：', res)
			  const { lng, lat } = res.result.location;
			  if (this.selectedSearch && (this.selectedSearch.location.lng !== lng || this.selectedSearch.location.lat !== lat)) {
			    this.SET_SELECTED_SEARCH(null)
			  }
			  uni.navigateTo({
			  			url: `/pages/location/select?longitude=${lng}&latitude=${lat}`
			  		})
		     
		    })
		    .catch(err => {
		    
		    })
		},
		// 表单提交
		formSubmit : function(e){
			var rule = [
				{ name: "name", checkType: "string", checkRule: "1,10", errorMsg: "联系人应为1-20个字符" },
				{ name: "phoneno", checkType: "phoneno", checkRule: "", errorMsg: "请正确填写手机号" },
				{ name: "area", checkType: "string", checkRule: "1,100", errorMsg: "请选择所在地区" },
				{ name: "address", checkType: "string", checkRule: "0,100", errorMsg: "请正确填写详细地址" }
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
				this.goback();
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
			this.area = e.names[0]+' '+e.names[1]+' '+e.names[2];
			
		},
		goback : function () {
			// 返回跳转
			graceJS.back();
		}
	},
	watch: {
	  selectedLocation (newData) {
	    if (newData) {
			console.log(newData)
			this.area=newData.address;
			const { title, location } = newData
			this.longitude = location.lng
			this.latitude = location.lat
			this.address=title
	  
	    }
	  }
	}
}
</script>
<style scoped>
.gui-border-b{padding-top:15rpx;}
</style>