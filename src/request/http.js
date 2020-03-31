import Request from "../util/request"
import Fetch from "../util/fetch"
import Vue from "vue"
let thia = Vue.prototype


//轮播
export const banner = () => thia.$http.get('/banner')
//首页列表
export const cartlist = () => thia.$http.get("/recommend/appIndex")

//axios请求轮播图
// export const ban = () => Request(
//     {
//         url: "/api/banner",
//         headers: {
//             DeviceType: 'H5'
//         }
//     }
// )
export const appIndex = () => Fetch(
    "/recommend/appIndex"
)

//讲师详情
export const teacherId = (data) => Request({
    url: `/api/teacher/${data}`,
    method: "GET"
})

export const teacherInfo = (data) => Request({
    url: `/api/teacher/info/${data}`,
    method: "GET"
})

//课程详情
export const courceId = (data) => Request({
    url: `/api/courseInfo/basis_id=${data}`,
    method: "GET"
})

//特色课--分类 
export const courseify = () => Request({
    url: `/api/courseClassify`,
    method: "GET"
})

//分类-分页?page=1&limit=10
export const coursebasis = (data) => Request({
    url: `/api/courseBasis`,
    method: "GET",
    params: data
})

//约课 app/oto/myInviteCourse/index

//登录 /login
export const login = (data) => Request({
    url: `/api/login`,
    method: "POST",
    params: data
})

//oto列表 app/otoCourse?page=1&limit=10&attr_val_id=6&
export const oto = () => thia.$http.get("/otoCourse") //Fetch("/otoCourse", data)

// //oto选择老师条件 /app/otoCourseOptions?
export const otoconditon = () => thia.$http.get("/otoCourseOptions")
