<template>
	<view>
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- :amount="amount" :integral="integral" -->
		<information :couponslistdata="couponslistdata" :tokey="tokey" :nickname="nickname" :images="images" :moneylist="moneylist" :logintokeytext="logintokeytext"></information>
		<mycoupons></mycoupons>
		<orders></orders>
		<myScratchableLatex></myScratchableLatex>
		<!-- <setup></setup> -->
		<Selectionrecommended></Selectionrecommended>
	</view>
</template>

<script>
	import orders from "@/components/myPersonal/orders.vue";
	import myScratchableLatex from "@/components/myPersonal/myScratchableLatex.vue";
	import information from "@/components/myPersonal/PersonalInformation.vue";
	import mycoupons from "@/components/myPersonal/coupons.vue"
	// import setup from "@/components/myPersonal/setup.vue"
	//这是精选推荐
	import Selectionrecommended from "@/components/myPersonal/Selectionrecommended.vue"
	const app = getApp();
	export default {
		//这是个人中心
		data() {
			return {
				statusBar:0,
				couponslistdata:[],
				tokey:"",
				nickname:"",
				images:"",
				amount:0,
				integral:0,
				logintokeytext:"",//根据tokey值有没有 来判断用户有没有登录
				//这是账户的数据
				moneylist:[
					{
						num:0,
						miao:"账户余额"
					},
					{
						num:0,
						miao:"我的积分"
					},
					{
						num:0,
						miao:"优惠券",
						url:"/pages/Allcoupons/allcoupons"
					}
				]
			}
		},
		components:{
			orders,
			myScratchableLatex,
			information,
			mycoupons,
			// setup,
			Selectionrecommended
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		methods: {
			
		},
		onShow(){
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					_this.tokey = res.data
					app.globalData.Detectionupdatetokey(res.data)
					//这是检测用户是否登录退出
					uni.request({
						url:`${app.globalData.Requestpath}user/getUserDetail`,
						method:"POST",
						data:{
							token:_this.tokey
						},
						success(resinfo) {
							if(app.globalData.logintokeybool){
								_this.logintokeytext = "退出"
							}else{
								_this.logintokeytext = "登录"
							}
							let {user_nick,user_pic,user_amount,user_integral} = resinfo.data.data
							// console.log(user_nick,user_pic)
							_this.nickname = user_nick
							_this.images = `http://hbk.huiboke.com${user_pic}`
							_this.moneylist[0].num = user_amount
							_this.moneylist[1].num = user_integral
						}
					})
					//这获取用户的优惠券的数量
					uni.request({
						url:`${app.globalData.Requestpath}activity/getUserStoreCouponList`,
						method:"POST",
						data:{
							token:res.data
						},
						success(Storecoupon) {//这是获取到店铺的优惠券
							if(Storecoupon.data.code==0){
							// console.log(Storecoupon.data.data.list,"这是店铺的优惠券")
								uni.request({
									url:`${app.globalData.Requestpath}activity/getUserPlatformCouponList`,
									method:"POST",
									data:{
										token:res.data
									},
									success(Platformcoupon) {//这是获取了平台的优惠券
										if(Platformcoupon.data.code==0){
											_this.moneylist[2].num = Storecoupon.data.data.list.length+Platformcoupon.data.data.list.length
										}
									}
								})
							}
						}
					})
				},
				fail(err){
					app.globalData.Detectionupdatetokey(err.data)
				}
			})
		},
		// created() {
		// 	uni.getStorage({
		// 		key:"bindtokey",
		// 		success(res){
		// 			console.log(res)
		// 			_this.tokey = res.data
		// 			app.globalData.Detectionupdatetokey(res.data)
		// 		},
		// 		fail(err){
		// 			console.log(err)
		// 		}
		// 	})
		// }
	}
</script>

<style>

</style>
