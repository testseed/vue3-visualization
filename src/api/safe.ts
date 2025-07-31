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
export const getComBuildAPI = (companyId: string) => {
    return request({
        url: '/dv3/safe/get-com-build',
        method: 'GET',
        data: {
            companyId
        }
    })
}
//面积规模
export const getCompanyAPI = (companyId: string) => {
    return request({
        url: '/dv3/safe/get-company',
        method: 'GET',
        data: {
            companyId
        }
    })
}
//轮班值守
export const getGuardAPI = (companyId: string) => {
    return request({
        url: '/dv3/safe/get-guard',
        data: {
            companyId
        }
    })
}
//禁限控目录
export const getMatterAPI = (companyId: string) => {
    return request({
        url: '/dv3/safe/get-matter',
        data: {
            companyId
        }
    })
}
//装置开停车/装置大检修
export const getDeviceRecordAPI = (companyId: string) => {
    return request({
        url: '/dv3/safe/get-device-record',
        data: {
            companyId
        }
    })
}
//第三方管理
export const getFacilityAPI = (companyId: string) => {
    return request({
        url: '/dv3/safe/get-facility',
        data: {
            companyId
        }
    })
}
//企业列表
export const getCompaniesAPI = () => {
    return request({
        url: '/dv3/public/get-companies',
    })
}
//重大危险源坐标
export const getKeynoteAPI = (companyId: string) => {
    return request({
        url: '/dv3/safe/keynote',
        data: {
            companyId
        }
    })
}