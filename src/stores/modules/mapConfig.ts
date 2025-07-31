import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getParkAPI } from '@/api/safe'
import type { ParkType } from '@/type/safe'
import type { companiesType, keynoteType } from '@/type/safe'
export const usemapConfigStore = defineStore('mapConfig', () => {
    const parkInfo = ref<ParkType>()
    const companies = ref<companiesType>()
    const keynote = ref<keynoteType[]>([])
    const setCompanies = (val: companiesType) => {
        companies.value = val
    }
    const setKeynote = (val: keynoteType[]) => {
        keynote.value = val
    }
    const getPark = async () => {
        const res = await getParkAPI('0')
        parkInfo.value = res.data.data
    }
    let parkCenter = ref<any>()//园区中心点坐标
    let parkPolygon = ref<any>()//园区覆盖物坐标数组
    let parkPolygonPay = ref<any>()//园区图形
    let parkMarker = ref<any>()//危险源坐标
    const initConfig = (map: any) => {
        if (!parkInfo.value || !parkInfo.value.boundaries[0].value) {
            console.log('园区数据未加载');
            return
        }
        const T = (window as any).T
        let icon = new T.Icon({
            iconUrl: 'http://api.tianditu.gov.cn/img/map/markerA.png',
            iconSize: new T.Point(24, 36),
            iconAnchor: new T.Point(12, 12)
        })
        if (iconPolygon.length) {
            iconPolygon.forEach((item: any) => {
                map.removeOverLay(item)
            })
            iconPolygon = []
        }
        keynote.value.map(item => ({
            lng: item.point[0],
            lat: item.point[1]
        })).forEach(coord => {
            parkMarker.value = new T.Marker(new T.LngLat(coord.lng, coord.lat), {
                icon
            })
            map.addOverLay(parkMarker.value)
            iconPolygon.push(parkMarker.value)
        })
        parkCenter.value = new T.LngLat(companies.value?.longitude || parkInfo.value?.longitude, companies.value?.latitude || parkInfo.value?.latitude)
        parkPolygon.value =
            companies.value?.region[0].path.map(item => {
                const [lng, lat] = item.split(',')
                return [lng, lat]
            })
            ||
            parkInfo.value?.boundaries[0].value.split(';')
                .map(item => item.split(','))
                .map(i => new T.LngLat(...i))
        // Polygon(points:Array<LngLat>[,opts:PolygonOptions])覆盖物
        // parkPolygon.value = new T.Polygon()
        parkPolygonPay.value = new T.Polygon(parkPolygon.value, {
            color: '#5190de',
            weight: 3,
            opacity: 1,
            fillColor: companies.value ? '0000ff' : '#6d9f6a',
            fillOpacity: 0.5,
            lineStyle: "solid"
        })
        addParkForMap(map, T)
    }
    let currentPolygon: any = null
    let iconPolygon: any = []
    const addParkForMap = (map: any, T: any) => {
        if (!parkCenter.value || !parkPolygonPay.value) return
        // map.addOverLay(parkMarker.value)
        if (currentPolygon) {
            map.removeOverLay(currentPolygon)
            currentPolygon = null
        }
        map.addOverLay(parkPolygonPay.value)
        currentPolygon = parkPolygonPay.value
        map.setViewport(parkPolygonPay.value.getBounds())
        map.panTo(parkCenter.value, companies.value?.rank || parkInfo.value?.rank)
    }
    return { getPark, parkInfo, initConfig, setCompanies, companies, setKeynote, keynote }
})
