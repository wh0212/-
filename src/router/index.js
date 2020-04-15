import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from "../views/index.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: "/",
        redirect: "/index"
      },
      {
        path: "/index",
        name: "index",
        component: Index,
        meta: {
          title: "每时每课"
        }
      },
      {
        path: "/course",
        name: "course",
        component: () => import("../views/course.vue"),
        meta: {
          title: "特色课"
        }
      },
      {
        path: "/record",
        name: "record",
        component: () => import("../views/record.vue"),
        meta: {
          title: "约课记录"
        }
      },
      {
        path: "/practice",
        name: "practice",
        component: () => import("../views/practice.vue"),
        meta: {
          title: "练习"
        }
      },
      {
        path: "/mine",
        name: "mine",
        component: () => import("../views/mine.vue"),
        meta: {
          title: "我的"
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/teacherDetail",
    name: "teacherDetail",
    component: () => import("../views/teacherDetail.vue")
  },
  {
    path: "/courceDetail",
    name: "courceDetail",
    component: () => import("../views/courceDetail.vue"),
    meta: {
      title: "课程详情"
    }
  },
  {
    path: "/custmoer",
    name: "custmoer",
    component: () => import("../views/customer.vue")
  },
  {
    path: "/oto",
    name: "oto",
    component: () => import("../views/index/oto.vue")
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/index/Calendar.vue")
  },
  {
    path: "/coursedet",
    name: "coursedet",
    component: () => import("../views/index/swiperId.vue"),
    meta: {
      title: "课程详情"
    }
  },
  {
    path: "/otoplan",
    name: "otoplan",
    component: () => import("../views/oto/makedetail.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/course/Search.vue"),
    meta: {
      title: "搜索"
    }
  },
  {
    path: "/smslogin",
    name: "smslogin",
    component: () => import("../views/login/SmsLogin.vue"),
    meta: {
      title: "验证码登录"
    }
  },
  {
    path: "/setpass",
    name: "setpass",
    component: () => import("../views/login/setpass.vue"),
    meta: {
      title: "设置密码"
    }
  },
  {
    path: "/setmessage",
    name: "setmessage",
    component: () => import("../views/login/setmessage.vue"),
    meta: {
      title: "设置信息"
    }
  },
  {
    path: "/options",
    name: "options",
    component: () => import("../views/mine/options.vue"),
    meta: {
      title: "设置信息"
    }
  },
  {
    path: "/setnewpass",
    name: "setnewpass",
    component: () => import("../views/mine/setnewpass.vue"),
    meta: {
      title: "设置密码"
    }
  },
  {
    path: "/mystudy",
    name: "mystudy",
    component: () => import("../views/mine/mystaus.vue"),
    meta: {
      title: "我的学习"
    }
  },
  {
    path: "/info",
    name: "info",
    component: () => import("../views/mine/info.vue"),
    meta: {
      title: "个人信息"
    }
  },
  {
    path: "/setinfo",
    name: "setinfo",
    component: () => import("../views/mine/setinfo.vue"),
    meta: {
      title: "修改个人信息"
    }
  },
  {
    path: "/Concern",
    name: "Concern",
    component: () => import("../views/mine/Concern.vue"),
    meta: {
      title: "我的关注"
    }
  },
  {
    path: "/Collect",
    name: "Collect",
    component: () => import("../views/mine/Collect.vue"),
    meta: {
      title: "我的关注"
    }
  },
  {
    path: "/Order",
    name: "Order",
    component: () => import("../views/mine/order/order.vue"),
    meta: {
      title: "订单"
    }
  },
  {
    path: "/myCurrency",
    name: "myCurrency",
    component: () => import("../views/mine/mycurrency.vue"),
    meta: {
      title: "我的余额"
    }
  },
  {
    path: "/point",
    name: "point",
    component: () => import("../views/practice/point.vue"),
    meta: {
      title: "考点专练"
    }
  },
  {
    path: "/paperPage",
    name: "paperPage",
    component: () => import("../views/practice/paperPage.vue"),
    meta: {
      title: "套卷练习"
    }
  },
  {
    path: "/exam",
    name: "exam",
    component: () => import("../views/practice/exam.vue"),
    meta: {
      title: "仿真模考"
    }
  },
  {
    path: "/studyCalendar",
    name: "studyCalendar",
    component: () => import("../views/mine/study-calendar.vue"),
    meta: {
      title: "学习日历"
    }
  },
  {
    path: "/errorques",
    name: "errorques",
    component: () => import("../views/practice/errorques.vue"),
    meta: {
      title: "学习日历"
    }
  },
  {
    path: "/assess",
    name: "assess",
    component: () => import("../views/practice/assess.vue"),
    meta: {
      title: "测评记录"
    }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes

})

export default router


