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
						<button class="cu-btn bg-green shadow" @tap="showModal" :data-target="item.indextarget">{{bindbtn}}</button>
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
							<input type="text" :placeholder="item.Modaltext1" v-model="item.value" name="account" v-if="xiabiao!==0" :disabled="inpvalue1bool"></input>
							<input type="text" :placeholder="item.Modaltext2" name="sms"></input>
							<view class="newsemail" :style="{'display':stylebool}">
								<input type="text" :placeholder="item.Modaltext3" v-model="item.value2" name="newsaccount"></input>
								<input type="text" :placeholder="item.Modaltext4" name="newssms"></input>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action btn">
								<button class="cu-btn line-green text-green" form-type="submit">{{submmit}}</button>
								<button 
									class="cu-btn line-green text-red"
									@tap="smsreg(item.value,xiabiao)" 
									:disabled="disabled" 
									:style="{'display':styleregbool}"
								>{{item.righttext}}</button>
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
				bindbtn:"点击绑定",
				inpvalue1bool:false,
				stylebool:'none',
				styleregbool:'block',
				submmit:"确定",
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
								Modaltitle:"请验证原邮箱",
								Modaltext1:"请输入原邮箱号",
								Modaltext3:"请输入新邮箱",
								showtext:"",
								Modaltext2:"请输入验证码",
								Modaltext4:"请输入验证码",
								righttext:"获取邮箱验证码",
								value:"",
								value2:""
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
							this.disabled = true
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
						this.disabled = false
						return 
					}
				}else{//下标等于2  验证新邮箱号
					// console.log("执行下标2")
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
			//封装一个绑定邮箱和更换邮箱的功能
			bindNewEmail(tokey,account,sms){
				// console.log(tokey)
				uni.request({
					url:`${app.globalData.Requestpath}user/bindNewEmail`,
					method:"POST",
					data:{
						token:tokey,
						email:account,
						code:sms
					},
					success:(res)=> {
						// console.log(account,sms)
						// console.log(res)
						if(res.data.code==0){//表示已经绑定成功了
							//就把缓存中的值改了 下次进来的是用户更改邮箱
							uni.setStorage({
								key:"userbindstate",
								data:1
							})
							this.hideModal()
							uni.navigateBack()
						}else{
							app.globalData.showtoastsame(res.data.msg)
						}
					},
					fail(err){
						// console.log(err)
					}
				})
			},
			//这是验证码
			smsreg(smsregs){
				// console.log(smsregs)
				this.regsms(smsregs)
				// this.disabled = true
				if(this.regbool){//验证全部通过就向用户发送验证码 
				// console.log(this.id)
					//这里不管是下标0还是下1都要这行
					let json = {
							email:smsregs,
							type:5,
							userid:this.id
						}
						//一会解开 发送验证码的
					app.globalData.emailreg(json)
					// console.log()
					this.list[this.xiabiao][0].righttext = "验证码已发送"
					// console.log(this.list)
				}
			},
			bindlogin(e){
				// console.log("确定更改")
				// console.log(e)
				let {account,sms} = e.detail.value
				this.regsms(account)
				this.disabled = false
				// console.log(this.xiabiao)
				if(sms!==""){//验证码不为空就发起请求绑定
					// console.log(this.tokey )
					if(this.xiabiao==1){
						//这是验证原邮箱
						uni.request({
							url:`${app.globalData.Requestpath}user/validateOldEmail`,
							method:"POST",
							data:{
								token:this.tokey,
								email:account,
								code:sms
							},
							success:(res)=> {
								// console.log(res)
								if(res.data.code==0){
									//这是控制绑定新邮箱的input出不出来
									this.stylebool = "block"
									this.list[1][0].Modaltitle = "请绑定新邮箱"
									this.submmit = "获取新邮箱验证码"
									this.styleregbool = 'none'
									let {newsaccount,newssms} = e.detail.value
									var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
									if(reg.test(newsaccount)){
										// console.log(newsaccount,newssms)
										// console.log("该邮箱已被验证")
										
										this.disabled = false
										this.smsreg(newsaccount)
										this.submmit = "确定"
										if(newssms!==""){
											this.bindNewEmail(this.tokey,newsaccount,newssms)
										}else{
											// this.showtext("验证码不能为空")
										}
										
									}else{
										// this.showtext("邮箱不能为空")
									}
								}else{
									this.styleregbool = 'block'
									this.submmit = "确定"
									app.globalData.showtoastsame(res.data.msg)
								}
							}
						})
					}else{
						//在这里请求
						this.bindNewEmail(this.tokey,account,sms)
					}
					 
				}else{
					// this.showtext("验证码不能为空")
					this.hideModal()
				}
			}
		},
		onLoad(option) {
			this.xiabiao = option.bind
			// console.log(this.xiabiao)
			//这个来控制高度的
			this.statusBar = app.globalData.statusBar
		},
		created(){
			//先取出tokey
			const _this = this
			//现获取tokey以后获取用户绑定的信息
			uni.getStorage({
				key:"bindtokey",
				success(res){
					_this.tokey = res.data
					//开始加载的时候获取用户手机号或者邮箱
						uni.request({
							url:`${app.globalData.Requestpath}user/getUserBindInfo`,
							method:"POST",
							data:{
								token:res.data
							},
							success(resinfo) {
								// console.log(resinfo.data.data.user_email)
								//如果邮箱有值的情况下  就让第一个数组里面的值 直接赋值 让用户无法点击
								if(resinfo.data.data.user_email){
									_this.bindbtn = "更换邮箱"
									_this.list[1][0].value = resinfo.data.data.user_email
									_this.inpvalue1bool = true
								}else{
									_this.bindbtn = "绑定邮箱"
									_this.list[1][0].value = ""
									_this.inpvalue1bool = false
								}
							}
						})
					}
			})
			//获取用户的信息先获取tokey
			uni.getStorage({
				key:"bindtokey",
				success(res){
					// console.log(res.data)//取出tokey
					uni.request({
						url:`${app.globalData.Requestpath}user/getUserDetail`,
						method:"POST",
						data:{
							token:res.data
						},
						success(resid){
							// console.log(resid.data.data.user_id)
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
	.binding{
		background-color: #F8F8F8;
		min-height: 100vh;
		border: 2rpx solid rgba(0,0,0,0);
	}
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
	.cu-btn{
		line-height:2;
	}
</style>
