<template>
	<view class="applygroup" @tap="applygroup">
		<view class="applygroupbgimg" :style="{'background-image':'url('+this.$store.state.httpUrl+'/applygrup/applybg.gif)'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			applygroup(){
				uni.redirectTo({
					url:`/pages/groupinformation/groupinformation`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.applygroup{
		// height:100vh;
		// background-color:red;
		.applygroupbgimg{
			background-size: 100% 100%;
			background-repeat: no-repeat;
			height:100vh;
		}
	}
</style>
