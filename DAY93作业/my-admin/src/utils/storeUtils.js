import store from 'store';

const USER_KEY = 'userInfo'

export default {
  saveUser(user) {
    store.set(USER_KEY, user)
  },
  getUser(){
    return store.get(USER_KEY||null)
  },
  removeUser(){
    store.remove(USER_KEY)
  }
}