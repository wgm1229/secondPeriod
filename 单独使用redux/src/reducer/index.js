
function NumReducer(state=100,action){
  console.log(state,action);
  switch (action.type) {
    case 'increment':
      return state + 1  //对状态机数据的增加操作
    case 'decrement':
      return state - 1  //对状态机数据的减少操作
    default:
      return state;  ////让状态机提供初始数据
  }
}

export default NumReducer