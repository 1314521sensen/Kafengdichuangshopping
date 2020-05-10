<template>
	<cover-view class="banner">
		<!-- 这个动态的设置高度 -->
		<swiper class="screen-swiper set-height" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="3000" duration="500" :style="{height:height+'rpx'}">
		 <!-- @click="jump(item.url2)" -->
			<swiper-item class="swiper-item" v-for="(item,index) in swiperList" :key="index">
				<!-- 如果type是image就显示图片 -->
					<image :src="item.url" mode="aspectFill" class="img"></image>
				<!-- 如果是视频就显示视频 -->
				<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
			</swiper-item>
		</swiper>
	</cover-view>
</template>

<script>
	export default{
		data(){
			return {
				
				dotStyle: false,
			}
		},
		methods:{
			// jump(url){
			// 	// console.log(url)
			// 	uni.navigateTo({
			// 	    url
			// 	});
			// }
		},
		props:["swiperList","height"]
	}
</script>


<style lang="less" scoped>
	.banner {
		position: absolute;
		// background-color: orange;
		z-index: 10;
		width: 720rpx;
		height: 260rpx;
		left: calc(50% - 360rpx);
		top: 105rpx;
		border-radius: 40rpx;
		box-shadow: 0 12rpx 4rpx #cfcfcf;
		.set-height {
			min-height: 212rpx;
		}
		.screen-swiper {
			position: absolute;
			z-index: 20;
			width: 100%;
			border-radius: 40rpx;
			.swiper-item {
				height: 260rpx !important;
				border-radius: 40rpx;
				.img{
					width: 100%;
					height:100%;
					border-radius: 40rpx;
				}
			}
			
		}
	}
	
</style>
