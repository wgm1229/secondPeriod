export default {
    namespaced: true,
    state: ()=>{
        return {
            isPlay:false
        }
    },
    mutations: {
        isPlayMut(state,bool){
            state.isPlay = bool
        }
    }
}