<template>
	<view class="SetChangeResetpassword">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbarwei></actionbarwei>
		<view class="shezhiandchangpasswordd">
			<form @submit="zhifubind">
				<view class="item" v-for="(item,index) in list" :key="index" v-if="showindex==index">
					<view class="cu-form-group margin-top">
						<view class="title">{{item.titlename}}</view>
						<input :placeholder="item.titleplaceholder" :name="item.namelogin" type="password"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">{{item.zhifupassword}}</view>
						<input :placeholder="item.zhifuplaceholder" :name="item.namezjifu" type="password"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">{{item.affirmpassword}}</view>
						<input :placeholder="item.zhifuplaceholderA" :name="item.nameaffirm" type="password"></input>
					</view>
				</view>
				<button class="cu-btn bg-green shadow margin-top" form-type="submit" :style="{'width':'100%'}">确认设置</button>
				<button 
					class="cu-btn bg-red shadow margin-top" 
					:style="{'width':'100%'}" v-if="showindex==1" 
					@tap="changepassword"
					data-target="DrawerModalL"
					>
						重置密码
					</button>
					<view 
						class="cu-modal drawer-modal justify-start" 
						:class="modalName=='DrawerModalL'?'show':''" 
						@tap="hideModal"
						:style="{'padding-top':statusBar+'rpx'}"
					>
						<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
							<view class="cu-list menu text-left">
								<form @submit="changeform">
								<!-- 这是手机号 -->
									<view class="cu-form-group">
										<view class="title">手机号码</view>
										<input :value="phonestring" name="phone" disabled="true"></input>
									</view>
									<!-- 这是验证码 -->
									<view class="cu-form-group">
										<view class="title">验证码</view>
										<input placeholder="请输入验证码" v-model="codevalue" name="code"></input>
										<button class='cu-btn bg-green shadow' :disabled="disabled" @tap="leftcode">{{countdowntext}}</button>
									</view>
									<!-- 这是身份证 -->
									<view class="cu-form-group margin-top" v-for="(item,index) in changelist" :key="index">
										<view class="title">{{item.title}}</view>
										<input 
											:placeholder="item.titleplaceholder" 
											:name="item.name"
											:type="item.inp_type"
										></input>
									</view>
									<button class="cu-btn bg-green shadow margin-top" form-type="submit" :style="{'width':'100%'}">确定重置</button>
								</form>
							</view>
						</view>
					</view>
			</form>
		</view>
	</view>
</template>

<script>
	import actionbarwei from "@/components/actionbar/actionbarwei.vue"
	const app = getApp()
	export default{
		data(){
			return {
				CustomBar: this.CustomBar,
				statusBar:0,
				showindex:"",
				tokey:"",
				modalName:null,
				disabled:false,
				codetext:"验证码",
				phonestring:"",
				phonetext:"",
				codevalue:"",
				id:"",
				business:"",
				countdowntext:"验证码",
				wait:60,
				list:[
						{
							titlename:"用户登录密码",
							titleplaceholder:"请输入登录密码",
							namelogin:"loginpassword",
							zhifupassword:"支付密码",
							affirmpassword:"确认支付密码",
							zhifuplaceholder:"请设置您的支付密码",
							namezjifu:"zhifupassword",
							nameaffirm:"zhifupasswords"
						},
						{
							titlename:"原支付密码",
							titleplaceholder:"请输入您的原支付密码",
							namelogin:"oldpassword",
							zhifupassword:"新支付密码",
							affirmpassword:"确认新支付密码",
							zhifuplaceholder:"请输入您的新支付密码",
							namezjifu:"newspassword",
							nameaffirm:"newspasswords",
							zhifuplaceholderA:"请确认您的新支付密码",
						},
					],
				changelist:[
					{
						title:"身份证号",
						titleplaceholder:"请输入身份证号",
						name:"idcard",
						inp_type:"text"
					},
					{
						title:"登录密码",
						titleplaceholder:"请输入登录密码",
						name:"loginpassword",
						inp_type:"password"
					},
					{
						"title":"支付密码",
						titleplaceholder:"请设置新支付密码",
						name:"newpaypassword",
						inp_type:"password"
					}
				],
				Realnamebool:true,//重置密码的时候 是否实名
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
							countdowntext = "重新获取"
							clearInterval(this.times)
							this.countdowntext = countdowntext
							this.wait = 60
						}
						
					},1000)
			},

			//隐藏弹窗
			hideModal(e) {
				this.modalName = null
			},
			//当用户设置或修改的时候
			zhifubind(e){
				const _this = this
				let regnewspassword = /^\d{6,6}$/;
				if(parseInt(this.showindex)){//这是1的时候就修改密码
					let {oldpassword,newspassword,newspasswords} = e.detail.value
					if(oldpassword!=="" && newspassword!==""){
						if(regnewspassword.test(newspassword)){
							if(newspassword == newspasswords){
								uni.request({
									url:`${app.globalData.Requestpath}user/editPayPassword`,
									method:"POST",
									data:{
										token:this.tokey,
										old_pay_password:oldpassword,
										new_pay_password:newspassword,
										isAllow:0
									},
									success:(res)=>{
										if(res.data.code==0){
											app.globalData.showtoastsame("修改成功")
											uni.navigateTo({
												url:"/components/setcenter/setcenter?title=userset&titlename=设置"
											})
										}else{
											app.globalData.showtoastsame(res.data.msg)
										}
									}
								})
							}else{
								app.globalData.showtoastsame("两次密码输入不一致")
							}
							
						}else{
							app.globalData.showtoastsame("密码请设置数字6位数")
						}
					}else{
						app.globalData.showtoastsame("请输入完整信息")
					}
				}else{//否则就是0 设置密码 用户一上来会走这个 设置成功会走上面的if
					let {loginpassword,zhifupassword} = e.detail.value
					if(loginpassword!=="" && zhifupassword!==""){
						if(regnewspassword.test(zhifupassword)){
							uni.request({
								url:`${app.globalData.Requestpath}user/savePayPassword`,
								method:"POST",
								data:{
									token:this.tokey,
									user_password:loginpassword,
									new_pay_password:zhifupassword,
									isAllow:0
								},
								success:(res)=>{
									if(res.data.code==0){
										app.globalData.showtoastsame("设置成功")
										if(_this.business=="pay"){
											uni.showModal({
												title:"是否回到之前的订单",
												content:"点击确认回到之前订单",
												showCancel:true,
												cancelColor:"#ff0000",
												confirmColor:"#green",
												success(res) {
													uni.navigateBack({
													    delta: 2
													});
												}
											})
										}else{
											uni.reLaunch({
												url:"/components/setcenter/setcenter?title=userset&titlename=设置"
											})
										}
									}else{
										app.globalData.showtoastsame("登录密码错误或不能和登录密码一致")
									}
								}
							})
						}else{
							app.globalData.showtoastsame("密码请设置6位数")
						}
					}else{
						app.globalData.showtoastsame("请输入完整信息")
					}
				}
			},
			changepassword(e){
				if(this.Realnamebool){
					let arr = []
					let arr1 = []
					for(let i=0;i<this.phonetext.length;i++){
						if(i<3){
							arr.push(this.phonetext[i])
						}
						if(i>this.phonetext.length-5){
							arr1.push(this.phonetext[i])
						}
					}
					this.phonestring = `${[...arr]}****${[...arr1]}`
					this.modalName = e.currentTarget.dataset.target
				}else{
					app.globalData.showtoastsame("请返回设置中心进行实名认证")
				}
			},
			//这是左侧弹窗短信验证码
			leftcode(){
					this.disabled = true
					this.codetext = "已发送"
					let json = {
						mobile:this.phonetext,
						type:3,
						userid:this.id
					}
					//一会在这调用发送短信的接口
					app.globalData.VerificationCode(json)
					this.time()
			},
			//这是左侧弹窗点击确定按钮
			changeform(e){
				let {code,idcard,loginpassword,newpaypassword} = e.detail.value
				//验证手机号
				let regphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
				//验证身份证
				let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				//验证密码
				let regnewspassword = /^\w{6,6}$/;
				if(code!=="" && idcard!=="" && loginpassword!=="" && newpaypassword!==""){
					this.disabled = false
					//130928200006117711
					if(idcardReg.test(idcard) && regnewspassword.test(newpaypassword)){
						uni.request({
							url:`${app.globalData.Requestpath}user/resetPayPassword`,
							method:"POST",
							data:{
								token:this.tokey,
								mobile:this.phonetext,
								code:code,
								idcard:idcard,
								login_password:loginpassword,
								new_pay_password:newpaypassword
							},
							success:(res)=>{
								if(res.data.code==0){
									app.globalData.showtoastsame("重置成功")
									this.hideModal()
									uni.navigateTo({
										url:"/components/setcenter/setcenter?title=userset&titlename=设置"
									})
								}else{
									app.globalData.showtoastsame(res.data.msg)
								}
							}
						})
					}
				}else{
					app.globalData.showtoastsame("请输入完整信息")
				}
			}
		},
		onLoad(opction){
			this.business = opction.business
			this.showindex = opction.index
			this.tokey = opction.tokey
			this.id=opction.id
			this.phonetext = opction.phone
			this.statusBar = app.globalData.statusBar
			if(opction.Realnamebool=='true'){
				this.Realnamebool = true
			}else{
				this.Realnamebool = false
			}
			
		},
		components:{
			actionbarwei,
		}
	}
</script>

<style lang="less" scoped>
	.SetChangeResetpassword{
		background-color: #F8F8F8;
		min-height: 100vh;
		.item{
			border: 1px solid rgba(0,0,0,0);
		}
	}
</style>
