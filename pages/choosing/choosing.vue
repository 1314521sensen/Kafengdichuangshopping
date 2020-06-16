<template>
	<view class="choosing" :style="{'padding-top':statusBar+10+'rpx'}">
		<actionbar message="入驻协议" url="/pages/PersonalMy/PersonalMy"></actionbar>
		<view class="choosing-img">
			<view class="imgsbox" :style="{'background-image':'url(/static/logo.png)'}"></view>
		</view>
		<view class="choosing-btn">
			<button class="cu-btn round text-white" v-for="(item,index) in btnlist" :key="index" @tap="enterinto" :data-indexs="index">{{item}}</button>
		</view>
		<view class="agreementchoose">
			<radio-group @change="RadioChange">
				<radio 
					class="radiogroup" 
					:class="radio=='B'?'checked':''" 
					:checked="radio=='B'?true:false" 
					value="B" 
				></radio>
			</radio-group>
			<view class="radiotext">
				<text>我同意</text>
				<text class="xieyi" @tap="agreementtext">《惠播客平台商户入驻协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
	//这是入驻选择
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:0,
				btnlist:[
					"个人入驻",
					"企业入驻"
				],
				radio:'A',
			}
		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value
			},
			agreementtext(){
				uni.navigateTo({
					url:`/pages/agreementtext/agreementtext`
				})
			},
			enterinto(e){
				let indexs = e.currentTarget.dataset.indexs
				if(parseInt(indexs)==0){
					uni.navigateTo({
						url:`/pages/Qualificationinformation/Qualificationinformation?titlename=Individuals`
					})
				}else{
					uni.navigateTo({
						url:`/pages/Qualificationinformation/Qualificationinformation?titlename=enterprises`
					})
				}
			}
		},
		comments:{
			actionbar
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.choosing{
		background-color: #fff;
		height:100vh;
		.choosing-img{
			display:flex;
			justify-content:center;
			align-items: center;
			height:50vh;
			// background-color:yellow;
			.imgsbox{
				width: 30%;
				height:30%;
				// background-color:red;
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}
		}
		.choosing-btn{
			padding:0 20rpx;
			margin-bottom:40rpx;
			button{
				width: 100%;
				font-size:34rpx;
				font-weight: bold;
				background-color: #ff5500;
				margin-bottom:40rpx;
				height:84rpx;
			}
		}
		.agreementchoose{
			display:flex;
			padding-left:20rpx;
			.radiotext{
				margin:6rpx 0 0 20rpx;
				.xieyi{
					color:#ff5500;
				}
			}
		}
	}
</style>
