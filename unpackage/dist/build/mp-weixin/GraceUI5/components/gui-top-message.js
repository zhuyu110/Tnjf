(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["GraceUI5/components/gui-top-message"],{"0709":function(t,e,n){},"3aee":function(t,e,n){"use strict";var u=n("0709"),o=n.n(u);o.a},"4ded":function(t,e,n){"use strict";n.r(e);var u=n("eddd"),o=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);e["default"]=o.a},"59cf":function(t,e,n){"use strict";var u;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return u}));var o=function(){var t=this,e=t.$createElement;t._self._c},a=[]},eddd:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=n("be96"),o={name:"gui-top-message",props:{duration:{type:Number,default:2e3},customNav:{type:Boolean,default:!1}},data:function(){return{show:!1,out:!1,navHeight:0}},created:function(){this.customNavSet()},methods:{customNavSet:function(){if(this.customNav){var t=u.system();this.navHeight=t.statusBarHeight}else this.navHeight=0},open:function(){var t=this;this.out=!1,this.show=!0,setTimeout((function(){t.close()}),this.duration)},close:function(){var t=this;this.out=!0,setTimeout((function(){t.show=!1}),350)}}};e.default=o},fe00:function(t,e,n){"use strict";n.r(e);var u=n("59cf"),o=n("4ded");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("3aee");var i,s=n("f0c5"),c=Object(s["a"])(o["default"],u["b"],u["c"],!1,null,"1012dbf4",null,!1,u["a"],i);e["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'GraceUI5/components/gui-top-message-create-component',
    {
        'GraceUI5/components/gui-top-message-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fe00"))
        })
    },
    [['GraceUI5/components/gui-top-message-create-component']]
]);
