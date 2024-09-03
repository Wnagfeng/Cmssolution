<template>
    <div class="main-menu-wrapper">
        <div class="logo">
            <img src="@/assets/img/logo.png" alt="" />
            <h1 class="title" v-show="isFold">后台管理解决方案</h1>
        </div>
        <el-menu :collapse="!isFold" :default-active="id + ''" text-color="#b7bdc3" active-text-color="#fff"
            background-color="#001529">
            <template v-for="item in usermenu" :key="item.id + ''">
                <!-- Check if item has children (submenu) -->
                <el-sub-menu v-if="item.children && item.children.length > 0" class="el-sub-menu" :index="item.id + ''">
                    <template #title>
                        <el-icon>
                            <!-- Dynamically replace the icon -->
                            <component :is="icons[item.icon.split('-icon-')[1]]"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <!-- Render submenu items -->
                    <template v-for="iten in item.children" :key="iten.id + ''">
                        <el-menu-item :index="iten.id + ''" class="el-menu-item" @click="topathClick(iten)">
                            <span>{{ iten.name }}</span>
                        </el-menu-item>
                    </template>
                </el-sub-menu>

                <!-- Single item without submenu -->
                <el-menu-item v-else :index="item.id + ''" class="el-menu-item" @click="topathClick(item)">
                    <template #title>{{ item.name }}</template>
                    <el-icon>
                        <!-- Dynamically replace the icon -->
                        <component :is="icons[item.icon.split('-icon-')[1]]"></component>
                    </el-icon>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import { defineProps } from 'vue'
import { computed } from '@vue/reactivity'
import { Monitor, Document } from '@element-plus/icons-vue'
import type { DefineComponent } from 'vue'
const props = defineProps({
    isFold: {
        type: Boolean,
        default: false
    }
})



const icons: { [key: string]: DefineComponent<{}, {}, {}, {}, {}, {}, {}, {}, string, {}, {}, {}, {}> } = {
    monitor: Monitor as DefineComponent,
    document: Document as DefineComponent,
    // 其他图标
};


const usermenu = [
    {
        id: 2,
        name: '常见业务',
        icon: 'el-icon-monitor', // Replace with the actual icon component
        children: [
            {
                id: 3,
                name: 'Tree',
                icon: 'Document-icon', // Replace with the actual icon component
                url: '/company'
            },
            {
                id: 4,
                name: '页面打印',
                icon: 'Document-icon', // Replace with the actual icon component
                url: '/employees'
            },
            {
                id: 5,
                name: 'Excel导入导出',
                icon: 'Document-icon', // Replace with the actual icon component
                url: '/departments'
            },
            {
                id: 6,
                name: '按钮权限控制',
                icon: 'Document-icon', // Replace with the actual icon component
                url: '/roles'
            },
            {
                id: 7,
                name: '动态表格',
                icon: 'Document-icon', // Replace with the actual icon component
                url: '/tabel'
            }

        ]
    },
    {
        id: 1,
        name: '公司简介',
        icon: 'el-icon-monitor', // Replace with the actual icon component
        url: "/companyProfile",
        isSingle: true,
        children: []
    },
]

function topathClick(item: any) {
    router.push(item.url)
}

const routers = useRoute()
// 根据当前的路由地址去全部的路由中匹配一下
const id = computed(() => {
    const path = routers.path
    for (const menu of usermenu) {
        for (const child of menu.children) {
            if (child.url === path) {
                return child.id
            }
        }
    }
    return null
})
</script>

<style scoped lang="less">
.el-menu {
    border: none;
}

.main-menu-wrapper {
    cursor: pointer;
    height: 100%;
    background-color: #001529;

    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */
    transition: width 0.3s ease;

    &::-webkit-scrollbar {
        display: none;
    }

    .logo {
        display: flex;
        height: 48px;
        padding: 12px 10px 8px 10px;
        align-items: center;

        img {
            width: 28px;
            height: 28px;
            margin-left: 8px;
            height: 100%;
        }

        .title {
            font-size: 16px;
            font-weight: 800;
            color: rgb(255, 183, 0);
            white-space: nowrap;
            margin-left: 12px;
        }
    }

    .el-sub-menu {
        background-color: #001529;

        .el-menu-item {
            color: #98a2ac;
            padding-left: 50px !important;
            background-color: #0c2135;
        }

        .el-menu-item :hover {
            color: #fff;
        }

        .el-menu-item.is-active {
            color: #fff;
            background-color: #0a60bd;
        }
    }
}
</style>