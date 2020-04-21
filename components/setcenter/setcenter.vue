<template>
	<view class="setcenter">
		<pageheight :statusBar="statusBar"></pageheight>
		<setemail></setemail>
		<setphone :userphone="userphone" :userid="userid" :tokey="tokey"></setphone>
	</view>
</template>

<script>
	const app = getApp();
	import setemail from "@/components/setcenter/setemail.vue"
	import setphone from "@/components/setcenter/setphone.vue"
	export default{
		data(){
			return {
				tokey:"",
				statusBar:0,
				userphone:"",
				userid:""
			}
		},
		components:{
			setemail:setemail,
			setphone:setphone
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
					
					uni.request({
						url:"http://hbk.huiboke.com/api/user/getUserBindInfo",
						method:"POST",
						data:{
							token:_this.tokey
						},
						success(resinfophoneAndemail){
							// console.log(,)
							_this.userphone = resinfophoneAndemail.data.data.user_phone
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
