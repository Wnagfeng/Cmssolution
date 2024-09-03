<template>
    <div class="app-main">

            <RouterView></RouterView>
     
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.app-main {
    min-height: calc(100vh - 50px);
    padding: 20px;
    box-sizing: border-box;
    background-color: antiquewhite;

}
</style>
