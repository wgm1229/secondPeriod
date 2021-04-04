import { Toast } from 'vant';
export default {
  namespaced:true,
  state:()=>{
    return {
      isPlay:false,  //控制音乐的播放状态,false代表暂停
      songlist:[],  //记录歌曲列表
      currentSong:0,  //记录当前正在播放歌曲序号
      loop:0,   //播放模式 0单曲  1顺序  2随机
      loopData:[
        { title: '单曲模式', icon: 'icon-16' },
        { title: '顺序模式', icon: 'icon-17' },
        { title:'随机模式', icon:'icon-19'},
      ]
    }
  },
  getters:{
    loopObj(state){  //根据模式序号，提取对应数据包
      return state.loopData[state.loop]
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
    },
    changeLoop(state){ //修改播放模式
      if(state.loop==2){
        state.loop=0;
      }else{
        state.loop++
      }
      let {title} = state.loopData[state.loop]
      Toast({
        message: title,
        icon: 'like-o',
      });
    }
  }
}