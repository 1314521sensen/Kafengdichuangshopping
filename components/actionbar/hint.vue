<template>
	<view class="hint" :style="{'height':height+'vh'}">
		<!-- 暂无页面 -->
		<view class="hint-box">
			{{message}}
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		props:['height',"message"]
	}
</script>

<style lang="less" scoped>
	.hint{
		display:flex;
		align-items: center;
		justify-content: center;
		height:94vh;
		// background-color:pink;
		.hint-box{
			font-size: 60rpx;
		}
	}
</style>
