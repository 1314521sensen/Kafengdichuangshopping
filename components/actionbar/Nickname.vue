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
						<input :style="{'margin-right': '44rpx'}" :name="item.name" :value="item.zhi" :disabled="item.disabled"></input>
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
			<!-- 地区选择 -->
			<selection></selection>
			<button data-v-287a241a="" class="cu-btn block bg-green margin-tb-sm lg" form-type="submit" :disabled="bool">{{text}}</button>
		</form>
	</view>
	
</template>

<script>
	import selection from "@/components/actionbar/areaselection.vue"
	export default{ //注:这里的name 每个input 还位绑定
	
		data(){
			return {
				modalName: null,
				//这是表单的渲染列表
				Personalinformationlist:[
					{
						title:"昵称",
						zhi:"",
						showname:"1",
						dialogtitle:"您要修改的昵称",
						placeholdertext:"请输入你要修改的昵称",
						value3:"",
						name:"usernick",
						disabled:false
					},
					{
						title:"真实姓名",
						zhi:"",
						showname:"2",
						dialogtitle:"您要修改的真实姓名",
						placeholdertext:"真实姓名一但修改无法编辑",
						value3:"",
						name:"username",
						disabled:false
					}
				],
				phonevalue:"",
				countdowntext:"验证码",
				wait:60,
				disabled:true,
				tokey:"",
			}
		},
		
		methods:{
			showModal(e,disabled) {
				this.modalName = e.currentTarget.dataset.target
				//拿道下标 当用户点击列表的时候弹出窗 后面的input不能编译
				let index = parseInt(this.modalName)
				this.Personalinformationlist[index-1].disabled= true
			},
			hideModal(e) {
				this.modalName = null
			},
			Modify(value4,index,bool){
				this.Personalinformationlist[index].disabled = false
				this.Personalinformationlist[index].zhi = value4
				this.$emit("changebool",false)
				this.$emit("changetext","确认修改")
				//当用户点击确定的时候 证明用户已经更改了信息 获取缓存中的值 进行比对
				this.modalName = null
			},
			toast(titletext){
				uni.showToast({
					title:titletext,
					icon:"none"
				})
			},
			//当用户点击了保存了以后
			// btnsave(e){ //e是表单中的信息
			// 	let {usernick,username,usersex,province,city,area} = e.mp.detail.value
			// 	console.log()
			// 	// console.log(e.mp.detail.value.usernick)
			// 	// console.log(usernick,username,usersex,province,city,area)
			// 	if(this.text=="确认修改"){
			// 		console.log("点击确认走过来了")
			// 		if(usernick && username && usersex && province && city && area){
			// 			console.log("验证账号")
			// 			//这是验证账号
			// 			let regusernick = /^[\W|\w]{5,100}$/;
			// 			//验证账号
			// 			let regusername = /^\W{2,5}$/;
			// 			//验证性别
			// 			let regsex = /^[男|女]{1,1}$/
			// 			let num = ""
			// 			if(usersex=="男"){
			// 				num = 0
			// 			}else{
			// 				num = 1
			// 			}
			// 			if(regusernick.test(usernick) && regusername.test(username) && regsex.test(usersex)){
			// 				console.log(this.tokey,"已经获取到tokey")//获取到tokey
			// 				this.$emit("jsons",this.json)
			// 				console.log(this.json,"已经接收到父组件修改子组件的值")//就拿到了父组件里面的值
			// 				let {code} = this.json
			// 				console.log(code,"已经获取到code码")
			// 				//如果code==0的时候代表tokey没过期 
			// 				if(code==0){
			// 					let {src} = this.json.data
			// 					console.log(src)
			// 					//当全部的验证成功了  就发起请求
			// 					uni.request({
			// 						url:"http://hbk.huiboke.com/api/user/updateUserDetail",
			// 						method:"POST",
			// 						data:{
			// 							token:this.tokey,
			// 							user_nick:usernick,
			// 							real_name:username,
			// 							user_sex:usersex,
			// 							province:province,
			// 							city:city,
			// 							area:area,
			// 							user_pic:src
			// 						},
			// 						success:(res)=>{
			// 							console.log(res,"已经请求用户信息成功")
			// 							if(res.data.code==0){
			// 								console.log("信息已经修改")
			// 								//在把新值存进缓存
			// 								uni.setStorage({
			// 									key:"userinfokey",
			// 									data:{
			// 										user_nick:usernick,
			// 										real_name:username,
			// 										user_sex:usersex,
			// 										province:province,
			// 										city:city,
			// 										area:area,
			// 										user_pic:src
			// 									},
			// 									success:()=> {
			// 										console.log("已经存进缓存中")
			// 										this.toast("信息修改成功")
			// 										this.$emit("changebool",true)
			// 										this.$emit("changetext","保存")
			// 									}
			// 								})
			// 							}
			// 						},
			// 						fail(err){
			// 							console.log("请求失败")
			// 							console.log(err)
			// 						}
			// 					})
								
			// 				}else{
			// 					this.toast("请重新登录")
			// 				}
			// 			}else{
			// 				this.toast("请正确填写信息")
			// 			}
			// 		}else{
			// 			this.toast("请填写完整的信息")
			// 		}
			// 	}
				
			// 	// let arr = []
			// 	// arr.push(e.mp.detail.value)
			// 	// arr.forEach((item,index)=>{
			// 	// 	console.log(item)
			// 	// })
			// 	//当用户点击了保存后 存一个状态在缓存中 或者发给服务器
			// 	// 并强制用户跳转到首页
			// 	// uni.switchTab({
			// 	// 	url:"/pages/index/index"
			// 	// })
			// },
			
			//这后期或许用
			// //这时候输入手机号的表单事件
			// Modifyphone(){
			// 	//当输入的手机号的时候 如果手机号的长度是11位那么就解锁点击验证码的状态
			// 	if(this.phonevalue.length==11){
			// 		this.disabled = false
			// 	}
			// },
			// time(){
			// 	let times = null
			// 	this.disabled = true
			// 	//这块点击反复执行定时器
			// 	// clearInterval(times)
			// 	let {countdowntext,wait} = this.$data
			// 	// console.log(countdowntext,wait)
			// 		times = setInterval(()=>{
			// 			wait--
			// 			// console.log(wait)
			// 			this.countdowntext = wait
			// 			if(wait==0){
			// 				this.disabled = false
			// 				countdowntext = "重新获取验证码"
			// 				clearInterval(times)
			// 				this.countdowntext = countdowntext
			// 				this.wait = 60
			// 			}
						
			// 		},1000)
			// },
			//点击验证码时
			// countdown(){
			// 	this.time()
			// },
			//封装用户点击修改实时刷新的
			// userupdata(){
			// 	const _this = this
			// 	uni.getStorage({
			// 		key:"usertokey",
			// 		success(res){
			// 			console.log(res.data)
			// 			uni.request({
			// 				url:"http://hbk.huiboke.com/api/user/getUserDetail",
			// 				method:"POST",
			// 				data:{
			// 					token:res.data
			// 				},
			// 				success(resinfo){
			// 					console.log(resinfo)
			// 					let {user_nick,real_name,user_sex,province,city,area} = resinfo.data.data
			// 					let userarr = []
			// 					userarr.push(user_nick,real_name,user_sex,province,city,area)
			// 					console.log(userarr)
			// 					_this.Personalinformationlist.forEach((item,index)=>{
			// 					// 	// console.log()
			// 						item.zhi = userarr[index]
			// 					// 	// console.log()
			// 					})
			// 				}
			// 			})
			// 			// let {user_nick,real_name,user_sex,province,city,area} = res.data
			// 			// // console.log(user_nick,real_name,user_sex,province,city,area)
						
			// 			// // console.log(userarr)
						
			// 		}
			// 	})
			// }
		},
		components:{
			selection
		},
		props:["bool","text","json"],
		created() {
			const _this = this
			//页面初始的时候去请求实现 去满足一级联动
			
			//当页面初始化的时候取出tokey
			
			uni.getStorage({
				key:"usertokey",
				success:(res)=>{
					this.tokey = res.data
					console.log(this.tokey)
				}
			})
			// _this.userupdata()
		},
		beforeUpdate() {
			const _this = this
			// _this.userupdata()
		}
	}
</script>

<style>
</style>
