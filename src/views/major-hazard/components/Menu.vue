<script setup lang="ts">
import { ref } from 'vue'
import down from '@/assets/images/down.png'
import { computed } from 'vue';
import { onMounted } from 'vue';
import { getCompaniesAPI, getKeynoteAPI } from '@/api/safe'
import type { companiesType, keynoteType } from '@/type/safe'
import { usemapConfigStore } from '@/stores'
const mapConfigStore = usemapConfigStore()
const menuIndex = ref(0)
const menuList = ref([
    { type: 2, name: '重大危险源检测', img: '' },
    { type: 3, name: '有毒有害/可燃气体监测', img: '' },
    { type: 4, name: '视频监控', img: '' },
    { type: 5, name: '重大危险源分类监管', img: '' },
    { type: 6, name: '重大危险因患', img: '' },
])
const showRight1 = ref(false)
let hideTimer1: number | undefined = 1
const showTarget = (index: number) => {
    if (index === 1) {
        showRight1.value = true
        cancelHide(1)
    }
}
const scheduleHide = (index: number) => {
    if (index === 1) {
        hideTimer1 = setTimeout(() => {
            showRight1.value = false
        }, 100)
    }
}
const cancelHide = (index: number) => {
    if (index === 1) {
        clearInterval(hideTimer1)
    }
}
const hideTarget = (index: number) => {
    if (index === 1) {
        showRight1.value = false
    }
}
const firstItemBottom = ref(0)
const setItemPosition = () => {
    const dvMenu = document.querySelector('.dv-menu')
    const firstItem = document.querySelectorAll('.list-item')[0]
    const dvRect = dvMenu!.getBoundingClientRect()
    if (firstItem) {
        const firstRect = firstItem.getBoundingClientRect()
        firstItemBottom.value = dvRect.bottom - firstRect.bottom
    }
}
const companiesOneIndex = ref(-1)
const updataOneCompanies = (index: number, item: companiesType) => {
    if (companiesOneIndex.value !== index) {
        companiesOneIndex.value = index
        mapConfigStore.setCompanies(item)

    } else {
        companiesOneIndex.value = -1
        mapConfigStore.companies = undefined
    }
}
onMounted(() => {
    setItemPosition()
    getAPI()
})
const getAPI = async () => {
    const res = await Promise.all([getCompaniesAPI(), getKeynoteAPI('0')])
    companiesList.value = res[0].data.data
    keynoteList.value = res[1].data.data
}
const companiesList = ref<companiesType[]>([])
const keynoteList = ref<keynoteType[]>([])
</script>

<template>
    <div class="dv-menu">
        <ul class="menu">
            <li class="list-item first-item" @mouseenter="showTarget(1)" @mouseleave="scheduleHide(1)">
                <span style="font-size: 16px;">全部企业</span>
                <img :src="down" alt="">
            </li>
            <li class="list-item" @click="menuIndex = item.type"
                :class="{ active: menuIndex === item.type && menuIndex !== 1 }" v-for="(item, index) in menuList"
                :key="index">
                <span style="font-size: 14px;">{{ item.name }}</span>
            </li>
        </ul>
        <div v-if="showRight1" @mouseenter="cancelHide(1)" @mouseleave="hideTarget(1)" class="allMenu"
            :style="{ bottom: firstItemBottom + 'px' }">
            <div class="item-all" v-for="(item, index) in companiesList">
                <div class="data-v" @click="updataOneCompanies(index, item)"
                    :class="{ allMenuActive: companiesOneIndex === index }">
                </div>
                <p>{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.active {
    background-color: rgb(92, 52, 36);
}

.allMenuActive {
    background-color: rgb(0, 231, 252);
}

.dv-menu {
    background: url('../../../assets/images/图层控制.png') no-repeat;
    background-size: cover;
    background-position: center;
    position: fixed;
    padding: 8px;
    color: #fff;
    font-weight: bold;
    right: calc(400px + 28px);
    bottom: 16px;
    z-index: 999;

    .allMenu {
        position: absolute;
        width: 180px;
        color: #fff;
        box-shadow: 0 2px 8px rgb(0, 0, 0, 0.1);
        border-radius: 4px;
        z-index: 999;
        background-color: rgb(0, 35, 44);
        border: 3px solid rgb(0, 133, 148);
        font-size: 13px;
        font-weight: bold;
        left: 100%;

        .item-all {
            display: flex;
            align-items: center;
            padding: 15px 16px;
            border-bottom: 3px solid rgb(0, 133, 148);
            gap: 10px;

            .data-v {
                width: 15px;
                height: 15px;
                border: 1px solid rgb(0, 133, 148);
                cursor: pointer;
                flex-shrink: 0;
            }
        }
    }

    .menu {
        display: flex;
        flex-direction: column;
        background-color: rgb(17, 93, 115, 0.4);
        // opacity: 0.8;
        padding-left: 0px;
        width: 170px;

        li:hover {
            background-color: #6d4434;
        }

        li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px;
            cursor: pointer;

            img {
                width: 10px;
                height: 10px;
            }
        }
    }
}
</style>
