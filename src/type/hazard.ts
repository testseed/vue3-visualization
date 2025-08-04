//风险预警
export type etRiskWarningType = {
    "newKey": string,
    "value": number,
    "key": string
}
//企业分类管理
export type comManageType = {
    "color": string,
    "value": number,
    "key": string
}
//监测报告
export type monitoringType = {
    dangerous: itemType[],
    gas: itemType[],
    video: itemType[]
}
//安全隐患三录入
export type issueType = {
    plan: itemType[],
    severity: itemType[]
}
export type itemType = {
    value: number,
    key: string
}
//应急机构人员
export type agencyType = {
    num: string,
    title: string
}