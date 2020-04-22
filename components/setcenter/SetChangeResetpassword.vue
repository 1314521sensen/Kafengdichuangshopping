<template>
	<view class="SetChangeResetpassword">
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="shezhiandchangpasswordd">
			<form @submit="zhifubind">
				<view class="item" v-for="(item,index) in list" :key="index" v-if="showindex==index">
					<view class="cu-form-group margin-top">
						<view class="title">{{item.titlename}}</view>
						<input :placeholder="item.titleplaceholder" :name="item.namelogin"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">{{item.zhifupassword}}</view>
						<input :placeholder="item.zhifuplaceholder" :name="item.namezjifu"></input>
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
					<view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''" @tap="hideModal">
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
										<button class='cu-btn bg-green shadow' :disabled="disabled" @tap="leftcode">{{codetext}}</button>
									</view>
									<!-- 这是身份证 -->
									<view class="cu-form-group margin-top" v-for="(item,index) in changelist" :key="index">
										<view class="title">{{item.title}}</view>
										<input :placeholder="item.titleplaceholder" :name="item.name"></input>
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
				list:[
					{
						titlename:"用户登录密码",
						titleplaceholder:"请输入登录密码",
						namelogin:"loginpassword",
						zhifupassword:"支付密码",
						zhifuplaceholder:"请设置您的支付密码",
						namezjifu:"zhifupassword"
					},
					{
						titlename:"原支付密码",
						titleplaceholder:"请输入您的原支付密码",
						namelogin:"oldpassword",
						zhifupassword:"新支付密码",
						zhifuplaceholder:"请设置您的新支付密码",
						namezjifu:"newspassword"
					}
				],
				changelist:[
					{
						title:"身份证号",
						titleplaceholder:"请输入身份证号",
						name:"idcard"
					},
					{
						title:"登录密码",
						titleplaceholder:"请输入登录密码",
						name:"loginpassword"
					},
					{
						"title":"支付密码",
						titleplaceholder:"请设置新支付密码",
						name:"newpaypassword"
					}
				]
			}
		},
		methods:{
			//隐藏弹窗
			hideModal(e) {
				this.modalName = null
			},
			//当用户设置或修改的时候
			zhifubind(e){
				let regnewspassword = /^\w{6,6}$/;
				if(parseInt(this.showindex)){//这是1的时候就修改密码
					let {oldpassword,newspassword} = e.detail.value
					if(oldpassword!=="" && newspassword!==""){
						if(regnewspassword.test(newspassword)){
							uni.request({
								url:"http://hbk.huiboke.com/api/user/editPayPassword",
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
											url:"/components/setcenter/setcenter?title=设置"
										})
									}else{
										app.globalData.showtoastsame(res.data.msg)
									}
								}
							})
						}else{
							app.globalData.showtoastsame("密码请设置6位数")
						}
					}else{
						app.globalData.showtoastsame("请输入完整信息")
					}
				}else{//否则就是0 设置密码 用户一上来会走这个 设置成功会走上面的if
					let {loginpassword,zhifupassword} = e.detail.value
					if(loginpassword!=="" && zhifupassword!==""){
						if(regnewspassword.test(zhifupassword)){
							// console.log(this.tokey)
							uni.request({
								url:"http://hbk.huiboke.com/api/user/savePayPassword",
								method:"POST",
								data:{
									token:this.tokey,
									user_password:loginpassword,
									new_pay_password:zhifupassword,
									isAllow:0
								},
								success:(res)=>{
									console.log(res)
									if(res.data.code==0){
										app.globalData.showtoastsame("设置成功")
										uni.navigateTo({
											url:"/components/setcenter/setcenter?title=设置"
										})
									}else{
										app.globalData.showtoastsame("登录密码错误")
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
			},
			//这是左侧弹窗短信验证码
			leftcode(){
					this.disabled = true
					this.codetext = "已发送"
					let json = {
						token:this.tokey,
						type:3,
						userid:this.id
					}
					//一会在这调用发送短信的接口
					app.globalData.VerificationCode(json)
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
							url:"http://hbk.huiboke.com/api/user/resetPayPassword",
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
										url:"/components/setcenter/setcenter?title=设置"
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
			this.showindex = opction.index
			this.tokey = opction.tokey
			this.id=opction.id
			this.phonetext = opction.phone
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style>
</style>
