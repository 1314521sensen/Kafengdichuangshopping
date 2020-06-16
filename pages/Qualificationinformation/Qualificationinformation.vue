<template>
	<view class="Qualificationinformation">
		<!-- 企业入驻-->
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="店铺资质信息" url="/pages/choosing/choosing" :Jumpchoose="true"></actionbar>
		<view class="enterprises Individuals" v-if="titlename=='enterprises'">
			<view class="Individualsbox">
				<view class="Individualsmidden">
					<view class="Individuals-top">
						营业执照信息
					</view>
					<view class="Individuals-bottom">
						<view class="cu-form-group">
							<view class="title">营业执照号:</view>
							<input placeholder="请输入营业执照号" name="input" class="inp" placeholder-class="placeholdername"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">营业执照所在地:</view>
							<input placeholder="请选择地址" name="input" placeholder-class="placeholdername"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">营业执照有效期:</view>
							<input placeholder="请选择有效期" name="input" placeholder-class="placeholdername"></input>
						</view>
						<view class="cu-form-group enterprises-cu-form-group">
							<view class="title">法定经营范围:</view>
							<textarea 
								placeholder="请输入范围" 
								name="input" 
								placeholder-class="placeholdername"
								class="textarea"
							></textarea>
						</view>
						<view>
							<view class="cu-bar bg-white margin-top">
								<view class="action">
									图片上传
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
							<input :placeholder="item.placeholder" name="input" class="inp" placeholder-class="placeholdername"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">所在地:</view>
							<input placeholder="请选择地址" name="input" placeholder-class="placeholdername"></input>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="Individualsbtn">
			<button @tap="Businessinformation">下一步</button>
		</view>
	</view>
</template>

<script>
	// 企业的两个都需要显示  个人的只显示下面 那个
	import actionbar from "@/components/actionbar/actionbar.vue"
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
					},
					{
						titlename:"详细地址:",
						placeholder:"请输入详细地址",
					},
					{
						titlename:"联系人姓名:",
						placeholder:"请输入联系人姓名",
					},
					{
						titlename:"联系人电话:",
						placeholder:"请输入联系人电话",
					},
					{
						titlename:"电子邮箱:",
						placeholder:"请输入电子邮箱",
					}
				],
				imgList: [],
				titlename:""
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
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			ChooseImage() {
				uni.chooseImage({
					count:1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			Businessinformation(){
				uni.navigateTo({
					url:"/pages/Businessinformation/Businessinformation"
				})
			}
		},
		components:{
			actionbar,
		},
		onLoad(opction) {
			this.titlename = opction.titlename
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
