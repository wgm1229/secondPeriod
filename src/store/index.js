import {createStore} from '../myRedux'
import reducer from '../reducer'
let store = createStore(reducer)
export default store