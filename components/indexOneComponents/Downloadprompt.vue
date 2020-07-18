<template>
	<view class="wrap" v-if="this.$store.state.wholeisdownload">
		<view class="Downloadprompt" v-show="this.$store.state.isdownload">
			<!-- 包裹盒子和那个叉 -->
		   <view >
				<!-- 中间那个大盒子 -->
				<view class="Playbox">
					<!-- 更新的图片 -->
				   <view class="UpdatePri">
					   <image :src="this.$store.state.httpUrl+'logoPicture.png'" mode=""></image>
				   </view>
				   <view class="versionupdating">新版本更新</view>
				   <!-- 更新内容 -->
				   <view class="updateCon">
					   <view>更新内容</view>
					   <view class="concrete">
						   <view>1.新增小蜜蜂会员</view>
						   <view>2.优化界面</view>
						   <view>3.修复不分bug</view>
					   </view>
				   </view>
				   <!-- 立即更新  -->
				   <view class="promptlyupdate_cen" @tap="AppUpdate">
						<view class="promptlyupdate">立即更新</view>
				   </view>
				 </view>
				 <!-- 叉掉 == X-->
				 <view class="Hiddenbounced_box">
					 <view class="Hiddenbounced"  @tap="Hiddenbox">X</view>
				 </view>
		   </view>
		</view>
		<!-- 下面的提示 -->
		<view class="hideUpdate" v-if="isprogressbar" @tap="Bouncedout">
			{{this.$store.state.progress}}
		</view>
		<!-- 进度 -->
		<view class="scheduleplice" :class="Wherend?'scheduleactive':'schedule'">
			<view>
				<image src="/static/Downloadprompt/Willblog.png" mode="" style="height: 92rpx;width: 80rpx;margin-top: 16rpx;"></image>
			</view>
			<view class="schedule_runga">
				<view class="download_tlt">下载进度</view>
				<view class="cu-progress round margin-top">
					<view class="bg-red" :style="[{ width:this.$store.state.progress}]">{{this.$store.state.progress}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isprogressbar:false,  //进度条   
				Wherend:false ,//最后进度到哪
				loading: false
			}
		},
		onLoad: function() {
			let that = this;
			setTimeout(function() {
				that.loading = true
			}, 500)
		},
		methods:{
			// Hiddenbox(){
			// 	this.isdownload = false;
			// 	this.isprogressbar = true
			// },
			// Bouncedout(){
			// 	let that = this;
				
			// 	this.isprogressbar = false
			// 	that.Wherend = true
			// }
			//当用户点击了整包立即更新
			AppUpdate(){
				this.isprogressbar = true
				console.log(this.isprogressbar)
				this.$store.commit("AppUpdate")
				
			},
			Hiddenbox(){
				this.$store.commit("Hiddenbox")
			},
			Bouncedout(){
				this.Wherend = true
				this.isprogressbar = false
				setTimeout(()=>{
					this.Wherend = false
					this.isprogressbar = true
				},10000)
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.Downloadprompt{
		position: absolute;
		// width: 100%;
		left: 50%;
		transform: translateX(-50%);
		top:10%;
		display: flex;
		justify-content: center;
	}
	.Playbox{
		margin-top: 200rpx;
		width: 520rpx;
		padding-bottom: 50rpx;
		border-radius: 30rpx;
		background: #FFFFFF;
		// 更新上面的图片
		.UpdatePri{
			margin-top: -95rpx;
			display: flex;
			justify-content: center;
		    image{
				height: 330rpx;
				width: 400rpx;
			}
		}
		.versionupdating{
			color: #49cfad;
			font-size: 40rpx;
			display: flex;
			justify-content: center;
			font-weight: 800;
		}
		//更新
		.updateCon{
			padding-left: 60rpx;
			margin-top: 40rpx;
			// 具体更新内容
			.concrete{
				margin-top: 20rpx;
				color: #a5a5a5;
			}
		}
		.promptlyupdate_cen{
			display: flex;
			justify-content: center;
			margin-top: 50rpx;
			// 立即更新
			.promptlyupdate{
				width: 360rpx;
				height: 90rpx;
				background-color: #48cfad;
				border-radius: 50rpx;
				color: #FFFFFF;
				line-height:90rpx;
				text-align: center;
				font-size: 34rpx;
			}
		}
	}
	.Hiddenbounced_box{
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
		// 隐藏弹框
		.Hiddenbounced{
			width: 65rpx;
			height: 65rpx;
			border: 2px solid #48cfad;
			border-radius: 50%;
			color: #48cfad;
			line-height: 62rpx;
			text-align:center;
			font-size: 36rpx;
			font-weight: 400rpx;
		}
	}
	// 后台下载的盒子  
	.hideUpdate{
		position: absolute;
		  top:64%;
		  width: 80rpx;
		  height: 80rpx;
		  border-radius: 50%;
		  line-height: 80rpx;
		  text-align: center;
		  color: #FFFFff;
		  background-color: rgba(0,0,0,.4);
	}
	// 最后的进度条到哪了
	.schedule{
		width: 0%;
	}
	.scheduleactive{
		width: 85%;
		padding-left: 15rpx;
		border: 2rpx solid #9000FF;
	}
	.scheduleplice{
		overflow: hidden;
		  position: absolute;
		  top: 64%;
		  height: 124rpx;
		  background-color: #2c2c2c;
		  opacity: .9;
		  display: flex;
		  color: #fff;
		  
		  // border-top-right-radius: 14rpx;
		  // border-bottom-right-radius: 14rpx;
		  transition: 2s;
		  border-radius:0  100rpx 100rpx 0;
		.margin-top{
			margin-top: 15rpx;
			width: 420rpx;
		}
		.schedule_runga{
			margin-left: 20rpx;
			.download_tlt{
				margin-top: 16rpx;
			}
		}
	}
</style>
