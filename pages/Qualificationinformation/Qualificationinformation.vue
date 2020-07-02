<template>
	<view class="Qualificationinformation">
		<!-- 企业入驻-->
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="店铺资质信息" url="/pages/choosing/choosing" :Jumpchoose="true"></actionbar>
	 <form @submit="formSubmit">
		<view class="enterprises Individuals" v-if="titlename=='enterprises'">
			<view class="Individualsbox">
				<view class="Individualsmidden">
					<view class="Individuals-top">
						营业执照信息
					</view>
						<view class="Individuals-bottom">
							<view class="cu-form-group">
								<view class="title">营业执照号:</view>
								<input placeholder="请输入营业执照号" value="" name='businesslicense' class="inp uni-input" placeholder-class="placeholdername"></input>
							</view>
							<view class="cu-form-group">
								<view class="title">营业执照所在地:</view>
								<input placeholder="请选择地址" name="businesslicenseadd" placeholder-class="placeholdername"></input>
							</view>
							<view class="cu-form-group">
								<view class="title">营业执照有效期:</view>
								<input placeholder="请选择有效期" name="businesslicenseDate" placeholder-class="placeholdername"></input>
							</view>
							<view class="cu-form-group enterprises-cu-form-group">
								<view class="title">法定经营范围:</view>
								<textarea 
									value=""
									placeholder="请输入范围" 
									name="licensescope" 
									placeholder-class="placeholdername"
									class="textarea"
									:maxlength="-1"
								></textarea>
							</view>
							<view>
								<view class="cu-bar bg-white margin-top">
									<view class="action">
										营业执照电子版
									</view>
									<view class="action">
										{{imgList.length}}/1
									</view>
								</view>
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
							</view>
						</view>
				</view>
			</view>
		</view>
		<!-- 个人入驻-->
		<view class="Individuals">
			<view class="Individualsbox">
				<view class="Individualsmidden">
					<view class="Individuals-top">
						店铺及联系人信息
					</view>
					<view class="Individuals-bottom">
						<view class="cu-form-group" v-for="(item,index) in Individualslist" :key="index">
							<view class="title">{{item.titlename}}</view>
							<input :placeholder="item.placeholder"  :name="item.name" class="inp" placeholder-class="placeholdername"></input>
						</view>
						<view class="cu-form-group" style="height: 30rpx; ">
							<areaselection class="areaselection" @selectiondata="selectiondata" message="收货地址"></areaselection>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="Individualsbtn">
			<button form-type="submit">下一步</button>
		</view>
	  </form>
	</view>
</template>

<script>
	// 企业的两个都需要显示  个人的只显示下面 那个
	import actionbar from "@/components/actionbar/actionbar.vue"
	import areaselection from "@/components/actionbar/areaselection.vue"
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:0,
				// 个人的信息列表
				Individualslist:[
					{
						titlename:"店铺名称:",
						placeholder:"请输入店铺名称",
						name:"store"
					},
					{
						titlename:"详细地址:",
						placeholder:"请输入详细地址",
						name:"address"
					},
					{
						titlename:"联系人姓名:",
						placeholder:"请输入联系人姓名",
						name:'username'
					},
					{
						titlename:"联系人电话:",
						placeholder:"请输入联系人电话",
					    name:'phone'
					},
					{
						titlename:"电子邮箱:",
						placeholder:"请输入电子邮箱",
						name:'email'
					}
				],
				imgList: [],
				titlename:"",
				selectiondatalist:[],
				value4:"",
				store_type:"",
				imgsrc:""
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
					content: '确定要删除这张图片吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							_this.imgsrc=""
						}
					}
				})
			},
			// Businessinformation(){
			// 	uni.navigateTo({
			// 		url:"/pages/Businessinformation/Businessinformation"
			// 	})
			// },
			ChooseImage() {
				const _this = this
				uni.chooseImage({
					count:1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择 
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
							// console.log(this.imgList)
							uni.uploadFile({
								url:`${app.globalData.Requestpath}common/uploadImage?type=user`,
								filePath:this.imgList[0],
								name:'file',
								fileType:"image",
								success(res){
									_this.imgsrc = JSON.parse(res.data).data.src
								}
							})
							
						}
					}
				});
			},
			formSubmit(e) {
				const _this = this
				for(let key in e.detail.value){
					if(e.detail.value[key] == "" && _this.imgsrc != ""){
						return false
					}else{
						if(_this.selectiondatalist.length > 0){
									// console.log(e.detail.value)
									uni.getStorage({
										key:"bindtokey",
										success(res){
											if(_this.titlename=="Individuals"){
												// 个人入驻
												uni.request({
													url:`${app.globalData.Requestpath}store/updateMerchantJoinInfo`,
													method:"POST",
													data:{
														store_area:0,
														token:res.data,
														store_name:e.detail.value.store,
														store_addr:e.detail.value.address,
														contacts_name:e.detail.value.username,
														store_mobile:e.detail.value.phone,
														contacts_email:e.detail.value.email,
														store_area:_this.selectiondatalist[2][0].area_id,
														store_type:_this.store_type
													},
													success(res){
														if(res.data.code==0){
															uni.navigateTo({
																url:`/pages/Businessinformation/Businessinformation?titlename=${_this.titlename}`
															})
														}else{
															app.globalData.showtoastsame(res.data.msg)
														}
													}
												})
											}else{
												// console.log(_this.imgsrc)
												// 商家入驻
												uni.request({
													url:`${app.globalData.Requestpath}store/updateMerchantJoinInfo`,
													method:"POST",
													data:{
														license_sn:e.detail.value.businesslicense,  //营业执照号
														license_validity:e.detail.value.businesslicenseDate ,//营业执照有效期
														license_scope:e.detail.value.licensescope, //法定经营范围
														license_pic:_this.imgsrc,   //营业电子照  	
											   			token:res.data,
														store_name:e.detail.value.store,
														store_addr:e.detail.value.address,
														contacts_name:e.detail.value.username,
														store_mobile:e.detail.value.phone,
														contacts_email:e.detail.value.email,
														store_area:_this.selectiondatalist[2][0].area_id,
														store_type:_this.store_type,
													},
													success(res){
														if(res.data.code==0){
															uni.navigateTo({
																url:`/pages/Businessinformation/Businessinformation?titlename=${_this.titlename}`
															})
														}else{
															app.globalData.showtoastsame(res.data.msg)
														}
													}
												})
											}
										}
									 })
						}else{
							  app.globalData.showtoastsame('请填写完整信息')
						}
					}
				}
			},
			selectiondata(e){
				this.selectiondatalist = e
				// console.log(this.selectiondatalist[2][0].area_id)
			}
			
		},
		components:{
			actionbar,
			areaselection,
		},
		onLoad(opction) {
			this.titlename = opction.titlename
			if(this.titlename=="Individuals"){
				this.store_type = 0
			}else{
				this.store_type = 1
			}
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.Qualificationinformation{
		background-color:#f2f2f2;
		padding-bottom:50rpx;
		height:100vh;
		// 企业的
		.enterprises{
			padding:0 20rpx;
			margin:40rpx 0;
			.enterprises-cu-form-group{
				align-items: normal;
			}
		}
		.areaselection{
			width: 100%;
		}
		// 个人的
		.Individuals{
			padding:0 20rpx;
			.Individualsmidden{
				background-color: #fff;
				padding:0 20rpx 20rpx;
				.Individuals-top{
					font-size: 36rpx;
					font-weight: bold;
					border-bottom:2rpx solid #ccc;
					padding:10rpx 0;
				}
				.Individuals-bottom{
					.cu-form-group{
						min-height:80rpx;
						border-bottom:0;
						padding:12rpx 30rpx;
						.title{
							padding-right:0;
							color:#999;
						}
						.inp{
							border:1px solid #ccc;
							height:60rpx;
							margin-left:10rpx;
						}
						.placeholdername{
							font-size: 26rpx;
						}
						.textarea{
							border:2rpx solid #999;
							margin:0;
						}
					}
				}
			}
		}
		.Individualsbtn{
			padding:0 20rpx;
			margin-top:40rpx;
			button{
				border-radius:80rpx;
				height:80rpx;
				background-color: #fe5600;
				color:#fff;
			}
		}
	}
</style>
