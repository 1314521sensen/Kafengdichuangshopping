<template>
	<view class="facoupons">
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="allcoupons">
			<actionbar url="/pages/PersonalMy/PersonalMy" message="优惠券"></actionbar>
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="nav-text">
					<view class="cu-item" :class="index==TabCur?'nav-bg text-red cur':''" v-for="(item,index) in coupons" :key="index" @tap="tabSelect" :data-id="index" :data-items="item">
						{{item}}
					</view>
				</view>
			<securitiesbottom v-if="items==coupons[TabCur]" :couponslist="couponslist"></securitiesbottom>
			</scroll-view>
			<!-- <view v-for="(item,index) in 10" :key="index" v-if="index==TabCur" class="bg-grey padding margin text-center">
				Tab{{index}}
			</view> -->
			<!-- {{coupons[TabCur]}}
			{{items}} -->
			<!-- @getchildlist 用来接收子组件传过来的值 -->
		</view>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	import securitiesbottom from "@/components/allcoupons/securitiesbottom.vue"
	const app = getApp();
	//这是全部优惠卷路由
	export default{
		data(){
			return {
				statusBar:0,
				items:"未使用",
				TabCur: 0,
				scrollLeft: 0,
				coupons:[
					"未使用",
					"已使用",
					"已过期"
				],
				getchildlistdata:[],
				couponslist:[
					{
						couponstitle:"店铺优惠券",
						list:[]
					},
					{
						couponstitle:"平台优惠券",
						list:[]
					}
				],
				tokey:0
			}
		},
		methods:{
			tabSelect(e) {
				// console.log(e.currentTarget.dataset)
				// console.log(this.coupons[this.TabCur+1])
				let {id,items} = e.currentTarget.dataset
				this.items = items
				this.TabCur = id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.platformcouponsdata(this)
				this.storecouponsdata(this)
			},
			//封装个函数用于请求优惠券的数据
			platformcouponsdata(_this){
				//这个是获取平台优惠券的接口
				uni.request({
					url:`${app.globalData.Requestpath}activity/getUserPlatformCouponList`,
					method:"POST",
					data:{
						token:this.tokey,
						page:1,
						pageSize:5
					},
					success(Storecoupon){
						if(Storecoupon.data.code==0){
							Storecoupon.data.data.list .forEach((item,index)=>{
								item.coupon_img = app.globalData.imgyuming+item.coupon_img
								if(item.status==1){//未使用
									if(_this.TabCur==0){
										_this.couponslist[1].list = Storecoupon.data.data.list
									}
								}else if(item.status==2){//已使用
									if(_this.TabCur==1){
										_this.couponslist[1].list = Storecoupon.data.data.list
									}
								}else{//已过期
									if(_this.TabCur==2){
										_this.couponslist[1].list = Storecoupon.data.data.list
									}
								}
							})
						}
					}
				})
			},
			storecouponsdata(_this){
				//获取店铺优惠券
				uni.request({
					url:`${app.globalData.Requestpath}activity/getUserStoreCouponList`,
					method:"POST",
					data:{
						token:this.tokey,
						sid:-2,	
						page:1,
						pageSize:10
					},
					success(resDiscountstores) {
						if(resDiscountstores.data.code==0){
							console.log(resDiscountstores)
							// _this.couponslist[0].list = resDiscountstores.data.data.lists
							resDiscountstores.data.data.list .forEach((item,index)=>{
								item.coupon_img = app.globalData.imgyuming+item.coupon_img
								if(item.status==1){//未使用
									if(_this.TabCur==0){
										_this.couponslist[0].list = resDiscountstores.data.data.list
									}
								}else if(item.status==2){//已使用
									if(_this.TabCur==1){
										_this.couponslist[0].list = resDiscountstores.data.data.list
									}
								}else{//已过期
									if(_this.TabCur==2){
										_this.couponslist[0].list = resDiscountstores.data.data.list
									}
								}
							})
						}
					}
				})
			}
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
			
		},
		components:{
			securitiesbottom
		},
		created(){
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					_this.tokey = res.data
					_this.platformcouponsdata(_this)
					_this.storecouponsdata(_this)
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	 .allcoupons{
	  margin: 0 auto;
	  background: linear-gradient(to bottom,#fe3217,#fc8c62);
	  height: 500rpx;
	  border-radius: 0 0 40rpx 40rpx;
	  }
	 .bg-white{
	  width: 90%;
	  margin: 0 auto;
	  margin-top: 10rpx;
	  border-radius: 20rpx;
	 }
	 .nav-text{
	  display:flex;
	  justify-content: space-around;
	  border-bottom: 2rpx solid #f6dad2;
	 }
	 .nav .cu-item{
	   height:56rpx;
	   line-height: 56rpx;
	 }
	 .nav-bg{
	  background-color: #eb9078;
	  color:#fff;
	 }
	 .nav .cu-item.cur{
	  border-bottom: 0;
	 }
</style>
