<template>
	<view class="Personal-information">
		<view class="Personal-bg">
			<view class="Personal-top">
				<view class="Personaladdlogin">
					<view class="Personal"  @tap="jumppersonal">
						<view class="head-portrait">
							<image :src="images"></image>
							<view class="isVip" v-show="isvip">
								<image 
									:src="imgpath+'my/orders/Vip.png'" 
									class="vipimg"
								></image>
							</view>
						</view>
						<view class="head-information">
							<text>{{nickname}}</text>
							<text class="Personalhomepagebtn">个人主页</text>
						</view>
					</view>
					<!-- 新增加的登录退出 -->
					<!-- 到时候判断用户有没有登录 有的话就改成退出 -->
					<!-- #ifdef APP-PLUS || H5 -->
						<view class="login">
							<view class="margin-tb-sm text-center">
								
								<button class="cu-btn round bg-white text-black" @tap="login">退出</button>
							</view>
						</view>
					<!-- #endif -->
				</view>
				<!-- 这是用户余额这块 -->
				<usermoney :moneylist="moneylist"></usermoney>
			</view>
			
		</view>
	</view>
</template>

<script>
	import usermoney from "@/components/myPersonal/usermoney.vue"
	//这是个人中心的头像 个人信息
	const app  = getApp()
	export default{
		data(){
			return {
				imgpath:this.$store.state.httpUrl
			}
		},
		methods:{
			jumppersonal(){
				uni.navigateTo({
					url:"/pages/Personaldata/Personaldata"
				})
			},
			login(){
				uni.showModal({
					title:"退出登录",
					content: '确定退出登录吗?',
					showCancel:true,
					cancelText:"暂不退出",
					cancelColor:"#f00",
					confirmText:"确定退出",
					confirmColor:"#0f0",
					success(res){
						if(res.confirm){
							uni.removeStorage({
								key:"bindtokey",
								success(res) {
									//清空裂变的人数和金币
									uni.setStorage({
										key:"Fission_invitation",
										data:0,
									})
									uni.setStorage({
										key:"Fission_Gold",
										data:0,
									})
									uni.navigateTo({
										url:"/pages/login/login"
									})
								}
							})
						}else{
							app.globalData.showtoastsame("取消退出")
						}
					}
				})
			},
			
			// getcouponslistdata(){
			// 	// console.log(this.couponslistdata)
			// 	if(this.couponslistdata.length<=0){
			// 		console.log(1)
			// 	}else{
			// 		this.moneylist[2].num = this.couponslistdata.length
			// 	}
			// }
		},
		// props:["couponslistdata"],
		created(){
			const _this = this
		},
		components:{
			usermoney
		},
		props:["tokey","images","nickname","moneylist","isvip"]
	}
</script>

<style lang="less" scoped>
	.Personal-information{
		// border-radius:16rpx;
		// padding:0 20rpx 10rpx;
		.Personal-bg{
			// background-color: #000;
			// padding-bottom:25rpx;
			// border-radius:16rpx;
			margin-bottom: 84rpx;
			.Personal-top{
				// background-color: #fff;
				// padding-bottom:20rpx;
				// border-radius:16rpx;
				background-color:#f84443;
				height: 300rpx;
				.Personaladdlogin{
					display:flex;
					justify-content: space-between;
					padding:14rpx 20rpx 0;
					.Personal{
						display:flex;
						align-items: center;
						.head-portrait{
							position: relative;
							width: 120rpx;
							height:120rpx;
							// background-color:yellow;
							border-radius:50%;
							image{
								width: 100%;
								height:100%;
								border-radius:50%;
							}
							.isVip{
								position: absolute;
								bottom:-20rpx;
								right:0;
								width: 50rpx;
								height:50rpx;
								// background-color:green;
								.vipimg{
									width: 100%;
									height:100%;
								}
							}
						}
						.head-information{
							width: 200rpx;
							padding-top:10rpx;
							margin-left:32rpx;
							color:#fff;
							text{
								display:block;
								font-size: 30rpx;
								font-weight: bold;
								white-space:nowrap;
								overflow:hidden; 
								text-overflow:ellipsis;
							}
							.Personalhomepagebtn{
								font-size: 24rpx;
								background-color: #fff;
								color:red;
								border-radius:20rpx;
								padding:4rpx 0 4rpx;
								text-align:center;
								margin-top:12rpx;
							}
						}
					}
					.login{
						.cu-btn{
							height:50rpx;
							line-height:50rpx;
						}
					}
				}
				
				
			}
		}
	}
</style>
