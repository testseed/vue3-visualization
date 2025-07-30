<script setup lang="ts">
import { ref } from 'vue'
import Left1 from './components/Left1.vue'
import Left2 from './components/Left2.vue'
import Left3 from './components/Left3.vue'
import Right1 from './components/Right1.vue'
import Right2 from './components/Right2.vue'
import Right3 from './components/Right3.vue'
import Right4 from './components/Right4.vue'
import Menu from './components/Menu.vue'
</script>

<template>
    <div class="security-management">
        <div class="border-box-left">
            <borderBox title="两重点一重大">
                <Left1></Left1>
            </borderBox>
            <borderBox title="安全三同时报告">
                <Left2></Left2>
            </borderBox>
            <borderBox title="面积规模">
                <Left3></Left3>
            </borderBox>
        </div>
        <div class="border-box-right">
            <borderBox title="轮班值守">
                <Right1></Right1>
            </borderBox>
            <borderBox title="禁限空目录">
                <Right2></Right2>
            </borderBox>
            <borderBox title="装修开停车/装置大检修">
                <Right3></Right3>
            </borderBox>
            <borderBox title="第三方单位管理">
                <Right4></Right4>
            </borderBox>
        </div>
        <div class="count-box">
            <span class="font-ssb">装置最大维修程度</span>
            <span class="text-whint">27</span>
        </div>
        <Menu></Menu>
    </div>
</template>

<style scoped lang="scss">
.security-management {
    position: relative;
    top: 80px;
    left: 0;
    width: 100%;
    z-index: 999;

    .border-box-right {
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 20px;
    }

    .border-box-left {
        position: absolute;
        top: 0;
        left: 0;
        margin-left: 20px;
    }

    .count-box {
        padding: 14px 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        margin-top: 15px;
        left: calc(450px + 14px);
        background: url('../../assets/images/总数统计背景.png') no-repeat;
        background-position: center;
        background-size: 100% 100%;

        .font-ssb {
            font-size: 14px;
            color: #a2f4fe;
        }

        .text-whint {
            --tw-text-opacity: 1;
            color: #fff;
            font-size: 25px;
            margin-left: 20px;
        }
    }
}
</style>