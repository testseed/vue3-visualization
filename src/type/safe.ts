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