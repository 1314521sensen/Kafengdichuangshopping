<template>
	<view class="content">
		<pageheight :statusBar="statusBar"></pageheight>
		<search  @inpblue="inpblue"></search>
		<scroll-view scroll-y="true" class="scroll-view" @scrolltolower="scrollbottom">
			<banner :swiperList="swiperList" height="300"></banner>
			<ScratchableLatex :cuIconList="cuIconList" :gridCol="gridCol"></ScratchableLatex>
			<coupons></coupons>
			<shoppinglist></shoppinglist>
		</scroll-view>
	</view>
</template>

<script>
	
	import search from "@/components/indexcomponents/search.vue"
	import banner from "@/components/indexcomponents/banner.vue"
	import ScratchableLatex from "@/components/indexcomponents/ScratchableLatex.vue"
	import coupons from "@/components/indexcomponents/coupons.vue"
	import shoppinglist from "@/components/indexcomponents/shoppinglist.vue"
	const app = getApp();
	export default {
		//这是首页
		data() {
			return {
				//这是首页的高度
				statusBar:0,
				modalName: null,
				//这是九宫格的数据通过父子组件传递
				cuIconList: [
					{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				},
				{
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '发现'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
				gridCol: 4,//这是格数
				// 这是banner的数据
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					url2:"/pages/bannerRouter/bannerRouter"
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
					url2:"pages/bannerRouter/bannerRouter"
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
					url2:"/pages/bannerRouter/bannerRouter"
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					url2:"/pages/bannerRouter/bannerRouter"
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
					url2:"/pages/bannerRouter/bannerRouter"
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
					url2:"/pages/bannerRouter/bannerRouter"
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
					url2:"/pages/bannerRouter/bannerRouter"
				}],
			}
		},
		
		methods: {
			inpblue(e){
				if(e){
					e.blur()
				}
			},
			//监控scroll-view 滚动标签是否滚动到底部
			scrollbottom(){
				console.log(22)
			},
			//这是用户登录的提示框
			showloginstate(){
				uni.showModal({
					title:"请进行登录",
					content:"如果没有账号，请进行注册",
					showCancel:true,
					cancelText:"已有账号",
					confirmText:"没有账号",
					success(res){//当用户点击了确认以后
						if(res.confirm){ //如果为true的情况下 用户点击了确认以后 就让用户关闭所有页面跳转到// /pages/Personaldata/Personaldata
							uni.navigateTo({
								url:"/pages/Freeregistration/Freeregistration"
							})
						}else{ //如果为false的情况下  用户点击了取消
							uni.navigateTo({
								url:"/pages/login/login"
							})
						}
					}
				})
			},
			//这是封装的 用户是否绑定了登录 和是否绑定了手机号或者邮箱
			booltanchuang(){
				const _this = this
				// #ifdef MP-WEIXIN
					uni.getStorage({
						key:"wxcodekey",
						success(res){
							// console.log(res.data) //这是openid的值
							uni.request({
								url:"http://hbk.huiboke.com/api/login_and_register/userLogin",
								method:"POST",
								data:{
									login_type:"weixin",
									opened:res.data
								},
								success(reslogintokey) {
									console.log(reslogintokey.data)
									if(reslogintokey.data.code==0){//证明用户已经在数据里 在数据里面就弹出绑定的弹窗
										//在这里取出用户时候进行微信绑定登录了
										console.log()
										uni.getStorage({
											key:"loginstate",
											success(resbindloginstate){//如果取出来证明用户已经登录了
												if(resbindloginstate.data==1){//证明用户已经绑定登录了
													
												}else{//就弹出用户登录的框
													_this.showloginstate()
												}
											},
											fail:()=>{
												
												_this.showloginstate()
											}
										})
									}else{//证明用户没有在数据里面 没有在数据库里面 就弹出登录的弹窗
										console.log(this)
										this.showloginstate()
									}
								}
							})
						}
					})
				// #endif
			},
		},
		onLoad(){
			// #ifdef MP-WEIXIN
				this.booltanchuang()
			// #endif
			// console.log(app.globalData)
			this.statusBar = app.globalData.statusBar
		},
		components:{
			search,
			banner,
			ScratchableLatex,
			coupons,
			shoppinglist,
			// pageheight
		},
		onShow(){
			this.inpblue()
			this.booltanchuang()
		},
		//页面滚动到底部的事件
		onReachBottom(){
			console.log(1)
		},
		// 封装一个是否要弹出弹窗的方法
		
		created(){
			// #ifdef MP-WEIXIN
				this.booltanchuang()
			// #endif
		}
	}
</script>

<style lang="less" scoped>
	.scroll-view{
		overflow: hidden;
		height:100vh;	
	}
	.Popup-tanchuang{
		.action{
			width: 100%;
			display:flex;
			justify-content: space-between;
			button{
				width: 49%;
			}
		}
	}
</style>
