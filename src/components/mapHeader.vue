<script setup lang="ts">
import { onMounted } from 'vue';
import { useFunction } from '@/hook/useFunction'
let { state, getApiAxios, updateTime } = useFunction()
onMounted(() => {
    getApiAxios()
    updateTime()
    setInterval(updateTime, 1000)
})
</script>

<template>
    <div class="mapHeader">
        <div class="header-left">
            <img src="../assets/images/duoyun.png" alt="">
            <div class="tep">{{ state.weather.temperature_float }}℃</div>
            <div class="weater-desc">
                <p>{{ state.weather.weather }}</p>
                <p>{{ state.weather.winddirection }}</p>
            </div>
            <div class="text-tiem">
                {{ state.weatherTime }}
            </div>
            <a href="baidu.com" class="nav-button">
                数字孪生
            </a>
        </div>
        <div class="header-center">
            安全基础
        </div>
        <div class="header-right">
            <div class="nav-button">
                <img src="../assets/images/返回.png" style="margin-right: 10px;">
                返回
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.mapHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background: url('../assets/images/顶部导航背景.png') no-repeat;
    background-size: 100% 100%;
    z-index: 999;
    padding: 0 20px;
    height: 80px;

    .header-left {
        flex: 1.5;
        display: flex;
        color: #fcfdfc;
        align-items: center;

        .nav-button {
            width: 173px;
            height: 46px;
            background: url('../assets/images/导航按钮.png') no-repeat;
            cursor: pointer;
            background-position: center;
            text-align: center;
            line-height: 46px;
            color: #fff;
            margin-left: auto;
            font-weight: bold;
        }

        img {
            width: 40px;
            height: 30px;
        }

        .tep {
            font-size: 30px;
            margin-left: 20px;
        }

        .weater-desc {
            margin-left: 20px;
        }

        .text-tiem {
            font-size: 18px;
            margin-left: 20px;
        }
    }

    .header-center {
        flex: 2;
        text-align: center;
        line-height: 80px;
        color: #ffa730;
        font-size: 40px;
        font-family: c-huakang;
    }

    .header-right {
        flex: 1.5;

        .nav-button {
            width: 173px;
            height: 46px;
            background: url('../assets/images/导航按钮.png') no-repeat;
            cursor: pointer;
            background-position: center;
            text-align: center;
            line-height: 46px;
            color: #fff;
            font-weight: bold;
            margin-right: auto;
        }
    }
}
</style>
