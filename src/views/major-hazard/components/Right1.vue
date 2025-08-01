<script setup lang="ts">
import { ref } from 'vue';
import { getMonitoringAPI } from '@/api/hazard'
import type { monitoringType } from '@/type/hazard'
import { onMounted } from 'vue';
const tabTitle = ref(['重大危险源', '有毒有害/可燃气体', '明烟明火'])
const tabIndex = ref(0)
const tabBtn = (index: number) => {
    tabIndex.value = index
    if (tabIndex.value === 0) {
        itemInfo.value = monitoringList.value?.dangerous
    } else if (tabIndex.value === 1) {
        itemInfo.value = monitoringList.value?.gas
    } else if (tabIndex.value === 2) {
        itemInfo.value = monitoringList.value?.video
    }
}
const monitoringList = ref<monitoringType>()
const itemInfo = ref()
const getAPI = async () => {
    const res = await getMonitoringAPI('0')
    monitoringList.value = res.data.data
    itemInfo.value = monitoringList.value?.dangerous
}
onMounted(() => {
    getAPI()
})
</script>

<template>
    <div class="Right1">
        <ul class="header">
            <li :class="{ active: tabIndex === index }" v-for="(item, index) in tabTitle" :key="index"
                @click="tabBtn(index)">
                {{ item }}
            </li>
        </ul>
        <div class="main">
            <ul>
                <li v-for="(item, index) in itemInfo" :key="item.key">
                    <p>{{ item.value }}</p>
                    <span :style="{ color: index === 1 ? 'red' : '#fff' }">{{ item.key }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.Right1 {
    padding: 0 10px;
    height: auto;

    .header {
        display: flex;
        align-items: center;
        padding-left: 0px;
        width: 100%;
        color: #fff;
        font-size: 13px;
        font-weight: bold;

        li {
            padding: 7px 0;
            height: auto;
            width: calc(100% / 3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.5s;
        }

        li.active {
            background-color: #116378;
            border-bottom: 1px solid #00c6ff;
        }
    }

    .main {
        background: url('../../../assets/images/border-out.png') no-repeat center 0;
        padding: 30px 10px;
        background-size: 100%;

        ul {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
            padding-left: 0px;

            li {
                background: url('../../../assets/images/zbzs.png') no-repeat;
                width: calc(90% / 3);
                text-align: center;
                background-size: 100%;

                p {
                    color: #00fff0;
                    font-size: 18px;
                    font-weight: bold;
                }

                span {
                    color: #fff;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
