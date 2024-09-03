<template>
    <div class="box2">
        <h1>我是Box2我这里的数据无所谓谁看都可以</h1>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
    console.log("我是Box2我打印了，我去请求数据了！")
})
</script>

<style scoped lang="scss">
.box2 {
    box-shadow: 0 0 10px #ccc;
    padding: 15px;
}
</style>
