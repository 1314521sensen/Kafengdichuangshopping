<template>
	<view class="Successful_opening_store" :style="{'background-image':'url('+this.$store.state.httpUrl+'carddianpu/opening.jpg)'}">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
			setTimeout(()=>{
				uni.switchTab({
					url:"/pages/index/index"
				})
			},3000)
		}
	}
</script>

<style lang="less" sscoped>
	.Successful_opening_store{
		height:100vh;
		background-size:100% 100%;
		background-repeat: no-repeat;
	}
</style>
