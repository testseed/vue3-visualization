<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter()
const arrBtn = ref<any>([
    {
        num: 'one',
        url: '安全基础.png',
        path: 'datav/security'
    },
    {
        num: 'tow',
        url: '重大危险源.png',
        path: 'datav/major-hazard'
    },
    {
        num: 'three',
        url: '双重预防.png',
        path: 'datav/double-prevention-mechanism'
    },
    {
        num: 'four',
        url: '特殊作业.png',
        path: 'datav/double-prevention-mechanism'
    }
])
const getImgUrl = (url: string) => {
    return new URL(`../assets/images/${url}`, import.meta.url).href
}
const getItemClass = (num: string) => {
    return `btn-item-${num}`
}
const goItem = (path: string) => {
    router.push(path)
}
</script>

<template>
    <div class="pageHome">
        <video style="width: 100%;height: 100%;" muted loop autoplay>
            <source src="../assets/dv-index-main.mp4">
        </video>
        <div class="img-home">
            <div class="btn-group">
                <div @click="goItem(item.path)" class="btn-item" v-for="(item, index) in arrBtn" :key="index"
                    :class="[getItemClass(item.num)]">
                    <img :src="getImgUrl(item.url)" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.pageHome {
    width: 100%;
    height: 100%;
    position: relative;

    .img-home {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url('../assets/images/大屏首页.png') no-repeat;
        background-size: 100% 100%;

        .btn-group {
            width: 100%;
            height: 400px;
            position: absolute;
            bottom: 150px;

            .btn-item {
                position: absolute;
                width: 150px;
                height: 180px;
                cursor: pointer;
                transition: 0.3s all;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .btn-item-one {
                top: 143px;
                left: 298px;
            }

            .btn-item-tow {
                top: 194px;
                left: 689px;
            }

            .btn-item-three {
                top: 194px;
                right: 683px;
            }

            .btn-item-four {
                top: 143px;
                right: 298px;
            }
        }
    }
}

.btn-item:hover {
    transform: scale(1.3);
}
</style>
