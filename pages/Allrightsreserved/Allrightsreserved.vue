<template>
	<view class="Allrightsreserved">
		<actionbar message="关于"></actionbar>
		<view class="Allrightsreserved-midden">
			<text class="Allrightsreserved-title">惠播客</text>
			<text>For ipone v7.0.4build646855</text>
			<view class="copyright-img">
				<view class="imgs">
					<img src="/static/copyright/1.png" alt="">
				</view>
			</view>
			
			<text>扫描二维码，你的朋友也可以下载惠播客客户端</text>
		</view>
		<view class="cu-form-group" v-for="(item,index) in list" :key="index">
			<view class="title">{{item}}</view>
			<text class="lg text-gray cuIcon-right"></text>
		</view>
		<view class="copyright-text">
			<text>Copyright©2020</text>
			<text>卡风迪创huiboke.com 版权所有</text>
		</view>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	export default {//这个是版权所有
		data() {
			return {
				list:[
					"特别声明",
					"使用帮助",
					"给我评分",
					"隐私政策"
				]
			}
		},
		methods: {
			
		},
		components:{
			actionbar
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #ffffff;
	}
	.Allrightsreserved{
		.Allrightsreserved-midden{
			// display:flex;
			// justify-content: center;
			background-color: #f2f2f2;
			padding-bottom:40rpx;
			text{
				display:block;
				width: 100%;
				text-align:center;
				margin-top:20rpx;
			}
			.Allrightsreserved-title{
				font-size: 45rpx;
				font-weight: bold;
				color:rgb(231,24,62)
			}
			.copyright-img{
				display:flex;
				justify-content: center;
				margin-top:10rpx;
				.imgs{
					width: 200rpx;
					height:200rpx;
					img{
						width: 100%;
						height:100%
					}
				}
				
			}
			
		}
		.cu-form-group{
				min-height:80rpx;
		}
		.copyright-text{
			text{
				display:block;
				text-align:center;
				margin-top:15rpx;
				color:#999;
			}
		}
	}
</style>
