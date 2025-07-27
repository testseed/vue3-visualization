import { reactive } from "vue"
import axios from "axios"
import type { weatherListType } from '@/type/weather'
export const useFunction = () => {
    const state = reactive<weatherListType>({
        weather: {
            province: '',
            city: '',
            adcode: '',
            weather: '',
            temperature: '',
            winddirection: '',
            windpower: '',
            humidity: '',
            reporttime: '',
            temperature_float: '',
            humidity_float: ''
        },
        weatherTime: ''
    })
    const getApiAxios = () => {
        try {
            axios({
                url: 'https://restapi.amap.com/v3/weather/weatherInfo',
                params: {
                    key: 'a5613e113fa97e8f6b9903990b124f71',
                    city: '110000'
                }
            }).then(res => {
                state.weather = res.data.lives[0]
                console.log(state.weather);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const getCurrentDateTime = () => {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        const min = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')
        const formattedDate = `${year}-${month}-${day}`
        const formattedTime = `${hours}:${min}:${seconds}`
        return `${formattedDate} ${formattedTime}`
    }
    const updateTime = () => {
        state.weatherTime = getCurrentDateTime()
    }
    return {
        state,
        getApiAxios,
        updateTime
    }
}