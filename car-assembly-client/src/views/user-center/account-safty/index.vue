<template>
    <div class="account-safty">
        <el-table :data="tableData" style="width: 100%" :show-header="false">
            <el-table-column prop="type" align="left"></el-table-column>
            <el-table-column prop="status" align="left"></el-table-column>
            <el-table-column align="center">
                <template #default="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.change}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'accountSafty',
    data() {
        return {
            tableData: [{
                type: '设置密码',
                status: '未设置',
                change: '修改密码'
            }, {
                type: '绑定手机',
                status: '未设置',
                change: '更换手机'
            }, {
                type: '绑定邮箱',
                status: '未设置',
                change: '更换邮箱'
            }]
        };
    }
};
</script>

<style lang="less" scoped>
.account-safty {
    
}
</style>