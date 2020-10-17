<template>
	<view class="ScratchableLatex-box">
		<view class="ScratchableLatex">
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" 
					v-for="(item,index) in cuIconList" 
					:key="index" 
					v-if="index<gridCol*2"
					@tap="collection"
					:data-url="item.url"
					:data-Routinghopname="item.Routinghopname"
					:data-index="index"
					:data-code="item.code"
					:data-name="item.name">
					<view class="list-imgs">
						<image :src="item.imgs" class="imgs"></image>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){//这是九宫格
			return {
				gridCol: 5,
				gridBorder: false,
			}
		},
		methods:{
			collection(e){
				let {url,routinghopname,name,index,code} = e.currentTarget.dataset
				if(url!==undefined){
					if(code!==undefined){
						uni.request({
							url:`${app.globalData.Requestpath}activity/getActivityInfo`,
							data:{
								code:code
							},
							success(res) {
								let start_time = res.data.data.start_time
								let stop_time = res.data.data.stop_time
								let startTime = start_time.replace(/-/g, '/');
								var time1 = new Date(startTime);
								time1 = time1.getTime();
								let stopTime = stop_time.replace(/-/g, '/');
								var time2 = new Date(stopTime);
								time2 = time2.getTime();
								let myDate = new Date().getTime();
								let bool = myDate> time1 && myDate < time2
								if(bool){
									uni.navigateTo({
										url:`${url}?title=${name}&titlename=${routinghopname}`
									})
								}else{
									app.globalData.showtoastsame("活动还未开始")
								}
							}
						})
					}else{
						uni.navigateTo({
							url:`${url}?title=${name}&titlename=${routinghopname}`
						})
					}
				}else{
					app.globalData.showtoastsame("功能正在开发,请耐心等待")
				}
			}
		},
		props:["cuIconList"]
	}
</script>

<style lang="less" scoped>
	.ScratchableLatex-box{
		padding:0 20rpx;
		// margin-top:40rpx;
		margin:40rpx 0 20rpx 0;
		.ScratchableLatex{
			// width: 9%;
			border-radius: 30rpx;
			overflow: hidden;
			.list-imgs{
				image{
					width: 110rpx;
					height: 100rpx;
				}
			}
			.cu-list.grid>.cu-item uni-text{
				margin : 0;
			}
			.cu-list{
				padding:10rpx;
			}
		}
	}
</style>
