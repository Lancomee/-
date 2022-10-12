import router from "@/router";
import store from "@/store";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { syncRoutes } from '@/router/index.js'
import { cancelAll } from "@/utils/request";
const whitePage = ["/404", "/login"];
router.beforeEach(async (to, from, next) => {
  Nprogress.start();
  if (store.state.user.token) {
    // 判断当前要去的地址是不是登录页
    if (to.path.toLowerCase() === "/login") {
      next("/");
    } else {
      if (store.state.user.userInfo.userId) {
        next();
      } else {
        await store.dispatch("user/getUserInfo");
        console.log('动态路由',syncRoutes);
        console.log('当前用户的权限是:', store.state.user.userInfo.roles.menus)
        next({
          ...to, // 目的是保证路由添加完在进入页面(可以理解为重进一次)
          replace: true // 重进不保留历史记录
        })
      }
    }
  } else {
    // includes判断数组中是否有存在白名单种的元素
    if (whitePage.includes(to.path)) {
      next();
    } else {
      next('/login?redirect=' + to.fullPath)
    }
  }
  Nprogress.done();
});
router.afterEach((to, from) => {
  Nprogress.done();
  cancelAll();
});
