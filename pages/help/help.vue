<template>
	<!-- 最大的盒子 -->
	<view class="help">
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- 上面的导航 -->
		<actionbar message="帮助中心" url="/pages/index/index"></actionbar>
		 <!-- 联系客服的背景图 -->
		 <view class="callCenter" :style="{'background-image':'url(/static/help/helpbg.png)'}">
			 <view class="wholeheartedly">竭诚为你服务</view>
			 <!-- 电话号码 -->
			 <view class="phone">服务热线:400-8888-888</view>
		 </view>
		 <!-- 常见问题 -->
		 <view class="problem">
			 <view class="problem_issue">常见问题</view>
			 <!-- 循环这 -->
			 <view class="problemlist" v-for="(item,index) in problemlist" :key="index">{{item}}</view>
		</view>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp()
	export default{
		data(){
			return {
				statusBar:0,
				problemlist:[
					"收到商品有问题如何处理",
					"收到商品有问题如何处理",
					"收到商品有问题如何处理",
					"收到商品有问题如何处理",
					"收到商品有问题如何处理",
					"收到商品有问题如何处理"
				]
			}
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		components:{
			actionbar
		}
	}
</script>

<style lang="less" scoped>
	.help{
		// height: 667rpx;
		background-color: #fff;
	}
	.callCenter{
		border-top: 1px solid rgba(255,255,255,0);
		width: 100%;
		height: 450rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		
		.wholeheartedly{
			margin-left: 40rpx;
			margin-top: 140rpx;
			font-size: 28px;
		}
		.phone{
			margin-top: 25rpx;
			margin-left: 40rpx;
			font-size: 18px;
		}
	}
	.problem{
		width: 670rpx;
		// height: 800rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		background-color: #fff;
		padding-bottom:40rpx;
		.problem_issue{
			font-size: 18px;
			margin-top:30rpx;
			color: #000;
		}
		.problemlist{
			padding-bottom:20rpx;
			border-bottom:2rpx solid #807d7d;
		}
		view{
			margin-top: 30rpx;
			color:#807d7d;
		}
		text{
			display: inline-block;
			width: 100%;
			height: 2rpx;
			margin-top: 30rpx;
			background-color:#807d7d;
		}
	}
</style>
