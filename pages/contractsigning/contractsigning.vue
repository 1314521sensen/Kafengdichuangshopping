<template>
	<view class="contractsingbox">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="合同签订及缴费" :Jumpchoose="true" url="/pages/choosing/choosing"></actionbar>
		<view class="contractsing">
			<view class="contractsingTop">
				<view class="contractsingtitle">
					实名认证信息
				</view>
				<view class="cu-form-group" v-for="(item,index) in contractsingToplist" :key="index">
					<view class="title">{{item.titlename}}</view>
					<view class="inp" :style="{width:item.widthpx+'rpx'}">
						<input :placeholder="item.placeholdername" disabled="true" name="input" placeholder-class="placeholdername" :value="item.plaValue"></input>
					</view>
				</view>
				<view class="Uploadinformation">
					<view class="Uploadinformationitem" v-for="(itemcard,indexcard) in cardlist" :key="indexcard">
						<view class="informationitem-text">{{itemcard.itemname}}</view>
						<view class="cu-form-group">
							<view class="grid col-4 grid-square flex-sub">
								<image class="identityPir" :src="imgpath+itemcard.bgurl" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="contractsingmidden">
				<view class="contractsingtitle">
					实名认证信息
				</view>
				<view class="cu-form-group margin-group" v-for="(item,index) in middenlist" :key="index">
					<view class="title">{{item.titlename}}</view>
					<view class="inp inps">
						<input :placeholder="item.placeholdername" disabled="true" :value="item.storeText" name="input" placeholder-class="placeholdername"></input>
					</view>
				</view>
			</view>
			<view class="contractsingbottom">
				<view class="Where">
					<view class="Where-left">
						开户行记账户:
					</view>
					<view class="Where-right">
						<text>开户行:德州银行股份有限公司</text>
						<text>账户:80901040101421061198</text>
						<text>公司名称:山东卡风迪创信息科技有限公司</text>
						<text>客服电话:0534-7063000</text>
					</view>
				</view>
				<view class="Uploaddocuments">
					<view class="Uploaddocuments-left">
						上传支付凭证:
					</view>
					<view class="Uploaddocuments-right">
						<view class="cu-form-group">
							<view class="grid col-4 grid-square flex-sub">
								<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
								 <image :src="imgList[index]" mode="aspectFill"></image>
									<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
										<text class='cuIcon-close'></text>
									</view>
								</view>
								<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
									<text class='cuIcon-cameraadd'></text>
								</view>
							</view>
						</view>
						<view class="beizhu">
							<text>备注:</text>
							<textarea type="text" class="beizhuinp" placeholder="凭证留言" v-model="pay_desc" :maxlength="-1"/>
						</view>
					</view>
				</view>
			</view>
			<button class="Submitapplication text-white" @tap="Submitapplication">提交申请</button>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import actionbar from "@/components/actionbar/actionbar.vue"
	export default {
		data() {
			return {
				statusBar:0,
				alldata:[
					
				],
				contractsingToplist:[
					{
						titlename:"姓名:",
						placeholdername:"请输入姓名",
						plaValue:'',
						widthpx:200
					},
					{
						titlename:"身份证:",
						placeholdername:"请输入身份证号",
						plaValue:'',
						widthpx:400
					}
				],
				cardlist:[
					{
						itemname:"身份证正面",
						bgurl:""
					},
					{
						itemname:"身份证反面",
						bgurl:"/static/carddianpu/cardzheng.png"
					}
				],
				middenlist:[
					{
						titlename:"卖家账号:",
						placeholdername:"卖家账号",
						storeText:''
					},
					{
						titlename:"店铺名称:",
						placeholdername:"店铺名称",
						storeText:''
					},
					{
						titlename:"店铺等级:",
						placeholdername:"店铺等级",
						storeText:''
					},
					{
						titlename:"店铺分类:",
						placeholdername:"店铺分类",
						storeText:''
					},
					{
						titlename:"应付总金额:",
						placeholdername:"0元",
						storeText:''
					},
					{
						titlename:"经营类目:",
						placeholdername:"经营类目",
						storeText:''
					},
					{
						titlename:"审核状态:",
						placeholdername:"审核状态",
						storeText:''
					},
					{
						titlename:"审核意见:",
						placeholdername:"审核意见",
						storeText:''
					},
				],
				imgList:[],//上传凭证的数组 
				Uploaddocumentslist:[],//上传凭证的数组
				national:''   ,//身份证号
				pay_desc:'',//备注
				updataimg:"",//上传的支付的凭证
				Individualcompanies:"",//判断是个人还是企业
				store_area:"",//县区id
				store_addr:"",//详细地址
				contacts_name:"",//联系人姓名
				store_mobile:"",//联系人电话
				contacts_email:"",//联系人邮箱
				imgpath:this.$store.state.imgyuming
			}
		},
		methods: {
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '尊敬的用户',
					content: '确定要删除要删除这张图片吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							_this.updataimg=""
						}
					}
				})
			},
			ChooseImage() {
				const _this = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
							console.log(2)
						} else {
							this.imgList = res.tempFilePaths
							uni.uploadFile({
								url:`${app.globalData.Requestpath}common/uploadImage?type=user`,
								method:"POST",
								filePath:this.imgList[0],
								name:"file",
								fileType:"image",
								success(res) {
									_this.updataimg = JSON.parse(res.data).data.src
								}
							})
						}
					}
				});
			},
			Submitapplication(){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(res){
						if(_this.imgList.length>0){
							uni.request({
								url:`${app.globalData.Requestpath}store/updateMerchantJoinInfo`,
								method:"POST",
								data:{
									token:res.data,
									store_type:_this.Individualcompanies,
									store_name:_this.middenlist[1].storeText,
									store_area:_this.store_area,
									store_addr:_this.store_addr,
									contacts_name:_this.contacts_name,
									store_mobile:_this.store_mobile,
									contacts_email:_this.contacts_email,
									join_status:2,
									store_state:2
								},
								success(res) {
									if(res.data.code==0){
										uni.redirectTo({
											url:"/pages/Successfulopening/Successfulopening"
										})
									}else{
										app.globalData.showtoastsame(res.data.msg)
									}
								}
							})
						}else{
							app.globalData.showtoastsame("请上传支付凭证")
						}
					}
				})
				
			}
		},
		created(){
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					//先获取用户实名认证信息
					uni.request({
						url:`${app.globalData.Requestpath}user/getRealNameAuthentication`,
						method:"POST",
						data:{
							token:res.data
						},
						success(resauthentication) {
							if(resauthentication.data.code==0){
								let {real_name,idcard,idcard_fphoto,idcard_rphoto} = resauthentication.data.data
								_this.contractsingToplist[0].plaValue = real_name
								_this.contractsingToplist[1].plaValue =  idcard
								_this.cardlist[0].bgurl = idcard_fphoto
								_this.cardlist[1].bgurl = idcard_rphoto
							}else{
								app.globalData.Logback(resauthentication.data.msg)
							}
						}
					})
					uni.request({
						url:`${app.globalData.Requestpath}store/getMerchantJoinInfo`,
						method:"POST",
						data:{
							token:res.data
						},
						success(resinfo) {
							//contractsingToplist
							if(resinfo.data.code==0){
								// console.log(resinfo)
								let {user_name,store_name,grade_name,gc_name1,gc_names,gc_margin,store_state,store_verify_info,store_area,store_addr,contacts_name,store_mobile,contacts_email} = resinfo.data.data
								_this.store_area = store_area
								_this.store_addr = store_addr
								_this.contacts_name = contacts_name
								_this.store_mobile = store_mobile
								_this.contacts_email = contacts_email
								_this.middenlist[0].storeText = user_name
								_this.middenlist[1].storeText = store_name
								_this.middenlist[2].storeText = grade_name
								_this.middenlist[3].storeText = gc_name1
								_this.middenlist[4].storeText = gc_margin
								_this.middenlist[5].storeText = gc_names
								_this.middenlist[7].storeText = store_verify_info?store_verify_info:''
								let stateText = ""
								switch(store_state){
									case -1:
										stateText = "未通过"
									break;
									case 0:
										stateText = "关闭"
									break;
									case 1:
										stateText = "开启"
									break;
									case 2:
										stateText = "审核中"
									break;
									case null:
										stateText = "未申请审核"
									break;
								}
								_this.middenlist[6].storeText = stateText
							}
						}
					})
				}
			})
		},
		components:{
			actionbar,
		},
		onLoad(opction) {
			this.statusBar = app.globalData.statusBar
			if(opction.titlename=='enterprises'){
				this.Individualcompanies = 1
			}else{
				this.Individualcompanies = 0
			}
		}
	}
</script>

<style lang="less" scoped>
	.contractsingbox{
		background-color:#f8f8f8;
		padding-bottom:40rpx;
	}
	.contractsing{
		padding:0 20rpx;
		.contractsingTop{
			margin:30rpx 0;
			background-color: #fff;
			padding-bottom:20rpx;
			.Uploadinformation{
				display:flex;
				margin-top:20rpx;
				.Uploadinformationitem{
					width: 50%;
					font-size: 28rpx;
					.informationitem-text{
						text-align: center;
						margin-bottom:20rpx;
					}
					.identityPir{
						height: 200rpx;
					}
					.bg-img{
						width: 100%;
						height:156rpx;
					}
					.solids{
						width: 100%;
						height:156rpx;
						padding-bottom:0;
						text{
							display:block;
							width: 100%;
							height:100%;
							background-size: 100% 100%;
							background-repeat:no-repeat;
						}
					}
				}
			}
		}
		.contractsingmidden{
			background-color: #fff;
			padding-bottom:20rpx;
			margin-bottom:20rpx;
		}
		.contractsingbottom{
			background-color: #fff;
			padding:30rpx 0;
			.Where{
				display:flex;
				font-size: 28rpx;
				.Where-right{
					color:red;
					flex:1;
					margin-left:20rpx;
					text{
						display:block;
						font-size:26rpx;
					}
				}
			}
			.Uploaddocuments{
				display:flex;
				margin-top:32rpx;
				font-size: 28rpx;
				.Uploaddocuments-right{
					flex:1;
					.beizhu{
						display:flex;
						.beizhuinp{
							width:496rpx;
							border:2rpx solid #ccc;
						}
					}
				}
			}
		}
		.contractsingtitle{
			border-bottom:2rpx solid #ccc;
			padding:20rpx 0 20rpx 20rpx;
			font-weight: bold;
			font-size: 32rpx;
		}
		.margin-group{
			margin-top:18rpx;
		}
		.cu-form-group{
			justify-content:flex-start;
			min-height:20rpx;
			.title{
				padding-right:0;
			}
			.inp{
				margin-left:20rpx;
				border-bottom:2rpx solid #ccc;
				width: 200rpx;
			}
			.inps{
				width: 400rpx;
			}
			.placeholdername{
				font-size: 26rpx;
			}
		}
		.Submitapplication{
			background-color: #ff5500;
			border-radius:48rpx;
			height:72rpx;
			line-height:72rpx;
			margin-top:30rpx;
			font-size: 32rpx;
		}
	}
</style>
