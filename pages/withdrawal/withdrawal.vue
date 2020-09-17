<template>
	<view class="withdrawal">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbarwei></actionbarwei>
		<view class="current_balance_box">
			<view class="current_balance_top">
				<view class="current">当前的余额</view>
				<view class="current_balance_plice">
					<text class="balanceicon">¥</text>
					<text class="plicetext">{{user_commission}}</text>
				</view>
			</view>
			<view class="Withdrawal_way">
				<view class="Withdrawal_way_text">提现方式</view>
				<view class="Withdrawal">
					<text class="Withdrawal_text border_active">
						账户余额
					</text>
				</view>
			</view>
			<view class="Withdrawal_plice">
				<view class="Withdrawal_plice_title">
					提现金额
				</view>
				<view class="Withdrawal_plice_list">
					<view 
						class="plice_texts" 
						v-for="(item,index) in plice_list" 
						:key="index" 
						:class="checkindex==index?'border_active':''"
						@tap="plice_item"
						:data-indexs="index"
						
					>
						{{item.name}}元
					</view>
				</view>
			</view>
			<view class="custom">
				<text class="custom_text">其他金额:</text>
				<input 
					v-model="values" 
					class="inp"
					@focus="focus"
					@blur="blur"
				/>
			</view>
			<view class="immediately">
				<button @tap="immediately">立即提现</button>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import actionbarwei from "@/components/actionbar/actionbarwei.vue"
	export default {
		data() {
			return {
				plice_list:[
					{
						name:10,
						checkbox:false,
					},
					{
						name:20,
						checkbox:false,
					},
					{
						name:30,
						checkbox:false,
					},
					{
						name:60,
						checkbox:false,
					},
					{
						name:80,
						checkbox:false,
					},
					{
						name:100,
						checkbox:false,
					},
				],
				values:"",
				statusBar:0,
				checkindex:-1,
				inpvalue:"",
				user_commission:0
			}
		},
		methods: {
			plice_item(e){
				
				let {indexs} = e.currentTarget.dataset
				// console.log(indexs)
				this.checkindex = indexs
				this.inpvalue = this.plice_list[indexs].name
			},
			focus(){
				this.inpvalue = ""
				this.checkindex = -1
			},
			blur(){
				// console.log(this.values)
				this.inpvalue = this.values
			},
			immediately(){
				const _this = this
				// && _this.inpvalue >0 && _this.inpvalue!==""
				if(_this.checkindex!==-1 || (_this.inpvalue >0 && _this.inpvalue!=="")){
					if(Number(_this.inpvalue) <= Number(_this.user_commission)){
						uni.getStorage({
							key:"bindtokey",
							success(res){
								uni.showModal({
									title:"将佣金提现到余额",
									content:"确定要提现吗?",
									showCancel:true,
									cancelText:"取消",
									cancelColor:"#ff0000",
									confirmText:"确定提现",
									confirmColor:"#00ff00",
									success(restext) {
										if(restext.confirm){
											uni.request({
												url:`${app.globalData.Requestpath}user/commission_withdrawal_balance`,
												method:"POST",
												data:{
													token:res.data,
													amount:Number(_this.inpvalue)
												},
												success(res){
													// console.log(res)
													if(res.data.code==0){
														_this.user_commission = (Number(_this.user_commission) - Number(_this.inpvalue)).toFixed(2)
														// //将佣金加入到缓存
														uni.setStorage({
															key:"user_commission",
															data:_this.user_commission
														})
														app.globalData.showtoastsame("提现成功")
													}else{
														app.globalData.showtoastsame(res.data.msg)
													}
												}
											})
										}
									}
								})
								
							}
						})
					}else{
						app.globalData.showtoastsame("提现金额大于已有金额")
					}
				}else{
					return app.globalData.showtoastsame("请选择提现金额")
				}
			}
		},
		components:{
			actionbarwei
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		},
		created() {
			const _this = this
			 // this.indexshoplist(this.page)
			 uni.getStorage({
				 key:"user_commission",
				 success(res){
					 // _this.user_commission = res.data
					 _this.user_commission = res.data
				 }
			 })
		}
	}
</script>

<style lang="less" scoped>
	.withdrawal{
		height:100vh;
		background-color: #fff;
		.current_balance_box{
			padding:0 20rpx;
			.current_balance_top{
				overflow:hidden;
				// height:100rpx;
				background-color:rgb(229,229,229);
				padding:0 0 20rpx 20rpx;
				.current{
					margin:20rpx 0;
				}
				.current_balance_plice{
					display: flex;
					font-size: 40rpx;
					font-weight: bold;
					.balanceicon{
						display:inline-block;
						margin:10rpx 20rpx 0 0;
					}
					.plicetext{
						display:block;
					}
				}
			}
			.Withdrawal_way{
				// height:100rpx;
				// background-color:green;
				margin-top:20rpx;
				.Withdrawal_way_text{
					font-size: 34rpx;
					font-weight: bold;
					margin-bottom:20rpx;
				}
				.Withdrawal{
					.Withdrawal_text{
						width: 150rpx;
						// line-height:50rpx;
						padding:10rpx 30rpx;
					}
				}
			}
			.Withdrawal_plice{
				// height:200rpx;
				// background-color:green;
				margin-top:50rpx;
				.Withdrawal_plice_title{
					font-weight: bold;
					font-size: 34rpx;
				}
				.Withdrawal_plice_list{
					display:flex;
					flex-wrap:wrap;
					justify-content: space-between;
					.plice_texts{
						width: 30%;
						text-align:center;
						padding:20rpx 0;
						border:2rpx solid #999;
						margin-top: 20rpx;
						font-weight: bold;
						font-size: 30rpx;
					}
				}
			}
			.custom{
				display:flex;
				margin-top:30rpx;
				background-color: #f2f2f2;
				padding: 20rpx 0;
				.custom_text{
					font-weight: bold;
					margin:0 20rpx;
					font-size: 30rpx;
				}
				.inp{
					flex:1;
					font-size: 30rpx;
				}
			}
			.immediately{
				margin-top:50rpx;
				button{
					width:70%;
					line-height:1;
					padding:20rpx 0;
					border-radius:40rpx;
					background-color: rgb(241,164,64);
					color:#fff;
				}
			}
		}
	}
	.border_active{
		border:2rpx solid rgb(252,177,58) !important;
		background-color:rgb(251,251,243);
	}
</style>
