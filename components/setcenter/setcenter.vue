<template>
	<view class="setcenter">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="设置中心" :Jumpchoose="false" url="/pages/PersonalMy/PersonalMy"></actionbar>
		<setemail></setemail>
		<setphone :userphone="userphone" :userid="userid" :tokey="tokey"></setphone>
		<Realnameauthentication v-if="Realnamebool==false" :tokey="tokey"></Realnameauthentication>
		<Resetloginpassword :userphone="userphone" :useremail="useremail" :tokey="tokey" :userid="userid"></Resetloginpassword>
		<Setpaymentpassword :tokey="tokey" :userphone="userphone" :userid="userid" :business="business" :Realnamebool="Realnamebool"></Setpaymentpassword>
		<anchorapplication  v-if="this.$store.state.verifyStatus !== 2"></anchorapplication>
		<!-- #ifdef APP-PLUS -->
			<WeChatLanding v-if="wxopenidbool"></WeChatLanding>
		<!-- #endif -->
		<openlive  v-if="this.$store.state.verifyStatus == 2"></openlive>
		<Entrancelivecommodities v-if="this.$store.state.verifyStatus == 2"></Entrancelivecommodities>
		<sharecode></sharecode>
	</view>
</template>

<script>
	const app = getApp();
	//引入导航
	import actionbar from "@/components/actionbar/actionbar.vue"
	//设置邮箱
	import setemail from "@/components/setcenter/setemail.vue"
	//更换手机
	import setphone from "@/components/setcenter/setphone.vue"
	//设置实名
	import Realnameauthentication from "@/components/setcenter/Realnameauthentication.vue"
	//修改登录密码
	import Resetloginpassword from "@/components/setcenter/Resetloginpassword.vue"
	//设置支付密码
	import Setpaymentpassword from "@/components/setcenter/Setpaymentpassword.vue"
	//引入开通直播的组件
	import  anchorapplication from "@/components/setcenter/anchorapplication.vue"
	//引入微信绑定
	import WeChatLanding from "@/components/setcenter/WeChatLanding.vue"
	import openlive from "@/components/setcenter/openlive.vue"
	//引入直播带货商品
	import Entrancelivecommodities from "@/components/setcenter/Entrancelivecommodities.vue"
	//引入用户的code码分享
	import sharecode from "@/components/setcenter/sharecode.vue"
	export default{
		data(){
			return {
				tokey:"",
				statusBar:0,
				userphone:"",
				userid:"",
				Realnamebool:true,//判断用户实名的状态
				useremail:"",
				setzhifumimabool:"",
				business:"",
				wxopenidbool:"",//判断用户有没有绑定微信openid
				code:0,//用户的code码
			}
		},
		components:{
			setemail,
			setphone,
			Realnameauthentication,
			Resetloginpassword,
			Setpaymentpassword,
			anchorapplication,
			WeChatLanding,
			openlive,
			Entrancelivecommodities,
			sharecode,
			actionbar
		},
		onLoad(opction){
			//用来检测是否订单那个页面跳转过来的
			this.business = opction.business
			this.statusBar = app.globalData.statusBar
			
		},
		created(){
			
			const _this = this
			
			uni.getStorage({
				key:"bindtokey",
				success(res){
					//res.data获取到用户的tokey
					_this.tokey = res.data
					
					//获取用户的id
					uni.request({
						url:`${app.globalData.Requestpath}user/getUserDetail`,
						method:"POST",
						data:{
							token:_this.tokey
						},
						success(resinfo) {
							_this.userid = resinfo.data.data.user_id
						}
					})
					//获取用户的绑定的邮箱和手机信息
					uni.request({
						url:`${app.globalData.Requestpath}user/getUserBindInfo`,
						method:"POST",
						data:{
							token:_this.tokey
						},
						success(resinfophoneAndemail){
							// console.log(resinfophoneAndemail)
							_this.userphone = resinfophoneAndemail.data.data.user_phone
							_this.useremail = resinfophoneAndemail.data.data.user_email
						}
					})
					//获取用户的实名认证
					uni.request({
						url:`${app.globalData.Requestpath}user/getRealNameAuthentication`,
						method:"POST",
						data:{
							token:_this.tokey
						},
						success(resRealname) {
							// console.log(resRealname)
							if(resRealname.data.code==0){
								if(resRealname.data.data.idcard==null){//如果为null证明用户还未实名 
									_this.Realnamebool = false
								}else{
									_this.Realnamebool = true
								}
							}
							app.globalData.Requestmethod(resRealname.data.code,resRealname.data.msg)
						},
					})
					//这是获取主播的
					uni.request({
						url: `${app.globalData.Requestpath}live_user/getLiveUserInfo`,
						method:"POST",
						data: {
							token:res.data
						},
						success(res) {
							if(res.data.code == 0){
								_this.$store.state.verifyStatus = res.data.data.verify_status
							}else{
								_this.$store.state.verifyStatus = 0
							}
						}
					})
				},
				fail(err){
					
				}
			})
			
			//取出微信绑定openid如果绑定了  就不让其显示 否则就显示bindopenid
			// #ifdef APP-PLUS
				uni.getStorage({
					key:"bindopenid",
					success(resopen){
						// console.log(resopen)
						_this.wxopenidbool = false
					},
					fail(err){
						// console.log(err)
						_this.wxopenidbool = true
					}
				})
			// #endif
			//将用户的分享的code码取出来
			uni.getStorage({
				key:"share_code",
				success(res){
					_this.code = res.data
				}
			})
		}
	}
</script>

<style lang="less">
	.setcenter{
		background-color: #f8f8f8;
		min-height: 100vh;
	}
</style>
