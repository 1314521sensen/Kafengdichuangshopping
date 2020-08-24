<template>
	<view class="applygroup" @tap="applygroup">
		<view class="applygroupbgimg" :style="{'background-image':'url('+this.$store.state.httpUrl+'/applygrup/applybg.gif)'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				beesgrouplong:0,//这是团长的
			}
		},
		methods: {
			applygroup(){
				if(parseInt(this.beesgrouplong)!==2){
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
			//取出团长的缓存 判断团长的有没有申请成功
			uni.getStorage({
				key:"beesgrouplong",
				success(reslong){
					_this.beesgrouplong = reslong.data
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
