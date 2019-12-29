
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import cs from './modules/configsystem'
import state from './state'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)


const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
      cs:cs
    }
})

if (module.hot) {
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept(['./mutations', './modules/configsystem'], () => {
      // 获取更新后的模块
      // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
      const newMutations = require('./mutations').default
      const cs = require('./modules/configsystem').default
      // 加载新模块
      store.hotUpdate({
        mutations: newMutations,
        modules: {
          cs:cs
        }
      })
    })
  }


  export default store;






