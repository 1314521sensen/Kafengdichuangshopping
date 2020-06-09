<template>
	<view class="search" :style="{'height':indexs==0?420+'rpx':168+'rpx'}">
		<view class="search-inp">
			<view class="search-form">
				<text class="cuIcon-search"></text>
				<input 
				@focus="InputFocus" 
				@blur="InputBlur" 
				:adjust-position="false" 
				type="text" 
				placeholder="搜索你想要的商品"
				placeholder-class="seachplaceholder"
				placeholder-style="color:#fff"
				confirm-type="search" id="inp"
				 ></input>
			</view>
			<view class="action">
				<button class="cu-btn shadow-blur">搜索</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				indexs:0
			}
		},
		methods:{
			InputFocus(e) {
				this.InputBottom = e.detail.height
				uni.navigateTo({
					url:"/pages/SearchTo/SearchTo"
				})
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		},
		mounted(){
			// let inp = document.getElementById("inp")
			// // console.log(inp)
			// this.$emit("inpblue",inp)
		},
		props:["TabCur"],
		created(){
			const _this = this
			this.$watch('TabCur',function(newsTabCur,oldTabCur){
				// console.log(newsTabCur,oldTabCur)
				_this.indexs = parseInt(newsTabCur)
			})
		}
	}
</script>

<style lang="less" scoped>
	.search {
		// width: 100%;
		// height:420rpx;
		padding-top: 22rpx;
		background-color: #e62d28;
		.seachplaceholder{
			font-size: 26rpx;
		}
		.search-inp {
			margin: 0 auto;
			display: flex;
			background-color: #ddd;
			width: 720rpx;
			height: 66rpx;
			border-radius: 30rpx;
			.search-form {
				display: flex;
				align-items: center;
				width: 600rpx;
				background-color: #f0817e;
				border-top-left-radius: 30rpx;
				border-bottom-left-radius: 30rpx;
				text {
					color: #fff;
					font-size: 40rpx;
					margin: 0 34rpx 0 28rpx;
				}
			}
			.action {
				border-top-right-radius: 30rpx;
				border-bottom-right-radius: 30rpx;
				background-color: #fee03c;
				width: 120rpx;
				.cu-btn {
					background-color: #fee03c;
					border-top-right-radius: 30rpx;
					border-bottom-right-radius: 30rpx;
					border: none;
				}
			}
		}
	}
</style>
