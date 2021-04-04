export default {
  namespaced: true,
  state: () => ({   //相当于组件中的 data
    num: 100
  }),
  mutations: { //相当于组件中的 methods，修改state中的数据
    plus(state) {
      state.num++
    },
    minu(state) {
      state.num--
    }
  }
}