<script setup lang="ts">
import { getMatterAPI } from '@/api/safe'
import { computed } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
type matterType = {
    name: string,
    value: number
}
const matterList = ref<matterType[]>([])
const getAPI = async () => {
    const res = await getMatterAPI('0')
    matterList.value = res.data.data
}
const allValue = computed(() => {
    return matterList.value[0].value + matterList.value[1].value
})
onMounted(() => {
    getAPI()
})
</script>

<template>
    <div class="Right2">
        <div class="matter" v-for="item in matterList" :key="item.value">
            <h2>{{ item.name }}</h2>
            <div class="line" :style="`width: calc(${item.value / allValue} * 100%);`"></div>
            <div class="value">
                <span>数量</span>
                <p>{{ item.value }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.Right2 {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    .matter {
        flex: 1;

        .line {
            background-color: #aaf8ff;
            height: 2px;
            margin-top: 6px;
        }

        h2 {
            font-size: 12px;
            color: #fff;
        }

        .value {
            display: flex;
            align-items: center;

            span {
                font-size: 12px;
                color: #bbedf2;
            }

            p {
                color: #feb613;
                font-size: 17px;
                margin-left: 10px;
                font-weight: bold;
            }
        }
    }
}
</style>
