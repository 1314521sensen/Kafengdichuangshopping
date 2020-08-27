<template>
	<view class="limitedtimesecondskill">
		<!-- 活动图 -->
		<view class="activityGraph" :style="{'background-image':'url('+this.$store.state.httpUrl+'/limitedtimesecondskill/banner.gif)','background-size':'100% 100%'}"></view>
		<!-- 活动规则 -->
		<view class="activityRules"  :style="{'background':'url('+this.$store.state.httpUrl+'/limitedtimesecondskill/activityUrl.png)','background-repeat':'no-repeat'}">
			<view class="titie">活动规则</view>
			<view class="regulation">没件商品数量有限，秒杀完立即恢复原价</view>
		</view>
		<!-- 爆款推荐 -->
		<view class="HotStyleToRecommend">
			<view class="Hot_tit">今日爆款</view>
			<!-- 爆款列表 -->
			<view class="Hot_list">
				<!-- 单个产品 -->
				<view class="particular">
					<view>
						<image class="cap" src="/static/limitedtimesecondskill/cap.png" mode=""></image>
						<view class="cu-progress radius striped active">
							<view class="bg-red bg-ck" :style="[{ width:loading?'30%':''}]">30%</view>
						</view>
						<view class="price">￥19.9</view>
					</view>
				</view>
				<view class="particular">
					<view>
						<image class="cap" src="/static/limitedtimesecondskill/cap.png" mode=""></image>
						<view class="cu-progress radius striped active">
							<view class="bg-red bg-ck" :style="[{ width:loading?'30%':''}]">30%</view>
						</view>
						<view class="price">￥19.9</view>
					</view>
				</view>
				<view class="particular">
					<view>
						<image class="cap" src="/static/limitedtimesecondskill/cap.png" mode=""></image>
						<view class="cu-progress radius striped active">
							<view class="bg-red bg-ck" :style="[{ width:loading?'30%':''}]">30%</view>
						</view>
						<view class="price">￥19.9</view>
					</view>
				</view>
				<view class="particular">
					<view>
						<image class="cap" src="/static/limitedtimesecondskill/cap.png" mode=""></image>
						<view class="cu-progress radius striped active">
							<view class="bg-red bg-ck" :style="[{ width:loading?'30%':''}]">30%</view>
						</view>
						<view class="price">￥19.9</view>
					</view>
				</view>
				<view class="particular">
					<view>
						<image class="cap" src="/static/limitedtimesecondskill/cap.png" mode=""></image>
						<view class="cu-progress radius striped active">
							<view class="bg-red bg-ck" :style="[{ width:loading?'30%':''}]">30%</view>
						</view>
						<view class="price">￥19.9</view>
					</view>
				</view>
			</view>
		</view>
	    <!-- 今日秒杀 -->
		<view class="seckillBox">
			<view class="second_tlt">今日秒杀</view>
			<view class="Secondskillactivity">
				<!-- 日期 -->
				<view class="dateline_cen">
					<view class="dateline">
						<text class="dateline_time">5月20日</text>
						<text>5月21</text>
						<text>5月22</text>
						<text>5月23</text>
						<text>5月24</text>
					</view>
				</view>
				<!-- 时间 data -->
				<view class="quantum">
					<scroll-view scroll-x class="bg-white nav top_nav" scroll-with-animation :scroll-left="scrollLeft">
						<view class="cu-item" :class="index==TabCur?'text-green ':''" v-for="(item,index) in timiData" :key="index" @tap="tabSelect" :data-id="index">
							{{item}}
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 抢购环节 -->
		<view class="SnappingUpLink">
			<view class="SnappingUpLink_tit">
				<!-- 结束前 -->
				<view class="beforeTheEnd ">
					<text class="lg text-white cuIcon-remind Cuicon"></text>
					<text class="TheEnd">距离结束仅剩</text>
				</view>
				<!-- 倒计时 -->
			   <view class="countDown">
				   <text>24</text>
				   <view class="mao">:</view>
				   <text>00</text>
				   <view class="mao">:</view>
				   <text>00</text>
			   </view>
			</view>
			<!-- ////////////////////////////////// --> 
			<view class="ImmediatelyGrab">
				<!-- 单个产品 -->
				<view class="singleProduct">
					<!-- 秒杀图片 -->
					<view class="seckillBgBOx">
						<image class="seckillBg" src="/static/limitedtimesecondskill/seckill.png" mode=""></image>
						<image src="/static/limitedtimesecondskill/Protect.png" mode=""></image>
					</view>
					<view class="introduce">
						<view class="products_brief">【抖音】爆款泡泡面膜补水美白保湿排毒深层......</view>
						<view class="sellNum">
							<view>
								<view class="cu-progress radius striped active">
									<view class="bg-red bg-ck" :style="[{ width:loading?'30%':''}]">30%</view>
								</view>
								 <text class="robbed">已抢54件</text>
							</view>
						</view>
						<view class="purchasepri">
							<view>
								<text class="current ">￥8.9</text>
								<text class="original">￥599.9</text>
							</view>
							<view class="Immediately">
								<text >马上抢</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		 
		
		
		</view>
			
		
			
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			   timiData:['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],
			   scrollTop: 0,
			   TabCur: 0,
			   scrollLeft: 0,
			   old: {
			  	    scrollTop: 0,
			   },
			   	loading: false
			}
		},
		onLoad: function() {
			let that = this;
			setTimeout(function() {
				that.loading = true
			}, 500)
		},
		methods: {
			upper: function(e) {
                // console.log(e)
			},
			lower: function(e) {
				// console.log(e)
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="less" scoped>
	.limitedtimesecondskill{ 
		background-color: #F9484b;
		// 活动图   
		.activityGraph{
			height: 380rpx;
			background-size: 100% 100%;
		}
		// 爆款推荐
		.HotStyleToRecommend{
			width: 690rpx;
			background-color: #FFFFFF;
			margin: 55rpx auto 0;
			padding-top: 15rpx;
			border-radius: 16rpx;
			.Hot_tit{
				font-size: 34rpx;
				margin:5rpx 0 15rpx 15rpx;
			}
			// 列表
			.Hot_list{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				padding: 0 10rpx;
				//单个商品
				.particular{
					width: 162rpx;
					height: 245rpx;
					display: flex;
				    flex-direction: row;
					justify-content: center;
					padding:0 10rpx;
					.cap{
						width: 155rpx;
						height: 155rpx;
					}
					.bg-ck{
						background-color: #951d0d;
						color: #fff;
						text-indent: 2.5rem;
					}
					.active{
						background-color: #ca8e86;
						width: 130rpx;
						margin-left: 10rpx;
					}
					// 价格
					.price{
						font-size: 18px;
						color: #951d0d;
						margin-left: 10rpx;
						margin-top: 6rpx;
					}
				}
			}
		}
		// 今日秒杀
		.seckillBox{
			// height: 200rpx;
			margin-top: 60rpx;
			margin: 50rpx 0 25rpx 0;
			
			.second_tlt{
				height: 55rpx;
				width: 335rpx;
				background-color: #fb9292;
				border-radius: 8rpx;
				margin-left: 380rpx;
				text-align: center;
				line-height: 55rpx;
				color: #970d1b;
			}	
			.Secondskillactivity{
				display: flex;
				flex-wrap: wrap;
			}
			.dateline_cen{
				width: 100%;
				display: flex;
				justify-content: center;
			}
			.dateline{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				border-top-left-radius: 8rpx;
				border-top-right-radius: 8rpx;
				align-items: flex-end;
				text{
				   line-height: 50rpx;
				   height: 50rpx;
				   text-align: left;
				   border-top-left-radius: 8rpx;
				   border-top-right-radius: 8rpx;
				   padding: 5rpx 26rpx 0 30rpx;
				   box-shadow: 5rpx 10rpx 10rpx 3rpx #CCCCCC;
				   background-color: #fff;
				}
				.dateline_time{
					height: 70rpx;
					line-height: 70rpx;
					background-color: #fff;
					border-top-left-radius: 8rpx;
					border-top-right-radius: 8rpx;
				}
			}
			
			.quantum{
				 width:750rpx;
				height: 60rpx;
				line-height: 60rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				background-color: #fff;
				padding: 0 30rpx;
				text{
					border-radius: 5rpx;
					width: 110rpx;
				}
			}
		}
		// 活动规则 
		.activityRules{
			height: 100rpx;
			.titie{
				font-size: 16px;
				color: #fff55d;
				text-align:center;
				padding-top: 4rpx;
			}
			.regulation{
				color: #fff;
				text-align: center;
				margin-top: 8rpx;
			}
		}
		// 抢购环节 F9484b
		.SnappingUpLink{
			background-color: #F9484b;
			// 结束前
			.beforeTheEnd{
				margin-left: 60rpx;
				text-align: center;
				color: #fff;
				.TheEnd{
					margin-left: 8rpx;
				}
				.Cuicon{
					font-size: 50rpx;
				}
			}
			// 倒计时 
			.countDown{
				text-align: center;
				margin: 12rpx 0 10rpx 0;
				text{
					background-color: #fff;
					margin-left: 12rpx;
					border-radius: 12rpx; 
					color: #e72833;
					padding: 2rpx 2rpx;
				}
				.mao{
					display: inline;
					color: #FFFFFF;
					margin-left: 8rpx;
				}
			}
		}
	}
	.ImmediatelyGrab{
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;
		padding-bottom: 60rpx;
		background-color: #F9484b;
	}
	// 单个产品
	.singleProduct{
		width: 690rpx;
		padding-left: 10rpx;
		height: 250rpx;
		position: relative;
		background-color: #FFFFFF;
		display: flex;
		margin: 0 auto 20rpx;
		.seckillBg{
			z-index: 999;
			width: 80rpx;
			height: 80rpx;
			position: absolute;
			left: 0;
			top: 0;
		}
		.seckillBgBOx{
			display: flex;
			flex: 1;
		}
		image{
			width: 235rpx;
			height: 230rpx;
			margin-top: 10rpx;
		}
		.introduce{
			width: 100%;
			margin-left: 15rpx;
			.products_brief{
				padding-top:20rpx;
				line-height: 40rpx;
				width: 380rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.sellNum{
				margin: 15rpx 10rpx 15rpx 5rpx;
				display: flex;
				flex-wrap: wrap;
				.active{
					width: 120rpx;
					text-indent: 2.5rem;
					background-color: #ca8e86;
					margin-right: 20rpx;
					view{
						background-color: #951d0d;
					}
				}
			}
			.purchasepri{
				 display: flex;
				 flex-wrap: wrap;
				 align-items: center;
				 	.Immediately{
					width: 180rpx;
					margin-left: 20rpx;
					background-color: #cb341c;
					color: #fff;
					line-height: 50rpx;
					text-align: center;
					border-radius: 10rpx;
			}
			}
			.time_da{
				border-radius: 8rpx;
				margin: 20rpx 10rpx 20rpx 4rpx;
				display: inline-block;
				width: 130rpx;
				text-align: center;
			}
			.cream{
				margin-top: 35rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.robbed{
				color: #ccc;
			}
			.current{
				font-size: 38rpx;
				color: red;
				margin: 4px 2rpx;
			}
			.original{
				margin-left: 4px;
				text-decoration: line-through;
				color: #CCCCCC;
			}
			
		}
		// 抢购
		.Snapped{
			width: 210rpx;	
			
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
				// margin-top: 20rpx;
				text-align: center;
				color: red;
			}
		}
	}
	// 时间的那个导航
	.top_nav{
		height: 60rpx;
		line-height: 60rpx;
	}
	//时间导航里面的内容
	.cu-item{
		line-height: 60rpx;
		height: 60rpx;
		color: #96eboc;
	}
	.text-green{
		color: #96140b;
	}
  
</style>
