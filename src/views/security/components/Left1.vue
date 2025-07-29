<script setup lang="ts">
import { getHazardAPI, getSituationAPI } from '@/api/safe'
import { onMounted } from 'vue';
import type { hazardType } from '@/type/safe'
import { ref } from 'vue';
import * as echarts from 'echarts'
import { computed } from 'vue';
const hazardList = ref<hazardType[]>([])
const situationList = ref<hazardType[]>([])
const getAPI = async () => {
    try {
        const res = await Promise.all([getHazardAPI('0'), getSituationAPI('0')])
        hazardList.value = res[0].data.data
        situationList.value = res[1].data.data
        initChart()
    } catch (error) {
        console.log(error);
    }
}
let echarDom = ref()
let myechar = ref()
const hazardAll = computed(() => {
    return hazardList.value.reduce((sum, item) => sum + item.value, 0)
})
const initChart = () => {
    myechar.value = echarts.init(echarDom.value)
    myechar.value.setOption({
        tooltip: {
            trigger: 'item'
        },
        graphic: [ // 用于在图表中心添加文字
            {
                type: 'text',
                left: '35%', // 文字的水平位置，与饼图中心对齐
                top: '40%', // 文字的垂直位置
                style: {
                    text: '危险源总数',
                    fontSize: 14,
                    fontWeight: 'normal',
                    fill: '#d2d6d6', // 文字颜色
                    textAlign: 'center'
                },
                z: 100 // 确保文字在最上层
            },
            {
                type: 'text',
                left: '43%',
                top: '50%',
                style: {
                    text: hazardAll.value,
                    fontSize: 30,
                    fontWeight: 'bold',
                    fill: '#00FFFF', // 蓝色
                    textAlign: 'center'
                },
                z: 100
            }
        ],
        series: [
            {
                name: '危险源统计',
                type: 'pie',
                radius: ['40%', '80%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: hazardList.value.map(item => ({
                    value: item.value,
                    name: item.key
                })),
                color: ['#ff3e30', '#f06023', '#f9db14', '#189ee3']
            }
        ]
    })
}
const getColorStyle = (index: number) => {
    if (index === 0) {
        return '#ff3e30'
    } else if (index === 1) {
        return '#f06023'
    } else if (index === 2) {
        return '#f9db14'
    } else if (index === 3) {
        return '#189ee3'
    }
}
onMounted(() => {
    getAPI()
})
</script>

<template>
    <div class="left1">
        <div class="situation" v-if="situationList && situationList.length > 0">
            <img src="../../../assets/images/化工工艺.png" alt="">
            <h3>{{ situationList[0].key }}</h3>
            <p><span>{{ situationList[0].value }}</span>种</p>
            <p><span>{{ situationList[1].value }}</span>处</p>
        </div>
        <div class="situation" v-if="situationList && situationList.length > 0">
            <img src="../../../assets/images/化学品.png" alt="">
            <h3>{{ situationList[2].key }}</h3>
            <p><span>{{ situationList[2].value }}</span>种</p>
            <p><span>{{ situationList[3].value }}</span>处</p>
        </div>
        <div class="situaList">
            <div class="echarDom" ref="echarDom"></div>
            <div class="chart-list">
                <ul>
                    <li v-for="(item, index) in hazardList" :key="item.key">
                        <div :style="`background-color:${getColorStyle(index)} ;`" class="lib"></div>
                        <strong>{{ item.key }}</strong>
                        <span :style="`color:${getColorStyle(index)} ;`">{{ item.value }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.left1 {
    padding: 0 10px;

    .situaList {
        display: flex;
        width: 100%;
        height: auto;

        .echarDom {
            width: 55%;
            height: 230px;
        }

        .chart-list {
            width: 45%;
            margin-top: 35px;

            ul {
                display: flex;
                flex-direction: column;

                li {
                    display: flex;
                    margin-top: 10px;
                    align-items: center;

                    .lib {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background-color: #38bbd6;
                    }

                    strong {
                        color: #fff;
                        margin-left: 10px;
                        font-size: 16px;
                    }

                    span {
                        color: #38bbd6;
                        font-size: 18px;
                        margin-left: auto;
                    }
                }
            }
        }
    }

    .situation {
        width: 100%;
        // margin-top: 10px;
        background: url('../../../assets/images/两重点一重大.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        padding: 12px 15px 12px 0;
        color: #fff;

        h3 {
            margin-left: 10px;
            margin-right: 20px;
        }

        p {
            display: block;
            margin-left: auto;
            width: auto;
            font-size: 17px;

            span {
                color: #ffc002;
                margin-right: 10px;
            }
        }
    }
}
</style>
