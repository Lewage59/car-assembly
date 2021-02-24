<template>
    <div class="user-info" v-loading="loading">
        <el-form 
            label-position="right" 
            label-width="80px" 
            :model="formData" 
            :rules="rulesForm" 
            ref="userForm" 
            class="userForm" 
            :disabled="!isEdit">
            <el-form-item label="头像">
                <el-avatar size="medium" icon="el-icon-s-custom" class="avatar"></el-avatar>
            </el-form-item>
            <el-form-item label="用户ID">
                <el-input v-model="formData.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="formData.username" name="username" type="text"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="formData.sex" placeholder="请选择">
                    <el-option
                        v-for="item in sexOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期">
                <el-date-picker
                    v-model="birthdayDate"
                    type="date"
                    placeholder="选择日期"
                    format="YYYY 年 MM 月 DD 日">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <template v-if="isEdit">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="changeFormStatus">取消</el-button>
        </template>
        <template v-else>
            <el-button type="primary" @click="changeFormStatus">修改资料</el-button>
        </template>
    </div>
</template>

<script>
import {updateUserInfo} from '@/api/user';

export default {
    name: 'userInfo',
    data() {
        const validateUsername = (rule, value, callback)=> {
            if (value.length < 1) {
                callback(new Error('用户名不允许为空'));
            } else {
                callback();
            }
        };

        return {
            formData: {
                username: '',
                birthday: ''
            },
            isEdit: false,
            loading: false,
            rulesForm: {
                username: [{
                    required: true,
                    trigger: 'change',
                    validator: validateUsername
                }]
            },
            sexOptions: [{
                value: 0,
                label: '保密'
            }, {
                value: 1,
                label: '男'
            }, {
                value: 2,
                label: '女'
            }],
            birthdayDate: ''
        };
    },
    created() {
        this.initData();
    },
    methods: {
        initData() {
            const userInfo = this.$store.getters.userInfo;
            
            this.birthdayDate = userInfo.birthday && new Date(+userInfo.birthday);
            Object.assign(this.formData, userInfo);
        },
        changeFormStatus() {
            this.isEdit = !this.isEdit;
        },
        onSubmit() {
            const birthday = this.birthdayDate && this.birthdayDate.getTime();
            const params = {
                user_id: this.formData.user_id,
                username: this.formData.username,
                sex: this.formData.sex,
                birthday
            };

            this.$refs.userForm.validate(valid=> {
                if (valid) {
                    this.loading = true;
                    updateUserInfo(params).then(()=> {
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        });
                        this.isEdit = false;
                        this.loading = false;
                    }).catch(()=> {
                        this.loading = false;
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.user-info {
    .userForm {
        width: 50%;
    }
    .avatar {
        vertical-align: middle;
    }
}
</style>