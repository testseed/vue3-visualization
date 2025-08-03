<script setup lang="ts">
const query = defineProps<{
    title: string
}>()
</script>

<template>
    <div class="borderbox">
        <div class="header">
            {{ query.title }}
        </div>
        <div class="span">
            查看
        </div>
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.borderbox {
    display: flex;
    flex-direction: column;
    background-image: url('../assets/border-box-1/border-bottom.png');
    background-position: bottom;
    background-repeat: no-repeat;
    background-color: rgb(0, 42, 64, .4);
    min-height: 200px;
    width: 400px;
    margin-top: 20px;
    position: relative;

    .span {
        margin-left: auto;
        font-size: 16px;
        color: #38bbd6;
        border-bottom: 1px solid #35dbff;
        width: 40px;
        text-align: center;
        cursor: pointer;
    }

    .header {
        height: 36px;
        line-height: 36px;
        background: url('../assets/border-box-1/border-title.png') no-repeat;
        background-position: center;
        color: #fff;
        font-size: 16px;
        padding-left: 24px;
        background-size: 100% 100%;
    }
}
</style>
