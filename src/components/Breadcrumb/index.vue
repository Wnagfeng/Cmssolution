<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import pathToRegexp from 'path-to-regexp'

// 类型定义
interface BreadcrumbMeta {
  title: string
  breadcrumb?: boolean
}

interface BreadcrumbItem {
  path: string
  meta: BreadcrumbMeta
  redirect?: string
}

const route = useRoute()
const router = useRouter()

// 面包屑数据
const levelList = ref<BreadcrumbItem[]>([])

// 获取面包屑数据
const getBreadcrumb = () => {
  // 过滤掉没有 meta.title 或者 breadcrumb 设置为 false 的路由
  let matched = route.matched.filter(item => (item.meta as unknown as BreadcrumbMeta)?.title);

  levelList.value = matched.map(item => ({
    path: item.path,
    meta: item.meta as unknown as BreadcrumbMeta, // 只需要进行一次类型断言
    redirect: typeof item.redirect === 'string' ? item.redirect : undefined, // 安全地将 redirect 转换为 string
  }));
};



// 处理路径编译
const pathCompile = (path: string) => {
  // 解决路径编译问题
  const { params } = route
  const toPath = pathToRegexp.compile(path)
  return toPath(params)
}

// 处理链接点击
const handleLink = (item: BreadcrumbItem) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))

}

// 监听路由变化
watch(() => route.path, getBreadcrumb)

// 组件挂载时初始化面包屑
onMounted(() => {
  getBreadcrumb()
})
</script>



<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
