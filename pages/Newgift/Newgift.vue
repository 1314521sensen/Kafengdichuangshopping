<template>
	<view class="Startingdiagrambox">
		<view 
			class="Startingdiagram" 
			:style="{'background-image':'url(/static/Newgift/Presentscar.gif)','height':Newgiftheight+'vh','width':Newgiftwidth+'%'}" 
			v-if="Newgiftbool">
		</view>
		<view class="new" :style="{'background-image':'url('+this.$store.state.httpUrl+'Newgift/bg.png'+')'}">
			<pageheight :statusBar="statusBar"></pageheight>
			<defaultbgblackcolorwhitebar></defaultbgblackcolorwhitebar>
			<scroll-view class="fa-new" scroll-y="true" >
				<view class="new-top-img" :style="{'background-image':'url('+this.$store.state.httpUrl+'/Newgift/bgtitle.png'+')'}"></view>
				<view class="new-bottom">
					<NewPeople v-if="couponslist.length>0"></NewPeople>
					<scroll-view :scroll-x="true" @scrolltolower="scrolltolower">
						<view class="fa-discounts" :style="{'width':(countswidth*2+10)*couponslist.length+'rpx'}">
							<view class="discounts-list">
								<view class="discounts" v-for="(item,index) in couponslist" :key="index">
									<view class="discounts-left">
										<text class="left-text-one">￥</text>
										<text class="left-text-two" v-text="item.money"></text>
									</view>
									<view class="discounts-right">
										<view class="right-left">
											<text class="right-left-textone">优惠券</text>
											<text class="right-left-texttwo">{{parseInt(item.at_full)?'满'+item.at_full+'可用':'无门槛'}}</text>
										</view>
										<view class="right-right" :style="{'background-image':'url('+yuming+'Newgift/Rightcouponimg.png'+')'}">
											<button 
												class="cu-btn"
												:data-coupon_id="item.coupon_type_id"
												:data-storeid="item.store_id"
												@tap="Getnew"
											>领取</button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<NewPeople></NewPeople>
					<!-- <scroll-view scroll-y="true" class="scroll-view" @scrolltolower="scrollbottom"> -->
					<view class="commodity-list">
						<view class="commodity" 
							v-for="(item,index) in list" 
							:key="index"
							@tap="Snapped"
							:data-id="item.good_id"
							:data-storeid="item.store_id"
							:data-specialtype="item.special_type_id"
							:data-good_type="item.good_type"
						>
							<view class="commodity-img">
								<!-- 这里放的图片 -->
								<image :src="imgpath+item.good_pic" class="imgs"></image>
							</view>
							<view class="commodity-bottom">
								<view class="commodity-bottom-title">
									{{item.good_title}}
								</view>
								<!-- 这是商品的价格 -->
								<view class="commodity-bottom-plice">
									<view>
										<text class="text-two">{{item.good_promotion_price}}</text>
									</view>
									<button 
										class="cu-btn" 
									>立即抢购</button>
								</view>
							</view>
						</view>
					</view>
					<view class="batch" @tap="batch">换一批</view>
				</view>
			</scroll-view>
			<view class="new-bottom-bottom cu-dialog">
				<view class="bottom-midden">
					<view class="log-left" :style="{'background-image':'url('+this.$store.state.httpUrl+'logo.png'+')'}"></view>
					<view class="log-right" :style="{'background-image':'url('+this.$store.state.httpUrl+'Newgift/bottomlogo.png'+')'}"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import defaultbgblackcolorwhitebar from "@/components/actionbar/defaultbgblackcolorwhitebar.vue"
	import NewPeople from "@/components/Newgift/Newgifttitletext.vue"
	const app = getApp()
	export default {
		data() {
			return {
				list:[],
				statusBar:"",
				Newgiftheight:100,
				Newgiftwidth:100,
				Newgiftbool:true,
				couponspages:1,
				couponspagesize:5,
				couponslist:[],
				yuming:`${this.$store.state.imgyuming}/uploads/app/image/`,
				timenum:5000,
				countswidth:168,
				imgpath:this.$store.state.imgyuming
			}
		},
		methods:{
			//领取优惠券
			Getnew(e){
				let {coupon_id,storeid} = e.currentTarget.dataset
				uni.getStorage({
					key:"bindtokey",
					success(res) {
						uni.request({
							url:`${app.globalData.Requestpath}activity/userGetNewPeopleCoupon`,
							method:"POST",
							data:{
								token:res.data,
								sid:storeid,
								cid:coupon_id
							},
							success(res) {
								if(res.data.code==0){
									app.globalData.showtoastsame(res.data.msg)
								}else{
									if(res.data.msg=="令牌错误"){
										app.globalData.Requestmethod(res.data.code,res.data.msg)
									}else{
										app.globalData.showtoastsame(res.data.msg)
									}
								}
							}
						})
					}
				})
			},
			//这是换一批事件
			batch(){
				this.giftlist(8)
			},
			giftlist(nums){
				const _this = this
				// 礼品的数据
				uni.request({
					url:`${app.globalData.Requestpath}activity/getNewUserGoodsList`,
					method:"GET",
					data:{
						limit:nums
					},
					success(res){
						if(res.data.code==0){
							_this.list = res.data.data
						}else{
							//这是检测tokey
							// app.globalData.Requestmethod(res.data.code,res.data.msg)
						}
					}
				})
			},
			//获取优惠卷列表
			CouponTypeList(couponspagesize){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}activity/getNewUserCouponTypeList`,
					method:"GET",
					data:{
						page:couponspagesize,
						pageSize:5
					},
					success(rescoupons) {
						if(rescoupons.data.code==0){
							if(_this.couponspages>1){
								_this.couponslist = _this.couponslist.concat(rescoupons.data.data.list)
							}else{
								_this.couponslist = rescoupons.data.data.list
							}
						}
					}
				})
			},
			//点击立即抢购的礼品 跳到商品详情里面
			Snapped(e){
				let {id,storeid,specialtype,good_type} = e.currentTarget.dataset
				//npt 新人 nt普通
				uni.navigateTo({
					url:`/pages/Details/Details?id=${id}&storeid=${storeid}&specialtype=${specialtype}&goodtype=${good_type}`
				})
			},
			//滚动加载的事件
			scrolltolower(){
				this.couponspages++
				this.CouponTypeList(this.couponspages)
			}
		},
		components:{
			NewPeople,
			defaultbgblackcolorwhitebar
		},
		onLoad() {
			const _this = this
			_this.statusBar = app.globalData.statusBar
			//应该是平滑的往上移动
			let time = null
			 time = setInterval(function(){
				_this.Newgiftheight = 0
				_this.Newgiftwidth = 0
				clearInterval(time)
			},_this.timenum)
		},
		created(){
			const _this = this
			_this.CouponTypeList(1)
			//调用礼品的接口
			_this.giftlist(4)
		}
	}
</script>

<style lang="less" scoped>
	.Startingdiagrambox{
		height:100vh;
		overflow: hidden;
	}
	.Startingdiagram{
		// background-color:red;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		transition: 1.3s;
	}
	.new{
		overflow: hidden;
		width: 100%;
		height: 100vh;
		background-size: 100% 100%;
		.fa-new{
			width: 95%;
			margin: 0 auto;
			height: 88vh;
		}
		.new-top-img{
			height: 360rpx;
			width: 80%;
			background-size: 100% 100%;
			margin: 0 auto;
		}
		.new-bottom{
			overflow: hidden;
			width: 100%;
			// height: 80vh;
			// z-index: 0;
			background-color: #FFFFFF;
			border-radius: 20rpx 20rpx 0 0;
			margin: 0 auto ;
			.fa-discounts{
				// width: 1000%;
				.discounts-list{
					// width: 10%;
					display: flex;
					justify-content: space-around;
					// flex-wrap: wrap;
					.discounts{
						overflow: hidden;
						// margin-top: 20rpx;
						margin:20rpx 20rpx 0 0;
						width: 336rpx;
						height: 110rpx;
						border-radius: 15rpx;
						background-image: linear-gradient(to right,#c61571, #cc2d2c);
						display: flex;
						justify-content: space-between;
						.discounts-left{
							// width: 25%;
							height: 110rpx;
							// background-color: red;
							line-height: 90rpx;
							text-align: center;
							border-right: 2rpx dotted #FFFFFF;
							min-width: 30%;
							.left-text-one{
								color: white;
								font-size: 20rpx;		
							}
							.left-text-two{
								color: white;
								font-size: 40rpx;
								font-weight: bold;
							}
						}
						.discounts-right{
							width: 75%;
							height: 110rpx;
							display: flex;
							justify-content: space-between;
							.right-left{
								width: 60%;
								height: 100%;
								margin-left: 20rpx;
								
								.right-left-textone{
									font-size: 28rpx;
									color: white;
									display: block;
									margin-top: 10rpx;
								}
								.right-left-texttwo{
									font-size: 16rpx;
									color: white;
									display: block;
									margin-top: 10rpx;
								}
							}
							.right-right{
								width: 40%;
								height: 100%;
								background-size: 80rpx 80rpx;
								 background-repeat:no-repeat;
								 background-position:top right;
								 margin: -5rpx -10rpx 0 0;
								 .cu-btn{
									width: 80rpx;
									height: 30rpx; 
									font-size: 24rpx;
									background-color: white;
									padding:0rpx;
									margin:64rpx 0 0 -10rpx;
									color: red;
								 }
							}
						}
					}
				}
			}
			.commodity-list{
				margin-top: 40rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				padding:0 10rpx 20rpx;
				.commodity{
					width: 340rpx;
					margin: 15rpx 0 15rpx 0 ;
					box-shadow: 4rpx 4rpx 20rpx #ccc;
					.commodity-img{
						width: 340rpx;
						height: 340rpx;
						// background-color: red;
						.imgs{
							width: 100%;
							height: 100%;
						}
					}
					.commodity-bottom{
						// 这是商品的
						.commodity-bottom-title{
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							padding:0 10rpx;
							font-size: 26rpx;
							margin:10rpx 0;
						}
						.commodity-bottom-plice{
							display:flex;
							justify-content: space-between;
							padding:10rpx;
							align-items: center;
						}
						.text-one{
							font-size: 24rpx;
						}
						.text-two{
							font-size: 34rpx;
							font-weight: bold;
							color: red;
						}
						.cu-btn{
							height: 40rpx;
							background-color: #f30000;
							// margin-top:20rpx;
							color: white;
						}
					}
				}
			}
		}
		.new-bottom-bottom{
			// height: 154rpx;
			 background: linear-gradient(#f8ce70,#f57a24 );
			 width: 98%;
			 border-radius: 10rpx;
			 margin: 0 auto;
			 display: flex;
			 justify-content: center;
			 padding: 20rpx 0;
			 .bottom-midden{
				 display:flex;
				 justify-content: space-around;
				 align-items: center;
				 width: 60%;
				 .log-left{
					 width: 104rpx;
					 height: 104rpx;
					 background-size: 100% 100%;
				 }
				 .log-right{
					 width: 180rpx;
					 height: 68rpx;
					 background-size: 180rpx 68rpx;
				 }
			 }
		}
	}
	.batch{
		text-align:center;
		font-size: 32rpx;
		color:#999;
		padding-bottom:20rpx;
	}
	
</style>
