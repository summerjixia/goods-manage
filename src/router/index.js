import project from "@/page/project";
import app from "@/page/APP"
let { login, mainPage, homePage, user, role, auth, library } = project;
let { goodsUser, goods, order, messagePush, chartByShopCart, chartByOrder } = app;

/**
 * 系统管理：登录界面
 *          首页
 *          员工管理
 * APP管理： 用户管理
 *          商品管理
 *              商品类型
 *          订单管理
 *          消息推送
 *          图表统计
 *              购物车统计
 *              订单统计
 */
export default {
  routes: [
    {
      path: '',
      redirect: "/login"
    }, {
      path: "/login",
      component: login
    },
    {
      path: "/main",
      component: mainPage,
      children: [
        {
          path: "/homePage",
          component: homePage,
          meta: { icon: "", noCache: true, name: "首页" }
        }, {
          path: '/user',
          component: user,
          meta: { icon: "", noCache: false, name: "员工信息" }
        },
        {
          path: '/role',
          component: role,
          meta: { icon: "", noCache: false, name: "角色信息" }
        },
        {
          path: '/auth',
          component: auth,
          meta: { icon: "", noCache: false, name: "权限信息" }
        }, {
          path: '/library',
          component: library,
          meta: { icon: "", noCache: false, name: "字典" }
        },
        {
          path: '/goodsUser',
          component: goodsUser,
          meta: { icon: "", noCache: false, name: "用户信息" }
        },
        {
          path: '/goodsInfo',
          component: goods,
          meta: { icon: "", noCache: false, name: "商品信息" }
        },
        {
          path: '/order',
          component: order,
          meta: { icon: "", noCache: false, name: "订单" }
        },
        {
          path: '/messagePush',
          component: messagePush,
          meta: { icon: "", noCache: false, name: "消息推送" }
        },
        {
          path: '/chartByShopCart',
          component: chartByShopCart,
          meta: { icon: "", noCache: false, name: "购物车图表" }
        },
        {
          path: '/chartByOrder',
          component: chartByOrder,
          meta: { icon: "", noCache: false, name: "订单图表" }
        }

      ]
    }
  ]

}
