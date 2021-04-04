import request from '../utils/request'
import axios from 'axios'

export const getSingerList = (area=-100,genre=-100,sex=-100)=>{ //请求歌手数据列表
  return request.get(`/hehe/singer/list?area=${area}&genre=${genre}&sex=${sex}`)
}

export const getCfyList = () => { //请求歌手分类数据
  return request.get('/hehe/singer/category')
}

///singer/songs?singermid=0025NhlN2yWrP4
export const getSongs = (mid) => { //请求歌手的热门歌曲列表
  return request.get(`/hehe/singer/songs?singermid=${mid}`)
}

export const getDesc = (mid) => { //请求歌手的热门歌曲列表
  return request.get(`/hehe/singer/desc?singermid=${mid}`)
}

export const getSongUrl = (songid) => { //请求歌曲播放链接
  return request.get(`/hehe/song/urls?id=${songid}`)
  // return axios.post(`https://api.qq.jsososo.com/song/urls`,{
  //   id:songid
  // })
}