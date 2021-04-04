import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import count from './count'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    cart,
    count
  }
})
export default store