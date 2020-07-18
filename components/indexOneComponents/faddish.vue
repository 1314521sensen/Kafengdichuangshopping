<template>
	<view>
		<view class="faddish-banner" :style="{'background-image':'url('+imghttp+'faddish-banner.png'+')'}" v-if="loadbool">
			<view class="faddish-item">
				<view 
					class="faddish-left" 
					:data-good_id="demonstrating[0].good_id"
					@tap="shopdefault"
				>
					<image 
						:src="httpurl+demonstrating[0].good_pic" 
						class="img-rotate">
					</image>
					<view class="left-text">
						<text>新品到货</text>
					</view>
				</view>
				<view 
					class="faddish-center"
					:data-good_id="demonstrating[1].good_id"
					@tap="shopdefault"
				>
					<image :src="httpurl+demonstrating[1].good_pic" class="img-rotate"></image>
					<view class="center-text">
						<text>美妆专场 </text>
						<image :src="imghttp+'go.png'"></image>
					</view>
				</view>
				<view 
					class="faddish-left"
					:data-good_id="demonstrating[2].good_id"
					@tap="shopdefault"
				>
					<image :src="httpurl+demonstrating[2].good_pic" class="img-rotate"></image>
					<view class="left-text">
						<text>优惠好货</text>
					</view>
				</view>
			</view>
		</view>
		<loading v-if="loadbool==false"></loading>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				imghttp:"http://hbk.huiboke.com/uploads/app/image/index/indexone/",
				demonstrating:[],//这是上面的随机的商品
				httpurl:"",
				loadbool:false
			}
		},
		methods:{
			shopdefault(e){
				let {good_id} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Details/Details?id=${good_id}`
				})
			}
		},
		created() {
			const _this = this
			uni.request({
				url:`${app.globalData.Requestpath}good/getRandomRecommendGoodsList`,
				data:{
					c_level:2,
					limit:3, 
				},
				success(res) {
					if(res.data.code == 0){
						_this.demonstrating = res.data.data
						_this.loadbool = true
					}
				}
			})
			_this.httpurl = app.globalData.imgyuming
		},
	}
</script>

<style lang="less" scoped>
	.faddish-banner{
		width: 90%;
		overflow: hidden;
		margin: 30rpx auto 10rpx;
		background-size: 100% 100%;
		.faddish-item{
			overflow: hidden;
			height: 100%;
			width: 60%;
			// background-color: green;
			margin: 0 auto;
			display: flex;
			justify-content: space-around;
			color: #FFFFFF;
			font-size: 24rpx;
			.faddish-left{
				width: 127rpx;
				// height: 140rpx;
				// background-color: #CCCCCC;
				margin-top: 20rpx;
				text-align: center;
				image{
					width: 100rpx;
					height: 100rpx;
					border-top-left-radius: 15rpx;
					border-top-right-radius: 15rpx;
				}
				.left-text{
					height: 40rpx;
					line-height: 40rpx;
					width: 100%;
					margin-top: -8rpx;
					border: 1rpx solid #FFFFFF;
					background-image: linear-gradient(#ff8b9b, #fa4067);
					border-radius: 10rpx;
				}
			}
			.faddish-center{
				// height: 150rpx;
				width: 150rpx;
				// background-color: #FF3600;
				text-align: center;
				margin: 2rpx 6rpx 0 6rpx;
				padding: 12rpx 0 0 0 ;
				image{
					width: 110rpx;
					height: 110rpx;
					border-top-left-radius: 15rpx;
					border-top-right-radius: 15rpx;
				}
				.center-text{
					display: flex;
					justify-content: center;
					margin: 0 auto;
					margin-top: -10rpx;
					height: 40rpx;
					width: 100%;
					border: 1rpx solid #FFFFFF;
					line-height: 40rpx;
					background-image: linear-gradient(#ff8b9b, #fa4067);
					border-radius: 10rpx;
					image{
						width: 30rpx;
						height: 30rpx;
						margin-top: 5rpx;
					}
				}
				
			}
		}
	}
	.img-rotate{
		transform-style: preserve-3d;
		// transform:rotateY(0deg);
		animation: mymove 5s infinite;
	}
	@keyframes mymove {
		0% {
			transform:rotateY(0deg);
		}
		50% {
			transform:rotateY(180deg);
		}
		100% {
			transform:rotateY(360deg);
		}
	}
</style>
