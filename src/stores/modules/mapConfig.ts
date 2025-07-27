import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getParkAPI } from '@/api/safe'
export const usemapConfigStore = defineStore('mapConfig', () => {
    const parkInfo = ref()
    const getPark = async () => {
        const res = await getParkAPI('0')
        console.log(res);
        parkInfo.value = res.data
    }
    return { getPark, parkInfo }
})
