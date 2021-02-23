<template>
    <div class="user-center app-container">
        <el-container>
            <el-aside width="230px" class="left-container">
                <h5 class="page-title">个人中心</h5>
                <el-menu
                    :default-active="activeIndex"
                    class="user-menu"
                    @select="handleSelect"
                    router>
                    <el-menu-item index="user-info">
                        <i class="el-icon-user-solid"></i>
                        <template #title>我的信息</template>
                    </el-menu-item>
                    <el-menu-item index="user-car">
                        <i class="el-icon-s-grid"></i>
                        <template #title>我的组装车</template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <el-card class="box-card" shadow="never">
                    <template #header>
                        <div class="card-header">
                            <span>{{routerMap[activeIndex]}}</span>
                        </div>
                    </template>
                    <router-view></router-view>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
const routerMap = {
    'user-info': '我的消息',
    'user-car': '我的组装车'
};

export default {
    name: 'userCenter',
    data() {
        return {
            routerMap,
            activeIndex: 'user-info'
        };
    },
    created() {
        this.setDefaultActive();
    },
    methods: {
        setDefaultActive() {
            const path = this.$route.path.split('/');

            this.activeIndex = path.pop();
        },
        handleSelect(key) {
            this.activeIndex = key;
        }
    }
};
</script>

<style lang="less" scoped>
.user-center {
    .header-image {
        width: 100%;
    }
    .left-container {
        height: 165px;
        margin: 20px 0;
        border: 1px solid #e1e2e5;
        overflow: hidden;
    }
    .user-menu {
        width: 100%;
    }
    .page-title {
        display: block;
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        color: #99a2aa;
        cursor: default;
        border-bottom: 1px solid #e1e2e5;
    }
}
</style>