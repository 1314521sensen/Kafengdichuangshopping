<template>
	<view class="Gallery" :style="{'background-color':'#f2f2f2',padding:'20rpx'}">
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="isRounddot" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index" >
				<!-- v-if="this.swiperList.length<=1?Rounddot=false" -->
				<image :src="item.url" class="swiper-item-imgs"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// isRounddo:true
				dotStyle: false,
			}
		},
		methods:{
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
		},
		onLoad:{
			
		},
		props:['swiperList','isRounddot']
	}
</script>

<style lang="less" scoped>
	.Gallery{
		// padding:0 20rpx;
		.screen-swiper{
			min-height:220rpx;
			height: 220rpx;
			.swiper-item-imgs{
				border-radius:16rpx;
			}
		}
	}
	
</style>
