(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["GraceUI5/components/gui-page-loading"],{"4cad":function(n,t,u){"use strict";var e=u("b2f2"),i=u.n(e);i.a},"51c1":function(n,t,u){"use strict";var e;u.d(t,"b",(function(){return i})),u.d(t,"c",(function(){return a})),u.d(t,"a",(function(){return e}));var i=function(){var n=this,t=n.$createElement;n._self._c},a=[]},9042:function(n,t,u){"use strict";u.r(t);var e=u("51c1"),i=u("f513");for(var a in i)"default"!==a&&function(n){u.d(t,n,(function(){return i[n]}))}(a);u("4cad");var o,r=u("f0c5"),c=Object(r["a"])(i["default"],e["b"],e["c"],!1,null,"6a6af1bb",null,!1,e["a"],o);t["default"]=c.exports},b2f2:function(n,t,u){},f513:function(n,t,u){"use strict";u.r(t);var e=u("fdc2"),i=u.n(e);for(var a in e)"default"!==a&&function(n){u.d(t,n,(function(){return e[n]}))}(a);t["default"]=i.a},fdc2:function(n,t,u){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={name:"gui-page-loading",props:{},data:function(){return{isLoading:!1,BindingXObjs:[null,null,null],AnimateObjs:[null,null,null],animateTimer:800,intervalID:null}},watch:{},methods:{stopfun:function(n){return n.stopPropagation(),null},open:function(){this.isLoading=!0},close:function(){var n=this;setTimeout((function(){n.isLoading=!1}),100)},getRefs:function(n,t,u){var e=this;if(t>=30)return null;var i=this.$refs[n];i?u(i):(t++,setTimeout((function(){e.getRefs(n,t,u)}),50))}}};t.default=e}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'GraceUI5/components/gui-page-loading-create-component',
    {
        'GraceUI5/components/gui-page-loading-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9042"))
        })
    },
    [['GraceUI5/components/gui-page-loading-create-component']]
]);
