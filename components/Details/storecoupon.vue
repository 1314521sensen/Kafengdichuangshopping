<template>
	<view v-if="list.length!==0">
		<view class="cu-bar bg-white" @tap="showModal" data-target="couponstore">
			<view class="action">
				<!-- 如果changetitlemsgtext有值就采用本身的 如果没值就采用传过来的 -->
				<text>{{changetitlemsgtext?changetitlemsgtext:titlemsg}}</text>
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
								<!-- {{item.at_full}} -->
								<text>{{item.at_full=='0.00'?'无门槛使用':'满'+item.at_full+'使用'}}</text>
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
				list:[],
				changetitlemsgtext:""
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
				if(_this.Orderpaymentamount=='0' || _this.Orderpaymentamount==undefined){//显示商品详情里面的优惠卷 领取
				// console.log("这是优惠券过来的")
					uni.request({
						url:`${app.globalData.Requestpath}activity/userGetStoreCoupon`,
						method:"POST",
						data:{
							token:this.tokey,
							sid:this.storeid,
							cid:coupontypeid
						},
						success(res){
							if(res.data.code==0){
								app.globalData.showtoastsame("领取成功...")
							}else{
								app.globalData.showtoastsame(res.data.msg)
							}
							//不管成功或不成功都会执行这里
							_this.modalName = null
							_this.changetitlemsgtext = ""
						}
					})
				}else{//否则就是订单详情里面的使用优惠卷
					//传给订单那个组件
					// console.log("这是订单详情里面的")
						// console.log(dingdanitem)
						// console.log("这是订单详情过来的")
						_this.modalName = null
						// //这是拿到使用的文本
						_this.changetitlemsgtext = dingdanitem.coupon_name
						// console.log(_this.storeid)
						let obj = {}
						let arr = []
						obj.sid = _this.storeid
						obj.c_id = dingdanitem.id
						obj.c_type = dingdanitem.coupon_type
						obj.money = dingdanitem.money
						// console.log([obj])
						arr[0] = obj
						// console.log(arr)
						this.$emit("dingdancoupon",arr)
						// dingdanitem.checked = true
				}
			}
		},
		created() {
			const _this  = this
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
				//因为要显示平台或者店铺能使用的能满足当前价位的商品所以 传个数组
				let newcouponboollist = []
				newcouponboollist[0] = parseInt(_this.storeid)
				newcouponboollist[1] = 0
				uni.request({
					url:`${app.globalData.Requestpath}activity/getUserValidCouponList`,
					method:"POST",
					data:{
						token:_this.tokey,
						sid:newcouponboollist,
						t_price:_this.Orderpaymentamount,
						c_category:_this.couplebooltext
					},
					success(res) {
						if(res.data.code==0){
							_this.list = res.data.data
							// console.log(_this.list)
							_this.list.forEach((item,index)=>{
								item.start_time = item.start_time.trim().split(" ")[0]
								item.stop_time = item.stop_time.trim().split(" ")[0]
							})
						}
					}
				})
			}
			
		},
		props:["tokey","storeid","msg","Whatcoupon","Orderpaymentamount","titlemsg","couplebooltext"]
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
