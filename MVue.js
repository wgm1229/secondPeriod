class MVue{
  constructor(options){
    this.$options = options
    this.$data = options.data
    this.observe(this.$data) //检测所有data属性的变化
  }

  observe(dataObj){
    if (!dataObj || typeof dataObj !== 'object'){
      return;
    }
    Object.keys(dataObj).forEach((key) => {
      this.defineReactive(dataObj, key, dataObj[key])
    })
  }

  defineReactive(myObj, key, val) { 
    Object.defineProperty(myObj, key, {//劫持data中每个键的变化
      get: function () {
        console.log('我知道，你想获取obj的' + key);
        return val
      },
      set: function (val1) {
        console.log(val1); 
        //Vue在set中察觉到新的值之后，会去调用compiler，
        //使用真实DOM操作的方式为页面中所有{{msg}}的位置，替换新的值进去
        console.log(`我知道，你想为${key}设置新的值`);
      }
    })
  }
}