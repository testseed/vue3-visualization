<script setup lang="ts">
import Menu from './components/Menu.vue'
import Left1 from './components/Left1.vue'
import Left2 from './components/Left2.vue'
</script>

<template>
    <div class="major-hazard">
        <div class="border-box-left">
            <borderBox title="风险预警">

            </borderBox>
            <borderBox title="企业分类监督">
                <Left2></Left2>
            </borderBox>
            <borderBox title="安全包保责任">
            </borderBox>
            <borderBox title="评价/评估报告及隐患">
            </borderBox>
        </div>
        <div class="border-box-right">
            <borderBox title="轮班值守">
            </borderBox>
            <borderBox title="禁限空目录">
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
