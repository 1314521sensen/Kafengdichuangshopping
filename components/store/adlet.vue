<template>
	<view 
		class="adlet" 
		@tap="livefrom"
		:data-live_url="live_url"
		:data-livenick="livenick"
		:data-roomid="roomid"
		:data-livepic="livepic"
		:data-uname="uname"
		:data-uid="uid"
	>
		<view class="highlight">
			<view class="high_img">
				<video 
					:src="live_url"
					:controls="false"  
					:autoplay="true" 
					:muted='true'  
					style="width:200rpx;height:200rpx;" 
				>
				</video>
			</view>
			<!-- 右边部分 -->
			<view class="pleasantSurprise">
				<view class="plaeas_left">
					<view class="broadcastImgBox">
						<image class="broadcastImg" :src="this.$store.state.httpUrl+'/store/broadcast.gif'" mode=""></image>
					</view>
					<view class="broad_text">{{livedesc?livedesc:''}}</view>
					<view style="display: flex;"> 
						<view class="broadcasImgS" v-for="(item,index) in livelist" :key="index">
							<image :src="imgpath+item.good_pic" ></image>
						</view>
					</view>
				</view> 
			</view>
			<view class="plaeas_right">
				<view>立即观看</view>
			</view>
		</view>
	</view> 
</template>

<script>
	const app = getApp()
	export default{
			data(){
				return {
					list:{},
					livelist:[],
					imgpath:this.$store.state.imgyuming
				}
			},
			methods:{
				livefrom(e){
					// console.log(e.currentTarget.dataset)
					let {live_url,livenick,roomid,livepic,uname} = e.currentTarget.dataset
					uni.navigateTo({
						url:`/pages/Liveplatform/Liveplatform?live_url=${live_url}&livenick=${livenick}&roomid=${roomid}&livepic=${livepic}&uid=${this.uid}&uname=${uname}`
					})
				}
			},
			props:["live_url","livenick","roomid","livepic","uname","uid","livedesc"],
			mounted(){
				const _this = this
				// console.log(_this.live_url,_this.livenick,_this.roomid,_this.livepic,_this.uname,_this.uid,_this.livedesc)
				uni.request({
					url:`${app.globalData.Requestpath}live/getAnchorGoodListNoToken`,
					data:{
						uid:_this.uid,
						page:1,
						pageSize:3
					},
					success(res) {
						// console.log(res.data.data.list)
						_this.livelist = res.data.data.list
					}
				})
			}
		}
</script>

<style lang="less" scoped>
	.adlet{
		display: flex;
		justify-content: center;
		flex: 1;
		// margin-top: 30rpx;
		background-color: #f2f2f2;
		padding:30rpx 0;
		.highlight{
			display: flex;
			flex-grow: 12;
			width: 690rpx;
			border-radius: 10rpx;
			background-color: #fff;
			box-shadow: 5rpx 5rpx 10rpx #ccc;
			.high_img{
				height: 200rpx; 
				image{
					height: 100%;
					width: 190rpx;
				}
			}
			// 右边部分  进入直播xx等
			.pleasantSurprise{
				flex-grow:4;
				display: flex;
				padding-top: 10rpx;
				.plaeas_left{
					height: 40rpx;
					.broadcastImgBox{
						image{
							width: 140rpx;
							height: 40rpx;
						}
					}
					.broad_text{
						margin: 8rpx 0 16rpx 12rpx;
					}
				}
				.broadcasImgS{
					margin-left: 12rpx;
					image{
						width: 70rpx;
						height: 74rpx;
						margin-left: 5rpx;
					}
				}
			}
			.plaeas_right{
				margin: 6rpx 8rpx 0 0;
				height: 50rpx;
				view{
					color: #FFFFFF;
					border-radius: 20rpx;
					background-color: #7aae30;
					padding: 6rpx 22rpx;
				}
			}
		}
	}
</style>
