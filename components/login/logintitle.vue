<template>
	<view class="faenter">
	     <text class="enter">{{msg}}</text>
	</view>
</template>

<script>
	export default{
		props:["msg"]
	}
</script>

<style lang="less" scoped>
	.faenter{
	  text-align: center;
	  margin-bottom: 50rpx;
	  .enter{
	   display: inline-block;
	   height: 80rpx;
	   line-height: 80rpx;
	   border-bottom: 4rpx solid #e82b2c;
	   font-size: 34rpx;
	  }
	}
</style>
