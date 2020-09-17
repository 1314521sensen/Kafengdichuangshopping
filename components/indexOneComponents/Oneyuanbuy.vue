<template>
	<view class="Oneyuanbuybox" @tap="discount" v-show="bool && this.$store.state.is_newuser">
		<view class="Oneyuanbuy">
			<view class="cha">
				<text @tap.stop="cha">×</text>
			</view>
			<image 
				:src="this.$store.state.httpUrl+'Oneyuanbuy/Oneyuanbuybg.gif'"
			></image>
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
					url:`/pages/discount/discount`
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
		background-color: rgba(0,0,0,0.3);
		// padding:0 20rpx;
		.Oneyuanbuy{
			width: 94%;
			height:294rpx;
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
		}
	}
</style>
