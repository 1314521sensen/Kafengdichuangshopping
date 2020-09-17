<template>
	<view>
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="推广人数明细"></actionbar>
		<!-- 推广人数的大盒子 -->
		<scroll-view class="scroll-view" :scroll-y="true" @scrolltolower="scrollBottom">
			<view class="promotersBox" >
				<view class="prometer" v-for="(item,index) in promoterList" :key="index">
					<!-- <view class="prhone_left">
						<image :src="imgpath+item.pic" mode=""></image>
					</view> -->
					<view class="particular_right">
						<view class="name">{{item.user_username}}</view>
						<view class="time">注册时间:{{item.create_time}}</view>
					</view>
				</view>
			</view>
			<view v-if="isShow == true" class="isWhether">暂无推广人数</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	
	const app = getApp()
	export default {
		data() {
			return {
				imgpath:this.$store.state.imgyuming,
				promoterList:[],
				page:1,
				statusBar:0,
				isShow:false
			}
		},
		methods: {
			scrollBottom(){
				const _this = this
				this.page++
				uni.getStorage({
					key:'bindtokey',
					success(res){
						uni.request({
							url:`${app.globalData.Requestpath}user/getReferrerList`,
							method:"POST",
							data:{
								token:res.data,
								page:_this.page,
								pageSize:10,
							},
							success(res) {
								if(res.data.code == 0){
									if(_this.page < 1){
										_this.promoterList = res.data.data.list
									}else{
										_this.promoterList = _this.promoterList.concat(res.data.data.list)
									}
								}
							}
						})
					}
				})
			}
		},
		created() {
			
			
			const _this = this
			
			uni.getStorage({
				key:'bindtokey',
				success(res){
					uni.request({
						url:`${app.globalData.Requestpath}user/getReferrerList`,
						method:"POST",
						data:{
							token:res.data,
							page:1,
							pageSize:10,
						},
						success(res) {
							if(res.data.code == 0){
								_this.promoterList = res.data.data.list
							}else{
								_this.isShow = true
							}
						}
					})
				}
			})
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	// page{
	//    height:100%;
	//    background-color: #fff;
	// }
	.promotersBox{
		margin-top: 20rpx;
		// min-height: 90vh;
		 // padding: 10rpx 10rpx 4rpx 10rpx;
		 background-color: #fff;
		.prometer{
			display: flex;
			flex-wrap: wrap;
			flex-grow: 12;
			height: 120rpx;
			width: 680rpx;
			margin: 20rpx auto;
			// background-color: red;
			border-bottom: 2rpx solid #CCCCCC;
			// padding: 0rpx 20rpx;
			.prhone_left{
				image{
					height: 100rpx;
					width:100rpx;
					border-radius: 50%;
				}
			}
			.particular_right{
				padding: 5rpx 0 0 30rpx;
				line-height: 40rpx;
				.name{
					margin-bottom: 10rpx;
					font-size: 32rpx;
				}
			}
		} 
	}
	.scroll-view{
		overflow: hidden;
		height: 92vh;
	}
	.isWhether{
		height: 92vh;
		background-color: #fff;
		text-align: center;
		color: #CCCCCC;
		width: 100%;
		font-size: 50rpx;
		padding-top: 500rpx;
		}
</style>
