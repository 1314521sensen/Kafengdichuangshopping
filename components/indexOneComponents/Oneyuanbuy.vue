<template>
	<view class="Oneyuanbuybox" @tap="discount" v-show="bool">
		<view class="Oneyuanbuy">
			<view class="cha">
				<text @tap.stop="cha">×</text>
			</view>
			<image 
				:src="this.$store.state.httpUrl+'festivalactivities/Oneyuanbuybg.png'"
			></image>
			<view class="Enterfestival">
				<text class="btn" @tap="discount">
					主会场>>
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				bool:true
			}
		},
		methods:{
			discount(){
				uni.navigateTo({
					url:`/pages/festivalActivities/festivalActivities`
				})
				this.cha()
			},
			cha(){
				const _this = this
				_this.bool = false
				uni.setStorage({
					key:"one_yuan_bool",
					data:false,
					success() {
						_this.$emit("oneyuancha",false)
					}
				})
			}
		},
		created() {
			const _this = this
			uni.getStorage({
				key:"one_yuan_bool",
				success(res) {
					_this.bool = res.data
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.Oneyuanbuybox{
		position: fixed;
		top:0;
		left:0;
		width: 750rpx;
		height:100vh;
		display:flex;
		justify-content: center;
		align-items: center;
		z-index:100;
		background-color: rgba(0,0,0,0.6);
		// padding:0 20rpx;
		.Oneyuanbuy{
			width: 94%;
			height:644rpx;
			image{
				width: 100%;
				height:100%;
			}
			.cha{
				display:flex;
				justify-content:flex-end;
				// width: 100%;
				height:50rpx;
				// background-color: #fff;
				border-radius:50%;
				text-align:center;
				line-height:50rpx;
				font-weight: bold;
				font-size: 60rpx;
				color:#fff;
			}
			.Enterfestival{
				display:flex;
				justify-content: center;
				// background-color: red;
				// height:10rpx;
				.btn{
					display:inline-block;
					background-color: rgb(217,203,40);
					color:#fff;
					padding:10rpx 50rpx;
					border-radius:30rpx;
					font-size: 32rpx;
					box-shadow:0 0 21rpx #fff;
				}
			}
		}
	}
</style>
