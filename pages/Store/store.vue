<template>
	<view class="store">
		<!-- <pageheight :statusBar="statusBar"></pageheight> -->
		<!-- 顶部 -->
		<view class="kepala" :style="{'background-image':'url(/static/store/store_bg.png)','padding-top':statusBar+20+'rpx'}">
			<!-- 导航 -->
			<view class="kep_nav">
				<view class="cu-bar">
					<view class="action">
						<text class="cuIcon-back text-white action_Ico" @tap="returnshopdefailt"></text>
					</view>
					<view class="search-form round inpufuoBox">
						<text class="cuIcon-search"></text>
						<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索商品" confirm-type="search"></input>
					</view>
					<view class="Icon_lgo">
						<text class="lg text-gray cuIcon-forward"></text>
					</view>
				</view>
			</view>
			<!-- 店铺简介  -->
			<view class="store_presentation">
				<!-- 店铺上面的左边信息 -->
				<view class="store_presentationLeft">
					<view class="logoBox">
						<image class="logo" src="/static/store/symbo.png"></image>
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
					<view class="butt_on">
						<text>+</text>
						关注
					</view>
					<view>17人</view>
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
		<view class="navshowitem" v-if="parseInt(TabCur)==0">
			<!-- 直播间  小广告 -->
			<adlet></adlet>
			<!-- 新品活动xxx等  可能是轮播图 -->
			<storebanner></storebanner>
			<!-- 优惠券 -->
			<discountcoupon></discountcoupon>
			<!-- 新品开业 -->
			<storenewArrival></storenewArrival>
			<!-- 精品大卖 -->
			<boutiqueBarley msg="精品大卖" :horizontallylist="horizontallylist"></boutiqueBarley>
		</view>
		<view class="navshowitem" v-if="parseInt(TabCur)==1">
			<boutiqueBarley msg="推荐宝贝" :horizontallylist='bodylist'></boutiqueBarley>
		</view>
		<view class="navshowitem" v-if="parseInt(TabCur)==2">
			<boutiqueBarley msg="推荐新品" :horizontallylist="newslist"></boutiqueBarley>
		</view>
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
	
	const app = getApp()
	export default {
		//这是店铺    
		data() {
			return {
				statusBar:0,
				items:"推荐",
				Month:0,
				day:0,
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
				navlist:["推荐","宝贝","新品"]//"视频"
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
			}
		},
		onLoad(opction){
			const _this = this
			_this.storeid = opction.storeid
			_this.statusBar = app.globalData.statusBar
			let date = new Date()
			let Month = date.getMonth()+1; 
			let day = date.getDate()
			_this.Month = Month
			_this.day = day
			// console.log(_this.Month,_this.day)
			uni.request({
				url:`${app.globalData.Requestpath}store/getStoreInfo`,
				data:{
					sid:_this.storeid
				},
				success(res) {
					if(res.data.code==0){
						let {store_name,is_platform_store,store_servicecredit,store_credit} = res.data.data
						_this.Shopname = store_name
						_this.score = store_servicecredit
						_this.storecredit = store_credit
						//判断是否自营
						if(is_platform_store){
							_this.Whetherproprietary = true
						}else{
							_this.Whetherproprietary = false
						}
					}
					
				}
			})
			//获取推荐
			uni.request({
				url:`${app.globalData.Requestpath}store/getStoreRecommendGoodList`,
				data:{
					sid:_this.storeid,
					page:1,
					pageSize:10
				},
				success(res) {
					_this.horizontallylist = res.data.data.list
				}
			})
			//获取宝贝信息
			uni.request({
				url:`${app.globalData.Requestpath}store/getStoreGoodList`,
				data:{
					sid:_this.storeid,
					page:1,
					limit:10
				},
				success(res) {
					_this.bodylist = res.data.data.list
				}
			})
			//获取商品的新品信息系
			uni.request({
				url:`${app.globalData.Requestpath}store/getNewStoreGoodList`,
				data:{
					sid:_this.storeid,
					limit:10
				},
				success(res) {
					_this.newslist = res.data.data
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
			adlet
		}
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
						color: #FFFFFF;
						font-size: 32rpx;
						font-weight: bold;
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
</style>
