import { createStore } from 'vuex'

// 类型定义
const types = {
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_USER_INFO: 'SET_USER_INFO',
};

// 数据存储中心
const state = {
  isAuthenticated: false,
  userInfo: {},
};

// 获取数据的方法
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  userInfo: state => state.userInfo,
};

// 修改数据的方法
const mutations = {
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  },
};

// 异步修改数据的方法
const actions = {
  setAuthenticated({ commit }, isAuthenticated) {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUserInfo({ commit }, userInfo) {
    commit(types.SET_USER_INFO, userInfo);
  }
};

// 模块化存储
const modules = {
  // 可以在这里添加更多模块
};


export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules
})
