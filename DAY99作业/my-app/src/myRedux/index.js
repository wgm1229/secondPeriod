function createStore(render){
  let state
  function getState() {
    return state || render(state,{})
  }
  let callBacks = []
  function dispatch(action) {
    state = render(state,action)
    callBacks.forEach(cb=>{
      cb()
    })
  }
  function subscribe(callback) {
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