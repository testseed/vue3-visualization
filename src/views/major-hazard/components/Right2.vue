<script setup lang="ts">
import { getIssueAPI } from '@/api/hazard'
import { ref } from 'vue';
import type { issueType } from '@/type/hazard'
import { onMounted } from 'vue';
import * as echarts from 'echarts'
const issueList = ref<issueType>()
type serverityLevel = '低' | '中' | '高'
const colorMap: Record<serverityLevel, {
    itemColor: string,
    labelColor: string,
    lineColor: string
}> = {
    '低': {
        itemColor: '#2fd882',
        labelColor: '#2fd882',
        lineColor: '#2fd882'
    },
    '中': {
        itemColor: '#fbe214',
        labelColor: '#fbe214',
        lineColor: '#fbe214'
    },
    '高': {
        itemColor: '#f06023',
        labelColor: '#f06023',
        lineColor: '#f06023'
    }
};

const report = ref()
const getAPI = async () => {
    const res = await getIssueAPI('0')
    issueList.value = res.data.data
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
            text: '隐患整改总数',
            subtext: '590',
            left: 'center',
            top: 'center',
            textStyle: {
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff'  // 主文字使用主题色
            },
            subtextStyle: {
                fontSize: 20,
                color: '#12fef0',
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '隐患等级',
                type: 'pie',
                radius: ['50%', '80%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: (params: any) => {
                        return params.data.key; // 直接访问数据项的 key 属性
                    },
                    position: 'outside',
                    alignTo: 'labelLine',
                    distanceToLabelLine: 5,
                    fontSize: 12,
                },
                labelLine: {
                    show: true,
                    length: 3,
                    length2: 40,
                    smooth: true
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: issueList.value?.severity.map(item => ({
                    ...item,
                    itemStyle: { color: colorMap[item.key as '低' | '中' | '高'].itemColor },
                    label: { color: colorMap[item.key as '低' | '中' | '高'].labelColor },
                    labelLine: { lineStyle: { color: colorMap[item.key as '低' | '中' | '高'].lineColor } }
                })),
                padAngle: 6, // 块间距角度
                startAngle: 90
            }
        ]
    })
}
</script>

<template>
    <div class="Right2">
        <div class="echart" ref="echarDom"></div>
    </div>
</template>

<style scoped lang="scss">
.Right2 {
    padding: 0 10px;

    .echart {
        width: 100%;
        height: 180px;
    }
}
</style>
