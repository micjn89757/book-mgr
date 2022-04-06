import { createStore } from 'vuex';
import { character, user } from '@/service'
import { result } from "@/helpers/utils"
import { getCharacterInfoById } from "@/helpers/character"

export default createStore({
  state: {// 数据状态
    characterInfo: [],  //所有角色信息
    userInfo: {}, // 当前登录的用户信息
    userCharacter: {} // 当前登录的用户角色信息
  },
  mutations: {// 函数集合，用来修改数据状态
    // 第二个参数是接收传递来数据的参数，第一个是vuex提供的访问vuex数据的参数
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 设置当前用户角色
    setCharacter(state, userCharacter) {
      state.userCharacter = userCharacter;
    }
  },
  actions: { // 触发mutations里函数的前置操作，异步拿数据可以放到这里
    async getCharacterInfo(store) {
      const res = await character.list();
      result(res).success(({data}) => {
        // 设置状态
        // 通过commit触发mutations下的修改数据函数
        store.commit('setCharacterInfo', data)
      })
    },
    async getUserInfo(store) {
      const res = await user.info();
      // 通过token获取用户状态
      result(res).success(({data}) => {
        store.commit('setUserInfo', data);
        store.commit('setCharacter', getCharacterInfoById(data.character));
      })
    }
  },
  // 数据量大的时候需要分块才有必要使用modules
  // modules: {
  // },
});
