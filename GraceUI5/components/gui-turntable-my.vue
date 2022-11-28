<template>
				<view class="hb-bd-turn-content" :animation="animationData">
					<view class="hb-bd-turn-content-block">
						<view :class="['hb-bd-turn-content-block-item', 'item'+index]" v-for="(item, index) in rewardNames" :key="index">
							<view class="hb-bd-turn-content-block-item-name">
								{{item.name}}
							</view>
							<image :src="item.cover" mode="" class="hb-bd-turn-content-block-item-img"></image>
						</view>
					</view>
				</view>
</template>
<script>
export default{
	name  : "gui-turntable-my",
	props : {
		// 奖品名称
		rewardNames : {
			type : Array,
			default : function(){
				return ["", "", "", "", "", "",""];
			}
		},
		// 奖品展示区背景颜色
		rewardBGColors : {
			type : Array,
			default : function(){
				return [];
			}
		},
		// 奖品展示区文本颜色
		rewardColors : {
			type : Array,
			default : function(){
				return [];
			}
		},
		// 文本尺寸
		fontSize : {
			type : String,
			default : '32rpx'
		}
	},
	data() {
		return {
			// 是否正在抽奖
			luckyStatus     : 0,
			// 动画对象
			animationData   : {},
			tpmimgtimmer    : null,
			// 中奖奖品 index
			RewardIndex     : -1,
			// 角度
			averageRotate   : 0,
			inital          : 0,
			textTrX         : '43rpx',
			textRotate      : '-30deg',
			
		}
	},
	created:function(){
		this.init();
	},
	watch:{
		rewardNames:function(){
			this.init();
		}
	},
	methods:{
		init : function(){
			var length          = this.rewardNames.length;
			this.averageRotate  = 360 / length ;
			this.inital         = (360 / length / 2) * -1;
			switch(length){
				case 4:
					this.textTrX    = '0rpx';
					this.textRotate = '-45deg';
					break
				
				case 6:
					this.textTrX    = '43rpx';
					this.textRotate = '55deg';
					break
				case 8:
					this.textTrX    = '72rpx';
					this.textRotate = '65deg';
					break
			}
			var animation      = null;
			animation = uni.createAnimation({
				duration: 0,
				timingFunction: 'ease',
			});
			animation.rotateZ(this.averageRotate/2).step();
			this.animationData = animation.export();
		},
		goto : function(index){
			if(this.luckyStatus != 0){
				return ;
			}
			this.RewardIndex = index;
			this.animationData = {};
			this.luckyStatus   = 1;
			
			// 轮盘归零
			var animation      = null;
			animation = uni.createAnimation({
				duration: 0,
				timingFunction: 'ease',
			});
			animation.rotateZ(this.averageRotate/2).step();
			this.animationData = animation.export();
			
			// 计算奖品角度
			var rewardRadiu     = (360 / this.rewardNames.length);
			var rewardRadiuNeed = 360*6 + rewardRadiu * this.RewardIndex;
			setTimeout(()=>{
				animation = uni.createAnimation({
					duration:5000,
					timingFunction: 'ease',
				});
				animation.rotateZ(rewardRadiuNeed).step();
				this.animationData = animation.export();
			},100);
			setTimeout(()=>{
				// 停止动画
				this.luckyStatus = 0;
				this.$emit('end', index);
				this.RewardIndex = -1;
			},5000);
		}
	}
}
</script>
<style scoped lang="scss">
.gui-turntable{
  position : relative;
  transform-origin: center;
  width    : 600rpx;
  height   : 600rpx;
}
.gui-turntable-item {
  position : absolute;
  left     : 50%;
  width    : 300rpx;
  height   : 600rpx;
  border-radius:0px 300rpx 300rpx 0;
  overflow : hidden;
  transform-origin : left center;
}

.gui-turntable-inner {
  text-align: center;
  width  : 300rpx;
  height : 600rpx;
  transform-origin : right center;
  border-radius : 300rpx 0 0 300rpx;
}

.gui-turntable-text {
  display: block;
  transform-origin:center;
}
.hb{
		display: flex;
		flex-wrap: wrap;
		margin: 0 66rpx;
		margin-top: 160rpx;
		position: relative;
		background: linear-gradient( 180deg ,#fce4a9,#fd9f6a 55%,#f5783e);
		border-radius: 50rpx;
		&-hd{
			width: 594rpx;
			margin: auto;
			margin-top: -120rpx;
			background-color: #fff9eb;
			border-radius: 40rpx 40rpx 0 0;
			position: relative;
			// margin-bottom: -60rpx;
			box-sizing: border-box;
			&-content{
				width: 574rpx;
				margin: 20rpx auto;
				background-color: #FFFFFF;
				border: 1px solid rgba(254,230,208,1);
				border-radius: 20rpx 20rpx 0 0;
				position: relative;
				box-sizing: border-box;
				height: 100%;
				&-head{
					width: 100%;
					height: 340rpx;
					&-user{
						display: flex;
						align-items: center;
						padding-top: 10rpx;
						&-logo{
							width: 80rpx;
							height: 80rpx;
							border-radius: 60rpx;
							margin-right: 10rpx;
							margin-left: 20rpx;
							flex-shrink: 0;
						}
						&-name{
							font-size: 30rpx;
							color: #b9562d;
						}
						&-center{
							flex-shrink: 0;
							margin-left: auto;
							background: #fda673;
							color: #fff;
							font-size: 26rpx;
							height: 50rpx;
							display: flex;
							align-items: center;
							border-radius: 50rpx 0 0 50rpx;
							padding-left: 20rpx;
							font-weight: 500;
							.iconiconfontjiantou2{
								font-size: 26rpx;
								padding: 0 4rpx;
							}
						}
					}
					&-money{
						text-align: center;
						font-size: 60rpx;
						line-height: 60rpx;
						color: #d72128;
						display: flex;
						align-items: flex-end;
						justify-content: center;
						margin-top: 40rpx;
						&-balance{
							display: flex;
							align-items: flex-end;
							justify-content: center;
							position: relative;
							&-do{
								font-size: 38rpx;
								line-height: 38rpx;
								margin-bottom: 4rpx;
							}
							&-wx{
								font-size: 24rpx;
								line-height: 1;
								position: absolute;
								right: 0;
								top: -20rpx;
								transform: translate(100%);
								background-color: #fcc68e;
								padding: 8rpx 10rpx;
								border-radius: 14rpx 14rpx 14rpx 0;
								color: #782a09;
							}
						}
					}
					&-btn{
						margin: auto;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 80rpx;
						width: 300rpx;
						margin-top: 30rpx;
						border-radius: 80rpx;
						background-color: #f33d31;
						color: #FFFFFF;
						// background: linear-gradient(to right, #fef8de , #fbe792);
						box-shadow: 0 4rpx 12rpx #b62e25; //8rpx 8rpx 16rpx #c5c5c5
						text-align: center;
						// color: #e81e10;
						animation-timing-function:ease-in-out;
						animation-name:breathe;
						animation-duration:500ms;
						animation-iteration-count:infinite;
						animation-direction:alternate;
					}
				}
				&::after{
					position: absolute;
					content: '';
					width: 548rpx;
					height: 16rpx;
					top: -14rpx;
					left: 12rpx;
					background: rgba(255,255,255,1);
					border: 1px solid rgba(254,230,208,1);
					border-width: 1px 1px 0 1px;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					box-sizing: border-box;
				}
			}
		}
		&-bd{
			width: 100%;
			position: relative;
			background: url(https://funimg.pddpic.com/spi_main/cover_body.png.slim.png) no-repeat;
			background-size: 100% 100%;
			padding-top: 70rpx;
			padding-bottom: 40rpx;
			margin-top: -60rpx;
			box-sizing: border-box;
			&-turn{
				width: 566rpx;
				height: 566rpx;
				margin: auto;
				box-sizing: border-box;
				position: relative;
				&-content{
					width: 100%;
					height: 100%;
					padding: 40rpx;
					box-sizing: border-box;
					background: url(https://www.tn-hs.com/pms-pic/2022-07-05/e8b5fb9a-1ea0-40e7-9171-1e69a863e444.png) no-repeat;
					background-size: 100%;
					&.rotate{
						animation: turn 30s linear infinite;
						animation-fill-mode: forwards;
					}
					&-block{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						overflow: hidden;
						position: relative;
						transform: rotate(1deg);
						&-item{
							position: absolute;
							left: 50%;
							transform-origin: bottom center;
							display: flex;
							align-items: center;
							justify-content: flex-start;
							flex-direction: column;
							width: 243rpx;
							height: 243rpx;
							&-name{
								font-size: 28rpx;
								line-height: 1;
								font-weight: bold;
								color: rgba(195, 83, 31, 1);
								margin-top: 20rpx;
								margin-bottom: 10rpx;
							}
							&-img{
								display: block;
								width: 84rpx;
								height: 84rpx;
							}
							&.item0{
								transform: translateX(-50%) rotate(0deg);
							}
							&.item1{
								transform: translateX(-50%) rotate(51deg);
							}
							&.item2{
								transform: translateX(-50%) rotate(102deg);
							}
							&.item3{
								transform: translateX(-50%) rotate(153deg);
							}
							&.item4{
								transform: translateX(-50%) rotate(204deg);
							}
							&.item5{
								transform: translateX(-50%) rotate(255deg);
							}
							&.item6{
								transform: translateX(-50%) rotate(306deg);
							}
						}
					}
				}
				&-btn{
					width: 282rpx;
					height: 286rpx;
					background: url(https://funimg.pddpic.com/spi_main/turntable_cursor_v2.png.slim.png) no-repeat;
					background-size: 100%;
					position: absolute;
					top: 180rpx;
					left: 144rpx;
					padding-top: 80rpx;
					text-align: center;
					box-sizing: border-box;
					&-lottery{
						color: rgba(253,37,81,1);
						font-weight: 600;
						font-size: 46rpx;
						line-height: 46rpx;
						background: linear-gradient( 180deg, rgba(255,254,251,1) 0%, rgba(255,204,149,1) 100% );
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
						--animate-duration: 2s;
					}
					&-last{
						margin-top: 8rpx;
						color: rgba(253,37,81,1);
						font-weight: 600;
						font-size: 24rpx;
						line-height: 24rpx;
						background: linear-gradient( 180deg, rgba(255,254,251,1) 0%, rgba(255,204,149,1) 100% );
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}
			}
		}
	}



</style>