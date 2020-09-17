<template>
	<view class="CustomerBox" :style="{'padding-top':statusBar+'px'}">
		<defaultbgblackcolorwhitebar></defaultbgblackcolorwhitebar>
		<scroll-view class="cu-chat" :scroll-y="true" :scroll-top="scrollTop" :class="bool?'cu-chatActive':'cu-chatActivea'" @scrolltoupper="pullUp">
			<!-- 连接客服的按钮 -->
			<view class="customerservice" @tap="reconnection" v-show="this.$store.state.isconnectserver">
			    <image :src="this.$store.state.imgyuming+'/uploads/app/image/customerservice/service.png'" mode=""></image>
			</view>
			<view class="commodityBox" v-if="shoplinknew=='storeshop' && shopbool==false">
				<!-- 这是用户店铺进来的时候 -->
					<view class="commodity">
						<view class="img">
							<image :src="this.$store.state.imgyuming+JSON.parse(shopopction.shopimg)" mode=""></image>
						</view>
						<view class="particulars">
							<view class="presentation">
								<text>{{shopopction.shoptitle}}</text>
							</view>
							<view class="pic">
								<!--如果商品的价格和促销的价格一致 那就采用促销价格 如果不一样的 促销价格肯定低至商品的价格 -->
								<text>
									￥{{shopopction.shopprice==shopopction.shoppromotion_price?shopopction.shoppromotion_price:shopopction.shoppromotion_price+'-'+shopopction.shopprice}}
									</text>
							</view>
							<view class="send">
								<button class="cu-btn round" @tap="sendCustomershop">发给客服</button>
							</view>
						</view>
					</view>
				</view>
		<!-- <cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">聊天</block></cu-custom> -->
			<view class="blurbshopdefault" v-if="shopbool">
				<view class="blurbBox">
						<view class="img">
							<image :src="imgpath+JSON.parse(shopopction.shopimg)" mode=""></image>
						</view>
						<view class="pic">
							<text>
								￥{{shopopction.shopprice==shopopction.shoppromotion_price?shopopction.shoppromotion_price:shopopction.shoppromotion_price+'-'+shopopction.shopprice}}
								</text>
						</view>
						<view class="letter">
							<text>{{shopopction.shoptitle}}</text>
						</view>
						<view class="discounts">
							<text>店铺劵满80送20</text>
						</view>
						<view class="commodityshop">
							<text class="cuIcon-shopfill"></text><text>{{shopopction.storename}}</text>
						</view>
				</view>
			</view>
			<!-- 客服聊天记录 -->
			<view>
				<view
					class="cu-item" 
					v-for="(item,index) in this.$store.state.chatlist" 
					:key="index+1"
					:class="item.from_id==72?'self':''"
				>
					<!-- 这是客服的头像 -->
					<view 
						class="cu-avatar radius radios" 
						:style="{'background-image':'url('+'http://service.3call.net'+item.from_avatar+')'}"
						v-if="isNaN(item.from_id)"
					></view>
					<!-- 这是两个人发送的内容 -->
					<view class="main">
						<!-- 两个发送内容的气泡 -->
						<view 
							class="content shadow"
							:class="!isNaN(item.from_id)?'bg-green':''"
						>
							<text v-html="item.content"></text>
						</view>
					</view>
					<!-- 这是用户的头像 -->
					<view 
						class="cu-avatar radius radios" 
						:style="{'background-image':'url('+item.from_avatar+')'}"
						v-if="!isNaN(item.from_id)"
					></view>
					<!-- <view class="date">2018年3月23日 13:23</view> -->
				</view>
			</view>
			<!-- 如果是用户发送的就给外面加一个self类名 -->
			<view 
				class="cu-item" 
				v-for="(item,index) in this.$store.state.Customersendmsglist" 
				:key="index"
				:class="item.msgtype=='usersend'?'self':''"
			>
				<!-- 这是客服的头像 -->
				<view 
					class="cu-avatar radius radios" 
					:style="{'background-image':'url('+item.avatar+')'}"
					v-if="item.msgtype=='serveReturn'"
				></view>
				<!-- 这是两个人发送的内容 -->
				<view class="main">
					<!-- 两个发送内容的气泡 -->
					<view 
						class="content shadow"
						:class="item.msgtype=='usersend'?'bg-green':''"
					>
						<text v-html="item.sendmsgdata"></text>
					</view>
				</view>
				<!-- 这是用户的头像 -->
				<view 
					class="cu-avatar radius radios" 
					:style="{'background-image':'url('+item.avatar+')'}"
					v-if="item.msgtype=='usersend'"
				></view>
				<!-- <view class="date">2018年3月23日 13:23</view> -->
			</view>
			<!-- 链接状态 -->
			<view class="messagejudge">
			    <text>{{this.$store.state.linkstate}}</text> 
			</view>
			
			<!-- <view class="cu-info round">对方撤回一条消息!</view> -->
			<!-- <view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						<text>喵喵喵！喵喵喵！</text>
					</view>
				</view>
				<view class="date "> 13:23</view>
			</view> -->
			<!-- 这是用户把另一个用户删了出来的提示 -->
			<!-- <view class="cu-info">
				<text class="cuIcon-roundclosefill text-red "></text> 对方拒绝了你的消息
			</view>
			<view class="cu-info">
				对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
				<text class="text-blue">发送好友验证</text>
			</view> -->
			<!-- 这是发送的图片 -->
			<!-- <view class="cu-item self">
				<view class="main">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date"> 13:23</view>
			</view> -->
			<!-- 这是语音 -->
			<!-- <view class="cu-item self">
				<view class="main">
					<view class="action text-bold text-grey">
						3"
					</view>
					<view class="content shadow">
						<text class="cuIcon-sound text-xxl padding-right-xl"> </text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view> -->
			<!-- 这是右边的用户向左边的用户发送的消息 -->
			<!-- <view class="cu-item self">
				<view class="main">
					<view class="action">
						<text class="cuIcon-locationfill text-orange text-xxl"></text>
					</view>
					<view class="content shadow">
						喵星球，喵喵市
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view> -->
			<!-- 这是左边的用户 向右边的用户发送的消息 -->
			<!-- <view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						@#$^&**
					</view>
					<view class="action text-grey">
						<text class="cuIcon-warnfill text-red text-xxl"></text> <text class="text-sm margin-left-sm">翻译错误</text>
					</view>
				</view>
				<view class="date">13:23</view>
			</view>-->
			<view id='gundong' style='height:2rpx;width:100%'></view>
		</scroll-view>
		<view class="bottom_input foot input">
			<!-- 这是input旁边的那些dom -->
			<view class="cu-bar">
				<view class="action" @tap="showModal" data-target="Modal">
					<text class="cuIcon-pic text-grey Icon_face"></text>
				</view>
				<!-- <input class="solid-bottom" :adjust-position="false" :focus="inputshow" maxlength="300" cursor-spacing="10"
				 @focus="InputFocus" @blur="InputBlur" v-model="inpvalue" @input="inputvalue"></input> -->
				 <!-- <view class="inp" contenteditable="true"  @input="inputvalue" v-html="inpvalue"></view> -->
				 <!-- 输入的聊天框 -->
					 <editor id="editor" class="ql-container"  @ready="onEditorReady" @focus="InputFocus" @blur="InputBlur"></editor>
				
				 
				 
				<view class="action">
					<text class="cuIcon-emojifill text-grey Icon_face" @tap="expression"></text>
				</view>
				<button class="cu-btn bg-green shadow send" @tap="sendmsg">发送</button>
			</view>
			<!-- 这是表情 -->
			<view class="expression" v-if="bool">
					<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
						:autoplay="false" interval="5000" duration="500">
						<swiper-item 
							v-for="(items,index) in swiperList" 
							:key="index"
							class="swiper-item"
						>
							<view class="meme_list" >
								<image 
									v-for="(item,indexs) in 21" 
									:key="indexs" 
									:data-imgIndex="indexs"
									:data-swiperItemIndex="index"
									:src="imgpath+'/uploads/app/image/Expressionpackage/'+(indexs+items.bigurl)+'.gif'" 
									:data-src="imgpath+'/uploads/app/image/Expressionpackage/'+(indexs+items.bigurl)+'.gif'"
									@tap="Meme"
									class="cover-images"
								></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
		</view>
		<!-- 这是模态框 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''" @tap="hideModal">
			<view class="cu-dialog">
				<view class="padding-xl cameraphotoAndalbum">
					<view 
						class="Photoalbum Photo" 
						v-for="(item,index) in Photo" 
						:key="index" 
						@tap.stop="choosePhoto"
						:data-indexs="index"
					>
						<image :src="item.img" class="img"></image>
						<text class="titlename">{{item.titleName}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import defaultbgblackcolorwhitebar from "@/components/actionbar/defaultbgblackcolorwhitebar.vue"
	const app = getApp()
	//这是客服
	export default {
		data() {
			return {
				statusBar:0,
				shopopction:"",//这是商品跳进来的
				shoplinknew:"",//判断是在过来的
				InputBottom: 0,
				inpvalue:"",
				inpvaluestr:"",//这是带image标签的
				shopbool:false,//判断是不是点击了发给客服按钮
				focusautomatic:false,//控制键盘是否自动弹出来
				inputshow:false,
				modalName: null,
				screenHeight:0,//屏幕的高度
				keyboardHeight:0,//键盘的高度 用于计算
				oldbottom:0,//// 记录 滚动 元素的 bottom 值
				scrollTop:0,//卷区的高度
				Photo:[
					{
						img:`${this.$store.state.httpUrl}chat/Photoalbum.png`,
						titleName:"相册"
					},
					// #ifdef APP-PLUS
					{
						img:`${this.$store.state.httpUrl}chat/camera.png`,
						titleName:"相机"
					},
					// #endif
				],
				imgList:[],//相册
				bool:false,
				swiperList: [{
					id: 0,
					type: 'image',
					bigurl:0
				}, {
					id: 1,
					type: 'image',
					bigurl:21,
				},
				{
					id:2,
					type:'image',
					bigurl:42
				},
				{
					id:3,
					type:'image',
					bigurl:63
				}],
				dotStyle: false,
				expressionlist:[
					[
						{name:'face[微笑]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/0.gif`},
						{name:'face[嘻嘻]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/1.gif`},
						{name:'face[哈哈]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/2.gif`},
						{name:'face[可爱]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/3.gif`},
						{name:'face[可怜]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/4.gif`},
						{name:'face[挖鼻]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/5.gif`},
						{name:'face[吃惊]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/6.gif`},
						{name:'face[害羞]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/7.gif`},
						{name:'face[挤眼]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/8.gif`},
						{name:'face[闭嘴]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/9.gif`},
						{name:'face[鄙视]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/10.gif`},
						{name:'face[爱你]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/11.gif`},
						{name:'face[泪]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/12.gif`},
						{name:'face[偷笑]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/13.gif`},
						{name:'face[亲亲]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/14.gif`},
						{name:'face[生病]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/15.gif`},
						{name:'face[太开心]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/16.gif`},
						{name:'face[白眼]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/17.gif`},
						{name:'face[右哼哼]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/18.gif`},
						{name:'face[左哼哼]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/19.gif`},
						{name:'face[嘘]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/20.gif`}
					],
					[
						{name:'face[哀]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/21.gif`},
						{name:'face[委屈]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/22.gif`},
						{name:'face[吐]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/23.gif`},
						{name:'face[哈欠]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/24.gif`},
						{name:'face[抱抱]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/25.gif`},
						{name:'face[怒]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/26.gif`},
						{name:'face[疑问]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/27.gif`},
						{name:'face[馋嘴]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/28.gif`},
						{name:'face[拜拜]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/29.gif`},
						{name:'face[思考]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/30.gif`},
						{name:'face[汗]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/31.gif`},
						{name:'face[困]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/32.gif`},
						{name:'face[睡]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/33.gif`},
						{name:'face[钱]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/34.gif`},
						{name:'face[失望]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/35.gif`},
						{name:'face[酷]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/36.gif`},
						{name:'face[色]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/37.gif`},
						{name:'face[哼]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/38.gif`},
						{name:'face[鼓掌]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/39.gif`},
						{name:'face[晕]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/40.gif`},
						{name:'face[悲伤]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/41.gif`}
					],
					[
						{name:'face[抓狂]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/42.gif`},
						{name:'face[黑线]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/43.gif`},
						{name:'face[阴险]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/44.gif`},
						{name:'face[怒骂]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/45.gif`},
						{name:'face[互粉]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/46.gif`},
						{name:'face[心]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/47.gif`},
						{name:'face[伤心]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/48.gif`},
						{name:'face[猪头]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/49.gif`},
						{name:'face[熊猫]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/50.gif`},
						{name:'face[兔子]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/51.gif`},
						{name:'face[ok]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/52.gif`},
						{name:'face[耶]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/53.gif`},
						{name:'face[good]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/54.gif`},
						{name:'face[NO]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/55.gif`},
						{name:'face[赞]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/56.gif`},
						{name:'face[来]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/57.gif`},
						{name:'face[弱]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/58.gif`},
						{name:'face[草泥马]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/59.gif`},
						{name:'face[神马]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/60.gif`},
						{name:'face[囧]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/61.gif`},
						{name:'face[浮云]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/62.gif`},
					],
					[
						{name:'face[给力]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/63.gif`},
						{name:'face[围观]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/64.gif`},
						{name:'face[威武]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/65.gif`},
						{name:'face[奥特曼]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/66.gif`},
						{name:'face[礼物]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/67.gif`},
						{name:'face[钟]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/68.gif`},
						{name:'face[话筒]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/69.gif`},
						{name:'face[蜡烛]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/70.gif`},
						{name:'face[蛋糕]',url:`${this.$store.state.imgyuming}/uploads/app/image/Expressionpackage/71.gif`},
						
					]
				],
				imgpath:this.$store.state.imgyuming
			}
		},
		methods: {
			InputFocus(e) {
				// this.bool = false
				//这里为了获取键盘的高度
				uni.onKeyboardHeightChange((res)=>{
					this.InputBottom = res.height
					this.keyboardHeight =res.height
				})
			},
			// 当用户点击 商品发送给客服的时候触发该事件
			sendCustomershop(){
				this.shopbool = true
			},
			InputBlur(e) {
				this.InputBottom = 0
				this.keyboardHeight = 0
				// if(this.bool){
				// 	this.bool = false
				// }
			},
			//当用户点击发送消息的时候
			sendmsg(){
				const _this = this
				// console.log(_this.inpvalue)
				this.editorCtx.getContents({
					success(res){
						
						_this.$store.commit("Customersendmsg",{textvalue:res.html})
						_this.editorCtx.clear({
							success: function(res) {
							}
						})
					}
				})
				uni.createSelectorQuery().select("#gundong").boundingClientRect((res)=>{
					// console.log(res) 
					var newbottom = res.bottom
					if(Number(newbottom) > Number(this.oldbottom)){
							this.scrollTop = newbottom
						}
					 this.oldbottom = newbottom
				}).exec();
				// _this.inpvalue = ""
				// console.log(this.inpvalue)
			},
			
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				this.bool = false
			},
			hideModal() {
				this.modalName = null
			},
			//用户选择相机或者相册  进行不同的操作
			choosePhoto(e){
				let {indexs} = e.currentTarget.dataset
				if(parseInt(indexs)==0){
					//这是相册
					this.ChooseImage("album")
				}else{
					//这是相机
					this.ChooseImage("camera")
				}
			},
			//封装调用相机还是相册
			ChooseImage(choosePhotoaAnd) {
				const _this = this
				uni.chooseImage({
					count:1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [choosePhotoaAnd], //通过传参不同调用不同的 相册或者相机
					success: (res) => {
						uni.uploadFile({
							url:`${app.globalData.Requestpath}common/uploadImage?type=customer`,
							filePath:res.tempFilePaths[0],
							name:"file",
							fileType:"image",
							success(resimg){
								
								let resimgparse = JSON.parse(resimg.data)
								// console.log(resimgparse)
								if(resimgparse.code==0){
									// 现在图片 是老服务器才能实现 
									_this.$store.commit("Customersendmsg",{textvalue:`<image style='width:80px;' src='${"http://hbk.huiboke.com"+resimgparse.data.src}'></image>`})
									_this.hideModal()
								}
							},
							fail(err){
								
							}
						})
						
						
					}
				});
			},
			expression(){
					this.bool = !(this.bool)
			},
			//当用户输入值的时候
			// inputvalue(e){
			// 	this.inpvaluestr = e.detail.value
			// },
			Meme(e){
				// console.log(e.currentTarget.dataset)
				let {imgindex,swiperitemindex,src} = e.currentTarget.dataset
				// console.log(this.expressionlist[swiperitemindex][imgindex].name)
				this.editorCtx.insertImage({
					src,
					alt: '图像',
					data:{
						face:this.expressionlist[swiperitemindex][imgindex].name
					},
					success: function() {
						// console.log('insert image success')
						// console.log('点击图片')
						
					}
				})
			},
			//初始化富文本
			onEditorReady(){
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			//联系客服按钮
			reconnection(){
				this.$store.commit("connect",{typestore:this.statestore,expressionlist:this.expressionlist})
			},
			//上拉消息记录
			pullUp(){
				if(this.$store.state.chatpages){
					this.$store.state.chatpages--
					this.$store.commit("record",this.$store.state.chatpages)
				}
			}
		},
		onLoad(opction){
			// console.log(this.expressionlist)
			// console.log("已经入onload的事件")
			const _this = this
			let {shoplink,statestore} = opction
			_this.shoplinknew = shoplink
			_this.statestore = statestore
			// 这里是商品详情跳转过来的 就不用了解构了  直接用  为了少定义变量
			_this.shopopction = opction
			//传入 参数 判断以后点击的 是平台 0 店铺 1
			this.$store.commit("connect",{typestore:statestore,expressionlist:this.expressionlist})
			this.statusBar = app.globalData.statusBar
			//当用户已进入页面的时候  在缓存中 取值如果没有  就让键盘自动弹出来  获取用户的键盘的高度 
		},
		created() {
			// console.log(111)
			const _this = this
			//获取系统的信息
			uni.getSystemInfo({
				success(res) {
					_this.screenHeight = res.screenHeight
				}
			})
		},
		beforeDestroy(){
			this.$store.commit("soketclose")
		},
		mounted(){
			// 滚动条的距离
			uni.createSelectorQuery().select("#gundong").boundingClientRect((res)=>{
					this.oldbottom = res.bottom  // 记录 滚动 元素的 bottom 值
				}).exec()
		},
		updated(){
			// uni.createSelectorQuery().select("#gundong").boundingClientRect((res)=>{
			// 	// console.log(res) 
			// 	var newbottom = res.bottom
			// 	if(Number(newbottom) > Number(this.oldbottom)){
			// 			this.scrollTop = newbottom
			// 		}
			// 	 this.oldbottom = newbottom
			// }).exec();
		},
		//销毁前
		beforeDestroy(){
			// console.log(1111)
			this.$store.commit("soketclose")
			this.$store.state.chatlist = []
			this.$store.state.Customersendmsglist = []
			this.$store.state.chatpages = 0
		},
		components:{
			defaultbgblackcolorwhitebar
		},
		//当页面
		onHide(){
			// console.log(111)
			//先清除前面的定时器
			this.$store.commit("hiendsocket")
		},
		onUnload(){
			//如果用户在加入到后台的时候 sokettime不为空的时候 
			if(this.$store.state.sokettime!==null){
				clearInterval(this.$store.state.hiensoketime)
				this.$store.commit("soketclose")
			}else{
				this.$store.commit("soketclose")
			}
			// console.log(222,"页面卸载")
			// this.$store.commit("soketclose")
			this.$store.state.chatlist = []
			this.$store.state.Customersendmsglist = []
			this.$store.state.chatpages = 0
		},
		onShow(){
			// console.log("页面显示",this.$store.state.hiensoketime)
			if(this.$store.state.sokettime!==null){
				// console.log("不等于null")
				clearInterval(this.$store.state.hiensoketime)
				this.$store.commit("ContinuousSendPing")
			}
		}
	}
</script>

<style lang="less" scoped>
  page{
    background-color: #F5F5F5;
    padding-bottom: 100rpx;
  }
  .CustomerBox{
	  
  }
  .cu-chat{
	  height:92vh;
	  overflow: hidden;
	  // background-color:deeppink;
  }
  .inp{
	  width: 65%;
	  height:60rpx;
	  // background-color:red;
	  outline: none;
  }
  .cameraphotoAndalbum{
	  display:flex;
	  justify-content: space-between;
	  
	  .Photo{
		  width: 35%;
		  height:200rpx;
		  border:2rpx solid #ccc; 
		  // background-color:green;
		  .img{
			  width: 60%;
			  height:60%;
			  margin:20rpx 0 10rpx;
		  }
		  .titlename{
			display:block;  
		  }
	  }
  }
  .bottom_input{
     position: absolute;
     bottom: 0;
	 left:0;
     width: 100%;
	 background-color:#f2f2f2;
    }
  .expression{
	   .meme_list{
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			background-color: #FFFFFF;
		.cover-images{
			 width: 60rpx;
			 height: 60rpx;
			 margin: 20rpx;
			 // position: relative;
			 // z-index: 99999 !important;
			 pointer-events:auto;
		}
	   }
  }
  .commodityBox{
  		width: 100%;
  		height: 208rpx;
  		margin-top: 50rpx;
  		padding: 0 20rpx;
  		.commodity{
  			width: 100%;
  			height: 100%;
  			background-color: #FFFFFF;
  			padding: 20rpx;
  			display: flex;
  			border-radius: 20rpx;
  			justify-content: space-between;
  			.img{
  				height: 167rpx;
  				width: 167rpx ;
  				image{ 
  					width: 100%;
  					height: 100%;
  					border-radius: 10rpx;
  				}
  			}
  			.particulars{
  				width: 460rpx;
  				.presentation{
  					width: 100%;
  					text{
  						font-size: 30rpx;
  					}
  				}
  				.pic{
  					width: 100%;
  					text{
  						color: #ff4e14;
  						font-size: 34rpx;
  						font-weight: bold;
  					}
  				}
  				.send{
  					width: 100%;
  					display: flex;
  					flex-direction:row-reverse;
  					padding: 4rpx 0;
  					.cu-btn{
  						margin-top: -10rpx;
  						background-color: #fe8000;
  						color: #FFFFFF;
  						height: 50rpx !important;
  						padding: 0 20rpx;
  					}
  				}
  			}
  		}
  	}
	.blurbshopdefault{
		display:flex;
		justify-content: center;
		.blurbBox{
				width: 400rpx;
				background-color: #ffffff;
				border-radius: 30rpx;
				.img{
					width: 100%;
					image{
						width: 100%;
						height: 400rpx;
					}
				}
				.pic{
					width: 100%;
					padding: 8rpx 20rpx;
					text{
						color: #ff4f06;
						font-weight: bold;
						font-size: 32rpx;
					}
				}
				.letter{
					width: 100%;
					padding: 10rpx 20rpx;
					text{
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
				.discounts{
					padding: 10rpx 20rpx;
					text{
						display: block;
						width: 180rpx;
						background-color: #fee5e3;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #bd683a;
						padding: 4rpx 10rpx;
					}
				}
				.commodityshop{
					padding: 10rpx 20rpx 20rpx 20rpx;
					text{
						color: #969696;
					}
				}
			}
		}
		
		
			.ql-container{
				width: 420rpx;
				background-color: #FFFFFF;
				border-radius: 50rpx 50rpx 50rpx 50rpx;
				height: 70rpx;
				min-height: 70rpx;
				// line-height: 80rpx;
				padding: 18rpx 10rpx;
			}
		.send{
			width: 120rpx;
			height: 60rpx;
		}
		// .cu-bar .action>uni-text[class*="cuIcon-"], .cu-bar .action>uni-view[class*="cuIcon-"]{
		// 	font-size: 64rpx;
		// }
	.Icon_face{
		font-size: 44rpx !important;
	}
	 
	 .cu-bar{
	  padding: 0 10rpx;
	 }
	 .messagejudge{
	    text-align: center;
	    text{
	     padding: 10rpx 20rpx;
	     border-radius: 50rpx;
	     background-color: #e1e1e1;
	     color:#bfbfbf;
	   }
	 }
	.customerservice{
			  position: fixed;
			  right: 0;
			  top: 20%;
			  width: 80rpx;
			  background-color: #D9D9D9;
			  z-index: 99;
			  // border-radius: 30rpx;
			  // padding: 10rpx 20rpx;
			  image{
				  width: 80rpx;
				  height: 80rpx;
			  }
		  }
	.radios{
		border-radius:50%;
	}
	.cu-chatActivea{
		  height:92vh;
	  }
	  .cu-chatActive{
		  height: 60vh;
	  }
</style>
