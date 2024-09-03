<template>
  <div class="MainWrapper">
    <el-container class="container">
      <el-aside class="aside" :width="flage ? '60px' : '200px'">
        <mainmenu :isFold="!flage"> </mainmenu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <mainheader @changeFold="handleFold"></mainheader>
        </el-header>
        <el-main class="main">
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import mainmenu from './cpns/mainmenu.vue'
import mainheader from './cpns/mainheader.vue'
import { ref, watch } from 'vue'
import { useRouter, RouterView } from 'vue-router'
const router = useRouter()
const key = ref(router.currentRoute.value.fullPath)
watch(() => router.currentRoute.value.fullPath, (newPath) => {
  key.value = newPath
})
const flage = ref(false)
function handleFold(flageFlod: boolean) {
  flage.value = flageFlod
}
</script>
<style scoped lang="less">
.MainWrapper {
  height: 100%;

  .container {
    height: 100%;

    .aside {
      transition: all 0.3s ease;
    }

    .header {
      height: 50px;
    }
  }

  .aside {
    background-color: aqua;
  }

  .main {
    overflow-y: auto;
    background-color: #f0f2f5;
  }
}
</style>