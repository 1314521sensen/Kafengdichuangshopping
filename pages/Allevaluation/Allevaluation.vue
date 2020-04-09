<template>
	<view class="Allevaluation">
		<pageheight :statusBar="statusBar"></pageheight>
		<seachinput value="" value2="" url="/pages/Details/Details"></seachinput>
		<view class="EvaluationContent">
			<!-- 这是小头像 -->
			<view class="minContent">
				<view class="padding">
					<!-- 头像动态的获取 -->
					<view class="cu-avatar sm round margin-left" 
						style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
				</view>
				<text>明天的我又努力了</text>
			</view>
			<!-- 这是评论的内容 -->
			<view class="content-area">
				外观材质：抛光的不错 气味大小：有些气味 直观感受：买来做床头柜的，比想象中大，看起来美美哒！ 
			</view>
		</view>
	</view>
</template>

<script>
	//先引用处理页面的状态栏的高度
	import pageheight from "@/components/pageheight/pageheight.vue"
	//引用搜索栏
	import seachinput from "@/components/sortinglist/seachinput.vue"
	//这是全部路由页面
	const app = getApp();
	export default {
		data() {
			return {
				//这是页面状态栏的高度初始化
				statusBar:0,
			}
		},
		methods: {
			
		},
		components:{
			pageheight,
			seachinput
		},
		onLoad(){
			// console.log(app.globalData)
			this.statusBar = app.globalData.statusBar
		},
	}
</script>

<style lang="less" scoped>
	.EvaluationContent{
		padding:20rpx 0;
		background-color: #fff;
		.minContent{
			display: flex;
			margin-top:20rpx;
			view{
				&:first-child{
					padding:0;
				}
			}
			text{
				margin-left:30rpx;
			}
		}
		.content-area{
			padding:0 20rpx 0 35rpx;
			font-size: 20rpx;
			margin-top:14rpx;
		}
	}
</style>
