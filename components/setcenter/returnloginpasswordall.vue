<template>
	<view class="returenloginpasswordall">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="修改登录密码"  url="/pages/PersonalMy/PersonalMy" :Jumpchoose="false"></actionbar>
		<form @submit="confirmreturnlogin">
				<view class="item">
					<!-- 这是普通的 -->
					<view class="ordinaryreturnlogin" v-if="option=='radio0'">
						<view class="cu-form-group margin-top">
							<view class="title">旧密码</view>
							<input placeholder="请输入原密码" name="ordinaryoldpssword"></input>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">新密码</view>
							<input placeholder="请输入新密码" name="ordinaryonewspssword"></input>
						</view>
					</view>
					<!-- 下面是手机和邮箱的 -->
					<view class="ordinaryreturnlogin" v-for="(item,index) in list" :key="index" v-if="option==item.showname">
						<view class="cu-form-group margin-top">
							<view class="title">{{item.titlename}}</view>
							<input :placeholder="item.titlenameplaceholder" v-model="phonecode" :name="item.nametitlezhi"></input>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">{{item.titlesms}}</view>
							<input :placeholder="item.titlesmsplaceholder" :name="item.namesms"></input>
							<button class='cu-btn bg-green shadow' @tap="Verificationode" :disabled="disabled">{{countdowntext}}</button>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">{{item.titlenewpassword}}</view>
							<input :placeholder="item.titlenewpasswordplaceholder" :name="item.namenewspassword"></input>
						</view>
					</view>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow margin-top" form-type="submit" :style="{'width':'100%'}">确认修改</button>
				</view>
		</form>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp()
	export default{
		data(){
			return {
				statusBar:0,
				option:"",//这是控制用户点击了哪个传过来的
				tokey:"",
				disabled:false,
				codetext:"验证码",
				countdowntext:"获取验证码",//这是重新验证码的文字变量
				wait:60,//这是时间倒计时
				phonecode:"",
				id:"",
				list:[
					{
						titlename:"手机号",
						titlenameplaceholder:"请输入手机号",
						titlesms:"验证码",
						titlesmsplaceholder:"请输入短信验证码",
						titlenewpassword:"新密码",
						titlenewpasswordplaceholder:"请输入新密码",
						nametitlezhi:"phone",
						namesms:"phonesms",
						namenewspassword:"newsphonepsd",
						showname:"radio1"
					},
					{
						titlename:"邮箱",
						titlenameplaceholder:"请输入邮箱号",
						titlesms:"验证码",
						titlesmsplaceholder:"请输入邮箱验证码",
						titlenewpassword:"新密码",
						titlenewpasswordplaceholder:"请输入新密码",
						nametitlezhi:"email",
						namesms:"emailsms",
						namenewspassword:"newsemailpsd",
						showname:"radio2"
					}
				]
			}
		},
		methods:{
			time(){
				this.disabled = true
				//这块点击反复执行定时器
				// clearInterval(times)
				let {countdowntext,wait} = this.$data
				// console.log(countdowntext,wait)
					this.times = setInterval(()=>{
						wait--
						// console.log(wait)
						this.countdowntext = wait
						if(wait==0){
							this.disabled = false
							countdowntext = "重新获取验证码"
							clearInterval(this.times)
							this.countdowntext = countdowntext
							this.wait = 60
						}
					},1000)
			},

			//封装一个提示框的接口
			showToastkuang(message){
				uni.showToast({
					title:message,
					icon:"none"
				})
			},
			//封装一个获取不同的验证码
			Verificationode(){
				// console.log(this.phonecode)//这个是手机号或者邮箱通用
				let regphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
				let regemail =  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
				if(regphone.test(this.phonecode) || regemail.test(this.phonecode)){
					this.disabled = true
					this.codetext = "验证码已发送"
					if(this.option=='radio1'){
						let json = {
							mobile:this.phonecode,
							type:3,
							userid:this.id
						}
						app.globalData.VerificationCode(json)
						this.time()
					}else{
						let json = {
							email:this.phonecode,
							type:3,
							userid:this.id
						}
						app.globalData.emailreg(json)
						this.time()
					}
					
				}else{
					this.showToastkuang("请正确填写信息")
				}
				
			},
			confirmreturnlogin(e){
				// console.log(e)
				//普通的重置
				let {ordinaryoldpssword,ordinaryonewspssword} = e.detail.value
				//手机号的重置
				let {phone,phonesms,newsphonepsd} = e.detail.value
				//邮箱的重置
				let {email,emailsms,newsemailpsd} = e.detail.value
				// console.log(email,emailsms,newsemailpsd)
				//邮箱正则
				let regemail =  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
				//手机号正则
				let regphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
				//新密码的正则
				let regnewspassword = /^\w{6,16}$/;
				if(this.option=="radio0"){//当用户点击了普通登录
					if(ordinaryoldpssword!=="" && regnewspassword.test(ordinaryonewspssword)){
						// console.log(this.tokey)
						uni.request({
							url:`${app.globalData.Requestpath}user/editLoginPassword`,
							method:"POST",
							data:{
								token:this.tokey,
								old_password:ordinaryoldpssword,
								new_password:ordinaryonewspssword,
								isAllow:0
							},
							success:(res)=>{
								if(res.data.code==0){
									this.showToastkuang("密码修改成功")
									uni.navigateTo({
										url:"/components/setcenter/setcenter?title=userset&titlename=设置"
									})
								}else{
									this.showToastkuang("旧密码不能与新密码一致")
								}
							}
						})
					}else{
						this.showToastkuang("密码长度6-16位")
					}
				}else if(this.option=="radio1"){//当用户点击手机号登录
					//先验证用户输入的
					if(regphone.test(phone) && phonesms!=="" && regnewspassword.test(newsphonepsd)){
						this.disabled = false
						this.codetext = "验证码"
						uni.request({
							url:`${app.globalData.Requestpath}user/resetLoginPasswordByPhone`,
							method:"POST",
							data:{
								token:this.tokey,
								mobile:phone,
								code:phonesms,
								new_password:newsphonepsd
							},
							success:(res)=>{
								if(res.data.code==0){
									this.showToastkuang("密码修改成功")
									uni.navigateTo({
										url:"/components/setcenter/setcenter?title=userset&titlename=设置"
									})
								}
							}
						})
					}else{
						this.showToastkuang("请填写正确完整的信息")
					}
				}else{//当用户点击了邮箱登录
					//当用户输入完验证成功
					if(regemail.test(email) && emailsms!=="" && regnewspassword.test(newsemailpsd)){
						this.disabled = false
						this.codetext = "验证码"
						uni.request({
							url:`${app.globalData.Requestpath}user/resetLoginPasswordByEmail`,
							method:"POST",
							data:{
								token:this.tokey,
								email:email,
								code:emailsms,
								new_password:newsemailpsd
							},
							success:(res)=>{
								if(res.data.code==0){
									this.showToastkuang("密码修改成功")
									uni.navigateTo({
										url:"/components/setcenter/setcenter?title=userset&titlename=设置"
									})
								}
							}
						})
					}
				}
			},
		},
		onLoad(option){
			this.option = option.index
			this.tokey = option.tokey
			this.id = option.id
			// console.log(this.tokey)
			//这个是控制状态栏高度的
			this.statusBar = app.globalData.statusBar
		},
		components:{
			actionbar
		}
	}
</script>

<style lang="less" scoped>
	.returenloginpasswordall{
		background-color: #F8F8F8;
		min-height: 100vh;
	}
</style>
