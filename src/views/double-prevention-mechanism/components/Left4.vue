<script setup lang="ts">
import { getSafetyObjectAPI } from '@/api/prevention'
import { ref } from 'vue';
import { onMounted } from 'vue';
const safety = ref<number[]>([])
const getAPI = async () => {
    const res = await getSafetyObjectAPI('0')
    safety.value = res.data.data
}
const getColor = (index: number) => {
    if (index === 0) {
        return '#f9db14'
    } else if (index === 1) {
        return '#04ffb5'
    } else if (index === 2) {
        return '#00eff8'
    }
}
onMounted(() => [
    getAPI()
])
</script>

<template>
    <div class="Left4">
        <div class="safe">
            <p :style="`color: ${getColor(index)};`" v-for="(item, index) in safety" :key="item">
                {{ item }}
            </p>
        </div>
        <div class="span">
            <span>风险对象</span>
            <span>风险单位</span>
            <span>风险事件</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.Left4 {
    padding: 10px 10px;

    .safe {
        background: url('../../../assets/images/doublePreventionMechanism/三联指标.png') no-repeat;
        background-size: 100% 100%;
        color: aliceblue;
        font-size: 28px;
        display: flex;
        gap: 44px;
        justify-content: space-around;
        height: 60px;
        padding-bottom: 30px;
        align-items: center;
        font-weight: bold;
    }

    .span {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 44px;
        color: #fff;
        font-size: 16px;
    }
}
</style>
