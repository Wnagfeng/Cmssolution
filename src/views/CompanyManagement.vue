<template>
    <div class="app-container">
        <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom: 30px;" />

        <el-tree ref="tree2" :data="data2" :props="defaultProps" :filter-node-method="filterNode" class="filter-tree"
            default-expand-all />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
// import type { TreeNode } from 'element-plus/es/components/tree/src/tree.type';
import type { ElTree } from 'element-plus';

// Define the type for your data
interface TreeNodeData {
    id: number;
    label: string;
    children?: TreeNodeData[];
}

// Define the filter function type
const filterNode = (value: string, data: TreeNodeData) => {
    if (!value) return true;
    return data.label.includes(value);
};

// State
const filterText = ref<string>('');
const tree2 = ref<InstanceType<typeof ElTree> | null>(null);

// Data
const data2: TreeNodeData[] = [
    {
        id: 1,
        label: 'Level one 1',
        children: [
            {
                id: 4,
                label: 'Level two 1-1',
                children: [
                    { id: 9, label: 'Level three 1-1-1' },
                    { id: 10, label: 'Level three 1-1-2' }
                ]
            }
        ]
    },
    {
        id: 2,
        label: 'Level one 2',
        children: [
            { id: 5, label: 'Level two 2-1' },
            { id: 6, label: 'Level two 2-2' }
        ]
    },
    {
        id: 3,
        label: 'Level one 3',
        children: [
            { id: 7, label: 'Level two 3-1' },
            { id: 8, label: 'Level two 3-2' }
        ]
    }
];

const defaultProps = {
    children: 'children',
    label: 'label'
};

// Watch filterText to update the tree filter
watch(filterText, (val) => {
    if (tree2.value) {
        tree2.value.filter(val);
    }
});
</script>

<style scoped>
.app-container {
    /* Add your styles here */
}
</style>