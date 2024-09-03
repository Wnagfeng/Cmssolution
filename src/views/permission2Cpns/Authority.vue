<template>
    <div class="authority">
        <slot v-if="permission.includes(props.authority)">

        </slot>
        <div v-else>
            <h1>你没有权限访问该组件</h1>
            <button @click="handelbtnclick">切换身份</button>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';

// 权限字段从后端获取这里进行一下模拟 这里的权限是后端给的 这里是动态获取的，不能写死
const permission = ref(["test"])
const props = defineProps({
    authority: {
        type: String
    }
})
const handelbtnclick = () => {
    permission.value = ["admin"]
}
</script>

<style scoped lang="scss">
h1 {
    font-size: 20px;
    color: red;
}
</style>
