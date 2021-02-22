<template>
    <div class="navbar">
        <el-menu :default-active="activeIndex" class="el-menu-navbar" mode="horizontal" @select="handleSelect">
            <div class="logo-wrapper">
                <img src="@/assets/logo/nav-logo.jpg" class="logo-image">
                <span>汽车组装演示系统</span>
            </div>
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="carModelLib">车型库</el-menu-item>
            <el-menu-item index="userCenter">个人中心</el-menu-item>
            <div class="right-menu">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <div class="avatar-wrapper">
                            <el-avatar size="medium" icon="el-icon-s-custom"></el-avatar>
                            <i class="el-icon-caret-bottom" />
                        </div>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                        <el-dropdown-item disabled>username</el-dropdown-item>
                        <el-dropdown-item divided>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item divided>退出登陆</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
            activeIndex: '1'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
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
</style>
