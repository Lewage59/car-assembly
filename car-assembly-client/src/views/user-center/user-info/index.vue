<template>
    <div class="user-info">
        <el-form label-position="right" label-width="80px" :model="formData">
            <el-form-item label="名称">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-input v-model="formData.region"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input v-model="formData.type"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <template v-if="isEdit">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="changeFormStatus">取消</el-button>
            </template>
            <template v-else>
                <el-button type="primary" @click="changeFormStatus">修改资料</el-button>
            </template>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'userInfo',
    data() {
        return {
            formData: {
                name: '',
                region: '',
                type: ''
            },
            isEdit: false
        };
    },
    methods: {
        changeFormStatus() {
            this.isEdit = !this.isEdit;
        }
    }
};
</script>

<style lang="less" scoped>
.user-info {

}
</style>