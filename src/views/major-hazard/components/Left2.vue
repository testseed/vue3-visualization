<script setup lang="ts">
import { getComManageAPI } from '@/api/hazard'
import type { comManageType } from '@/type/hazard'
import { ref } from 'vue';
import { onMounted } from 'vue';
import * as echarts from 'echarts'
import { computed } from 'vue';
const comManageList = ref<comManageType[]>([])
const getAPI = async () => {
    const res = await getComManageAPI('0')
    comManageList.value = res.data.data
    initEchart()
}
onMounted(() => {
    getAPI()
    window.addEventListener('resize', () => {
        myechar.value.resize()
        initEchart()
    })
})
let echarDom = ref()
let myechar = ref()
const allManage = computed(() => {
    return comManageList.value.reduce((sum, item) => sum + item.value, 0)
})
const initEchart = () => {
    myechar.value = echarts.init(echarDom.value)
    myechar.value.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
            data: ['一般监管企业', '重点关注企业', '特别管控企业'],
            textStyle: {
                color: '#fff'
            }
        },
        graphic: [ // 用于在图表中心添加文字
            {
                type: 'text',
                left: '35%', // 文字的水平位置，与饼图中心对齐
                top: '40%', // 文字的垂直位置
                style: {
                    text: '企业总数',
                    fontSize: 10,
                    fontWeight: 'normal',
                    fill: '#d2d6d6', // 文字颜色
                    textAlign: 'center'
                },
                z: 999 // 确保文字在最上层
            },
            {
                type: 'text',
                left: '36%',
                top: '50%',
                style: {
                    text: allManage.value,
                    fontSize: 22,
                    fontWeight: 'bold',
                    fill: '#00FFFF', // 蓝色
                    textAlign: 'center'
                },
                z: 999
            }
        ],
        series: [
            {
                name: '企业分类',
                type: 'pie',
                radius: ['40%', '80%'],
                center: ['40%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 0
                },
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                data: comManageList.value.map(item => ({
                    name: item.key,
                    value: item.value
                })),
                // data: [
                //     { value: 0, name: '一般监管企业' },
                //     { value: 7, name: '重点关注企业' },
                //     { value: 11, name: '特别管控企业' }
                // ],
                // 自定义颜色
                // color: ['#f06023', '#f9db14', '#2fd882']
                color: comManageList.value.map(item => item.color)
            }
        ]
    })
}
</script>

<template>
    <div class="Left2">
        <div class="echarDom" ref="echarDom"></div>
    </div>
</template>

<style scoped lang="scss">
.Left2 {
    padding: 0 10px;

    .echarDom {
        width: 100%;
        height: 150px;
    }
}
</style>
