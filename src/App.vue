<script setup lang="ts">
import VScaleScreen from 'v-scale-screen'
</script>

<template>
  <VScaleScreen width="1920" height="1080" :delay="100">
    <router-view></router-view>
    <mapApp></mapApp>
  </VScaleScreen>
</template>

<style scoped lang="scss"></style>
