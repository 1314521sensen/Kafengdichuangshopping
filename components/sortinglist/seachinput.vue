<template>
	<view class="seachinput">
		<view class="searhbusiness-midden">
			<view class="Returnsicon" @click="Returns(url)">
				<text class="cuIcon-back text-gray"></text>
			</view>
			<view class="inp">
				<view class="cu-bar search xiaoheight">
					<view class="search-form round inpheight">
						<text class="cuIcon-search"></text>
						<input :value="value" @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" :placeholder="value2" confirm-type="search"></input>
					</view>
				</view>
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
			InputFocus(){
				this.returnstopone(`/pages/SearchTo/SearchTo?value=${this.value}`)
			},
			Returns(url){
				//""/pages/SearchTo/SearchTo"
				if(url){
					this.returnstopone(url)
				}else{
					this.returnstopone("/pages/SearchTo/SearchTo")
				}
				
			},
			InputBlur(){
				
			},
			returnstopone(url){
				//封装一个方法 返回上一级
				uni.navigateTo({
					url
				})
			}
		},
		props:["value2","value","url"]
	}
</script>

<style lang="less" scoped>
	.searhbusiness-midden{
		display:flex;
		justify-content: space-between;
		align-items: center;
		padding-left:20rpx;
		.Returnsicon{
			flex:1;
			text{
				font-size: 44rpx;
			}
		}
		.inp{
			width: 94%;
			.xiaoheight{
				min-height:80rpx;
				.inpheight{
					height:50rpx;
					line-height:50rpx;
				}
			}
		}
	}
</style>
