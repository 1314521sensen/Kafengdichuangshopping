<template>
	<view class="addressTo">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" message="添加地址"></actionbar>
		<view class="newaddressTO-box">
			<view class="newaddressTO" @click="tonews">
				<button class="cu-btn bg-red lg">新建</button>
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item,index) in addaddresslist" :key="index" v-if="item.value1">
				<view class="cu-avatar">{{item.value1}}</view>
				<view class="content">
					<view class="text-grey">{{item.value2}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{item.value4}}
						</view> </view>
				</view>
				<view class="action">
					<text class="lg text-gray text-red cuIcon-delete"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp();
	export default {
		data() {
			return {
				addaddresslist:[],
				statusBar:0
			}
		},
		methods: {
			tonews(){
				uni.navigateTo({
					url:"/components/address/address"
				})
			}
		},
		components:{
			actionbar
		},
		onLoad(option){
			this.addaddresslist.push(option)
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.addressTo{
		
		.newaddressTO-box{
			.newaddressTO{
				position: fixed;
				bottom:0;
				left:0;
				width: 100%;
				height:70rpx;
				button{
					width: 100%;
				}
			}
		}
		.cu-list{
			.cu-item{
				.cu-avatar{
					color:#000;
					background-color: #fff;
					font-size: 26rpx;
					font-weight: bold;
				}
				.content{
					.text-grey{
						color:#000;
					}
					.text-cut{
						color:#000;
						text-overflow:clip;
						white-space:normal;
						overflow:visible;
					}
				}
			}
		}
	}
</style>
