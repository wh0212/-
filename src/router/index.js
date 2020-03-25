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
        component: Index
      },
      {
        path: "/course",
        name: "course",
        component: () => import("../views/course.vue")
      },
      {
        path: "/record",
        name: "record",
        component: () => import("../views/record.vue")
      },
      {
        path: "/practice",
        name: "practice",
        component: () => import("../views/practice.vue")
      },
      {
        path: "/mine",
        name: "mine",
        component: () => import("../views/mine.vue")
      },
      {
        path: "/custmoer",
        name: "custmoer",
        component: () => import("../views/customer.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/teacherDetail",
    name: "teacherDetail",
    component: () => import("../views/teacherDetail.vue")
  },
  {
    path: "/courceDetail",
    name: "courceDetail",
    component: () => import("../views/courceDetail.vue")
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
