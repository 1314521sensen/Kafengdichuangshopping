<template>
	<view class="banner">
		<!-- 这个动态的设置高度 -->
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="3000" duration="500" :style="{height:height+'rpx'}">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @click="jump(item.url2)">
				<!-- 如果type是image就显示图片 -->
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<!-- 如果是视频就显示视频 -->
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
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
			jump(url){
				// console.log(url)
				uni.navigateTo({
				    url
				});
			}
		},
		props:["swiperList","height"]
	}
</script>


<style lang="less" scoped>
	.banner{
		margin-top:10rpx;
		.screen-swiper{
			min-height:280rpx;
		}
	}
	
</style>
