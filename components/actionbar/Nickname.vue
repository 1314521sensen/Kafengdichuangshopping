<template>
	<view class="nickname-box">
		<view class="nickname" v-for="(item,index) in Personalinformationlist" :key="index">
			<view 
				class="cu-bar bg-white margin-top" 
				:style="{'min-height':'80rpx'}" 
				@tap="showModal" 
				:data-target="item.showname" 
				
			>
				<view class="action">
					<text>{{item.title}}</text>
				</view>
				
				<view class="action">
					<!--  @tap="showModal" -->
					<text :style="{'margin-right': '44rpx'}">{{item.zhi}}</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-modal" :class="modalName==item.showname?'show':''">
				<!-- <form @submit="formsubmit"> -->
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">{{item.dialogtitle}}</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<input v-model="item.value3" type="text" :placeholder="item.placeholdertext">
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn bg-green margin-left" @tap="Modify(item.value3,index)">确定</button>
						</view>
					</view>
				</view>
				<!-- </form> -->
			</view>
		</view>
		<!-- 刚才在这删除的 -->
	</view>
	
</template>

<script>
	export default{
		data(){
			return {
				modalName: null,
				Personalinformationlist:[
					{
						title:"昵称",
						zhi:"明天的我又进步了",
						showname:"DialogModal1",
						dialogtitle:"您要修改的昵称",
						placeholdertext:"请输入你要修改的昵称",
						value3:""
					},
					{
						title:"性别",
						zhi:"男",
						showname:"DialogModal2",
						dialogtitle:"您要修改的性别",
						placeholdertext:"请输入你要修改的性别",
						value3:""
					},
					{
						title:"个性签名",
						zhi:"示范法纠纷解决分公司登记分",
						showname:"DialogModal3",
						dialogtitle:"您要修改的个性签名",
						placeholdertext:"请输入你要修改的个性签名",
						value3:""
					}
				]
			}
		},
		methods:{
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Modify(value4,index){
				this.Personalinformationlist[index].zhi = value4
				this.modalName = null
			},
		}
	}
</script>

<style>
</style>
