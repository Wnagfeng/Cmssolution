<template>
    <div class="navbar">
        <div class="left">
            <!-- Toggle Button -->
            <div class="buton" @click="HandelBtnclick">
                <el-icon class="icon" :size="30" v-if="isFold">
                    <Expand />
                </el-icon>
                <el-icon class="icon" :size="30" v-else>
                    <Fold />
                </el-icon>
            </div>
            <!-- Breadcrumb -->
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="right"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import Breadcrumb from '../../components/Breadcrumb/index.vue'
const isFold = ref(false)
const emits = defineEmits(['changeFold'])
const HandelBtnclick = () => {
    isFold.value = !isFold.value
    emits('changeFold', isFold.value)
}


</script>

<style scoped lang="less">
.navbar {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;

    .left {
        width: 50%;
        height: 100%;
        display: flex;

        box-sizing: border-box;
        align-items: center;

        .icon {
            width: 20px;
            height: 20px;
            font-size: 20px;
        }

        .buton {
            width: 20px;
            height: 20px;
            font-size: 20px;
            margin-right: 20px;
        }
    }

    .right {
        width: 50%;
        height: 100%;
        background-color: rgb(107, 116, 124);
    }
}
</style>