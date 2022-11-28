(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["GraceUI5/components/gui-header-leading"],{"1c7a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"gui-header-leading",props:{homePage:{type:String,default:"/pages/index/index"},bgStyle:{type:String,default:""},buttonStyle:{type:String,default:""},onlyBack:{type:Boolean,default:!1}},methods:{goback:function(){t.navigateBack({delta:1}),this.$emit("goback")},gohome:function(){""!=this.homePage&&t.switchTab({url:this.homePage}),this.$emit("gohome")}}};e.default=n}).call(this,n("543d")["default"])},3617:function(t,e,n){"use strict";n.r(e);var a=n("cd84"),u=n("d716");for(var c in u)"default"!==c&&function(t){n.d(e,t,(function(){return u[t]}))}(c);n("c8d4");var i,o=n("f0c5"),r=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,"4ed65c1b",null,!1,a["a"],i);e["default"]=r.exports},a5fd:function(t,e,n){},c8d4:function(t,e,n){"use strict";var a=n("a5fd"),u=n.n(a);u.a},cd84:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}));var u=function(){var t=this,e=t.$createElement;t._self._c},c=[]},d716:function(t,e,n){"use strict";n.r(e);var a=n("1c7a"),u=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'GraceUI5/components/gui-header-leading-create-component',
    {
        'GraceUI5/components/gui-header-leading-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3617"))
        })
    },
    [['GraceUI5/components/gui-header-leading-create-component']]
]);
