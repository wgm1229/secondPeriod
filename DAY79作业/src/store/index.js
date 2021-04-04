import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {  //data
        num:100,
        cart:[
            {title:'商品1',price:99},
            {title:'商品2',price:199},
            {title:'商品3',price:19},
            {title:'商品4',price:299},
        ]
    },
    getters: {
        filterCart(state){
            let arr = state.cart.filter(item=>{
                return item.price<100
            })
            return arr
        }
    },
    mutations: {   //methods
        plus(state){
            state.num++
        },
        reduce(state){
            state.num--
        },
        addCartList(state,obj){
            state.cart.push(obj)
        }
    },
    actions: {
        addCartDelay(context,obj){
            console.log(context)
            setTimeout(() => {
                context.commit('addCartList',obj)
            }, 2000);
        }
    }
})
export default store