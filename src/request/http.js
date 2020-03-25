import Request from "../util/request"

export const banner = () => Request({
    url: "/api/banner"
})


export const appIndex = () => Request({
    url: "/api/recommend/appIndex",
    method: "GET"
})

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
    params:data
})