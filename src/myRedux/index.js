function createStore(reducer){
  let state;  //状态机对外提供的数据
  function getState(){  //提取最新的state
    return state || reducer(state,{})
  }
  let callBacks=[];  //存放所有订阅的回调
  function dispatch(action){  //重新触发reducer，为state重新赋值
    state = reducer(state,action)  //生成新数据
    callBacks.forEach(cb=>{
      cb()
    })
  }

  function subscribe(callback){  //收集所有订阅者的回调函数
    callBacks.push(callback)
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

export {
  createStore
}