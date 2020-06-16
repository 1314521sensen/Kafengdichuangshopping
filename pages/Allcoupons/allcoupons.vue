<template>
	<view class="facoupons">
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- <view class="allcoupons"> -->
			<actionbar url="/pages/PersonalMy/PersonalMy" message="优惠券"></actionbar>
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="nav-text">
					<view class="cu-item" :class="index==TabCur?'nav-bg text-red cur':''" v-for="(item,index) in coupons" :key="index" @tap="tabSelect" :data-id="index" :data-items="item">
						{{item}}
					</view>
				</view>
				<!--  v-if="items==coupons[TabCur]" :couponslist="couponslist" -->
			<securitiesbottom @indexs="couponstindex" :couponslist="couponslist"></securitiesbottom>
			</scroll-view>
		<!-- </view> -->
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
				couponslist:[],
				tokey:0,
				couponstindexs:0
			}
		},
		methods:{
			tabSelect(e) {//当上面的三个点击时候触发
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
				// console.log(this.couponstindexs)
				if(parseInt(this.couponstindexs)==1){
					uni.request({
						url:`${app.globalData.Requestpath}activity/getUserPlatformCouponList`,
						method:"POST",
						data:{
							token:_this.tokey,
							page:1,
							pageSize:5
						},
						success(Storecoupon){
							if(Storecoupon.data.code==0){
								let arr = []
								Storecoupon.data.data.list .forEach((item,index)=>{
									//这是处理的图片
									item.coupon_img = app.globalData.imgyuming+item.coupon_img
									//当用户点击的未使用的
									// console.log(item.status,typeof item.status)
									if(_this.TabCur==0){
										//未使用
										//当状态为1的时候 证明未使用
										if(item.status==1){
											console.log(item,"未使用")
											// _this.couponslist = item
											
											arr.push(item)
											_this.couponslist = arr
										}else{
											//如果不等于1 那么请求回来的肯定为空
											_this.couponslist = []
										}
									}else if(_this.TabCur==1){
										console.log("已使用")
										//已使用
										if(item.status==2){
											//已使用的语句没进来
											// console.log(Storecoupon.data.data.list)
											// let arr = []
											arr.push(item)
											_this.couponslist = arr
										}else{
											_this.couponslist = []
										}
									}else if(_this.TabCur==2){
										//已过期
										if(item.status==3){
											// let arr = []
											arr.push(item)
											_this.couponslist = arr
										}else{
											_this.couponslist = []
										}
									}
								})
							}
						}
					})
				}
			},
			storecouponsdata(_this){
				//获取店铺优惠券
				if(parseInt(_this.couponstindexs)==0){
					uni.request({
						url:`${app.globalData.Requestpath}activity/getUserStoreCouponList`,
						method:"POST",
						data:{
							token:_this.tokey,
							sid:-2,	
							page:1,
							pageSize:10
						},
						success(resDiscountstores) {
							if(resDiscountstores.data.code==0){
								let arr = []
								// console.log(resDiscountstores)
								// _this.couponslist[0].list = resDiscountstores.data.data.lists
								resDiscountstores.data.data.list .forEach((item,index)=>{
									item.coupon_img = app.globalData.imgyuming+item.coupon_img
									if(_this.TabCur==0){
										//未使用
										if(item.status==1){
											// console.log(item,"未使用")
											
											arr.push(item)
											// console.log(arr)
											_this.couponslist = arr
											// console.log(_this.couponslist)
										}else{
											_this.couponslist = []
										}
									}else if(_this.TabCur==1){
										console.log("已使用")
										if(item.status==2){
											arr = []
											arr.push(item)
											// console.log(arr)
											_this.couponslist = arr
										}else{
											_this.couponslist = []
										}
									}else if(_this.TabCur==2){
										console.log("已过期")
										if(item.status==3){
											arr = []
											arr.push(item)
											// console.log(arr)
											_this.couponslist = arr
										}else{
											_this.couponslist = []
										}
									}
								})
							}
						}
					})
				}
				
			},
			//者握手
			couponstindex(e){
				this.couponstindexs = e
				this.platformcouponsdata(this)
				this.storecouponsdata(this)
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
	.facoupons{
		height: 100vh;
		background-color: white;
	}
	 .allcoupons{
	  margin: 0 auto;
	  background: linear-gradient(to bottom,#fe3217,#fc8c62);
	  height: 500rpx;
	  border-radius: 0 0 40rpx 40rpx;
	  }
	 .bg-white{
	  width: 100%;
	  margin: 0 auto;
	  // border-radius: 20rpx;
	 }
	 .nav-text{
		background-color: #d2d2d2;
		display:flex;
		justify-content: space-around;
		border-bottom: 2rpx solid #f6dad2;
		.cu-item{
		  width: 34%;
		  line-height: 49rpx;
		  margin: 0;
		  padding: 15px 25px 15px 25px;
		  text-align: center;
		  font-weight: bold;
		}
		.nav-bg{
				
				background-color: #f1952b;
				color:#fff;
		}
	 }

	 .nav .cu-item.cur{
	  border-bottom: 0;
	 }
</style>
