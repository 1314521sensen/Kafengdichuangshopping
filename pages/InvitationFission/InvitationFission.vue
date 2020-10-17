<template>
	<view class="InvitationFission">
		<view class="Fission-top" :style="{'background-image':'url('+this.$store.state.httpUrl+'fission/fission_top_bg.png'+')'}">
			<view class="Fission-title">
				<view class="returnicon" @tap="returnicon">
					<text class="lg text-gray cuIcon-back return_icon_text"></text>
				</view>
				<view class="title">
					<view class="big-title" :style="{'background-image':'url('+this.$store.state.httpUrl+'fission/big.png'+')'}">
						
					</view>
					<view class="small_title" :style="{'background-image':'url('+this.$store.state.httpUrl+'fission/smail_title.png'+')'}">	
					</view>
				</view>
				<view
					data-target="bottomModal"
					@tap="share_download"
					class="title_store" 
					:style="{'background-image':'url('+this.$store.state.httpUrl+'fission/store.png'+')'}"
				></view>
			</view>
			<view class="Fission_banner">
				<view class="banner" :style="{'background-image':'url('+this.$store.state.httpUrl+'fission/fission_banner.png'+')'}"></view>
			</view>
		</view>
		<view class="Fission_detail_box">
			<view class="Fission_detail_title">
				<view class="Fission_detail_left">
					邀请人数:{{invitation}}人 / {{Number(gold)<=0?0:gold}}金币
				</view>
				<view class="Fission_detail_right">
					<text @tap="rulespropp">规则</text>
					<text style="display:block;margin:0rpx 14rpx;">|</text>
					<text @tap="getdefauils">明细</text>
				</view>
			</view>
			<view class="progressbar">
				<view class="cu-steps">
					<view class="cu-item" :class="item.people_num>=invitation?'':'border_active'"  v-for="(item,index) in numList" :key="index">
					<!-- :class="index==2?'err':''" -->
						<text class="num" :class="invitation>=item.people_num?'num_border_active':''"></text>
						{{item.people_num}}
						<view 
							class="Gift_bag" 
							:style="{'background-image':'url('+imgpath+(item.is_close==0?'fission/Gift_bag.png':'fission/Gift_bag_open.png')+')'}" 
							@tap="receivale"
							v-show="item.status"
							:data-gold_num="item.gold_num"
							:data-people="item.people_num"
							:data-ids="item.id"
							:data-is_close="item.is_close"
							:data-indexs="index"
						></view>
					</view>
				</view>
			</view>
		</view>
		<view class="coupons">
			<view class="coupons_list">
				<!-- <scroll-view class="coupons_srcoll">
					
				</scroll-view> @scrolltolower="couponsscrllow"-->
				<scroll-view :scroll-x="true">
					<view class="coupons_srcoll" :style="{width:(50*couponslist.length)+10+'%'}">
						<view 
							class="coupons_item" 
							v-for="(item,index) in couponslist" 
							:key="index"
							@tap="receiveCoupons"
							:data-cid="item.coupon_type_id"
							:data-cname="item.coupon_name"
							:data-people_num="item.people_num"
							:data-money="item.money"
						>
							<view class="coupons_left" :style="{'background-image':'url('+imgpath+'fission/coupons_bg.png'+')'}">
								<text class="moneyicon">¥</text>
								<text class="money">{{item.money}}</text>
							</view>
							<view class="coupons_right">
								<view class="coupons_instructions">
									<view class="coupons_instructions_top">
										<text v-show="item.at_full!==0">满</text>
										<text class="money_text">{{item.at_full!==0?item.at_full:'无门槛使用'}}</text>
										<text v-show="item.at_full!==0">使用</text>
									</view>
									<!-- <text class="coupons_time">使用时间:111-1111</text> -->
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="coupons_title">
				<view class="coupons_bg" @tap="fissionSubsidiary">
					消耗金币 兑换优惠券 》》》
				</view>
			</view>
		</view>
		<view class="shoplist">
			<view 
				class="shop_item" 
				v-for="(item,index) in shoplist" 
				:key="index"
				:data-gid="item.good_id"
				:data-sid="item.store_id"
				@tap="shopinfodefault"
			>
				<view class="item_left">
					<image :src="httpimg+item.good_pic" class="item_imgs"></image>
				</view>
				<view class="item_right">
					<view class="shop_title">
						{{item.good_title}}
					</view>
					<view class="receive">
						<text class="receive_text">{{Number(item.good_promotion_price)}}个金币可免费领取</text>
					</view>
					<view class="receive_num">
						已兑换{{item.sale_num}}件
					</view>
					<view class="shop_store">
						<text 
							class="lg text-gray cuIcon-share"
							@tap.stop="share"
							:data-good_img="item.good_pic"
							:data-gid="item.good_id"
							:data-sid="item.store_id"
							:data-price="item.good_promotion_price"
							:data-shoptitle="item.good_title"
						></text>
					</view>
					<view class="snap_up">
						<view class="snap_up_left">
							<text class="Present_price">¥{{item.good_promotion_price}}</text>
							<text class="original_price">¥{{item.good_marketprice}}</text>
						</view>
						<view class="snap_up_right">
							<text>立即抢购</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="popupWindow" v-show="receivebool">
			<view class="receive_bg" :style="{'background-image':'url('+imgpath+'fission/receive_bg.png'+')'}">
				<view class="receive_title">
					恭喜您获得{{gold_num}}个金币
				</view>
				<view class="receive_img">
					<image :src="imgpath+'fission/receive_bg_img.png'" class="imgs"></image>
				</view>
				<view class="receive_bottom">
					<view 
						class="btn" 
						:style="{'background-image':'url('+imgpath+'fission/receivebtn.png'+')'}"
						@tap="hiddenale"
					>
						知道了
					</view>
				</view>
			</view>
		</view>
		<view class="popuprules" v-show="rulesbool">
			<view class="rules_box">
				<view class="rules_bg">
					<view class="rules_placeholder"></view>
					<scroll-view class="rules_scroll" :scroll-y="true">
						<view>
							<view class="">
								1.金币获取渠道：好友通过您分享的链接下载惠播客app，<text class="bold">好友注册时，推荐人需填写您的手机号</text>，注册成功您将获得相应的金币奖励。同时，我们放置了宝箱，您邀请好友达到宝箱所在的位置，手动开启宝箱将获得赠送给您的额外金币奖励。
							</view>
							<view class="">
								2.金币使用：兑换优惠券(不限量) ，兑换商品；
							</view>
							<view class="">
								3.如兑换商品退还，金币不退回；
							</view>
							<view class="">
								4.本活动最终解释权在法律允许范围内归惠播客所有，一旦发现恶意刷取金币行为，惠播客有权收回已发放的金币，并取消或收回利用金币参与活动获取的任何奖励；
							</view>
						</view>
					</scroll-view>
					<button class="btn" @tap="rulesKnow">知道了</button>
				</view>
				<view class="rules_title" :style="{'background-image':'url('+imgpath+'fission/rules.png'+')'}">
					活动规则
				</view>
			</view>
		</view>
		<QRcodeA :isCode="isCode"  @cancel="cancel" v-if="isCode"></QRcodeA>
		<view class="cu-modal bottom-modal"  @tap="hideModal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="title">
					<text>——— 分享到 ———</text>
				</view>
				<view class="padding-xl">
					<view class="wxshore" >
						<view 
							class="wxstoreicon" 
							v-for="(item,index) in storewxyuan" 
							:key="index"
							@tap="storewx"
							:data-indexs="index"
						>
							<image :src="item.imgs" class="imgs"></image>
							<view>{{item.text}}</view>
						</view>
					</view>
				</view>
				<view class="close"  @tap="hideModal">
					<text>取消</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import QRcodeA from '@/components/QRcodeA/QRcodeA.vue'
	const app = getApp()
	export default {
		data() {
			return {
				numList:[],
				num: 0,
				imgpath:this.$store.state.httpUrl,
				httpimg:this.$store.state.imgyuming,
				receivebool:false,
				rulesbool:false,
				gold_num:0,//当用户点击了 宝箱以后 打开后获得金币量
				invitation:0,//在缓存中取出邀请的人数
				gold:0,//在缓存中取出邀请的金币
				couponspage:1,
				couponslist:[],
				shoplistpage:1,
				shoplist:[],
				isCode:false,
				modalName: null,
				storewxyuan:[
					{
						imgs:this.$store.state.httpUrl+'fission/wxchat.png',
						text:"微信好友"
					},
					{
						imgs:this.$store.state.httpUrl+'fission/wxfriends.png',
						text:"微信朋友圈"
					}
				],
				storesource:"",//分享到哪
			}
		},
		methods: {
			cancel(e) {
				// console.log(1111)
				this.isCode = false
			},
			hideModal(e) {
				this.modalName = null
			},
			share_download(e){
				const _this = this
				_this.modalName = e.currentTarget.dataset.target
				//下面是分享海报的
				// uni.getStorage({
				// 	key:"bindtokey",
				// 	success(restokey) {
				// 		app.globalData.Detectionupdatetokey(restokey.data)
				// 		_this.isCode = true
				// 	},
				// 	fail(err){
				// 		uni.navigateTo({
				// 			url:"/pages/login/login"
				// 		})
				// 	}
				// })
			},
			storewx(e){
				const _this = this
				let {indexs} = e.currentTarget.dataset;
				if(parseInt(indexs)==0){
					_this.storesource = "WXSceneSession"
				}else{
					_this.storesource = "WXSenceTimeline"
				}
				uni.share({
					provider: "weixin",
					scene:_this.storesource,
					// type: 2,
					// imageUrl:_this.$store.state.httpUrl + 'Webpageindex/shorewx.jpg',
					type: 1,
					summary: "窝距离拥有金矿还有多久啊http://hbk.huiboke.com/uploads/app/image/Webpageindex/Webpageindex.html",
					success: function(res) {
						// console.log("success:" + JSON.stringify(res), 111);
						_this.$emit('cancel')
					}, 
					fail: function(err) {
						// console.log("fail:" + JSON.stringify(err), 2222);
					}
				});
				// this.storesourcebool = false
				// this.longtap()
			},
			NumSteps() {
				this.num= this.num == this.numList.length - 1 ? 0 : this.num + 1				
			},
			rulespropp(){
				this.rulesbool = true
			},
			rulesKnow(){
				this.rulesbool = false
			},
			//跳转到兑换页面
			fissionSubsidiary(){
				uni.navigateTo({
					url:`/pages/exchangecoupons/exchangecoupons`
				})
			},
			//跳转到 明细页面
			getdefauils(){
				uni.navigateTo({
					url:`/pages/FissionConsumption/FissionConsumption`
				})
			},
			returnicon(){
				uni.navigateBack()
			},
			receivale(e){
				const _this = this
				// console.log(e.currentTarget.dataset)
				let {gold_num,people,ids,is_close,indexs} = e.currentTarget.dataset;
				// console.log(is_close)
				uni.getStorage({
					key:"bindtokey",
					success(restokey){
						if(Number(_this.invitation)>=Number(people)){
							if(parseInt(is_close)==0){
								// this.receivebool = true
								// //将金币量转为num类型
								// this.gold_num = Number(gold_num)
								uni.request({
									url:`${app.globalData.Requestpath}activity/addUserBoxRecord`,
									method:"POST",
									data:{
										token:restokey.data,
										box_id:ids,
										gold_num:gold_num
									},
									success(res) {
										// console.log(res)
										if(res.data.code==0){
											_this.receivebool = true
											_this.gold_num = Number(gold_num)
											_this.numList[indexs].is_close = 1
											uni.setStorage({
												key:"Fission_Gold",
												data:res.data.data.new_gold,
												success() {
													_this.gold = res.data.data.new_gold
												}
											})
										}else{
											_this.receivebool = false
											app.globalData.showtoastsame(res.data.msg)
										}
									}
								})
							}else{
								app.globalData.showtoastsame("宝箱已开启")
							}
						}else{
							app.globalData.showtoastsame("邀请人数未达到要求")
						}
					},
					fail(err){
						uni.navigateTo({
							url:"/pages/login/login"
						})
					}
				})
			},
			hiddenale(){
				this.receivebool = false
			},
			getChestList(){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(restoken){
						uni.request({
							url:`${app.globalData.Requestpath}activity/getChestList`,
							method:"POST",
							data:{
								page:1,
								pageSize:5,
								token:restoken.data
							},
							success(res) {
								// console.log(res)
								if(res.data.code==0){
									_this.numList = res.data.data.list
								}
							}
						})
					}
				})
			},
			//获取优惠券列表
			getGoldBoxList(){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}activity/getGoldBoxList`,
					method:"POST",
					data:{
						page:_this.couponspage,
						pageSize:2
					},
					success(rescoupons) {
						// console.log(rescoupons)
						if(rescoupons.data.code==0){
							if(_this.couponspage>1){
								_this.couponslist = _this.couponslist.concat(rescoupons.data.data.list)
							}else{
								_this.couponslist = rescoupons.data.data.list
							}
						}
					}
				})
			},
			//领取优惠券
			receiveCoupons(e){
				const _this = this 
				// console.log(e)
				let {cid,cname,people_num,money} = e.currentTarget.dataset
				if(Number(_this.gold)>=Number(money)){
					uni.getStorage({
						key:'bindtokey',
						success(restoken){
							app.globalData.Detectionupdatetokey(restoken.data)
							uni.showModal({
								title:"您确定要兑换此优惠券",
								content:"领取了将扣除相应金币",
								showCancel:true,
								cancelText:"取消",
								cancelColor:"#f00",
								confirmText:"确定",
								confirmColor:"#0f0",
								success(resbtn) {
									if(resbtn.confirm){
										uni.request({
											url:`${app.globalData.Requestpath}activity/userGetGoldBoxCoupon`,
											method:"POST",
											data:{
												token:restoken.data,
												cid,
											},
											success(res) {
												// console.log(res)
												if(res.data.code==0){
													app.globalData.showtoastsame(res.data.msg)
													uni.request({
														url:`${app.globalData.Requestpath}activity/addUserRecord`,
														method:"POST",
														data:{
															token:restoken.data,
															coupon_id:cid,
															coupon_name:cname,
															type:2,
															gold_num:people_num
														},
														success(resadd) {
															if(resadd.data.code==0){
																uni.setStorage({
																	key:"Fission_Gold",
																	data:resadd.data.data.new_gold,
																	success() {
																		_this.gold = resadd.data.data.new_gold
																	}
																})
															}
														}
													})
												}else{
													app.globalData.showtoastsame(res.data.msg)
												}
											}
										})
									}
								}
							})
							
						},
						fail(err){
							uni.navigateTo({
								url:`/pages/login/login`
							})
						}
					})
				}else{
					app.globalData.showtoastsame("当前的金币数量无法兑换")
				}
			},
			//当优惠券滚动到右边的时候
			// couponsscrllow(){
			// 	// this.couponspage++
			// 	this.getGoldBoxList()
			// },
			//这是金币兑换的列表
			getExchangeGoodsList(){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}activity/getExchangeGoodsList`,
					method:"GET",
					data:{
						page:_this.shoplistpage,
						pageSize:10
					},
					success(res) {
						// console.log(res)
						if(res.data.code==0){
							if(_this.shoplistpage>1){
								_this.shoplist = _this.shoplist.concat(res.data.data.list) 
							}else{
								_this.shoplist = res.data.data.list
							}
						}
					}
				})
			},
			//点击商品进入详情页
			shopinfodefault(e){
				// console.log(e)
				let {gid,sid} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Details/Details?id=${gid}&storeid=${sid}&fissiontype=4`
				})
			},
			share(e){
				let {good_img,gid,sid,price,shoptitle} = e.currentTarget.dataset
				uni.getStorage({
					key:"bindtokey",
					success(res) {
						app.globalData.Detectionupdatetokey(res.data)
						uni.setStorage({
							key:"indexstore",
							data:{
								good_img,
								gid,
								sid,
								price,
								shoptitle
							},
							success() {
								uni.navigateTo({
									url:`/pages/shareshop/shareshop`
								})
							}
						})
					},
					fail(err){
						uni.navigateTo({
							url:`/pages/login/login`
						})
					}
				})
			}
		},
		
		onReachBottom(){
			this.shoplistpage++
			this.getExchangeGoodsList()
		},
		created() {
			this.getChestList()
			this.getExchangeGoodsList()
		},
		onShow() {
			const _this = this
			_this.NumSteps()
			_this.getGoldBoxList()
			uni.getStorage({
				key:`Fission_invitation`,
				success(resinvitation){
					// console.log(resinvitation)
					_this.invitation = resinvitation.data
				}
			})
			//Fission_Gold
			uni.getStorage({
				key:`Fission_Gold`,
				success(resGold){
					// console.log(resinvitation)
					_this.gold = resGold.data
				}
			})
		},
		components:{
			QRcodeA
		}
	}
</script>

<style lang="less" scoped>
	.cu-dialog{
		// height: 300rpx;
		.title{
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 30rpx;
		}
		.close{
			height: 100rpx;
			line-height: 100rpx;
			background-color: #dcdcdc;
			font-size: 40rpx;
		}
	}
	.wxshore{
		display:flex;
		justify-content: left;
		width: 100%;
		font-size: 24rpx;
		.wxstoreicon{
			margin-right: 40rpx;
			.imgs{
				width: 70rpx;
				height:70rpx;
			}
		}
	}
	.InvitationFission{
		// overflow: hidden;
		background-color: #fff;
		// height:100vh;
		.Fission-top{
			border-top:1rpx solid #fff;
			height:400rpx;
			// background-color:yellow;
			//这里为了存放背景图片
			background-size: 100% 100%;
			background-repeat:no-repeat;
			.Fission-title{
				display:flex;
				justify-content:space-around;
				// margin-top:52rpx;
				// margin-bottom:14rpx;
				margin:52rpx 0 14rpx;
				.returnicon{
					display:flex;
					justify-content: center;
					align-items: center;
					width: 70rpx;
					height:70rpx;
					background-color:#fff;
					border-radius:50%;
					.return_icon_text{
						color:#feaa21;
						font-size: 30rpx;
						font-size: 48rpx;
						font-weight: bold;
					}
				}
				.title{
					flex:.8;
					display: flex;
					flex-wrap:wrap;
					justify-content: center;
					// background-color:pink;
					.big-title{
						width: 100%;
						height:70rpx;
						background-size:100% 100%;
						background-repeat: no-repeat;
						margin-bottom:28rpx;
					}
					.small_title{
						width: 70%;
						height:30rpx;
						background-size:100% 100%;
						background-repeat: no-repeat;
					}
				}
				.title_store{
					width:70rpx;
					height:70rpx;
					// background-color:green;
					background-size:100% 100%;
					background-repeat: no-repeat;
				}
			}
			.Fission_banner{
				display:flex;
				justify-content: center;
				.banner{
					width: 82%;
					height:276rpx;
					// background-color:green;
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.Fission_detail_box{
			// height:100rpx;
			// background-color:green;
			margin-top:90rpx;
			.Fission_detail_title{
				display:flex;
				justify-content: space-between;
				padding:10rpx 48rpx 0;
				.Fission_detail_left{
					flex:1;
					font-weight: bold;
					font-size: 34rpx;
					vertical-align: middle;
				}
				.Fission_detail_right{
					display:flex;
					// width: 20rpx;
					padding:10rpx;
					background-color: #ffba56;
					border-radius:12rpx;
					box-shadow: 0 2rpx 6rpx #999;
					color:#fff;
				}
			}
			.progressbar{
				// width: 50rpx;
				// height:100rpx;
				// background-color: red;
				margin-top:20rpx;
				.cu-item:first-child{
					
					&::before{
						border-bottom:0 !important;
					}
				}
				.cu-steps .cu-item::before{
					    content: "";
					    display: block;
					    position: absolute;
					    height: 0px;
					    width: calc(100% - 22px);
					    border-bottom: 3px solid #ccc;
					    left: calc(0px - (100% - 25px) / 2);
					    top: 20px;
					    z-index: 0;
				}
				.cu-steps .border_active::before{
					content: "";
					display: block;
					position: absolute;
					height: 0px;
					width: calc(100% - 22px);
					border-bottom: 3px solid red;
					left: calc(0px - (100% - 25px) / 2);
					top: 20px;
					z-index: 0;
				}
				.cu-steps .cu-item .num_border_active{
					border-color:red;
				}
				.Gift_bag{
					width: 50rpx;
					height:50rpx;
					// background-color: red;
					margin:10rpx auto 0;
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}
			}
		}
		.coupons{
			// height:100rpx;
			// background-color: yellow;
			margin-top:30rpx;
			background-color:#ffba56 ;
			padding:40rpx 0;
			.coupons_list{
				.coupons_srcoll{
					display:flex;
					
					.coupons_item{
						display:flex;
						width: 50%;
						background-color: #fff1bb;
						margin-right:20rpx;
						overflow: hidden;
						&:last-child{
							margin-right:0;
						}
						.coupons_left{
							display:flex;
							justify-content: center;
							align-items: center;
							width:42%;
							// height:100rpx;
							// background-color: red;
							background-size:100% 100%;
							background-repeat: no-repeat;
							color:#fff;
							.money{
								font-size: 40rpx;
								font-weight: bold;
							}
							.moneyicon{
								font-size: 28rpx;
								// margin-top:14rpx;
								// margin-right:6rpx;
								margin:20rpx 6rpx 0 0;
							}
						}
						.coupons_right{
							display:flex;
							align-items: center;
							justify-content: center;
							flex:1;
							padding:36rpx 0rpx;
							// background-color: green;
							.coupons_instructions{
								.coupons_instructions_top{
									display:flex;
									font-weight: bold;
									font-size:32rpx;
									color:#5a5743;
									.money_text{
										margin-top:6rpx;
										color:#9b4100;
									}
								}
								.coupons_time{
									color:#7e775a;
									font-size: 24rpx;
									// white-space: nowrap; 
									// overflow: hidden;
									// text-overflow:ellipsis;
								}
							}
						}
					}
				}
			}
			.coupons_title{
				display:flex;
				justify-content: center;
				margin-top:48rpx;
				.coupons_bg{
					width: 60%;
					text-align: center;
					font-size:31rpx;
					color:#fff;
					font-weight: bold;
					// height:100rpx;
					// border-radius:10%;
					padding: 20rpx 8rpx;
					background-image:linear-gradient(to right,#ff165b 15%,#fe6827 20%,#fee000 50%);
					border-radius:40rpx;
				}
			}
		}
		.shoplist{
			.shop_item{
				display:flex;
				margin-bottom:12rpx;
				border:6rpx solid #fd6121;
				&:last-child{
					margin-bottom:0;
				}
				.item_left{
					width: 40%;
					height:340rpx;
					background-color: red;
					border-right:6rpx solid #fd6121;
					.item_imgs{
						width: 100%;
						height:100%;
					}	
				}
				.item_right{
					flex:1;
					padding:0 20rpx;
					// background-color: green;
					.shop_title{
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						margin-top:6rpx;
					}
					.receive{
						color:#fff;
						margin:30rpx 0rpx;
						.receive_text{
							padding:15rpx 10rpx;
							background-color: red;
						}
					}
					.receive_num{
						font-size: 24rpx;
						color:#b0b0b0;
					}
					.shop_store{
						display: flex;
						margin:20rpx 0;
						justify-content:flex-end;
					}
					.snap_up{
						display: flex;
						justify-content: space-between;
						.snap_up_left{
							flex:1;
							text{
								display: block;
							}
							.Present_price{
								font-weight: bold;
								color:red;
								font-size:32rpx;
							}
							.original_price{
								font-size: 24rpx;
								color:#c8c8c8;
								text-decoration:line-through
							}
						}
						.snap_up_right{
							text{
								padding:10rpx 20rpx;
								border:2rpx solid red;
								border-radius:32rpx;
								color:red;
							}
						}
					}
				}
			}
		}
		.popupWindow{
			display:flex;
			justify-content: center;
			align-items: center;
			position:fixed;
			top: 0;
			left:0;
			background-color:rgba(0,0,0,.5);
			width: 100%;
			height:100%;
			.receive_bg{
				width: 70%;
				// height:300rpx;
				background-color:#fff;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				.receive_title{
					text-align:center;
					// margin-top:34rpx;
					font-size: 32rpx;
					// margin-bottom:26rpx;
					margin:34rpx 0 50rpx 0;
				}
				.receive_img{
					width: 50%;
					height:280rpx;
					// background-color: pink;
					margin:0 auto;
					.imgs{
						width: 100%;
						height:100%;
					}
				}
				.receive_bottom{
					display:flex;
					justify-content: center;
					margin:40rpx 0;
					.btn{
						padding:10rpx 30rpx;
						// background-color: red;
						border-radius:16rpx;
						color:#fff;
						background-size: 100% 100%;
						background-repeat: no-repeat;
					}
				}
			}
		}
		.popuprules{
			display:flex;
			justify-content: center;
			align-items:center;
			position: fixed;
			top:0;
			left:0;
			width: 100%;
			height:100vh;
			background-color: rgba(0,0,0,.5);
			.rules_box{
				position: relative;
				width:80%;
				height:60vh;
				background-color: #fff;
				padding:10rpx;
				.rules_bg{
					height:100%;
					border:2rpx solid rgb(239,236,231);
					background-color:rgb(255,252,253);
					.rules_placeholder{
						height:70rpx;
					}
					.rules_scroll{
						height:43vh;
						padding:0 10rpx;
						// background-color: yellow;
						font-size:34;
						color:#6d6c58;
						text{
							font-weight: bold;
							color: #FF0000;
						}
					}
					.btn{
						width:90%;
						background-color: #fff;
						color:#ff5c0e;
						border:2rpx solid #ff5c0e;
						border-radius:50rpx;
						margin-top:20rpx;
					}
				}
				.rules_title{
					display:flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					top:-6rpx;
					left:25%;
					background-size: 100%;
					background-repeat: no-repeat;
					width: 50%;
					height:70rpx;
					font-size: 34rpx;
					color:#fff;
					font-weight: bold;
					// background-color: red;
					
				}
			}
		}
	}
</style>
