<template>
    <div class="login-container">
        <el-form
            ref="loginForm" 
            v-if="isLogin" 
            :model="loginForm" 
            :rules="loginRules" 
            class="login-form" 
            auto-complete="on" 
            label-position="left">
            <div class="content-main">
                <div class="title-container">
                    <img src="@/assets/logo/nav-logo.jpg" class="logo-image">
                    <h3 class="title">汽车组装演示系统</h3>
                </div>
                <h4 class="form-title">账密登陆</h4>
                <el-form-item prop="username">
                    <span class="icon-container">
                        <i class="el-icon-s-custom"></i>
                    </span>
                    <el-input
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="用户名"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <span class="icon-container">
                        <i class="el-icon-lock"></i>
                    </span>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="密码"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
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
            :model="loginForm" 
            :rules="loginRules" 
            class="login-form" 
            auto-complete="on" 
            label-position="left">
            <div class="content-main">
                <div class="title-container">
                    <img src="@/assets/logo/nav-logo.jpg" class="logo-image">
                    <h3 class="title">汽车组装演示系统</h3>
                </div>
                <h4 class="form-title">账密注册</h4>
                <el-form-item prop="username">
                    <span class="icon-container">
                        <i class="el-icon-s-custom"></i>
                    </span>
                    <el-input
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="用户名"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <span class="icon-container">
                        <i class="el-icon-lock"></i>
                    </span>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="密码"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter="handleLogin"
                    />
                </el-form-item>

                <el-button 
                    :loading="loading" 
                    type="primary" 
                    style="width:100%;margin-bottom:30px;" 
                    @click.prevent="handleLogin">注册</el-button>
            </div>
            <div class="href-group">
                <div class="href-item" @click="switchForm(true)">立即登陆</div>
            </div>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback)=> {
            callback();
        };
        const validatePassword = (rule, value, callback)=> {
            if (value.length < 6) {
                callback(new Error('密码不得少于6位'));
            } else {
                callback();
            }
        };

        return {
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{required: true,
                    trigger: 'blur',
                    validator: validateUsername}],
                password: [{required: true,
                    trigger: 'blur',
                    validator: validatePassword}]
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined,
            isLogin: true
        };
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
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
        switchForm(value) {
            this.isLogin = value;
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

    .login-form {
        position: relative;
        top: 160px;
        width: 480px;
        max-width: 100%;
        margin: 0 auto;
        overflow: hidden;
        .content-main {
            padding: 0px 56px 10px;
            min-height: 350px;
            box-shadow: 0 2px 19px 0 rgba(0, 0, 0, 0.01);
            border: solid 1px rgba(232, 232, 232, 0.56);
            background-color: @cursor;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
        }
        .form-title {
            margin-top: 10px;
            margin-bottom: 30px;
            color: #222;
            font-size: 22px;
            font-weight: 500;
        }
        .el-form-item {
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }

    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            height: 47px;
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

    .title-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 0;
        background-color: #fff;

        .logo-image {
            display: inline-block;
            height: 50px;
        }

        .title {
            display: inline-block;
            font-size: 18px;
            text-align: center;
            font-weight: bold;
        }
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
