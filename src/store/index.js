import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {},
	state: {
		routes: []
	},
	mutations: {
		initRoutes(state, data) {
			state.routes = data
		}
	},
	actions: {}
})

export default store
