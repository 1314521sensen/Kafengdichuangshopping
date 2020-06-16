<template>
	<view class="banner">
		<!-- 这个动态的设置高度 -->
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
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
				dotStyle: false
			}
		},
		methods:{
			
		},
	}
</script>


<style lang="less" scoped>
	.banner{
		height:100vh;
		.screen-swiper{
			min-height:100vh;
		}
	}
	
</style>
