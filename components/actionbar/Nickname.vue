<template>
	<view class="nickname-box">
		<form @submit="btnsave">
			<view class="nickname" v-for="(item,index) in Personalinformationlist" :key="index">
				<view 
					class="cu-bar bg-white margin-top" 
					:style="{'min-height':'80rpx'}" 
					@tap="showModal" 
					:data-target="item.showname" 
					
				>
					<view class="action">
						<text>{{item.title}}</text>
					</view>
					
					<view class="action">
						<!--  @tap="showModal" -->
						<text :style="{'margin-right': '44rpx'}">{{item.zhi}}</text>
						<text class="lg text-gray cuIcon-right"></text>
					</view>
				</view>
				<view class="cu-modal" :class="modalName==item.showname?'show':''">
					<!-- <form @submit="formsubmit"> -->
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">{{item.dialogtitle}}</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							<input v-model="item.value3" type="text" :placeholder="item.placeholdertext">
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn bg-green margin-left" @tap="Modify(item.value3,index)">确定</button>
							</view>
						</view>
					</view>
					<!-- </form> -->
				</view>
			</view>
		<!-- #ifdef MP-WEIXIN -->
			<view class="cu-form-group margin-top inp">
				<view class="title">+86</view>
				<input placeholder="请输入手机号" v-model="phonevalue" name="input" @input="Modifyphone"></input>
			</view>
			<view class="cu-form-group margin-top inp">
				<input placeholder="请输入验证码" name="sms"></input>
				<button class='cu-btn bg-green shadow' @click="countdown" :disabled="disabled">{{countdowntext}}</button>
			</view>
		<!-- #endif -->
			<button data-v-287a241a="" class="cu-btn block bg-green margin-tb-sm lg" form-type="submit">保存</button>
		</form>
	</view>
	
</template>

<script>
	export default{ //注:这里的name 每个input 还位绑定
		data(){
			return {
				modalName: null,
				Personalinformationlist:[
					{
						title:"昵称",
						zhi:"明天的我又进步了",
						showname:"DialogModal1",
						dialogtitle:"您要修改的昵称",
						placeholdertext:"请输入你要修改的昵称",
						value3:""
					},
					{
						title:"性别",
						zhi:"男",
						showname:"DialogModal2",
						dialogtitle:"您要修改的性别",
						placeholdertext:"请输入你要修改的性别",
						value3:""
					},
					{
						title:"个性签名",
						zhi:"示范法纠纷解决分公司登记分",
						showname:"DialogModal3",
						dialogtitle:"您要修改的个性签名",
						placeholdertext:"请输入你要修改的个性签名",
						value3:""
					}
				],
				phonevalue:"",
				countdowntext:"验证码",
				wait:60,
				disabled:true
			}
		},
		methods:{
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Modify(value4,index){
				this.Personalinformationlist[index].zhi = value4
				this.modalName = null
			},
			//点击验证码时
			countdown(){
				this.time()
			},
			time(){
				let times = null
				this.disabled = true
				//这块点击反复执行定时器
				// clearInterval(times)
				let {countdowntext,wait} = this.$data
				// console.log(countdowntext,wait)
					times = setInterval(()=>{
						wait--
						// console.log(wait)
						this.countdowntext = wait
						if(wait==0){
							this.disabled = false
							countdowntext = "重新获取验证码"
							clearInterval(times)
							this.countdowntext = countdowntext
							this.wait = 60
						}
						
					},1000)
			},
			//这时候输入手机号的表单事件
			Modifyphone(){
				//当输入的手机号的时候 如果手机号的长度是11位那么就解锁点击验证码的状态
				if(this.phonevalue.length==11){
					this.disabled = false
				}
			},
			//当用户点击了保存了以后
			btnsave(e){ //e是表单中的信息
				// console.log(e)
				//当用户点击了保存后 存一个状态在缓存中 或者发给服务器
				// 并强制用户跳转到首页
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style>
</style>
