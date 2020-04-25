<template>
	<view class="store">
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="store-top">
			<view class="store-bg">
				<view class="fuceng">
					<view class="store-title">
						<text>{{Shopname}}</text>
					</view>
					<view class="evaluation">
						<view class="icon" v-if="Whetherproprietary">自营</view>
						<!-- 综合评价 -->
						<view class="comprehensiveevaluation">
							<text>综合评价</text>
							<uni-rate color="#fff" active-color="#ffca3e" size="12" max=5 :value="score" disabled="true"></uni-rate>
							<text>粉丝数9999</text>
						</view>
						
					</view>
					<view class="nav">
						<storenav @getChildnav="getChildnav"></storenav>
					</view>
				</view>
			</view>
		</view>
		<view class="rolling">
			<!-- 根锯判断到底那个组件显示 -->
			<storerecommended v-if="items=='推荐'"></storerecommended>
			<!-- 这是宝贝的 -->
			<storebady v-if="items=='宝贝'"></storebady>
			<!-- 这是新品 -->
			<storenews v-if="items=='新品'" :Month="Month" :day="day"></storenews>
			<!-- 这是视频 -->
			<storevideo v-if="items=='视频'"></storevideo>
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	//引入导航
	import storenav from "@/components/store/storenav.vue"
	//引入的热销组件
	import storerecommended from "@/components/store/storerecommended.vue"
	//引入宝贝的组件
	import storebady from "@/components/store/storebady.vue"
	//引入新品列表
	import storenews from "@/components/store/storenews.vue"
	//引入视频
	import storevideo from "@/components/store/storevideo.vue"
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
				Shopname:"",
				Whetherproprietary:false,//是否自营
				score:0,//分数
			}
		},
		methods: {
			getChildnav(e){
				// console.log(e)
				this.items = e
				// console.log(this.items)
			}
		},
		onLoad(opction){
			const _this = this
			_this.storeid = opction.storeid
			console.log(_this.storeid)
			_this.statusBar = app.globalData.statusBar
			let date = new Date()
			let Month = date.getMonth()+1; 
			let day = date.getDate()
			
			_this.Month = Month
			_this.day = day
			// console.log(_this.Month,_this.day)
			uni.request({
				url:"http://hbk.huiboke.com/api/store/getStoreInfo",
				data:{
					sid:_this.storeid
				},
				success(res) {
					if(res.data.code==0){
						console.log(res.data.data)
						let {store_name,is_platform_store,store_servicecredit} = res.data.data
						_this.Shopname = store_name
						console.log(store_servicecredit)
						_this.score = store_servicecredit
						//判断是否自营
						if(is_platform_store){
							_this.Whetherproprietary = true
						}else{
							_this.Whetherproprietary = false
						}
					}
					
				}
			})
			//获取商品的新品信息系
			uni.request({
				url:"http://hbk.huiboke.com/api/store/getNewStoreGoodList",
				data:{
					sid:_this.storeid,
					limit:10
				},
				success(res) {
					// console.log(res.data.data)
				}
			})
		},
		components:{
			// uniRate,
			storenav,
			storerecommended,
			storebady,
			storenews,
			storevideo
		}
	}
</script>

<style lang="less" scoped>
	.store{
		.store-top{
			.store-bg{
				// background-color:red;
				// height:230rpx;//这最后都要去掉
				color:#fff;
				.fuceng{
					width: 100%;
					// height:100%; //这最后都要去掉
					background-color:rgba(0,0,0,0.5);
					padding:0 30rpx;
					.store-title{
						padding-top:25rpx;
						font-size: 40rpx;
						font-weight: bold;
						text{
							// color:#fff; //这颜色后期改
						}
					}
					.evaluation{
						display: flex;
						margin-top:20rpx;
						.icon{
							width: 80rpx;
							height:36rpx;
							background-color:red;
							border-radius:22rpx;
							font-size: 22rpx;
							// color:#fff;
							text-align:center;
							line-height:36rpx;
							margin-top:5rpx;
						}
						.comprehensiveevaluation{
							display:flex;
							text{
								font-size: 28rpx;
								margin-left:25rpx;
							}
						}
					}
				}
			}
		}
		.rolling{
			padding:0 14rpx;
		}
		.uni-rate{
			margin:18rpx 0 0 10rpx;
		}
	}
</style>
