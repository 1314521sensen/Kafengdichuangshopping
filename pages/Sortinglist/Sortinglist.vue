<template>
	<view class="sortinglist">
		<pageheight :statusBar="statusBar"></pageheight>
		<seachinput :value2="value2" :value="value"></seachinput>
		<!--sorting这里传过去的value是用来排序的  -->
		<sorting :value="value" @sortingshoplist="sortingshoplist"></sorting>
		<scroll-view :scroll-y="true"  @scrolltolower="scrolltolower" class="scrolltolower-list">
			<horizontallylist :horizontallylist="horizontallylist"></horizontallylist>
		</scroll-view>
		
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
				horizontallylist:[],
				page:1,
				gcid:"",
				gclevel:""
			}
		},
		methods: {
			sortingshoplist(e){
				this.page = 1
				this.horizontallylist = e
			},
			sortinglist(page){
				const _this = this
				if(this.gcid==undefined){
					uni.request({
						url:`${app.globalData.Requestpath}good/getGoodList`,
						data:{
							page:page,
							pageSize:10,
							g_name:_this.value
						},
						success:(res)=>{
							if(res.data.code==0){
								if(_this.page>1){
									_this.horizontallylist = _this.horizontallylist.concat(res.data.data.list)
								}else{
									_this.horizontallylist = res.data.data.list
								}
							}else{
								
							}
						}
					})
				}else{
					uni.request({
						url:`${app.globalData.Requestpath}good/getGoodList`,
						data:{
							page:page,
							c_level:this.gclevel,
							c_id:this.gcid,
							pageSize:10
						},
						success:(res)=>{
							if(res.data.code==0){
								if(_this.page>1){
									_this.horizontallylist = _this.horizontallylist.concat(res.data.data.list)
								}else{
									_this.horizontallylist = res.data.data.list
								}
							}else{
								
							}
						}
					})
				}
			},
			scrolltolower(){
				this.page++
				this.sortinglist(this.page)
			}
		},
		components:{
			sorting,
			horizontallylist,
			seachinput
		},
		onLoad(opctry){
			this.value = opctry.value
			this.gcid = opctry.gcid
			this.gclevel = opctry.gclevel
			// console.log(this.value)
			this.sortinglist(1)
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.scrolltolower-list{
		height: 87vh;
	}
</style>
