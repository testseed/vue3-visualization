<script setup lang="ts">
import { getHazardReportAPI } from '@/api/hazard'
import { ref } from 'vue';
import { onMounted } from 'vue';
import * as echarts from 'echarts'
const reportList = ref<number[]>([])
const report = ref()
const getAPI = async () => {
    const res = await getHazardReportAPI('0')
    reportList.value = res.data.data
    report.value = [
        {
            value: reportList.value[0], name: '装置启停车1', itemStyle: { color: '#5470c6' },
            label: {
                color: '#5470c6'
            },
            labelLine: {
                lineStyle: {
                    color: '#5470c6'
                }
            }
        },
        {
            value: reportList.value[1], name: '装置启停车2', itemStyle: { color: '#91cc75' },
            label: {
                color: '#91cc75'
            },
            labelLine: {
                lineStyle: {
                    color: '#91cc75'
                }
            }
        },
    ]
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
        title: {
            text: '33%',
            left: 'center',
            top: 'center',
            textStyle: {
                fontSize: 26,
                fontWeight: 'bold',
                color: '#fff'  // 主文字使用主题色
            },
            subtextStyle: {
                fontSize: 16,
                color: '#666',
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '装置启停车',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: (params: any) => {
                        // 为每个数据项返回不同的样式
                        return `{label${params.dataIndex}|${params.name}}`
                    },
                    rich: {
                        label0: {
                            color: '#5470c6', // 第一个数据项颜色
                            fontSize: 14,
                            fontWeight: 'bold',
                            padding: [2, 5],
                            borderRadius: 4
                        },
                        label1: {
                            color: '#91cc75', // 第二个数据项颜色
                            fontSize: 14,
                            fontWeight: 'bold',
                            padding: [2, 5],
                            borderRadius: 4
                        }
                    },
                    position: 'outside',
                    alignTo: 'labelLine'
                },
                labelLine: {
                    show: true,
                    length: 20,
                    length2: 20,
                    lineStyle: {
                        width: 1.5,
                        color(params: any) {
                            // 为每个数据项设置不同引导线颜色
                            return params.dataIndex === 0 ? '#4e79a7' : '#ccc';
                        }
                    },
                    smooth: 0.2
                },
                emphasis: {
                    scale: false,
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                    }
                },
                data: report.value,
                padAngle: 6, // 块间距角度
                startAngle: 90
            }
        ]
    })
}
</script>

<template>
    <div class="Left4">
        <div class="echart" ref="echarDom"></div>
    </div>
</template>

<style scoped lang="scss">
.Left4 {
    padding: 0 10px;

    .echart {
        width: 100%;
        height: 180px;
    }
}
</style>
