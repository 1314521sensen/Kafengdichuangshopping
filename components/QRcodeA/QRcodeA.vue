<template>
	<view >
		<view 
			class="QRcodeA" 
			:style="{width:posterswidth+'vh',height:postersheight+'vh'}"
		>
			<canvas canvas-id="qrcode"   style="width: 140rpx;height: 140rpx;" class="qrcodea" />
			<image class="activitygraph" src='/static/qrcode/code.jpg'></image>
			<text class="cancel" @tap="cancel">X</text>
			<!-- <button @tap="send" type="default">确认分享</button> -->
			<!-- #i fdef APP-PLUS -->
			<!-- <button class="info" @tap="capture">点击保存我哦~</button> -->
			<!-- #e ndif --> 
		</view>
	</view>
</template>

<script>
	//进入二维码    
	import uQRCode from '@/components/Sansnn-uQRCode/uqrcode.js'
	// 截图组件
	export default {
		data() {
			return { 
				isShow:true,  
				Activitygraph:'',//路径
				Sharedpath:'',   //分享的路径
				posterswidth:43,
				postersheight:60
			}
		},
		created() {
			
		}, 
		props:['isCode'],
		methods: {
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
										console.log(res,'返回值')	
											
										uni.showToast({
											title: '保存图片成功',
											mask: false,
											duration: 1500
										});	
									} 
								});
							}, function(e) {
								console.log('保存图片失败：' + JSON.stringify(e)); 
							});
						}, function(e) {
							console.log('截屏绘制图片失败：' + JSON.stringify(e));
						});
						//currentWebview.append(amway_bit); 
					},
			send(){
				const _this = this
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 2,
					imageUrl: _this.Sharedpath,
					success: function(res) {
						console.log("success:" + JSON.stringify(res), 111);
					}, 
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err), 2222);
					}
				});
			},		
			make() { 
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: 'http://hbk.huiboke.com/uploads/app/image/Webpageindex/Webpageindex.html',
					size: 70,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'png',
					correctLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						console.log(res)
						this.QRcode = res
					}
				})
			},
			//点击关闭
			cancel(){
				this.$emit('cancel')
			}
			
		}
	}
</script> 

<style lang="less" scoped>  
    .QRcodeA{ 	
		// position: relative;
		// width: 600rpx;// 
		// height: 800rpx; 
		background-color: #808080;  
		position: absolute;
		/* #ifdef APP-PLUS */
		left:8%;
		/* #endif*/
		/* #ifdef H5 */
		left:11%;
		/* #endif */
		// margin-left: -300rpx;
		top:20%; 
		// margin-top: -400rpx;  
		// left: 0;
		// top: 0;
	}
	.activitygraph{
		width: 100%;
		height: 100%;  
	}
	.qrcodea{ 
		position: absolute; 
		left: 230rpx;
		top: 458rpx; 
	}
	.cancel{
		font-size: 40rpx; 
		color:#FFFFFF; 
		position: absolute;
		top: 40rpx;
		right: 40rpx;
		z-index:9;
	}
</style>	

