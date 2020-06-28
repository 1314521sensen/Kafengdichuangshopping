import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import store from "./store/index.js"
import pageheight from '@/components/pageheight/pageheight.vue'
//引入加载的图标
import loading from "@/components/Commoditycomponent/loading.vue"
Vue.component('pageheight',pageheight)
Vue.component('loading',loading)
App.mpType = 'app'

const app = new Vue({
    ...App,
	//挂载
	store
})
app.$mount()
