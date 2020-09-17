<template>
	<view class="shareCode" :style="{'background-image':'url('+this.$store.state.httpUrl+'sharecode/commissionbg.png'+')'}">
		<defaultbgblackcolorwhitebar></defaultbgblackcolorwhitebar>
			<!-- <canvas canvas-id="qrcode" :style="{width:200+'rpx',height:200+'rpx'}"  class="qrcodea" /> -->
			<!-- <view > -->
				<canvas canvas-id="qrcode" :style="{width:200+'rpx',height:200+'rpx'}"  class="qrcodea" />
			<!-- </view> -->
	</view>
	
</template>

<script>
	import uQRCode from '@/components/Sansnn-uQRCode/uqrcode.js'
	import defaultbgblackcolorwhitebar from "@/components/actionbar/defaultbgblackcolorwhitebar.vue"
	export default {
		data() {
			return {
				code:0,
			}
		},
		methods:{
			make() {
				// console.log(this.code)
				const _this = this
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: _this,
					text:`${_this.code}&type=1`,
					size: 100,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'png',
					correctLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						// console.log(res)
						_this.QRcode = res
						
					}
				})
			},
		},
		created() {
			const _this = this
			uni.getStorage({
				key:"share_code",
				success(res){
					_this.code= res.data
					setTimeout(()=>{
						_this.make()
					},2000)
				}
			})
		},
		components:{
			defaultbgblackcolorwhitebar
		}
	}
</script>

<style lang="less" scoped>
	.shareCode{
		width:100%;
		height: 100vh;
		background-size: 100% 100%;
		image{
			width: 100%;
			height: 100vh;
		}
		.qrcodea{
			position: absolute;
			/* #ifdef H5 */
			top:47vh;
			left:20vh;
			/* #endif */
			/* #ifdef APP-PLUS */
				top:49vh;
				left:19vh;
			/* #endif */
		}
	}
</style>
