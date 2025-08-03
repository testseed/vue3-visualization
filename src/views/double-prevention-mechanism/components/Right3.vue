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
const newDanger = ref()
const getAPI = async () => {
    const res = await getDangerTypeAPI('0')
    // console.log(res);
    dangerList.value = res.data.data
    newDanger.value = dangerList.value.map((value, index) => ({
        value: value,
        itemStyle: {
            // 使用当前索引对应的颜色，若颜色数组长度不足则用默认色
            color: colors[index] || '#cccccc'
        }
    }));
    console.log(newDanger.value);
    initEchart()
}
let echartDom = ref()
let myechar = ref()
const initEchart = () => {
    myechar.value = echarts.init(echartDom.value)
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
    </div>
</template>

<style scoped lang="scss">
.Right3 {
    padding: 0 10px;

    .echarDom {
        width: 40%;
        height: 200px;
    }
}
</style>
