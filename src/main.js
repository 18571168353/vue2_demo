import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import { Post } from './utils/api'
import { Put } from './utils/api'
import { Get } from './utils/api'
import { Delete } from './utils/api'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.Post = Post
Vue.prototype.Put = Put
Vue.prototype.Get = Get
Vue.prototype.Delete = Delete
new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')
