<template>
	<view class="storerecommended">
		<scroll-view scroll-y="true" class="scroll-view">
			<view class="storerecommended-title">
				<text>热销宝贝</text>
			</view>
			<horizontallylist :horizontallylist="horizontallylist"></horizontallylist>
		</scroll-view>
		
	</view>
</template>

<script>
	import horizontallylist from "@/components/sortinglist/horizontallylist.vue"
	export default{
		data(){
			return {
				
			}
		},
		components:{
			horizontallylist
		},
		props:["horizontallylist"]
	}
</script>

<style lang="less" scoped>
	.storerecommended-title{
		color:#000;
		padding-left:16rpx;
		margin:28rpx 0;
		text{
			font-size: 33rpx;
			color:#565656;
			font-weight: bold;
		}
	}
	.scroll-view{
		height:80vh;
	}
</style>
