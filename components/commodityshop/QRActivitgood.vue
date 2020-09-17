<template>
	<view class="wrapBox" :style="{'padding-top':statusBar+'px'}">
		<!-- 头部标题 -->
		<view class="title_Logo">
			<text class="title">惠播客</text>
			<text class="title_info">请打开惠播客APP进行扫码</text>
		</view>
		<!-- 展示的图片 -->
		<!-- {{good_images}} -->
		<image class='bg_logo' :src="imgpath+good_images" mode=""></image>
		<!-- 底部介绍 -->
		<view class="introduce">
			<view class="left">
				<!-- 价格 -->
				<view class="goodPriceBox"><text class="price">{{'￥'+promotion_price}}</text></view>
				<view class="goodtitle">{{good_title}}</view>
			</view>
			<view class="right">
				<canvas canvas-id="qrcode" style="width: 170rpx;height: 170rpx;" class="qrcodea" />
			</view>
		</view>
	</view>
</template>

<script>
	//二维码组件
	import uQRCode from '@/components/Sansnn-uQRCode/uqrcode.js'
	// 截图组件
	export default {
		data() {
			return { 
				imgpath:this.$store.state.imgyuming,
				code:0
			}
		},
		updated() {
			this.make()
		},
		created(){
			const _this = this
			uni.getStorage({
				key:"share_code",
				success(res) {
					// console.log(res)
					if(res.data!==""){
						_this.code = res.data
						
					}else{
						_this.code = 0
					}
					
					_this.make()
				}
			})
			
		},
		methods: {
			  make() {
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text:`gid=${this.gid}&sid=${this.sid}&code=${this.code}&type=2`,
					size: 85,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'png',
					correctLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						this.QRcode = res
						setTimeout(()=>{
							this.getscreenshots()
						},3000)
						
					}
				})
			  },
			//封装进行截屏
			getscreenshots(){
				// #ifdef APP-PLUS
				const _this = this
				//获取页面栈 
				let pages = getCurrentPages()
				let page = pages[pages.length-1]
				let bitmap = null
				let currentWebview = page.$getAppWebview()
				bitmap = new plus.nativeObj.Bitmap('amway_img')
				currentWebview.draw(bitmap,function(){
					// console.log("截图成功")
					 bitmap.save(".jpg",{},function(resave){
						 // console.log("保存成功",resave)
						 let src = resave.target.substr(8,resave.target.length-1)
						 // console.log(src)
						 setTimeout(()=>{
							 uni.saveImageToPhotosAlbum({
							 	filePath:resave.target,
							 	success(res) {
							 		// console.log(res,"保存成功")
									uni.share({
										provider:"weixin",
										type:2,
										imageUrl:resave.target,
										scene:"WXSceneSession",
										success(resare) {
											// console.log("分享成功",resare)
											_this.$emit("areclose",{bool:false,storetext:"分享成功"})
										},
										fail(err){
											// console.log("分享失败",err)
											_this.$emit("areclose",{bool:false,storetext:"分享失败"})
										}
									})
							 	},
							 	fail(err){
							 		// console.log(err,"保存失败")
							 	}
							 })
						 },1500)
					 },function(err){
						 // console.log("保存图片失败",err)
					 })
				},function(){
					// console.log("截屏失败")
				})
				// #endif
			}
		},
		props:["good_images","promotion_price","good_title","gid","sid","statusBar","url"]
	}
</script> 

<style lang="less" scoped>  
    //最大的盒子
	.wrapBox{
		// position: absolute;
		// top:0;
		/* #ifdef H5 */ 
		width: 56vh;
		/* #endif */ 
		/* #ifdef APP-PLUS */
		width: 750rpx;
		/* #endif */
		// left:0;
		// transform: translate(-50%);
		height: 100vh;
		background-color: #FFFFFF;
		// 标题
		.title_Logo{
			display: flex;
			justify-content: space-around;
			// padding: 20rpx 0;
			color: #FFFFFF;
			background-color:#d7191b;
			line-height:100rpx;
			.title{
				font-size: 42rpx;
				font-weight: bold;
			}
			.title_info{
				font-size: 24rpx;
			}
		}
		//要展示的背景图片
		.bg_logo{
			height:75vh;
			width: 100%;
		}
		// 底部的介绍
		.introduce{
			display: flex;
			padding:20rpx 0 0 24rpx;
			justify-content: space-around;
			// 底部左边部分
			.left{
				width: 400rpx;
				// 价格
				.goodPriceBox{
					color:red;
					overflow:hidden; 
					text-overflow:ellipsis;
					display:-webkit-box; 
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2; 
					.price{
						font-size: 42rpx;
						font-weight: bold;
					}
				}
				.goodtitle{
					 text-overflow: -o-ellipsis-lastline;
					  overflow: hidden;
					  text-overflow: ellipsis;
					  display: -webkit-box;
					  -webkit-line-clamp: 2;
					  line-clamp: 2;
					  -webkit-box-orient: vertical;
				}
			}
		}
	}
</style>	

