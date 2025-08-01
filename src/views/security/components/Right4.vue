<script setup lang="ts">
import { getFacilityAPI } from '@/api/safe'
import type { facilityType } from '@/type/safe'
import { ref } from 'vue';
import { onMounted } from 'vue';
const facilityList = ref<facilityType[]>([])
const getAPI = async () => {
    const res = await getFacilityAPI('0')
    facilityList.value = res.data.data
}
onMounted(() => {
    getAPI()
})
</script>

<template>
    <div class="Right4">
        <ul v-if="facilityList.length > 0">
            <li>
                <h3>{{ facilityList[0].key }}</h3>
                <span style="color: #00e7fc;">{{ facilityList[0].value }}</span>
            </li>
            <li>
                <h3>{{ facilityList[1].key }}</h3>
                <span style="color: #ff580e;">{{ facilityList[1].value }}</span>
            </li>
            <li>
                <h3>{{ facilityList[2].key }}</h3>
                <span style="color: #00f294;">{{ facilityList[2].value }}</span>
            </li>
            <li>
                <h3>{{ facilityList[3].key }}</h3>
                <span style="color: #ffc30e;">{{ facilityList[3].value }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.Right4 {
    padding: 0 10px;

    ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 15px;
        padding-left: 0px;

        li {
            background: url('../../../assets/images/服务商.png') no-repeat;
            background-size: cover;
            width: 35%;
            padding-left: 40px;
            display: flex;
            align-items: center;
            height: 50px;

            h3 {
                color: #fff;
                font-size: 16px;
            }

            span {
                margin-left: auto;
                font-size: 25px;
                color: aquamarine;
            }
        }

        li:nth-of-type(2) {
            background: url('../../../assets/images/违规.png') no-repeat;
        }

        li:nth-of-type(3) {
            background: url('../../../assets/images/培训.png') no-repeat;
        }

        li:nth-of-type(4) {
            background: url('../../../assets/images/黑名单.png') no-repeat;
        }
    }
}
</style>
