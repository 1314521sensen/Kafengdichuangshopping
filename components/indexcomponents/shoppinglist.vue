<template>
	<view class="shoppinglist">
		<!-- 这是背景图片 -->
		<view class="shopping-title">这里是背景图片 先用颜色替代</view>
		<!-- 这里是组件定义出去 -->
		<list :list="list"></list>
	</view>
</template>

<script>
	import list from "@/components/indexcomponents/list.vue"
	export default{

		data(){
			return {
				list:[
					{
						images:'/static/index/indexlist/1.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"50"
					},
					{
						images:'/static/index/indexlist/2.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"60"
					},
					{
						images:'/static/index/indexlist/3.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"100"
					},
					{
						images:'/static/index/indexlist/4.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"120"
					}
				]
			}
		},
		components:{
			list,
		}
	}
</script>

<style lang="less" scoped>
	.shoppinglist{
		.shopping-title{
			//由于背景图片没高度 给来一个高度
			height:70rpx;
			background-color:deeppink ;//背景图片没有 先用颜色替代
			// background-image:url() //这里背景图片到时候有图片在渲染  先把图片的其他属性写上
			// background:no-repeat 0 0;
			// background-size: 100% 100%;
			
		}
	}
	
</style>
