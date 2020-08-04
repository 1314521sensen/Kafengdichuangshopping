<template>
	<view>
		<!-- 给下拉加一层卷曲 -->
		<view class="scroBox">
		<!-- 	<scroll-view scroll-y='true' > -->
				<view class="RemainingGroup_flex">
					<view class="RemainingGroup">
						<!-- 单个产品 -->
						<view class="particulars" 
							v-for="(item,index) in lists" 
							:key="index" 
							@tap="linkDetails"
							:data-g_id = 'item.good_id'
							:data-s_id = 'item.store_id'
						>
							<view class="particulars_bg" :style="{'background-image':'url('+'http://hbk.huiboke.com'+item.good_pic+')'}">
								
								<view class="brokerage">
									佣金: <text>￥{{item.brokerage}}</text>
								</view>
							</view>
							<view class="detailedIntroduct">
								<view class="trademark">{{item.good_title}}</view>
								<view class="groupbuying">
									团购总数:<text class="strollnum">{{item.Thetotalnum}}</text>
									剩余:<text class="surplusnum">{{item.remain}}</text>
								</view>
								<!-- 价格  -->
								<view class="detailed_price">
									<text class="nowPrice">￥{{item.good_promotion_price}}</text>
									<text class="formerPrice">￥{{item.good_price}}</text>
									
								</view>
							</view>
						</view>
					</view>
				</view>
			<!-- </scroll-view> -->
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				// 商品详细
				GoodsList:[
					{
						urls:'/static/headearning/cap.png',  //
						brokerage:20,
						referral:'[即插即听]汽车车载U盘16G/32G抖音...', //
						Thetotalnum:10,
						remain:1,
						originalprice:600,   //
						presentprice:200     //
					}
				]
			}
		},
		props:['lists'],
		created() {
			// const _this = this
			// uni.getStorage({
			// 	key:'bindtokey',
			// 	success(res) {
			// 		uni.request({
			// 			url:`${app.globalData.Requestpath}good/getCommanderGoodList`,
			// 			method:'POST',
			// 			data:{
			// 				// token:res.data  
			// 				page:1,
			// 				pageSize:1
			// 			},
			// 			success(res) {
			// 				if(res.data.data == 0){
			// 				  _this.GoodsList = res.data.data
							   
			// 				}
			// 			}
			// 		})
			// 	}
			// })	
		},
		methods: {
			linkDetails(e){
				let {g_id,s_id} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Details/Details?id=${g_id}&storeid=${s_id}&type=3`
				})
			}
		},
		created() {
			const _this = this
			uni.getStorage({
				key:'bindtokey',
				success(res){
					uni.request({
						url:`${app.globalData.Requestpath}user/getUserDetail`,
						method:"POST",
						data:{
							token:res.data,
						},
						success(res) {
							console.log(res,456)
							if(res.data.code==0){
								
							}
						}
					})
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	// 剩余多少团购产品
	.RemainingGroup_flex{
		display: flex;
		justify-content: center;
		.RemainingGroup{
			width: 690rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 20rpx;
			// padding-bottom: 100rpx;
			// 每个商品   
			.particulars{
				width: 335rpx;
				// height: 525rpx;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				margin-bottom: 20rpx;
				.particulars_bg{
					background-repeat: no-repate;
					background-size: 100% 100%;
					height: 290rpx;
					display: flex;
					justify-content: flex-end;
					border-radius: 10rpx;
					.brokerage{
						height: 55rpx;
						background-color: #000;
						opacity: .8;
						text-align: center;
						line-height:55rpx;
						color: #FFFFFF;
						padding: 4rpx 8rpx;
						text{
						   color: red;
						   font-weight: bold;
						}
					}
				}
				// 详细介绍
				.detailedIntroduct{
					padding-bottom: 15rpx;
					padding-left: 20rpx;
					.trademark{
						font-size: 30rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.groupbuying{
						margin: 15rpx 0 22rpx 0 ;
						font-size: 24rpx;
						color: #666;
						.strollnum{
							margin: 0 16rpx 0 16rpx;
						}
						.surplusnum{
							margin-left: 16rpx;
						}
					}
					// 价格 
					.detailed_price{
						color: red;
						// 先价格
						.nowPrice{
							font-size: 38rpx;
							color: red;
						}
						// 原来的价格
						.formerPrice{
							text-decoration: line-through;
							color: #666;
							// margin: 0 12rpx 0 20rpx;
						}
						.former_text{
							padding: 4rpx 25rpx;
							color: #FFFFFF;
							background-color: #fea333;
							border-radius: 10rpx;
						}
					}
				}
			}
		}
		
	}
</style>
