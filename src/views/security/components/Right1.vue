<script setup lang="ts">
import { getGuardAPI } from '@/api/safe'
import type { hazardType } from '@/type/safe'
import { ref } from 'vue';
import { onMounted } from 'vue';
import zaixian from '@/assets/images/在线视频.png'
import lixian from '@/assets/images/离线视频.png'
import yujin from '@/assets/images/视频预警.png'
const guardList = ref<hazardType[]>([])
const getAPI = async () => {
    const res = await getGuardAPI('0')
    guardList.value = res.data.data
}
const getImg = (key: string) => {
    if (key === '在线视频') {
        return zaixian
    } else if (key === '离线视频') {
        return lixian
    } else if (key === '视频预警') {
        return yujin
    }
}
onMounted(() => {
    getAPI()
})
</script>

<template>
    <div class="Right1">
        <div class="guard" :style="`background: url(${getImg(item.key)}) no-repeat;`" v-for="item in guardList"
            :key="item.key">
            <div class="main">
                <h4>{{ item.value }}</h4>
                <p>{{ item.key }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.Right1 {
    display: flex;
    align-items: center;
    margin-top: 25px;

    .guard {
        background: url('../../../assets/images/离线视频.png') no-repeat;
        background-size: cover;
        height: 47px;
        width: 28%;
        padding-left: 55px;
        margin-left: 20px;

        .main {

            h4 {
                font-size: 16px;
                color: #fff;
            }

            p {
                font-size: 12px;
                color: #fff;
            }
        }
    }
}
</style>
