<template>
		<view>
			<view class="index-bg" :style="{'padding-top':statusBar+statusBarvalue+'rpx'}" v-if="!(this.$store.state.indexpopupbool)"
			 :class="!livebool ? 'open':'close'">
				<view class="live-entrance" :style="{'height':liveheight+'vh'}">
					<image :src="this.$store.state.httpUrl+'index/indexone/livebg.png'" mode=""></image>
				</view>
				<!-- <view class="live-pendant" v-if="livebool">
				<image :src="this.$store.state.httpUrl+'index/indexone/indexpendant.png'" mode="" @tap="clicklive"></image>
			</view> -->
				<search :showbtn="true"></search>
				<scroll-view 
					:scroll-y="true" 
					class="top"
					@scrolltolower="scrolltolower" 
					@scroll="scroll"
					:scroll-top="scrollTop"
					:lower-threshold="200"
				>
					<!-- 这是商品详情的弹窗 -->
					<!-- <Details v-if="this.$store.state.detailsbool" :DetailsList="DetailsList"></Details> -->
					<!-- <scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
						<view 
							class="cu-item" 
							:class="index==TabCur?'nav-color cur':''" 
							v-for="(item,index) in nanlist" 
							:key="index" 
							@tap="tabSelect" 
							:data-id="index"
						>
							  {{item.gc_short}}
							 </view>
					</scroll-view> -->
					<banner v-if="TabCur<1" :swiperList="swiperList"></banner>
					<!-- <Oneyuanbuys v-show="one_yuan_cha==false && this.$store.state.is_newuser"></Oneyuanbuys> -->
					<!-- <Oneyuanbuys ></Oneyuanbuys> -->
					<Oneyuanbuy @oneyuancha="oneyuancha"></Oneyuanbuy>
					<ScratchableLatex :cuIconList="cuIconList"></ScratchableLatex>
					<!-- <faddish></faddish> -->
					<!-- 后期解开 -->
					<!-- <activity></activity> -->
					<!-- 临时用的开始-->
					<activityimg v-show="one_yuan_cha==false && this.$store.state.is_newuser"></activityimg>
					<linshi></linshi>
					<!-- 临时用的结束 -->
					<!-- <feature></feature> -->
					<!-- 这是惠购物小列表 -->
					<!-- <featuredCommodity></featuredCommodity> -->
					<!-- <exhibitionBanner></exhibitionBanner> -->
					<view class="shopingList" style="margin-top:28rpx">
						<!-- <listNav></listNav> -->

						<list :list='list' :page='page' style="background-color: transparent" display="none" @Detailsdata="Detailsdata"></list>
						<view class="bottom-text" v-if="textbool">
							<text>我也是有底线的</text>
						</view>
					</view>

				</scroll-view>
				<!-- 这是更新app的组件 -->
				<Downloadprompt></Downloadprompt>

				<!-- 这是底部的taber -->
				<tabber v-if="this.$store.state.indexpopupbool==false" @indextapscell="indextapscell"></tabber>
				<view 
					class="Backtop" 
					@tap="Backtop"
					v-show="scrollTopbool"
				>
					<image 
						:src="this.$store.state.httpUrl+'index/indexone/returntop.png'"
						class="Backtopimage"
					></image>
				</view>
			</view>
			<!-- #ifdef APP-PLUS || H5 -->
				<indexpopup v-if="this.$store.state.indexpopupbool"></indexpopup>
			<!-- #endif -->
		</view>
</template>

<script>
	const app = getApp()
	import search from "@/components/Activitesindindex/search.vue"
	import banner from "@/components/indexOneComponents/banner.vue"
	import ScratchableLatex from "@/components/indexOneComponents/ScratchableLatex.vue"
	import faddish from "@/components/indexOneComponents/faddish.vue"
	// import activity from "@/components/indexOneComponents/activity.vue"
	import feature from "@/components/indexOneComponents/feature.vue"
	import featuredCommodity from "@/components/indexOneComponents/featuredCommodity.vue"
	// import exhibitionBanner from "@/components/indexOneComponents/exhibitionBanner.vue"
	//后期加这
	// import listNav from "@/components/indexOneComponents/listNav.vue"

	import list from "@/components/indexOneComponents/list.vue"
	import Downloadprompt from "@/components/indexOneComponents/Downloadprompt.vue"
	// import Details from "@/components/indexcomponents/indexDetails.vue"
	//临时的---开始
	import linshi from "@/components/indexOneComponents/linshi.vue"
	import activityimg from "@/components/indexOneComponents/activityimg.vue"
	//这是弹窗的一元购
	import Oneyuanbuy from "@/components/indexOneComponents/Oneyuanbuy.vue"
	//这是横条的一元购
	// import Oneyuanbuys from "@/components/indexOneComponents/Oneyuanbuys.vue"
	//临时的---结束
	//引入第一次打开App的时候显示服务弹窗
	import indexpopup from "@/components/indexcomponents/indexpopup.vue"
	//引入底部tabbber
	import tabber from "@/components/indexcomponents/indextaber.vue"
	export default {
		data() {
			return {
				nanlist: [],
				liveheight: 0, //下拉直播组件的高度
				livebool: true, //判断是否下拉
				TabCur: 0,
				scrollLeft: 0,
				statusBar: 0,
				statusBarvalue: 10,
				list: [],
				iconbool: true,
				page: 1,
				textbool: false,
				//这是九宫格的数据通过父子组件传递
				cuIconList: [{
						cuIcon: 'cardboardfill',
						color: 'red',
						badge: 120,
						name: '休闲零食',
						imgs: `${this.$store.state.httpUrl}newindexScratchable/Leisuresnacks.png`,
						url: "/pages/autotrophy/autotrophy"
					},
					{
						cuIcon: 'recordfill',
						color: 'orange',
						badge: 1,
						name: '应季水果',
						imgs: `${this.$store.state.httpUrl}newindexScratchable/Seasonalfruit.png`,
						url: "/pages/autotrophy/autotrophy"
					}, {
						cuIcon: 'picfill',
						color: 'yellow',
						badge: 0,
						name: '地方美食',
						imgs: `${this.$store.state.httpUrl}newindexScratchable/Localdelicacies.png`,
						url: "/pages/autotrophy/autotrophy"
					},
					{
						cuIcon: 'discoverfill',
						color: 'purple',
						badge: 0,
						name: '牛奶饮品',
						imgs: `${this.$store.state.httpUrl}newindexScratchable/Milkdrinks.png`,
						url: "/pages/autotrophy/autotrophy"
					},
					{
						cuIcon: 'questionfill',
						color: 'mauve',
						badge: 0,
						name: '生鲜',
						imgs: `${this.$store.state.httpUrl}newindexScratchable/Freshvegetarian.png`,
						url: "/pages/autotrophy/autotrophy"
					},
					{
						cuIcon: 'clothesfill',
						color: 'blue',
						badge: 0,
						name: '老字号',
						imgs: `${this.$store.state.httpUrl}newindexScratchable/old.png`,
						url: "/pages/autotrophy/autotrophy"
					},
					{
						cuIcon: 'upstagefill',
						color: 'cyan',
						badge: 0,
						name: '进口食品',
						imgs: `${this.$store.state.httpUrl}newindexScratchable/Importedfood.png`,
						url: "/pages/autotrophy/autotrophy"
					},
					{
						cuIcon: 'questionfill',
						color: 'mauve',
						badge: 0,
						name: '粮油米面',
						imgs: `${this.$store.state.httpUrl}newindexScratchable/Grain.png`,
						url: "/pages/autotrophy/autotrophy"
					},
					{
						cuIcon: 'noticefill',
						color: 'olive',
						badge: 22,
						name: '新人专区',
						imgs: `${this.$store.state.httpUrl}newindexScratchable/Newgift.gif`,
						url: "/pages/Newgift/Newgift",
						Routinghopname: "Newgift"
					},
					// {
					// 	cuIcon: 'questionfill',
					// 	color: 'mauve',
					// 	badge: 0,
					// 	name: '帮助',
					// 	imgs:`${this.$store.state.httpUrl}newindexScratchable/help.png`
					// 	// url:""///pages/help/help
					// }
				],
				swiperList: [],
				DetailsList: [],
				one_yuan_cha: false, //一元专区是否显示
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				scrollTopbool:false
			}
		},
		components: {
			search,
			banner,
			ScratchableLatex,
			faddish,
			// activity,
			feature,
			featuredCommodity,
			// exhibitionBanner,
			// listNav,
			list,
			//这是更新的组件
			Downloadprompt,
			// Details
			//临时的--开始
			linshi,
			activityimg,
			//临时的结束
			//一元购
			Oneyuanbuy,
			// Oneyuanbuys,
			//首页服务的弹窗
			indexpopup,
			//底部tabber
			tabber
		},
		methods: {
			//****一元专区---开始****
			oneyuancha() {
				this.one_yuan_cha = false
			},
			//****一元专区---结束****
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			indexshoplist(page) {
				const _this = this
				uni.request({
					url: `${app.globalData.Requestpath}good/getGoodList`,
					data: {
						page: _this.page,
						pageSize: 10,
						o_type: 1,
						o_rule: 1
					},
					success(res) {
						// console.log(res)
						if (res.data.code == 0) {
							if (_this.page > 1) {
								_this.list = _this.list.concat(res.data.data.list)
								// console.log(_this.list)
							} else {
								_this.list = res.data.data.list
							}
						} else {
							// app.globalData.showtoastsame("数据暂无")
							_this.textbool = true
						}
						_this.iconbool = false
					}
				})
			},
			scrolltolower() {
				this.page += 1
				this.indexshoplist(this.page)
			},
			//这是用户登录的提示框
			showloginstate() {
				uni.showModal({
					title: "请进行登录",
					content: "如果没有账号，请进行注册",
					showCancel: true,
					cancelText: "已有账号",
					confirmText: "没有账号",
					success(res) { //当用户点击了确认以后
						if (res.confirm) { //如果为true的情况下 用户点击了确认以后 就让用户关闭所有页面跳转到// /pages/Personaldata/Personaldata
							uni.navigateTo({
								url: "/pages/Freeregistration/Freeregistration"
							})
						} else { //如果为false的情况下  用户点击了取消
							uni.navigateTo({
								url: "/pages/login/login"
							})
						}
					}
				})
			},
			//这是封装的 用户是否绑定了登录 和是否绑定了手机号或者邮箱
			booltanchuang() {
				const _this = this
				// #ifdef MP-WEIXIN
				uni.getStorage({
					key: "wxcodekey",
					success(res) {
						// console.log(res.data) //这是openid的值
						uni.request({
							url: `${app.globalData.Requestpath}login_and_register/userLogin`,
							method: "POST",
							data: {
								login_type: "weixin",
								opened: res.data
							},
							success(reslogintokey) {
								if (reslogintokey.data.code == 0) { //证明用户已经在数据里 在数据里面就弹出绑定的弹窗
									//在这里取出用户时候进行微信绑定登录了
									uni.getStorage({
										key: "loginstate",
										success(resbindloginstate) { //如果取出来证明用户已经登录了
											if (resbindloginstate.data == 1) { //证明用户已经绑定登录了

											} else { //就弹出用户登录的框
												_this.showloginstate()
											}
										},
										fail: () => {

											_this.showloginstate()
										}
									})
								} else { //证明用户没有在数据里面 没有在数据库里面 就弹出登录的弹窗
									this.showloginstate()
								}
							}
						})
					}
				})
				// #endif
			},
			//用户下拉的组件
			clicklive() {
				this.liveheight = 100
				this.livebool = false
				this.statusBarvalue = 0
				this.statusBar = 0
			},
			//这是列表长按时弹窗的数据
			Detailsdata(e) {
				// console.log(e)
				this.DetailsList = e
			},
			//当列表滚动时 就让弹窗关闭
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
				if(e.detail.scrollTop>100){
					this.scrollTopbool = true
				}else{
					this.scrollTopbool = false
				}
			},
			Backtop(){
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
					this.scrollTopbool = false
				});
			},
			//当连续点击index的时候
			indextapscell(e){
				// console.log(e)
				this.scrollTop = e
				this.$nextTick(function() {
					this.scrollTop = e
					//当e = 600的时候 将回到首页的按钮 变为true 否则等于0的时候 就变为false
					this.scrollTopbool = parseInt(e)? true : false
				});
			}
		},
		onLoad() {
			//每次显示首页的时候 显示tabber
			uni.showTabBar()
			// #ifdef MP-WEIXIN
			this.booltanchuang()
			// #endif
			this.statusBar = app.globalData.statusBar
			//启动页更改缓存中的值
			uni.setStorage({
				key: "Startpagebool",
				data: false
			})
		},
		created() {
			const _this = this
			_this.indexshoplist(1)
			uni.request({
				url: `${app.globalData.Requestpath}platform_config/getThumbSlideshow`,
				data: {
					limit: 5
				},
				success(res) {
					// console.log(res)
					if (res.data.code == 0) {
						_this.swiperList = res.data.data
					}
				}
			})

			// 头部导航栏的   
			uni.request({
				url: `${app.globalData.Requestpath}common/getOneLevelCategoryList`,
				data: {
					pid: 0
				},
				success(res) {
					_this.nanlist = res.data.data
				}
			})
			uni.getStorage({
					key:"bindtokey",
					success(restokey) {
					 uni.request({
						url:`${app.globalData.Requestpath}user/getShippingAddressList`,
						method:"POST",
						data:{
							token:restokey.data,
							page:1,
							pageSize:10
					  },
					  success(res) {
					   if(res.data.code==0){
						//将地址中的数据长度加入到缓存中 借用个数去做订单中的地址的判断
							uni.setStorage({
							 key:"addresslength",
							 data:res.data.data.length
							})
						}
					}
				   })
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.index-bg {
		background-color: #f2f2f2;
		// background-image: linear-gradient(#ee0a79, #ff6a03);
		background-image: linear-gradient(#Ea3426, #fc3426);
		background-size: 100% 327rpx;
		background-repeat:no-repeat;
		// background-size: 100% 327rpx;
		// background-repeat:no-repeat;
		.top {

			height: 100vh;

			.bg-white {
				color: #FFFFFF;
			}
		}

		.nav {
			font-weight: bold;
			font-size: 30rpx;
			background-color: transparent;

			.cu-item {
				color: #f2f2f2;
				font-weight: bold;
				height: 50rpx;
				line-height: 50rpx;
			}

			// line-height: 102rpx;
		}

		.shopingList {
			background-color: #f2f2f2;

			.bottom-text {
				text-align: center;
				color: #CCCCCC;
			}
		}
	}

	.nav-color {
		color: #FFFFFF;
		font-size: 36rpx;
		border: 0 !important;
	}

	.open {
		overflow: hidden;
		height: 100vh;
	}

	.close {
		overflow: visible;
	}

	.live-entrance {
		height: 0;
		overflow: hidden;
		transition: 2s;

		image {
			width: 100%;
			height: 100vh;
		}
	}

	.live-pendant {
		position: absolute;
		top: 0;
		left: 400rpx;
		width: 100rpx;
		height: 200rpx;
		z-index: 99;

		image {
			width: 100%;
			height: 100%;
		}
	}
	.Backtop{
		position: fixed;
		bottom:200rpx;
		right:20rpx;
		width: 70rpx;
		height:70rpx;
		background-color:rgba(0,0,0,.5);
		border-radius:50%;
		z-index:3;
		.Backtopimage{
			width: 100%;
			height:100%;
		}
	}
</style>
