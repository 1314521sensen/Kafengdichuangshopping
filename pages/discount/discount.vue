<template>
	<!-- 折扣页面 -->
	<view class="discounts">
		<!-- 折扣背景图 -->
		<view class="discountBack" :style="{'background-image':'url('+this.$store.state.httpUrl+'/discount/discountbg.gif'+')'}">
		
		</view>
		<!-- 分类 -->
		<view class="classify">
			<!-- tabactive -->
			<view 
				:class="indexs==index?'tabactive':''"
				v-for="(item,index) in discountnavlist" 
				:key="index" 
				@tap="navTab" 
				:data-index="index"
			>{{item}}</view>
		 </view>
		<!-- 马上抢 -->
		<view class="ImmediatelyGrab">
			<scroll-view>
				<!-- 单个产品 -->
				<view class="singleProduct">
					<image src="/static/discount/discountshop.png"></image>
					<!-- 介绍以及抢购数量 -->
					<view class="introduce">
						<view class="cream"> 抖音爆款泡泡面膜补水美白保湿排毒深层...</view>
						<view class="cream-bottom"> 
						    <text class="robbed">已抢1754件</text>
							<view class="cu-progress radius striped active">
								<view class="bg-red" :style="[{ width:loading?'70%':''}]">70%</view>
							</view>
						</view>
					</view>
					<!-- 马上抢购 -->
					<view class="Snapped">
						<view class="current ">￥8.9</view>
						<view class="original">￥599.9</view>
						<view class="Immediately">
							<text >马上抢</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				discountnavlist:[
					"精选",
					"百货家访",
					"手机数码",
					"女装男装",
				],
				indexs:0,
			}
		},
		methods: {
			navTab(e){
				this.indexs = parseInt(e.currentTarget.dataset.index)
			}
		},
		onLoad() {
			let that = this;
			setTimeout(function() {
				that.loading = true
			}, 500)
		},
	}
</script>

<style lang="less" scoped>
	.discounts{
		background-color: #951d0d;
		padding-bottom:40rpx;
		.ImmediatelyGrab{
			
		}
		.discountBack{
			height:100vh;
			// background:url('/static/discount/discountbg.png') no-repeat;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			display: flex;
			justify-content: space-around;
			align-items: flex-end;
			// padding-bottom:100rpx;
				// 满减
				.special{
					display: flex;
					justify-content: center;
					align-items: center;
					color: #FFFFFF;
					font-size: 12px;
					
					.specialborder{
						display:inline-block;
						width: 36rpx;
						height:3rpx;
						background-color: #fff;
					}
					.special-preferential{
						margin:0 10rpx;
					}
				}
				.Brought{
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					background-color: #fff;
					margin: 16rpx auto 0;
					line-height: 50rpx;
					text-align: center;
					color: #951d0d;
					font-size: 30rpx;
					font-weight: bold;
				}
		}  	
		.classify{
			// height: 70rpx;
			// margin-top: -30rpx;
			background-color: #bf786d;
			display: flex;
			justify-content:space-around;
			align-items: center;
			padding:15rpx 0;
			view{
				background-color: #9d2f1f;
				color: #FFFFFF;
				padding: 4rpx 18rpx;
				border-radius: 10rpx;
				font-size: 14px;
				font-weight: 500;
			}
			.tabactive{
				color:#993428;
				background-color: #fff;
			}
		}
		// 单个产品
		.singleProduct{
			padding-left: 10rpx;
			margin-top: 50rpx;
			height: 250rpx;
			background-color: #FFFFFF;
			// border-bottom: 35rpx solid #951d0d;
			display: flex;
			image{
				width: 235rpx;
				height: 230rpx;
				margin-top: 10rpx;
			}
			.introduce{
				width: 275rpx;
				margin-left: 15rpx;
				
				.cream{
					margin-top: 35rpx;
					overflow:hidden;
					text-overflow:ellipsis;
					display:-webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient:vertical;
				}
				.robbed{
					display:inline-block;
					font-size:24rpx;
					color: #ccc;
					margin-bottom:20rpx;
				}
				.cream-bottom{
					margin-top:20rpx;
				}
			}
			// 抢购
			.Snapped{
				width: 210rpx;	
				border-left:2rpx solid #4e0b02; 
				.current{
					font-size: 22px;
					margin-top: 42rpx;
					color: red;
					text-align: center;
				}
				.original{
					font-size: 16px;
					color: #CCCCCC;
					text-decoration:line-through;
					margin-top: 20rpx;
					text-align: center;
				}
				.Immediately{
					width: 165rpx;
					height: 50rpx;
					text-align: center;
					margin-top: 15rpx;
					margin-left: 30rpx;
					background-color: #951d0d;
					color: #fff;
					line-height: 50rpx;
					text-align: center;
					border-radius: 10rpx;
				}
			}
		}
	}
   
</style>
