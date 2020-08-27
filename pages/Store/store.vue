<template>
	<view>
		<!-- <canvas canvas-id="qrcode" style="width:  ;height: 256px;" v-show="QRcodebool"/> -->
		<view class="store" v-if="loadingbool">
			<!-- <pageheight :statusBar="statusBar"></pageheight> -->
			<!-- 顶部 -->
			<view class="kepala" :style="{'background-image':'url('+this.$store.state.httpUrl+'store/store_bg.png)','padding-top':statusBar+20+'rpx'}">
				<!-- 导航 -->
				<view class="kep_nav">
					<view class="cu-bar">
						<view class="action">
							<text class="cuIcon-back text-white action_Ico" @tap="returnshopdefailt"></text>
						</view>
						<view class="search-form round inpufuoBox">
							<text class="cuIcon-search"></text>
							<input 
								@focus="InputFocus" 
								@blur="InputBlur" 
								@input="Input" 
								:adjust-position="false" 
								type="text" 
								placeholder="搜索商品" 
								confirm-type="search"
								v-model="keyword"
							></input>
						</view>
						<view class="Icon_lgo" @tap="share">
							<text class="lg text-gray cuIcon-forward"></text>
						</view>
					</view>
				</view>
				<!-- 店铺简介  -->
				<view class="store_presentation">
					<!-- 店铺上面的左边信息 -->
					<view class="store_presentationLeft">
						<view class="logoBox">
							<image class="logo" :src="imgpath+store_logo"></image>
						</view>
						<view class="store_nameBox">
							<view class="storeName_text">{{Shopname}}</view>
							<view>
								<view class="Storequality">
									<text class="TheStoreCredit">店铺信用</text>
									<uniRate
										:size='14' 
										color="#fff" 
										active-color="#e96201" 
										:margin="4" 
										:disabled="true"
										:max="5"
										:value="storecredit"
									></uniRate>
								</view>
								<view class="Storequality">
									<text class="TheStoreCredit">综合评分</text>
									<uniRate 
										:size='14' 
										color="#fff" 
										active-color="#e96201" 
										:margin="4" 
										:disabled="true"
										:max="5"
										:value="score"
									></uniRate>
								</view>
							</view>
							<view></view>
						</view>
					</view>
					<!-- 右边的关注等 -->
					<view class="store_presentationRight">
						<view class="butt_on" @tap="attentionstore">
							<text>+</text>
							关注
						</view>
						<view>{{fav_count}}人</view>
					</view>
				</view>
				<!-- 分类 -->
				<view class="store-nav">
					<view>
						<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
							<view class="cu-item" :class="index==TabCur?' cur':''" v-for="(item,index) in navlist" :key="index" @tap="tabSelect" :data-id="index" :data-items="item">
								{{item}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<!-- 判断用户点击的哪个按钮 -->
			<scroll-view :scroll-y="true" class="scroll-view" @scrolltolower="scrolltolower">
				<view class="navshowitem" v-if="parseInt(TabCur)==0">
					<!-- 直播间  小广告 -->
					<!-- v-show="isWhetherlive"  -->
					<adlet 
						:live_url="live_url"
						:livenick="livenick"
						:roomid="roomid"
						:livepic="livepic"
						:uname="uname"
						:uid="uid"
						:livedesc="livedesc"
						v-if="adletbool"
					></adlet>
					<!-- 新品活动xxx等  可能是轮播图 -->
					<storebanner></storebanner>
					<!-- 优惠券 -->
					<discountcoupon :list='list' v-if="bool"></discountcoupon>
					<!-- 新品开业 -->
					<storenewArrival :storenewArrivallist="storenewArrivallist"></storenewArrival>
					<!-- 精品大卖 -->
					<boutiqueBarley msg="精品大卖" :horizontallylist="horizontallylist"></boutiqueBarley>
				</view>
				<view class="navshowitem" v-if="parseInt(TabCur)==1">
					<boutiqueBarley msg="推荐宝贝" :horizontallylist='bodylist'></boutiqueBarley>
				</view>
				<view class="navshowitem" v-if="parseInt(TabCur)==2">
					<boutiqueBarley msg="推荐新品" :horizontallylist="newslist"></boutiqueBarley>
				</view>
				<!-- && userstoreid==storeid -->
				<view v-if="parseInt(TabCur)==3">
					<liveMerchant :storeid="storeid"></liveMerchant>
				</view>
			</scroll-view>
		</view>
		<!--  -->
		<loading v-if="loadingbool==false"></loading>
		<QRcodeA :isCode='isCode' v-if="isCode" @cancel="cancel"></QRcodeA>
	</view>
</template>

<script>
	// 引入五角星  
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	//引入的热销组件
	import storerecommended from "@/components/store/storerecommended.vue"
	//引入宝贝的组件
	import storebady from "@/components/store/storebady.vue"
	//引入新品列表
	import storenews from "@/components/store/storenews.vue"
	//引入视频
	// import storevideo from "@/components/store/storevideo.vue"
	// 引入轮播图   
	import storebanner from "@/components/store/storebanner.vue"
	// 优惠券
	import discountcoupon from "@/components/store/discountcoupon.vue"
	// 新品开业    
	import storenewArrival from "@/components/store/storenewArrival.vue"
	// 精品大卖
	import boutiqueBarley  from "@/components/store/boutiquebarley.vue"
	import adlet from "@/components/store/adlet.vue"
	import liveMerchant from "@/components/store/liveMerchant.vue"
	// 引入nvue二维码弹框
	import QRcodeA from '@/components/QRcodeA/QRcodeA.vue'
	const app = getApp()
	export default {
		//这是店铺    
		data() {
			return {
				statusBar:0,
				items:"推荐",
				// Month:0,
				// day:0,
				storeid:"",
				Shopname:"",//店铺的名字
				Whetherproprietary:false,//是否自营  
				score:0,//分数
				storecredit:"",
				newslist:[],
				horizontallylist:[],
				bodylist:[],
				itemss:"",
				TabCur: 0,
				scrollLeft: 0,
				navlist:["推荐","宝贝","新品","直播"],//"视频"
				page:1,
				fav_count:0,//关注的人数
				store_logo:"",//店铺logo
				storenewArrivallist:[],//新店开业数据
				list:[],
				bool:false,
				keyword:"",
				isWhetherlive:false,
				live_url:"",
				livenick:"",
				roomid:"",
				livepic:"",
				uname:"",
				uid:"",
				livedesc:"",
				loadingbool:false,
				isCode:false,
				userstoreid:0,//获取用户的店铺id和当前的店铺id进行比较
				adletbool:false,
				imgpath:this.$store.state.imgyuming
			}
		},
		methods: {
			getChildnav(e){
				// console.log(e)
				this.items = e
				// console.log(this.items)
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			tabSelect(e) {
				let {id,items} = e.currentTarget.dataset
				this.itemss = items
				// console.log(e.currentTarget.dataset)
				this.TabCur = id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			returnshopdefailt(){
				uni.navigateBack()
			},
			//封装三个 请求不同的数据
			getrecommended(page){
				const _this = this
				//获取推荐
				uni.request({
					url:`${app.globalData.Requestpath}store/getStoreRecommendGoodList`,
					data:{
						sid:_this.storeid,
						page:page,
						pageSize:10
					},
					success(res) {
						// console.log(res)
						if(res.data.code==0){
							if(_this.page>1){
								_this.horizontallylist = _this.horizontallylist.concat(res.data.data.list)
							}else{
								_this.horizontallylist = res.data.data.list
							}
						}
					}
				})
			},
			getbabylist(page){
				const _this = this
				//获取宝贝信息
				uni.request({
					url:`${app.globalData.Requestpath}store/getStoreGoodList`,
					data:{
						sid:_this.storeid,
						page:page,
						limit:10
					},
					success(res) {
						if(res.data.code==0){
							if(_this.page>1){
								_this.bodylist = _this.bodylist.concat(res.data.data.list)
							}else{
								_this.bodylist = res.data.data.list
							}
						}
					}
				})
			},
			//用户滑到底部的时候触发
			scrolltolower(){
				this.page++
				this.getrecommended(this.page)
				this.getbabylist(this.page)
			},
			attentionstore(){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(restokey) {
						uni.request({
							url:`${app.globalData.Requestpath}user/addStoreFavoriteInfo`,
							method:"POST",
							data:{
								token:restokey.data,
								store_id:_this.storeid,
								store_name:_this.Shopname,
								store_logo:_this.store_logo
							},
							success(res) {
								if(res.data.code==0){
									app.globalData.showtoastsame(res.data.msg)
								}else{
									app.globalData.Detectionupdatetokey(restokey.data)
									app.globalData.showtoastsame(res.data.msg)
								}
							}
						})
					}
				})
				
			},
			share(){
				this.isCode = true
			},
			cancel(){
				this.isCode = false
			},
			Input(e){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}store/getStoreGoodList?sid=${_this.storeid}`,
					data:{
						g_name:_this.keyword
					},
					success(res) {
						if(res.data.code==0){
							_this.bodylist = res.data.data.list
						}else{
							_this.bodylist = []
						}
					}
				})
				_this.TabCur = 1
			},
		},
		onLoad(opction){
			const _this = this
			_this.storeid = opction.storeid
			_this.statusBar = app.globalData.statusBar
			// console.log(_this.Month,_this.day)
			
			uni.request({
				url:`${app.globalData.Requestpath}store/getStoreInfo`,
				data:{
					sid:_this.storeid
				},
				success(res) {
					// console.log(res)
					if(res.data.code==0){
						let {store_name,user_id,is_platform_store,store_servicecredit,store_credit,fav_count,store_logo,live_desc} = res.data.data
						// console.log(user_id)
						_this.store_logo = store_logo
						_this.fav_count = fav_count
						_this.Shopname = store_name
						_this.score = store_servicecredit
						_this.storecredit = store_credit
						_this.livedesc = live_desc
						_this.loadingbool = true
						//判断是否自营
						if(is_platform_store){
							_this.Whetherproprietary = true
						}else{
							_this.Whetherproprietary = false
						}
						//根据店铺id请求主播详情信息
						uni.request({
							url:`${app.globalData.Requestpath}live_user/getLiveUserInfoByUid`,
							data:{
								uid:user_id
							},
							success(res) {
								// console.log(res)
								if(res.data.code==0){
									let {live_url,live_nick,room_id,live_pic,user_name,user_id,is_living} = res.data.data
									_this.live_url = live_url
									_this.livenick = live_nick
									_this.roomid = room_id
									_this.livepic = live_pic
									_this.uname = user_name
									_this.uid = user_id
									if(parseInt(is_living)==1){
										_this.adletbool = true
									}else{
										_this.adletbool = false
									}
								}else{
									_this.adletbool = false
								}
							}
						})
					}
					
				}
			})
			//获取推荐
			_this.getrecommended(1)
			_this.getbabylist(1)
			// console.log(_this.storeid)
			//获取商品的新品信息系
			uni.request({
				url:`${app.globalData.Requestpath}store/getNewStoreGoodList`,
				data:{
					sid:_this.storeid,
					limit:10
				},
				success(res) {
					// console.log(res)
					_this.newslist = res.data.data
				}
			})
			//请求新店开业随机商品
			uni.request({
				url:`${app.globalData.Requestpath}store/getRandomStoreRecommendGoodList`,
				data:{
					sid:_this.storeid,
					limit:10,
				},
				success(res) {
					if(res.data.code==0){
						_this.storenewArrivallist = res.data.data
					}
				}
			})
		},
		components:{
			uniRate,
			storerecommended,
			storebady,
			storenews,
			storebanner,
			discountcoupon,
			storenewArrival,
			boutiqueBarley,
			adlet,
			liveMerchant,
			QRcodeA
		},
		created() {
			const _this = this
			//优惠券
			uni.getStorage({
				key:'bindtokey',
				success:function(res){
					uni.request({
						url:`${app.globalData.Requestpath}activity/getStoreCouponTypeList`,
						method:"POST",
						data:{
							token:res.data,
							sid:_this.storeid,
						},
						success(res) {
							if(res.data.code==0){
								_this.list = res.data.data.list
								_this.bool = true
								
							}else{
								_this.bool = false
							}
						}
					})
					
				}
			})
			//获取缓存中用户的店铺id
			uni.getStorage({
				key:"userstoreid",
				success(resuserstore) {
					_this.userstoreid = resuserstore.data
					
				},
				fail(){
					_this.userstoreid = 0
				}
			})
			//判断用户的店铺id和店铺的id是不是相等 不相等 就隐藏 相等就显示
			let userstoreidbool = parseInt(_this.storeid)==parseInt(_this.userstoreid) ? true : false
			if(!userstoreidbool){
				// console.log(111)
				_this.navlist.pop()
			}
			
		},
	}
</script>

<style lang="less" scoped>
	.cu-bar{
		display: flex;
		flex-grow: 12;
		.action{
			flex-grow: .1;
			.action_Ico{
				font-size: 50rpx;	
				font-weight: 100;
			}
		}
		.inpufuoBox{
			flex-grow: 15;
		}
		.Icon_lgo{
			flex-grow:1;
			font-size: 32rpx;
		}
	}
	.store{
		display: flex;
		flex-wrap: wrap;
		// 头部的导航栏
		.kepala{
			flex: 1;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			.cuIcon-search{
				font-size: 30rpx;
			}
		}
		//店铺
		.store_presentation{
			display: flex;
			padding: 50rpx 0 15rpx 0;
			align-items: flex-end;
			// background-color: red;
			// 左边部分
			.store_presentationLeft{
				width: 68%;
				display: flex;
				padding-left: 30rpx;
				align-items: center;
				.logo{
					width: 100rpx;
					height: 100rpx;
				}
				.store_nameBox{
					padding-left: 20rpx;
					.storeName_text{
						// overflow:hidden;
						color: #FFFFFF;
						font-size: 32rpx;
						font-weight: bold;
						 // white-space:nowrap;
						 // text-overflow:ellipsis;
					}
					.Storequality{
						display: flex;
						align-items: baseline;
						color: #FFFFFF;
						.TheStoreCredit{
							margin-top: 5rpx;
							font-size: 24rpx;
						}
					}
				}
				
			}
			//右边部分   
			.store_presentationRight{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex: 1;
				margin: 30rpx 0 0 80rpx;
			     color: #FFFFFF;
			   .butt_on{
				   line-height: 50rpx;
				   text-align: center;
				   width: 150rpx;
				   height: 50rpx;
				   background-color: #7baf31;  
				   // border-radius: 20rpx;
               }
			}
		}
		// 导航分类 
		.store-nav{
			background-color: rgba(0,0,0,.5);
			color: #FFFFFF;
		}
		.navshowitem{
			width: 100%;
			background-color: #fed9dc;
		}
		
	}
	.nav .cu-item.cur{
		height: 90rpx;
		font-size: 40rpx;
		transition: .5s;
		color: #a7ee43;
		border-bottom:10rpx solid;
	}
	.nav .cu-item{
		height: 86rpx;
	}
	.scroll-view{
		height:70vh;
	}
</style>
