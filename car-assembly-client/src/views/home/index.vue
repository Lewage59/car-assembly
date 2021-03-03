<template>
    <div class="home-container app-container">
        <el-card class="header-card" shadow="never">
            <div class="cartype-wrapper">
                <cartype-list></cartype-list>
            </div>
            <div class="search-wrapper">
                <el-form :inline="true" :model="formSearch" class="search-form-inline">
                    <el-form-item>
                        <el-select 
                            v-model="formSearch.brandId" 
                            placeholder="请选择品牌" 
                            @visible-change="handleClickBrand" 
                            :loading="brandLoading">
                            <template v-if="brandList">
                                <el-option-group
                                    v-for="letter in letters"
                                    :key="letter"
                                    :label="letter">
                                    <el-option
                                        v-for="item in brandList[letter]"
                                        :key="item.id"
                                        :label="item.brandName"
                                        :value="item.id">
                                    </el-option>
                                </el-option-group>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select 
                            v-model="formSearch.seriesId" 
                            :disabled="!formSearch.brandId" 
                            placeholder="请选择车系" 
                            @visible-change="handleClickSeries" 
                            :loading="SeriesLoading">
                            <template v-if="seriesList">
                                <el-option-group
                                    v-for="vendor in Object.keys(seriesList)"
                                    :key="vendor"
                                    :label="vendor">
                                    <el-option 
                                        v-for="item in seriesList[vendor]" 
                                        :key="item.seriesId" 
                                        :label="item.series.seriesName" 
                                        :value="item.seriesId"></el-option>
                                </el-option-group>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSearch">找车</el-button>
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
        <series-dialog ref="seriesDialog"></series-dialog>
    </div>
</template>

<script>
import CartypeList from './components/CartypeList';
import {letter, CODE_OK, carType} from '@/config';
import {getBrandList} from '@/api/brand';
import {getCarModelList} from '@/api/car';
import SeriesDialog from '@/views/car-model-lib/components/SeriesDialog';

export default {
    name: 'Home',
    data() {
        return {
            letters: letter,
            brandList: null,
            seriesList: null,
            carouselImgs: [
                require('@/assets/carousel/carousel-img1.jpg'),
                require('@/assets/carousel/carousel-img2.jpg'),
                require('@/assets/carousel/carousel-img3.jpg'),
                require('@/assets/carousel/carousel-img4.jpg')
            ],
            formSearch: {
                brandId: '',
                seriesId: null
            },
            brandLoading: false,
            SeriesLoading: false
        };
    },
    components: {
        CartypeList,
        SeriesDialog
    },
    methods: {
        toCarAssembly() {
            this.$router.push({
                path: '/car-assembly'
            });
        },
        getBrandList() {
            this.brandLoading = true;
            getBrandList().then(res=> {
                if (res.code === CODE_OK) {
                    this.brandList = this.formatBrandList(res.data.list);
                }
            }).finally(()=> {
                this.brandLoading = false;
            });
        },
        getCarModelList() {
            const param = {
                currPage: 1,
                pageSize: 200,
                brandId: this.formSearch.brandId
            };

            this.SeriesLoading = true;
            getCarModelList(param).then(res=> {
                if (res.code === CODE_OK) {
                    this.seriesList = this.formatSeriesList(res.data.list);
                }
            }).finally(()=> {
                this.SeriesLoading = false;
            });
        },
        formatBrandList(list) {
            const formatList = {};

            list.forEach(item=> {
                if (typeof formatList[item.preLetter] === 'undefined') {
                    formatList[item.preLetter] = [];
                }
                formatList[item.preLetter].push(item);
            });

            return formatList;
        },
        formatSeriesList(list) {
            const formatList = {};

            list.forEach(item=> {
                if (typeof formatList[item.basicParam.vendor] === 'undefined') {
                    formatList[item.basicParam.vendor] = [];
                }
                formatList[item.basicParam.vendor].push(item);
            });

            return formatList;
        },
        handleClickBrand() {
            if (this.brandList) {
                this.seriesList = null;
                return;
            }
            this.getBrandList();
        },
        handleClickSeries() {
            if (this.seriesList) {
                return;
            }
            this.getCarModelList();
        },
        onSearch() {
            this.$refs.seriesDialog.showDialog(this.formSearch.seriesId);
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