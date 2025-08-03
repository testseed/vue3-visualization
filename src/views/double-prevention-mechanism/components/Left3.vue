<script setup lang="ts">
import { ref } from 'vue';
import * as echarts from 'echarts'
import { onMounted } from 'vue';
import { getSafetyControlAPI } from '@/api/prevention'
type dataType = {
    name: string,
    value: number
}
interface RiskLevel {
    [key: string]: string
}
const dataAPI = ref<dataType[]>([])
const colorMap: RiskLevel = {
    "低风险": "#189ee3",    // 蓝色
    "一般风险": "#f9db14",  // 黄色
    "较大风险": "#f06023",  // 橙色
    "重大风险": "#ff3e30"   // 红色
};
const processedData = ref()
const getAPI = async () => {
    const res = await getSafetyControlAPI('0')
    dataAPI.value = res.data.data
    processedData.value = dataAPI.value.map(item => ({
        ...item,  // 保留原有name和value
        itemStyle: {
            color: colorMap[item.name]  // 根据name匹配颜色
        }
    }))
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
        grid: { // 给右侧数据列表留出空间，可根据实际调整
            containLabel: true
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'], // 环形图内外半径，控制环形粗细
                center: ['50%', '50%'], // 调整环形图在容器中的位置
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                itemStyle: {
                    borderRadius: 10,
                    borderWidth: 2
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: processedData.value,
                padAngle: 6, // 块间距角度
                startAngle: 90
            }
        ],
    })
}
onMounted(() => {
    getAPI()
})
</script>

<template>
    <div class="Left3">
        <div class="echarDom" ref="echarDom"></div>
        <ul>
            <li v-for="item in processedData">
                <div :style="`background-color: ${item.itemStyle.color};`" class="bot"></div>
                <span>{{ item.name }}</span>
                <p :style="`color: ${item.itemStyle.color};`">{{ item.value }}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.Left3 {
    display: flex;

    .echarDom {
        width: 50%;
        height: 180px;
    }

    ul {
        display: flex;
        flex-direction: column;

        li {
            display: flex;
            align-items: center;
            margin: 10px;

            .bot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: aqua;
            }

            span {
                color: #fff;
                font-size: 16px;
                margin-left: 20px;
                margin-right: 30px;
            }

            p {
                color: aqua;
                font-size: 16px;
                font-weight: bold;
                margin-left: auto;
            }
        }
    }
}
</style>
