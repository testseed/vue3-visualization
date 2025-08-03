<script setup lang="ts">

</script>

<template>
    <div class="mapLabel">
        <h1>黑龙江吉地油服股份有限公司</h1>
        <div class="main">
            <p style="padding: 10px 0;">名称：<span>丙烷储罐C液位</span></p>
            <p>采集数值:<span>333</span></p>
            <p>采集数值:<span>2930.64392089844</span></p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.mapLabel {
    position: fixed;
    background: url('../../../assets/images/弹窗背景.png') no-repeat;
    background-size: 100% 100%;
    top: 100px;
    right: calc(400px + 200px);
    width: 360px;
    height: 180px;

    h1 {
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        padding: 5px 20px;
    }

    .main {
        margin-top: 30px;
        margin-left: 30px;
        font-size: 15px;

        p {
            color: #fff;
            font-weight: bold;

            span {
                color: #ffff00;
                font-weight: bold;
            }
        }
    }
}
</style>
