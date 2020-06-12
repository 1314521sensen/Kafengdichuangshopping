<template>
	<view class="headeadnings">
		<!-- 头部 -->
		<view class="witder" style="background-image: url(/static/headearning/headnav_bg.png)" :style="{'padding-top':statusBar+'rpx'}">
			<view class="header_nav">
				<text class="lg text-gray cuIcon-back" @tap="returnmypeoby"></text>
			</view>
		</view>
		<!-- 头像和名字 -->
		<view class="PhonenameBox">
			<view><image class="LO_Phone" src="/static/headearning/beautyace.png" mode=""></image></view>
			<view class="name">美了美了美了</view>
		</view>
		<!-- 详细收益等 -->
		<view class="earnings_flex">
			<view class="earnings">
				<view class="ThepromotingBox" v-for="(item,index) in ThepromotingBoxs" :key='index'>
					<text class="Thetext">{{item.Thetext}}</text>
					<text class="Theearnings">{{item.Theearnings}}</text>
				</view>
			</view>
		</view>
		<!-- 商品  详细 提现等 -->
		<elaborate></elaborate>
		<!-- 剩余团购数量 -->
		<productlist></productlist>
	</view>	
</template>
	
<script>
	const app = getApp()
	// 商品，提现等
	import elaborate from "@/components/headarnings/elaborate.vue"
	// 商品列表
    import productlist from "@/components/headarnings/productlist.vue"
	export default {
		data() {
			return {
			   ThepromotingBoxs:[{
					   Thetext:100,
					   Theearnings:'推广人数'
				   },
				   {
					   Thetext:'RMB200',
					   Theearnings:'昨日收益'
					},
				   {
					   Thetext:'RMB200',
					   Theearnings:'积累佣金'
				    }],
					statusBar:0
			   } 
		 },
		methods: {
			returnmypeoby(){
				uni.switchTab({
					url:"/pages/PersonalMy/PersonalMy"
				})
			}
		},
		components:{
			elaborate,
			productlist,
			
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>
  
<style lang="less" scoped>
	.headeadnings{
		.witder{
			height: 440rpx;
			background-size: 100% 100%;
			overflow: hidden;
			.header_nav{
				margin: 20rpx 0 0 10rpx;
				.cuIcon-back{
					font-size: 50rpx;
					color: #FFFFFF;
				}
			  }
			}
		// 名字和图片
		.PhonenameBox{
			 display: flex;
			 flex-direction: column;
			 align-items: center;
			 margin-top: -325rpx;
			 color: #FFFFFF;
			image{
				width:130rpx;
				height: 130rpx;
				border-radius: 50%;
			}
			.name{
				margin: 15rpx 0;
				font-size: 32rpx;
			}
		}
		.earnings_flex{
			display: flex;
			justify-content: center;
			margin-top: 20rpx;
			.earnings{   
				width: 690rpx;
				height: 190rpx;
				background-color: #FFFFFF;
				display: flex;
				flex-wrap: wrap;
				border-radius: 10rpx;
				box-shadow: 5rpx 5rpx 10rpx #ccc;
				.ThepromotingBox{
					// padding-top: 40rpx;
					display: flex;
					flex-grow: 1;
					flex-direction: column;
					align-items: center;
					justify-content: space-evenly;
					margin-top: 20rpx;
					.Theearnings{
						color: #666666;
						font-size: 30rpx;
					}
				}
			}
		}
		.text-gray{
			font-size: 35rpx;
		}
	}
	
</style>
