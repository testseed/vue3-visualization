<script setup lang="ts">
import { getComBuildAPI } from '@/api/safe'
import { ref } from 'vue';
import { onMounted } from 'vue';
import * as echarts from 'echarts'
const comBuildList = ref([])
const getAPI = async () => {
    const res = await getComBuildAPI('0')
    comBuildList.value = res.data.data
    initChart()
}
let echarDom = ref()
let myechar = ref()
const initChart = () => {
    myechar.value = echarts.init(echarDom.value)
    myechar.value.setOption({
        title: {
            text: '总数',
            left: '10%', // 调整标题位置
            top: '0',
            textStyle: {
                color: '#96bfc4', // 标题颜色
                fontSize: 13
            }
        },
        // 网格配置，调整图表主体区域
        grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '20%',
            containLabel: true // 包含坐标轴的刻度标签
        },
        xAxis: {
            type: 'category',
            data: ['项目资料', '安全三同时', '验收信息'],
            axisLabel: {
                color: '#96bfc4', // X轴标签颜色
                fontSize: 14
            },
            axisLine: {
                lineStyle: {
                    color: '#e0e6f1' // X轴线颜色
                }
            },
            axisTick: {
                show: false // 不显示X轴刻度线
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100, // 根据图片中的最大值设置
            interval: 20, // 根据图片中的间隔设置
            axisLabel: {
                color: '#96bfc4', // Y轴标签颜色
                fontSize: 14
            },
            splitLine: {
                lineStyle: {
                    color: '#555' // 网格线颜色
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#555' // Y轴线颜色
                }
            }
        },
        series: [
            {
                name: '数量',
                type: 'bar',
                data: comBuildList.value, // 根据图片数据设置
                barWidth: '30%', // 柱子宽度
                itemStyle: {
                    // 渐变色
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, // 从上到下渐变
                        [
                            { offset: 0, color: '#FFD700' }, // 0%处的颜色，黄色
                            { offset: 1, color: '#B8860B' }  // 100%处的颜色，暗金色
                        ]
                    ),
                    // 柱子顶部的3D效果
                    // 使用 border 模拟，但要精确还原3D效果可能需要自定义 render 或使用 custom series
                    // 这里通过 itemStyle 里的 `shadowBlur` 和 `shadowColor` 模拟一些立体感
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowOffsetY: 5
                },
                // 柱子顶部的钻石/菱形效果，ECharts没有直接的属性，需要通过自定义渲染或在 series 里叠加
                // 这里为了简化，我们暂时不实现顶部的钻石形状，主要还原渐变色和高度
                // 如果需要更精确的顶部形状，可能需要考虑 custom series 或 symbol
                // 例如：使用 symbol 属性，但它会应用到整个柱子，而不是顶部
                symbol: 'diamond',
                symbolSize: [50, 10], // 尝试调整形状大小
                symbolOffset: [0, -5], // 尝试调整偏移量
            }
        ]
    })
}
onMounted(() => {
    getAPI()
})
</script>

<template>
    <div class="Left2">
        <div class="echarDom" ref="echarDom"></div>
    </div>
</template>

<style scoped lang="scss">
.Left2 {
    .echarDom {
        width: 100%;
        height: 200px;
    }
}
</style>
