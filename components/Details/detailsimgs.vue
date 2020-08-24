<template>
	<view class="detailsimgs">
		<view class="imgs" v-for="(item,index) in imglist" :key="index">
			<image :src="imgpath+item" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	//这是详情的图片
	export default{
		data(){
			return {
				imgpath:this.$store.state.imgyuming
			}
		},
		props:["imglist"]
	}
</script>

<style lang="less" scoped>
	.detailsimgs{
		width: 100%;
		margin-bottom: 100rpx;
		.imgs{
			width: 100%;
			image{
				width: 100%;
				vertical-align:bottom;
			}
		}
	}
</style>
