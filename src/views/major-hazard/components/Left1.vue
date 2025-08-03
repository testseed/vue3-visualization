<script setup lang="ts">
import { getEtRiskWarningAPI } from '@/api/hazard'
import { onMounted } from 'vue';
const getAPI = async () => {
    const res = await getEtRiskWarningAPI('0')
    console.log(res);
}
onMounted(() => {
    // getAPI()
})
</script>

<template>
    <div class="Left1">
        <div class="item">
            <div class="text">
                <h3>严重高风险</h3>
                <p style="color: #ff8181;">0</p>
            </div>
        </div>
        <div class="item">
            <div class="text">
                <h3>高风险</h3>
                <p style="color: #fea780;">1</p>
            </div>
        </div>
        <div class="item">
            <div class="text">
                <h3>中等风险</h3>
                <p style="color: #e7b374;">12</p>
            </div>
        </div>
        <div class="item">
            <div class="text">
                <h3>一般风险</h3>
                <p style="color: #80b2fe;">2</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.Left1 {
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;

    .item {
        width: 50%;
        color: #fff;
        // padding-left: 40px;
        margin-bottom: 20px;
        background-size: 100% 100%;

        .text {
            margin-left: 34%;

            h3 {
                font-size: 14px;
            }

            p {
                font-size: 20px;
            }
        }
    }

    .item:nth-child(1) {
        background: url('../../../assets/images/zdfx.png') no-repeat center;
    }

    .item:nth-child(2) {
        background: url('../../../assets/images/jdfx.png') no-repeat center;
    }

    .item:nth-child(3) {
        background: url('../../../assets/images/ybfx.png') no-repeat center;
    }

    .item:nth-child(4) {
        background: url('../../../assets/images/dfx.png') no-repeat center;
    }
}
</style>
