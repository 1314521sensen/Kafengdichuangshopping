<template>
	<!-- #ifdef APP-PLUS -->
	<view class="Startpage" :style="{'background-image':'url('+'http://hbk.huiboke.com'+imgs+')'}" v-if="Guidepagebools">
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="seconds">
			<view class="Numbers" @tap="Stoptimer">
				<text>{{nums}}</text>
			</view>
		</view>
	</view>
	<!-- #endif -->
</template>

<script>
	const app = getApp()
	export default {//这是启动页
		data() {
			return {
				statusBar:0,
				nums:10,
				Startpagebool:true,
				time:null,
				Guidepagebools:false,
				imgs:""
			}
		},
		methods: {
			Stoptimer(){
				clearInterval(this.time)
				uni.switchTab({
					//pages/Activitiesindex/Activitiesindex
					//pages/index/index
					url:`/pages/index/index`
				})
			}
		},
		created(){
			const _this = this
			uni.request({
				url:`${app.globalData.Requestpath}guider/getGuiderInfo`,
				method:"POST",
				data:{
					type:1
				},
				success(res) {
					if(res.data.code==0){
						_this.imgs = res.data.data.data[0].adv_img
						_this.nums = res.data.data.data[0].seconds
						_this.time = setInterval(()=>{
							_this.nums--
							if(_this.nums<0){
								_this.nums = 0
								clearInterval(_this.time)
								//pages/Activitiesindex/Activitiesindex
								//pages/index/index
								uni.switchTab({
									url:`/pages/index/index`
								})
							}
						},1000)
					}
				}
			})
			
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
			this.Guidepagebools = app.globalData.Guidepagebool
		},
	}
</script>

<style lang="less" scoped>
	/* #ifdef APP-PLUS */ 
	.Startpage{
		height:100vh;
		// background-color:red;
		background-size:100% 100%;
		background-repeat: no-repeat;
		padding-right:20rpx;
		.seconds{
			display:flex;
			justify-content: flex-end;
			.Numbers{
				width:80rpx;
				height:80rpx;
				background-color:rgba(0,0,0,.5);
				border-radius:50%;
				line-height:80rpx;
				text-align:center;
				font-size: 30rpx;
				color:#fff;
			}
		}
	}
	/* #endif */ 
</style>
