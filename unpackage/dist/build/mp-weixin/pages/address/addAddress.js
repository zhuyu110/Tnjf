(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/addAddress"],{1225:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=t("b98d"),c=t("be96"),a={data:function(){return{area:""}},methods:{formSubmit:function(n){var t=[{name:"name",checkType:"string",checkRule:"1,10",errorMsg:"联系人应为1-20个字符"},{name:"phoneno",checkType:"phoneno",checkRule:"",errorMsg:"请正确填写手机号"},{name:"area",checkType:"string",checkRule:"1,100",errorMsg:"请选择所在地区"},{name:"address",checkType:"string",checkRule:"5,100",errorMsg:"请正确填写详细地址"}],c=n.detail.value,a=r.check(c,t);if(a){e.showToast({title:"验证通过! 请观察控制台",icon:"none"}),console.log(c);var o=e.getStorageSync("addressList");""==o&&(o=[]),o.push(c),e.setStorage({key:"addressList",data:o}),this.goback()}else e.showToast({title:r.error,icon:"none"})},openPicker:function(){this.$refs.graceAddressPicker.open()},areaConfirm:function(e){console.log(e),this.area=e.names[0]+" "+e.names[1]+" "+e.names[2]},goback:function(){c.back()}}};n.default=a}).call(this,t("543d")["default"])},"43dc":function(e,n,t){},"684c":function(e,n,t){"use strict";t.r(n);var r=t("1225"),c=t.n(r);for(var a in r)"default"!==a&&function(e){t.d(n,e,(function(){return r[e]}))}(a);n["default"]=c.a},6935:function(e,n,t){"use strict";var r=t("43dc"),c=t.n(r);c.a},"92a5":function(e,n,t){"use strict";(function(e){t("6947");r(t("66fd"));var n=r(t("ef59"));function r(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},c2f4:function(e,n,t){"use strict";t.d(n,"b",(function(){return c})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return r}));var r={guiAreaPicker:function(){return Promise.all([t.e("common/vendor"),t.e("GraceUI5/components/gui-area-picker")]).then(t.bind(null,"0c4e"))}},c=function(){var e=this,n=e.$createElement;e._self._c},a=[]},ef59:function(e,n,t){"use strict";t.r(n);var r=t("c2f4"),c=t("684c");for(var a in c)"default"!==a&&function(e){t.d(n,e,(function(){return c[e]}))}(a);t("6935");var o,u=t("f0c5"),s=Object(u["a"])(c["default"],r["b"],r["c"],!1,null,"370d1846",null,!1,r["a"],o);n["default"]=s.exports}},[["92a5","common/runtime","common/vendor"]]]);