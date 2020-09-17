<template>
	<view class="list">
		<view class="Headchoose">
			<view @click="refund"  :class="active">退款订单列表</view>
			<view @click="refundGoods" :class="activb">退款退货订单列表</view>
		</view>
		<scroll-view style="overflow: hidden;height:91vh;" scroll-y="true" @scrolltolower="scrollBottom">
		
			<view class="cu-list menu-avatar">
				<!-- 这是背景图片 -->
				<!-- <view class="shopping-title">这里是背景图片 先用颜色替代</view> -->
				<!-- <button class="cu-btn bg-red margin-tb-sm lg" :style="{'display':display}">删除你不想要的商品</button> -->
				
				<view class="cu-item" 
					v-for="(item,index) in this.$store.state.refundreturnlist" 
					:key="index"
					:data-index="index"
					:data-s_id="item.store_id"
					@tap="particulars"
				>
					<!-- @tap="linkDetails(item.order_id,item.order_sn)"  -->
					
					<view class="cu-item-left">
						<!--为什么这么写 因为组件是相互引用的  再加上后台 返回的数据值可能不一样只能用三目去判断哪个有值 goods_image -->
						<view 
							class="cu-avatar round lg" 
							:style="{'background-image':'url('+imgpath+(item.store_logo)+')'}"></view>
					</view>
					<view class="cu-item-right">
						<view class="content">
							<!-- goods_name这个值和上面的值一样的返回的不一样   -->
							<view class="text-grey">{{item.store_name}}</view>
							<view class="price">
								￥{{item.good_price}}
								
								<text class="">{{item.refund_state==1?'退款':'退货退款'}}</text>
							</view>
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
		data(){
			return {
				imgpath:this.$store.state.imgyuming,
				active:"active",
				activb:"",
				page:1, //当前页数
				iSrefund:0,//判断是退款还是退款退货列表 
				refundtype:[
					{
						type:1,
						text:'退款订单列表'
					},
					{
						type:2,
						text:'退款退货订单列表'
					}
				]
			}
		},
		methods:{
			scrollBottom(){
				const _this = this
				this.page++
				// console.log(this.page)
				if(this.iSrefund == 0){
					uni.getStorage({
						key:"bindtokey",
						success(res){
							uni.request({
								url: `${app.globalData.Requestpath}order/getRefundOrderList`,
								method: "POST",
								data: {
									token: res.data,
									page: _this.page,
									pageSize: 7
								}, 
								success(res) {
									// console.log(res) 
									if (res.data.code == 0) {
										// state.refundreturnlist = res.data.data.list  
										if(_this.page == 1){
											_this.$store.state.refundreturnlist = res.data.data.list
										}else{
											_this.$store.state.refundreturnlist = _this.$store.state.refundreturnlist.concat(res.data.data.list)
										}
									}
								}
							})
						}
					})
				}else if(this.iSrefund == 1){
					// this.$store.commit("Orderefundreturnlist",{pages:this.page}) 
					uni.getStorage({
						key:"bindtokey",
						success(res){
							uni.request({
								url:`${app.globalData.Requestpath}order/getRefundAndGoodsOrderList`,
								method:"POST",
								data:{
									token:res.data,
									page:_this.page,
									pageSize:7
								},
								success(res){
									if(res.data.code == 0){
										if(_this.page == 1){
											_this.$store.state.refundreturnlist = res.data.data.list
										}else{
											_this.$store.state.refundreturnlist = _this.$store.state.refundreturnlist.concat(res.data.data.list)
										}
									}
								}
							})
						}
					})
				}
			},
			// 退款列表
			refund(){
				this.$store.state.refundreturnlist = []
				this.$store.commit("OrderrefundList")
				this.active = "active"
				this.activb = ""
				this.iSrefund = 0
				this.page = 1
				console.log(this.iSrefund)
			},
			// 退款退货列表  
			refundGoods(){
				this.$store.state.refundreturnlist = []
				this.$store.commit("Orderefundreturnlist")
				this.active = ""
				this.activb = "activb"
				this.iSrefund = 1
				this.page = 1
				// console.log(this.iSrefund)
				// this.active = "active"
			},
			particulars(e){
				const _this = this
				// 获取订单内订单商品列表
				let indexs = e.currentTarget.dataset.index
				// 店铺名称
				let store_name = this.$store.state.refundreturnlist[indexs].store_name  
				// 订单编号
				let order_sn =  this.$store.state.refundreturnlist[indexs].order_sn
				// // 运费
				let dispatch_price = this.$store.state.refundreturnlist[indexs].dispatch_price
				// // 流水号 
				let swift_no = this.$store.state.refundreturnlist[indexs].swift_no
				// 创建时间
				let createTime = this.$store.state.refundreturnlist[indexs].create_time
				let address_id = this.$store.state.refundreturnlist[indexs].address_id
				// 订单Id
				let order_id = this.$store.state.refundreturnlist[indexs].order_id
				
				
				uni.getStorage({
					key:"bindtokey",
					success(res){
						uni.request({
							url:`${app.globalData.Requestpath}order/getOrderGoodList`,
							method:"POST",
							data:{
								token:res.data,
								order_sn:order_sn,
								page:1,
								pageSize:10
							},
							success(receiving) {
								uni.setStorage({
									key:'Detailsrefund',
									data:receiving,
									success(success) {
										// console.log(receiving,'333')
										// console.log(dispatch_price)
									}
								})
								  
							}
						})
					}
				})
				uni.navigateTo({
					url:`/pages/Detailsofrefund/Detailsofrefund?title=${store_name}&order_sn=${order_sn}&dispatch_price=${dispatch_price}&swift_no=${swift_no}&createTime=${createTime}&address_id=${address_id}&order_id=${order_id}`
				})
			}
		},
		//OrderrefundList 退款列表 
		// Orderefundreturnlist  退款退货列表
		
		// props:["list","display","deleteurl","tokey","deletelist"],
		created() {
			this.$store.commit("OrderrefundList")
			
		},
	}
</script>

<style lang="less" scoped>
	.active{
		color: red;
	}
	.activb{
		color: red;
	}
	.list{
		.Headchoose{
			display: flex;
			flex-grow: 10;
			view{
			   flex-grow: 5;
			   text-align: center;
			   line-height: 80rpx;
			}
		}
		.shopping-title{
			//由于背景图片没高度 给来一个高度
			height:70rpx;
			background-color:deeppink ;//背景图片没有 先用颜色替代
			// background-image:url() //这里背景图片到时候有图片在渲染  先把图片的其他属性写上
			// background:no-repeat 0 0;
			// background-size: 100% 100%;
		}
		.cu-list.menu-avatar>.cu-item{
			height:200rpx;
			align-items: center;
			margin-bottom:20rpx;
			&:last-child{
				margin-bottom:0;
			}
			.cu-avatar{
				position: static !important;
			}
			.cu-item-left{
				
			}
			.cu-item-right{
					width: calc(100% - 20px - 30px - 60px - 10px) !important;
				 .content{
				 	position: static !important;
				 	width: 100% !important;
				 	left:0 !important;
					display: flex;
					flex-wrap: wrap;
					align-items: stretch !important;
				 	.text-grey{
				 		line-height:28rpx;
				 		color:#000;
				 		font-size: 28rpx;
				 	}
				 	.price{
						display:flex;
						width: 100%;
				 		color:red;
				 		font-weight: bold;
				 		font-size: 30rpx;
						margin-top:60rpx;
						justify-content: space-between;
				 	}
				 }
			}
		}
		.cu-avatar.lg{
			width: 200rpx;
			height:190rpx;
			border-radius:8rpx;
		}
		.cu-btn.lg{
			line-height:80rpx;
		}
	}
</style>
