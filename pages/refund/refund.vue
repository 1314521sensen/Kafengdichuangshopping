<template>
	<view class="refund">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/orderpageRouter/orderpageRouter" :Jumpchoose="true" message="退款/退货退款" bg="#ffffff"></actionbar>
		<view class="commodity_box">
			<view class="commodity" v-for="(item,index) in list" :key="index">
				<view class="image">
					<image :src="imgpath+item.good_pic" mode=""></image>
				</view>
				<view class="title">
					<view class="title-top">
						<text>{{item.good_name}}</text>
					</view>
					<view class="title-bottom">
						<text>价格：￥{{item.good_price}}</text><text>数量：{{item.good_num}}</text>
					</view>
				</view>
			</view>
			
		</view>
		<view class="middle">
			<view class="refund_type_box">
				<view class="refund_type" @tap="showModal" data-target="RadioModal">
					<text class="type_name">服务类型：</text><text>{{typeName}}</text><text class="lg text-gray cuIcon-right"></text>
				</view>
				<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop="">
						<radio-group class="block" @change="RadioChange">
							<view class="cu-list menu text-left">
								<view 
									class="cu-item" 
									v-for="(item,index) in radioList" 
									:key="index"
									:data-genders="item.name"
									:data-type="item.type"
									@tap="radioButton"
								>
									<label class="flex justify-between align-center flex-sub">
										<view class="flex-sub">{{item.name}}</view>
										<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio=='radio' + index?true:false"
										 :value="'radio' + index"></radio>
									</label>
								</view>
							</view>
						</radio-group>
					</view>
				</view>
				<view class="refund_money">
					<text class="type_name">退款金额：</text><text class="money">￥{{price}}</text>
				</view>
				<view class="refund_cause">
					<text class="type_name">退款原因：</text>
					<textarea class="aaa" maxlength="-1" :disabled="modalName!=null" @blur="textareaAInput" placeholder="请输入退款理由"></textarea>
				</view>
			</view>
			<view class="refund_message" v-if="refundtype==2">
				<view class="message_title">
					<text>退货信息</text>
				</view>
				<view class="express_company">
					<text>快递公司：{{e_id}}</text>
				</view>
				<view class="waybill_number">
					<text>快递单号：</text><input placeholder="请填写货运单号" name="input" @blur="waybillNumber"></input>
				</view>
			</view>
		</view>
		<view class="bottom">
			<button class="cu-btn bg-red margin-tb-sm lg" @tap="submit">提交</button>
		</view>
		<paymoney
			@Enterpasswordcompletepayment="Enterpasswordcompletepayment"
			:show="passwordzhifutanchuang" 
			@close="close"
		>
		</paymoney>
	</view>
</template>

<script>
	const app = getApp()
	import paymoney from "@/components/yzc-paykeyboard/yzc-paykeyboard.vue"
	export default {
		data() {
			return {
				
				imgpath:this.$store.state.imgyuming,
				statusBar:28,
				modalName: null,
				textareaBValue:'',
				radio: 'A',
				radioList:[
					{
						name:"退款",
						type:1
					},
					{
						name:"退款退货",
						type:2
					}
				],
				typeName:"请选择退货类型",
				passwordzhifutanchuang:false,
				zhifumimatext:"",
				isIphoneX:false,//Iphone全面屏系列底部适配
				list:[],
				o_sn:'',
				token:'',
				price:0,
				refundtype:1,
				r_text:'',
				e_id:'',
				e_sn:''
			};
		},
		methods:{
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			radioButton(e){
				this.modalName = null
				this.typeName = e.currentTarget.dataset.genders
				this.refundtype = e.currentTarget.dataset.type
			},
			waybillNumber(e){
				const _this = this
				_this.e_sn = e.detail.value
				if(_this.e_sn){
					uni.request({
						url:`${app.globalData.Requestpath}order/getLogisticCompanyInfo`,
						method:"POST",
						data:{
							e_num:_this.e_sn,
							token:_this.token
						},
						success(res) {
							if(res.data.code == 0){
								_this.e_id = res.data.data.express_name
							}
						}
					})
				}
				
			},
			textareaAInput(e){
				this.r_text = e.detail.value
			},
			submit(e){
				if(this.refundtype == 1){
					this.passwordzhifutanchuang = true
				}else if(this.e_id == ''){
					app.globalData.showtoastsame("请填写正确的订单号")
				}else{
					this.passwordzhifutanchuang = true
				}
				
			},
			//当用户输入完密码会将密码传到这里
			Enterpasswordcompletepayment(e){
				const _this = this
				_this.zhifumimatext = e
				let json1 = {
					token:_this.token,
					o_sn:_this.o_sn,
					af_price:_this.price,
					pay_pwd:_this.zhifumimatext,
					r_type:_this.refundtype,
					r_text:_this.r_text
				}
				let json2 = {
					token:_this.token,
					o_sn:_this.o_sn,
					af_price:_this.price,
					pay_pwd:_this.zhifumimatext,
					r_type:_this.refundtype,
					r_text:_this.r_text,
					e_id:_this.e_id,
					e_sn:_this.e_sn
				}
				if(_this.zhifumimatext){
					uni.request({
						url:`${app.globalData.Requestpath}order/applyForRefundOrder`,
						method:"POST",
						data:_this.refundtype == 1?json1:json2,
						success(res) {
							// console.log(res,4255)
							if(res.data.code == 0){
								app.globalData.showtoastsame(res.data.msg)
								_this.passwordzhifutanchuang = false
								// uni.navigateTo({
								// 	url:`/pages/orderpageRouter/orderpageRouter?index=5&is_order=is_order`
								// })
								uni.navigateBack()
							}else if(res.data.code == 1){
								app.globalData.showtoastsame(res.data.msg)
							}
						}
					})
				}
			},
			close(e){
				console.log(e)
				this.passwordzhifutanchuang = e
				this.isIphoneX = e
			},
		},
		onLoad(opction) {
			const _this = this
			_this.statusBar = app.globalData.statusBar
			let {o_sn} = opction
			_this.o_sn = o_sn
			uni.getStorage({
				key:"bindtokey",
				success(res) {
					_this.token = res.data
					uni.request({
						url:`${app.globalData.Requestpath}order/getOrderInfo`,
						method:"POST",
						data:{
							token:res.data,
							sn:o_sn
						},
						success(res) {
							if(res.data.code == 0){
								_this.price = res.data.data.price
							}
							
						}
					})
					uni.request({
						url:`${app.globalData.Requestpath}order/getOrderGoodList`,
						method:"POST",
						data:{
							token:res.data,
							order_sn:o_sn
						},
						success(res) {
							if(res.data.code == 0){
								_this.list = res.data.data.list
								
							}
						}
					})
						
				}
			})
									
		},
		components:{
			paymoney
		}
	}
</script>

<style lang="less" scoped>
	.padding-xl{
		height: 500rpx;
		.radio_list{
			display: flex;
			justify-content: space-between;
			height: 70rpx;
			line-height: 70rpx;
		}
	}
	.refund{
		.commodity_box{
			border-radius: 0 0 20rpx 20rpx;
			overflow: hidden;
			.commodity{
				width: 100%;
				background-color: #FFFFFF;
				display: flex;
				justify-content: left;
				padding: 20rpx;
				.image{
					background-color: #FFFFFF;
					image{
						width: 150rpx;
						height: 150rpx;
					}
				}
				.title{
					padding-left: 20rpx;
					display: flex;
					flex-direction:column;
					justify-content: space-between;
					font-size: 30rpx;
					.title-top{
						overflow:hidden;
						text-overflow:ellipsis;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:2;
						line-height: 40rpx;
					}
					.title-bottom{
						text{
							margin-right: 20rpx;
						}
					}
				}
			}
		}
		
		.middle{
			width: 100%;
			padding: 30rpx 20rpx;
			.refund_type_box{
				width:100%;
				// height: 400rpx;
				background-color: #FFFFFF;
				border-radius: 30rpx;
				padding: 10rpx 30rpx;
				.refund_type{
					height: 88rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					line-height: 88rpx;
					border-bottom: 2rpx solid #e6e6e6;
					.type_name{
						font-size: 34rpx;
					}
					.text-gray{
						font-size: 26rpx;
					}
				}
				.refund_money{
					height: 88rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					line-height: 88rpx;
					border-bottom: 2rpx solid #e6e6e6;
					.type_name{
						font-size: 34rpx;
					}
					.money{
						color: #FF0000;
						font-size: 34rpx;
					}
				}
				.refund_cause{
					width: 100%;
					display: flex;
					justify-content: left;
					margin-top: 20rpx;
					.type_name{
						font-size: 34rpx;
					}
					.aaa{
						width: 70%;
						height: 200rpx;
					}
				}
			}
			.refund_message{
				width: 100%;
				// height: 400rpx;
				background-color: #FFFFFF;
				margin-top: 30rpx;
				border-radius: 30rpx;
				padding: 30rpx 20rpx;
				.message_title{
					height: 70rpx;
					line-height: 70rpx;
					text{
						color: #666666;
						font-size: 34rpx;
					}
				}
				.express_company{
					height: 70rpx;
					line-height: 70rpx;
					text{
						font-size: 34rpx;
					}
				}
				.waybill_number{
					height: 70rpx;
					
					display: flex;
					justify-content: left;
					text{
						font-size: 34rpx;
					}
				}
			}
		}
		.bottom{
			width: 100%;
			padding: 40rpx ;
			.cu-btn{
				width: 100%;
				border-radius: 30rpx !important;
			}
		}
	}
</style>
