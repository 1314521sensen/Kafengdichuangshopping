<template>
	<view class="banner">
		<!-- 这个动态的设置高度 -->
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item 
				v-for="(item,index) in swiperList" 
				:key="index" 
				@tap="bannertap"
				:data-category="item.category"
				:data-adv_link="item.adv_link"
			>
				<image :src="imgpath+item.adv_thumb" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				dotStyle: false,
				imgpath:this.$store.state.imgyuming
			}
		},
		methods:{
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			//banner 点击
			bannertap(e){
				// console.log(this.swiperList)
				// console.log(e.currentTarget.dataset)
				let {category,adv_link} = e.currentTarget.dataset
				// console.log(category,adv_link)
				if(parseInt(category)==1){
					let storeid = adv_link.split("?")[1].split("=")
					// console.log(storeid)
					uni.navigateTo({
						url:`/pages/Store/store?storeid=${storeid[1]}`
					})
					//
				}else if(parseInt(category)==2){
					uni.navigateTo({
						url:`/pages/festivalActivities/festivalActivities`
					})
				}
			}
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
