<script setup lang="ts">
import { getDeviceAPI } from '@/api/hazard'
import { ref } from 'vue';
import { onMounted } from 'vue';
import * as echarts from 'echarts'
import 'echarts-liquidfill'
const deviceList = ref<number[]>([])
const getAPI = async () => {
    const res = await getDeviceAPI('0')
    deviceList.value = res.data.data
    initChart()
}
onMounted(() => {
    getAPI()
})
let echarDom1 = ref()
let myechar1 = ref()
let echarDom2 = ref()
let myechar2 = ref()
let echarDom3 = ref()
let myechar3 = ref()
const initChart = () => {
    myechar1.value = echarts.init(echarDom1.value)
    myechar1.value.setOption({
        series: [
            {
                type: 'liquidFill',
                data: [deviceList.value[0] / 100], // 88% 填充比例
                radius: '100%',
                center: ['50%', '50%'],
                color: [{
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#5e9dd5' // 顶部颜色
                    }, {
                        offset: 1,
                        color: 'blue' // 底部颜色
                    }]
                }], // 水球颜色
                backgroundStyle: {
                    color: 'transparent', // 透明背景
                    borderWidth: 5,
                    borderColor: '#136788'
                },
                outline: {
                    show: true, // 显示边框
                    borderDistance: 2, // 边框与水的距离
                    itemStyle: {
                        color: 'none', // 无填充
                        borderColor: '#136788', // 边框颜色
                        borderWidth: 2,
                        shadowBlur: 0 // 无阴影
                    }

                },
                label: {
                    show: true,
                    color: '#294D99',
                    fontSize: 25,
                    fontWeight: 'bold',
                    formatter: function () {
                        return `${deviceList.value[0]}%`; // 自定义中心文字
                    },
                    position: ['50%', '50%']
                },
                waveAnimation: true,
                animationDuration: 2000,
                animationDurationUpdate: 2000
            }
        ]
    })
    myechar2.value = echarts.init(echarDom2.value)
    myechar2.value.setOption({
        series: [
            {
                type: 'liquidFill',
                data: [deviceList.value[1] / 100], // 88% 填充比例
                radius: '100%',
                center: ['50%', '50%'],
                color: [{
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#5e9dd5' // 顶部颜色
                    }, {
                        offset: 1,
                        color: 'red' // 底部颜色
                    }]
                }], // 水球颜色
                backgroundStyle: {
                    color: 'transparent', // 透明背景
                    borderWidth: 5,
                    borderColor: '#136788'
                },
                outline: {
                    show: true, // 显示边框
                    borderDistance: 2, // 边框与水的距离
                    itemStyle: {
                        color: 'none', // 无填充
                        borderColor: '#136788', // 边框颜色
                        borderWidth: 2,
                        shadowBlur: 0 // 无阴影
                    }

                },
                label: {
                    show: true,
                    color: '#294D99',
                    fontSize: 25,
                    fontWeight: 'bold',
                    formatter: function () {
                        return `${deviceList.value[1]}%`; // 自定义中心文字
                    },
                    position: ['50%', '50%']
                },
                waveAnimation: true,
                animationDuration: 2000,
                animationDurationUpdate: 2000
            }
        ]
    })
    myechar3.value = echarts.init(echarDom3.value)
    myechar3.value.setOption({
        series: [
            {
                type: 'liquidFill',
                data: [deviceList.value[2] / 100], // 88% 填充比例
                radius: '100%',
                center: ['50%', '50%'],
                color: [{
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#5e9dd5' // 顶部颜色
                    }, {
                        offset: 1,
                        color: 'green' // 底部颜色
                    }]
                }], // 水球颜色
                backgroundStyle: {
                    color: 'transparent', // 透明背景
                    borderWidth: 5,
                    borderColor: '#136788'
                },
                outline: {
                    show: true, // 显示边框
                    borderDistance: 2, // 边框与水的距离
                    itemStyle: {
                        color: 'none', // 无填充
                        borderColor: '#136788', // 边框颜色
                        borderWidth: 2,
                        shadowBlur: 0 // 无阴影
                    }

                },
                label: {
                    show: true,
                    color: '#294D99',
                    fontSize: 25,
                    fontWeight: 'bold',
                    formatter: function () {
                        return `${deviceList.value[2]}%`; // 自定义中心文字
                    },
                    position: ['50%', '50%']
                },
                waveAnimation: true,
                animationDuration: 2000,
                animationDurationUpdate: 2000
            }
        ]
    })
}
</script>

<template>
    <div class="Right4">
        <div class="item">
            <div style="width:100%;height: 90px;" class="echarDom1" ref="echarDom1"></div>
            <p>视频监控</p>
        </div>
        <div class="item">
            <div style="width:100%;height: 90px;" class="echarDom1" ref="echarDom2"></div>
            <p>重大危险源</p>
        </div>
        <div class="item">
            <div style="width:100%;height: 90px;" class="echarDom1" ref="echarDom3"></div>
            <p>有毒有害/可燃气体</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.Right4 {
    padding: 0 10px;
    color: #fff;
    display: flex;
    align-items: center;

    .item {
        text-align: center;
        font-size: 14px;
        margin-top: 5px;
        width: calc(100% /3);
    }
}
</style>
