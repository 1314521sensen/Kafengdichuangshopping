<template>
		<view class="anchorapply">
			<pageheight :statusBar="statusBar"></pageheight>
			<actionbar 
				message="主播申请" 
				:url="'/components/setcenter/setcenter?title=设置'+'&'+'titlename=userset'"
				:Jumpchoose="true"
			></actionbar>
			<view class="anchor_detailedBox">
				<!-- 详细资料的大盒子 -->
				<view class="anchor_detailed">
					<!-- 主播名字  -->
					<view class="nameBox">
						<text class="hostname">主播名称</text>:
						<input type="text" class="name_text" v-model='anchor_name' maxlength="20" placeholder="请设置直播(姓名)">
					</view>
					<view class="roomBox">
						<view class="room_tit">房间图片:</view>
						<view class="boxPrice" @tap="selectimage">
							<!-- <view :style="{'background-image':'url('+pathurl+')'}"></view>  -->
							<image style="width: 100%;height: 100%;" :src="this.$store.state.imgyuming+pathurl" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 申请成为主播  -->
			<view class="ApplyanchorBox">
				<view class="Applyanchor" @tap="Applicationstreaming">
					申请后成为主播
				</view>
			</view>
		</view>
</template>

<script>
	const app = getApp()
	import actionbar from "@/components/actionbar/actionbar.vue"
	export default {
		data() {
			return {
				anchor_name:'',//主播名称
				pathurl:'',
				statusBar:0
			}
		},
		methods: {
			selectimage(){
				const _this = this
				//获取图片的路径 真的是，
				uni.chooseImage({
					count:1,  
					sizeType: ['original', 'compressed'],
					sourceType: ['album'], 
				    success(res) {
						if(res.tempFilePaths[0]!==""){
							uni.uploadFile({
								url:`${app.globalData.Requestpath}common/uploadImage?type=liveuser`,
								filePath:res.tempFilePaths[0],
								name:"file",
								fileType:"image",
								success(resimg){
									// console.log(JSON.parse(resimg.data))
									let json = JSON.parse(resimg.data)
									if(json.code==0){
										_this.pathurl = json.data.src
										// console.log(_this.pathurl,"这是返回的")
									}else{
										app.globalData.showtoastsame("上传失败,请重新上传")
									}
								}
							})
						}
				    }
				})
			},  
			Applicationstreaming(){
				const _this = this
				if(_this.anchor_name!=="" && _this.anchor_name.length<=10 && _this.pathurl!==""){
					// console.log(_this.pathurl)
						uni.getStorage({
							key:"bindtokey",
							success(res){
								uni.request({
									url:`${app.globalData.Requestpath}live_user/saveLiveUserInfo`,
									method:"POST",
									data:{
										token:res.data,
										live_nick:_this.anchor_name,
										live_pic:_this.pathurl
									},
									success(res){
										if(res.data.code==0){
											uni.switchTab({
												url:`/pages/PersonalMy/PersonalMy`
											})
										}else{
											app.globalData.showtoastsame(res.data.msg)
										}
									}
								})
							}
						})
				}
			}
		},
		components:{
			actionbar
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>
<style lang="less" scoped>
    .anchorapply{
		height: 100vh;
		background-color: #F8F8F8;
		.anchor_detailedBox{
			margin-top: 60rpx;
			display: flex;
			justify-content: center;
			.anchor_detailed{
				width: 710rpx;
				height: 500rpx;
				// background-color: red;  
				box-shadow: 0rpx 0rpx 8rpx #808080;
				border-radius: 30rpx;
				.nameBox{
					width: 90%;
					line-height: 130rpx;
					border-bottom: 2rpx solid #b3b3b3;
					margin: 20rpx auto;
					display: flex;
					.hostname{
						font-size: 32rpx;
					}
					.name_text{
						color: #a5a5a5;
						margin-left: 40rpx;
						margin-top: 40rpx;
					}
				}
				// 主播房间
				.roomBox{
					width: 90%;
					margin: 60rpx auto;
					display: flex;
					flex-grow: 8;
					.room_tit{
					}
					.boxPrice{
						width: 200rpx;
						height: 200rpx;
						background-color: pink;
						margin-left: 220rpx;
						border-radius: 20rpx;
					}
				}
			}
		}
	
	}
	// 申请成为主播
	.ApplyanchorBox{
		margin-top: 200rpx;
		display: flex;
		justify-content: center;
		.Applyanchor{
			width: 580rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			background-color: #f85a6f;
			text-align: center;
			color: #FFFFFF;
			font-size: 32rpx;
		} 
	}
	
	
</style>
