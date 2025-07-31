export type ParkType = {
    thingJs: string,
    latitude: string,
    name: string,
    boundaries: boundaries[],
    rank: string,
    thingJsPipe: string,
    buffter: buffter[],
    id: string,
    longitude: string
}
type boundaries = {
    name: string,
    value: string,
    options: options
}
type options = {
    sideFillColor: string,
    topFillColor: string,
    sideHeight: string
}
type buffter = {
    path: string
    fill_opacity: string,
    weight: string,
    dash_array: string,
    border_color: string,
    type: string,
    area_type: string,
    opacity: string,
    fill_color: string
}
//两重点一重大,面积规模
export type hazardType = {
    value: number,
    key: string
}
//第三方管理
export type facilityType = {
    imgurl: string,
    value: number,
    key: string
}
//企业列表
export type companiesType = {
    "safety_manager_fixedline": string,
    "com_industry_code": string,
    "company_score": number,
    "latitude": number,
    "com_manager_phone": string,
    "industry": string,
    "com_scale": string,
    "company_assess_time": string,
    "com_manager_fixedline": string,
    "safety_manager_name": string,
    "hazards": any,
    "four_color_level_color": string,
    "legal_person_name": string,
    "hint": string,
    "name": string,
    "rank": number,
    "id": number,
    "com_area": string,
    "com_manager_name": string,
    "four_color_level": string,
    "safety_manager_phone": string,
    "longitude": number,
    "region": regionType[]
}
type regionType = {
    "path": string[],
    "style": styleType
    "type": string,
    "opacity": number
}
type styleType = {
    "fillColor": string,
    "borderColor": string
}
//重大危险源坐标
export type keynoteType = {
    "company_name": string,
    "company_id": number,
    "point": string[],
    "category": string,
    "name": styleType
}