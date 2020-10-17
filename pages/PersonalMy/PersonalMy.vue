<template>
	<view>
			<view class="PersonalMy-big-bg">
				<scroll-view
					:scroll-y="true" 
					@scroll="scroll"
					:scroll-top="scrollTop"
					style="height: 100vh;"
				>
					<pageheight :statusBar="statusBar"></pageheight>
					<!-- :amount="amount" :integral="integral" -->
					<information 
						:couponslistdata="couponslistdata" 
						:tokey="tokey" 
						:nickname="nickname" 
						:images="images" 
						:moneylist="moneylist"
						:isvip="isvip"
					></information>
					<orders></orders>
					<!-- <setup></setup> -->
					<view class="Mynine-cell-operation">
						<view class="Mynine-cell-operation-midden">
							<myScratchableLatex></myScratchableLatex>
						</view>
					</view>
					<Selectionrecommended></Selectionrecommended>
					<view
						class="Backtop" 
						@tap="Backtop"
						v-show="scrollTopbool"
					>
						<image 
							:src="this.$store.state.httpUrl+'index/indexone/returntop.png'"
							class="Backtopimage"
						></image>
					</view>
				</scroll-view>
			</view>
			<!-- 绑定openid以后就不让他显示 -->
			<!-- <wxbindopen v-show="openidbool==false"></wxbindopen> -->
			<tabber></tabber>
		
	</view>
	
</template>

<script>
	import orders from "@/components/myPersonal/orders.vue";
	import myScratchableLatex from "@/components/myPersonal/myScratchableLatex.vue";
	import information from "@/components/myPersonal/PersonalInformation.vue";
	// import setup from "@/components/myPersonal/setup.vue"
	//这是精选推荐
	import Selectionrecommended from "@/components/myPersonal/Selectionrecommended.vue"
	//引入绑定微信openid的组件
	import wxbindopen from "@/components/myPersonal/wxbindopnid.vue"
	//引入底部tabbber
	import tabber from "@/components/indexcomponents/indextaber.vue"
	const app = getApp();
	export default {
		//这是个人中心
		data() {
			return {
				statusBar:0,
				couponslistdata:[],
				tokey:"",
				nickname:"",
				images:"",
				amount:0,
				integral:0,
				//这是账户的数据
				moneylist:[
					{
						id:1,
						num:0,
						miao:"账户余额",
						url:"/pages/balance/balance"
					},
					{
						id:2,
						num:0,
						miao:"我的积分",
						url:"/pages/integral/integral"
					},
					{
						id:3,
						num:0,
						miao:"优惠券",
						url:"/pages/Allcoupons/allcoupons"
					}
				],
				openidbool:true,
				isvip:false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				scrollTopbool:false
			}
		},
		components:{
			orders,
			myScratchableLatex,
			information,
			Selectionrecommended,
			wxbindopen,
			tabber
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		methods: {
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
				if(e.detail.scrollTop>100){
					this.scrollTopbool = true
				}else{
					this.scrollTopbool = false
				}
			},
			Backtop(){
				
				this.scrollTop = this.old.scrollTop
				// console.log(this.scrollTop)
				this.$nextTick(function() {
					this.scrollTop = 0
					this.scrollTopbool = false
				});
			}
		},
		onShow(){
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					_this.tokey = res.data
					//这是检测用户是否登录退出
					app.globalData.Detectionupdatetokey(res.data)
					uni.request({
						url:`${app.globalData.Requestpath}user/getUserDetail`,
						method:"POST",
						data:{
							token:_this.tokey
						},
						success(resinfo) {
							// console.log(resinfo)
							if(resinfo.data.code==0){
								let {user_nick,user_pic,user_amount,user_integral,is_commander,is_member,user_sid,user_commission,invite_num,share_code,app_openid,user_gold,invite_all_num} = resinfo.data.data
								
								//  这是列变
								
								// console.log(app_openid)openidbool
								// console.log(user_commission)
								// console.log(is_commander,"是不是团长")
								// console.log(is_member,"是不是会员")
								// console.log(user_nick,user_pic)
								_this.nickname = user_nick
								_this.images = `${_this.$store.state.imgyuming}${user_pic}`
								_this.moneylist[0].num = user_amount
								_this.moneylist[1].num = user_integral
								//判断是不是会员  如果是会员就让头像 v的图片显示
								parseInt(is_member) ? _this.isvip = true : _this.isvip = false
								
								//这里的缓存是不是会员
								uni.setStorage({
									key:'beesVip',
									data:is_member
								})
								//是不是团长加入到缓存
								uni.setStorage({
									key:"beesgrouplong",
									data:is_commander
								})
								//把头像加入到缓存 为了直播中使用
								uni.setStorage({
									key:'userportrait',
									data:user_pic
								})
								//将店铺id保存到缓存中判断用户是不是这个店铺的
								uni.setStorage({
									key:"userstoreid",
									data:user_sid
								})
								//将佣金加入到缓存
								uni.setStorage({
									key:"user_commission",
									data:user_commission
								})
								//将昵称加入到缓存
								uni.setStorage({
									key:"ni_cheng",
									data:user_nick
								})
								//将邀请的人数加入到缓存invite_num
								uni.setStorage({
									key:"invite_num",
									data:invite_num
								})
								//将用户的邀请码加入到缓存
								uni.setStorage({
									key:"share_code",
									data:share_code
								})
								/***这是列变***/
								// //将金币和人数 加入到缓存中
								uni.setStorage({
									key:"Fission_invitation",
									data:invite_all_num,
								})
								uni.setStorage({
									key:"Fission_Gold",
									data:user_gold,
								})
								/**这是列变***/
								//请求用户的手机号和邮箱 如果邮箱有的话就 加入到key为userbindstate的1 没有就是0 为了用户更改邮箱号用
								uni.request({
									url:`${app.globalData.Requestpath}user/getUserBindInfo`,
									method:"POST",
									data:{
										token:_this.tokey
									},
									success(resemail) {
										// console.log(resemail)
										if(resemail.data.code==0){
											let {user_email} = resemail.data.data
											if(user_email){
												uni.setStorage({
													key:"userbindstate",
													data:1
												})
											}else{
												uni.setStorage({
													key:"userbindstate",
													data:0
												})
											}
										}
									}
								})
								// #ifdef APP-PLUS
								if(app_openid){
									// console.log(222)
									_this.openidbool = true
									uni.setStorage({
										key:"bindopenid",
										data:app_openid,
									})
								}else{
									_this.openidbool = false
									uni.setStorage({
										key:"bindopenid",
										data:"",
									})
								}
								// #endif
							}else{
								app.globalData.Requestmethod(resinfo.data.code,resinfo.data.msg)
							}
						}
					})
					//这获取用户的优惠券的数量
					uni.request({
						url: `${app.globalData.Requestpath}activity/getUserCouponList`,
						method: "POST",
						data: {
							token: res.data,
							type: 1,
							page: 1,
							pageSize: 1
						},
						success(res) {
							if (res.data.code == 0) {
								_this.moneylist[2].num = res.data.data.total
							}
						}
					})
				},
				fail(err){
					app.globalData.Detectionupdatetokey(err.data)
				}
			})
		},
		//当用户按手机系统返回的时候
		onBackPress(opction){
			if(opction.from=='backbutton'){
				uni.redirectTo({
					url:`/pages/index/index`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.PersonalMy-big-bg{
		background-color: #F8F8F8 !important;
	}
	.Mynine-cell-operation{
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		.Mynine-cell-operation-midden{
			width: 95%;
			// box-shadow: 2rpx 0px 8rpx 6rpx #c6c6c6;
		}
	}
	.Backtop{
		position: fixed;
		bottom:200rpx;
		right:20rpx;
		width: 70rpx;
		height:70rpx;
		background-color:rgba(0,0,0,.5);
		border-radius:50%;
		z-index:3;
		.Backtopimage{
			width: 100%;
			height:100%;
		}
	}
</style>
