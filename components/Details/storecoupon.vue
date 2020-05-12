<template>
	<view v-if="list.length!==0">
		<view class="cu-bar bg-white" @tap="showModal" data-target="couponstore">
			<view class="action">
				<text>{{titlemsg}}</text>
			</view>
			<view class="action">
				<!-- <button class="cu-btn bg-green shadow"  >Bottom</button> -->
				<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='couponstore'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">优惠券详情</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="coupons-Popup">
					<view class="coupons-item" v-for="(item,index) in list" :key="index">
						<view class="coupons-denomination text-line-center">
							¥{{item.money}}
						</view>
						<view class="coupons-time text-line-center">
							<view>
								<text>仅限该店铺使用</text>
								<text>{{item.start_time}}---{{item.stop_time}}</text>
							</view>
						</view>
						<view class="coupons-btn text-line-center" @tap="Getstorecoupons(item.coupon_type_id,item)">
							<text>{{msg}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return {
				modalName:null,
				list:[]
			}
		},
		methods:{
			showModal(e){
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(){
				this.modalName = null
			},
			Getstorecoupons(coupontypeid,dingdanitem){//dingdanitem--->订单详情上面的item
				const _this = this
				if(_this.Orderpaymentamount=='0'){//显示商品详情里面的优惠卷 领取
					uni.request({
						url:`${app.globalData.Requestpath}activity/userGetStoreCoupon`,
						method:"POST",
						data:{
							token:this.tokey,
							sid:this.storeid,
							cid:coupontypeid
						},
						success(res){
							// console.log(res)
							if(res.data.code==0){
								_this.modalName = null
								app.globalData.showtoastsame("领取成功...")
							}else{
								app.globalData.showtoastsame(res.data.msg)
								_this.modalName = null
							}
						}
					})
				}else{//否则就是订单详情里面的使用优惠卷
					//传给订单那个组件
					this.$emit("dingdancoupon",dingdanitem)
				}
			}
		},
		created() {
			// console.log(this.Orderpaymentamount)
			const _this  = this
			// console.log(_this.tokey,_this.storeid)
			if(_this.Whatcoupon=='0'){//在详情的优惠券
				uni.request({
					url:`${app.globalData.Requestpath}activity/getStoreCouponTypeList`,
					method:"POST",
					data:{
						token:_this.tokey,
						sid:_this.storeid,
					},
					success(res) {
						if(res.data.code==0){
							_this.list = res.data.data.list
							_this.list.forEach((item,index)=>{
								item.start_time = item.start_time.trim().split(" ")[0]
								item.stop_time = item.stop_time.trim().split(" ")[0]
							})
						}
					}
				})
			}else{//在订单的优惠券
			//
				uni.request({
					url:`${app.globalData.Requestpath}activity/getUserValidCouponList`,
					method:"POST",
					data:{
						token:_this.tokey,
						sid:_this.storeid,
						t_price:_this.Orderpaymentamount
					},
					success(res) {
						// console.log(res)
						if(res.data.code==0){
							_this.list = res.data.data
							_this.list.forEach((item,index)=>{
								item.start_time = item.start_time.trim().split(" ")[0]
								item.stop_time = item.stop_time.trim().split(" ")[0]
							})
						}
					}
				})
			}
			
		},
		props:["tokey","storeid","msg","Whatcoupon","Orderpaymentamount","titlemsg"]
	}
</script>

<style lang="less" scoped>
	.cu-bar{
		min-height: 70rpx;
		.action{
			&:first-child{
				font-size: 24rpx !important;
				color:#f00;
				text{
					margin-left:12rpx;
				}
			}
		}
	}
	.coupons-Popup{
		padding:20rpx;
		.coupons-item{
			display:flex;
			height:100rpx;
			justify-content: space-around;
			box-shadow: 6rpx 6rpx 6rpx #ccc;
			.coupons-denomination{
				width:156rpx;
				// background-color:yellow;
				font-size:40rpx;
				color:#f00;
			}
			.text-line-center{
				display:flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
			}
			.coupons-time{
				width:312rpx;
				// background-color:red;
				font-size: 24rpx;
				text-align:left;
				view{
					width:100% ;
					text{
						width: 100%;
						display:block;
					}
				}
			}
			.coupons-btn{
				width: 120rpx;
				// background-color:blue;
				font-size: 28rpx;
				text{
					padding:2rpx 20rpx;
					background-color: #f00;
					color:#fff;
				}
			}
		}
	}
	
</style>
