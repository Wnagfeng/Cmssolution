<template>
    <div>
        <!-- 复选框列表 -->
        <el-checkbox-group v-model="selectedColumns">
            <el-checkbox v-for="col in columns" :label="col.prop" :key="col.prop">
                {{ col.label }}
            </el-checkbox>
        </el-checkbox-group>

        <!-- 动态表格 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="col in visibleColumns" :key="col.prop" :prop="col.prop" :label="col.label"
                :width="col.width">
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElTable, ElTableColumn, ElCheckboxGroup, ElCheckbox } from 'element-plus';
import 'element-plus/dist/index.css';

// 表格数据
const tableData = ref([
    { date: '2024-09-01', name: 'Tom', address: 'No. 1, East Road' },
    { date: '2024-09-02', name: 'Jerry', address: 'No. 2, West Road' },
    { date: '2024-09-03', name: 'Jack', address: 'No. 3, South Road' },
]);

// 所有列配置
const columns = ref([
    { prop: 'date', label: 'Date', width: '180' },
    { prop: 'name', label: 'Name', width: '180' },
    { prop: 'address', label: 'Address', width: '180' },
]);

// 默认选中的列
const selectedColumns = ref(columns.value.map(col => col.prop));

// 动态计算显示的列
const visibleColumns = computed(() => {
    return columns.value.filter(col => selectedColumns.value.includes(col.prop));
});
</script>

<style scoped>
/* 添加一些样式 */
.el-checkbox-group {
    margin-bottom: 20px;
}
</style>