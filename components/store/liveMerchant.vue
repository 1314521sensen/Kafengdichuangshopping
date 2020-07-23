<template>
	<view class="liveMerchant">
		<view class="live-title">
			<text>开启直播</text>
		</view>
		<view class="live-streaming" v-for="(item,index) in liveList" :key = 'index' @tap="Livepreview" :data-indexs="index">
			<view class="img">
				<image :src="item.img" mode=""></image>
			</view>
			<view class="live-text">
				<view class="live-text-top">
					<text>{{item.title}}</text><text class="lg text-gray cuIcon-right"></text>
				</view>
				<view class="live-text-bottom">
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<!-- 这里临时 -->
		<view>临时直播接口</view>
		<view class="linshi">
			<button 
				v-for="(item,index) in 20" 
				:key="index" 
				:style="{'margin-top':10+'rpx'}" 
				@tap="linshi"
				:data-indexs="index"
			>{{index+1}}直播入口</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				liveList:[
					{
						img:'http://hbk.huiboke.com/uploads/app/image/storeimg/live1.png',
						title:'点击直播',
						text:'开始我的本场直播'
					},
					{
						img:'http://hbk.huiboke.com/uploads/app/image/storeimg/live2.png',
						title:'直播带货商品',
						text:'添加本次直播带货商品'
					}
				]
			}
		},
		methods:{
			Livepreview(e){
				// console.log(e.currentTarget.dataset)
				let {indexs} = e.currentTarget.dataset
				if(parseInt(indexs)==0){
					//点击跳进直播
					uni.navigateTo({
						url:`/pages/Livecover/Livecover?storeid=${this.storeid}`
					})
				}else{
					//点击跳进直播商品列表
					uni.navigateTo({
						url:`/pages/liveaddshoplist/liveaddshoplist?storeid=${this.storeid}&type=storetype`
					})
				}
			},
			// 临时用
			linshi(e){
				// console.log(e.currentTarget.dataset)
				let {indexs} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Livecover/Livecover?index=${parseInt(indexs)}`
				})
			}
		},
		props:["storeid"],
	}
</script>

<style lang="less" scoped>
	.liveMerchant{
		width: 100%;
		padding: 0 20rpx;
		.live-title{
			padding: 50rpx 80rpx;
			text-align: center;
			text{
				font-size: 44rpx;
				font-weight: bold;
				letter-spacing:10rpx
			}
		}
		.live-streaming{
			margin-bottom: 30rpx;
			width: 100%;
			background-color: #FFFFFF;
			border-radius: 30rpx;
			display: flex;
			justify-content: left;
			box-shadow: 0 0 4rpx 2rpx #CCCCCC;
			overflow: hidden;
			.img{
				image{
					width: 300rpx;
					height: 300rpx;
					vertical-align:top;
				}
			}
			.live-text{
				padding: 100rpx 0 0 40rpx;
				.live-text-top{
					font-size: 34rpx;
					font-weight: bold;
					letter-spacing: 6rpx;
					.lg{
						margin-left: 10rpx;
						border-radius: 50%;
						padding: 4rpx 2rpx 4rpx 4rpx;
						background-color: #000000;
						color: #FFFFFF;
						
					}
				}
				.live-text-bottom{
					color: #999999;
					padding: 10rpx 0;
				}
			}
		}
	}
</style>
