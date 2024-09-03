<template>
    <div class="box1">
        <h1>我是Box1我这里有很多铭感的数据我不希望别人看到</h1>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
    console.log("我是Box1我打印了，我去请求机密数据了！")
})
</script>

<style scoped lang="scss">
.box1 {
    box-shadow: 0 0 10px #ccc;
    padding: 15px;
}
</style>
