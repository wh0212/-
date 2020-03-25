import Request from "../util/request"

export const banner = ()=>Request({
    url:"/api/banner"
})


export const appIndex = ()=>Request({
    url:"/api/recommend/appIndex",
    method:"GET"
})

//详情
export const teacherId = (data)=>Request({
    url:`/api/teacher/${data}`,
    method:"GET"
})
export const teacherInfo = (data)=>Request({
    url:`/api/teacher/info/${data}`,
    method:"GET"
})
