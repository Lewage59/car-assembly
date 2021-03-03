<template>
    <div class="navbar">
        <el-menu :default-active="activeIndex" class="el-menu-navbar" mode="horizontal" @select="handleSelect" router>
            <div class="logo-wrapper">
                <img src="@/assets/logo/nav-logo.jpg" class="logo-image">
                <span>汽车组装演示系统</span>
            </div>
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/car-model-lib">车型库</el-menu-item>
            <el-menu-item index="/user-center">个人中心</el-menu-item>
            <div class="right-menu">
                <el-dropdown trigger="click" v-if="username">
                    <span class="el-dropdown-link">
                        <div class="avatar-wrapper">
                            <el-avatar size="medium" icon="el-icon-s-custom"></el-avatar>
                            <i class="el-icon-caret-bottom" />
                        </div>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                        <el-dropdown-item disabled class="username">{{username}}</el-dropdown-item>
                        <el-dropdown-item divided @click="logout">退出登陆</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <div v-else>
                    <router-link :to="'/login?redirect=' + $route.path">
                        <el-link>登陆</el-link>
                    </router-link>
                    <el-divider direction="vertical"></el-divider>
                    <router-link :to="'/login?register=true&redirect=' + $route.path">
                        <el-link>注册</el-link>
                    </router-link>
                </div>
            </div>
        </el-menu>
    </div>
</template>

<script>
import {ElMessage} from 'element-plus';
import {mapGetters} from 'vuex';

export default {
    name: 'navbar',
    data() {
        return {
            activeIndex: '/home'
        };
    },
    created() {
        this.setDefaultActive();
    },
    computed: {
        ...mapGetters([
            'username'
        ])
    },
    methods: {
        setDefaultActive() {
            const path = this.$route.path.split('/');

            this.activeIndex = '/' + path[1];
        },
        handleSelect(key, keyPath) {
            this.activeIndex = key;
        },
        logout() {
            this.$store.dispatch('user/logout');
            ElMessage.success({
                message: '退出成功',
                type: 'success'
            });
            window.location.replace('/');
        }
    },
    watch: {
        '$route'(to, from) {
            this.activeIndex = '/' + to.path.split('/')[1];
        }
    }
};
</script>

<style lang="less" scoped>
.navbar {
    height: 60px;
    border-bottom: solid 1px #e6e6e6;
    .el-menu-navbar {
        width: 1200px;
        margin: 0 auto;
    }
    .logo-wrapper {
        float: left;
        height: 100%;
        margin-right: 150px;
        line-height: 60px;
        color: #303133;
        font-weight: bold;
        .logo-image {
            height: 50px;
            margin-top: 8px;
            vertical-align: top;
        }
    }
    .right-menu {
        display: flex;
        float: right;
        align-items: center;
        height: 60px;
        line-height: 60px;
        .avatar-wrapper {
            display: flex;
            align-items: center;
            cursor: pointer;
        }
    }
}

.el-dropdown-menu__item {
    min-width: 80px;
    text-align: center;
}
</style>
