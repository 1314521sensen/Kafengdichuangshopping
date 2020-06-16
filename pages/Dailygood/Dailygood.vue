<template>
	<view class="Dailygood">
		<view class="Dailygood-top" :style="{'padding-top':statusBar+'rpx'}">
			<actionbar message="每日好货" bg="aa" textcolor="#fff" :Jumpchoose="false" url="/pages/index/index"></actionbar>
			<view class="Dailygood-title padding-left-plice">
				<text class="text-white Dailygood-titletext">推荐好物</text>
			</view>
			<view class="Dailygood-toplist padding-left-plice">
				<view 
					class="Dailygood-toplist-item" 
					v-for="(item,index) in 3" :key="index" 
					:style="{'background-image':'url(/static/dailygood/goodtop.png)'}"
				>
					<view class="Dailygood-mask-layer">
						<text class="text-white">立即查看</text>
					</view>
				</view>
			</view>
			<view class="Dailygoodnav">
				<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item navtext" :class="index==TabCur?'text-white navchecked':''" v-for="(item,index) in navlist" :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</scroll-view>
			</view>
		</view>
		<goodnavlist></goodnavlist>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	import goodnavlist from "@/components/Dailygood/goodnavlist.vue"
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:0,
				scrollLeft:0,
				TabCur:0,
				navlist:[
					"精选",
					"运动",
					"生活",
					"电器",
					"食品",
					"母婴"
				]
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
		components:{
			actionbar,
			goodnavlist
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.Dailygood{
		.Dailygood-top{
			background-color: #fe7f51;
			padding-bottom:80rpx;
			.Dailygood-title{
				.Dailygood-titletext{
					font-size: 45rpx;
					font-weight: bold;
				}
			}
		}
		.Dailygood-toplist{
			display:flex;
			justify-content: space-between;
			margin-top:32rpx;
			.Dailygood-toplist-item{
				display:flex;
				align-items: flex-end;
				width: 221rpx;
				height:288rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				.Dailygood-mask-layer{
					display:flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height:30%;
					background-color:rgba(0,0,0,.5);
					text-align:center;
					font-size: 30rpx;
				}
			}
		}
		.Dailygoodnav{
			color:#f2f2f2;
			margin-top:24rpx;
		}
		.navchecked{
			font-size: 32rpx;
			font-weight: bold;
			transition: .3s;
		}
	}
	
	.padding-left-plice{
		padding:0 20rpx;
	}
</style>
