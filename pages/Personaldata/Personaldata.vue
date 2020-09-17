<template>
	<view class="personaldata">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" message="个人资料"></actionbar>
		<view class="modelkuang">
			<!-- 这是头像 -->
			<view class="Uploadpicture">
				<view class="cu-bar bg-white margin-top" @tap="showModalPhone" data-target="Image">
					<view class="action">
						<text>头像</text>
					</view>
					<view class="action">
						<view class="cu-avatar sm round margin-left" :style="{'background-image':'url('+pathurls+')'}"></view>
					</view>
				</view>
				<view class="cu-modal" @tap="imageClose" :class="modalName=='Image'?'show':''">
					 <!-- @tap.stop="imageShow" -->
					<view class="cu-dialog" @tap.stop="">
						<view class="cu-bar bg-white margin-top">
							<view class="action">
								头像上传
							</view>
						</view>
						<view class="cu-form-group">
							<view class="grid col-4 grid-square flex-sub">
								<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
									<image :src="pathurl" mode="aspectFill"></image>
									<!-- 这是那× -->
									<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
										<text class='cuIcon-close'></text>
									</view>
								</view>
								<!-- 相册选择 -->
							<!-- 	<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
									<text class='lg text-gray cuIcon-album'></text>
								</view> -->
								<!-- 拍照 -->
								<view class="solids photograph" @tap="photograph">
									<text class="lg text-gray cuIcon-camerarotate"></text>
								</view>
							</view>
						</view>
						<view class="cu-bar bg-red">
							<view class="action margin-0 flex-sub  solid-left" @tap="Confirmupload">确认上传</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 用户名 -->
			<view class="cu-bar bg-white margin-top" :style="{'min-height':'80rpx'}" >
				<view class="action">
					<text>用户名</text>
				</view>
				<view class="action">
					<!--  @tap="showModal" -->
					<input :style="{'margin-right': '44rpx',}"  :value="phone" :disabled="true"></input>
					
				</view>
			</view>
			<!-- 这是昵称 -->
			<form @submit="btnsave">
				<view class="nickname" v-for="(item,index) in Personalinformationlist" :key="index">
					<view class="cu-bar bg-white margin-top" :style="{'min-height':'80rpx'}" @tap="showModal" :data-target="item.showname" :data-indexs="index">
						<view class="action">
							<text>{{item.title}}</text>
						</view>
						<view class="action">
							<!--  @tap="showModal" -->
							<input :style="{'margin-right': '44rpx'}" :name="item.name" :value="item.zhi!==null?item.zhi:''" :disabled="true"></input>
							<text class="lg text-gray cuIcon-right"></text>
						</view>
					</view>
					<view class="cu-modal" :class="modalName==item.showname?'show':''">
						<!-- <form @submit="formsubmit"> -->
						<view class="cu-dialog">
							<view class="cu-bar bg-white justify-end">
								<view class="content">{{item.dialogtitle}}</view>
								<view class="action">
									<text class="cuIcon-close text-red" @tap='cancel'></text>
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
				<!-- 性别 -->
				<view class="gender">
					<view class="cu-bar bg-white margin-top" :style="{'min-height':'80rpx'}" @tap="gender" data-target="RadioModal">
						<view class="action">
							<text>{{genderlist.title}}</text>
						</view>
						<view class="action">
							<!--  @tap="showModal" -->
							<input :style="{'margin-right': '44rpx'}" :name="genderlist.name" :value="genders!==null?genders:''" :disabled="true"></input>
							<text class="lg text-gray cuIcon-right"></text>
						</view>
					</view>
					<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
						<view class="cu-dialog" @tap.stop="">
							<radio-group class="block" @change="RadioChange">
								<view class="cu-list menu text-left">
									<view  
										class="cu-item" 
										v-for="(item,index) in genderselect" 
										:key="index"
										:data-genders="item.text" 
										@tap="radioButton"
									>
										<label class="flex justify-between align-center flex-sub">
											<view class="flex-sub">{{item.text}}</view>
											<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio=='radio' + index?true:false"
											 :value="item.text" >
											</radio>
										</label>
									</view>
								</view>
							</radio-group>
						</view>
					</view>
				</view>
				<!-- 地区选择 -->
				<!-- <selection @selectiondata="selectiondata" message="地址"></selection> -->
				<button data-v-287a241a="" class="cu-btn block bg-green margin-tb-sm lg" form-type="submit" :disabled="bool">{{text}}</button>
			</form>
		</view>
	</view>
</template>

<script>
	//这是引入的操作条
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp()
	export default {
		//这是个人资料   
		data() {
			return {
				radio: 'radio0',
				genders: null,
				genderselect: [{
						text: '男',
					},
					{
						text: '女',
					},
					{
						text: '保密',
					}
				],
				genderlist: {
					title: "性别",
					zhi: "",
					showname: "3",
					dialogtitle: "您要修改的昵称",
					placeholdertext: "昵称至少五位最多10位",
					value3: "",
					disabled: false
				},
				statusBar: 0,
				// CustomBar: this.CustomBar,
				bool: true,
				text: "保存",
				modalName: null,
				value: "",
				imgList: [],
				pathurl: "",
				show_img_list: [],
				json: {
					code: 1
				},
				pathurls: "",
				Personalinformationlist: [{
						title: "昵称",
						zhi: "",
						showname: "1",
						dialogtitle: "您要修改的昵称",
						placeholdertext: "昵称至少五位最多10位",
						value3: "",
						name: "usernick",
						disabled: false
					},
					{
						title: "真实姓名",
						zhi: "",
						showname: "2",
						dialogtitle: "您要修改的真实姓名",
						placeholdertext: "请输入你的真实姓名",
						value3: "",
						name: "username",
						disabled: false
					},
					// {
					// 	title: "性别",
					// 	zhi: "",
					// 	showname: "3",
					// 	dialogtitle: "您要修改的性别",
					// 	placeholdertext: "性别男/女",
					// 	value3: "",
					// 	name: "usersex",
					// 	disabled: false
					// }
				],
				phone:'',
			}
		},
		methods: {
			imageClose(){
				this.modalName = null
			},
			radioButton(e) {
				this.bool = false
				this.text = "确认修改"
				this.genders = e.currentTarget.dataset.genders
				this.modalName = null
			},
			gender(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1)
			},
			cancel() {
				this.modalName = null
			},
			showModal(e) {
				let index = e.currentTarget.dataset.target
				let indexs = e.currentTarget.dataset.indexs
				if(parseInt(indexs)==1){
					this.modalName = null
					this.bool = true
					this.text = "保存"
					return app.globalData.showtoastsame("真实姓名无法修改")
				}else{
					this.modalName = e.currentTarget.dataset.target
				}
				this.Personalinformationlist[indexs].disabled = true
				this.bool = false
				this.text = "确认修改"
			},
			hideModal(e) {
				this.modalName = null
			},
			// Modify() {
			// 	this.value = this.value
			// 	this.modalName = null
			// },
			Modify(value4, index, bool) {
				this.Personalinformationlist[index].disabled = false
				this.Personalinformationlist[index].zhi = value4
				this.$emit("changebool", false)
				this.$emit("changetext", "确认修改")
				//当用户点击确定的时候 证明用户已经更改了信息 获取缓存中的值 进行比对
				this.modalName = null
			},
			// ChooseImage() {
			// 	const _self = this;
			// 	uni.chooseImage({
			// 		count: 1, //默认9
			// 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['camera'], //从相册选择  
			// 		success: (res) => {
			// 			this.imgList = res.tempFiles
			// 			this.pathurl = res.tempFilePaths[0]
			// 		}
			// 	});
			// },
			// 打开相机
			photograph(){
				const _self = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera '], //从相册选择  
					success: (res) => {
						this.imgList = res.tempFiles
						this.pathurl = res.tempFilePaths[0]
					}
				});
			},
			//点击上传
			Confirmupload() {
				this.bool = false
				this.text = "确认修改"
				//设置缓存 将这个图片存到缓存里 
				uni.setStorage({
					key: "dandutouxiang",
					data: this.pathurl
				})
				const _this = this
				uni.uploadFile({
					url: `${app.globalData.Requestpath}common/uploadImage?type=user`,
					filePath: this.pathurl,
					name: "file",
					fileType: "image",
					success(res) {
						// console.log(res,666)   
						this.json = JSON.parse(res.data)
						_this.pathurl = this.json.data.src
						uni.getStorage({
							key: "dandutouxiang",
							success(res) {
								// console.log(res.data)
								_this.pathurls = res.data
							}
						})
						// console.log(this.pathurl, '上传的头像')
					}
				})
				//这是将弹窗关闭  
				this.modalName = null
			},
			showModalPhone(e) {
				this.modalName = e.currentTarget.dataset.target
				//拿道下标 当用户点击列表的时候弹出窗 后面的input不能编译  
				let index = parseInt(this.modalName)
				// this.Personalinformationlist[index-1].disabled= true	
			},
			
			toast(titletext) {
				uni.showToast({
					title: titletext,
					icon: "none"
				})
			},
			selectiondata(e) {
				this.selectiondatalist = e
				this.$emit("changebool", false)
				this.$emit("changetext", "确认修改")
			},
			//当用户点击了保存了以后
			btnsave(e) { //e是表单中的信息
				let {
					usernick,
					username,
					province,
					city,
					area
				} = e.mp.detail.value
				// console.log(usernick,username)
				// console.log(usersex)
				// 	// console.log(usernick,username,usersex,province,city,area)
				if (this.text == "确认修改") {
					// console.log("点击确认走过来了")
					// if (usernick && username) {
						// console.log("验证账号")
						// 			//这是验证账号
						let regusernick = /^[\W|\w]{5,20}$/;
						// 			//验证真实姓名
						let regusername = /^\W{2,10}$/;
						// 			//验证性别
						let num = ""
						if (this.genders == "男") {
							num = 0
						} else if (this.genders == "女") {
							num = 1
						} else {
							num = 2
						}
						let name = "" 
						if(usernick == ""){
							name = "hbk_" + this.phone
						}else{
							name = usernick
						}
						// if (!(regusernick.test(usernick))) {
						// 	this.toast("昵称请填写5到20个字符")
						// } else if (!(regusername.test(username))) {
						// 	this.toast("姓名请填写2到10个字符")
						// }
						// console.log(num)
						// if (regusernick.test(usernick) && regusername.test(username)) {
							// console.log(this.tokey,"已经获取到tokey")//获取到tokey
							// 				this.$emit("jsons",this.json)
							// console.log(this.json)//就拿到了父组件里面的值
							let {
								code
							} = this.json
							// console.log(code,"已经获取到code码")
							// 				//如果code==0的时候代表tokey没过期 
							if (this.pathurl) {
								if (code == 0) {
									var src = this.json.data.src
								} else {
									var src = this.pathurl
								}
								// console.log(usernick,username,num,src)
								// console.log(this.selectiondatalist[0][0].area_id,this.selectiondatalist[1][0].area_id,this.selectiondatalist[2][0].area_id)
								// console.log(this.tokey)
								// 					//当全部的验证成功了  就发起请求
								uni.request({
									url: `${app.globalData.Requestpath}user/updateUserDetail`,
									method: "POST",
									data: {
										token: this.tokey,
										user_nick: name,
										real_name: username,
										user_sex: num,
										// province:this.selectiondatalist[0][0].area_id,
										// city:this.selectiondatalist[1][0].area_id,
										// area:this.selectiondatalist[2][0].area_id,
										user_pic: src
									},
									success: (res) => {
										// console.log(res,"已经请求用户信息成功")
										if (res.data.code == 0) {
											uni.redirectTo({
												url: "/pages/PersonalMy/PersonalMy"
											})
										}
									},
									fail(err) {
										// console.log("请求失败")
										// console.log(err)
									}
								})

							} else {
								this.toast("请上传你的头像")
							}
						// }
					// }
				}
			}
		},
		components: {
			actionbar,
		},
		created() {
			const _this = this

			//当页面初始化的时候取出tokey
			uni.getStorage({
				key: "bindtokey",
				success(res) {
					_this.tokey = res.data
					//获取到用户的tokey值以后去请求获取用户的信息 做到初始化
					uni.request({
						url: `${app.globalData.Requestpath}user/getUserDetail`,
						method: "POST",
						data: {
							token: _this.tokey
						},
						success(res) {
							// console.log(res, '开始拿到的数据')
							if (res.data.code == 0) {
								// console.log(res.data.data)
								// console.log(res.data.data.user_pic, '头像路径')
								let {
									user_nick,
									real_name,
									user_sex,
									user_pic,
									province,
									city,
									area,
									user_username
								} = res.data.data
								// console.log(res.data.data)
								//    用户昵称   姓名      性别    头像      省市县
								_this.$emit("srcurl", user_pic)
								let sex = user_sex
								if (sex == 0) {
									sex = "男"
									_this.radio = "radio0"
								} else if (sex == 1) {
									sex = "女"
									_this.radio = "radio1"
								} else {
									sex = "保密"
									_this.radio = "radio2"
								}
								_this.pathurls = 'http://hbk.huiboke.com' + user_pic
								_this.pathurl = user_pic
								_this.Personalinformationlist[0].zhi = user_nick
								_this.Personalinformationlist[1].zhi = real_name
								// _this.Personalinformationlist[2].zhi = sex
								_this.genders = sex
								_this.Personalinformationlist[0].value3 = user_nick
								_this.Personalinformationlist[1].value3 = real_name !== null ? real_name : ''
								// _this.Personalinformationlist[2].value3 = sex
								_this.phone = user_username
							}
						}
					})
				}
			})
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.Selectgender {
		display: flex;
		flex-wrap: wrap;
		flex-grow: 10;
		min-height: 80rpx;
		background-color: #fff;
		margin-top: 20rpx;
		padding-left: 30rpx;
		line-height: 80rpx;
		font-size: 30rpx;

		.gender {
			flex-grow: 16;
		}

		.cuIcon-right {
			margin-left: 90rpx;
			flex-grow: 1;
			font-size: 36rpx;
		}
	}
	// .photograph{
	// 	margin-left: 50rpx;
	// }
</style>
