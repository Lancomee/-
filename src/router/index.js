import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 静态路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "route.dashboard", icon: "dashboard" },
      },
    ],
  },

  // 404 page must be placed at the end !!!

];
// 动态路由
export const syncRoutes = [
  {
    path: "/departments",
    meta: "departments",
    component: Layout,
    children: [
      {
        path: "",
        name: "departments",
        component: () => import("@/views/departments/index"),
        //路由元
        meta: { title: "route.departments", icon: "tree" },
      },
    ],
  },
  {
    path: "/employees",
    component: Layout,
    meta: "employees",

    children: [
      {
        path: "",
        name: "employees",
        component: () => import("@/views/employees/index"),
        //路由元
        meta: { title: "route.employees", icon: "people" },
      },
      {
        hidden: true,
        path: "import",
        name: "import",
        component: () => import("@/views/employees/import"),
        //路由元
        meta: {},
      },
      {
        hidden: true, // 不在菜单中显示
        path: "detail/:id", // /employees/import
        name: "detail",
        component: () => import("@/views/employees/detail"),
        meta: {},
      },
    ],
  },
  {
    path: "/settings",
    meta: "settings",

    component: Layout,
    children: [
      {
        path: "",
        name: "settings",
        component: () => import("@/views/settings/index"),
        //路由元
        meta: { title: "route.settings", icon: "people" },
      },
    ],
  },
  {
    path: "/social",
    meta: "social",

    component: Layout,
    children: [
      {
        path: "",
        name: "social",
        component: () => import("@/views/social/index"),
        //路由元
        meta: { title: "route.social_securitys", icon: "tree" },
      },
    ],
  },
  {
    path: "/social2",
    component: Layout,
    children: [
      {
        path: "",
        name: "social2",
        component: () => import("@/views/social2/index"),
        //路由元
        meta: { title: "social2", icon: "tree" },
      },
    ],
  },
  {
    path: "/permissions",
    meta: "permissions",

    component: Layout,
    children: [
      {
        path: "",
        name: "permissions",
        component: () => import("@/views/permissions/index"),
        //路由元
        meta: { title: "route.permissions", icon: "tree" },
      },
    ],
  },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
