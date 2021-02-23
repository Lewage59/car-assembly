<template>
    <div class="home-container app-container">
        <el-card class="header-card" shadow="never">
            <div class="cartype-wrapper">
                <cartype-list></cartype-list>
            </div>
            <div class="search-wrapper">
                <el-form :inline="true" :model="formInline" class="search-form-inline">
                    <el-form-item>
                        <el-select v-model="formInline.region" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formInline.region" disabled placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSubmit">找车</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-row :gutter="24">
            <el-col :span="16">
                <el-carousel :interval="5000" arrow="always" class="carousel-wrapper">
                    <el-carousel-item v-for="item in carouselImgs" :key="item">
                        <el-image :src="item" />
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover" class="assembly-card" :body-style="{height: '260px'}">
                    <el-alert
                        title="可组装期望的汽车配置"
                        type="info"
                        :closable="false"
                        center>
                    </el-alert>
                    <div class="button-wrapper">
                        <el-button type="primary" icon="el-icon-s-grid" @click="toCarAssembly">汽车组装</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col></el-col>
        </el-row>
    </div>
</template>

<script>
import CartypeList from './components/CartypeList';

export default {
    name: 'Home',
    data() {
        return {
            carouselImgs: [
                require('@/assets/carousel/carousel-img1.jpg'),
                require('@/assets/carousel/carousel-img2.jpg'),
                require('@/assets/carousel/carousel-img3.jpg'),
                require('@/assets/carousel/carousel-img4.jpg')
            ],
            formInline: {
                user: '',
                region: ''
            }
        };
    },
    components: {
        CartypeList
    },
    methods: {
        toCarAssembly() {
            this.$router.push({
                path: '/car-assembly'
            });
        }
    }
};
</script>

<style lang="less">
.home-container {
    .header-card {
        margin: 15px 0;
        .el-card__body {
            padding: 0;
        }
    }
    .cartype-wrapper {
        width: 100%;
        text-align: center;
    }
    .search-wrapper {
        padding: 0 20px;
    }
    .assembly-card {
        .button-wrapper {
            display: flex;
            height: calc(100% - 35px);
            align-items: center;
            justify-content: center;
            .el-button {
                height: 60px;
                width: 200px;
                font-size: 18px;
                font-weight: bold;
                letter-spacing: 1px;
            }
        }
    }
}
</style>