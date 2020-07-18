<template>
	<view class="featuredCommodity">
		<view class="featuredCommodity-top">
			<view class="hot-sale">
				<view class="hot-top">
					<text class="hot-top-one">爆款潮品</text>
					<text class="hot-top-two">购好货</text>
				</view>
				<view class="hot-center">
					<text>国际潮牌,限时折扣</text>
				</view>
				<view class="hot-bottom">
					<view class="bottom-img" 
						v-for="(item,index) in Popularimglist" 
						:key="index"
						:data-g_id="item[0]"
						:data-s_id="item[16]"
						@tap="materialpurchase"
					>
						<image :src="'http://hbk.huiboke.com'+item[2]" mode=""></image>
					</view>
				</view>
			</view>
			<view class="fruits">
				<view class="fruits-top">
					<text class="fruits-top-one">零食大派送</text>
					<text class="fruits-top-two">5折起</text>
				</view>
				<view class="fruits-center">
					<text>亿款零食,商家直供</text>
				</view>
				<view class="fruits-bottom">
					<view 
						class="bottom-img" 
						v-for="(item,index) in Tosend" 
						:key="index"
						:data-g_id="item[0]"
						:data-s_id="item[16]"
						@tap="materialpurchase"
					>
						<image :src="'http://hbk.huiboke.com'+item[2]" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="featuredCommodity-bottom">
			<view class="purchase" 
				v-for="(item,index) in purchaseListSum" 
				:key="index"
				:data-g_id="item.good_id"
				:data-s_id="item.store_id"
				@tap="materialpurchase"
			>
				<text :style="{'color':item.color}">{{item.text}}</text>
				<image :src="'http://hbk.huiboke.com'+item.good_pic" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				// 总数组
				totalnumber:[],
				totalnumberArr:[],
				// 潮牌
				Popularimglist:[],
				// 派送
				Tosend:[],
				purchaseList:[
					{
						text:"亿万",
						color:"#ffc96b"
					},
					{
						text:"精选",
						color:"#94ff60"
					},
					{
						text:"好品",
						color:"#ff6464"
					},
					{
						text:"限时",
						color:"#6589ff"
					},
					{  
						text:"折扣",
						color:"#ff669f"
					}
				],
				purchaseListSum:[
					
				],
			}
		},
		methods:{
			materialpurchase(e){
				// console.log(e)
				let {g_id,s_id} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Details/Details?id=${g_id}&storeid=${s_id}`
				})
			}
		},
		created(){
			const _this = this
			uni.request({
				url:`${app.globalData.Requestpath}good/getAllGoodRankingList`,
				data:{
					limit:5
				},
				success(res){
					// console.log(res)
					if(res.data.code==0){
						_this.totalnumber = res.data.data
						// console.log(_this.totalnumber)
						for(var i = 0;i<res.data.data.length;i++){
							// 对象切割成一个数组
							 _this.totalnumberArr.push(Object.values(_this.totalnumber[i])) 
						}
						 // 潮牌
						 _this.Popularimglist = _this.totalnumberArr.slice(0,3)
						 // console.log(_this.Popularimglist)
						 //派送  
						 _this.Tosend = _this.totalnumberArr.slice(3,5)
					}
				}
			})
			
			uni.request({
				url:`${app.globalData.Requestpath}good/getRandomRecommendGoodsList`,
				data:{
					limit:5
				},
				success(res) {
					if(res.data.code==0){
						// console.log(res)
						_this.purchaseListSum = res.data.data
						_this.purchaseListSum.forEach((item,index)=>{
							// purchaseList  旧数据 _this.purchaseList.text
							item.color = _this.purchaseList[index].color
							item.text = _this.purchaseList[index].text
						})
					}
				}
			})
		},
	}
</script>

<style lang="less" scoped>
	.featuredCommodity{
		height: 404rpx;
		width: 95%;
		
		margin: 0 auto;
		border-top-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		overflow:hidden;
		.featuredCommodity-top{
			display: flex;
			justify-content: space-between;
			.hot-sale{
				padding: 10rpx;
				height: 197rpx;
				width: 55%;
				background-color: #FFFFFF;
				.hot-top{
					height: 40rpx;
					// line-height:40rpx;
					.hot-top-one{
						font-size: 28rpx;
						font-weight: bold;
					}
					.hot-top-two{
						margin-left: 20rpx;
						font-size: 24rpx;
						padding: 2rpx 10rpx;
						background-image: linear-gradient(#ffb063, #ff6202);
						border-radius: 10rpx;
						color: #FFFFFF;
					}
				}
				.hot-center{
					margin-top: 6rpx;
					color: #999999;
					font-size: 24rpx;
				}
				.hot-bottom{
					display: flex;
					justify-content: space-around;
					margin-top: 20rpx;
					.bottom-img{
						width: 33%;
						height: 100rpx;
					}
					image{
						width: 100rpx;
						height: 70rpx;
					}
				}
			}
			.fruits{
				width: 44%;
				padding: 10rpx;
				height: 197rpx;
				background-color: #FFFFFF;
				.fruits-top{
					.fruits-top-one{
						font-size: 28rpx;
						font-weight: bold;
					}
					.fruits-top-two{
						margin-left: 20rpx;
						font-size: 24rpx;
						padding: 2rpx 10rpx;
						background-image: linear-gradient(#8fff63, #2dca29);
						border-radius: 10rpx;
						color: #FFFFFF;
					}
				}
				.fruits-center{
					margin-top: 6rpx;
					color: #999999;
					font-size: 24rpx;
				}
				.fruits-bottom{
					display: flex;
					justify-content: space-around;
					margin-top: 20rpx;
					.bottom-img{
						width: 33%;
						height: 100rpx;
					}
					image{
						width: 100rpx;
						height: 70rpx;
					}
				}
			}
		}
		.featuredCommodity-bottom{
			height: 197rpx;
			width: 100%;
			display: flex;
			justify-content: left;
			margin-top: 8rpx;
			background-color: #FFFFFF;
			.purchase{
				width: 25%;
				height: 197rpx;
				// background-color: red;
				border-right: 1rpx solid #CCCCCC;
				text-align: center;
				padding-top: 20rpx;
				image{
					width: 100rpx;
					height: 70rpx;
					margin-top: 40rpx;
				}
			}
		}
	}
</style>
