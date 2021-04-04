export default {
  namespaced:true,
  state:()=>{
    return {
      isPlay:false  //控制音乐的播放状态,false代表暂停
    }
  },
  mutations:{
    isPlayMut(state,bool){ //根据用户传递的参数，改变播放状态
      state.isPlay = bool
    }
  }
}