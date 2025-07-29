<script setup lang="ts">
import { getCompanyAPI } from '@/api/safe'
import type { hazardType } from '@/type/safe'
import { ref } from 'vue';
import { onMounted } from 'vue';
import yuanqu from '@/assets/images/园区总面积.png'
import guishang from '@/assets/images/规上企业.png'
import touchan from '@/assets/images/投产面积.png'
import huagong from '@/assets/images/化工企业.png'
const companyList = ref<hazardType[]>([])
const getAPI = async () => {
    const res = await getCompanyAPI('0')
    companyList.value = res.data.data
}
const getImg = (key: string) => {
    if (key === '园区总面积') {
        return yuanqu
    } else if (key === '规上企业') {
        return guishang
    } else if (key === '投产面积') {
        return touchan
    } else if (key === '化工企业') {
        return huagong
    }
}
onMounted(() => [
    getAPI()
])
</script>

<template>
    <div class="Left3">
        <ul>
            <li v-for="item in companyList" :key="item.key">
                <img :src="getImg(item.key)" alt="">
                <div class="main">
                    <h5>{{ item.key }}</h5>
                    <p>{{ item.value }}</p>
                    <span>{{ item.key === '园区总面积' || item.key === '投产面积' ? '平方公里(m)' : '家' }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.Left3 {
    ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0px;

        li {
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;

            img {
                width: 65px;
                height: 65px;
                margin-right: 20px;
            }

            .main {

                h5 {
                    font-size: 15px;
                    color: #c5faff;
                }

                p {
                    font-size: 24px;
                    color: #c5faff;
                }

                span {
                    font-size: 15px;
                    color: #86a7a9;
                }
            }
        }
    }
}
</style>
