import request from "@/utils/request"

export const getParkAPI = (companyId: string) => {
    return request({
        url: '/dv3/public/get-park',
        method: 'GET',
        data: {
            companyId
        }
    })
}
//两重点一重大
export const getHazardAPI = (companyId: string) => {
    return request({
        url: '/dv3/safe/get-hazard',
        method: 'GET',
        data: {
            companyId
        }
    })
}

export const getSituationAPI = (companyId: string) => {
    return request({
        url: '/dv3/safe/get-situation',
        method: 'GET',
        data: {
            companyId
        }
    })
}

//安全三同时报告
export const getComBuildAPI = (companyId: any) => {
    return request({
        url: '/dv3/safe/get-com-build',
        method: 'GET',
        data: {
            companyId
        }
    })
}
