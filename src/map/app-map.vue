<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { usemapConfigStore } from '@/stores'
import { watch } from 'vue';
import { onUnmounted } from 'vue';
const mapConfigStore = usemapConfigStore()
let map = null
const initMap = () => {
    let T = (window as any).T
    if (!T) {
        console.log('地图api未加载');
        return
    }
    map = new T.Map('mapDiv')
    map.centerAndZoom(new T.LngLat(116.40769, 39.89945), 13);
    map.enableDrag()
    map.setMapType((window as any).TMAP_SATELLITE_MAP)
    mapConfigStore.initConfig(map)
    watch(() => mapConfigStore.companies, (newVal, oldVal) => {
        mapConfigStore.initConfig(map)
    }, {
        deep: true
    })
    watch(() => mapConfigStore.keynote, (newVal, oldVal) => {
        mapConfigStore.initConfig(map)
    }, {
        deep: true
    })
}
onMounted(async () => {
    await mapConfigStore.getPark()
    const script = document.createElement('script')
    script.src = 'https://api.tianditu.gov.cn/api?v=4.0&tk=2d58761eb6bbdac6095476b73d4d1a82'
    script.onload = () => {
        initMap()
    }
    document.body.appendChild(script)
    document.body.onload = initMap
})
onUnmounted(() => {
    if (map) {
        map.destroy();
        map = null;
    }
})
</script>

<template>
    <div id="mapDiv" class="map">
    </div>
</template>

<style scoped lang="scss">
#mapDiv {
    width: 1920px;
    height: 1080px;
}
</style>
