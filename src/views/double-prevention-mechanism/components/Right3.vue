<script setup lang="ts">
import { getDangerTypeAPI } from '@/api/prevention'
import { ref } from 'vue';
import { onMounted } from 'vue';
import * as echarts from 'echarts'
const dangerList = ref<number[]>([])
const colors = [
    '#2fdb84',   // 索引 0
    '#33ffe9',   // 索引 1
    '#f9db14',   // 索引 2
    '#189ee3',   // 索引 3
    '#f06023',   // 索引 4
    '#881969',   // 索引 5
    '#fb6042',   // 索引 6
    '#fb4246'    // 索引 7
];
const dangerName = ['安全', '消防', '工艺', '总图', '电气', '其他', '仪表', '外聘专家排查']
const newDanger = ref()
const getAPI = async () => {
    const res = await getDangerTypeAPI('0')
    // console.log(res);
    dangerList.value = res.data.data
    newDanger.value = dangerList.value.map((value, index) => ({
        value: value,
        name: dangerName[index],
        itemStyle: {
            // 使用当前索引对应的颜色，若颜色数组长度不足则用默认色
            color: colors[index] || '#cccccc'
        }
    }));
    console.log(newDanger.value);
    initEchart()
}
let echarDom = ref()
let myechar = ref()
const initEchart = () => {
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
                radius: ['40%', '80%'], // 环形图内外半径，控制环形粗细
                center: ['50%', '40%'], // 调整环形图在容器中的位置
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
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: newDanger.value,
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
    <div class="Right3">
        <div class="echarDom" ref="echarDom"></div>
        <ul>
            <li v-for="item in newDanger" :key="item">
                <div :style="`background-color: ${item.itemStyle.color};`" class="bot"></div>
                <span>{{ item.name }}</span>
                <p :style="`color: ${item.itemStyle.color};`">{{ item.value }}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.Right3 {
    padding: 0 10px;
    display: flex;

    .echarDom {
        width: 40%;
        height: 170px;
    }

    ul {
        display: flex;
        align-items: center;
        flex-wrap: wrap;


        li {
            display: flex;
            align-items: center;
            margin: 0 10px;
            width: 40%;
            font-size: 14px;

            .bot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                flex-shrink: 0;
                background-color: aqua;
            }

            span {
                color: #fff;
                margin-left: 10px;
                margin-right: 20px;
            }

            p {
                color: aqua;
                font-weight: bold;
                margin-left: auto;
            }
        }
    }
}
</style>
