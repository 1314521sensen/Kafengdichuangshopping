<template>
	<view class="Personal-information">
		<view class="Personal-bg">
			<view class="Personal-top">
				<view class="Personaladdlogin">
					<view class="Personal">
						<view class="head-portrait" @click="jumppersonal ">
							<image :src="images"></image>
						</view>
						<view class="head-information">
							<text>{{nickname}}</text>
						</view>
					</view>
					<!-- 新增加的登录退出 -->
					<!-- #ifdef APP-PLUS || H5 -->
						<view class="login">
							<view class="margin-tb-sm text-center">
								<!-- 到时候判断用户有没有登录 有的话就改成退出 -->
								<button class="cu-btn round bg-green" @tap="login">{{logintokeytext}}</button>
							</view>
						</view>
					<!-- #endif -->
				</view>
				
				<view class="Personal-list">
					<view class="money-list" v-for="(item,index) in moneylist" :key="index" @tap="jumpcenter(item.url)">
						<text>{{item.num}}</text>
						<text>{{item.miao}}</text>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	//这是个人中心的头像 个人信息
	const app  = getApp()
	export default{
		data(){
			return {
				logintext:"",
			}
		},
		methods:{
			jumppersonal(){
				uni.navigateTo({
					url:"/pages/Personaldata/Personaldata"
				})
			},
			login(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			jumpcenter(url){
				// console.log(url)
				uni.navigateTo({
					url
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
		props:["tokey","images","nickname","moneylist","logintokeytext"]
	}
</script>

<style lang="less" scoped>
	.Personal-information{
		border-radius:16rpx;
		padding:0 20rpx 10rpx;
		.Personal-bg{
			background-color: #000;
			padding-bottom:25rpx;
			border-radius:16rpx;
			.Personal-top{
				background-color: #fff;
				padding-bottom:20rpx;
				border-radius:16rpx;
				.Personaladdlogin{
					display:flex;
					justify-content: space-between;
					padding:14rpx 20rpx 0;
					.Personal{
						display:flex;
						align-items: center;
						.head-portrait{
							width: 120rpx;
							height:120rpx;
							// background-color:yellow;
							border-radius:50%;
							image{
								width: 100%;
								height:100%;
								border-radius:50%;
							}
						}
						.head-information{
							padding-top:10rpx;
							margin-left:22rpx;
							text{
								display:block;
								font-size: 30rpx;
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
				
				.Personal-list{
					display:flex;
					justify-content: space-around;
					margin-top:30rpx;
					.money-list{
						text{
							display:block;
							text-align:center;
							font-weight: bold;
							font-size: 24rpx;
							color:#616161;
							&:first-child{
								color:red;
							}
						}
					}
				}
			}
		}
	}
</style>
