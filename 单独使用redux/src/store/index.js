import {createStore} from 'redux' 
import reducer from '../reducer/index.js'  //处理状态机数据交互逻辑的纯函数
const store = createStore(reducer)  //创建状态机实例
export default store