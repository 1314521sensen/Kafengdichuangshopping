<template>
	<view class="setemail">
		<view class="item" v-for="(item,index) in list" :key="index">
			<view class="orders" @tap="bindingphoneAndemail(index)">
				<view class="orders-title-name">
					<text>{{item.title}}</text>
					<view class="mintext">
						<text>{{item.textright}}</text>
						<text class="lg text-gray cuIcon-right" ></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default{
		data(){
			return {
				statusBar:0,
				list:[
					{
						title:"绑定手机号或者邮箱",
						textright:"进行绑定",
					},
				]
			}
		},
		methods:{
			bindingphoneAndemail(index){
				//判断index = 多少 进行点击事件
				const _this = this
				let gengemail = "绑定邮箱"//根据状态来操作
				if(index==0){//证明用户点击的是第几个
					uni.getStorage({
						key:"userbindstate",
						success:(resuserbindstate)=>{//如果取出了值  判断用户有没有绑定手机号邮箱
							console.log(resuserbindstate,"这是取值")
							if(resuserbindstate.data==1){//如果 用户绑定手机号的状态码 为1的话 证明用户已经绑定了 不用再弹出来
								gengemail = "更换邮箱"
								_this.list[0].textright = gengemail
								_this.showphoneandemailstate(gengemail)
							}else{//否则 就代表用户还未绑定 就弹出绑定的手机或邮箱的框
								gengemail = "绑定邮箱"
								_this.list[0].textright = gengemail
								_this.showphoneandemailstate(gengemail)
							}
						},
						fail:(err)=>{//如果没取出来 证明用户还未绑定 就弹出用户绑定的框
							console.log(err)
							gengemail = "绑定邮箱"
							_this.showphoneandemailstate(gengemail)
						}
					})
				}
			},
			//这是用户绑定手机号邮箱的提示框
			showphoneandemailstate(gengemail){//gengemail根据上面传下来的状态来操作
						uni.showModal({
							title:"请绑定或更换邮箱账户",
							content:"如果没有绑定邮箱请绑定邮箱",
							showCancel:false,
							confirmText:gengemail,
							// cancelColor:"#ff0000",
							confirmColor:"#ff0000",
							success(res){
								
								if(gengemail=="绑定邮箱"){//如果为true的话就是邮箱绑定
									uni.navigateTo({
										url:`/components/indexcomponents/indexbindinfo?bind=${0}`
									})
								}else{//否则就邮箱更换
									uni.navigateTo({
										url:`/components/indexcomponents/indexbindinfo?bind=${1}`
									})
								}
							}
						})
					},
		},
		onLoad() {
		},
		created() {
			
		}
	}
</script>

<style lang="less" scoped>
	.orders{
		background-color: #fff;
		// padding-bottom:30rpx;
		margin-top:10rpx;
		.orders-title-name{
		// width: ;
			display: flex;
			justify-content: space-between;
			line-height: 80rpx;
			padding:0 20rpx;
			// background-color:yellow;
				text{
					font-size: 30rpx;
					font-weight: bold;
				}
				.mintext{
					display: flex;
					color:#999;
					text{
						font-size: 25rpx;
						font-weight: normal;
					}
				}
		}
	}
		
</style>
