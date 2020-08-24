<template>
	<view class="Livegoods">
		<view class="liveActionbar" :style="{'padding-top':(statusBar+10)+'rpx','background-color': '#55bae9'}">
			<view class="cu-bar minheight">
				<view class="action" @tap="returnliveshoplist">
					<text class="cuIcon-back text-gray"></text>
				</view>
				<view class="content text-bold" style="color: #FFFFFF;">
					上架商品
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="goods-list" @scrolltolower="scrolltolower">
			<view class="goods" v-for="(item,index) in goodsList" :key='index'>
				<view class="img">
					<image :src="imgpath+item.good_pic" mode=""></image>
				</view>
				<view class="details">
					<view class="details-text">
						<text>{{item.good_title}}</text>
					</view>
					<view class="commission">
						<text class="commission-text">佣金:</text><text class="commission-pic">￥{{item.live_cms}}</text>
					</view>
					<view class="goods-price">
						<view class="price">
							<text v-text="'￥'+item.good_price"></text>
						</view>
						<view class="sold-out">
							<button class="cu-btn round" @tap="soldout" :data-g_id="item.id">下架</button>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				store_state:'',
				goodsList:[],
				page:1,
				tokey:"",
				statusBar:0,
				imgpath:this.$store.state.imgyuming
			};
		},
		methods:{
			liveshoplist(){
				let _this = this
					uni.getStorage({
					key:"bindtokey",
					success(res){
						_this.tokey = res.data
						uni.request({
							url:`${app.globalData.Requestpath}live/getAnchorGoodList`,
							method:"POST",
							data:{
								token:res.data,
								page:_this.page,
								pageSize:10
							},
							success(res) {
								if(res.data.code==0){
									if(_this.page > 1){
										_this.goodsList = _this.goodsList.concat(res.data.data.list)
										// console.log(_this.goodslist)
									}else{
										_this.goodsList = res.data.data.list
									}
								}else{
									_this.goodsList = []
								}
							}
						})
					}
				})
			},
			scrolltolower(){
				this.page++
				this.liveshoplist()
			},
			//删除该直播的商品
			soldout(e){
				const _this = this
				let {g_id} = e.currentTarget.dataset
				// console.log([g_id])
				uni.request({
					url:`${app.globalData.Requestpath}live/deleteAnchorGoods`,
					method:"POST",
					data:{
						token:_this.tokey,
						ids:[g_id]
					},
					success(res) {
						if(res.data.code==0){
							_this.page = 1
							app.globalData.showtoastsame(res.data.msg)
							_this.liveshoplist()
						}else{
							app.globalData.showtoastsame(res.data.msg)
						}
					}
				})
			},
			//返回
			returnliveshoplist(){
				uni.navigateBack()
			}
		},
		created(){
			this.liveshoplist()
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	page{background-color: #FFFFFF;}
	.Livegoods{
		background-color: #FFFFFF;
		.cuIcon-back{
			color: #FFFFFF;
		}
		.goods-list{
			padding: 0 20rpx;
			overflow: hidden;
			height: 92vh;
			// background-color: red;
			.goods{
				margin-top: 20rpx;
				height: 265rpx;
				width: 100%;
				
				display: flex;
				justify-content: space-between;
				.img{
					width: 265rpx;
					height: 265rpx;
					// background-color: yellow;
					border-radius: 30rpx;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.details{
					padding: 10rpx 0;
					width: 414rpx;
					height: 265rpx;
					
					.details-text{
						text{
							font-size: 28rpx;
							color: #000000;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
					}
					.commission{
						padding: 30rpx 0;
						font-size: 36rpx;
						color: #666666;
						.commission-pic{
							margin-left: 15rpx;
						}
					}
					.goods-price{
						display:flex;
						justify-content: space-between;
						.price{
							line-height: 64rpx;
							text{
								font-size: 36rpx;
								color: #e50010;
							}
						}
						.sold-out{
							.cu-btn{
								 background-image: linear-gradient(#83d0ff, #14d3de);
								 width: 157rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
