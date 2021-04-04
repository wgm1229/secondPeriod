import request from '../utils/request'

export const getSingerList = (area=-100,genre=-100,sex=-100)=>{ //请求歌手数据列表
  return request.get(`/hehe/singer/list?area=${area}&genre=${genre}&sex=${sex}`)
}

export const getCfyList = () => { //请求歌手分类数据
  return request.get('/hehe/singer/category')
}