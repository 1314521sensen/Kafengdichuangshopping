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
				}
			})
		}
	}
</script>

<style>

</style>
