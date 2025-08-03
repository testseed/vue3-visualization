<script setup lang="ts">
import { getReminderAPI } from '@/api/prevention'
import { onMounted } from 'vue';
const getAPI = async () => {
    const res = await getReminderAPI('0')
    // console.log(res)
}
onMounted(() => {
    getAPI()
})
</script>

<template>
    <div class="Right1"></div>
</template>

<style scoped lang="scss"></style>
