<template>
	<view class="activityimg">
		<image @tap="linknew" :src="this.$store.state.httpUrl+'lin_shi/activity.gif'" mode=""></image>
	</view>
</template>	
<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			linknew(){
				uni.navigateTo({
					url:'/pages/Newgift/Newgift'
				})
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.activityimg{
		padding: 0 20rpx;
		image{
			width: 100%;
			height: 180rpx;
		}
	}
</style>
