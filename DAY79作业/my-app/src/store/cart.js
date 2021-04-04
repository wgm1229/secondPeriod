export default {
    namespaced: true,

    state: () => ({  //data
        cart:[
            {title:'商品1',price:99},
            {title:'商品2',price:199},
            {title:'商品3',price:19},
            {title:'商品4',price:299},
        ]
    }),
    getters: {
        filterCart(state){
            let arr = state.cart.filter(item=>{
                return item.price<100
            })
            return arr
        }
    },
    mutations: {   //methods
        
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
}