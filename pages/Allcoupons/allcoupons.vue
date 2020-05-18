<template>
	<view class="allcoupons">
		<actionbar url="/pages/PersonalMy/PersonalMy" message="优惠券"></actionbar>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="nav-text">
				<view class="cu-item" :class="index==TabCur?'nav-bg text-red cur':''" v-for="(item,index) in coupons" :key="index" @tap="tabSelect" :data-id="index" :data-items="item">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<!-- <view v-for="(item,index) in 10" :key="index" v-if="index==TabCur" class="bg-grey padding margin text-center">
			Tab{{index}}
		</view> -->
		<!-- {{coupons[TabCur]}}
		{{items}} -->
		<!-- @getchildlist 用来接收子组件传过来的值 -->
		<securitiesbottom v-if="items==coupons[TabCur]" :couponslist="couponslist"></securitiesbottom>
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
			//子组件的数据 在methods定义接收  在生命周期的函数中 负责执行该函数
			// getchildlist(e){
			// 	this.getchildlistdata = e;
			// 	//再将新的数组加入到缓存中
			// 	uni.setStorage({
			// 		key:"couponsData",
			// 		data:this.getchildlistdata,
			// 		success:(res)=>{
						
			// 		}
			// 	})
			// }
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
							// console.log(Storecoupon)
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
						console.log(resDiscountstores)
						if(resDiscountstores.data.code==0){
							// console.log(resDiscountstores.data.data.list)
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
	.nav-text{
		display:flex;
		justify-content: space-around;
	}
	.nav .cu-item{
			height:74rpx;
	}
	.nav-bg{
		background-color: #eb9078;
		color:#fff;
	}
</style>
