export default {
  namespaced:true,
  state:()=>{
    return {
      isPlay:false,  //控制音乐的播放状态,false代表暂停
      songlist:[],  //记录歌曲列表
      currentSong:0  //记录当前正在播放歌曲序号
    }
  },
  mutations:{
    isPlayMut(state,bool){ //根据用户传递的参数，改变播放状态
      state.isPlay = bool
    },
    songListMut(state,list){ //初始化歌曲列表数据
      state.songlist = list
    },
    currentMut(state,idx){ //修改播放歌曲下标
      state.currentSong = idx;
    }
  }
}