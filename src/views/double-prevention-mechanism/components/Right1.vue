<script setup lang="ts">
import { getReminderAPI } from '@/api/prevention'
import { ref } from 'vue';
import { onMounted } from 'vue';
const dataArr = ref<number[]>([])
const getAPI = async () => {
    const res = await getReminderAPI('0')
    // console.log(res)
    dataArr.value = res.data.data
}
onMounted(() => {
    getAPI()
})
</script>

<template>
    <div class="Right1">
        <div class="item" v-for="(item, index) in dataArr">
            <span>{{ index === 0 ? '临期提醒' : '超期提醒' }}</span>
            <p>{{ item }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.Right1 {
    padding: 0 30px;
    display: flex;
    align-items: center;

    .item {
        background: url('../../../assets/images/doublePreventionMechanism/临期提醒.png') no-repeat;
        background-size: 100% 100%;
        height: 80px;
        width: 50%;
        padding-left: 25%;
        color: #fff;

        span {
            font-size: 16px;
        }

        p {
            font-size: 20px;
            font-weight: bold;
            margin-top: 20px;
        }
    }

    .item:nth-child(2) {
        background: url('../../../assets/images/doublePreventionMechanism/超期提醒.png') no-repeat;
    }
}
</style>
