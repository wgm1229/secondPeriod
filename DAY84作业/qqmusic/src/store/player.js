export default {
    namespaced: true,
    state: ()=>{
        return {
            isPlay:false,
            songlist:[],
            currentSong:0,
            // songurlList:[]
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
        // songurlMut(state,str){
        //     state.songurlList.push(str)
        // }
    }
}