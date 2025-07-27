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