<template>
    <div class="login-container">
        <div class="inner-wrapper">
            <div class="title-container" @click="toLink">
                <img src="@/assets/logo/logo.png" class="logo-image">
                <h3 class="title">汽车组装演示系统</h3>
            </div>
            <el-form
                ref="loginForm" 
                v-if="isLogin" 
                :model="loginForm" 
                :rules="loginRules" 
                class="login-form" 
                label-position="left">
                <div class="content-main">
                    <h4 class="form-title">账密登陆</h4>
                    <el-form-item prop="username">
                        <el-input
                            ref="username"
                            v-model="loginForm.username"
                            placeholder="用户名"
                            name="username"
                            prefix-icon="el-icon-s-custom"
                            type="text"
                            tabindex="1"
                        />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            ref="password"
                            v-model="loginForm.password"
                            type="password"
                            show-password
                            placeholder="密码"
                            prefix-icon="el-icon-lock"
                            name="password"
                            tabindex="2"
                            @keyup.enter="handleLogin"
                        />
                    </el-form-item>
                    <el-button 
                        :loading="loading" 
                        type="primary" 
                        style="width:100%;margin-bottom:30px;" 
                        @click.prevent="handleLogin">登陆</el-button>
                </div>
                <div class="href-group">
                    <div class="href-item" @click="switchForm(false)">立即注册</div>
                </div>
            </el-form>
            <el-form 
                ref="registerForm" 
                v-else 
                :model="registerForm" 
                :rules="loginRules" 
                class="login-form" 
                auto-complete="on" 
                label-position="left">
                <div class="content-main">
                    <h4 class="form-title">账密注册</h4>
                    <el-form-item prop="username">
                        <el-input
                            ref="username"
                            v-model="registerForm.username"
                            placeholder="用户名"
                            name="username"
                            prefix-icon="el-icon-s-custom"
                            type="text"
                            tabindex="1"
                        />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            ref="password"
                            v-model="registerForm.password"
                            type="password"
                            show-password
                            placeholder="密码"
                            prefix-icon="el-icon-lock"
                            name="password"
                            tabindex="2"
                            @keyup.enter="handleRegister"
                        />
                    </el-form-item>
                    <el-button 
                        :loading="loading" 
                        type="primary" 
                        style="width:100%;margin-bottom:30px;" 
                        @click.prevent="handleRegister">注册</el-button>
                </div>
                <div class="href-group">
                    <div class="href-item" @click="switchForm(true)">立即登陆</div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import {createUser} from '@/api/user';

export default {
    name: 'Login',
    data() {
        const validatePassword = (rule, value, callback)=> {
            if (value.length < 6) {
                callback(new Error('密码不得少于6位'));
            } else {
                callback();
            }
        };
        const validateUsername = (rule, value, callback)=> {
            if (value.length < 1) {
                callback(new Error('用户名不允许为空'));
            } else {
                callback();
            }
        };

        return {
            loginForm: {
                username: '',
                password: ''
            },
            registerForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{
                    required: true,
                    trigger: 'change',
                    validator: validateUsername
                }],
                password: [{
                    required: true,
                    trigger: 'blur',
                    validator: validatePassword
                }]
            },
            loading: false,
            redirect: undefined,
            isLogin: true
        };
    },
    watch: {
        $route: {
            handler: function(route) {
                if (route.query) {
                    this.redirect = route.query.redirect;
                    this.isLogin = !route.query.register;
                }
            },
            immediate: true
        }
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid=> {
                if (valid) {
                    this.loading = true;
                    this.$store.dispatch('user/login', this.loginForm).then(()=> {
                        this.$router.push({path: this.redirect || '/'});
                        this.loading = false;
                    }).catch(()=> {
                        this.loading = false;
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleRegister() {
            this.$refs.registerForm.validate(valid=> {
                if (valid) {
                    this.loading = true;
                    createUser(this.registerForm).then(()=> {
                        this.$message({
                            message: '注册成功',
                            type: 'success'
                        });
                        this.isLogin = true;
                        this.loading = false;
                    }).catch(()=> {
                        this.loading = false;
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        switchForm(value) {
            this.isLogin = value;
        },
        toLink() {
            this.$router.push({
                path: '/'
            });
        }
        
    }
};
</script>

<style lang="less">
@bg:#2d3a4b;
@dark_gray:#889aa4;
@cursor: #fff;

.login-container {
    position: relative;
    height: 100vh;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
    background-color: #030303;
    background-image: url('~@/assets/images/login-bg.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    
    .inner-wrapper {
        position: relative;
        top: 50%;
        width: 480px;
        max-width: 100%;
        margin: 0 auto;
        transform: translateY(-50%);
    }

    .title-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 0;
        background-color: #fff;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        cursor: pointer;

        .logo-image {
            display: inline-block;
            height: 36px;
            margin: 6px 8px;
        }

        .title {
            display: inline-block;
            font-size: 18px;
            text-align: center;
            font-weight: bold;
        }
    }

    .login-form {
        overflow: hidden;
        .content-main {
            padding: 15px 56px;
            box-shadow: 0 2px 19px 0 rgba(0, 0, 0, 0.01);
            border: solid 1px rgba(232, 232, 232, 0.56);
            background-color: @cursor;
        }
        .form-title {
            margin-top: 10px;
            margin-bottom: 30px;
            color: #222;
            font-size: 22px;
            font-weight: 500;
        }
    }

    .tips {
        font-size: 14px;
        color: @cursor;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .icon-container {
        display: inline-block;
        padding: 4px 5px 4px 15px;
        color: @dark_gray;
        font-size: 16px;
        vertical-align: middle;
    }

    .href-group {
        height: 50px;
        line-height: 50px;
        padding: 0 56px;
        background-color: #fafafa;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        text-align: right;
        .href-item {
            display: inline-block;
            font-size: 14px;
            cursor: pointer;
        }
    }
}
</style>
