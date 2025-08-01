<script setup lang="ts">
import { getUserCountAPI } from '@/api/hazard'
import { ref } from 'vue';
import { onMounted } from 'vue';
import * as echarts from 'echarts'
type userCountType = {
    name: string,
    value: number
}
const userCountList = ref<userCountType[]>([])
const getAPI = async () => {
    const res = await getUserCountAPI('0')
    userCountList.value = res.data.data
    initChart()
}
onMounted(() => {
    getAPI()
})
let echarDom = ref()
let myechar = ref()
const initChart = () => {
    myechar.value = echarts.init(echarDom.value)
    myechar.value.setOption({
        tooltip: {
            trigger: 'item',
        },
        grid: {
            left: '-1%',
            // right: '4%',
            top: '5%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLine: {
                show: true
            },
            axisTick: {
                show: true
            },
            splitLine: {
                show: false
            },
            max: 500,
            interval: 50
        },
        yAxis: {
            type: 'category',
            data: userCountList.value.map(item => item.name),
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#fff'
            }
        },
        series: [
            {
                name: '最大值',
                type: 'bar',
                barWidth: '60%',
                barGap: '-100%', // 使背景条与主条重叠
                data: [500, 500, 500, 500],
                itemStyle: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 8 // 剩余区域颜色
                },
                silent: true, // 不响应交互
                label: {
                    show: false
                },
            },
            {
                name: '数量',
                type: 'bar',
                data: userCountList.value.map(item => item.value),
                itemStyle: {
                    color: function (params: any) {
                        const colorList = [
                            '#8a4015',
                            '#5470c6',
                            '#ffd407', // 青色
                            '#8bc34a', // 黄色
                            '#ff5252', // 紫色
                            '#03a9f4'  // 蓝色
                        ];
                        return {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                { offset: 0, color: colorList[params.dataIndex] },
                                { offset: 1, color: colorList[params.dataIndex] + 'cc' } // 添加轻微渐变效果
                            ]
                        }
                    },
                    borderRadius: 8
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}',
                    color: '#fff'
                },
                barWidth: '60%',
            }
        ]
    })
}
</script>

<template>
    <div class="Left3">
        <div class="echart" ref="echarDom"></div>
    </div>
</template>

<style scoped lang="scss">
.Left3 {
    padding: 0 10px;

    .echart {
        width: 100%;
        height: 200px;
    }
}
</style>
