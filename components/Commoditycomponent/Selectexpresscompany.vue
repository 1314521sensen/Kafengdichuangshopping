<template>
	<view class="Selectexpresscompany">
		<view class="cu-form-group margin-top" v-if="kiadigongsi">
			<view class="title">快递公司</view>
			{{Couriercompanyname}}
		</view>
		<view class="cu-form-group">
			<view class="title">快递单号</view>
			<input v-model="value" placeholder="请直接输入物流单号即可" name="input"></input>
			<button class='cu-btn bg-green shadow' @tap="Querysinglenumber">查询</button>
		</view>
		<loading v-if="loadModal"></loading>
	</view>
</template>

<script>
	import loading from "@/components/Commoditycomponent/loading.vue"
	const app = getApp()
	export default{
		data(){
			return {
				value:"",
				kiadigongsi:false,
				loadModal:false,
				Couriercompanyname:"",
			}
		},
		methods:{
			Querysinglenumber(){
				const _this = this
				if(_this.value!==""){
					_this.loadModal = true
					_this.kiadigongsi = true
					uni.request({
						url:`${app.globalData.Requestpath}order/getLogisticCompanyInfo`,
						method:'POST',
						data:{
							e_num:_this.value,
							token:_this.tokey
						},
						success(res) {
							if(res.data.code==0){
								_this.loadModal = false
								//把用户的输入的订单号传给父级
								_this.Couriercompanyname = res.data.data.express_name
								_this.$emit("Queryasinglenumber",_this.value)
								_this.$emit("Courierinformation",res.data.data)
							}
							//如果tokey错误就让用户跳到登录页面
							app.globalData.Requestmethod(_this.tokey,res.data.msg)
						}
					})
					
				}else{
					app.globalData.showtoastsame("请输入快递单号")
				}
				
			}
		},
		props:["tokey"],
		components:{
			loading
		}
	}
</script>

<style lang="less" scoped>
	.Selectexpresscompany{
		.cu-load.load-modal::after{
			border-left:6rpx solid rgb(321,20,86);
		}
	}
</style>
