import request from "@/utils/request"

export const getEtRiskWarningAPI = (companyId: string) => {
    return request({
        url: '/dv3/hazard/et-risk-warning',
        data: {
            companyId
        }
    })
}