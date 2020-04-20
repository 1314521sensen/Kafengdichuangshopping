<template>
		<view class="binding">
			<pageheight :statusBar="statusBar"></pageheight>
			<view class="item" v-for="(item,index) in list[xiabiao]" :key="index">
				<form @submit="bindlogin">
				<view class="cu-bar bg-white margin-top">
					<view class="action">
						{{item.title}}
					</view>
					<view class="action">
						<text>{{item.showtext}}</text>
						<button class="cu-btn bg-green shadow" @tap="showModal" :data-target="item.indextarget">点击绑定</button>
					</view>
				</view>
				<view class="cu-modal" :class="modalName==item.indextarget?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">{{item.Modaltitle}}</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl inp">
							<!-- 第一个input是处理用户手机号的 -->
							<input type="text" :placeholder="item.Modaltext1" v-model="item.value" name="account" v-if="xiabiao!==0"></input>
							<input type="text" :placeholder="item.Modaltext2" name="sms"></input>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action btn">
								<button class="cu-btn line-green text-green" form-type="submit">确定</button>
								<button class="cu-btn line-green text-red" @tap="smsreg(item.value,index)" :disabled="disabled">{{item.righttext}}</button>
							</view>
						</view>
					</view>
				</view>
				</form>
			</view>
		</view>
</template>

<script>
	const app = getApp();
	export default{
		data(){
			return {
				modalName: null,
				xiabiao:0,
				regbool:"",
				id:"",
				tokey:"",
				disabled:false,
				list:[
						[
							{
								title:"邮箱号绑定",
								indextarget:"DialogModal1",
								Modaltitle:"请绑定邮箱号",
								Modaltext1:"请输入邮箱号",
								showtext:"",
								Modaltext2:"请输入验证码",
								righttext:"获取邮箱验证码",
								value:"",
							}
						],
						[
							{
								title:"更换邮箱绑定",
								indextarget:"DialogModal2",
								Modaltitle:"请绑定新邮箱",
								Modaltext1:"请输入新邮箱号",
								showtext:"",
								Modaltext2:"请输入验证码",
								righttext:"获取新邮箱验证码",
								value:""
							}
						]
					
				]
			}
		},
		methods:{
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			//弹窗功能
			showtext(message){
				uni.showToast({
					title:message,
					icon:"none"
				})
			},
			//封装一个验证邮箱和新邮箱的
			regsms(smsregs){
				var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
				if(this.xiabiao==0){//验证邮箱
					// console.log("执行下标0")
					if(smsregs!==""){ //如果邮箱号为空的话
						if(reg.test(smsregs)){
							this.regbool = true
						}else{//如果验证不正确就让 list[0][0].value = smsregs刚才输入的值 引入后面的弹窗被挡住了只能这样 要不然让用户重新输入 用户会很烦
							this.list[0][0].value = smsregs
							this.hideModal()//然后进行关闭
							//关闭以后提示用户
							this.showtext("请输入正确的邮箱号")
							this.regbool = false
						}
					}else{
						this.hideModal()
						this.showtext("请输入邮箱号")
						return 
					}
				}else{//下标等于2  验证新邮箱号
					console.log("执行下标2")
					if(smsregs!==""){
						if(reg.test(smsregs)){
							this.regbool = true
						}else{
							this.list[0][0].value = smsregs
							this.hideModal()//然后进行关闭
							//关闭以后提示用户
							this.showtext("请输入正确的邮箱号")
							this.regbool = false
						}
					}
				}
			},
			//这是验证码
			smsreg(smsregs,index){
				this.regsms(smsregs)
				this.disabled = true
				if(this.regbool){//验证全部通过就向用户发送验证码 //http://hbk.huiboke.com/api/common/getEmailCaptcha
				console.log(this.id)
					let json = {
							email:smsregs,
							type:5,
							userid:this.id
						}
					app.globalData.emailreg(json)
					this.list[0][0].righttext = "验证码已发送"
				}
			},
			bindlogin(e){
				let {account,sms} = e.detail.value
				this.regsms(account)
				this.disabled = false
				if(sms!==""){//验证码不为空就发起请求绑定
					//http://hbk.huiboke.com/api/user/bindNewEmail
					// console.log(this.tokey )
					
					uni.request({
						url:"http://hbk.huiboke.com/api/user/bindNewEmail",
						method:"POST",
						data:{
							token:this.tokey,
							email:account,
							sms:sms
						},
						success(res) {
							console.log(account,sms)
							console.log(res)
							if(res.data.code==0){//表示已经绑定成功了
								//就把缓存中的值改了 下次进来的是用户更改邮箱
								uni.setStorage({
									key:"userbindstate",
									data:1
								})
								this.hideModal()
							}
						},
						fail(err){
							console.log(err)
						}
					})
				}else{
					this.showtext("验证码不能为空")
					this.hideModal()
				}
			}
		},
		onLoad(option) {
			this.xiabiao = option.bind
			console.log(this.xiabiao)
			//这个来控制高度的
			this.statusBar = app.globalData.statusBar
		},
		created(){
			//先取出tokey
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					_this.tokey = res.data
					//开始加载的时候获取用户手机号或者邮箱
						// uni.request({
						// 	url:"http://hbk.huiboke.com/api/user/getUserBindInfo",
						// 	method:"POST",
						// 	data:{
						// 		token:res.data
						// 	},
						// 	success(resinfo) {
						// 		console.log(resinfo)
						// 	}
						// })
					}
			})
			//获取用户的信息先获取tokey
			uni.getStorage({
				key:"bindtokey",
				success(res){
					// console.log(res.data)//取出tokey
					uni.request({
						url:"http://hbk.huiboke.com/api/user/getUserDetail",
						method:"POST",
						data:{
							token:res.data
						},
						success(resid){
							console.log(resid.data.data.user_id)
							//把id值设置在缓存中
							uni.setStorage({
								key:"useremailid",
								data:resid.data.data.user_id,
								success(){
									_this.id = resid.data.data.user_id
								}
							})
						}
					})
				}
			})			
		}
	}
</script>

<style lang="less" scoped>
	.inp{
		input{
			margin-bottom:20rpx;
			&:last-child{
				margin-bottom:0;
			}
		}
	}
	.btn{
		width: 100%;
		justify-content: space-between;
	}
</style>
