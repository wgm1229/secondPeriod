import store from 'store'

const USER_KEY = 'userInfo' //定义一个常量
export default {
  saveUser(user) {  //存储user
    // localStorage.setItem(USER_KEY,JSON.stringify(user))
    // JSON.parse(localStorage.getItem(USER_KEY))  
    store.set(USER_KEY, user)
  },
  getUser() {
    return store.get(USER_KEY) || null //容错
  },
  removeUser() {
    store.remove(USER_KEY)
  }
}