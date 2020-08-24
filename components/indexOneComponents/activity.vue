<template>
	<view class="activity">
		<view class="activity-top" v-for="(item,index) in list" :key="index">
			<view class="activity-left">
				<view class="left-top">
					<text class="text-one">{{item.textleft}}</text>
					<image v-if="item.img" :src="imgyuming+'live.png'" mode=""></image>
					<text class="text-two" :style="{'background-image':'linear-gradient('+item.messageTop+','+item.messageBottom+')'}"></div>{{item.message}}</text>
				</view>
				<view class="left-center" :style="{'color':item.textcolorleft}" >
					<text>{{item.textLeft}}</text>
				</view>
				<view class="left-bottom">
					<view class="img-left" :style="{'background-image':'linear-gradient('+item.imgBgOneTop+','+item.imgBgOneBottom+')'}">
						<image src="../../static/indexOne/watches.png" mode=""></image>
					</view>
					<view class="img-left" :style="{'background-image':'linear-gradient('+item.imgBgTwoTop+','+item.imgBgTwoBottom+')'}">
						<image src="../../static/indexOne/watches.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="activity-right">
				<view class="right-top">
					<text class="text-one">{{item.textright}}</text>
					<text class="text-two" v-if="item.right" :style="{'background-image':'linear-gradient('+item.rightBgTop+','+item.rightBgBottom+')'}"></div>{{item.messageRight}}</text>
				</view>
				<view class="right-center" :style="{'color':item.textcolorright}">
					<text>{{item.textRight}}</text>
				</view>
				<view class="right-bottom" @tap="rightImg_activity" :data-indexs="index">
					<view class="img-right">
						<image :src="item.imgright[0]" mode=""></image>
					</view>
					<view class="img-right">
						<image :src="item.imgright[1]" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgyuming:`${this.$store.state.imgyuming}/uploads/app/image/index/indexone/`,
				list:[
					{
						textleft:"惠播客直播",
						img:true,
						message:"好货不间断",
						messageTop:"#ff63b7",
						messageBottom:"#ee3745",
						textcolorleft:"#ff0000",
						textright:"精选大牌",
						right:false,
						messageRight:"",
						rightBgTop:"",
						rightBgBottom:"",
						textcolorright:"#31e295",
						imgBgOneTop:"#FFFFFF",
						imgBgOneBottom:"#ffebea",
						imgBgTwoTop:"#FFFFFF",
						imgBgTwoBottom:"#fff1ed",
						textLeft:"畅想所爱",
						textRight:"纵向奢华",
						imgright:[
							`${this.$store.state.imgyuming}/uploads/app/image/index/indexactivity/big_left_shopsign.png`,
							`${this.$store.state.imgyuming}/uploads/app/image/index/indexactivity/big_right_shopsign.png`
						]
					},
					{
						textleft:"超强折扣",
						img:false,
						message:"超值不等待",
						messageTop:"#c3ff63",
						messageBottom:"#79ee37",
						textcolorleft:"#3141e2",
						textright:"优品秒杀",
						right:true,
						messageRight:"够大牌",
						rightBgTop:"#63a8ff",
						rightBgBottom:"#027fff",
						textcolorright:"#e2a631",
						imgBgOneTop:"#FFFFFF",
						imgBgOneBottom:"#e7fffc",
						imgBgTwoTop:"#FFFFFF",
						imgBgTwoBottom:"#e6ecff",
						textLeft:"显示甩卖",
						textRight:"抢即是赚",
						imgright:[
							`${this.$store.state.imgyuming}/uploads/app/image/index/indexactivity/big_left_shopsign.png`,
							`${this.$store.state.imgyuming}/uploads/app/image/index/indexactivity/big_right_shopsign.png`
						]
					},
					{
						textleft:"新品特价",
						img:false,
						message:"享惊喜折扣",
						messageTop:"#ffaf63",
						messageBottom:"#ff6202",
						textcolorleft:"#b631e2",
						textright:"精选店家",
						right:false,
						messageRight:"",
						rightBgTop:"",
						rightBgBottom:"",
						textcolorright:"#31c7e2",
						imgBgOneTop:"#FFFFFF",
						imgBgOneBottom:"#fee0ff",
						imgBgTwoTop:"#FFFFFF",
						imgBgTwoBottom:"#f1e2ff",
						textLeft:"惊喜优惠",
						textRight:"好货不断",
						imgright:[
							`${this.$store.state.imgyuming}/uploads/app/image/index/indexactivity/big_left_shopsign.png`,
							`${this.$store.state.imgyuming}/uploads/app/image/index/indexactivity/big_right_shopsign.png`
						]
					}
				]
			}
		},
		methods:{
			rightImg_activity(e){
				let {indexs} = e.currentTarget.dataset
				if(parseInt(indexs)==0){
					uni.navigateTo({
						url:`/pages/brand/brand`
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.activity{
		height: 888rpx;
		width: 95%;
		background-color: #FFFFFF;
		margin: 0 auto;
		border-radius: 30rpx;
		padding: 10rpx;
		.activity-top{
			width: 100%;
			height: 280rpx;
			margin-top: 10rpx;
			// background-color: red;
			display: flex;
			justify-content: space-between;
			
			.activity-left{
				width: 50%;
				height: 100%;
				// background-color: green;
				.left-top{
					width: 100%;
					height: 50rpx;
					// background-color: blue;
					overflow: hidden;
					display: flex;
					justify-content: left;
					.text-one{
						font-size: 32rpx;
						font-weight: bold;
						margin-right: 10rpx;
					}
					image{
						width: 34rpx;
						height: 34rpx;
						margin-top: 8rpx;
					}
					.text-two{
						color: #FFFFFF;
						height: 30rpx;
						margin: 6rpx 0 0 4rpx;
						font-size: 24rpx;
						border-radius: 10rpx;
						// background-image: linear-gradient(#ff63b7, #ee3745);
						padding: 4rpx;
					}
				}
				.left-center{
					// color: red;
				}
				.left-bottom{
					display: flex;
					justify-content: space-around;
					.img-left{
						width: 163rpx;
						height: 163rpx;
						text-align: center;
						line-height: 163rpx;
						// background-image: linear-gradient( #FFFFFF,#ffebea);
						image{
							width: 100rpx;
							height: 100rpx;
							margin-top: 30rpx;
						}
					}
				}
			}
			.activity-right{
				width: 50%;
				height: 100%;
				// background-color: yellow;
				.right-top{
					width: 100%;
					height: 50rpx;
					// background-color: blue;
					overflow: hidden;
					display: flex;
					justify-content: left;
					.text-one{
						font-size: 34rpx;
						font-weight: bold;
						margin-right: 10rpx;
					}
					image{
						width: 34rpx;
						height: 34rpx;
						margin-top: 8rpx;
					}
					.text-two{
						color: #FFFFFF;
						height: 30rpx;
						margin: 6rpx 0 0 4rpx;
						font-size: 24rpx;
						border-radius: 10rpx;
						background-image: linear-gradient(#ff63b7, #ee3745);
						padding: 6rpx;
					}
				}
				.right-center{
					// color: red;
				}
				.right-bottom{
					display: flex;
					justify-content: space-around;
					.img-right{
						width: 163rpx;
						height: 163rpx;
						text-align: center;
						line-height: 163rpx;
						image{
							width: 135rpx;
							height: 135rpx;
							
							margin-top: 30rpx;
						}
					}
				}
			}
		}
	}
</style>
