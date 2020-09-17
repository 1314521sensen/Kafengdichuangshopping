<template>
	<view class="list">
		<!-- <scroll-view scroll-y="true" @scrolltolower="scrolltolower"  class="scrolltolower-list"> -->

		<view class="cu-list menu-avatar">
			<!-- 这是背景图片 -->
			<!-- <view class="shopping-title">这里是背景图片 先用颜色替代</view> -->
			<!-- <button class="cu-btn bg-red margin-tb-sm lg" :style="{'display':display}">删除你不想要的商品</button> -->
			<!-- 长按@longpress="longpress(item.good_id?item.good_id:item.goods_id,item.store_id)" -->
			<view 
				class="item_cu" v-for="(item,index) in list" 
				:key="index" 
				@tap="linkDetails(item.good_id?item.good_id:item.goods_id,item.store_id)"
			>
				<view class="cu-item-left" >
					<!--为什么这么写 因为组件是相互引用的  再加上后台 返回的数据值可能不一样只能用三目去判断哪个有值 goods_image -->
					<view class="cu-avatar round lg cu-item-left-bg" :style="{'background-image':'url('+imgpath+(item.good_pic?item.good_pic:item.goods_image)+')'}">

					</view>
				</view>
				<view class="cu-item-right">
					<view class="content">
						<!-- goods_name这个值和上面的值一样的返回的不一样 -->
						<view class="text-grey">
							<text 
								class="recommend"
								 v-show="parseInt(item.is_distribution)!==0"
							>
								买手推荐
							</text>
							<text>{{item.good_title?item.good_title:item.goods_name}}</text>
						</view>
						<view class="text-title" v-show="parseInt(item.is_distribution)==0">
							<text>{{item.good_sub_title}}</text>
						</view>
						<view class="earnings" v-show="parseInt(item.is_distribution)!==0">
							<text>
								预计收益:{{item.is_distribution==1?(item.distribution_type==0?item.distribution_cms:Number(((item.distribution_cms*item.good_promotion_price)/100)).toFixed(2)):0}}
							</text>
						</view> 
						<!-- :class="parseInt(item.is_distribution)==0?'active_margin':''" -->
						<view class="price" :class="parseInt(item.is_distribution)==0 && item.good_sub_title==''?'active_margin':''">
							￥{{item.good_promotion_price?item.good_promotion_price:(item.fav_price?item.fav_price:item.track_price)}}
							<text class="lg text-gray cuIcon-delete" :style="{'display':display}" @tap="deletescollectionAndfootprint"
							 :data-index="index"></text>
						</view>
						<view class="share_goods_box">
							<view class="share_price">
								<text class="old_price">￥{{item.good_marketprice}}</text>
								<text>{{item.good_salenum}}人购买</text>
							</view>
							<view 
								class="share_goods_button" 
								@tap.stop="share"
								:data-good_img="item.good_pic?item.good_pic:item.goods_image"
								:data-gid="item.good_id?item.good_id:item.goods_id"
								:data-sid="item.store_id"
								:data-price="item.good_promotion_price"
								:data-shoptitle="item.good_title?item.good_title:item.goods_name"
								 v-show="parseInt(item.is_distribution)!==0"
							>
								<text class="lg text-gray cuIcon-share"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	const app = getApp()
	import Details from "@/components/indexcomponents/indexDetails.vue"
	export default {
		data() {
			return {
				DetailsList: [],
				imgpath: this.$store.state.imgyuming
			}
		},
		methods: {
			scrolltolower() {
				// console.log("移到底部组件")
			},
			linkDetails(id, storeid) {
				// console.log(storeid)
				//当点击的时候跳转到详情页
				//根据index和我的组件中传过来的url 判断跳到哪里
				uni.navigateTo({
					url: `/pages/Details/Details?id=${id}&storeid=${storeid}`
				})
			},
			//长按事件
			// longpress(id,storeid){
			// 	const _this = this
			// 	let g_id = id
			// 	//在去请求详情页的其他数据
			// 	uni.request({
			// 		url:`${app.globalData.Requestpath}good/getGoodInfo?gid=${g_id}`,
			// 		data:{
			// 			gid:g_id
			// 		},
			// 		success(res) {
			// 			if(res.data.code==0){
			// 				_this.DetailsList = res.data.data
			// 				_this.$store.state.detailsbool = true
			// 				_this.$store.state.bannerbool = false
			// 				_this.$emit("Detailsdata",_this.DetailsList)
			// 			}
			// 		}
			// 	})
			// },
			deletescollectionAndfootprint(e) {
				let index = e.currentTarget.dataset.index
				let deleteid = this.deletelist[index].fav_id ? this.deletelist[index].fav_id : this.deletelist[index].track_id
				uni.showModal({
					title: "确定要在收藏中删除该商品吗",
					content: "删除以后不影响在次添加",
					cancelText: true,
					cancelText: "确认取消",
					cancelColor: "#ff0000",
					confirmText: "确认删除",
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: this.deleteurl,
								method: "POST",
								data: {
									token: this.tokey,
									fav_id: deleteid,
									track_id: deleteid
								},
								success(res) {
									if (res.data.code == 0) { //这后期需要更改
										uni.redirectTo({
											url: "/pages/PersonalMy/PersonalMy"
										})
									}
								}
							})
						} else {
							return false
						}
					}
				})

			},
			//点击分享
			share(e){
				let {good_img,gid,sid,price,shoptitle} = e.currentTarget.dataset
				uni.getStorage({
					key:"bindtokey",
					success(res) {
						app.globalData.Detectionupdatetokey(res.data)
						uni.setStorage({
							key:"indexstore",
							data:{
								good_img,
								gid,
								sid,
								price,
								shoptitle
							},
							success() {
								uni.navigateTo({
									url:`/pages/shareshop/shareshop`
								})
							}
						})
					},
					fail(err){
						uni.reLaunch({
							url:`/pages/login/login`
						})
					}
				})
				
			}
		},
		props: ["list", "display", "deleteurl", "tokey", "deletelist"],
		components: {
			Details
		}
	}
</script>

<style lang="less" scoped>
	.list {
		background-color: #f2f2f2;

		.shopping-title {
			//由于背景图片没高度 给来一个高度
			height: 70rpx;
			// background-color:deeppink ;//背景图片没有 先用颜色替代
			// background-image:url() //这里背景图片到时候有图片在渲染  先把图片的其他属性写上
			// background:no-repeat 0 0;
			// background-size: 100% 100%;
		}

		.cu-list {
			// display:flex;
			// flex-wrap: wrap;
			// justify-content: space-between;
			// margin-bottom:20rpx;
			// display: flex;
			// flex-wrap: wrap;
			// justify-content: space-between;
			// padding: 0 20rpx;
			background-color: #f2f2f2;
			padding:22rpx 14rpx 22rpx 20rpx;
		}

		.cu-list.menu-avatar>.item_cu {
			vertical-align: top;
			display: inline-block;
			// height:490rpx;
			width: 346rpx;
			// border: 2rpx solid red;
			// margin-bottom: 18rpx;
			margin-right:20rpx;
			// margin:0 0 18rpx 0;
			margin-bottom:18rpx;
			border-radius: 20rpx;
			overflow: hidden;
			// box-shadow: 4rpx 4rpx 12rpx #C0C0C0;
			padding: 0 0 10rpx 0;
			// box-shadow: 0rpx 0rpx 0rpx 5rpx;
			// align-items: center;
			// margin-bottom:20rpx;
			// &:last-child{
			//  margin-bottom:0;
			// }
			background-color: #fff;
			// &:first-child{
			// 	margin-top:0;
			// }
			// &:nth-child(1n){
			// 	margin-top:-10rpx;
			// 	margin-bottom:0;
			// }
			&:nth-child(2n){
				margin-right:0;
				// margin-top:24rpx
			}
			// &:nth-child(1n){
			// 	margin-top:0rpx
			// }
			.cu-avatar {
				position: static !important;
			}

			.cu-item-left {
				.cu-item-left-bg {
					width: 100%;
				}
			}

			.cu-item-right {
				margin-top: 18rpx;
				// background-color: ;
				// width:100%;
				padding: 0 10rpx;

				.content {
					// position: static !important;
					// position: relative;
					width: 100% !important;
					left: 0 !important;
					display: flex;
					flex-wrap: wrap;
					align-items: stretch !important;

					/* #ifdef APP-PLUS */
					.text-grey {
						// line-height:28rpx;
						color: #000;
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;

					}

					/* #endif*/
					/* #ifdef H5 */
					.text-grey {
						// height: 50rpx;
						// overflow: hidden;
						line-height: 28rpx;
						color: #000;
						font-size: 22rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}

					/* #endif */
					.text-title{
						padding: 6rpx 0;
						font-size: 24rpx;
						color: #f4992d;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						margin-top:20rpx;
					}
					.earnings{
						width: 100%;
						display: flex;
						justify-content: flex-end;
						margin-top:15rpx;
						text{
							font-size: 24rpx;
							padding:4rpx 12rpx ;
							border-radius: 30rpx ;
							border: 2rpx solid #f4992d;
							color: #f4992d;
						}
					}
					.share_goods_box{
						// position: absolute;
						// bottom:0;
						// left:0;
						display: flex;
						justify-content: space-between;
						font-size:26rpx;
						width: 100%;
						color: #808080;
						margin-top:15rpx;
						.old_price{
							text-decoration:line-through;
							margin-right: 20rpx;
						}
						.share_goods_button{
							font-size: 34rpx;
						}
					}
					.price {
						margin-top:20rpx;
						display: flex;
						width: 100%;
						color: red;
						font-weight: bold;
						font-size: 30rpx;

						// margin-top:60rpx;
						justify-content: space-between;
					}
				}
			}
		}

		.cu-avatar.lg {
			width: 318rpx;
			height: 330rpx;
			border-radius: 18rpx 18rpx 0 0;
		}

		.cu-btn.lg {
			line-height: 80rpx;
		}
	}
	.recommend{
      background-color: red;
      color: #FFFFFF;
      padding: 0rpx 6rpx;
      border-radius: 8rpx;
     }
	 .active_margin{
		 margin-top:84rpx !important;
	 }
</style>
