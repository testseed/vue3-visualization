import request from "@/utils/request"
//运行效果分析
export const getOperationAPI = (companyId: string) => {
    return request({
        url: '/dv3/prevention/get-operation',
        data: {
            companyId
        }
    })
}
//安全风险管控
export const getSafetyControlAPI = (companyId: string) => {
    return request({
        url: '/dv3/prevention/get-safety-control',
        data: {
            companyId
        }
    })
}
//安全风险对象
export const getSafetyObjectAPI = (companyId: string) => {
    return request({
        url: '/dv3/prevention/get-safety-object',
        data: {
            companyId
        }
    })
}
//整改临期提醒
export const getReminderAPI = (companyId: string) => {
    return request({
        url: '/dv3/prevention/get-reminder',
        data: {
            companyId
        }
    })
}
//隐患类型排查
export const getDangerTypeAPI = (companyId: string) => {
    return request({
        url: '/dv3/prevention/get-danger-type',
        data: {
            companyId
        }
    })
}