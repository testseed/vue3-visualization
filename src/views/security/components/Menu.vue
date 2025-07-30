<script setup lang="ts">
import { ref } from 'vue'
import down from '@/assets/images/down.png'
import { computed } from 'vue';
import { onMounted } from 'vue';
const menuIndex = ref(0)
const menuList = ref([
    { type: 2, name: '装置开停车', img: '' },
    { type: 3, name: '装置大检修', img: '' },
    { type: 4, name: '视频监控', img: down },
    { type: 5, name: '两重点一重大', img: down },
])
const showRight1 = ref(false)
const showRight2 = ref(false)
let hideTimer1: number | undefined = 1
let hideTimer2: number | undefined = 1
const showTarget = (index: number) => {
    if (index === 1) {
        showRight1.value = true
        cancelHide(1)
    } else if (index === 2) {
        showRight2.value = true
    }
}
const scheduleHide = (index: number) => {
    if (index === 1) {
        hideTimer1 = setTimeout(() => {
            showRight1.value = false
        }, 100)
    } else if (index === 2) {
        hideTimer2 = setTimeout(() => {
            showRight1.value = false
        }, 100)
    }
}
const cancelHide = (index: number) => {
    if (index === 1) {
        clearInterval(hideTimer1)
    } else if (index === 2) {
        clearInterval(hideTimer2)
    }
}
const hideTarget = (index: number) => {
    if (index === 1) {
        showRight1.value = false
    } else if (index === 2) {
        showRight2.value = false
    }
}
const firstItemBottom = ref(0)
const fourItemBottom = ref(0)
const setItemPosition = () => {
    const dvMenu = document.querySelector('.dv-menu')
    const firstItem = document.querySelectorAll('.list-item')[0]
    const dvRect = dvMenu!.getBoundingClientRect()
    if (firstItem) {
        const firstRect = firstItem.getBoundingClientRect()
        firstItemBottom.value = dvRect.bottom - firstRect.bottom
    }
    const fourItem = document.querySelectorAll('.list-item')[3]
    if (fourItem) {
        const fourRect = fourItem.getBoundingClientRect()
        fourItemBottom.value = dvRect.bottom - fourRect.bottom
    }
}
const companiesOneIndex = ref(-1)
const companiesTowIndex = ref(-1)
const updataOneCompanies = (index: number) => {
    if (companiesOneIndex.value !== index) {
        companiesOneIndex.value = index
    } else {
        companiesOneIndex.value = -1
    }
}
const updataTowCompanies = (index: number) => {
    if (companiesTowIndex.value !== index) {
        companiesTowIndex.value = index
    } else {
        companiesTowIndex.value = -1
    }
}
onMounted(() => {
    setItemPosition()
})
</script>

<template>
    <div class="dv-menu">
        <ul class="menu">
            <li class="list-item first-item" @mouseenter="showTarget(1)" @mouseleave="scheduleHide(1)">
                <span>全部企业</span>
                <img :src="down" alt="">
            </li>
            <li class="list-item" @click="menuIndex = item.type"
                :class="{ active: menuIndex === item.type && menuIndex !== 1 }" v-for="(item, index) in menuList"
                :key="index" @mouseenter="index === 2 ? showTarget(2) : null"
                @mouseleave="index === 2 ? scheduleHide(2) : null">
                <span>{{ item.name }}</span>
                <img :src="item.img" alt="">
            </li>
        </ul>
        <div v-if="showRight1" @mouseenter="cancelHide(1)" @mouseleave="hideTarget(1)" class="allMenu"
            :style="{ bottom: firstItemBottom + 'px' }">
            <div class="item-all" v-for="(item, index) in 5">
                <div class="data-v" @click="updataOneCompanies(index)"
                    :class="{ allMenuActive: companiesOneIndex === index }">
                </div>
                <p>安达市博源泰化工实111111111111111111</p>
            </div>
        </div>
        <div v-if="showRight2" class="allMenu" @mouseenter="cancelHide(2)" @mouseleave="hideTarget(2)"
            :style="{ bottom: fourItemBottom + 'px' }">
            <div class="item-all" v-for="(item, index) in 3">
                <div class="data-v" @click="updataTowCompanies(index)"
                    :class="{ allMenuActive: companiesTowIndex === index }">
                </div>
                <p>高空瞭望</p>
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
    position: relative;
    padding: 8px;
    color: #fff;
    font-weight: bold;
    position: absolute;
    right: calc(450px + 28px);
    top: 770px;
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
