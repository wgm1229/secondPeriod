export default {
    namespaced: true,
    state: () => ({
        num: 100,
    }),
    mutations: {
        plus(state) {
            state.num++
        },
        reduce(state) {
            state.num--
        },
    },
}