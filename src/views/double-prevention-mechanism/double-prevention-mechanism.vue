<script setup lang="ts">
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
            <borderBox title="运行效果分析">
                <Left1></Left1>
            </borderBox>
            <borderBox title="完成率统计">
                <Left2></Left2>
            </borderBox>
            <borderBox title="安全风险等级管控措施">
                <Left3></Left3>
            </borderBox>
            <borderBox title="安全风险分析对象/单位/事件统计">
                <Left4></Left4>
            </borderBox>
        </div>
        <div class="border-box-right">
            <borderBox title="整改临期提醒/超期提醒">
                <Right1></Right1>
            </borderBox>
            <borderBox title="事故隐患等级排查">
                <Right2></Right2>
            </borderBox>
            <borderBox title="隐患类型排查">
                <Right3></Right3>
            </borderBox>
            <borderBox title="隐患趋势">
                <Right4></Right4>
            </borderBox>
        </div>
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
        left: calc(400px + 40px);
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
