<template>
	<view class="address">
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="from">
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input v-model="value1" placeholder="姓名" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input v-model="value2" placeholder="手机号" name="input"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">收货地址</view>
				<input v-model="value3" placeholder="收货地址" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input v-model="value4" placeholder="收货地址" name="input"></input>
			</view>
		</view>
		<view class="confirm-box">
			<view class="confirm">
				<view class="cu-bar btn-group">
					<button class="cu-btn bg-red shadow-blur round">取消</button>
					<button class="cu-btn bg-green shadow-blur round" @click="submits">保存</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default{
		data(){
			return {
				value1:"",
				value2:"",
				value3:"",
				value4:"",
				statusBar:0
			}
		},
		methods:{
			submits(){
				// console.log(this.value1,this.value2,this.value3,this.value4)
				if(this.value1){
					uni.navigateTo({
						url:`/pages/addressTo/addressTo?value1=${this.value1}&value2=${this.value2}&value4=${this.value4}`,
					})
				}else{
					console.log("请输入正确的信息")
				}
				
			}
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.address{
		.confirm-box{
			.confirm{
				position: fixed;
				width: 100%;
				// height:70rpx;
				left:0;
				bottom:0;
				.cu-btn{
					height:80rpx;
				}
			}	
		}
	}
	//插件的css
	.cu-bar{
		min-height:86rpx;
	}
	.cu-bar.btn-group uni-button{
		margin:0;
	}
</style>
