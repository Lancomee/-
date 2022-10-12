import { sysLogin, sysProfile, sysUser } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { constantRoutes, syncRoutes } from "@/router/index";
import router from "@/router/index";
import {resetRouter} from '@/router/index'
// 状态
const state = {
  token: "",
  name: "wwwwwwwwwwwwwww",
  userInfo: "111111",
};
// 修改状态
const mutations = {
  setToken(state, value) {
    state.token = value; // 设置token  只是修改state的数据  123 =》 1234
    // vuex变化 => 缓存数据
    setToken(value); // vuex和 缓存数据的同步
  },
  setName(state, value) {
    state.name = value;
  },
  setUserInfo(state, value) {
    state.userInfo = value;
  },
  logout(state) {
    state.token = "";
    state.userInfo = "";
    resetRouter()
  },
};
// 执行异步
const actions = {
  async toLogin({ commit }, value) {
    const res = await sysLogin(value);
    commit("setToken", res.data);
    console.log(res);
  },
  async getUserInfo(store) {
    // 调用api 将用户信息存在vuex种
    // console.log(1111);
    const res = await sysProfile();
    const res2 = await sysUser(res.data.userId);
    console.log("用户信息", res);
    const info = Object.assign({}, res.data, res2.data);
    //通过action 修改mutation，从而修改state
    store.commit("setUserInfo", info);
    // 可在浏览器的vuex中找到 权限数据:info.roles.menus
    const newArr = syncRoutes.filter((item) => {
      return info.roles.menus.includes(item.meta);
    });
    newArr.push({ path: "*", redirect: "/404", hidden: true });
   

    router.addRoutes(newArr);
    store.commit("routes/setRoutes", [...constantRoutes,...newArr], {
      root: true,
    });
    console.log("newArr", newArr);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
