<template>
	<view class="integralBox">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="我的积分" url="/pages/PersonalMy/PersonalMy"></actionbar>
		<view class="integra-banner" :style="{'background-image':'url('+this.$store.state.httpUrl+'/integral/1.png)'}">
			<view class="integra-img" :style="{'background-image':'url('+this.$store.state.httpUrl+'/integral/2.png)'}">
				<view class="integral-text-left">
					<text class="left-one">{{nums}}</text>
					<view class="integral-smail-left-text">
						<text>我的积分余额</text>
						<text>1积分=1元人民币</text>
					</view>
				</view>
				<view class="integeal-text-right">
					<view class="right-one" @tap="earnpoints">去赚积分</view>
				</view>
			</view>
		</view>
		<!-- <list></list> -->
		<view class="integral">
			<view class="integral-top">
				<text>积分获取详情</text>
			</view>
			<scroll-view scroll-y="true"  class="scroll-view" @scrolltolower="scrolltolower">
				<view class="integral-details" v-for="(item,index) in integralList" :key="index">
					<text>{{item.create_time}}</text>
					<text>{{item.integral}}</text>
				</view>
				<view class="bottomtext">
					<text>已经获取全部</text>
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	import list from "@/components/indexcomponents/list.vue"
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:"",
				integrabannerbgurl:'/static/integral/1.png',
				integraimgbgurl:'/static/integral/2.png',
				nums:"",
				integralList:[],
				pages:1
			}
		},
		methods: {
			earnpoints(){
				uni.switchTab({
					url:`/pages/index/index`
				})
			},
			integral(pages){
				const _this = this
				uni.getStorage({
					key: 'bindtokey',
					success(res) {
						uni.request({
							url: `${app.globalData.Requestpath}user/getIntegralLogList`,
							method: "POST",
							data: {
								token: res.data,
								page:pages,
								pageSize:20
							},
							success(res) {
								// console.log(res)
								if (res.data.code == 0) {
									
									if(_this.pages > 1){
										_this.integralList =_this.integralList.concat(res.data.data.list) 
									}else if(_this.pages == 1){
										_this.integralList = res.data.data.list
									}
								}
							}
						})
					}
				})
			},
			scrolltolower(){
				this.pages++
				this.integral(this.pages)
			}
		},
		components:{
			list,
			actionbar
		},
		created() {
			this.integral(this.pages)
		},
		onLoad(opction){
			this.nums = atob(opction.integralnum)
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.integralBox{
		height: 100vh;
		background-color: #F8F8F8; 
	}
	.integra-banner{
		overflow: hidden;
		background-size: cover;
		/* background-color: red; */
		height: 362rpx;
		width: 100%;
	}
	.integra-img{
		background-size: 100% 100%;
		height: 260rpx;
		width: 90%;
		margin: 44rpx auto 0;
		display: flex;
		justify-content: space-around;
		box-shadow: 0 2rpx 20rpx 2rpx #666;
	}
	.integral-text-left{
		margin-top: 40rpx;
		color: white;
		flex-wrap: wrap;
		text{
			display:block;
			width: 100%;
		}
		.left-one{
			font-size: 46rpx;
			font-weight: bold;
		}
		.integral-smail-left-text{
			font-size: 24rpx ;
			margin-top:48rpx;
		}
	}
	.integeal-text-right{
		display:flex;
		align-items: center;
		color:#fff;
	}
	.integeal-text-right>text{
		display: block;
		
	}
	.right-one{
		line-height: 60rpx;
		text-align: center;
		/* margin-top: 110rpx; */
		height: 60rpx;
		width: 160rpx;
		border: 4rpx solid white;
		border-radius: 40rpx;
		
	}
	.select-father{
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.Select-box{
		font-size: 40rpx;
	}
	.integral{
		background-color: #FFFFFF;
		padding: 0 80rpx;
		.integral-top{
			padding: 20rpx 0;
			text{
				font-size: 36rpx;
				font-weight: bold;
			}
		}
		.scroll-view{
			height: 70vh;
			.integral-details{
				display: flex;
				justify-content: space-between;
				padding: 10rpx 20rpx;
				border-bottom: 2rpx solid #CCCCCC;
				text{
					font-size: 28;
					font-weight: bold;
				}
			}
			.bottomtext{
				text-align: center;
				padding: 10rpx;
				text{
					font-size: 24rpx ;
					color: #CCCCCC;
				}
			}
		}
	}
</style>
