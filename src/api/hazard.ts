import request from "@/utils/request"

//风险预警
export const getEtRiskWarningAPI = (companyId: string) => {
    return request({
        url: '/dv3/hazard/et-risk-warning',
        data: {
            companyId
        }
    })
}
//企业分类管理 
export const getComManageAPI = (companyId: string) => {
    return request({
        url: '/dv3/hazard/get-com-manage',
        data: {
            companyId
        }
    })
}
//安全包保责任
export const getUserCountAPI = (companyId: string) => {
    return request({
        url: '/dv3/hazard/user-count',
        data: {
            companyId
        }
    })
}
//评估报告
export const getHazardReportAPI = (companyId: string) => {
    return request({
        url: '/dv3/hazard/get-hazard-report',
        data: {
            companyId
        }
    })
}
//监测报警
export const getMonitoringAPI = (companyId: string) => {
    return request({
        url: '/dv3/hazard/get-monitoring',
        data: {
            companyId
        }
    })
}
//问题隐患三录入
export const getIssueAPI = (companyId: string) => {
    return request({
        url: '/dv3/hazard/get-issue',
        data: {
            companyId
        }
    })
}
export const getAgencyListAPI = (companyId: string) => {
    return request({
        url: '/dv3/emergency/user-count/agency-list',
        data: {
            companyId
        }
    })
}