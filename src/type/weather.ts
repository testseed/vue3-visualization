export type weatherListType = {
    weather: weatherType,
    weatherTime: string
}

type weatherType = {
    province: string,
    city: string,
    adcode: string,
    weather: string,
    temperature: string,
    winddirection: string,
    windpower: string,
    humidity: string,
    reporttime: string,
    temperature_float: string,
    humidity_float: string
}