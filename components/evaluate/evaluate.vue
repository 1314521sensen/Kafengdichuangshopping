<template>
	<view>
		<scroll-view class="evaluate" scroll-y="true" >
			<view class="order-evaluation" v-for="(item,index) in evaluatelist" :key="index">
				<view v-for="(items,indexs) in shopinglist[index]" :key="indexs">
					<!-- {{yuming+items.good_pic}} -->
					<view class="company-top">
						{{item.store_name}}
					</view>
					<view class="company-bottom">
						<view class="bottom-left">
							<view class="bottom-img">
								<img :src='yuming+items.good_pic' alt="">
							</view>
						</view>
						<view class="bottom-right">
							<view class="introduce">
								<text class="introduce-text">{{items.good_name}}</text>
							</view>
							<view class="price-number">
								<view>
									<text class="price" v-text="'￥'+items.good_price"></text>
									<text class="number">&times;{{items.good_num}}</text>
								</view>
								<view class="evaluation-btn">
									<button class="cu-btn round" 
										:data-ordersn="item.order_sn" 
										:data-gooid="items.good_id"
										:data-img="items.good_pic"
										:data-goodname="items.good_name"
										@tap="changevaluation"
										
									>评价</button>
								</view>
							</view>
						</view>
					</view>
				</view>
		</view>
		</scroll-view>
		<loading v-if="loadingbool"></loading>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				tokey:"",
				evaluatelist:[],//这是几个订单
				loadingbool:true,
				shopinglist:[],//这是这个订单下的几个商品 类似购物车一样
				yuming:"",
			};
		},
		methods:{
			changevaluation(e){
				let ordersnbianhao =  e.currentTarget.dataset.ordersn
				let shopgooid = e.currentTarget.dataset.gooid
				let imgs = e.currentTarget.dataset.img
				let goodname = e.currentTarget.dataset.goodname
				uni.navigateTo({
					url:`/pages/starevaluation/starevaluation?ordersnbianhao=${btoa(ordersnbianhao)}&shopgooid=${btoa(shopgooid)}&img=${imgs}&goodname=${goodname}`
				})
			},
		},
		created(){
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					//检测tokey过没过期
					app.globalData.Detectionupdatetokey(res.data)
					_this.tokey = res.data
					uni.request({
						url:`${app.globalData.Requestpath}order/getConfirmPayOrderList`,
						method:"POST",
						data:{
							token:_this.tokey,
							page:1,
							pageSize:10,
						},
						success(resevaluatelist) {
							if(resevaluatelist.data.code==0){//待评价请求成功
								// console.log(resevaluatelist)
								//这是订单 的数组
								_this.evaluatelist = resevaluatelist.data.data.list
								//这是是否让加载出现
								_this.loadingbool = false
								//这是图片的前缀
								_this.yuming = app.globalData.imgyuming
								console.log(resevaluatelist.data.data.list)
								resevaluatelist.data.data.list.forEach((item,index)=>{
									console.log(item)
									// console.log(item.order_sn)
									uni.request({//根据商品的编号 去查订单内的订单商品
										url:`${app.globalData.Requestpath}order/getOrderGoodList`,
										method:"POST",
										data:{
											token:_this.tokey,
											order_sn:item.order_sn,
											page:1,
											pageSize:index
										},
										success(resshopid) {//根据订单号找到的商品
											
											if(resshopid.data.code==0){
												_this.shopinglist.push(resshopid.data.data.list)
											}
										}
									})
								})
							}
						}
					})
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #f2f2f2;
	}
	.evaluate{
	  height: 95vh;
	  
	 }
	.order-evaluation{
		width: 95%;
		background-color: white;
		margin: 20rpx auto 0;
		border-radius: 15rpx;
		// box-shadow: 0rpx 0rpx 0rpx #ccc;
		.company-top{
			width: 95%;
			margin: 0 auto;
			font-weight: bold;
			font-size: 30rpx;
			padding:16rpx 0;
		}
		.company-bottom{
			display: flex;
			justify-content:space-around;
			margin-top:8rpx;
			.bottom-left{
				padding-bottom: 20rpx;
				.bottom-img{
					width: 156rpx;
					height: 156rpx;
					img{
						width: 100%;
						height:100%;
					}
				}
			}
			
			.bottom-right{
				width: 65%;
				.price-number{
					display: flex;
					justify-content:space-between;
					margin-top:20rpx;
					.number{
						display:block;
						width: 100%;
						text-indent: 2.3em;
						color:#999;
					}
					.cu-btn{
						width: 136rpx;
						height: 40rpx;
						color: #FFFFFF;
						background-color: #ff0000;
						margin-top: 26rpx;
					}
				}
				.introduce{
					height:70rpx;
					.introduce-text{
						  display: -webkit-box;
						 -webkit-box-orient: vertical;
						 -webkit-line-clamp: 2;
						 overflow: hidden;
						 font-size: 26rpx;
						 font-weight:800;
					}
				}
				.price{
					display: block;
					color:#666;
					font-weight: 600;
				}
				
			}
		}
	}
</style>
