<template>
	<view class="phone">
		<view class="cu-form-group margin-top inp">
			<input placeholder="请输入验证码" name="sms"></input>
			<button class='cu-btn bg-green shadow' @click="countdown" :disabled="disabled">{{countdowntext}}</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				countdowntext:"验证码",
				wait:60,
				disabled:false
			}
		},
		methods:{
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
			}
		}
	}
</script>

<style>
</style>
