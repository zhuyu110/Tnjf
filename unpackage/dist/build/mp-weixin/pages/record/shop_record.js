(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/record/shop_record"],{"0a23":function(t,e,n){"use strict";var a=n("f7af"),o=n.n(a);o.a},"276b":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("be96"),o={data:function(){return{imgURL:"",dataList:[],currentPage:0,pageSize:10,pageLoading:!0,headerStyle:"background-color:rgba(255,255,255,0)",statusBarStyle:"background-color:rgba(255,255,255,0)",titleStyle:"opacity:1"}},methods:{reload:function(){console.log("下拉刷新"),this.currentPage=0,this.dataList=[],this.$refs.guipage.endReload(),this.getdata()},getdata:function(){console.log("加载更多"),this.currentPage+=1,console.log(this.currentPage),this.$refs.guipage.stoploadmore();var e=this;t.gRequest.get("jfOrder/queryOrderList",{data:{pageNum:e.currentPage,pageSize:e.pageSize}},(function(t){console.log("post 异步请求成功"),console.log(t),"SUCCESS"==t.status&&(e.dataList=a.arrayConcat(e.dataList,t.result.data))}),(function(t){console.log(t)}),(function(e){t.hideLoading()}))}},mounted:function(){this.pageLoading=!1,this.getdata(),this.imgURL=this.imgUrl,console.log("url="+this.imgUrl)}};e.default=o}).call(this,n("543d")["default"])},4508:function(t,e,n){"use strict";(function(t){n("6947");a(n("66fd"));var e=a(n("6a56"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},5619:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var a={guiPage:function(){return n.e("GraceUI5/components/gui-page").then(n.bind(null,"55c2"))},guiImage:function(){return n.e("GraceUI5/components/gui-image").then(n.bind(null,"356c"))}},o=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"6a56":function(t,e,n){"use strict";n.r(e);var a=n("5619"),o=n("aba6");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("0a23");var u,i=n("f0c5"),c=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);e["default"]=c.exports},aba6:function(t,e,n){"use strict";n.r(e);var a=n("276b"),o=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=o.a},f7af:function(t,e,n){}},[["4508","common/runtime","common/vendor"]]]);