<template>
	<!-- 为你推荐 -->
	<view class="recommend-wrapper bg" :style="{'background-color':bg?bg:'#fff',height:height?height+'rpx':86+'rpx'}">
		<text class="border" :style="{'background-color':bordercolor?bordercolor:'#ccc'}"></text>
		<text class="recommend">{{ title }}</text>
		<text class="border" :style="{'background-color':bordercolor?bordercolor:'#ccc'}"></text>
	</view>
</template>

<script>
	
	export default {
		props: ['title','bg',"height","bordercolor"]
	}
</script>
<style lang="less" scoped>
	.recommend-wrapper {
	  
	  text-align: center;
	  line-height: 72rpx;
	  // background-color: #f5f5f5;
	  width: 100%;
	  height: 86rpx;
	  margin-bottom: 20rpx;
	  
	  .recommend {
	   margin: 0 26rpx;
	   vertical-align: middle;
	   font-size: 30rpx;
	   font-weight: bold;
	  }
	  .border {
	   display: inline-block;
	   vertical-align: middle;
	   width: 42rpx;
	   height: 4rpx;
	   background-color: #ccc;
	  }
	 }
	
</style>