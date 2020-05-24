<template>
	<scroll-view class="banner">
		<!-- 这个动态的设置高度 -->
		<!-- {{'http://hbk.huiboke.com'+swiperList[0].adv_thumb}} -->
		<swiper class="screen-swiper set-height" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		  :autoplay="true" interval="3000" duration="500" :style="{height:height+'rpx'}">
		 <!-- @click="jump(item.url2)" -->
			<swiper-item class="swiper-item" v-for="(item,index) in swiperList" :key="index">
				<!-- 如果type是image就显示图片 -->
					<image :src="'http://hbk.huiboke.com'+item.adv_thumb" class="img"></image>
					<!-- {{'http://hbk.huiboke.com'+item.adv_thumb}} -->
				<!-- 如果是视频就显示视频 -->
				<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
			</swiper-item>
		</swiper>
	</scroll-view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return {
				swiperList:[],
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
		props:["height"],
		created() {
			const _this = this
			uni.request({
				url:`${app.globalData.Requestpath}platform_config/getThumbSlideshow`,
				method:"POST",
				data:{
					limit:5
				},
				success(res) {
					if(res.data.code==0){
						_this.swiperList = res.data.data
					}
				}
			})
		}
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
		/* #ifdef H5 */
			top: 105rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
			top:160rpx;
		/* #endif */
		border-radius: 40rpx;
		box-shadow: 0 12rpx 4rpx #cfcfcf;
		.set-height {
			min-height: 212rpx;
		}
		.screen-swiper {
			position: absolute;
			z-index: 20;
			width: 100%;
			height:260rpx !important;
			border-radius: 40rpx;
			// overflow: hidden;
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
