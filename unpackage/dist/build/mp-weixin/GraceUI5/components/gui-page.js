(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["GraceUI5/components/gui-page"],{"155b":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={name:"gui-page",props:{fullPage:{type:Boolean,default:!1},customHeader:{type:Boolean,default:!1},headerSets:{type:Object,default:function(){return{height:44,zIndex:100}}},headerStyle:{type:String,default:"background-color:#FFFFFF;"},isHeaderSized:{type:Boolean,default:!0},statusBarStyle:{type:String,default:"background-color:#FFFFFF;"},customFooter:{type:Boolean,default:!1},footerSets:{type:Object,default:function(){return{height:100,zIndex:100,bg:"linear-gradient(to bottom, #FFFFFF,#FFFFFF)"}}},pendantSets:{type:Object,default:function(){return{width:"100rpx",right:"25rpx",bottom:"100rpx",zIndex:100}}},isLoading:{type:Boolean,default:!1},isSwitchPage:{type:Boolean,default:!1},iphoneXButtomStyle:{type:String,default:""},headerSizedStyle:{type:String,default:""},fixedTopZIndex:{type:Number,default:2},refresh:{type:Boolean,default:!1},refreshText:{type:Array,default:function(){return["继续下拉刷新","松开手指开始刷新","数据刷新中","数据已刷新"]}},refreshBgColor:{type:Array,default:function(){return["#FFFFFF","#FFFFFF","#FFFFFF","#63D2BC"]}},refreshColor:{type:Array,default:function(){return["rgba(69, 90, 100, 0.6)","rgba(69, 90, 100, 0.6)","#63D2BC","#FFFFFF"]}},refreshFontSize:{type:String,default:"26rpx"},loadmore:{type:Boolean,default:!1},loadMoreText:{type:Array,default:function(){return["","更多数据加载中","已加载全部数据"]}},loadMoreColor:{type:Array,default:function(){return["rgba(69, 90, 100, 0.6)","rgba(69, 90, 100, 0.6)","rgba(69, 90, 100, 0.8)"]}},loadMoreFontSize:{type:String,default:"26rpx"},apiLoadingStatus:{type:Boolean,default:!1}},data:function(){return{footerHeight:"100rpx",iphoneXButtomHeight:"0rpx",statusBarHeight:0,headerTapNumber:0,fixedTop:0,refreshBodyHeight:0,loadMoreTimer:null,fixedTopMargin:0,scrollTop:0,srcollTimer:null}},mounted:function(){var e=this;this.isLoading&&this.$refs.guipageloading.open(),(this.refresh||this.loadmore)&&this.getDomSize("guiPageBody",(function(t){e.refreshBodyHeight=t.height,e.getDomSize("guiPageFixedTop",(function(t){t.height&&(e.refreshBodyHeight-=t.height,e.fixedTopMargin=t.height)}))}))},watch:{isLoading:function(e){e?this.$refs.guipageloading.open():this.$refs.guipageloading.close()}},created:function(){this.footerHeight=this.footerSets.height+"rpx";try{var t=e.getSystemInfoSync();if(t.model){t.model=t.model.replace(" ",""),t.model=t.model.toLowerCase(),this.statusBarHeight=t.statusBarHeight;var o=t.model.indexOf("iphonex");o>5&&(o=-1);var r=t.model.indexOf("iphone1");r>5&&(r=-1),-1==o&&-1==r||(this.iphoneXButtomHeight="50rpx",this.footerHeight=this.footerSets.height+50+"rpx")}this.isSwitchPage&&(this.iphoneXButtomHeight="0rpx",this.footerHeight=this.footerSets.height+"rpx"),this.customHeader?this.fixedTop=this.headerSets.height+this.statusBarHeight:this.fixedTop=0}catch(i){return null}},methods:{touchstart:function(e){return!!this.refresh&&(!this.apiLoadingStatus&&void this.$refs.guiPageRefresh.touchstart(e))},touchmove:function(e){return!!this.refresh&&(!this.apiLoadingStatus&&void this.$refs.guiPageRefresh.touchmove(e))},touchend:function(e){return!!this.refresh&&(!this.apiLoadingStatus&&void this.$refs.guiPageRefresh.touchend(e))},scroll:function(e){var t=this;null!=this.srcollTimer&&clearTimeout(this.srcollTimer),this.srcollTimer=setTimeout((function(){t.$refs.guiPageRefresh.scroll(e),t.$emit("scroll",e),t.scrollTop=e.detail.scrollTop}),100)},setScrollTop:function(e){this.scrollTop=e},endReload:function(){this.$refs.guiPageRefresh.endReload()},reload:function(){if(this.apiLoadingStatus)return!1;this.$emit("reload"),this.loadmore&&this.$refs.guipageloadmore.stoploadmore()},getDomSize:function(t,o){var r=this;setTimeout((function(){e.createSelectorQuery().in(r).select("#"+t).boundingClientRect().exec((function(e){o(e[0])}))}),800)},stopfun:function(e){return e.stopPropagation(),null},headerTap:function(){var e=this;this.headerTapNumber++,this.headerTapNumber>=2?(this.$emit("gotoTop"),this.headerTapNumber=0):setTimeout((function(){e.headerTapNumber=0}),1e3)},loadmorefun:function(){var e=this;return!!this.loadmore&&(!this.apiLoadingStatus&&(null!=this.loadMoreTimer&&clearTimeout(this.loadMoreTimer),void(this.loadMoreTimer=setTimeout((function(){var t=e.$refs.guipageloadmore.loadMoreStatus;if(0!=t)return null;e.$refs.guipageloadmore.loading(),e.$emit("loadmorefun")}),80))))},stoploadmore:function(){this.$refs.guipageloadmore.stoploadmore()},nomore:function(){this.$refs.guipageloadmore.nomore()}}};t.default=o}).call(this,o("543d")["default"])},1979:function(e,t,o){},"2c7f":function(e,t,o){"use strict";o.d(t,"b",(function(){return i})),o.d(t,"c",(function(){return n})),o.d(t,"a",(function(){return r}));var r={guiRefresh:function(){return o.e("GraceUI5/components/gui-refresh").then(o.bind(null,"f928"))},guiLoadmore:function(){return o.e("GraceUI5/components/gui-loadmore").then(o.bind(null,"d0fc"))},guiPageLoading:function(){return o.e("GraceUI5/components/gui-page-loading").then(o.bind(null,"9042"))}},i=function(){var e=this,t=e.$createElement;e._self._c},n=[]},"55c2":function(e,t,o){"use strict";o.r(t);var r=o("2c7f"),i=o("b78b");for(var n in i)"default"!==n&&function(e){o.d(t,e,(function(){return i[e]}))}(n);o("d9a5");var a,u=o("f0c5"),s=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,"74cb88a6",null,!1,r["a"],a);t["default"]=s.exports},b78b:function(e,t,o){"use strict";o.r(t);var r=o("155b"),i=o.n(r);for(var n in r)"default"!==n&&function(e){o.d(t,e,(function(){return r[e]}))}(n);t["default"]=i.a},d9a5:function(e,t,o){"use strict";var r=o("1979"),i=o.n(r);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'GraceUI5/components/gui-page-create-component',
    {
        'GraceUI5/components/gui-page-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("55c2"))
        })
    },
    [['GraceUI5/components/gui-page-create-component']]
]);
