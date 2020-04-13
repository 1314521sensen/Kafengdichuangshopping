<template>
	<view class="search">
		<view class="cu-bar search bg-gradual-blue">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索你想要的商品" confirm-type="search" id="inp"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
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
			let inp = document.getElementById("inp")
			// console.log(inp)
			this.$emit("inpblue",inp)
		}
	}
</script>

<style lang="less" scoped>
	.search{
		// display:flex;
		// justify-content: space-between;
		.input{
			width:100%;
			height:70rpx;
			// background-color:red;
			border-radius:26rpx;
			input{
				// border:1px solid #000;
				width: 100%;
				height:100%;
				border-radius:26rpx;
				padding-left:30rpx;
				.placeholderName{
					font-size: 24rpx;
					line-height:60rpx;
					color:#fff;
				}
			}
		}
	}
</style>
