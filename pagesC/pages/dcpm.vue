
<template>
	<view class="gui-margin">
		<view class="gui-margin-top">
			<text class="gui-h5 gui-color-gray">滚动消息 · 竖向</text>
		</view>
		<view class="gui-margin-top">
			<gui-scrollitems-y 
			ref="guiscrollitemsy" 
			v-if="scrollItems != null" 
			:items="scrollItems" @itemTap="itemTap" duration="1000"></gui-scrollitems-y>
		</view>
		<view class="gui-margin-top">
			<text class="gui-text gui-block-text gui-text-center gui-color-blue" 
			@tap="addItem">+ 点击这里追加项目</text>
		</view>
	</view>
</template>
<script>
var id = 100; // 模拟一个消息 id
var face = "https://images.unsplash.com/photo-1663524789625-b8d2ed6cac2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4NHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=60"
export default {
	data() {
		return {
			scrollItems : null
		}
	},
	onLoad:function(){
		// 模拟 api 请求
		setTimeout(()=>{
			this.scrollItems = [
				// id img desc 为必须属性，可以随意添加其他属性， 点击时会返回对应数据
				{
					id : 1, 
					img :  face, 
					desc : '少年不识愁滋味，爱上层楼。爱上层楼，为赋新词强说愁。而今识尽愁滋味，欲说还休。',
				},
				{
					id : 2, 
					img :  face, 
					desc : '东篱把酒黄昏后，有暗香盈袖。莫道不销魂，帘卷西风，人比黄花瘦。',
				},
				{
					id : 3, 
					img :  face, 
					desc : '天接云涛连晓雾，星河欲转千帆舞。仿佛梦魂归帝所。闻天语，殷勤问我归何处。',
				},
				{
					id : 4, 
					img :  face, 
					desc : '世事一场大梦，人生几度秋凉？夜来风叶已鸣廊。看取眉头鬓上。(秋凉 一作：新凉)',
				},
				{
					id : 5, 
					img :  face, 
					desc : '庭院深深深几许，杨柳堆烟，帘幕无重数。玉勒雕鞍游冶处，楼高不见章台路。',
				},
			];
		},500);
	},
	methods:{
		itemTap : function (item) {
			// 此处返回被点击元素的全部数据 对象形式
			console.log(item);
		},
		addItem : function(){
			this.$refs.guiscrollitemsy.addItem({
				id   : id++,
				img :  face, 
				desc : '追加内容 : '+ id
			});
			uni.showToast({
				icon:"none",
				title:"追加成功"
			})
		}
	}
}
</script>
<style>
</style>