import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getParkAPI } from '@/api/safe'
import type { ParkType } from '@/type/safe'
export const usemapConfigStore = defineStore('mapConfig', () => {
    const parkInfo = ref<ParkType>()
    const getPark = async () => {
        const res = await getParkAPI('0')
        parkInfo.value = res.data.data
    }
    let parkCenter = ref<any>()//园区中心点坐标
    let parkPolygon = ref<any>()//园区覆盖物坐标数组
    let parkPolygonPay = ref<any>()//园区图形
    const initConfig = (map: any) => {
        if (!parkInfo.value || !parkInfo.value.boundaries[0].value) {
            console.log('园区数据未加载');
            return
        }
        const T = (window as any).T
        parkCenter.value = new T.LngLat(parkInfo.value?.longitude, parkInfo.value?.latitude)
        parkPolygon.value = parkInfo.value?.boundaries[0].value.split(';')
            .map(item => item.split(','))
            .map(i => new T.LngLat(...i))
        // Polygon(points:Array<LngLat>[,opts:PolygonOptions])覆盖物
        // parkPolygon.value = new T.Polygon()
        parkPolygonPay.value = new T.Polygon(parkPolygon.value, {
            color: '#5190de',
            weight: 3,
            opacity: 1,
            fillColor: '#5f815b',
            fillOpacity: 0.5,
            lineStyle: "solid"
        })
        addParkForMap(map)
    }
    const addParkForMap = (map: any) => {
        if (!parkCenter.value || !parkPolygonPay.value) return
        map.panTo(parkCenter.value, parkInfo.value?.rank)
        map.setViewport(parkPolygonPay.value)
        map.addOverLay(parkPolygonPay.value)
    }
    return { getPark, parkInfo, initConfig }
})
