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
								<button class="cu-btn line-green text-red" @tap="smsreg(item.value)">{{item.righttext}}</button>
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
				list:[
						[
							{
								title:"手机号绑定",
								indextarget:"DialogModal1",
								Modaltitle:"请绑定手机号",
								Modaltext1:"请输入手机号",
								showtext:"",
								Modaltext2:"请输入验证码",
								righttext:"获取短信验证码",
								value:"",
							}
						],
						[
							{
								title:"邮箱绑定",
								indextarget:"DialogModal2",
								Modaltitle:"请绑定邮箱",
								Modaltext1:"请输入邮箱号",
								showtext:"",
								Modaltext2:"请输入验证码",
								righttext:"获取邮箱验证码",
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
			//封装一个验证这手机和邮箱的
			regsms(smsregs){
				let userphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
				var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
				if(this.xiabiao==0){//验证手机号
					if(smsregs!==""){
						if(userphone.test(smsregs)){
							
						}
					}
				}else{//验证邮箱号
					if(smsregs!==""){
						if(reg.test(smsregs)){
							console.log("youxiang")
						}
					}
				}
			},
			//这是验证码
			smsreg(smsregs){
				this.regsms(smsregs)
			},
			bindlogin(e){
				let {account,sms} = e.detail.value
				this.regsms(account)
				
				// console.log(account,sms)
				// if(account.match())
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
					// console.log(res.data)
					//开始加载的时候获取用户手机号或者邮箱
						uni.request({
							url:"http://hbk.huiboke.com/api/user/getUserBindInfo",
							method:"POST",
							data:{
								token:res.data
							},
							success(resinfo) {
								console.log(resinfo)
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
