<template>
	<view class="tabber">
		<view 
			class="taberitem" 
			v-for="(item,index) in taberlist" 
			:key="index"
			@tap="taberpath"
			:data-pagepath="item.pagePath"
		>
			<view class="taberimgs">
				<image :src="item.selectedIconPath"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				taberlist:[
					{
						"pagePath": "pages/index/index",
						"selectedIconPath": this.$store.state.httpUrl+"tabber/index.png",
						"text": "首页"
					},  
					{
						"pagePath": "pages/Liveplatformlist/Liveplatformlist",
						"selectedIconPath": this.$store.state.httpUrl+"tabber/Liveplatform.png",
						"text": "直播"
					}, 
					{
						"pagePath": "pages/shoppingCart/shoppingCart",
						"selectedIconPath": this.$store.state.httpUrl+"tabber/car.png",
						"text": "购物车"
					},
					{
						"pagePath": "pages/PersonalMy/PersonalMy",
						"selectedIconPath": this.$store.state.httpUrl+"tabber/my.png",
						"text": "我的"
					}
				],
				indextapbool:true,//当连续点击首页的时候
			}
		},
		methods:{
			taberpath(e){
				const _this = this
				let routes = getCurrentPages();
				let curRoute = routes[routes.length - 1].route
				//如果当前的路由等于 用户要点击的路由直接return
				//600
				// console.log(curRoute)
				// console.log(e.currentTarget.dataset.pagepath)
				if(curRoute==e.currentTarget.dataset.pagepath){
					//这里判断是否连续点击了首页
					if(e.currentTarget.dataset.pagepath=="pages/index/index"){
						if(_this.indextapbool){
							_this.$emit("indextapscell",600)
							_this.indextapbool = false
						}else{
							_this.$emit("indextapscell",0)
							_this.indextapbool = true
						}
					}
					return
				}else{
					if(e.currentTarget.dataset.pagepath=='pages/shoppingCart/shoppingCart'){
						uni.setStorage({
							key:"forwardcartbool",
							data:0
						})
					}
					uni.reLaunch({
						url:"/"+e.currentTarget.dataset.pagepath
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.tabber{
		display:flex;
		justify-content: space-around;
		position: fixed;
		bottom:10rpx;
		left:15rpx;
		width: 60%;
		height:98rpx;
		background-color: rgba(0,0,0,.5);
		padding:20rpx 0;
		border-radius:14rpx;
		.taberitem{
			display:flex;
			justify-content:center;
			width: 14%;
			// background-color: green;
			// border-right:2rpx solid #f2f2f2;
			padding: 0 4rpx;
			// &:last-child{
			// 	// border:0;
			// 	// padding:0;
			// }
			.taberimgs{
				width: 100%;
				// height:50rpx;
				// background-color: pink;
				image{
					width: 100%;
					height:100%
				}
			}
		}
	}
</style>
