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
	//加入购物车
	Addcart(state,addObj){
		const _this = this
		// console.log(addObj)
		let {s_name,g_name,g_pic,gid,sid} = addObj
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
						g_pic
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
						// console.log(res)
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
		uni.request({
			url:`${Requestpath}shopping_cart/deleteMultiShoppingCartInfo`,
			method:"POST",
			data:{
				token:_this.state.tokey,
				cids:arr
			},
			success(res) {
				// console.log(res)
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