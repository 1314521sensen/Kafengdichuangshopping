<template>
	<!-- #ifdef APP-PLUS -->
	<view class="banner" v-if="Guidepagebools==false">
		<!-- 这个动态的设置高度 -->
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true" duration="500" @change="guidepage">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="'http://hbk.huiboke.com'+item.adv_img"></image>
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
				swiperList: [],
				dotStyle: false,
				Guidepagebools:true
			}
		},
		methods:{
			guidepage(e){
				console.log(e.detail.current)
				if(e.detail.current==this.swiperList.length-1){
					console.log("到头了")
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
		},
		created() {
			const _this = this
			uni.request({
				url:`${app.globalData.Requestpath}guider/getGuiderInfo`,
				method:"POST",
				data:{
					type:2
				},
				success(res) {
					console.log(res)
					if(res.data.code==0){
						_this.swiperList = res.data.data.data
					}
				}
			})
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
