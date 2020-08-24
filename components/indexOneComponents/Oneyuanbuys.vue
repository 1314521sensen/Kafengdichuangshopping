<template>
	<view class="OneyuanbuysBox">
		<view 
			class="Oneyuanbuys" 
			:style="{'background-image':'url('+this.$store.state.httpUrl+'Oneyuanbuy/Oneyuanbuys.png'+')'}"
			@tap="discount"
		>
			<text 
				v-for="(item,index) in textnavlist" 
				:key="index"
			>
				{{item}}
			</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				textnavlist:["新","人","首","单","疯","狂","开","抢"]
			}
		},
		methods:{
			discount(){
				uni.navigateTo({
					url:`/pages/discount/discount`
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	.OneyuanbuysBox{
		padding:0 20rpx;
		margin-top:34rpx;
		.Oneyuanbuys{
			display:flex;
			justify-content: center;
			align-items: center;
			height:140rpx;
			// background-color:yellow;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			font-weight: bold;
			font-size: 35rpx;
			text{
				margin:20rpx 15rpx 0 0;
				transform-style: preserve-3d;
				animation:myfirst 5s infinite linear;
			}
		}
		
	}
	@keyframes myfirst
	{
		0% {color:#fff;}
		25% {transform: rotateY(0deg);color:#fff;}
		50% {transform:rotateY(360deg);font-size:40rpx;}
		75% {font-size:35rpx;}
		100% {color:#ff4040;transform: rotateY(0deg);}
	}
</style>
