<!-- <template>
	<view>
		<gui-spread width="750rpx" height="600rpx" btnColor="#008AFF" :isShrink="true">
			<view style="padding-bottom:80rpx;">
				<gui-article-info
				:article="article"></gui-article-info>
			</view>
		</gui-spread>
	</view>
</template>
<script>
export default {
	data() {
		return {
			title   : "",
			article : []
		}
	},
	onLoad : function(){
		uni.showLoading({title:"loading", mask:true});
		uni.setNavigationBarTitle({ title:'加载中' });
		uni.request({
			url:"https://www.graceui.com/api/html2array",
			success: (res) => {
				console.log(res);
				this.article = res.data.data;
				// 文章标题 来自 api 加载
				this.title    = "文章标题";
				uni.setNavigationBarTitle({ title:this.title});
				uni.hideLoading();
			}
		})
	}
}
</script>
<style>
</style> 
<template>
	<view>
		<gal-animate-bg>
			<view class="banner-title-main">
				<view style="padding:150rpx 0;">
					<gal-css-animate 
					:animateName="animateName" 
					duration="2s" 
					timingFunction="ease-in">
						<text class="gal-h3 gal-block-text gal-text-center gal-color-white">www.GraceUI.com </text>
					</gal-css-animate>
				</view>
			</view>
		</gal-animate-bg>
		
		<view class="gal-body gal-margin-top">
			<view style="height:50rpx;"></view>
			<view class="gal-flex gal-rows gal-nowrap gal-justify-content-center gal-align-items-center">
				<text class="gal-text-small gal-color-gray">效果 : </text>
				<view class="gal-picker-wrap">
					<picker 
					@change="pickerChange" 
					:value="animationIndex" 
					:range="animateArray">
						<view class="gal-picker-text gal-icons">{{animateArray[animationIndex]}} &#xe603;</view>
					</picker>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			animationIndex : 0,
			animateArray   : [
				'bounce · 回弹', 'flash · 闪烁', 'pulse · 脉冲', 'rubberBand · 橡皮筋',
				'shake · 晃动', 'headShake · 摇头', 'swing · 摇摆', 'tada · 缩放加摇摆', 
				'wobble · 大幅度摇摆','jello · 果冻', 'heartBeat · 心跳', 'bounceIn · 跳动进入',
				'bounceInDown · 向下飞入', 'bounceInLeft · 左侧飞入', 'bounceInRight · 右侧飞入', 
				'bounceInUp · 向上飞入','bounceOutDown · 向下飞出','bounceOutLeft · 左侧飞出',
				'bounceOutRight · 右侧飞出','bounceOutUp · 向上飞出',
				'fadeIn · 渐变进入', 'fadeInDown · 渐变向下进入','fadeInDownBig · 渐变向下进入大幅度','fadeInLeft · 渐变左侧进入',
				'fadeInLeftBig · 渐变左侧进入大幅度','fadeInRight · 渐变右侧进入','fadeInRightBig · 渐变右侧进入大幅度',
				'fadeInUp · 渐变向上进入','fadeInUpBig · 渐变向上进入大幅度','fadeOut · 渐变消失','fadeOutDown · 向下淡出',
				'fadeOutDownBig · 向下淡出大幅度','fadeOutLeft · 左侧淡出','fadeOutLeftBig · 左侧淡出大幅度','fadeOutRight · 右侧淡出',
				'fadeOutRightBig · 右侧淡出大幅度','fadeOutUp · 向上淡出','fadeOutUpBig · 向上淡出大幅度',
				'flip · 快速翻转','flipInX · 水平翻转','flipInY · 垂直翻转','flipOutX · 水平翻转后消失','flipOutY · 垂直翻转后消失',
				'lightSpeedIn · 光速侠进入','lightSpeedOut · 光速侠消失',
				'rotateIn · 旋转进入','rotateInDownLeft · 旋转左下为轴','rotateInDownRight · 旋转右下为轴','rotateInUpLeft · 旋转左上为轴',
				'rotateInUpRight · 旋转右上为轴','rotateOut · 旋转淡出','rotateOutDownLeft · 旋转左下为轴淡出',
				'rotateOutDownRight · 旋转右下为轴淡出','rotateOutUpLeft · 旋转左上为轴淡出','rotateOutUpRight · 旋转右上为轴淡出',
				'hinge · 合页','jackInTheBox · 动态盒子','rollIn · 滚动进入','rollOut · 滚动淡出',
				'zoomIn · 缩放进入','zoomInDown · 向下缩放进入','zoomInLeft · 从左缩放进入','zoomInRight · 从右缩放进入',
				'zoomInUp · 向上缩放进入','zoomOut · 缩放消失','zoomOutDown · 向下缩放消失','zoomOutLeft · 从左缩放消失',
				'zoomOutRight · 从右缩放消失','zoomOutUp · 向上缩放消失','slideInLeft · 左侧滑入',
				'slideInRight · 右侧滑入','slideInUp · 顶部滑入','slideOutDown · 底部滑出','slideOutLeft · 左侧滑出',
				'slideOutRight · 右侧滑出','slideOutUp · 顶部滑出'
			],
			animateName : 'bounce'
		}
	},
	methods: {
		pickerChange : function(e){
			this.animationIndex = e.detail.value;
			var animateName  = this.animateArray[this.animationIndex];
			animateName      = animateName.split('·');
			this.animateName = animateName[0];
		}
	}
}
</script>
<style scoped>
.demo-text{font-size:36rpx;}
</style>
-->
<template>
	
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
		
		}
	},
	onLoad:function(){
		
	},
	methods:{
		
	}
}
</script>
<style>
.grace-icons{font-size:38rpx;}
.grace-list-title-text{font-size:32rpx !important;}
.map-btns{width:160rpx; margin-left:20rpx; flex-shrink:0;}
.map-btn{width:80rpx;  font-size:50rpx; line-height:60rpx;}
.map-btn-icon{line-height:55rpx; font-size:38rpx; text-align:center;}
.map-btn-text{line-height:30rpx; font-size:24rpx; color:#8788A3; margin-top:3px; text-align:center;}
.icon-tel{font-size:42rpx;}
</style>