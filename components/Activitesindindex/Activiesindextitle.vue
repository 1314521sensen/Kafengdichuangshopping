<template>
	<view class="Activiesindextitle">
		<view class="Activiesindextitlecenter" :style="{'color':textcolor,'background-image':'url(/static/Activirsindex/titlebg.png)'}">
			{{titlemsg}}
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		props:["titlemsg","textcolor"]
	}
</script>

<style lang="less" scoped>
	.Activiesindextitle{
		display:flex;
		justify-content: center;
		align-items: center;
		.Activiesindextitlecenter{
			width: 50%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			line-height:90rpx;
			text-align: center;
			font-size: 40rpx;
			font-weight: bold;
		}
	}
</style>
