<template>
	<view class="searchBox">
		<view class="photo" v-if="bool">
			<image :src="this.$store.state.imgyuming+user_pic" mode=""></image>
		</view>
		<view class="cu-bar search bg-white">
			<view class="search-form round" :class="showbtn?'':'search-radius'" @tap="InputFocus">
				<text class="cuIcon-search"></text>
				<input 
				:adjust-position="false" 
				type="text" 
				placeholder="搜索您想要的商品" 
				confirm-type="search"
				disabled="true"
				class="inp"
				placeholder-style="color:#fff"
			></input>
			</view>
			<view class="action" v-if="showbtn">
				<button class="cu-btn shadow-blur round">搜索</button>
			</view>
		</view>
		<view class="scan">
			<text class="lg text-gray cuIcon-scan" @tap="scanQRcode"></text>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return {
				user_pic:'',
				bool:false
			}
		},
		methods:{
			InputFocus() {
				uni.navigateTo({
					url:"/pages/SearchTo/SearchTo"
				})
			},
			scanQRcode(){
				uni.scanCode({
					onlyFromCamera:false,
					scanType:["qrCode"],
				    success: function (res) {
						// console.log(res)
				        // console.log('条码类型：' + res.scanType);
				        // console.log('条码内容：' + res.result);
						let arr = res.result.split("&")
						// console.log(arr[arr.length-1])
						if(arr[arr.length-1]=="type=1"){
							//这是注册的二维码
							// console.log(arr,"这是注册")
							let code = arr[0]
							uni.navigateTo({
								url:`/pages/Freeregistration/Freeregistration?code=${code}`
							})
						}else if(arr[arr.length-1]=="type=3"){
							//这是商品的二维码
							let arr1 = []
							 arr.forEach((item,index)=>{
								// console.log(item)
								// console.log(item.split("="))
								return arr1[index] = item.split("=")[1]
							})
							if(arr1.length>0){
								// console.log(arr1)
								uni.navigateTo({
									url:`/pages/Details/Details?id=${arr1[0]}&storeid=${arr1[1]}&code=${arr1[2]}&type=${parseInt(arr1[3])}`
								})
							}
						}
				    },
					fail(err){
						// console.log(err)
					},
				});
			}
		},
		props:["showbtn"],
		created() {
			const _this = this
			uni.getStorage({
				key: 'bindtokey',
				success(res) {
					uni.request({
						url:`${app.globalData.Requestpath}user/getUserDetail`,
						method:"POST",
						data:{
							token:res.data
						},
						success(res) {
							if(res.data.code == 0){
								let {user_sid} = res.data.data
								_this.code = res.data.data.code
								_this.user_pic = res.data.data.user_pic
								_this.bool = true
								//将店铺id保存到缓存中判断用户是不是这个店铺的
								uni.setStorage({
									key:"userstoreid",
									data:user_sid
								})
							}
							
						}
					})
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.searchBox{
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		.photo{
			image{
				margin-top: 20rpx;
				border-radius:50% ;
				overflow: hidden;
				height: 60rpx;
				width: 60rpx;
			}
		}
		.search{
			// background-color:#FF0000;
			background-color:transparent;
			// width: 75%;
			// margin: 0 auto !important;
			// padding:0 40rpx;
			
			.search-form{
				background-color:rgba(255,255,255,.5);
				margin: 0;
				border-radius: 40rpx 0  0 40rpx;
			}
			.search-radius{
				opacity:1;
				border-radius: 40rpx;
			}
			.cu-btn{
				border-radius: 0 40rpx 40rpx 0;
				background-color: #fffof4;
			}
			
			.cu-bar .search-form+.action{
				margin-right: 0 !important;
			}
			.cu-bar .action:last-child{
				margin-right: 0 !important;
			}
			.inp{
				color:#fff;
			}
		}
		.scan{
			line-height: 100rpx;
			height: 100rpx;
			text{
				font-size: 60rpx;
				color: #FFFFFF;
			}
		}
	}
	
	.cuIcon-search{
	    color: #f8f8f8;
	}
	.cu-bar .search-form+.action{
		margin: 0 !important;
	}
	.cu-bar .search-form+.action {
	    margin: 0 !important;
	}
</style>
