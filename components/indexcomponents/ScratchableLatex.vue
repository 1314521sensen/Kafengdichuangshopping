<template>
	<view class="ScratchableLatex" :style="{'margin-top':Scratchableheight+'rpx'}">
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view 
				class="cu-item" 
				v-for="(item,index) in cuIconList" 
				:key="index" v-if="index<gridCol*2" 
				@tap="collection"
				:data-url="item.url"
				:data-Routinghopname="item.Routinghopname"
				:data-name="item.name"
			>
				<!-- <view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
				</view> -->
				<!-- 把这变成image -->
				<view class="icon" :style="{width:width,height:height+'rpx'}">
					<image :src="item.imgs" alt="">
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){//这是九宫格
			return {
				gridBorder: false,
			}
		},
		props:["cuIconList","gridCol","width","height","Scratchableheight"],
		methods:{
			collection(e){
				let {url,routinghopname,name} = e.currentTarget.dataset
				if(url!==undefined){
					if(routinghopname=="userMyinquiry"){
						uni.navigateTo({
							url:`${url}?title=${name}&titlename=${routinghopname}&statestore=0`
						})
					}else if(routinghopname=='userTopupwithdrawal'){
						uni.navigateTo({
							url:`${url}?title=${name}&titlename=${routinghopname}&field=littlebee`
						})
					}
					else{
						uni.navigateTo({
							url:`${url}?title=${name}&titlename=${routinghopname}`
						})
					}
				}else{
					app.globalData.showtoastsame("功能正在开发,请耐心等待")
				}
				/*
				else if(routinghopname=="Promotedistribution"){
					//判断是不是团长
					uni.getStorage({
						key:"beesgrouplong",
						success(res) {
							if(res.data==2){
								//证明已经是团长了
								uni.navigateTo({
									url:`/pages/headearnings/headearnings`
								})
							}else{
								//团长待审核 或者未开通
								uni.navigateTo({
									url:`${url}?title=${name}&titlename=${routinghopname}`
								})
							}
						}
					})
				}
				
				*/
			}
		}
	}
</script>

<style lang="less" scoped>
	.ScratchableLatex{
		// margin-top:68rpx;
		.icon{
			width: 56%;
			height:72rpx;
			// background-color:pink;
			margin:auto;
			image{
				width: 100%;
				height:100%;
			}	
		}
		text{
			font-size: 26rpx !important;
			margin-top:0 !important;
		}
	}
</style>
