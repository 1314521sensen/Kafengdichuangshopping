<template>
	<!-- 判断用户有没有登录 有的话就不在显示  没有的话就显示 -->
	<view class="Layerthickness">
			<button class="cu-btn block margin-tb-sm lg btninformation" 
					open-type="getUserInfo" 
					@getuserinfo="clickgetUserInfo" 
					:disabled="disabled"
					:style="{'background-color':bg}"
					>
					<text class="cuIcon-loading2 cuIconfont-spin"></text>{{message}}
					<text>{{i}}</text>
			</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message:"点击登录",
				disabled:false,
				i:0,
				bg:`rgb(243,143,49)`
			}
		},
		methods: {
			clickgetUserInfo(){
				uni.getProvider({
					service:"oauth",
					success:(res)=>{//这里获取到是哪个平台
						// console.log(res)
						if (~res.provider.indexOf('weixin')){
							uni.login({
								provider:"weixin",
								success:(loginRes)=>{//这里获取到code码
									// console.log(JSON.stringify(loginRes))
									//获取到code码 发送到后端获取openid
									console.log(loginRes.code)
									//将code码发给后台
									uni.setStorage({
										key:"wxcodekey",
										data:loginRes.code
									})
									uni.getUserInfo({
										provider:"weixin",
										success:(infoRes)=>{
											// console.log(infoRes) //这获取了用户的信息
											//这里加点特效
											let i = 0;
											let [times,r,g,b] = [null,158,52,79]
											this.disabled = true
											times = setInterval(()=>{
												i++
												[r,g,b] = [r++,g++,b++]
												this.message = "正在拼命加载"
												// 57 181 74
												this.i = i+"%"
												this.bg = `rgb(${r},${g},${b})`
												if(i==100){
													clearInterval(times)
													this.disabled = false
													uni.switchTab({
														url:"/pages/index/index"
													})
												}
											},100)
										},
										fail(err){
											console.log(err)
										}
									})
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #fff;
	}
	.Layerthickness{
		display:flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height:100vh;
		background-color:rgba(255,255,255,.5);
		// padding:0 20rpx;
		.btninformation{
			position: relative;
			display: flex;
			justify-content: center;
			width: 44%;
			height:330rpx;
			border-radius:50%;
			padding:0;
			color:#fff;
			font-weight: bold;
			transition: .4s;
		}
	}
</style>
