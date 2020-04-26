<template>
	<view class="sortinglist">
		<pageheight :statusBar="statusBar"></pageheight>
		<seachinput :value2="value2" :value="value"></seachinput>
		<!--sorting这里传过去的value是用来排序的  -->
		<sorting :value="value" @sortingshoplist="sortingshoplist"></sorting>
		<horizontallylist :horizontallylist="horizontallylist"></horizontallylist>
	</view>
</template>

<script>
	import seachinput from "@/components/sortinglist/seachinput.vue"
	import sorting from "@/components/sortinglist/sorting.vue"
	import horizontallylist from "@/components/sortinglist/horizontallylist.vue"
	const app = getApp();
	export default {
		//这是商品排序列表大组件
		data() {
			return { //这两个value需要传参传个去
				value:"",
				value2:"",
				statusBar:0,
				//这是横排的显示数据
				horizontallylist:[]
			}
		},
		methods: {
			sortingshoplist(e){
				this.horizontallylist = e
			}
		},
		components:{
			sorting,
			horizontallylist,
			seachinput
		},
		onLoad(opctry){
			this.value = opctry.value
			this.statusBar = app.globalData.statusBar
			// console.log(this.value)
			uni.request({
				url:"http://hbk.huiboke.com/api/good/getGoodList",
				data:{
					page:1,
					pageSize:10,
					g_name:this.value
				},
				success:(res)=>{
					// console.log(res)
					if(res.data.code==0){
						// console.log("获取了")
						this.horizontallylist = res.data.data.list
					}else{
						console.log("没获取到")
					}
				}
			})
		}
	}
</script>

<style lang="less" scoped>

</style>
