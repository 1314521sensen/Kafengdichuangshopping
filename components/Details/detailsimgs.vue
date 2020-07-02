<template>
	<view class="detailsimgs">
		<view class="imgs" v-for="(item,index) in imglist" :key="index">
			<image :src="'http://hbk.huiboke.com'+item" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	//这是详情的图片
	export default{
		data(){
			return {
				
			}
		},
		props:["imglist"]
	}
</script>

<style lang="less" scoped>
	.detailsimgs{
		width: 100%;
		.imgs{
			width: 100%;
			margin:20rpx auto 0;
			image{
				width: 100%;
			}
		}
	}
</style>
