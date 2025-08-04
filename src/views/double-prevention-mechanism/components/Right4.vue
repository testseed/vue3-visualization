<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue';
import { ref } from 'vue';
import { getTrendAPI } from '@/api/prevention'
import { watch } from 'vue';
type trendType = {
    xData: string[],
    xzyhs: number[],
    yysyhs: number[]
}
const trend2024 = ref<trendType>()
const trend2025 = ref<trendType>()
const trend = ref<trendType>()
const getAPI = async () => {
    const res = await getTrendAPI('0')
    // console.log(res);
    trend2024.value = res.data.data
    trend.value = trend2024.value
    trend2025.value = {
        "xzyhs": [
            10,
            20,
            4,
            22,
            31,
            10
        ],
        "yysyhs": [
            20,
            9,
            10,
            19,
            10,
            4
        ],
        "xData": [
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月"
        ]
    }
    initEchar()
}
let echarDom = ref()
let myechar = ref()
const initEchar = () => {
    myechar.value = echarts.init(echarDom.value)
    myechar.value.setOption({
        tooltip: {
            trigger: 'item',
        },
        grid: {
            bottom: '20%',
            top: '10%',
        },
        xAxis: {
            type: 'category',
            data: trend.value?.xData, // xData 数据
            axisLine: {
                lineStyle: {
                    color: '#fff' // X轴轴线颜色
                }
            },
            // X轴刻度标签样式
            axisLabel: {
                color: '#fff' // X轴文字颜色
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#fff' // Y轴轴线颜色
                }
            },
            // Y轴刻度标签样式
            axisLabel: {
                color: '#fff' // Y轴文字颜色
            },
            // Y轴网格线样式
            splitLine: {
                lineStyle: {
                    color: '#fff' // Y轴网格线颜色
                }
            }
        },
        series: [
            {
                name: 'xzyhs',
                type: 'line',
                data: trend.value?.xzyhs, // xzyhs 数据
                smooth: true, // 使折线更平滑，接近示例中的曲线效果
                areaStyle: {
                    opacity: 0.3
                },
                lineStyle: {
                    color: '#91cc75'
                },
                itemStyle: {
                    color: '#91cc75'
                }
            },
            {
                name: 'yysyhs',
                type: 'line',
                data: trend.value?.yysyhs, // yysyhs 数据
                smooth: true,
                areaStyle: {
                    opacity: 0.3 // 区域透明度，0-1之间
                },
                // 线条颜色
                lineStyle: {
                    color: '#5470c6'
                },
                // 点的样式
                itemStyle: {
                    color: '#5470c6',
                }
            }
        ]
    })
}
watch(trend, (newValue, oldValue) => {
    initEchar()
}, {
    deep: true
})
onMounted(() => {
    getAPI()
})
const hideenArr = [
    { color: '#189ee3', name: '已验收隐患数' },
    { color: '#00ff84', name: '新增隐患数' },
]
const ratioArr = ['2024年', '2025年']
const ratioText = ref('2024年')
const isRatio = ref(false)
const ratioBtn = (item: string) => {
    if (item === '2024年') {
        trend.value = trend2024.value
    } else if (item === '2025年') {
        trend.value = trend2025.value
    }
    ratioText.value = item
    isRatio.value = false
}
const ratioClick = () => {
    isRatio.value = !isRatio.value
}
</script>

<template>
    <div class="Left2">
        <div class="header">
            <div class="item" v-for="item in hideenArr" :key="item.name">
                <div class="bot" :style="`background-color:${item.color} ;`"></div>
                <span :style="`color: ${item.color};`">{{ item.name }}</span>
            </div>
            <div class="option">
                <div class="option-main" @click="ratioClick">
                    <span style="margin-right: 5px;">{{ ratioText }}</span>
                    <span>></span>
                </div>
                <div v-if="isRatio" class="main">
                    <div v-for="(item, index) in ratioArr" @click="ratioBtn(item)">{{ item }}</div>
                </div>
            </div>
        </div>
        <div class="echarDom" ref="echarDom"></div>
    </div>
</template>

<style scoped lang="scss">
.Left2 {
    padding: 0 10px;

    .echarDom {
        width: 100%;
        height: 180px;
    }

    .header {
        display: flex;
        align-items: center;
        position: absolute;
        top: 40px;

        .item {
            display: flex;
            align-items: center;
            margin: 0 15px;

            .bot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: aqua;
            }

            span {
                color: aqua;
                font-size: 14px;
            }
        }

        .option {
            color: #fff;

            .option-main {
                border: 1px solid #fff;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 5px;
                font-size: 14px;
                background-color: #004258;
                cursor: pointer;
            }

            .main {
                display: flex;
                flex-direction: column;
                position: absolute;

                div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px 10px;
                    background-color: #004258;
                    cursor: pointer;
                    font-size: 14px;
                    z-index: 999;
                }

                div:hover {
                    background-color: #767676;
                }
            }
        }
    }
}
</style>
