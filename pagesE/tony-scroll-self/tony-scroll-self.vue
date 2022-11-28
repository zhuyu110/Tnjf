<template>
	<view>
		<view class="scroll_box">
			<swiper class="swiper" circular="true" vertical="true" display-multiple-items="4" :autoplay="autoplay"
				:interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in list" :key="index">
					<view class="swiper-item">
						<text class="line1 gui-ellipsis gui-h6" style="width:165rpx"
						>{{item.mobile}}</text>
						<text class="line1 gui-block-text gui-ellipsis gui-margin-small  gui-h6" style="width:80rpx"
						>{{item.address}}</text>
						<text class="line1 gui-block-text gui-ellipsis gui-margin-small  gui-h6" style="width:155rpx"
						>抽中{{item.prize}}元</text>
						<text class="line1 gui-block-text gui-ellipsis  gui-h6" style="width:200rpx"
						>{{item.dateTime.replace(/2022-/g,"")}}</text>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'tonyscroll',
		props: {
			autoplay: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number,
				default: 1000
			},
			duration: {
				type: Number,
				default: 1000
			},
			datalist: {
				type: Array,
				default: []
			},
		},
		data() {
			return {
				list: [],
			}
		},
		watch: {
			datalist: {
				immediate: true,
				handler(val) {
					this.list = val
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.scroll_box {
		background: none;
		width: 660rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		.swiper {
			height: 160rpx;
		}
	}

	.swiper-item::after {
		content: '';
		clear: both;
	}

	.swiper-item {
		overflow: auto;
		
	}

	.swiper-item .line1 {
		float: left;
	}

	.swiper-item .line2 {
		float: right;
	}

	.swiper-item .line2 .line2-amount {
		color: #EF4A4A;
	}
</style>
