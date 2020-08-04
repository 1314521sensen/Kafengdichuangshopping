<template>
	<view class="applygroup" @tap="applygroup">
		<view class="applygroupbgimg" :style="{'background-image':'url('+this.$store.state.httpUrl+'/applygrup/applybg.gif)'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				vipvalue:0
			}
		},
		methods: {
			applygroup(){
				if(this.vipvalue==0){
					//当用户还未支付369或3690的时候 跳到申请团长页面
					uni.redirectTo({
						url:`/pages/groupinformation/groupinformation`
					})
				}else{
					//当用户支付完成的时候 跳到团长推广的页面
					uni.redirectTo({
						url:`/pages/headearnings/headearnings`
					})
				}
			}
		},
		created(){
			const _this = this
			uni.getStorage({
				key:"beesVip",
				success(resvip) {
					_this.vipvalue = resvip.data
				}
			})
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
