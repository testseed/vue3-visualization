<script setup lang="ts">
import { getAgencyListAPI } from '@/api/hazard'
import type { agencyType } from '@/type/hazard'
import { ref, computed, onMounted, onUnmounted } from 'vue';
const rawData = ref<agencyType[]>([
    { num: "刘兵(18246672222)", title: "生产安全-总指挥" },
    { num: "陈大勇(18104633888)", title: "生产安全-通讯电力保障组" },
    { num: "张东(18745923311)", title: "生产安全-通讯电力保障组" },
    { num: "张凤娟(15145985577)", title: "生产安全-医疗救护组" },
    { num: "李思尧(15246010924)", title: "生产安全-医疗救护组" },
    { num: "吴子峰(13069649666)", title: "生产安全-安全警戒疏散组" },
    { num: "刘晓溪(18645941463)", title: "生产安全-安全警戒疏散组" },
    { num: "王 阳(13349472276)", title: "生产安全-安全警戒疏散组" },
    { num: "刘兵(18246672222)", title: "生产安全-总指挥" },
    { num: "陈大勇(18104633888)", title: "生产安全-通讯电力保障组" },
    { num: "张东(18745923311)", title: "生产安全-通讯电力保障组" },
    { num: "张凤娟(15145985577)", title: "生产安全-医疗救护组" },
    { num: "李思尧(15246010924)", title: "生产安全-医疗救护组" },
    { num: "吴子峰(13069649666)", title: "生产安全-安全警戒疏散组" },
    { num: "刘晓溪(18645941463)", title: "生产安全-安全警戒疏散组" },
    { num: "王 阳(13349472276)", title: "生产安全-安全警戒疏散组" }
])
const getAPI = async () => {
    const res = await getAgencyListAPI('0')
    // console.log(res);
}

// 控制滚动的偏移量
const offset = ref(0);
// 当前显示起始索引
const currentIndex = ref(0);
// 容器引用
const container = ref();
// 每个项目的高度
const itemHeight = ref(0); // 默认值，会在mounted中更新

// 计算当前可见的数据项（多渲染几个防止滚动时出现空白）
const visibleItems = computed(() => {
    const extendedData = [...rawData.value, ...rawData.value.slice(0, 5)]; // 循环列表
    return extendedData.slice(currentIndex.value, currentIndex.value + 10);
});

// 自动滚动逻辑
let timer = 1;
const startScroll = () => {
    timer = setInterval(() => {
        // 每次移动1px
        offset.value -= itemHeight.value;
        // 当滚动完一个项目高度时
        if (Math.abs(offset.value) >= itemHeight.value) {
            currentIndex.value = (currentIndex.value + 1) % rawData.value.length;
            offset.value = 0;
        }
    }, 2000); // 调整这个值可以改变滚动速度
};

// 初始化项目高度
const initItemHeight = () => {
    if (container.value && container.value.firstChild) {
        const firstItem = container.value.querySelector('.scroll-item');
        if (firstItem) {
            itemHeight.value = firstItem.offsetHeight;
        }
    }
};

onMounted(() => {
    // getAPI()
    initItemHeight();
    startScroll();
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<template>
    <div class="scroll-container" ref="container">
        <div class="scroll-content" :style="{ transform: `translateY(${offset}px)` }">
            <div v-if="rawData.length > 0" v-for="(item, index) in visibleItems" :key="index" class="scroll-item">
                <img src="../../../assets/images/矩形 1638.png" alt="">
                <span class="title">{{ item.title }}</span>
                <span class="divider">——</span>
                <span class="num">{{ item.num }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.scroll-container {
    height: 150px;
    /* 显示5个项目的高度 */
    overflow: hidden;
    position: relative;
    border: 1px solid #eee;
    padding: 10px 0;
}

.scroll-content {
    transition: transform 0.3s ease-out;
}

.scroll-item {
    display: flex;
    align-items: center;
    // padding: 0 15px;
    border: 5px solid rgb(53, 113, 117, 0.6);
    white-space: nowrap;
    overflow: hidden;
    color: #fff;
    text-overflow: ellipsis;
    font-size: 14px;
    transition: all 0.2s;

    img {
        padding: 0 10px;
    }

    .divider {
        margin: 0 5px;
    }
}
</style>