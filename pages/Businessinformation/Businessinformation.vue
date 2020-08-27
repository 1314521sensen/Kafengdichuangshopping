<template>
	<view class="Businessinformation">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar 
			message="店铺经营信息" 
			:Jumpchoose="true" 
			:url="`/pages/Qualificationinformation/Qualificationinformation?titlename=${businesstype?'enterprises':'Individuals'}`"></actionbar>
		<view class="Businessbox">
			<view class="Businessmidden">
				<view class="Business-title">店铺经营信息</view>
				<view class="Business-bottom">
					<view class="cu-form-group BusinessPadding">
						<view class="title">店铺名称:</view>
						<input placeholder="请输入店铺名称" :disabled="true" name="input" class="inp" placeholder-class="inpplaceholder" v-model="message"></input>
					</view>
					<view class="cu-form-group BusinessPadding">
						<view class="title">店铺等级:</view>
						<bottomModal :list='gold' @indexs="indexs" :loading="loading"></bottomModal>
					</view>
					<view class="cu-form-group BusinessPadding">
						<view class="title">店铺分类:</view>
						<bottomModal :list = 'classifyLisst' @indexs="indexstwo" :loading="loading"></bottomModal>
					</view>
					<view class="cu-form-group BusinessPadding">
						<view class="title">经营项目:</view>
						<!-- <input placeholder="请选择经营项目" name="input" placeholder-class="inpplaceholder"></input> -->
						<operatingItems @selectiondata="selectiondata"></operatingItems>
					</view>
					<!-- <view class="ensuregold">
						保证金:<text class="text-red ensuregoldText" v-text="pricetext"></text>
					</view> -->
				</view>
			</view>
			<button class="Businessbtn" @tap="Businessbtn">下一步</button>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import actionbar from "@/components/actionbar/actionbar.vue"
	import operatingItems from "@/components/operatingItems/operatingItems.vue"
	import bottomModal from "@/components/bottomModal/bottomModal.vue"
	export default {
		data() {
			return {
				gold:[],
				classifyLisst:[],
				message:'',
				level:"",//这是用来接受用户选择的等级
				category:"",//这是用来接受用户选择的分类
				Businesscategorylist:[],//这是用户接受用户选择的经营类目
				strid:"",//这是用来存放用户选择的经营类目的id
				pricetext:0,//这是用来接收后台返回来的价格
				loading:false,
				businesstype:"",//用来存储个人经营 还是企业经营
			}
		},
		methods: {
			Businessbtn(){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(res){
						// if(!_this.pricetext){
						// 	uni.showToast({
						// 		title:"价格不能为0",
						// 		icon:"none"
						// 	})
						// }else{
							if(_this.message!==""){
								//检查店铺名称是否存在
								//这是判断用户选择的不能为空
									if(_this.level!=="" && _this.category!=="",_this.Businesscategorylist.length>0){
										// console.log(_this.businesstype)
										uni.request({
											url:`${app.globalData.Requestpath}store/updateMerchantJoinInfo`,
											method:"POST",
											data:{
												token:res.data,
												store_type:_this.businesstype,
												store_name:_this.message,
												gc_id1:_this.category.gc_id,
												grade_id:_this.level.grade_id,
												gc_ids:_this.strid,
												gc_margin:_this.pricetext
											},
											success(updataresinfo) {
												if(updataresinfo.data.code==0){
													uni.navigateTo({
													url:`/pages/contractsigning/contractsigning?titlename=${_this.businesstype?'enterprises':'Individuals'}`
													})
												}else{
													app.globalData.showtoastsame(updataresinfo.data.msg)
												}
											}
										})
									}else{
										app.globalData.showtoastsame("请填写完整信息")
									}
								}
							// }
					  }
				})
			},
			//这是选择等级返回来的值
			indexs(e){
				// console.log(e.grade_id)
				this.level = e
				//为什么要在这检测  万一用户先选择其他的呢 在选择回来呢
				this.getprice(this.strid,this.level.grade_id)
			},
			//这是选择分类返回的值
			indexstwo(e){
				this.category = e
			},
			//这是选择经营项目返回的值
			selectiondata(e){
				this.Businesscategorylist = e
				// console.log(this.Businesscategorylist[0])
				this.strid = this.Businesscategorylist[0][0].gc_id+'-'+this.Businesscategorylist[1][0].gc_id+"-"+this.Businesscategorylist[2][0].gc_id
				
				//当用户选择完,要检测价格
				this.getprice(this.strid,this.level.grade_id)
			},
			//封装个检测价格的方法
			getprice(gc_ids,grade_id){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(res){
							uni.request({
								url:`${app.globalData.Requestpath}store/getCategoryDeposit`,
								method:"POST",
								data:{
									token:res.data,
									gc_ids:gc_ids,
									grade_id:grade_id
								},
								success(resprice) {
									if(resprice.data.code==0){
										_this.pricetext = resprice.data.data
									}else{
										app.globalData.Logback(res.data.msg)
									}
								}
							})
					}
				})
				
			}
		},
		components:{
			actionbar,
			operatingItems,
			bottomModal
		},
		onLoad(opctrion) {
			this.message = opctrion.storename
			this.statusBar = app.globalData.statusBar
			// console.log(opctrion.titlename)
			if(opctrion.titlename=='Individuals'){
				//证明个人的
				this.businesstype = 0
			}else{
				//否则就是企业的
				this.businesstype = 1
			}
		},
		created(){
			const _this = this
			//"店铺级别"
			uni.request({
				url:`${app.globalData.Requestpath}store/getStoreGrade`,
				success(res){
					if(res.data.code==0){
						// console.log(res)
						_this.gold = res.data.data
						_this.loading = true
					}
				}
			}),
			//一级列表
			uni.request({
				url:`${app.globalData.Requestpath}common/getOneLevelCategoryList`,
				data:{
					pid:0
				},
				success(res){
					// console.log(res)
					if(res.data.code==0){
						_this.classifyLisst = res.data.data
						_this.loading = true
					}
				}
			})
		},
		
	}
</script>

<style lang="less" scoped>
	.Businessinformation{
		height:100vh;
		background-color: #f2f2f2;
		.Businessbox{
			padding:0 20rpx;
			margin-top:30rpx;
			.Businessmidden{
				background-color: #fff;
				box-shadow: 4rpx 2rpx 10rpx #999;
				.Business-title{
					font-size: 34rpx;
					font-weight: bold;
					text-indent:1em;
					border-bottom:2rpx solid #ccc;
					padding:20rpx 0;
				}
				.Business-bottom{
					padding-bottom:50rpx;
					.cu-form-group{
						min-height:80rpx;
						display: flex;
						justify-content: left;
						.title{
							padding-right:0;
						}
						.inp{
							border:2rpx solid #ccc;
							height:60rpx;
							margin-left:20rpx;
						}
						.inpplaceholder{
							font-size:26rpx;
						}
					}
					.BusinessPadding{
						padding:24rpx 0 24rpx 100rpx;
					}
					.ensuregold{
						text-align:center;
						margin-top:34rpx;
						.ensuregoldText{
							font-size: 36rpx;
							margin-left:20rpx;
						}
					}
				}
			}
			.Businessbtn{
				border-radius:92rpx;
				height:80rpx;
				font-size: 30rpx;
				line-height:80rpx;
				color:#fff;
				background-color: #ff5500;
				margin-top:80rpx;
			}
		}
	}
</style>
