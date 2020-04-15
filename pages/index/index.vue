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
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请绑定账号</view>
				</view>
				<view class="padding-xl">
					如果没有账号,请进行注册
				</view>
				<view class="cu-bar bg-white Popup-tanchuang">
					<view class="action">
						<button class="cu-btn bg-green text-white" @tap="Popuplogin(true)">已有账号</button>
						<button class="cu-btn bg-red margin-left" @tap="Popuplogin(false)">没有账号</button>
					</view>
				</view>
			</view>
		</view>
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
			showModal() {
				this.modalName = "DialogModal1"
			},
			Popuplogin(boollogin){
				if(boollogin){
					this.hideModal()
					uni.navigateTo({
						url:"/pages/login/login"
					})
				}else{
					this.hideModal()
					uni.navigateTo({
						url:"/pages/Freeregistration/Freeregistration"
					})
				}
			},
			hideModal() {
				this.modalName = null
			},
		},
		onLoad(){
			//当用户点击了登录以后 进入首页 给用户来个弹窗 如果用户绑定了信息 就把用户状态(状态现在还没写)保存到缓存中 因为这个弹窗只能执行一次
			// #ifdef MP-WEIXIN
				console.log("此页面作用于微信")
				this.showModal()
				// uni.showModal({
				// 	title:"请绑定账号",
				// 	content:"如果没有账号，请进行注册",
				// 	showCancel:true,
				// 	cancelText:"已有账号",
				// 	confirmText:"没有账号",
				// 	success(res){//当用户点击了确认以后
				// 		if(res.confirm){ //如果为true的情况下 用户点击了确认以后 就让用户关闭所有页面跳转到// /pages/Personaldata/Personaldata
				// 			uni.navigateTo({
				// 				url:"/pages/Freeregistration/Freeregistration"
				// 			})
				// 		}else{ //如果为false的情况下  用户点击了取消
				// 			uni.navigateTo({
				// 				url:"/pages/login/login"
				// 			})
				// 		}
				// 	}
				// })
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
		},
		//页面滚动到底部的事件
		onReachBottom(){
			console.log(1)
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
