<template>
	<gui-page :isLoading="pageLoading">
		<!-- 页面主体 -->
		<view slot="gBody" class="gui-flex">
			<image  src="../static/images/ic_bd_bg.png" mode="widthFix" style="width:750rpx; z-index:-5"></image>
		
			<scroll-view class="gui-scroll-y  gui-flex gui-columns"  style="position: absolute;margin-top: 700rpx;margin-left: 60rpx;height: 720rpx;" :show-scrollbar="false" :scroll-y="true" 
			>
			<view v-for="(item,index) in dataList" :key="index" class="gui-flex gui-rows gui-nowrap  gui-align-items-center " style="margin-top: 10rpx;" >
				<text style="margin-left: 35rpx; width: 90rpx;" class="gui-color-black  gui-h6"  >{{item.rowNo}}</text>
				<image style="margin-left: 15rpx;" :src="item.pic" class=" ic_img gui-text-small  gui-bg-gray gui-color-black " ></image>
				<text  style="width: 150rpx;margin-left: 40rpx; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" class="gui-h6 gui-color-black gui-color-black">{{item.wxaccount}}</text>
				<text style=" width: 120rpx;margin-left: 40rpx; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size:25rpx" class="gui-color-black gui-color-black ">{{item.riches}}</text>
				<image v-if="item.level==1" src="../static/images/ic_1.png" mode="widthFix" style="margin-left: 5rpx;width: 50rpx"></image>
				<image v-if="item.level==2" src="../static/images/ic_2.png" mode="widthFix" style="margin-left: 5rpx;width: 50rpx"></image>
				<image v-if="item.level==3" src="../static/images/ic_3.png" mode="widthFix" style="margin-left: 5rpx;width: 50rpx"></image>
				<image v-if="item.level==4" src="../static/images/ic_4.png" mode="widthFix" style="margin-left: 5rpx;width: 50rpx"></image>
				<image v-if="item.level==5" src="../static/images/ic_5.png" mode="widthFix" style="margin-left: 5rpx;width: 50rpx"></image>
				<image v-if="item.level==6" src="../static/images/ic_6.png" mode="widthFix" style="width: 50rpx;margin-left: 5rpx;"></image>
				<image v-if="item.level==7" src="../static/images/ic_7.png" mode="widthFix" style="width: 50rpx;margin-left: 5rpx;"></image>
				<image v-if="item.level==8" src="../static/images/ic_8.png" mode="widthFix" style="width: 50rpx;margin-left: 5rpx;"></image>
										
			</view>
			</scroll-view>
		</view>
	</gui-page>
</template>
<script>
export default {
	data() {
		return {
			avatarUrl:"",
			userNames:"点击获取",
			pageLoading:true,
			points:"",
			order:"1",
			mobile:"",
			dataList:[],
			}
	},
	onLoad:function(){
		setTimeout(() => {this.pageLoading = false;},1500);
	},
	onShow() {
		this.avatarUrl=uni.getStorageSync("avatar");
		this.userNames=uni.getStorageSync("wxaccount");
		this.dataList=uni.getStorageSync("dataList");
		this.mobile=uni.getStorageSync("mobile");
		var that=this;
		/* uni.showLoading({
			title:"请求中...",
			mask:true
		});
		uni.gRequest.get(
					'jfPoints/getPointsRank121',
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
				 */
	},
	methods: {	
		
		getUserInfo(){
			var that=this;
		        uni.getUserProfile({
		            desc:'Wexin', // 这个参数是必须的
		            success:res=>{
		                console.log("获取用户信息="+res)
						that.userNames=res.userInfo.nickName;
						that.avatarUrl=res.userInfo.avatarUrl;
						uni.setStorageSync("wxaccount",res.userInfo.nickName);
						that.points=uni.getStorageSync("points");
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
		        })
		    },
		pendantTap:function () {
			uni.showToast({ icon:"none", title:"挂件点击" });
		}
	}
}
</script>
<style>
		.progress-box {
			display: flex;
			height: 50rpx;
			margin-bottom: 60rpx;
		}
.ic_img{line-height:70rpx;text-align:center; height: 70rpx;border-radius: 40rpx;width: 70rpx;}
.pendant{width:88rpx; height:88rpx; border-radius:88rpx; text-align:center; line-height:88rpx; font-size:55rpx;}
</style>