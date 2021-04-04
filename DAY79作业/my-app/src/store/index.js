import Vue from 'vue'
import Vuex from 'vuex'
import cartModel from './cart'
import count from './count';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        cartModel,
        count
    }
})
export default store