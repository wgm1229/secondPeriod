function NumReducer(state=100,action){
  console.log(state.action)
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      return state
  }
}

export default NumReducer