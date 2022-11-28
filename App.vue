<script>
var graceJS = require('@/GraceUI5/js/grace.js');

global.isLogin=function(){
	try{
		var suid=uni.getStorageSync('suids');
		var mobile=uni.getStorageSync('mobile');
	
	}catch(e){
		
	}
	if(suid == ''|| mobile==''||mobile==null){
		return false;
	}else{
		return true;
	}
	
}
global.business=function(){
	try{
		var businessId=uni.getStorageSync('businessId');
	}catch(e){
		
	}
	if(businessId == ''||businessId == null){
		return false;
	}else{
		return true;
	}
}
global.platform=function(){
	var systemInfo = graceJS.system();
	console.log('小程平台=',systemInfo.platform)
	return systemInfo.platform;
	
}


	export default {
		onLaunch: function() {
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function (res) {
		  // 请求完新版本信息的回调
		console.log("更新回调",res);
		  console.log("更新回调",res.hasUpdate);
		  if(res.hasUpdate){
			  updateManager.onUpdateReady(function (res) {
			    uni.showModal({
			      title: '更新提示',
			      content: '新版本已经准备好，是否重启应用？',
			      success(res) {
			        if (res.confirm) {
			          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			          updateManager.applyUpdate();
			        }
			      }
			    });
			  
			  });
			  
		  }
		});
		console.log('App onLaunch')
		// #ifdef APP-PLUS
		plus.screen.lockOrientation('portrait-primary'); //锁定屏幕
		const dom = weex.requireModule('dom');
		dom.addRule('fontFace', { 
			'fontFamily': "graceIconfont",
			'src': "url('/static/grace.ttf')"
		});
		// #endif
		},
		onShow: function() {
			const accountInfo = wx.getAccountInfoSync()
			uni.setStorageSync("version",accountInfo.miniProgram.version);
			console.log('小程序信息=',accountInfo)
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 在 style 标签内添加 */
	@import "@/GAL/css/gal.css";
	/* 加载框架核心样式 */
	@import "./GraceUI5/css/graceUI.css";
	/* 加载主题样式 */
	@import "./GraceUI5/skin/black.css";
	/* 加载图标字体 - 条件编译模式 */
	/* #ifdef APP-PLUS-NVUE */
	.gui-icons{font-family:graceIconfont;}
	/* #endif */
	@import '/wxcomponents/vant/common/index.wxss';
	
</style>


