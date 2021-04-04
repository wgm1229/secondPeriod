export default {
    namespaced: true,
    state: ()=>{
        return {
            isPlay:false,
            songlist:[],
            currentSong:0,
            loop:0,
            loopData:[
                {title:'单曲模式', icon:'icon-16'},
                {title:'顺序模式', icon:'icon-17'},
                {title:'随机模式', icon:'icon-19'},
            ]
        }
    },
    getters: {
        loopObj(state) {
            return state.loopData[state.loop];
        }
    },
    mutations: {
        isPlayMut(state,bool){
            state.isPlay = bool
        },
        songListMut(state,list){
            state.songlist = list
        },
        currentMut(state,idx){
            state.currentSong = idx
        },
        loopMut(state){
            if(state.loop==2){
                state.loop=0
            }else{
                state.loop++
            }
        }
    }
}