<template>
	<view>
		<scroll-view class="evaluate" scroll-y="true" >
			<view class="order-evaluation" 
				v-for="(item,index) in this.$store.state.evaluationlist" 
				:key="index" 
			>
				<view v-for="(items,indexs) in $store.state.evaluationlistitem[index]" :key="indexs">
					<!-- {{yuming+items.good_pic}} -->
					<view class="company-top">
						{{item.store_name}}
					</view>
					<view class="company-bottom">
						<view class="bottom-left">
							<view 
								class="bottom-img" 
								 :data-g_id="items.good_id"
								 :data-s_id="item.store_id"
								  @tap="particulars"
							>
								<img :src="'http://hbk.huiboke.com'+items.good_pic" alt="">
							</view>
						</view>
						<view class="bottom-right">
							<view 
								class="introduce"
								:data-g_id="items.good_id"
								:data-s_id="item.store_id"
								 @tap="particulars"
							>
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
										v-if="item.iscomment==0"
									>评价</button>
								</view>
							</view>
						</view>
					</view>
				</view>
		</view>
		</scroll-view>
		<!-- <loading v-if="loadingbool"></loading> -->
	</view>
</template>

<script>
	const app = getApp()
	export default {
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
			particulars(e){
				//当点击的时候跳转到详情页
				//根据index和我的组件中传过来的url 判断跳到哪里
				let {g_id,s_id} = e.currentTarget.dataset
				uni.navigateTo({
                   url:`/pages/Details/Details?id=${g_id}&storeid=${s_id}`
               })
			}
		},
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
