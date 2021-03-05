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
        <el-dialog title="修改密码" v-model="dialogFormVisible" width="460px" destroy-on-close>
            <el-form :model="passwordForm" ref="passwordForm" status-icon :rules="passwordRules">
                <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPassword">
                    <el-input type="password" v-model="passwordForm.oldPassword" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
                    <el-input type="password" v-model="passwordForm.newPassword" show-password autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPassword">
                    <el-input type="password" v-model="passwordForm.checkPassword" show-password autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitPassForm('passwordForm')">更 改</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {CODE_OK} from '@/config';
import {updatePass} from '@/api/user';

export default {
    name: 'accountSafty',
    data() {
        var validateOldPass = (rule, value, callback)=> {
            if (value === '') {
                callback(new Error('请输入旧密码'));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback)=> {
            if (value === '') {
                callback(new Error('请输入新密码'));
            } else if (value.length < 6) {
                callback(new Error('密码不得少于6位'));
            } else {
                if (this.passwordForm.checkPassword !== '') {
                    this.$refs.passwordForm.validateField('checkPassword');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback)=> {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.passwordForm.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            tableData: [{
                type: '设置密码',
                status: '已设置',
                change: '修改密码'
            }, {
                type: '绑定手机',
                status: '未设置',
                change: '更换手机'
            }, {
                type: '绑定邮箱',
                status: '未设置',
                change: '更换邮箱'
            }],
            passwordForm: {
                oldPassword: '',
                newPassword: '',
                checkPassword: ''
            },
            dialogFormVisible: false,
            formLabelWidth: '100px',
            passwordRules: {
                newPassword: [
                    {
                        validator: validatePass,
                        trigger: 'blur'
                    }
                ],
                checkPassword: [
                    {
                        validator: validatePass2,
                        trigger: 'blur'
                    }
                ],
                oldPassword: [
                    {  
                        validator: validateOldPass,
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        handleClick(row) {
            if (row.type === '设置密码') {
                this.dialogFormVisible = true;
            }
        },
        submitPassForm(formName) {
            this.$refs[formName].validate(valid=> {
                if (valid) {
                    const param = {
                        user_id: this.$store.getters.userInfo.user_id,
                        oldPassword: this.passwordForm.oldPassword,
                        password: this.passwordForm.newPassword
                    };

                    updatePass(param).then(res=> {
                        if (res.code === CODE_OK) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false;
                        }
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
.account-safty {
    
}
</style>