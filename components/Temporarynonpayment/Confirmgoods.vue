<template>
	<view class="Confirmgoods">
		<button class="cu-btn round line-red btn-padding-left" @tap="Confirmusergoods">确认收货</button>
		<button class="cu-btn round line-orange btn-padding-left">待评价</button>
		<!-- 支付密码弹出的框 -->
		<zhifupassword 
			:show="show" 
			:isIphoneX="isIphoneX" 
			ordershow='2'
			@close="close"
			@Enterpasswordcompletepayment="Enterpasswordcompletepayment"
		></zhifupassword>
	</view>
</template>

<script>
	//引入支付密码的组件
	import zhifupassword from "@/components/yzc-paykeyboard/yzc-paykeyboard.vue"
	const app = getApp()
	export default {
		data(){
			return {
				show:false,
				isIphoneX:false,
				zhifuppastext:""
			}
		},
		methods:{
			Confirmusergoods(){
				this.show=true
				this.isIphoneX = true
			},
			// 点击支付密码那个×
			close(e){
				this.show = false,
				this.isIphoneX = false
			},
			// 等输入密码完成后
			Enterpasswordcompletepayment(e){
				const _this = this
				_this.zhifuppastext = e
				console.log(e)
				//当输入完密码时
				uni.request({
					url:`${app.globalData.Requestpath}order/confirmPayOrder`,
					method:"POST",
					data:{
						token:_this.tokey,
						o_sn:_this.ordersnSerialid,
						pay_password:_this.zhifuppastext
					},
					success(res) {
						console.log(res)
						if(res.data.code==0){
							_this.show = false,
							_this.isIphoneX = false
							app.globalData.showtoastsame('收货完成')
							//就跳到评价的页面
							uni.redirectTo({
								url:"/pages/evaluate/evaluate"
							})
							return 
						}
						app.globalData.showtoastsame(res.data.msg)
					}
				})
			}
		},
		props:["tokey","ordersnSerialid"],
		components:{
			zhifupassword
		}
	}
</script>

<style lang="less">
	.Confirmgoods{
		display: flex;
		justify-content:flex-end;
		background-color: #fff;
		margin-top:10rpx;
		padding:15rpx 10rpx 15rpx 0;
		.btn-padding-left{
			padding:0 26rpx;
			height:56rpx;
			margin-right:15rpx;
		}
	}
</style>
