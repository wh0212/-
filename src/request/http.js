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

//课程详情报名
export const apply = (data) => thia.$http.post('/order/downOrder', data)
//oto列表 app/otoCourse?page=1&limit=10&attr_val_id=6&
export const oto = () => thia.$http.get("/otoCourse") //Fetch("/otoCourse", data)

// //oto选择老师条件 /app/otoCourseOptions?
export const otoconditon = () => thia.$http.get("/otoCourseOptions")

//发送验证码
export const SmsVerification = (data) => thia.$http.post('/smsCode', data)
//验证码登录
export const VerificationLogin = (data) => thia.$http.post('/login', data)
//确认密码
export const secondPassword = (data) => thia.$http.post('/password', data)
//学科年级  /module/attribute/1
export const attr = () => thia.$http.get('/module/attribute/1')
//提交
export const user = (data) => thia.$http.put('/user', data)

//分享
export const share =()=> thia.$http.post('/public/share')
//更换用户头像
export const avatar =(data)=>thia.$http.post('/public/img',data)
//城市
export const city =(data)=>thia.$http.get(`/sonArea/${data}`)

//用户userinfo
export const Userinfo = () => thia.$http.get('/userInfo')
//user信息
export const UserCenter = () => thia.$http.get('/getUCenterInfo')

//我的学习
export const mystaus = (type) => thia.$http.get(`/myStudy/${type}`)
//课程订单
export const order =(data)=> thia.$http.post('/myOrder',data)
//收藏
export const collect =(data)=>thia.$http.post('/collect',data)
//取消收藏
export const nocollect=(data)=>thia.$http.put(`/collect/cancel/${data}/1`)

//收藏列表
export const collectlist =(data)=>thia.$http.get('/collect',data)