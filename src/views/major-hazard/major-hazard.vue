<script setup lang="ts">
import Menu from './components/Menu.vue'
import Left1 from './components/Left1.vue'
import Left2 from './components/Left2.vue'
import Left3 from './components/Left3.vue'
import Left4 from './components/Left4.vue'
import Right1 from './components/Right1.vue'
import Right2 from './components/Right2.vue'
import Right3 from './components/Right3.vue'
import Right4 from './components/Right4.vue'
</script>

<template>
    <div class="major-hazard">
        <div class="border-box-left">
            <borderBox title="风险预警">
                <Left1></Left1>
            </borderBox>
            <borderBox title="企业分类监督">
                <Left2></Left2>
            </borderBox>
            <borderBox title="安全包保责任">
                <Left3></Left3>
            </borderBox>
            <borderBox title="评价/评估报告及隐患">
                <Left4></Left4>
            </borderBox>
        </div>
        <div class="border-box-right">
            <borderBox title="检测报警">
                <Right1></Right1>
            </borderBox>
            <borderBox title="问题隐患三录入">
                <Right2></Right2>
            </borderBox>
            <borderBox title="应急机构人员">
                <Right3></Right3>
            </borderBox>
            <borderBox title="设备在线状态">
            </borderBox>
        </div>
        <Menu></Menu>
    </div>
</template>

<style scoped lang="scss">
.major-hazard {
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
}
</style>
