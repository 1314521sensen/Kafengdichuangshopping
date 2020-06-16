<template>
	<view class="contractsingbox">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="合同签订及缴费" :Jumpchoose="true"></actionbar>
		<view class="contractsing">
			<view class="contractsingTop">
				<view class="contractsingtitle">
					实名认证信息
				</view>
				<view class="cu-form-group" v-for="(item,index) in contractsingToplist" :key="index">
					<view class="title">{{item.titlename}}</view>
					<view class="inp" :style="{width:item.widthpx+'rpx'}">
						<input :placeholder="item.placeholdername" name="input" placeholder-class="placeholdername"></input>
					</view>
				</view>
				<view class="Uploadinformation">
					<view class="Uploadinformationitem" v-for="(itemcard,indexcard) in cardlist" :key="indexcard">
						<view class="informationitem-text">{{itemcard.itemname}}</view>
						<view class="cu-form-group">
							<view class="grid col-4 grid-square flex-sub">
								<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
								 <image :src="imgList[index]" mode="aspectFill"></image>
									<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
										<text class='cuIcon-close'></text>
									</view>
								</view>
								<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
									<text :style="{'background-image':'url('+itemcard.bgurl+')'}"></text>
								</view>
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
						<input :placeholder="item.placeholdername" name="input" placeholder-class="placeholdername"></input>
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
						<text>账户:88888888888888888888</text>
						<text>公司名称:山东卡风迪创信息科技有限公司</text>
						<text>客服电话:0534-7058558</text>
					</view>
				</view>
				<view class="Uploaddocuments">
					<view class="Uploaddocuments-left">
						上传支付凭证:
					</view>
					<view class="Uploaddocuments-right">
						<view class="cu-form-group">
							<view class="grid col-4 grid-square flex-sub">
								<view class="bg-img" v-for="(item,index) in Uploaddocumentslist" :key="index" @tap="ViewImage" :data-url="Uploaddocumentslist[index]">
								 <image :src="Uploaddocumentslist[index]" mode="aspectFill"></image>
									<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
										<text class='cuIcon-close'></text>
									</view>
								</view>
								<view class="solids" @tap="ChooseImage" v-if="Uploaddocumentslist.length<1">
									<text class='cuIcon-cameraadd'></text>
								</view>
							</view>
						</view>
						<view class="beizhu">
							<text>备注:</text>
							<input type="text" class="beizhuinp" />
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
				contractsingToplist:[
					{
						titlename:"姓名:",
						placeholdername:"请输入姓名",
						widthpx:200
					},
					{
						titlename:"身份证:",
						placeholdername:"请输入身份证号",
						widthpx:400
					}
				],
				cardlist:[
					{
						itemname:"身份证正面",
						bgurl:"/static/carddianpu/cardzheng.png"
					},
					{
						itemname:"身份证反面",
						bgurl:"/static/carddianpu/cardfan.png"
					}
				],
				middenlist:[
					{
						titlename:"卖家账号:",
						placeholdername:"请输入卖家账号"
					},
					{
						titlename:"店铺名称:",
						placeholdername:"请输入店铺名称"
					},
					{
						titlename:"店铺等级:",
						placeholdername:"请输入店铺等级"
					},
					{
						titlename:"开店时长:",
						placeholdername:"请输入开店时长"
					},
					{
						titlename:"店铺分类:",
						placeholdername:"请输入店铺分类"
					},
					{
						titlename:"应付总金额:",
						placeholdername:"0元"
					},
					{
						titlename:"经营类目:",
						placeholdername:"请输入经营类目"
					},
					{
						titlename:"审核状态:",
						placeholdername:"请输入审核状态"
					},
					{
						titlename:"审核意见:",
						placeholdername:"请输入审核意见"
					},
				],
				imgList:[],//上传身份证的数组
				Uploaddocumentslist:[],//上传凭证的数组
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
					count: 1, //默认9
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
			Submitapplication(){
				uni.redirectTo({
					url:"/pages/Successfulopening/Successfulopening"
				})
			}
		},
		components:{
			actionbar,
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.contractsingbox{
		background-color:#f2f2f2;
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
							flex:1;
							border-bottom:2rpx solid #ccc;
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
