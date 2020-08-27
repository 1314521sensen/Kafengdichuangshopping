<template>
	<view class="Littlebeebox">
		<view class="Littlebee" :style="{'background-image':'url('+this.$store.state.httpUrl+'/littlebee/littlebeebg.gif)'}">
			<view class="Littlebee-top">
				<!-- 这是上面的值 -->
				<view class="Littlebee-top-right-zhi">
					<view class="plicevalue" v-for="(item,index) in valueiconlist" :key="index">
						<view class="icon-box">
							<view class="icon">
								<image :src="imgpath+'/uploads/app/image/'+item.imgs" class="imgs"></image>
							</view>
							<text class="iconvalue" :style="{'color':item.textcolor}">{{item.value}}</text>
						</view>
					</view>
					<!-- <view class="plicevalue">
						<view class="icon-box">
							<view class="icon">
								
							</view>
						</view>
					</view> -->
				</view>
				<!-- 这是下面的动效 -->
				<view class="activity">
					<view 
						class="sun activityvalue" 
						:style="{'background-image':'url('+imgpath+'/uploads/app/image/'+item.imgs+')','margin-top':item.marginTop+'rpx'}" 
						v-for="(item,index) in activitylist" 
						:key="index"
						@tap="activityicon"
						:data-indexs="index"
					>
					</view>
				</view>
			</view>
		</view>
		<beemembers :field="field" :vipbool="vipbool"></beemembers>
	</view>
</template>

<script>
	const app = getApp()
	import beemembers from "@/components/beemembers/beemembers.vue"
	export default {
		data() {
			return {
				activitylist:[
					{
						imgs:"littlebee/sun.png",
						marginTop:0
					},
					{
						imgs:"littlebee/rain.png",
						marginTop:0
					}
				],
				valueiconlist:[
					{
						imgs:"littlebee/sun.png",
						value:0,
						textcolor:"#febc51"
					},
					{
						imgs:"littlebee/smailrain.png",
						value:0,
						textcolor:"#4fb5e5"
					}
				],
				imgpath:this.$store.state.imgyuming,
				field:"",//判断是团长还是小蜜蜂进来的
				vipbool:0
			}
		},
		methods: {
			activityicon(e){
				app.globalData.showtoastsame("功能正在开发,敬请期待")
				// let time = null
				// let indexs = e.currentTarget.dataset.indexs
				// const _this = this
				// time = setInterval(function(){
				// 	_this.activitylist[indexs].marginTop +=20
				// 	if(_this.activitylist[indexs].marginTop>120){
				// 		clearInterval(time)
				// 	}
				// },100)
			}
		},
		components:{
			beemembers,
		},
		onLoad(option) {
			// console.log(option)
			let {field} = option
			this.field = field
		},
		onShow() {
			const _this = this
			uni.getStorage({
				key:'beesVip',
				success(resVip) {
					_this.vipbool = resVip.data
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.Littlebeebox{
		.Littlebee{
			height:100vh;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			.Littlebee-top{
				display:flex;
				align-items: flex-end;
				justify-content: center;
				height:35%;
				flex-wrap:wrap;
				// background-color:rgba(0,0,0,.3);
				.Littlebee-top-right-zhi{
					// background-color:red;
					width: 100%;
					// height:30rpx;
					.plicevalue{
						display:flex;
						justify-content: flex-end;
						// width: 200rpx;
						width: 100%;
						// height:50rpx;
						// background-color:yellow;
						margin-bottom:20rpx;
						&:last-child{
							margin-bottom:0;
						}
						.icon-box{
							overflow: hidden;
							display:flex;
							align-items: center;
							width: 200rpx;
							height:64rpx;
							background-color:rgba(255,255,255,.6);
							border-radius:40rpx 0rpx 0rpx 40rpx;
							.icon{
								display:flex;
								
								width:64rpx;
								height:64rpx;
								// background-color:green;
								border-radius:50%;
								.imgs{
									width: 100%;
									height:100%;
								}
							}
							.iconvalue{
								margin-left:14rpx;
								color:#999;
								font-size:24rpx;
							}
						}
					}
				}
				.activity{
					overflow: hidden;
					width: 100%;
					// background-color:red;
					display:flex;
					justify-content: center;
					height:120rpx;
					.activityvalue{
						width: 52rpx;
						height:90rpx;
						// background-color:yellow;
						margin-right:60rpx;
						background-size: 100% 100%;
						background-repeat: no-repeat;
						// margin-top:0rpx;
						transition: .1s;
						&:last-child{
							margin-right:0;
						}
						&:first-child{
							width: 72rpx;
							height:78rpx;
						}
					}
				}
			}
		}
	}
</style>
