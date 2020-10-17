<template>
	<view>
		<view 
			class="QRcodeA" 
			:style="{
					width:posterswidth,
					height:postersheight+'vh',
					top:topnum+'%',
					left:leftnum+'%',
					'background-image':'url('+this.$store.state.httpUrl+'qrcode/code.jpg'+')'
			}"
		>
		<!-- 'background-image':'url('+this.$store.state.httpUrl+'qrcode/code.jpg'+')' -->
			<canvas canvas-id="qrcode" :style="{width:400+'rpx',height:400+'rpx',top:qrcodeatop+'rpx',left:qrcodealeft+'rpx'}" class="qrcodea" />
			<!-- <image class="activitygraph" src='/static/qrcode/code.jpg'></image> -->
			<text class="cancel" @tap="cancel">X</text>
			<view class="wxshore" v-show="storesourcebool">
				<view 
					class="wxstoreicon" 
					v-for="(item,index) in storewxyuan" 
					:key="index"
					@tap="storewx"
					:data-indexs="index"
				>
					<image :src="item.imgs" class="imgs"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	//进入二维码    
	import uQRCode from '@/components/Sansnn-uQRCode/uqrcode.js'
	// 截图组件
	export default {
		data() {
			return { 
				isShow:true,  
				Activitygraph:'',//路径
				Sharedpath:'',   //分享的路径
				posterswidth:"43vh",
				postersheight:60,
				leftnum:8,
				topnum:20,
				qrcodeatop:300,
				qrcodealeft:190,
				storewxyuan:[
					{
						imgs:this.$store.state.httpUrl+'fission/wxchat.png'
					},
					{
						imgs:this.$store.state.httpUrl+'fission/wxfriends.png'
					}
				],
				storesource:"",//分享到哪
				storesourcebool:true,//判断用户点击后分享 隐藏下面
				screenWidth:0
			}
		},
		created() {
			
		}, 
		props:['isCode'],
		methods: {
			storewx(e){
				const _this = this
				let {indexs} = e.currentTarget.dataset;
				// console.log(this.screenWidth)
				// uni.getSystemInfo({
				// 	success(res){
				// 		// console.log(res.screenWidth)
				// 		this.posterswidth = res.screenWidth*2 + 'rpx'
				// 		console.log(this.posterswidth)
				// 	}
				// })
				// this.posterswidth = 750 + "rpx"
				// console.log(this.posterswidth)
				if(parseInt(indexs)==0){
					_this.storesource = "WXSceneSession"
				}else{
					_this.storesource = "WXSenceTimeline"
				}
				uni.share({
					provider: "weixin",
					scene:_this.storesource,
					type: 2,
					imageUrl:_this.$store.state.httpUrl + 'Webpageindex/shorewx.jpg',
					success: function(res) {
						// console.log("success:" + JSON.stringify(res), 111);
						_this.$emit('cancel')
					}, 
					fail: function(err) {
						// console.log("fail:" + JSON.stringify(err), 2222);
					}
				});
				// this.storesourcebool = false
				// this.longtap()
			},
			capture() {
				    const _this = this 
					var pages = getCurrentPages(); //获取当前页面信息   
					var page = pages[pages.length - 1];
					// console.log(pages);
					var bitmap = null;
					var currentWebview = page.$getAppWebview(); 
					bitmap = new plus.nativeObj.Bitmap('amway_img');
					// 将webview内容绘制到Bitmap对象中
					currentWebview.draw(bitmap, function() {
					// console.log('截屏绘制图片成功');
					//这里我将文件名用四位随机数拼接了，不然会出现当前图片替换上一张图片只能保存一张图片的问题  
							let rand = Math.floor(Math.random()*10000) 
							let saveUrl = '_doc/'+rand+'a.jpg' 
							bitmap.save(saveUrl, {}, function(i) {
								// console.log('保存图片成功：' + JSON.stringify(i.target));
								_this.Activitygraph  = JSON.stringify(i.target)
						        _this.Sharedpath = _this.Activitygraph.slice(9,_this.Activitygraph.length-1)
								// console.log(_this.Sharedpath)
								uni.saveImageToPhotosAlbum({
									filePath: i.target,
									success: function(res) {
										// console.log(res,'返回值')	
										_this.send()
										uni.showToast({
											title: '保存图片成功',
											mask: false,
											duration: 1500
										});	
									} 
								});
							}, function(e) {
								// console.log('保存图片失败：' + JSON.stringify(e)); 
							});
						}, function(e) {
							// console.log('截屏绘制图片失败：' + JSON.stringify(e));
						});
						//currentWebview.append(amway_bit); 
					},
			send(){
				const _this = this
				uni.share({
					provider: "weixin",
					scene:_this.storesource,
					type: 2,
					imageUrl: _this.Sharedpath,
					success: function(res) {
						// console.log("success:" + JSON.stringify(res), 111);
						this.$emit('cancel')
					}, 
					fail: function(err) {
						// console.log("fail:" + JSON.stringify(err), 2222);
					}
				});
			},		
			make() {
				// console.log(this.$store.state.Qrcodeurl)
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text:`${this.$store.state.imgyuming}/uploads/app/image/Webpageindex/Webpageindex.html`,
					size: 100,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'png',
					correctLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						// console.log(res)
						this.QRcode = res
					}
				})
			},
			//点击关闭
			cancel(){
				this.$emit('cancel')
			},
			longtap(){
				//长按改变 分享样式
				// // #ifdef H5
					
				// // #endif
				// // #ifdef APP-PLUS
				// 	this.posterswidth = 54
				// // #endif
				this.postersheight = 100
				this.leftnum = 0
				this.topnum = 0
				this.qrcodeatop = 600
				this.qrcodealeft = 280
				// #ifdef APP-PLUS
				setTimeout(()=>{
					this.capture()
				},1500)
				// #endif
			}
		},
		created() {
			// console.log(111)
			this.make()
			
		}
	}
</script> 

<style lang="less" scoped>  
    .QRcodeA{ 	
		// background-image:url(/static/codeOne.jpg);
		// position: relative;
		// width: 600rpx;// 
		// height: 800rpx; 
		// background-color: #808080;  
		position: absolute;
		// /* #ifdef APP-PLUS */
		// left:8%;
		// /* #endif*/
		// /* #ifdef H5 */
		// left:11%;
		// /* #endif */
		// // margin-left: -300rpx;
		// top:20%; 
		// margin-top: -400rpx;  
		// left: 0;
		// top: 0;
		background-size: 100% 100%;
	}
	.activitygraph{
		width: 100%;
		height: 100%;  
	}
	.qrcodea{ 
		position: absolute; 
		// left: 240rpx;
		// top: 458rpx; 
	}
	.cancel{
		font-size: 40rpx; 
		color:#000; 
		position: absolute;
		top: 40rpx;
		right: 40rpx;
		z-index:9;
	}
	.wxshore{
		display:flex;
		justify-content: space-around;
		position: absolute;
		bottom:60rpx;
		left:0;
		width: 100%;
		// height:10rpx;
		// background-color: red;
		.wxstoreicon{
			width: 70rpx;
			height:70rpx;
			// background-color:green;
			.imgs{
				width: 100%;
				height:100%;
			}
		}
	}
	
</style>	

