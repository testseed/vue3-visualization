<script setup lang="ts">
import { getOperationAPI } from '@/api/prevention'
import { ref } from 'vue';
import type { itemType } from '@/type/hazard'
import { onMounted } from 'vue';
const opera = ref<itemType[]>([])
const getAPI = async () => {
    const res = await getOperationAPI('0')
    opera.value = res.data.data
}
const getColor = (key: string) => {
    if (key === '优') {
        return '#4fff8e'
    } else if (key === '良') {
        return '#2be4ff'
    } else if (key === '中') {
        return '#e5a429'
    } else if (key === '差') {
        return '#ff5a42'
    }
}
onMounted(() => {
    getAPI()
})
</script>

<template>
    <div class="Left1">
        <ul>
            <li v-for="item in opera" :key="item.value">
                <p :style="`color: ${getColor(item.key)};`">{{ item.value }}</p>
                <h1 :style="`color: ${getColor(item.key)};`">{{ item.key }}</h1>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.Left1 {
    padding: 10px 20px;

    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;

        li {
            background: url('../../../assets/images/doublePreventionMechanism/优.png') no-repeat center;
            background-size: 100% 100%;
            text-align: center;
            color: #fff;
            padding: 5px 30px;
            font-weight: bold;

            p {
                font-size: 25px;
                margin-bottom: 10px;
                margin-top: 10px;
            }

            h1 {
                font-size: 18px;
                margin-top: 25px;
            }
        }

        li:nth-child(2) {
            background: url('../../../assets/images/doublePreventionMechanism/良.png') no-repeat center;
        }

        li:nth-child(3) {
            background: url('../../../assets/images/doublePreventionMechanism/中.png') no-repeat center;
        }

        li:nth-child(4) {
            background: url('../../../assets/images/doublePreventionMechanism/差.png') no-repeat center;
        }
    }
}
</style>
