<template>
	<view>
		<actionbar message="直播佣金"></actionbar>
		<!-- <div class="sp">
			<ul>
				<li class="list" v-for=" (li,index) in listArr" :key="index">
					<div class="list-l">
						<image :src='li.img'></image>
					</div>
					<div class="list-r">
						<div class="list-r-t">
							<span>
								{{li.title}}
						    </span>		
						</div>
						<div class="list-r-b">
							<span>￥{{li.price}}</span>
							<span>佣金: {{li.money}}</span>
						</div>
					</div>
				</li>
			</ul>
		</div> -->
	</view>
</template>

<script>
	const app = getApp()
	import actionbar from "@/components/actionbar/actionbar.vue"
	export default {
		data() {
			return {
				listArr:[
					
					{
						img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1374417191,2510030808&fm=26&gp=0.jpg',
						title: '[即插即听]的骄傲收集大量军队垃圾死了打卡记录大家收集大量减少卡德加',
						price: '233.00',
						money: '5000',
						id: + new Date()
					},{
						img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594265546375&di=599335472f3f8049714fe3ef8142506b&imgtype=0&src=http%3A%2F%2Fdpic.tiankong.com%2F00%2Ftp%2FQJ8133402128.jpg%3Fx-oss-process%3Dstyle%2Fshows',
						title: '[即插即听]的骄傲收集大量军队垃圾死了打卡记录大家收集大量减少卡德加',
						price: '233.00',
						money: '5000',
						id: + new Date()
					},					{
						img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1374417191,2510030808&fm=26&gp=0.jpg',
						title: '[即插即听]的骄傲收集大量军队垃圾死了打卡记录大家收集大量减少卡德加',
						price: '233.00',
						money: '5000',
						id: + new Date()
					},{
						img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594265546375&di=599335472f3f8049714fe3ef8142506b&imgtype=0&src=http%3A%2F%2Fdpic.tiankong.com%2F00%2Ftp%2FQJ8133402128.jpg%3Fx-oss-process%3Dstyle%2Fshows',
						title: '[即插即听]的骄傲收集大量军队垃圾死了打卡记录大家收集大量减少卡德加',
						price: '233.00',
						money: '5000',
						id: + new Date()
					},					{
						img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1374417191,2510030808&fm=26&gp=0.jpg',
						title: '[即插即听]的骄傲收集大量军队垃圾死了打卡记录大家收集大量减少卡德加',
						price: '233.00',
						money: '5000',
						id: + new Date()
					},{
						img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594265546375&di=599335472f3f8049714fe3ef8142506b&imgtype=0&src=http%3A%2F%2Fdpic.tiankong.com%2F00%2Ftp%2FQJ8133402128.jpg%3Fx-oss-process%3Dstyle%2Fshows',
						title: '[即插即听]的骄傲收集大量军队垃圾死了打卡记录大家收集大量减少卡德加',
						price: '233.00',
						money: '5000',
						id: + new Date()
					},					{
						img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1374417191,2510030808&fm=26&gp=0.jpg',
						title: '[即插即听]的骄傲收集大量军队垃圾死了打卡记录大家收集大量减少卡德加',
						price: '233.00',
						money: '5000',
						id: + new Date()
					},{
						img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594265546375&di=599335472f3f8049714fe3ef8142506b&imgtype=0&src=http%3A%2F%2Fdpic.tiankong.com%2F00%2Ftp%2FQJ8133402128.jpg%3Fx-oss-process%3Dstyle%2Fshows',
						title: '[即插即听]的骄傲收集大量军队垃圾死了打卡记录大家收集大量减少卡德加',
						price: '233.00',
						money: '5000',
						id: + new Date()
					}
					
					
				]
			}
		},
		onLoad() {
			// console.log('load')
		},
		created(){
			uni.request({
				url: `${app.globalData.Requestpath}live/getLiveGoodCmsSettlementList`,
				method: 'POST',
				data: {
						token: '07d9b06c0a7de0ea2c16832a62eef512',
						page: '1',
						pagesize: '10'
				},
				success: res => {
					console.log(res)
				}
			})
		},
		methods: {

		},
		components:{
			actionbar
		}
	}
</script>

<style lang="less" scoped>
	.flex(@dir, @dqfs, @alignItms) {
	    display: flex;
	    flex-direction: @dir;
	    flex-wrap: nowrap;
	    justify-content: @dqfs;
	    align-items: @alignItms;
	}
	page{
		background-color: #f2f2f2;
	}
	.content {
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// justify-content: center;
		
		
		li{
			list-style: none;
		}
		ul{
			padding: 0;
			// background-color: #f2f2f2;
			width: 100%;
			height: 100%;
		}
		.sp{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			.title{
				width: 100%;
				height: 133upx;
				background-color: #fff;
				padding-top: 25upx;
				box-sizing: border-box;
				padding-right: 30upx;
				padding-left: 30upx;
				.flex(row,space-between,center);
				span{
					font-size: 35upx;
					color: #000;
					font-weight: bold;
					&:nth-of-type(1){
						transform: rotate(180deg);
					}
				}
			}
			ul{
				width: 100%;
				height: 100%;
		        box-sizing: border-box;
				.list{
					width: 100%;
					height: 247upx;
					background-color: #fff;
					padding: 26upx;
					box-sizing: border-box;
					.flex(row,space-between,center);
					box-shadow: 0px 0px 20px 0px #eeeeee;
					// box-shadow: 0px 0px 20px 0px 
					// 		rgba(68, 114, 248, 0.1);
					margin: 30upx 0;
					.list-l{
						width: 300upx;
						height: 100%;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.list-r{
						width: 100%;
						height: 100%;
						flex-grow:1;
						padding-left: 20upx;
						.flex(column,space-between,flex-top);
						.list-r-t{
							span{
								font-size: 30upx;
								 /* box的高度 */
								  height: 100rpx;
								  /* 超出隐藏 */
								  overflow: hidden;
								  /* 设置盒子样式，-webkit-是兼容前缀 */
								  display: -webkit-box;
								  /* 设置盒子参考方式 */
								  -webkit-box-orient: vertical;
								  /* 设置超出多少行显示省略号 */
								  -webkit-line-clamp: 2;
								  /* 行高 */
								  line-height: 50rpx;
							}
							
						}
						.list-r-b{
							width: 100%;
							height: 100%;
							.flex(row,space-between,flex-end);
							span{
								&:nth-of-type(1){
									font-size: 30upx;
									color: #666666;
								}
								&:nth-of-type(2){
									font-size: 35upx;
									color: #e80013;
								}
							}
						}
					}
				}
			}
		}
	}

</style>
