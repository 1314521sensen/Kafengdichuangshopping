<template>
	<view>
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- 这是左侧 -->
		<view class="page-body" :style="'height:'+height+'px'">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'" :scroll-top="scrollLeftTop" scroll-with-animation>
				<!-- 这是左侧的每一项的name -->
				<view class="nav-left-item" @click="categoryClickMain(index)" :key="index" :class="index==categoryActive?'active':''"
					v-for="(item,index) in classifyData">
					{{item.name}}
				</view>
			</scroll-view>
			<!-- 这是右侧 -->
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
				<view v-for="(foods,index) in classifyData" :key="index" class="box">
					<!-- 在这显示标题 -->
					<view class='titleName'>
						{{foods.name}}
					</view>
					<!-- 这是每一个的小商品 -->
					<view :id="i==0?'first':''" class="nav-right-item" v-for="(item,i) in foods.foods" :key="i" @click="minshopping(item)">
						<!--这是图片-->
						<image :src="item.icon" />
						<!-- 这是名字 -->
						<view>{{item.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import AAA from '@/comm/fenclassshoppingandicon.js';
	const app = getApp();
	export default {
		data() {
			return {
				statusBar:0,
				name: "",//初始化名字
				height: 0,//初始化高度
				categoryActive: 0,
				scrollTop: 0,
				scrollLeftTop: 0,
				// scrollHeight: 0,
				classifyData:AAA,
				arr:[0,584,1168,1752,2336,2805,3274,3858,4442,4911,5380,5734,6203,6672,7017],//初始值，后边计算会根据手机适配覆盖
				leftItemHeight: 51,//49行会计算出新值进行覆盖
				navLeftHeight:0,//左边scroll-view 内层nav的总高度
				diff: 0,//左边scroll-view 内层nav的总高度与视口之差
				tabBarHeight:0,//如果此页面为Tab页面，自己改变高度值,,一般tab高度为51
			}
		},
		created(){
			//如果你的分类数据为后台异步获取请	将下方代码放置你的数据回调中
			// this.$nextTick(()=>{
			// 	this.getHeightList();
			// })
			// uni.request({
			// 	url:"http://hbk.huiboke.com/api/common/getCategoryList",
			// 	success:(res)=>{
			// 		if(res.data.code==0){
			// 			let arr = []
			// 			res.data.data.forEach((item,index)=>{
			// 				console.log(item)
			// 				// item.children.forEach((items,indexs)=>{
			// 				// 	arr.push(items)
			// 				// })
			// 			})
			// 			// console.log(arr)
			// 		}else{
			// 			app.globalData.showtoastsame("网络不佳")
			// 		}
			// 	}
			// })
		},
		//设置高度
		onLoad: function () {
			this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight;
			this.statusBar = app.globalData.statusBar
		},
		onReady() {
			// this.getHeightList();
		},
		methods: {
			getHeightList(){
				let _this = this;
				let selectorQuery=uni.createSelectorQuery();
				selectorQuery.selectAll('.nav-left-item').boundingClientRect(function(rects) {
					_this.leftItemHeight  =  rects[0].height;
					_this.navLeftHeight = _this.leftItemHeight * classifyData.length; //根据商品来设置右侧高度
					_this.diff =  _this.navLeftHeight - _this.height;
				});
				selectorQuery.selectAll('.box').boundingClientRect(function(rects) {
					let arr = [0];
					let top = 0;
					rects.forEach(function(rect){
	// 					rect.id      // 节点的ID
	// 					rect.dataset // 节点的dataset
	// 					rect.left    // 节点的左边界坐标
	// 					rect.right   // 节点的右边界坐标
	// 					rect.top     // 节点的上边界坐标
	// 					rect.bottom  // 节点的下边界坐标
	// 					rect.width   // 节点的宽度
	// 					rect.height  // 节点的高度
						top += rect.height;
						arr.push(top)
						})
						console.log(arr)
						_this.arr = arr
					}).exec()
			},
			scroll(e) {
				let _this = this
				if(this.timeoutId){
					clearTimeout(this.timeoutId);
				}
				this.timeoutId = setTimeout(function(){ //节流
					_this.scrollHeight = e.detail.scrollTop + 1 + _this.height/2;
					//+1不要删除，解决最后一项某种情况下翻到底部，左边按钮并不会切换至最后一个
					//若想使切换参考线为屏幕顶部请删除 _this.height/2
					for (let i = 0; i < _this.arr.length;i++) {
						let height1 = _this.arr[i];
						let height2 = _this.arr[i+1];
						if (!height2 || (_this.scrollHeight >= height1 && _this.scrollHeight < height2)) {
							_this.categoryActive = i;
							(_this.diff>0) && (_this.scrollLeftTop = Math.round((_this.categoryActive * _this.diff)/(classifyData.length-1)));
							return false;
						}
					}
					_this.categoryActive = 0;
					_this.timeoutId = undefined;
				}, 10)
			},
			categoryClickMain(index) {
				this.categoryActive = index;
				this.scrollTop == this.arr[index] ? this.scrollTop = this.scrollTop+1 : this.scrollTop = this.arr[index]//防止两次相等造成点击不触发滚动时间
			},
			minshopping(minitem){//这是自定义的
			//当点每一项的时候 跳转到该组件里面
				console.log(minitem)
			}
		},
		components: {
		}
	}
</script>

<style>
	.page-body {
			display: flex;
			background: #fff;
			overflow: hidden;
		}
	
		.nav {
			display: flex;
			width: 100%;
		}
	
		.nav-left {
			width: 25%;
			background: #fafafa;
		}
	
		.nav-left-item {
			height: 100rpx;
			border-right: solid 1px #f1f1f1;
			border-bottom: solid 1px #f1f1f1;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.nav-left-item:last-child{
			border-bottom: none;
		}
		.nav-right {
			width: 75%;
		}
		.box {
			display: block;
			overflow: hidden;
			border-bottom: 20rpx solid #f3f3f3;
			/* min-height: 100vh; */ 
			/*若您的子分类过少想使得每个子分类占满屏请放开上边注视 */
		}
		.box:last-child {
			border: none;
			min-height:100vh;
		}
		.nav-right-item {
			width: 28%;
			height: 220rpx;
			float: left;
			text-align: center;
			padding: 11rpx;
			font-size: 28rpx;
			background: #fff;
		}
	
		.nav-right-item image {
			width: 150rpx;
			height: 150rpx;
		}
		.titleName{
			font-size: 32rpx;
			font-weight: bold;
			padding:16rpx 0rpx 16rpx 20rpx;
		}
		.active {
			color: #FF80AB;
			background: #fff;
			border-right: 0;
		}
		::-webkit-scrollbar {/*取消小程序的默认导航条样式*/
	   width: 0;
	   height: 0;
	   color: transparent;
	}
</style>
