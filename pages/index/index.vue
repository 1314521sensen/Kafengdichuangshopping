<template>
	<view class="content">
		<pageheight :statusBar="statusBar"></pageheight>
		<search  @inpblue="inpblue"></search>
		<banner height="260"></banner>
		<scroll-view scroll-y="true" class="scroll-view" @scrolltolower="scrollbottom">
			<ScratchableLatex :cuIconList="cuIconList" :gridCol="gridCol" Scratchableheight="68"></ScratchableLatex>
			<coupons></coupons>
			<view class="father-two">
			    <view class="father-one">
					<Recommend title="热门推荐"></Recommend>
					<shoppinglist class="setmarginTop"></shoppinglist>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import search from "@/components/indexcomponents/search.vue"
	import banner from "@/components/indexcomponents/indexbanner.vue"
	import ScratchableLatex from "@/components/indexcomponents/ScratchableLatex.vue"
	import coupons from "@/components/indexcomponents/coupons.vue"
	import Recommend from '@/components/indexcomponents/Recommend.vue'
	import shoppinglist from "@/components/indexcomponents/shoppinglist.vue"
	const app = getApp();
	export default {
		//这是首页
		data() {
			return {
				//这是首页的高度
				statusBar:0,
				modalName: null,
				//这是九宫格的数据通过父子组件传递
				cuIconList: [
					{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '拼团',
					imgs:"/static/index/Scratchablelatexicon/Spellgroup.png"
				},
				{
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '团购',
					imgs:"/static/index/Scratchablelatexicon/bulk.png"
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '折扣',
					imgs:"/static/index/Scratchablelatexicon/discount.png"
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '新人礼',
					imgs:"/static/index/Scratchablelatexicon/Ledsecurities.gif",
					url:"/pages/Newgift/Newgift",
					Routinghopname:"Newgift"
				}, 
				{
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '品牌',
					imgs:"/static/index/Scratchablelatexicon/brand.png"
				},
				{
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '专题',
					imgs:"/static/index/Scratchablelatexicon/project.png"
				}, 
				{
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '积分',
					imgs:"/static/index/Scratchablelatexicon/integral.png"
				},
				 {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助',
					imgs:"/static/index/Scratchablelatexicon/help.png"
				},
				{
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '限时秒杀',
					imgs:"/static/index/Scratchablelatexicon/help.png"
				},
				{
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '自营',
					imgs:"/static/index/Scratchablelatexicon/help.png"
				}
				],
				gridCol: 5,//这是格数
			}
		},
		
		methods: {
			inpblue(e){
				if(e){
					e.blur()
				}
			},
			//监控scroll-view 滚动标签是否滚动到底部
			scrollbottom(){
				console.log(22)
			},
			//这是用户登录的提示框
			showloginstate(){
				uni.showModal({
					title:"请进行登录",
					content:"如果没有账号，请进行注册",
					showCancel:true,
					cancelText:"已有账号",
					confirmText:"没有账号",
					success(res){//当用户点击了确认以后
						if(res.confirm){ //如果为true的情况下 用户点击了确认以后 就让用户关闭所有页面跳转到// /pages/Personaldata/Personaldata
							uni.navigateTo({
								url:"/pages/Freeregistration/Freeregistration"
							})
						}else{ //如果为false的情况下  用户点击了取消
							uni.navigateTo({
								url:"/pages/login/login"
							})
						}
					}
				})
			},
			//这是封装的 用户是否绑定了登录 和是否绑定了手机号或者邮箱
			booltanchuang(){
				const _this = this
				// #ifdef MP-WEIXIN
					uni.getStorage({
						key:"wxcodekey",
						success(res){
							// console.log(res.data) //这是openid的值
							uni.request({
								url:`http://hbk.huiboke.com/api/login_and_register/userLogin`,
								method:"POST",
								data:{
									login_type:"weixin",
									opened:res.data
								},
								success(reslogintokey) {
									console.log(reslogintokey.data)
									if(reslogintokey.data.code==0){//证明用户已经在数据里 在数据里面就弹出绑定的弹窗
										//在这里取出用户时候进行微信绑定登录了
										console.log()
										uni.getStorage({
											key:"loginstate",
											success(resbindloginstate){//如果取出来证明用户已经登录了
												if(resbindloginstate.data==1){//证明用户已经绑定登录了
													
												}else{//就弹出用户登录的框
													_this.showloginstate()
												}
											},
											fail:()=>{
												
												_this.showloginstate()
											}
										})
									}else{//证明用户没有在数据里面 没有在数据库里面 就弹出登录的弹窗
										console.log(this)
										this.showloginstate()
									}
								}
							})
						}
					})
				// #endif
			},
		},
		onLoad(){
			// #ifdef MP-WEIXIN
				this.booltanchuang()
			// #endif
			// console.log(app.globalData)
			this.statusBar = app.globalData.statusBar
		},
		components:{
			search,
			banner,
			ScratchableLatex,
			coupons,
			shoppinglist,
			Recommend
			// pageheight
		},
		onShow(){
			this.inpblue()
			this.booltanchuang()
			//获取tokey值 为了小程序考虑
			// uni.getStorage({
			// 	key:"bindtokey",
			// 	success(res){
			// 		uni.request({
			// 			url:`${app.globalData.Requestpath}common/refreshToken`,
			// 			method:"POST",
			// 			data:{
			// 				token:res.data,
			// 				v_minute:30
			// 			},
			// 			success(res) {
			// 				if(res.data.code==1){
			// 					uni.reLaunch({
			// 						url:"/pages/login/login"
			// 					})
			// 				}
			// 			}
			// 		})
			// 	}
			// })
		},
		//页面滚动到底部的事件
		onReachBottom(){
			console.log(1)
		},
		// 封装一个是否要弹出弹窗的方法
		
		created(){
			// #ifdef MP-WEIXIN
				this.booltanchuang()
			// #endif
			const _this = this
			
		}
	}
</script>

<style lang="less" scoped>
	.scroll-view{
	  overflow: hidden;
	  height: 100vh;
	  margin-top: 100rpx;
	  background-color: #fff;
	  border-top-left-radius: 40rpx;
	  border-top-right-radius: 40rpx;
	  margin-top:-60rpx;
	  
	 }
	 .Popup-tanchuang{
	  .action{
	   width: 100%;
	   display:flex;
	   justify-content: space-between;
	   button{
	    width: 49%;
	   }
	  }
	 }
	 .setmarginTop{
	  // margin-top:100rpx;
	 }
	 .father-one{
		width: 100%;
	 }
</style>
