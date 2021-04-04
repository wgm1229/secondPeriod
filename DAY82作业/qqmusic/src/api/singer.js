import request from '../utils/request'
import axios from 'axios'


export const getSingerList = (area=-100, genre=-100,sex=-100)=>{
    return request.get(`hehe/singer/list?area=${area}&genre=${genre}&sex=${sex}`)
}

export const getClassifyList = ()=>{
    return request.get('hehe/singer/category')
}

//请求歌手的热门歌曲列表
export const getSongs = (mid) =>{
    return request.get(`hehe/singer/songs?singermid=${mid}`)
}
export const getDesc = (mid) =>{
  return request.get(`/hehe/singer/desc?singermid=${mid}`)
}

//请求歌曲播放链接
export const getSongUrl = (songid) =>{
  return request.get(`/music/song/urls?id=${songid}`)

}