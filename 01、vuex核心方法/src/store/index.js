import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{   //相当于组件中的 data
    num:100,
    cart:[
      { title: '商品1', price: 99 },
      { title: '商品2', price: 199 },
      { title: '商品3', price: 19 },
      {title:'商品4', price:999 },
    ]
  },
  getters:{
    filterCart(state){ //筛选state中cart的价格100以内的商品
      let arr = state.cart.filter(item=>{
        return item.price<100
      })
      return arr
    }
  },
  mutations:{ //相当于组件中的 methods，修改state中的数据
    plus(state){
      state.num++
    },
    minu(state){
      state.num--
    },
    addCartMut(state,obj){ //向cart中新增商品
      state.cart.push(obj)
    }
  },
  actions:{  //如果状态机中需要发起异步请求，可以使用action
    addCartAct(context,obj){
      console.log(context);
      setTimeout(()=>{ //等待2s，模拟异步请求，请求完毕后再触发mutations
        context.commit('addCartMut',obj) 
      },2000)
    }
  }
})
export default store