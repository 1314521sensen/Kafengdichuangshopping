<template>
	<!-- #ifdef APP-PLUS -->
	<view class="banner" v-if="Guidepagebools==false">
		<!-- 这个动态的设置高度 -->
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="autoplay" interval="3000" duration="500" @change="guidepage">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
			</swiper-item>
		</swiper>
	</view>
	<!-- #endif -->
</template>

<script>
	// #ifdef APP-PLUS
	const app = getApp()
	export default{
		data(){
			return {
				swiperList: [{
					id: 0,
					type: 'image',
					url: '/static/Guidepage/1.jpg'
				}, {
					id: 1,
					type: 'image',
					url: '/static/Guidepage/2.jpg',
				}, {
					id: 2,
					type: 'image',
					url: '/static/Guidepage/3.jpg'
				}],
				dotStyle: false,
				autoplay:true,
				Guidepagebools:true
			}
		},
		methods:{
			guidepage(e){
				// console.log(e.detail.current)
				if(e.detail.current==2){
					this.autoplay = false
					setTimeout(function(){
						uni.switchTab({
							url:"/pages/index/index"
						})
					},2000)
				}
			}
		},
		onLoad(){
			console.log(111)
			this.Guidepagebools = app.globalData.Guidepagebool
			// console.log(this.Guidepagebools)
		}
	}
	// #endif
</script>


<style lang="less" scoped>
	.banner{
		height:100vh;
		.screen-swiper{
			min-height:100vh;
		}
	}
	
</style>
