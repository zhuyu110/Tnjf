(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["GraceUI5/components/gui-image"],{"2b87":function(t,e,i){},"356c":function(t,e,i){"use strict";i.r(e);var n=i("8c5a"),a=i("4156");for(var u in a)"default"!==u&&function(t){i.d(e,t,(function(){return a[t]}))}(u);i("58f6");var r,c=i("f0c5"),f=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"37fcdddf",null,!1,n["a"],r);e["default"]=f.exports},4156:function(t,e,i){"use strict";i.r(e);var n=i("bcd7"),a=i.n(n);for(var u in n)"default"!==u&&function(t){i.d(e,t,(function(){return n[t]}))}(u);e["default"]=a.a},"58f6":function(t,e,i){"use strict";var n=i("2b87"),a=i.n(n);a.a},"8c5a":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return u})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c},u=[]},bcd7:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"gui-image",props:{src:{type:String,default:""},width:{type:Number,default:300},height:{type:Number,default:0},timer:{type:Number,default:200},borderRadius:{type:String,default:"0rpx"}},data:function(){return{isLoading:!0,imgHeight:180,opacity:0,animate:!1,failed:!1}},methods:{imgLoad:function(t){var e=this,i=t.detail.width/t.detail.height;this.imgHeight=this.width/i,this.animate=!0,setTimeout((function(){e.isLoading=!1,e.opacity=1}),this.timer)},error:function(){this.isLoading=!1,this.failed=!0}}};e.default=n}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'GraceUI5/components/gui-image-create-component',
    {
        'GraceUI5/components/gui-image-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("356c"))
        })
    },
    [['GraceUI5/components/gui-image-create-component']]
]);
