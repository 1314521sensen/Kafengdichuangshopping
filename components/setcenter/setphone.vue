<template>
	<view class="setphone">
		<view class="item">
			<view class="orders">
				<view class="orders-title-name">
					<text>更换手机号</text>
					<view class="mintext"  @tap="showModal" data-target="setphonetan">
						<text>进行更换</text>
						<text class="lg text-gray cuIcon-right" ></text>
					</view>
				</view>
				<form @submit="setregphone">
					<view class="cu-modal" :class="modalName=='setphonetan'?'show':''">
						<view class="cu-dialog">
							<view class="cu-bar bg-white justify-end">
								<view class="content">{{tantitle}}</view>
								<view class="action" @tap="hideModal">
									<text class="cuIcon-close text-red"></text>
								</view>
							</view>
							<view class="padding-xl inp">
								<input type="text" placeholder="请输入原手机验证码" name="sms"></input>
								<view class="newsemail" :style="{'display':inpstylebool}">
									<input type="text" :placeholder="placeholdernewsphone" v-model="value"  name="newsaccount"></input>
									<input type="text" :placeholder="placeholdernewssms" v-model="value2" name="newssms"></input>
								</view>
							</view>
							<view class="cu-bar bg-white justify-end">
								<view class="action btn">
									<button class="cu-btn line-green text-green" form-type="submit">{{submitbtn}}</button>
									<button class="cu-btn line-green text-red" @tap="smsreg" :style="{'display':phoneregstyle}" :disabled="disabled">{{countdowntext}}</button>
								</view>
							</view>
						</view>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return {
				modalName: null,
				inpstylebool:'none',
				originalphonetext:"",
				tantitle:"目前",
				phoneregstyle:'block',
				smsinput:'block',
				submitbtn:"确定",
				placeholdernewsphone:"请输入新的手机号",
				placeholdernewssms:"请输入新手机验证码",
				value:"",
				value2:"",
				countdowntext:"获取验证码",
                wait:60,
               	disabled:false
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
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				let arr = []
				let arr1 = []
				//更改标题
				for(let i = 0; i<this.userphone.length;i++){
					if(i<3){
						arr.push(this.userphone[i])
					}
					if(i>this.userphone.length-5){
						arr1.push(this.userphone[i])
					}
				}
				let str = ""
				let str1 = ""
				arr.forEach((item,index)=>{
					str += item
				})
				arr1.forEach((item,index)=>{
					str1+=item
				})
				this.tantitle = `目前${str}****${str1}`
			},
			hideModal(e) {
				this.modalName = null
			},
			//封装一个提示框的消息
			tantoast(message){
				uni.showToast({
					title:message,
					icon:"none"
				})
			},
			//当用户点击获取验证码按钮
			smsreg(){
				let json = {
					mobile:this.userphone,
					type:4,
					userid:this.userid
				}
				//这里发送验证码是采用app里封装的
				app.globalData.VerificationCode(json)
				this.time()
			},
			//点击确定的时候
			setregphone(e){
				let {sms,newsaccount} = e.detail.value
				if(sms!==""){
					//发起验证原手机的请求
					uni.request({
						url:`${app.globalData.Requestpath}user/validateOldMobile`,
						method:"POST",
						data:{
							token:this.tokey,
							mobile:this.userphone,
							code:sms
						},
						success:res=>{//当验证原手机成功了 走这里面
							if(res.data.code==0){
								//这是新手机号input框显示  和 验证码按钮消失
									this.inpstylebool = "block"
									this.phoneregstyle = 'none'
									this.submitbtn = "获取验证码"
									
									let {newsaccount,newssms} = e.detail.value
									let regphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
									if(regphone.test(newsaccount)){
										let json = {
											mobile:newsaccount,
											type:4,
											userid:this.userid
										}
										app.globalData.VerificationCode(json)
										this.submitbtn = "确定"
										if(newssms!==""){
											//发起绑定新手机的请求
											uni.request({
												url:`${app.globalData.Requestpath}user/bindNewMobile`,
												method:"POST",
												data:{
													token:this.tokey,
													mobile:this.value,
													code:this.value2
												},
												success:(resbindgoos)=>{
													if(resbindgoos.data.code==0){
														this.hideModal()
														this.tantoast("绑定成功")
														return 
													}else{
														this.hideModal()
														this.tantoast("该手机已经绑定了")
														return 
													}
												}
											})
											return 
										}else{
											this.value2 = ""
											this.placeholdernewssms = "验证码不能为空"
										}
									}else{
										this.value = ""
										this.placeholdernewsphone = "请输入正确的手机号"
									}
							}else{
								this.hideModal()
								this.tantoast("验证码错误")
							}
						}
					})
				}else{
					this.hideModal()
					this.tantoast("验证码不能为空")
				}
			}
		},
		created(){
			const _this = this
			
		},
		props:["userphone","userid","tokey"]
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
