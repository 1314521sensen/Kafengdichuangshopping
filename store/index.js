import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

let Requestpath = "http://hbk.huiboke.com/api/"

let state = {
	cartList:[],//购物车的数据
	allSelected:false,//购物车的全选状态
	count:0,//这是用来存储总价
	specificationslist:[],//这是规格的数据
	tokey:"",
	pages:1,
	orderlist:[],//用来存储订单的信息
	Temporarynonpaymentlist:[],//这是订单的列表
	orderlistshop:[],//这是用于存储订单内的商品列表
	ordercreatetime:"",//订单创建的时间
	tokey:"",//tokey值
	loadModal:false,//快递里面的加载图标
	kiadigongsi:false,//是否显示那个快递的文字
	Couriercompanyname:"",//快递的文字
	express_code:"",//快递公司的编码
	Traceslist:[],//这是物流的列表
	evaluationlist:[],//这是用来操作评价的列表
	evaluationlistitem:[],//用于存放每个评价列表的item
	refundreturnlist:[],//用于退货退款列表
}
//getters 用于计算
let getters = {
	//获取选中的每一件商品
	totalprice:state=>{
		//由于遍历 导致每次coune迭代增加 在增加之前先变为0
		state.count = 0
		state.cartList.forEach((item,index)=>{
			item.sub.forEach((Items,Indexs)=>{
				if(Items.checked==true){
					state.count += ((Number(Items.good_price)*Items.good_num)+Number(Items.good_freight))
				}
			})
		})
		let countarr = String(state.count).split('.')
		if(countarr[1]){
			return Number(countarr[0]+'.'+countarr[1].substr(0,2))
		}else{
			return Number(String(state.count))+'.00'
		}
	}
}
//mutations 用于存放方法 唯一改变state里面的值
let mutations = {
	/*----通用方法----*/
	//获取tokey
	gettokey(){
		uni.getStorage({
			key:"bindtokey",
			success(restokey) {
				state.tokey = restokey.data
			}
		})
	},
	//封装个提示框
	getshowmodel(state,modelmsg){
		let {msg} = modelmsg
		uni.showToast({
			title:msg,
			icon:"none"
		})
	},
	
	
	
	
	/*---购物车的操作----*/
	//加入购物车
	Addcart(state,addObj){
		const _this = this
		console.log(addObj)
		let {s_name,g_name,g_pic,gid,sid,couplebool} = addObj
		uni.getStorage({
			key:"bindtokey",
			success(restokey) {
				// console.log(res.data)
				uni.request({
					url:`${Requestpath}shopping_cart/addShoppingCartInfo`,
					method:"POST",
					data:{
						token:restokey.data,
						sid,
						s_name,
						gid,
						g_name,
						g_pic,
						g_type:couplebool
					},
					success(res) {
						if(res.data.code==0){
							_this.commit("getcarlist")
							uni.switchTab({
								url:"/pages/shoppingCart/shoppingCart"
							})
						}
					}
				})
			}
		})
		
		
	},
	getcarlist(){
		//请求购物车列表的数据
		const _this = this
		uni.getStorage({
			key:"bindtokey",
			success(restokey) {
				_this.state.tokey = restokey.data
				uni.request({
					url:`${Requestpath}shopping_cart/getShoppingCartList`,
					method:"POST",
					data:{
						token:_this.state.tokey,
						page:_this.state.pages,
						pageSize:10
					},
					success(res) {
						console.log(res)
						if(res.data.code==0){
							if(_this.state.pages>1){
								_this.state.cartList = _this.state.cartList.concat(res.data.data)
							}else{
								_this.state.cartList = res.data.data
							}
						}else{
							if(res.data.code==1 && res.data.msg=="令牌错误"){
								uni.reLaunch({
									url:"/pages/login/login"
								})
								return
							}
						}
					}
				})
			}
		})
	},
	//获取每个商品的规格的数据
	getspecifications(state,specificationobj){
		// console.log(specificationobj)
		let {sid,gid} = specificationobj
		uni.request({
			url:`${Requestpath}good/getGoodSpecListOneLever`,
			data:{
				sid,
				gid
			},
			success(res) {
				if(res.data.code==0){
					state.specificationslist = res.data.data
				}
			}
		})
	},
	//每个小商品点击的选中那点击的时候
	itemscheck(state,itemObj){
		//解构子组件里面传过来的值
		let {indexs,childindex} = itemObj
		//当每个小商品选中的按钮点击时 就改变每个小按钮的状态
		let checkboxs = state.cartList[indexs].sub[[childindex]].checked
		//如果当前的小按钮的状态如果true的时候 就让变为false
		if(checkboxs){
			state.cartList[indexs].sub[[childindex]].checked  = false
		}else{
			//否则当前的小按钮的状态如果true的时候 就让变为true
			state.cartList[indexs].sub[[childindex]].checked = true
		}
	},
	//点击店铺的选中的标识时
	fathercheck(state,fatherObj){
		let {indexs} = fatherObj
		//如果当前的选中的小按钮为true的情况 就变为false
		if(state.cartList[indexs].checked){
			state.cartList[indexs].checked = false
			// console.log(state.cartList[indexs])
			state.cartList[indexs].sub.forEach((item,index)=>{
				item.checked = false
			})
		}else{
			state.cartList[indexs].checked = true
			// console.log(state.cartList[indexs])
			state.cartList[indexs].sub.forEach((item,index)=>{
				item.checked = true
			})
		}
	},
	//当每一个小商品数量点击减号时 或减号时 根据布尔值判断 点击的是加号还是减号
	Increasereduce(state,childObj){
		let {indexs,childindex,bool} = childObj
		//因为传过来的是字符串 0或者1 需要先parseInt转为整形 在进行转为bool值进行判断
		if(Boolean(parseInt(bool))){
			//为true的时候 点击了+
			state.cartList[indexs].sub[childindex].good_num++
		}else{
			//为false的时候点击了 false
			state.cartList[indexs].sub[childindex].good_num--
			if(state.cartList[indexs].sub[childindex].good_num<=1){
				uni.showToast({
					title:"数量不能小于1",
					icon:"none",
					success(){
						state.cartList[indexs].sub[childindex].good_num = 1
					}
				})
			}
		}
	},
	//当点击删除商品的时候
	deleteshop(){
		// console.log(_this.state.tokey)
		const _this = this
		//获取每一项小商品
		let arr = []
		state.cartList.forEach((item,index)=>{
			item.sub.forEach((Items,Indexs)=>{
				if(Items.checked==true){
					// console.log(Items.cart_id)
					arr.push(Items.cart_id)
				}
			})
		})
		console.log(arr)
		uni.request({
			url:`${Requestpath}shopping_cart/deleteMultiShoppingCartInfo`,
			method:"POST",
			data:{
				token:_this.state.tokey,
				cids:arr
			},
			success(res) {
				console.log(res)
				if(res.data.code==0){
					//调用mutations里面自身的方法
					_this.commit("getcarlist")
				}else{
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
				}
			}
		})
	},
	//更新购物车的规格
	Updatespecifications(state,UpdatespecificationsObj){
		const _this = this
		let {gid,specificationid} = UpdatespecificationsObj
		// console.log(gid,specificationid)
		uni.request({
			url:`${Requestpath}shopping_cart/updateGoodSpec`,
			method:"POST",
			data:{
				token:_this.state.tokey,
				gid:gid,
				spec_id:specificationid
			},
			success(res) {
				// console.log(res)
				//如果更新成功 就重新加载的数据
				if(res.data.code==0){
					_this.commit("getcarlist")
				}
			}
		})
	},
	//当滚动底部的时候
	scrolltolower(){
		this.state.pages++
		this.commit("getcarlist")
	},
	//跳到订单页面获取订单里面的值逻辑
	Saveorder(state,shopvalue){
		console.log(shopvalue)
		const _this = this
		//将传过来的值 进行结构出来
		let {fromvalue,publicShopdetails} = shopvalue
		_this.state.orderlist = []
		//判断传过来的标识 如果1就是购物车过来的 否则就是商品详情过来的
		if(parseInt(fromvalue)){
			//这里是购物车过来的
			_this.state.cartList.forEach((item,index)=>{
				item.sub.forEach((items,indexs)=>{
					if(items.checked){
						_this.state.orderlist.push(items)
					}
				})
			})
			// console.log(_this.state.orderlist)
		}else{
			//这里是商品详情过来的
			_this.state.orderlist.push(publicShopdetails)
		}
		//判断数组的长度大于1的时候证明用户选择了商品
		if(_this.state.orderlist.length>=1){
			uni.setStorage({
				key:"orderinfo",
				data:_this.state.orderlist,
				success() {
					uni.navigateTo({
						url:`/pages/Purchasepage/Purchasepage`
					})
				}
			})
		}
	},
	
	
	/*---订单----*/
	//请求订单信息的方法 29a8b269b62da603424f405be0a767dc
	getTemporarynonpayment(state,TabCurindex){
		this.commit("gettokey")
		let {index,geturl} = TabCurindex
		uni.request({
			url:Requestpath+geturl,
			method:"POST",
			data:{
				token:state.tokey,
				page:1,
				pageSize:10
			},
			success(res) {
				// console.log(res)
				if(res.data.code==0){
					state.Temporarynonpaymentlist = res.data.data.list
				}
			}
		})
	},
	//列表外面的删除订单
	deletescollectionAndfootprint(state,delectorder){
		const _this = this
		let {order_sn,TabCur,url} = delectorder
		this.commit("gettokey")
		uni.showModal({
			title:"亲!",
			content:"您确定要删除的该订单",
			showCancel:true,
			cancelText:"取消",
			cancelColor:'#f00',
			confirmText:"确认删除",
			confirmColor:'#0f0',
			success:res=>{
				if(res.confirm){
					uni.request({
						url:`${Requestpath}order/deleteOrderInfo`,
						method:"POST",
						data:{
							token:state.tokey,
							o_sn:order_sn
						},
						success(res) {
							if(res.data.code==0){
								_this.commit("getshowmodel",{msg:res.data.msg})
								_this.commit("getTemporarynonpayment",{index:TabCur,geturl:url})
							}else{
								_this.commit("getshowmodel",{msg:res.data.msg})
							}
						}
					})
				}
			}
		})
	},
	//点击跳转订单内
	linkDetails(state,orderinfo){
		// state.order_sn = order_sn
		let {order_sn,title,dispatch_price,swift_no,address_id,buyer_name,price} = orderinfo
		uni.setStorage({
			key:"ordertitle",
			data:{
				//这是商品的标题
				title,
				//这是商品的订单编号
				order_sn,
				//改价后的快递费
				dispatch_price,
				//订单流水号
				swift_no,
				//收货地址id
				address_id,
				//用户名称
				buyer_name,
				//订单总价
				price
			}
		})
		uni.navigateTo({
			url:`/pages/Temporarynonpayment/Temporarynonpayment`
		})
	},
	//获取订单里的订单商品的列表
	getorderlist(){
		this.commit("gettokey")
		uni.getStorage({
			key:"ordertitle",
			success(res){
				uni.request({
					url:`${Requestpath}order/getOrderGoodList`,
					method:"POST",
					data:{
						token:state.tokey,
						order_sn:res.data.order_sn,
						page:1,
						pageSize:10
					},
					success(res) {
						// console.log(res.data.data.list)
						if(res.data.code==0){
							state.orderlistshop = res.data.data.list
							state.ordercreatetime = res.data.data.list[0].create_time
						}
					}
				})
			}
		})
	},
	//如果在订单付款的时候，用户点击了×号 回跳到订单里面 根据订单号进行请求信息 (后期说)
	//确认收货
	Confirmgoods(state,ordergoods){
		const _this = this
		// console.log(ordergoods)
		_this.commit("gettokey")
		let {order_sn} = ordergoods
		uni.request({
			url:`${Requestpath}order/confirmPayOrder`,
			method:"POST",
			data:{
				token:state.tokey,
				o_sn:order_sn,
			},
			success(res) {
				if(res.data.code==0){
					_this.commit("getshowmodel",{msg:res.data.msg})
					uni.redirectTo({
						url:"/pages/evaluate/evaluate"
					})
				}else{
					if(res.data.msg=="订单状态错误" && res.data.code==1){
						_this.commit("getshowmodel",{msg:"请耐心等待卖家发货"})
						return 
					}
					_this.commit("getshowmodel",{msg:res.data.msg})
				}
			}
		})
	},
	//取消订单
	Confirmcancel(state,cancelorder){
		const _this = this
		_this.commit("gettokey")
		let {order_sn} = cancelorder
		uni.request({
			url:`${Requestpath}order/unPayOrderToCancel`,
			method:"POST",
			data:{
				token:state.tokey,
				o_sn:order_sn
			},
			success(res) {
				if(res.data.code==0){
					_this.commit("getshowmodel",{msg:res.data.msg})
					setTimeout(()=>{
						uni.redirectTo({
							url:`/pages/orderpageRouter/orderpageRouter`
						})
					},1500)
				}else{
					_this.commit("getshowmodel",{msg:res.data.msg})
				}
			}
		})
	},
	//用户退款
	refundparagraph(state,refundobj){
		const _this = this
		let {o_sn,af_price,pay_pwd} = refundobj
		_this.commit("gettokey")
		uni.request({
			url:`${Requestpath}order/applyForRefundOrder`,
			method:"POST",
			data:{
				token:state.tokey,
				o_sn,
				af_price,
				pay_pwd
			},
			success(res) {
				if(res.data.code==0){
					_this.commit("getshowmodel",{msg:res.data.msg+',请耐心等待'})
				}else{
					_this.commit("getshowmodel",{msg:res.data.msg})
				}
			}
		})
	},
	
	
	
	
	/*---订单中的物流---*/
	//用户退货退款或者仅退款需要填写快递公司的信息
	Querysinglenumber(state,returnlogistics){
		const _this = this
		_this.commit("gettokey")
		// console.log(returnlogistics)
		let {value} = returnlogistics
		//如果订单不为空  否则就提示用户物流单号不能为空
		if(value!==""){
			state.kiadigongsi = true
			state.loadModal = true
			uni.request({
				url:`${Requestpath}order/getLogisticCompanyInfo`,
				method:"POST",
				data:{
					e_num:value,
					token:state.tokey
				},
				success(res) {
					if(res.data.code==0){
						state.Couriercompanyname = res.data.data.express_name
						state.loadModal = false
						state.express_code = res.data.data.express_code
					}
				}
			})
		}else{
			this.commit("getshowmodel",{msg:"请输入快递单号"})
		}
	},
	//获取物流信息
	getLogisticsin(){
		const _this = this
		_this.commit("gettokey")
		uni.getStorage({
			key:"express_sn",
			success(res){
				_this.commit("Querysinglenumber",{value:res.data[0]})
				//这是调用物流轨迹
				//定时器用于操控异步
				setTimeout(()=>{
					uni.request({
						url:`${Requestpath}order/getLogisticsInfo`,
						method:"POST",
						data:{
							token:state.tokey,
							ec_code:state.express_code,
							e_num:res.data[0]
						},
						success(res) {
							
							if(res.data.code==0){
								state.Traceslist = res.data.data.Traces
							}
						}
					})
				},1000)
			}
		})
	},
	
	
	
	
	/*----评价---*/
	//获取外面的待评价和已评价的列表
	getevaluationlist(state,evaluationobj){
		let {url} = evaluationobj
		const _this = this
		_this.commit("gettokey")
		uni.request({
			url:`${Requestpath}${url}`,
			method:"POST",
			data:{
				token:state.tokey,
				page:1,
				pageSize:10
			},
			success(res) {
				console.log(res)
				if(res.data.code==0){
					//在根据订单号去查商品
					state.evaluationlist = res.data.data.list
					res.data.data.list.forEach((item,index)=>{
						// console.log(item)
						uni.request({
							url:`${Requestpath}order/getOrderGoodList`,
							method:"POST",
							data:{
								token:state.tokey,
								order_sn:item.order_sn,
								page:1,
								pageSize:10
							},
							success(res) {
								console.log(res)
								if(res.data.code==0){
									state.evaluationlistitem.push(res.data.data.list)
								}
							}
						})
					})
					
				}
			}
		})
	},
	
	
	/*---退款和退货退款的详情---*/
	getrefundreturn(){
		const _this = this
		_this.commit("gettokey")
		uni.request({
			url:`${Requestpath}order/getRefundOrderList`,
			method:"POST",
			data:{
				token:state.tokey,
				page:1,
				pageSize:10
			},
			success(res) {
				console.log(res)
				if(res.data.code==0){
					state.refundreturnlist = res.data.data.list
					uni.request({
						url:`${Requestpath}order/getRefundAndGoodsOrderList`,
						method:"POST",
						data:{
							token:state.tokey,
							page:1,
							pageSize:10
						},
						success(res) {
							console.log(res)
							//因为退货和退款退款两个接口同时的 所以要把他们的数据进行合并
							if(res.data.code==0){
								state.refundreturnlist.concat(res.data.data.list)
							}
						}
					})
				}
			}
		})
	}
}

//actions用于操作异步
let actions = {
	getcarlists(context){
		// context.commit("gettokey")
		context.commit('getcarlist')
	}
}

let store = new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})
export default store