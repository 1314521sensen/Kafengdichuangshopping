import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import pageheight from '@/components/pageheight/pageheight.vue'
Vue.component('pageheight',pageheight)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
