<template>
	<scroll-view :scroll-with-animation="scorllAnimation" 
	:scroll-x="true" :show-scrollbar="false" 
	:class="['gui-scroll-x', isCenter ? 'gui-nav-center' : '']" 
	:style="{width:width+'rpx'}" 
	:scroll-left="scrollLeft">
		<view class="gui-scroll-x-items gui-columns" 
		:id="'tab-'+index+(random+'')" 
		:style="{
			width:size == 0 ? 'auto' : size+'rpx', 
			marginRight:margin+'rpx', paddingLeft:padding, paddingRight:padding
		}" 
		v-for="(item, index) in itemsIn" :key="index" @tap="change" :data-index="index">
			<text :class="['gui-block-text', 'gui-border-box', currentIndexIn == index ? 'nav-active' : '']"
			:style="{
				color:currentIndexIn == index ? activeColor : color, 
				textAlign : textAlign, lineHeight:lineHeight, 
				fontSize:currentIndexIn == index ? activeFontSize : fontSize, 
				fontWeight:currentIndexIn == index ? activeFontWeight : ''}">{{item.name}}</text>
			<view class="gui-flex gui-rows" :style="{justifyContent:activeDirection}">
				<view class="nav-active-line" 
				:class="[currentIndexIn == index && animatie ?'gui-nav-scale':'']" 
				:style="{
					backgroundImage:activeLineBg, width:activeLineWidth, 
					height:activeLineHeight, borderRadius:activeLineRadius
				}" 
				v-if="currentIndexIn == index"></view>
			</view>
		</view>
	</scroll-view>
</template>
<script>
export default {
	name  : "gui-switch-navigation",
	props : {
		width              : {type : Number,  default : 690},
		isCenter           : {type : Boolean, default : false},
		currentIndex       : {type : Number,  default : 0},
		size               : {type : Number,  default : 120},
		fontSize           : {type : String,  default : '28rpx'},
		activeFontSize     : {type : String,  default : '28rpx'},
		items              : {type : Array,   default : function () {return []}},
		activeLineBg       : {type : String,  default : "linear-gradient(to right, #66BFFF,#3388FF)"},
		color              : {type : String,  default : "#333333"},
		activeColor        : {type : String,  default : "#333333"},
		activeLineHeight   : {type : String,  default : '6rpx'},
		activeLineWidth    : {type : String,  default : "36rpx"},
		activeLineRadius   : {type : String,  default : "0rpx"},
		activeDirection    : {type : String,  default : ""},
		activeFontWeight   : {type : Number,  default : 700},
		margin             : {type : Number,  default : 0},
		textAlign          : {type : String,  default : ''},
		lineHeight         : {type : String,  default : '50rpx'},
		padding            : {type : String,  default : '0rpx'},
		animatie           : {type : Boolean, default : true},
		autoLeft           : {type : String,  default : ''},
		scorllAnimation    : {type : Boolean, default : true}
	},
	data(){
		return {
			currentIndexIn : 0,
			itemsIn        : [],
			random         : 1,
			scrollLeft     : 0,
			scrllTimer     : null
		}
	},
	created:function(){
		this.currentIndexIn = this.currentIndex;
		this.itemsIn        = this.items;
		this.random         = this.randomNum();
	},
	watch:{
		currentIndex : function(value){
			this.currentIndexIn = value;
		},
		currentIndexIn : function(val){
			if(this.isCenter){return ;}
			if(this.scrllTimer != null){clearTimeout(this.scrllTimer);}
			this.scrllTimer = setTimeout(()=>{this.setLeft();}, 200);
		},
		items        : function(value){ this.itemsIn = value; }
	},
	methods:{
		change    : function (e){
			this.currentIndexIn = e.currentTarget.dataset.index;
			this.$emit('change', Number(e.currentTarget.dataset.index))
		},
		randomNum : function () {
			return parseInt(Math.random() * 1000);
		},
		setLeft   : function () {
			if(this.isCenter){return ;}
			var itemWidth = Number(this.margin) + Number(this.size);
			var left      = (Number(this.currentIndexIn) + 1) * itemWidth - Number(this.width) / 2 - itemWidth / 2;
			var maxLeft   = Number(this.itemsIn.length) * itemWidth - this.width;
			maxLeft       = uni.upx2px(maxLeft - 30);
			left          = uni.upx2px(left);
			if(left > maxLeft){left = maxLeft;}
			if(left < 0){left = 0;}
			this.scrollLeft = left;
		}
	}
}
</script>
<style scoped>
.nav-active-line{margin-top:6rpx;}
.gui-nav-center{justify-content:center; text-align:center;}
/* #ifndef APP-NVUE */
@keyframes gui-nav-scale{0%{transform: scale(0.1);} 100%{transform: scale(1);}}
.gui-nav-scale{animation:gui-nav-scale 350ms forwards;}
/* #endif */
</style>