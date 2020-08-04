<template>
	<view class="Setpaymentpassword">
		<view class="orders">
			<view class="orders-title-name">
				<text>{{message}}</text>
				<view class="mintext"  @tap="shezhipasswrd" data-target="setphonetan">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//components/setcenter/SetChangeResetpassword
	const app = getApp()
	export default{
		data(){
			return {
				message:"设置支付密码",
				setzhifumimabool:""
			}
		},
		methods:{
			shezhipasswrd(){
				//跳转
				if(this.business=="pay"){//如果等于pay的话 就是订单页面跳转过来的
					uni.navigateTo({
						url:`/components/setcenter/SetChangeResetpassword?index=${this.setzhifumimabool}&tokey=${this.tokey}&phone=${this.userphone}&id=${this.userid}&business=${this.business}`
					})
				}else{
					uni.navigateTo({
						url:`/components/setcenter/SetChangeResetpassword?index=${this.setzhifumimabool}&tokey=${this.tokey}&phone=${this.userphone}&id=${this.userid}`
					})
				}
			}
		},
		created(){
			const _this = this
			//检测用户是否设置支付密码
			uni.getStorage({
				key:"bindtokey",
				success(restokey) {
					uni.request({
						url:`${app.globalData.Requestpath}user/isSetPayPassword`,
						method:"POST",
						data:{
							token:restokey.data
						},
						success(reszhifu){
							console.log(reszhifu)
							if(reszhifu.data.code==0){//code等于0 代表密码存在
								
								 _this.setzhifumimabool = reszhifu.data.data.flag //1
								 _this.message = "修改支付密码"
							}else{//code等于1代表密码不存在
								_this.setzhifumimabool = reszhifu.data.data.flag //0
								_this.message = "设置支付密码"
							}
						}
					})
				}
			})
		},
		props:["tokey","userphone","userid","business"]
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
