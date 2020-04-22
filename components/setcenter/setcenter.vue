<template>
	<view class="setcenter">
		<pageheight :statusBar="statusBar"></pageheight>
		<setemail></setemail>
		<setphone :userphone="userphone" :userid="userid" :tokey="tokey"></setphone>
		<Realnameauthentication v-if="Realnamebool==false" :tokey="tokey"></Realnameauthentication>
		<Resetloginpassword :userphone="userphone" :useremail="useremail" :tokey="tokey" :userid="userid"></Resetloginpassword>
	</view>
</template>

<script>
	const app = getApp();
	//设置邮箱
	import setemail from "@/components/setcenter/setemail.vue"
	//更换手机
	import setphone from "@/components/setcenter/setphone.vue"
	//设置实名
	import Realnameauthentication from "@/components/setcenter/Realnameauthentication.vue"
	//修改登录密码
	import Resetloginpassword from "@/components/setcenter/Resetloginpassword.vue"
	export default{
		data(){
			return {
				tokey:"",
				statusBar:0,
				userphone:"",
				userid:"",
				Realnamebool:true,//判断用户实名的状态
				useremail:""
			}
		},
		components:{
			setemail,
			setphone,
			Realnameauthentication,
			Resetloginpassword
		},
		onLoad(){
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
						url:'http://hbk.huiboke.com/api/user/getUserDetail',
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
						url:"http://hbk.huiboke.com/api/user/getUserBindInfo",
						method:"POST",
						data:{
							token:_this.tokey
						},
						success(resinfophoneAndemail){
							_this.userphone = resinfophoneAndemail.data.data.user_phone
							// console.log(resinfophoneAndemail)
							_this.useremail = resinfophoneAndemail.data.data.user_email
						}
					})
					//获取用户的实名认证
					uni.request({
						url:"http://hbk.huiboke.com/api/user/getRealNameAuthentication",
						method:"POST",
						data:{
							token:_this.tokey
						},
						success(resRealname) {
							console.log("时刻提示自己tokey为过期可以进行编写")
							if(resRealname.data.code==0){
								if(resRealname.data.data.idcard==null){//如果为null证明用户还未实名 
									_this.Realnamebool = false
								}else{
									_this.Realnamebool = true
								}
							}
						}
					})
				},
				fail(err){
					
				}
			})
		}
	}
</script>

<style lang="less">
	
</style>
