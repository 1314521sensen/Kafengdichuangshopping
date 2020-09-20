<template>
	<view class="nopage">
		<!-- 暂无页面 -->
		<view class="nopages-box">
			<text>{{prompttext}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:["prompttext"]
	}
</script>

<style lang="less" scoped>
	.nopage{
		display:flex;
		align-items: center;
		justify-content: center;
		height:94vh;
		// background-color:pink;
		.nopages-box{
			font-size: 60rpx;
		}
	}
</style>
