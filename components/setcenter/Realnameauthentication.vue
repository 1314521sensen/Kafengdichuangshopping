<template>
	<view class="Realnameauthentication">
		<view class="orders">
			<view class="orders-title-name" @tap="showModal" data-target="setphonetan">
				<text>实名认证</text>
				<view class="mintext">
					<text>实名</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
			<form @submit="Realnamesubmit">
				<view class="cu-modal" :class="modalName=='setphonetan'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">实名认证</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl inp">
							<view class="newsemail">
								<input type="text" placeholder="请输入姓名"   name="name"></input>
								<input type="text" placeholder="请输入身份证号" name="idcard"></input>
							</view>
							<view>
								<view class="cu-bar bg-white margin-top">
									<view class="action">
										请上传身份证正反面
									</view>
									<view class="action">
										{{imgList.length}}/2
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
										<view class="solids" @tap="ChooseImage" v-if="imgList.length<2">
											<text class='cuIcon-cameraadd'></text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action btn">
								<button class="cu-btn line-green text-green" form-type="submit">确定</button>
								<button class="cu-btn line-green text-red">进行实名</button>
							</view>
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
				modalName: null,
				imgList: [],
			}
		},
		methods:{
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			ChooseImage() {
				uni.chooseImage({
					count: 2, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {//如果提交了一张 imgList 会等于undefined
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {//点击图片上面的×直接去掉那张图片
				this.imgList.splice(e.currentTarget.dataset.index, 1)
			},
			//实名提交
			Realnamesubmit(e){
				const _this = this
				let {name,idcard} = e.detail.value
				
				//正则匹配姓名和身份证
				let regname = /^[\u4E00-\u9FA5]{2,4}$/
				// 正则表达式：
				let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				if(regname.test(name) && idcardReg.test(idcard) && this.imgList.length!=0){//当验证全部同过以后才能往下执行
					//进行上传图片

					uni.uploadFile({
						url:`${app.globalData.Requestpath}common/uploadImage?type=user`,
						method:"POST",
						filePath:this.imgList[0],
						name:'file',
						fileType:"image",
						success:(resimg)=>{
							if(JSON.parse(resimg.data).code==0){
								let resdata = JSON.parse(resimg.data).data.src
								// resdata//这是返回了第一次图片
								uni.uploadFile({
									url:`${app.globalData.Requestpath}common/uploadImage?type=user`,
									method:"POST",
									filePath:this.imgList[1],
									name:'file',
									fileType:"image",
									success(resimg2){
										if(JSON.parse(resimg2.data).code==0){
											let resdata2 = JSON.parse(resimg.data).data.src
											// resdata//这是返回了第一次图片
											//发起请求
											uni.request({
												url:`${app.globalData.Requestpath}user/submitRealNameAuthentication`,
												method:"POST",
												data:{
													token:_this.tokey,
													real_name:name,
													id_card:idcard,
													fphoto:resdata,
													rphoto:resdata2
												},
												success:(resjieguo)=>{
													if(resjieguo.data.code){//提交成功
														_this.hideModal()
														uni.showToast({
															title:"认证成功",
															icon:"none"
														})
													}
												}
											})
										}
									}
								})
							}
						}
					})
					
				}
			}
		},
		props:["tokey"]
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
