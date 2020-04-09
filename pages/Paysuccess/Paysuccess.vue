<template>
	<view class="Paysuccess">
		<view class="padding-xs flex align-center Paysuccess-box">
			<view class="flex-sub text-center">
				<view class="solid-bottom text-xsl padding">
					<text class=" cuIcon-roundcheckfill text-green"></text>
				</view>
				<view class="padding Paysuccess-text">支付成功</view>
				<!-- 3秒钟返回 -->
				<view class="timesreturn">
					<text>{{num}}秒钟后将返回,请稍等...</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:3
			}
		},
		methods: {
			time(){
				let times = setInterval(()=>{
					this.num--
					if(this.num==0){
						clearInterval(times)
						this.num = 3
						uni.switchTab({
							url:"/pages/index/index"
						})
					}
				},1000)
			}
		},
		onLoad(){
			const _this = this
			_this.time()
		}
	}
</script>

<style lang="less" scoped>
	.Paysuccess{
		display:flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height:100vh;
		background-color: #fff;
		.Paysuccess-box{
			width: 100%;
			.Paysuccess-text{
				padding-top: 0;
				font-size: 32rpx !important;
				font-weight: bold;
			}
			.timesreturn{
				font-size: 26rpx;
				color:#999;
			}
		}
		
	}
</style>
