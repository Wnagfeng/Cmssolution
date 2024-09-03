<!--
日志：
这个导航组件针对单个导航也就是类似于公司简介这种单个页面没有子菜单的页面 做了特殊的处理
我使用了 el-menu-item 作为单个菜单的渲染 并且添加了特殊的类 因为 默认的子菜单是深色 如果作为一级菜单需要把他设置为浅色
  -->
<template>
    <div class="sidebar">
        <!-- <el-row class="tac">
            <el-col> -->
        <div class="MenuHeader">
            <div class="logo">
                <img src="../../../assets/img/logo.png" alt="" />
            </div>
            <h5 class="menuHeaderTitle" v-if="!isFold">Coder Joon</h5>
        </div>
        <!-- 将 :default-active 绑定到当前路由路径 -->
        <el-menu :default-active="currentRoutePath" :collapse="isFold" class="el-menu-vertical-demo" @open="handleOpen"
            @close="handleClose">
            <template v-for="menu in menus">
                <!-- 如果菜单有子项，使用 el-sub-menu 渲染 -->
                <el-sub-menu v-if="menu.items && menu.items.length" :key="menu.index" :index="menu.index">
                    <template #title>
                        <el-icon>
                            <component :is="menu.icon" />
                        </el-icon>
                        <span>{{ menu.title }}</span>
                    </template>
                    <el-menu-item v-for="item in menu.items" :key="item.index" :index="item.path"
                        @click="navigateTo(item.path)">
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.title }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <!-- 如果没有子项，使用 el-menu-item 渲染 -->
                <el-menu-item v-else :key="menu?.index" :index="menu.path" @click="navigateTo(menu.path)"
                    class="no-submenu-item">
                    <el-icon>
                        <component :is="menu.icon" />
                    </el-icon>
                    <span>{{ menu.title }}</span>
                </el-menu-item>
            </template>
        </el-menu>
        <!-- </el-col>
        </el-row> -->
    </div>
</template>


<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    OfficeBuilding
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const props = defineProps({
    isFold: {
        type: Boolean,
        default: false
    }
})
// 当前路由路径
const currentRoutePath = ref(route.path)

// 监听路由变化，更新当前路径
watchEffect(() => {
    currentRoutePath.value = route.path
})

const handleOpen = (key: string, keyPath: string[]) => {
    console.log("点击了打开")
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log("点击了关闭")
    console.log(key, keyPath)
}

const navigateTo = (path: string) => {
    router.push(path)
}

const menus = [
    {
        index: '2',
        title: '系统管理',
        icon: IconMenu,
        path: "/",
        items: [
            { index: '2-1', title: '公司管理', path: '/company', icon: OfficeBuilding },
            { index: '2-2', title: '员工管理', path: '/employees', icon: Document },
            { index: '2-3', title: '部门管理', path: '/departments', icon: Location },
            { index: '2-4', title: '角色管理', path: '/roles', icon: Setting },
        ]
    },
    {
        index: '3',
        title: '公司简介',
        icon: IconMenu,
        path: '/companyProfile', // 添加 path 属性，用于没有子菜单的情况下导航
        items: [] // 没有子菜单
    }
]
</script>




<style scoped lang="less">
@import '../../../assets/style/variables.less';

.sidebar {

    width: 100%;
    height: 100%;
    background-color: @menuBg !important;
    // height: calc(100% - @headerHeight);

    .MenuHeader {
        width: 100% !important;
        transition: all 0.3s ease;
        height: @headerHeight;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;



        .logo {
            width: 40px;
            height: 40px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .menuHeaderTitle {
            margin-left: 10px;
            color: yellow;
        }
    }


    // 父级菜单的文字颜色
    :deep(.el-sub-menu__title) {
        color: @menuTextColcor !important;
        font-size: 12px;

        // 父级菜单的悬浮样式
        &:hover {
            background-color: @menuTitleHoverBg !important; // 使用变量定义悬浮背景颜色
            color: @menuTitleHoverText !important; // 使用变量定义悬浮文字颜色
        }
    }

    // 整个菜单
    :deep(.el-menu) {
        height: 100%;
        background-color: @menuBg !important;
        border: none !important;
    }

    // 整个子菜单
    :deep(.el-menu-item) {
        font-size: 12px;
        color: @menuTextColcor !important;
        background-color: @menuItemBg !important;
    }

    // Hover子菜单背景颜色
    // Hover子菜单背景颜色
    :deep(.el-menu-item:hover) {
        background-color: @menuHover !important; // 使用变量定义悬浮背景颜色
        color: @menuHoverText !important; // 使用变量定义悬浮文字颜色
    }


    //子菜单选中后的样式
    .el-menu--inline .el-menu-item.is-active {
        color: @menuItemTextActive !important;
        // background-color: @menuItemActiveBg !important;
    }

    // 没有子菜单的选项定义的样式（让他的颜色和父级颜色一样）
    .no-submenu-item {
        background-color: @menuBg !important;
    }

    // 没有子菜单选中后的样式
    .no-submenu-item.is-active {
        color: @menuItemTextActive !important;
        // background-color: @menuItemActiveBg !important;
    }


    /* 自定义隐藏展开箭头的样式 */
    :deep(.el-sub-menu.no-arrow > .el-sub-menu__title > .el-sub-menu__icon-arrow) {
        display: none;
    }


}
</style>