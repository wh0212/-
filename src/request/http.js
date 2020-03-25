import Request from "../util/request"

export const banner = ()=>Request({
    url:"/api/banner"
})


export const appIndex = ()=>Request({
    url:"/api/recommend/appIndex",
    method:"GET"
})