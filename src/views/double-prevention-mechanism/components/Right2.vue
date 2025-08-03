<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue';
import { ref } from 'vue';
let echarDom = ref()
let myechar = ref()
const oper = ref({
    patrol: { yqdb: [213, 133], ywdb: [121, 152], zdyh: [190, 222] },
})
const operItem = ref(oper.value.patrol)
const calculateTotals = () => {
    // 将对象值转为数组：[[168,156], [111,122], [233,131]]
    const dataGroups = Object.values(operItem.value);
    // 确保有数据且结构一致
    if (!dataGroups.length) return [];
    const barCount = dataGroups[0].length;

    // 计算每个柱形的总和（第一个柱形：168+111+233，第二个柱形：156+122+131）
    return Array.from({ length: barCount }, (_, index) => {
        return dataGroups.reduce((sum, group) => {
            // 累加每个数据组对应位置的值
            return sum + (group[index] || 0);
        }, 0);
    });
};

// 生
// 调用计算方法
const initEchar = () => {
    const totals = calculateTotals();
    // 将数据转换为系列所需格式
    const dataGroups = Object.entries(operItem.value);
    myechar.value = echarts.init(echarDom.value)
    myechar.value.setOption({
        tooltip: {
            trigger: 'item',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['整改中', '已验收'],
            axisLabel: {
                color: '#fff' // 假设文字颜色为白色，可根据实际调整
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc' // 坐标轴线条颜色，按需调整
                }
            }
        },
        yAxis: {
            type: 'value',
            max: 700,
            axisLabel: {
                color: '#afe3e9',
                formatter: '{value}'
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#2e5664' // 网格线颜色，按需调整
                }
            }
        },
        emphasis: {
            focus: 'series', // 只高亮当前系列，其他系列模糊
            blurScope: 'coordinateSystem' // 模糊效果应用于整个坐标系
        },
        series: [
            {
                name: '第一层',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    color: '#2fd882'
                },
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                    fontSize: 12,
                    formatter: '{c}' // 显示当前数据值
                },
                barWidth: 60,
                data: operItem.value.yqdb
            },
            {
                name: '第二层',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    color: '#189ee3'
                },
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                    fontSize: 12,
                    formatter: '{c}' // 显示当前数据值
                },
                barWidth: 60,
                data: operItem.value.ywdb
            },
            {
                name: '第三层',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    color: '#e73a2d'
                },
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                    fontSize: 12,
                    formatter: '{c}' // 显示当前数据值
                },
                barWidth: 60,
                data: operItem.value.zdyh
            },
            {
                name: '总计',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    color: 'rgba(0,0,0,0)' // 用于显示顶部总计数值，设置透明
                },
                barWidth: 60,
                label: {
                    show: true,
                    position: 'top',
                    offset: [0, 20],
                    color: '#fff',
                    fontSize: 16,
                    formatter: (param: any) => totals[param.dataIndex]
                },
                data: totals
            }
        ]
    })
}
onMounted(() => {
    if (operItem.value) {
        initEchar()
    }
})
const hideenArr = [
    { color: '#189ee3', name: '一般隐患' },
    { color: '#2fd882', name: '园区督办' },
    { color: '#fc3e30', name: '重大隐患' },
]
</script>

<template>
    <div class="Left2">
        <div class="header">
            <div class="item" v-for="item in hideenArr" :key="item.name">
                <div class="bot" :style="`background-color:${item.color} ;`"></div>
                <span :style="`color: ${item.color};`">{{ item.name }}</span>
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
        height: 230px;
    }

    .header {
        display: flex;
        align-items: center;
        position: absolute;
        top: 40px;

        .item {
            display: flex;
            align-items: center;
            margin-right: 15px;

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
    }
}
</style>
