(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{1292:function(o,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return e}));var e={guiPage:function(){return n.e("GraceUI5/components/gui-page").then(n.bind(null,"55c2"))},guiModal:function(){return n.e("GraceUI5/components/gui-modal").then(n.bind(null,"7e3c"))}},i=function(){var o=this,t=o.$createElement;o._self._c},s=[]},"37f8":function(o,t,n){"use strict";var e=n("7476"),i=n.n(e);i.a},7476:function(o,t,n){},"97d1":function(o,t,n){"use strict";n.r(t);var e=n("1292"),i=n("ef8f");for(var s in i)"default"!==s&&function(o){n.d(t,o,(function(){return i[o]}))}(s);n("37f8");var a,l=n("f0c5"),c=Object(l["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],a);t["default"]=c.exports},a97f:function(o,t,n){"use strict";(function(o,e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("be96"),s={data:function(){return{points:"",avatarUrl:"",confirmTxt:"充值",dialogTitle:"注册会员",dialogContent:"确定充值1元成为会员吗?",isVip:!1,product:["天能T9极电石墨烯 | 质保24个月","天能金刚E5 | 超寿命 超耐力 超动力"],userNames:"点击获取",pageLoading:!0,backButtonStyle:"color:#FFFFFF;",headerStyle:"background-color:rgba(255,255,255,0)",statusBarStyle:"background-color:rgba(255,255,255,0)",titleStyle:"opacity:0"}},methods:{getUserInfo:function(){var t=this;o.getUserProfile({desc:"Wexin",success:function(n){console.log(n),t.userNames=n.userInfo.nickName,t.avatarUrl=n.userInfo.avatarUrl,t.points=o.getStorageSync("points"),o.setStorageSync("avatarUrl",t.avatarUrl),o.gRequest.post("jfLogin/saveUserInfo",{data:{pic:t.avatarUrl,wxaccount:t.userNames}},(function(o){console.log("post 异步请求成功"),console.log(o)}),(function(o){console.log(o)}),(function(t){o.hideLoading()}))},fail:function(o){console.log(o),t.userNames="点击获取",t.avatarUrl=""}})},close1:function(){this.$refs.guimodal1.close()},confirm1:function(){var t=this;"充值"==this.confirmTxt?o.gRequest.get("jfPay/payVip",{},(function(n){console.log("post 异步请求成功"),console.log(n);var e=n.result.id;if("SUCCESS"==n.status){var i=n.result.zfReturn,s=JSON.parse(i);o.requestPayment({provider:"wxpay",timeStamp:s.timeStamp,nonceStr:s.nonce_str,package:"prepay_id="+s.prepay_id,signType:"MD5",paySign:s.paySign,success:function(n){o.gRequest.post("jfPay/successCallbackByVip",{data:{id:e}},(function(n){console.log("post 异步请求成功"),console.log(n),o.setStorageSync("isVip",!0),t.isVip=!0}),(function(o){console.log(o)}),(function(t){o.hideLoading()})),console.log("success:"+JSON.stringify(n))},fail:function(t){o.gRequest.post("jfPay/errorCallbackByVip",{data:{id:e}},(function(o){console.log("post 异步请求成功"),console.log(o)}),(function(o){console.log(o)}),(function(t){o.hideLoading()})),console.log("fail:"+JSON.stringify(t))}})}}),(function(o){console.log(o)}),(function(t){o.hideLoading()})):i.navigate("../regist/regist_vip"),this.$refs.guimodal1.close()},registVIP:function(){console.log("注册vip"),e.isLogin()?e.business()?(this.confirmTxt="充值",this.dialogTitle="注册会员",this.dialogContent="确定充值1元成为会员吗?"):(this.dialogTitle="完善信息",this.dialogContent="完善店铺信息？",this.confirmTxt="确定"):i.navigate("../login/login"),this.$refs.guimodal1.open()},scan_QR:function(){e.isLogin()?e.business()?(this.confirmTxt="充值",this.dialogTitle="注册会员",this.dialogContent="确定充值1元成为会员吗?",i.navigate("../scan_upload/scan_upload")):(this.dialogTitle="完善信息",this.dialogContent="完善店铺信息？",this.confirmTxt="确定",this.$refs.guimodal1.open()):i.navigate("../login/login"),console.log("扫码")},sign_in:function(){console.log("签到")},reload:function(){console.log("下拉刷新"),this.$refs.guipage.endReload()},getdata:function(){console.log("加载更多"),this.$refs.guipage.stoploadmore()},scroll:function(o){o.detail.scrollTop>100?(this.backButtonStyle="color:#323232;",this.headerStyle="background-color:rgba(255,255,255,0.9)",this.titleStyle="opacity:1"):(this.backButtonStyle="color:#FFFFFF;",this.headerStyle="background-color:rgba(255,255,255,0)",this.titleStyle="opacity:0")}},onShow:function(){this.isVip=o.getStorageSync("isVip"),this.pageLoading=!1;var t=this;e.isLogin()?o.gRequest.get("jfPoints/getTerminalnodePoints",{},(function(n){console.log("get 异步请求成功"),console.log(n),t.points=n.result.points,o.setStorageSync("points",n.result.points),console.log("points="+t.points)}),(function(o){console.log(o)}),(function(t){o.hideLoading()})):this.userName=""}};t.default=s}).call(this,n("543d")["default"],n("c8ba"))},bd55:function(o,t,n){"use strict";(function(o){n("6947");e(n("66fd"));var t=e(n("97d1"));function e(o){return o&&o.__esModule?o:{default:o}}o(t.default)}).call(this,n("543d")["createPage"])},ef8f:function(o,t,n){"use strict";n.r(t);var e=n("a97f"),i=n.n(e);for(var s in e)"default"!==s&&function(o){n.d(t,o,(function(){return e[o]}))}(s);t["default"]=i.a}},[["bd55","common/runtime","common/vendor"]]]);