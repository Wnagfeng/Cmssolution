<template>
    <div class="department-management">
        <h1>Excel Import and Export</h1>
        <input type="file" @change="importExcel" accept=".xlsx, .xls" />
        <button class="button" @click="exportExcel">Export to Excel</button>

        <table v-if="tableData.length" class="data-table">
            <thead>
                <tr>
                    <th v-for="(key, index) in tableHeaders" :key="index">{{ key }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in tableData" :key="index">
                    <td v-for="(key, keyIndex) in tableHeaders" :key="keyIndex">{{ row[key] }}</td>
                </tr>
            </tbody>
        </table>
        <p v-else>No data imported yet.</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';

const tableData = ref([]);
const tableHeaders = ref([]);

function importExcel(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        if (jsonData.length > 0) {
            tableHeaders.value = jsonData[0];  // 第一行作为表头
            tableData.value = jsonData.slice(1).map(row => {
                const rowData = {};
                tableHeaders.value.forEach((header, index) => {
                    rowData[header] = row[index];
                });
                return rowData;
            });
        }

        console.log('Imported Data:', tableData.value);
    };
    reader.readAsArrayBuffer(file);
}

function exportExcel() {
    const data = [
        { Department: 'HR', Employees: 10 },
        { Department: 'Finance', Employees: 8 },
        { Department: 'Development', Employees: 20 },
    ];

    // 去重逻辑
    const uniqueData = data.filter(
        (item, index, self) =>
            index === self.findIndex((t) => t.Department === item.Department && t.Employees === item.Employees)
    );

    const worksheet = XLSX.utils.json_to_sheet(uniqueData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Departments');

    XLSX.writeFile(workbook, 'Departments.xlsx');
    console.log('Exported Data:', uniqueData);
}
</script>

<style scoped lang="scss">
.button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
}

.data-table {
    margin-top: 20px;
    width: 100%;
    border-collapse: collapse;

    th,
    td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }
}
</style>
