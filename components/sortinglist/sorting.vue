<template>
	<view class="sorting">
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="nav-text">
				<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	//这是排序导航
	export default{
		data(){
			return {
				TabCur: 0,
				scrollLeft: 0,
				classxuan:"hiden",
				list:[
					"综合",
					"销量",
					"价格",
					"排名"
				],
				minList:[
					{
						id:0,
						one:"综合排序",
						two:"评分排序"
					},
					{
						id:1
					},
					{
						id:2,
						one:"从高到低",
						two:"从低到高"
					}
				]
			}
		},
		methods: {
			//封装个排序的函数方法
			sortinglistshop(kind,way){
				uni.request({
					url:`http://hbk.huiboke.com/api/good/getGoodList?o_type=${kind}&o_rule=${way}`,
					success:(res)=>{
						this.$emit("sortingshoplist",res.data.data.list)
					}
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				// console.log(this.TabCur)
				switch(parseInt(this.TabCur)){
					case 0:
						console.log("这是0")
						break;

					case 1:
						//这是销量
						this.sortinglistshop(0,0)
						break;
					
					case 2:
						//这是价格
						this.sortinglistshop(1,0)
						console.log("这是2")
						break;
					
					case 3:
						console.log("这是3")
						break;
				}
			}
		},
		props:["value"]
	}
</script>

<style lang="less" scoped>
	.sorting{
		.nav-text{
			display:flex;
			justify-content: space-around;
		}
		.cuitemheight{
			height:70rpx;
			line-height:70rpx;
			border-bottom:0;
		}
		.sorting-bottom{
			position: relative;
			display:flex;
			.comprehensive{
				width: 20%;
				// height:20rpx;
				background-color:#fff;
				margin-right:44rpx;
				text{
					display:block;
					font-size: 20rpx;
					text-align:center;
					margin-bottom:12rpx;
					&:last-child{
						margin-bottom:0;
					}
				}
				&:nth-child(2){
					height:0;
				}
			}
			.show{
				opacity: 1;
			}
			.hiden{
				opacity: 0;
			}
			.screening{
				position: absolute;
				width: 100%;
				height:230rpx;
				background-color: #fff;
			}
		}
	}
</style>
