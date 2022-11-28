var graceJS = require('@/GraceUI5/js/grace.js');
module.exports = {
	
	// api 基础 url
	apiBaseUrl        : 'https://www.tn-hs.com/pms-web/pc/',
/* 	apiBaseUrl        : 'http://10.10.72.77:8080/pms_web_war/pc/', */
/* 	apiBaseUrl        : 'http://10.10.72.94:1225/pms_web_war/pc/', */
	// 调试模式 [ false 关闭调试输出，项目发包时请设置此项为 false ]
	debug             : true,
	
	// 本地 Token 数据键名称
	localTokenKeyName : 'reqToken',
	
	// 用户登录 Token 数据键名称
	userTokenKeyName  : 'uToken',
	
	// token 有效期, 单位 秒 ，要与后端保持一致
	expiredTime       : 3600,
	
	// post 方式 header[content-type] 默认值
	postHeaderDefault : 'application/json',
	
	// 从服务器获取 token 函数
	// 因后端语言不同、思路不同，请跟据自己的 api 情况完成 token 获取函数
	// 一个示例，实际开发请跟据自己情况复写此函数	
	getToken : (resolve, reject) => {
		var that=this;
		// 接口请求秘钥 与后端开发人员协商格式及获取
		// 如 : 
		//var appKey = 'AppKey2021&&';
		// 发起请求
		var localTokenKeyName=module.exports.localTokenKeyName;
		var urls=module.exports.apiBaseUrl+'jfLogin/loginApplets';
		
		uni.login({
		  provider: 'weixin',
		  success: function (loginRes) {
		    console.log("usercode="+loginRes.code);
			
			uni.setStorageSync('usercode', loginRes.code);
			uni.request({
				// token 授权 api 服务器地址
				url      :urls,
				// 请求秘钥
				data     : {
								authcode:loginRes.code
							},
				// 请求方式 POST
				method   : "POST",
				// headers
				header   : {'content-type' : 'application/json'},
				// 返回值类型
				dataType : "json",
				// 请求成功
				success  : (res) => {
					console.log("框架ssss")
					console.log(res)
					var data = res.data;
					if(data.status == 'SUCCESS'){
						uni.setStorageSync("points",data.result.user.points);
						uni.setStorageSync('suids', data.result.user.id);
						uni.setStorageSync("energy",data.result.energy);
						uni.setStorageSync("fire",data.result.fire);
						uni.setStorageSync(localTokenKeyName, data.result.userToken);
						uni.setStorageSync('mobile', data.result.user.mobile);
						uni.setStorageSync("businessId",data.result.user.businessId);
						uni.setStorageSync("isVip",data.result.user.isVip=="1");
						uni.setStorageSync("wxaccount",data.result.user.wxaccount);
						uni.setStorageSync("avatar",data.result.user.avatar);
						uni.setStorageSync("terminalnodePO",data.result.terminalnodePO);
						resolve(data.result.userToken);
					}else{
						uni.setStorageSync("points","");
						uni.setStorageSync('suids', "");
						uni.setStorageSync("energy","");
						uni.setStorageSync('suids', "");
						uni.setStorageSync('mobile', "");
						uni.setStorageSync(localTokenKeyName, "");
						uni.setStorageSync("businessId","");
						uni.setStorageSync("isVip",false);
						uni.setStorageSync("wxaccount","");
						uni.setStorageSync("avatar","");
						uni.setStorageSync("terminalnodePO","");
						reject();
					}
				},
				// 请求失败
				fail     : (e) => {
					reject();}
			});
			
			
		  }
		});
		
		
			
		
	}
	
}
