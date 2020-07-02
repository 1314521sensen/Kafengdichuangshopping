<template>
	<view class="Selectexpresscompany">
		<view class="cu-form-group margin-top" v-if="this.$store.state.kiadigongsi">
			<view class="title">快递公司</view>
			{{this.$store.state.Couriercompanyname}}
		</view>
		<view class="cu-form-group">
			<view class="title">快递单号</view>
			<input v-model="value" placeholder="请直接输入物流单号即可" name="input"></input>
			<button class='cu-btn bg-green shadow' @tap="Querysinglenumber">查询</button>
		</view>
		<loading v-if="this.$store.state.loadModal"></loading>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return {
				value:""
			}
		},
		methods:{
			Querysinglenumber(){
				const _this = this
				let {value} = this.$data
				// console.log(value)
				_this.$store.commit("Querysinglenumber",{value})
				
			}
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
