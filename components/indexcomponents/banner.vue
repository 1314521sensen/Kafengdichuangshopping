<template>
	<view class="banner">
		<!-- 这个动态的设置高度 -->
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="3000" duration="500" :style="{height:height+'rpx'}">
			<swiper-item 
				v-for="(item,index) in swiperList" 
				:key="index" 
				@tap="previewImage" 
				:data-item="item"
			>
				<!-- 如果type是image就显示图片 -->
				<image :src="'http://hbk.huiboke.com'+item" mode="aspectFill"></image>
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
			},
			//查看大图
			previewImage(e){
				let {item} = e.currentTarget.dataset
				var imgArr = [];
				    imgArr.push('http://hbk.huiboke.com'+item);
				    //预览图片
				    uni.previewImage({
				     urls: imgArr,
				     current: imgArr[0]
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
