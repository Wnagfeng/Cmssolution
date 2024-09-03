<template>
    <div class="bos">
        <button class="button" @click="printTable()">打印表格</button>
        <el-table :data="tableData" style="width: 100%" id="printable-table">
            <el-table-column prop="date" label="Date" width="150" />
            <el-table-column label="Delivery Info">
                <el-table-column prop="name" label="Name" width="120" />
                <el-table-column label="Address Info">
                    <el-table-column prop="state" label="State" width="120" />
                    <el-table-column prop="city" label="City" width="120" />
                    <el-table-column prop="address" label="Address" />
                    <el-table-column prop="zip" label="Zip" width="120" />
                </el-table-column>
            </el-table-column>
        </el-table>

    </div>
</template>

<script lang="ts" setup>
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    }
]

function printTable() {
    const printWindow = window.open('', '', 'height=600,width=800');
    const printableContent = document.getElementById('printable-table')!.outerHTML;

    printWindow!.document.write('<html><head><title>CoderJoon</title>');
    printWindow!.document.write('<style>');
    printWindow!.document.write(`
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
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
    `);
    printWindow!.document.write('</style></head><body>');
    printWindow!.document.write(printableContent);
    printWindow!.document.write('</body></html>');
    printWindow!.document.close();
    printWindow!.focus();
    printWindow!.print();
    printWindow!.close();
}
</script>

<style scoped lang="scss">
.button {
    padding: 10px 20px;
    margin-bottom: 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
}
</style>
