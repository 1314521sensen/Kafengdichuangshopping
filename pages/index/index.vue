<template>
	<view class="index-bg" :style="{'padding-top':statusBar+10+'rpx'}">
		<search :showbtn="true"></search>
		<scroll-view :scroll-y="true" class="top" @scrolltolower="scrolltolower">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="index==TabCur?'nav-color cur':''" v-for="(item,index) in nanlist" :key="index" @tap="tabSelect" :data-id="index">
						{{item.name}}
					</view>
				</scroll-view>
				<banner v-if="TabCur<1" :swiperList="swiperList"></banner>
				<ScratchableLatex :cuIconList="cuIconList"></ScratchableLatex>
				<faddish></faddish>
				<activity></activity>
				<feature></feature>
				<featuredCommodity></featuredCommodity>
				<exhibitionBanner></exhibitionBanner>
			<view class="shopingList">
				<listNav></listNav>
				<list :list='list' :page='page' style="background-color: transparent" display="none"></list>
				<view class="bottom-text" v-if="textbool">
					<text>我也是有底线的</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const app = getApp()
	import search from "@/components/Activitesindindex/search.vue"
	import banner from "@/components/indexOneComponents/banner.vue"
	import ScratchableLatex from "@/components/indexOneComponents/ScratchableLatex.vue"
	import faddish from "@/components/indexOneComponents/faddish.vue"
	import activity from "@/components/indexOneComponents/activity.vue"
	import feature from "@/components/indexOneComponents/feature.vue"
	import featuredCommodity from "@/components/indexOneComponents/featuredCommodity.vue"
	import exhibitionBanner from "@/components/indexOneComponents/exhibitionBanner.vue"
	import listNav from "@/components/indexOneComponents/listNav.vue"
	
	import list from "@/components/indexOneComponents/list.vue"
	export default {
		data() {
			return {
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
				TabCur: 0,
				scrollLeft: 0,
				statusBar:0,
				list:[],
				iconbool:true,
				page:1,
				textbool:false,
				//这是九宫格的数据通过父子组件传递
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '休闲零食',
					imgs:"http://hbk.huiboke.com/uploads/app/image/newindexScratchable/Leisuresnacks.png",
					url:"/pages/groupbooking/groupbooking"
				},
				{
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '应季水果',
					imgs:"http://hbk.huiboke.com/uploads/app/image/newindexScratchable/Seasonalfruit.png",
					url:"/pages/grouppurchase/grouppurchase"
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '地方美食',
					imgs:"http://hbk.huiboke.com/uploads/app/image/newindexScratchable/Localdelicacies.png",
					url:"/pages/discount/discount"
				}, 
				{
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '牛奶饮品',
					imgs:"http://hbk.huiboke.com/uploads/app/image/newindexScratchable/Milkdrinks.png",
					url:"/pages/brand/brand"
				},
				{
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '生鲜速食',
					imgs:"http://hbk.huiboke.com/uploads/app/image/newindexScratchable/Freshvegetarian.png",
					url:"/pages/limitedtimesecondskill/limitedtimesecondskill"
				},
				{
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '老字号',
					imgs:"http://hbk.huiboke.com/uploads/app/image/newindexScratchable/old.png",
					url:"/pages/topicpage/topicpage"
				}, 
				{
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '进品食品',
					imgs:"http://hbk.huiboke.com/uploads/app/image/newindexScratchable/Importedfood.png",
					url:"/pages/integralstore/integralstore"
				},
				{
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '粮油米面',
					imgs:"http://hbk.huiboke.com/uploads/app/image/newindexScratchable/Grain.png",
					url:"/pages/autotrophy/autotrophy"
				},
				{
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '新人专区',
					imgs:"http://hbk.huiboke.com/uploads/app/image/newindexScratchable/Newgift.gif",
					url:"/pages/Newgift/Newgift",
					Routinghopname:"Newgift"
				},
				{
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助',
					imgs:"http://hbk.huiboke.com/uploads/app/image/newindexScratchable/help.png",
					url:"/pages/help/help"
				}
				],
				swiperList:[]
			}
		},
		components:{
			search,
			banner,
			ScratchableLatex,
			faddish,
			activity,
			feature,
			featuredCommodity,
			exhibitionBanner,
			listNav,
			list
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				
			},
			indexshoplist(page){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}good/getRecommendGoodsList`,
					data:{
						page:_this.page,
						pageSize:10
					},
					success(res) {
						if(res.data.code==0){
							if(_this.page>1){
								_this.list = _this.list.concat(res.data.data.list)
								// console.log(_this.list)
							}else{
								_this.list = res.data.data.list
							}
						}else{
							// app.globalData.showtoastsame("数据暂无")
							_this.textbool = true
						}
						_this.iconbool = false
					}
				})
			},
			scrolltolower(){
				this.page+=1
				this.indexshoplist(this.page)
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
									if(reslogintokey.data.code==0){//证明用户已经在数据里 在数据里面就弹出绑定的弹窗
										//在这里取出用户时候进行微信绑定登录了
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
										this.showloginstate()
									}
								}
							})
						}
					})
				// #endif
			},
		},
		onLoad() {
			// #ifdef MP-WEIXIN
				this.booltanchuang()
			// #endif
			this.statusBar = app.globalData.statusBar
			//启动页更改缓存中的值
			uni.setStorage({
				key:"Startpagebool",
				data:false
			})
		},
		created(){
			const _this = this
			_this.indexshoplist(1)
			uni.request({
				url:`${app.globalData.Requestpath}platform_config/getThumbSlideshow`,
				data:{
					limit:5
				},
				success(res) {
					if(res.data.code==0){
						_this.swiperList = res.data.data
					}
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.index-bg{
		// background-color: #ffffff;
		background-image: linear-gradient(#ee0a79, #ff6a03);
		// background-size: 100% 327rpx;
		// background-repeat:no-repeat;
		.top{
				
			height: 100vh;
			.bg-white{
				color: #FFFFFF;
			}
		}
		.nav{
			font-weight: bold;
			font-size: 30rpx;
			background-color:transparent;
			.cu-item{
				color: #f2f2f2;
				font-weight: bold;
				height:50rpx;
				line-height:50rpx;
			}
			
			// line-height: 102rpx;
		}
		.shopingList{
			background-color: #f2f2f2;
			.bottom-text{
				text-align: center;
				color: #CCCCCC;
			}
		}
	}
	.nav-color{
		color: #FFFFFF;
		font-size: 36rpx;
		border: 0 !important;
	}
</style>
