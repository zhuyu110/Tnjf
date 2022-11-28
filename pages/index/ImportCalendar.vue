<template>
	<view>
		<model-calendar 
		:sendYear="toYear" :sendMonth="toMonth"
		:dataSource="signData" :totalNum="sumCount"
		 @dateChange="getData" @clickChange="clickSign"	 >
		 </model-calendar>
		<view class='count'>
			<text class="gui-color-blue gui-h3">祝 老 板 生 意 兴 隆</text>
			<view class='daynumber gui-flex gui-rows gui-align-items-center'>
				<text>本月累积打卡</text>
				<text class='number'>{{signData.length}}</text>
				<text class='day'>天</text>
			</view>
		</view>
	</view>
</template>

<script>
	import modelCalendar from '@/components/Calendar.vue';
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
				toYear: parseInt(new Date().getFullYear()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				sumCount: 0,
				signData: []
			};
		},
		components: {
			modelCalendar
		},
		created() {
			//获取当前用户当前任务的签到状态  		
			if(this.toMonth<10){
				this.getData(this.toYear+"-0"+this.toMonth);
			}else{
				this.getData(this.toYear+"-"+this.toMonth);
			}
			
		},
		methods: {
			clickSign(day) {
				console.log(typeof day);
				console.log("TIME="+graceJS.now('str'));
				var that=this;
				var day=graceJS.now('str').substr(0,10);
				console.log("day====",day);
				uni.gRequest.post(
						'jf/jfbbc/bbcSignIn',
						{
							data:{date:day}
						}
						, 
						(res)=>{
							console.log('get 异步请求成功');
							console.log(res);
							if(res.status=='SUCCESS'){
								that.signData.push(day);
								that.sumCount++
								uni.showToast({
									title: "打卡成功",
									icon: 'success',
									duration: 2000
								});
							}else{
								uni.showToast({
									title: "打卡失败",
									icon: 'success',
									duration: 2000
								});
							}
						},
						(error)=>{
							console.log(error);
						},
						(res) => {
							
						}
					);
			
			},
			//当模板的时候可以直接引入，然后触发子组件事件到父界面去控制数据

			//获取当前用户该任务的签到数组
			getData(val) {
				let y=val.split('-')[0];
				let m=val.split('-')[1];
				var that=this;
				console.log("获取签到列表",val)
				uni.gRequest.get(
						'jf/jfbbc/getBbcSignInList',
						{
							data:{date:val}
						}
						, 
						(res)=>{
							console.log('get 异步请求成功');
							console.log(res);
							that.signData = [];
							if(res.status=='SUCCESS'){
								var result=res.result;
								// 遍历数据 转换对象格式
								result.forEach((item)=>{
									that.signData.push(item.signDate);
								})
							}
						},
						(error)=>{
							console.log(error);
						},
						(res) => {
							
						}
					);
				
			},
		}
	}
</script>

<style lang='scss'>
	.count .daynumber {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.count .daynumber .day {
	}
	.count {
		margin: 0rpx;
		padding: 0rpx;
		display: flex;
		text-align: center;
		border-radius: 10px;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
		align-items: center;
	}

	.count .number {
		color: #fff;
		font-size: 60rpx;
		background-color: #94db98;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 20rpx;
	}

	.monthSum {
		color: red;
		font-size: 40rpx;
	}

	.count text {
		margin: 10rpx;
	}
</style>
