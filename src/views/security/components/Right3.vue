<script setup lang="ts">
import { getDeviceRecordAPI } from '@/api/safe'
import { ref } from 'vue';
import { onMounted } from 'vue';
import * as echarts from 'echarts'
type matterType = {
    name: string,
    value: number
}
const deviceList = ref<matterType[]>([])
const getAPI = async () => {
    const res = await getDeviceRecordAPI('0')
    deviceList.value = res.data.data
    initChart()
}
let chartDom = ref()
let mychart = ref()
const initChart = () => {
    mychart.value = echarts.init(chartDom.value)
    // mychart.value.setOption({
    //     tooltip: {
    //         trigger: 'item',
    //         formatter: '{b}:{c}({d}%)'
    //     },
    //     angleAxis: {
    //         type: 'category',
    //         data: deviceList.value.map(item => item.name),
    //         axisLine: { show: false },
    //         axisTick: { show: false },
    //         axisLabel: { show: false }
    //     },
    //     radiusAxis: {
    //         min: 0,
    //         max: 1,
    //         axisLine: { show: false },
    //         axisTick: { show: false },
    //         axisLabel: { show: false },
    //         splitLine: { show: false }
    //     },
    //     polar: {
    //         radius: ['20%', '80%']
    //     },
    //     series: [
    //         {
    //             type: 'bar',
    //             coordinateSystem: 'polar',
    //             barWidth: '100%',
    //             roundCap: false,
    //             data: [
    //                 { value: deviceList.value[0].value, name: deviceList.value[0].name, itemStyle: { color: '#1890ff' } },
    //                 { value: deviceList.value[1].value, name: deviceList.value[1].name, itemStyle: { color: 'transparent' } },
    //                 { value: deviceList.value[2].value, name: deviceList.value[2].name, itemStyle: { color: '#52c41a' } },
    //                 { value: deviceList.value[3].value, name: deviceList.value[3].name, itemStyle: { color: 'transparent' } }
    //             ],
    //             label: {
    //                 show: true,
    //                 formatter: '{b}'
    //             },
    //             labelLine: {
    //                 show: true,
    //                 length1: 10,
    //                 length2: 15
    //             }
    //         }
    //     ]
    // })
    mychart.value.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c}' },
        series: [
            {
                type: 'pie',
                radius: ['20%', '70%'],        // 内圈 40%，外圈 70%
                startAngle: 90,               // 从顶部开始
                clockwise: false,             // 逆时针，方便 90° 等分
                itemStyle: { borderRadius: 0 },
                labelLine: {
                    show: true, length: 10, length2: 30, lineStyle: {
                        color: '#7aad68'
                    }
                },
                label: { show: true, formatter: '{b}', color: '#b5e9ed' },
                data: [
                    { value: deviceList.value[0].value, name: deviceList.value[0].name, itemStyle: { color: '#1890ff' } },
                    { value: deviceList.value[1].value, name: deviceList.value[1].name, itemStyle: { color: 'transparent' } },
                    { value: deviceList.value[2].value, name: deviceList.value[2].name, itemStyle: { color: '#52c41a' } },
                    { value: deviceList.value[3].value, name: deviceList.value[3].name, itemStyle: { color: 'transparent' } }
                ]
            }
        ]
    })
}
onMounted(() => [
    getAPI()
])
</script>

<template>
    <div class="Right3">
        <div class="chartDom" ref="chartDom"></div>
    </div>
</template>

<style scoped lang="scss">
.Right3 {
    .chartDom {
        width: 100%;
        height: 250px;
    }
}
</style>
