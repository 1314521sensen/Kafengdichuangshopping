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
			<view class="cu-form-group" @tap="Addressselection">
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
					<button class="cu-btn bg-red shadow-blur round" @tap="Addresscancel">取消</button>
					<button class="cu-btn bg-green shadow-blur round" @tap="submits">保存</button>
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
				show: false,
				value1:"",
				value2:"",
				value3:"",
				value4:"",
				statusBar:0
			}
		},
		methods:{
			
			Addressselection(){
				this.show = true
			},
			submits(){
				// console.log(this.value1,this.value2,this.value3,this.value4)
				if(this.value1 && this.value2 && this.value3 && this.value4){
					// console.log(1)
					//这是跳转上页
					//当点击的时候把值加入到把数据提交到数据库当中 在另一个页面进行数据的请求 渲染
				}else{
					uni.showToast({
						title:"请输入完整信息",
						mask:true,
						icon:"none"
					})
				}
				
			},
			//这是取消的
			Addresscancel(){
				uni.navigateBack({
				    delta: 1
				});
			},
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		// created() {
		// 	uni.request({
		// 		url:"http://hbk.huiboke.com/api/common/getAreas",
		// 		data:{
		// 			parent_id:0
		// 		},
		// 		success(res) {
		// 			console.log(res)
		// 		}
		// 	})
		// }
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
