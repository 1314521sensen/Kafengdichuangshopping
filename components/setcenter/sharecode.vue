<template>
	<view class="shareCode" v-if="code!==''">
		<view class="orders">
			<view class="orders-title-name">
				<text>{{code}}</text>
				<view class="mintext"  @tap="shezhipasswrd" data-target="setphonetan">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//components/setcenter/SetChangeResetpassword   	
	export default{
		data(){
			return {
				code:0
			}
		},
		methods:{
			shezhipasswrd(){
				//跳转
				uni.navigateTo({
					url:'/pages/sharecode/sharecode'
				})
			}
		},
		created() {
			const _this = this
			//将用户的分享的code码取出来
			uni.getStorage({
				key:"share_code",
				success(res){
					console.log(res,"分享码")
					_this.code = res.data
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.orders{
		background-color: #fff;
		// padding-bottom:30rpx;
		margin-top:10rpx;
		.orders-title-name{
		// width: ;
			display: flex;
			justify-content: space-between;
			line-height: 80rpx;
			padding:0 20rpx;
			// background-color:yellow;
				text{
					font-size: 30rpx;
					font-weight: bold;
				}
				.mintext{
					display: flex;
					color:#999;
					text{
						font-size: 25rpx;
						font-weight: normal;
					}
				}
		}
	}
</style>
