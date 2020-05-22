<template>
	<view class="logobg">
		<view class="logo">
			<!-- 这里是平台的logo -->
			<view class="cu-avatar xl round margin-left logHeadportrait" style="background-image:url('/static/logo.png')"></view>
		</view>
	</view>
</template>

<script>
	
</script>

<style lang="less" scoped>
	page{
		background-color: #fff;
	}
	.logobg{
		.logo{
			display:flex;
			justify-content: center;
			align-items: center;
			height:300rpx;
			.logHeadportrait{
				border-radius:20rpx;
			}
		}
	}
</style>
