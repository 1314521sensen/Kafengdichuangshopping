<template>
	<view class="content">
		<pageheight :statusBar="statusBar"></pageheight>
		<search  
			@inpblue="inpblue" 
			:TabCur="TabCur" 
			:style="{'height':seachheight+'rpx','position':seachstatic,'top':'0','z-index':zIndex,'padding-top':paddingtop+'rpx','width':'100%'}"
		>
		</search>
		<scroll-view 
			scroll-x 
			class="text-white nav nav_top" 
			scroll-with-animation 
			:scroll-left="scrollLeft" 
			:style="{
				'z-index':zIndex,
				'top':navtop+'rpx',
				'position':navposition
			}">
		   <view class="cu-item nav" :class="index==TabCur?'text-yellow':''" v-for="(item,index) in nanlist" :key="index" @tap="tabSelect" :data-id="index">
		    {{item.name}}
		   </view>
		  </scroll-view>
		  <view v-if="TabCur==0">
			  <banner :height="bannheight" :style="{'height':bannheight+'rpx'}"></banner>
			  <scroll-view scroll-y="true" class="scroll-view" @scrolltolower="scrollbottom" @scroll="realtime" @scrolltoupper="scrotop">
			  	<ScratchableLatex :cuIconList="cuIconList" :gridCol="gridCol" Scratchableheight="68" :style="{'margin-top':ScratchableLatextop+'rpx'}"></ScratchableLatex>
			  	<product></product>
			  	<coupons></coupons>
				<bgbanner :swiperList='swiperList' :isRounddot="swiperList.length>1?true:false"></bgbanner>
			  	<Wouldyoulive></Wouldyoulive>
			  	<Recommend title="特色购" height="60" bordercolor="#000"></Recommend>
			  	<purchasing></purchasing>
			  	<view class="father-two">
			  	    <view class="father-one">
			  			<Recommend title="热门推荐" bg="#f5f5f5"></Recommend>
			  			<shoppinglist class="setmarginTop"></shoppinglist>
			  		</view>
			  	</view>
			  </scroll-view>
		  </view>
		  <!-- 这是未选中的 -->
		  <view v-if="TabCur!==0">
			  <scroll-view scroll-y="true" class="scroll-view" @scrolltolower="scrollbottom" @scroll="realtime" @scrolltoupper="scrotop">
				  <ScratchableLatex :cuIconList="cuIconList" :gridCol="gridCol" Scratchableheight="68" :style="{'margin-top':ScratchableLatextop+'rpx'}"></ScratchableLatex>
				  <bgbanner :swiperList='swiperList' :isRounddot="swiperList.length>1?true:false"></bgbanner>
				  <shoppinglist class="setmarginTop"></shoppinglist>
			  </scroll-view>
		  </view>
	</view>
</template>

<script>
	import search from "@/components/indexcomponents/search.vue"
	import banner from "@/components/indexcomponents/indexbanner.vue"
	import ScratchableLatex from "@/components/indexcomponents/ScratchableLatex.vue"
	import coupons from "@/components/indexcomponents/coupons.vue"
	import Recommend from '@/components/indexcomponents/Recommend.vue'
	import shoppinglist from "@/components/indexcomponents/shoppinglist.vue"
	import product from "@/components/indexcomponents/product.vue"
	import Wouldyoulive from "@/components/indexcomponents/Wouldyoulive.vue"
	import purchasing from "@/components/indexcomponents/purchasing.vue"
	import bgbanner from "@/components/indexcomponents/menswearaaner.vue"
	const app = getApp();
	export default {
		//这是首页
		data() {
			return {
				//这是首页的高度
				statusBar:0,
				modalName: null,
				//这是九宫格的数据通过父子组件传递
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '拼团',
					imgs:"/static/index/Scratchablelatexicon/Spellgroup.png",
					url:"/pages/groupbooking/groupbooking"
				},
				{
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '团购',
					imgs:"/static/index/Scratchablelatexicon/bulk.png",
					url:"/pages/grouppurchase/grouppurchase"
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '折扣',
					imgs:"/static/index/Scratchablelatexicon/discount.png",
					url:"/pages/discount/discount"
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
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '限时秒杀',
					imgs:"/static/index/Scratchablelatexicon/Secondskill.gif",
					url:"/pages/limitedtimesecondskill/limitedtimesecondskill"
				},
				{
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '专题',
					imgs:"/static/index/Scratchablelatexicon/project.png",
					url:"/pages/topicpage/topicpage"
				}, 
				{
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '积分',
					imgs:"/static/index/Scratchablelatexicon/integral.png",
					url:"/pages/integralstore/integralstore"
				},
				{
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '自营',
					imgs:"/static/index/Scratchablelatexicon/proprietary.png",
					url:"/pages/autotrophy/autotrophy"
				},
				{
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助',
					imgs:"/static/index/Scratchablelatexicon/help.png",
					url:"/pages/help/help"
				}
				],
				gridCol: 5,//这是格数
				nanlist:[
				     {
				      name:"首页"
				     },
				     {
				      name:"运动"
				     },
				     {
				      name:"男装"
				     },
				     {
				      name:"鞋靴"
				     },
				     {
				      name:"食品"
				     },
				     {
				      name:"医疗"
				     },
				     {
				      name:"电器"
				     },
				     {
				      name:'女装'
				     }
				    ],
				scrollLeft:0,
				TabCur: 0,
				swiperList: [{
				     id: 0,
				     type: 'image',
				     url: '/static/index/indexDailygood/activitybanner.gif'
				}],
				//接下来都是处理一个老板要求的特效,
				bannheight:260,//这两个高度是老板提出的意见 必须这么做 这个是banner的高度
				seachheight:420,//这两个高度是老板提出的意见 必须这么做 这个是seachheight
				seachstatic:'static',
				zIndex:0,
				paddingtop:22,
				// #ifdef H5
					navtop:80,
				// #endif
				// #ifdef APP-PLUS
					navtop:140,
				// #endif
				navposition:'absolute',
				ScratchableLatextop:68
			}
		},
		methods: {
			inpblue(e){
				if(e){
					e.blur()
				}
				
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				if(parseInt(this.TabCur)!==0){
					this.seachheight = 228
				}else{
					this.seachheight=420
				}
			 },
			//监控scroll-view 滚动标签是否滚动到底部
			scrollbottom(){
				//当用户一下子滚动到底部的时候 改变banner 和seach的高度
			},
			//当用户滚动到顶部的时候
			scrotop(){
				this.bannheight=260
				if(parseInt(this.TabCur)==0){
					this.seachheight=420
				}else{
					this.seachheight = 228
				}
			},
			//这是实时滚动
			realtime(e){
				// console.log("实时滚动",e)
				//原来的210px
				//原来的banner 130px
				// seach 200rpx
				//banner0
				let {deltaY} = e.detail
				// console.log(deltaY)
				if(deltaY<0){
					//当用户滚动时 改变banner的高度
					// console.log("向下滚动")
					this.bannheight=0
					this.seachheight=220
					this.seachstatic = 'fixed'
					this.zIndex = 1
					this.paddingtop = 64
					this.navtop = 120
					this.navposition = 'fixed'
					this.ScratchableLatextop = 268
				}else{
					// console.log("向上滚动")
					// this.bannheight=260
					// this.seachheight=420
					this.seachstatic = 'static'
					this.zIndex = 1
					this.paddingtop = 22
					// #ifdef H5
					this.navtop = 80
					// #endif
					// #ifdef APP-PLUS
					this.navtop = 140
					// #endif
					this.navposition = 'absolute'
					this.ScratchableLatextop = 68
				}
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
			//启动页更改缓存中的值
			uni.setStorage({
				key:"Startpagebool",
				data:false
			})
		},
		components:{
			search,
			banner,
			ScratchableLatex,
			coupons,
			shoppinglist,
			Recommend,
			product,
			Wouldyoulive,
			purchasing,
			bgbanner
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
			console.log("移到底部")
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
	.nav{
		font-weight: bold;
		font-size: 30rpx;
		line-height: 102rpx;
	}
	.nav_top{
	   position:absolute;
	   /* #ifdef H5 */
		top: 80rpx;
	   /* #endif */
	   /* #ifdef APP-PLUS */
		top:140rpx;
	   /* #endif */
	}
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
