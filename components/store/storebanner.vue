<template>
	<view  class="newestActivity" style="width: 100%;height: 200px;">
		<view class="stobanner" style="height: 200px;">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500" style="height: 200px;">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image class="imgsLog" :src="'http://hbk.huiboke.com'+item" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [],
				dotStyle: false,
			}
		},
		methods: {
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
		},
		created() {
			const _this = this
			//将轮播图的数据 取出来
			uni.getStorage({
				key:"detailsbanner",
				success(resbanner) {
					_this.swiperList = resbanner.data
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	// 新品活动图片  Img
	.newestActivity{
		// margin-top: 20rpx;
	}
	
	
	
</style>
