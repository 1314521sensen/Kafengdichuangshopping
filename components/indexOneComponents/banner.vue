<template>
	<view class="banner">
		<!-- 这个动态的设置高度 -->
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="'http://hbk.huiboke.com'+item.adv_thumb" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				dotStyle: false,
			}
		},
		methods:{
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
		},
		props:["swiperList"]
	}
</script>


<style lang="less" scoped>
	.banner{
		margin:20rpx;
		border-radius: 28rpx;
		overflow: hidden;
		.screen-swiper{
			min-height:280rpx;
		}
	}
	
</style>
