<template>
	<view class="storevideo">
		<button @tap="videojump">直播</button>
	</view>
</template>

<script>
	export default{
		methods:{
			//这里要跳转携带参数
			videojump(){
				uni.navigateTo({
					url:`/pages/Livecover/Livecover`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.storevideo{
		
	}
</style>
