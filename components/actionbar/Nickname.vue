<template>
	<view class="nickname-box">
		<view class="nickname">
			<view class="cu-bar bg-white margin-top" :style="{'min-height':'80rpx'}" @click="showModal" data-target="DialogModal1">
				<view class="action">
					<text>昵称</text>
				</view>
				<view class="action">
					<!--  @tap="showModal" -->
					<text :style="{'margin-right': '44rpx'}">{{value?value:"明天的你又努力了"}}</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">您要修改的昵称</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<input :value="value" type="text" placeholder="请输入你要修改的昵称">
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn bg-green margin-left" @tap="Modify(value)">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="nickname">
			<view class="cu-bar bg-white margin-top" :style="{'min-height':'80rpx'}" @click="showModal" data-target="DialogModal1">
				<view class="action">
					<text>性别</text>
				</view>
				<view class="action">
					<!--  @tap="showModal" -->
					<text :style="{'margin-right': '44rpx'}">{{value1?value1:"男"}}</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">您要修改的昵称</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<input :value=value1 type="text" placeholder="请输入您要修改的昵称">
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn bg-green margin-left" @tap="Modify(value1)">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="nickname">
			<view class="cu-bar bg-white margin-top" :style="{'min-height':'80rpx'}" @click="showModal" data-target="DialogModal1">
				<view class="action">
					<text>个性签名</text>
				</view>
				<view class="action">
					<!--  @tap="showModal" -->
					<text :style="{'margin-right': '44rpx'}">{{value2?value2:"明天的你又努力了"}}</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">您要修改的个性签名</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<input :value="value2" type="text" placeholder="请输入您要修改的个性签名">
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn bg-green margin-left" @tap="Modify(value2)">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return {
				modalName: null,
				value:"",
				value1:"男",
				value2:"我我"
			}
		},
		methods:{
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Modify(value3){
				console.log(value3)
				// this.value = this.value
				
				// this.modalName = null
			},
		}
	}
</script>

<style>
</style>
