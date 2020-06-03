<template>
	<view class="returnsthe">
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- 返回 -->
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="lg text-gray cuIcon-back_android Icon"></text> 视频举报
			</view>
		</view>
		<!-- 请选中举报的类型 -->
		<view class="reportType">请你选择举报的类型</view>
		<!-- 举报列表 -->
		<radio-group class="block" @change="RadioChange">
			<view class="informlist" v-for="(item,index) in reportlist" :key="index">
				<radio :class="radio==item.value?'checked':''" :checked="radio==item.value?true:false" :value="item.value"></radio>
				<view class="title">{{item.name}}</view>
			</view>
		</radio-group>
		<view class="btn">
			<button class="returnsthebtn cu-btn block bg-red margin-tb-sm lg">
				提交
			</button>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				radio: '',
				statusBar:"",
				reportlist:[
					{
						value:"A",
						name:"淫遂色情内容"
					},
					{
						value:"B",
						name:"非法政治内容"
					},
					{
						value:"C",
						name:"出售违禁品(保护动植物/枪支弹药/危险武器/军警用品/假币假证等)"
					},
					{
						value:"D",
						name:"引导线下转账交易"
					},
					{
						value:"E",
						name:"多账号同时直播相同内容"
					},
					{
						value:"F",
						name:"主播头像、封面图使用明星"
					},
					{
						value:"G",
						name:"长时间空镜头挂机"
					},
					{
						value:"H",
						name:"出售假冒商品"
					}
				]
			}
		},
		methods: {
			RadioChange(e){
				this.radio = e.detail.value
			}
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		}
	}
</script>
  
<style lang="less" scoped>
   .returnsthe{
	   .Icon{
		   font-size: 40rpx;
	   }
	   .cu-form-group{
	   }
	   .reportType{
		   height: 100rpx;
		   background-color: #fff;
		   border-bottom: 2rpx solid #F5F5F5;
		   font-size: 34rpx;
		   line-height: 100rpx;
		   text-indent: 1rem;
	   }
	   .informlist{
		   display: flex;
		   background-color: #fff;
		   min-height: 100rpx;
		   align-items: center;
		   padding-left: 40rpx;
		  border-bottom: 2rpx solid #F5F5F5;
		  
		   .title{
			   width: 80%;
			   margin-left: 30rpx;
		   }
	   }
	   .btn{
		   display:flex;
		   justify-content: center;
		   margin-top:20rpx;
		   .returnsthebtn{
			   width: 90%;
		   }
	   }
   }
</style>
