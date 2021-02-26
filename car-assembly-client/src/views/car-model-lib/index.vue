<template>
    <div class="car-model-lib app-container">
        <el-affix :offset="0">
            <ul class="left-container" :style="{'height': pageHeight}">
                <li class="brand-letter-wrapper" v-for="item in letter" :key="item.brandName">
                    <h3 class="letter">{{item}}</h3>
                    <ul class="brand-list">
                        <li 
                            class="brand-item" 
                            v-for="item in brandList[item]" 
                            :key="item" 
                            :class="{'active': item.id === activeBrand}"
                            @click="selectBrand(item.id)">{{item.brandName}}</li>
                    </ul>
                </li>
            </ul>
        </el-affix>
        <div class="right-container">
            <h2 class="container-title">条件筛选</h2>
            <section class="select-wrapper">
                <div class="select-conditions">
                    <span class="select-title">价格：</span>
                    <ul class="select-conditioin-list">
                        <li class="select-conditioin-item selected">不限</li>
                        <li class="select-conditioin-item">不限</li>
                    </ul>
                </div>
                <div class="select-conditions">
                    <span class="select-title">价格：</span>
                    <ul class="select-conditioin-list">
                        <li class="select-conditioin-item selected">不限</li>
                        <li class="select-conditioin-item">不限</li>
                    </ul>
                </div>
                <div class="select-conditions">
                    <span class="select-title">价格：</span>
                    <ul class="select-conditioin-list">
                        <li class="select-conditioin-item selected">不限</li>
                        <li class="select-conditioin-item">不限</li>
                    </ul>
                </div>
                <div class="select-conditions">
                    <span class="select-title">价格：</span>
                    <ul class="select-conditioin-list">
                        <li class="select-conditioin-item selected">不限</li>
                        <li class="select-conditioin-item">不限</li>
                    </ul>
                </div>
            </section>
            <el-card shadow="never" class="selected-list" :body-style="{padding:'8px'}">
                <span class="title">已选条件：</span>
                <el-tag
                    class="selected-item"
                    :key="tag"
                    size="medium"
                    v-for="tag in selectedList"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
            </el-card>
            <div class="lib-header">
                <span class="light-num">{{listTotal}}</span>车系符合条件
            </div>
            <div class="lib-container">
                <el-row :gutter="1" type="flex" justify="start" align="top" v-infinite-scroll="load" :infinite-scroll-immediate="false">
                    <el-col :span="6" v-for="(item) in carList" :key="item">
                        <el-card :body-style="{ padding: '0px' }"  shadow="hover" class="car-model-card" @click="toDetailLink(item.id)">
                            <img src="@/assets/404_images/empty_car.png" class="car-image" />
                            <div class="car-content">
                                <span class="main">{{item.series.seriesName}}</span>
                                <div class="bottom">{{item.basicParam.guidePrice}}</div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <div class="loading-more">
                    <template v-if="hasMore">
                        <i class="el-icon-loading"></i>正在加载...
                    </template>
                    <template v-else>
                        已经是最底部啦~
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {letter, CODE_OK} from '@/config';
import {getBrandList} from '@/api/brand';
import {getCarModelList} from '@/api/car';

export default {
    name: 'carModelLib',
    data() {
        return {
            letter,
            pageHeight: 0,
            selectedList: ['阿三', '收到'],
            carList: [],
            brandList: [],
            loading: false,
            activeBrand: 0,
            currPage: 1,
            pageSize: 20,
            listTotal: 0
        };
    },
    created() {
        this.computedPageHeight();
        this.initData();
    },
    computed: {
        hasMore() {
            return this.listTotal !== this.carList.length;
        }
    },
    methods: {
        initData() {
            this.getBrandList();
            this.getCarModelList();
        },
        computedPageHeight() {
            this.pageHeight = window.innerHeight + 'px';
        },
        handleClose(tag) {
            this.selectedList.splice(this.selectedList.indexOf(tag), 1);
        },
        load() {
            if (!this.hasMore) {
                return;
            }
            this.currPage++;
            this.getCarModelList();
        },
        getBrandList() {
            getBrandList().then(res=> {
                if (res.code === CODE_OK) {
                    this.brandList = this.formatBrandList(res.data.list);
                }
            });
        },
        getCarModelList() {
            const param = {
                currPage: this.currPage,
                pageSize: this.pageSize
            };

            if (this.activeBrand) {
                param.brandId = this.activeBrand;
            }

            this.loading = true;
            getCarModelList(param).then(res=> {
                if (res.code === CODE_OK) {
                    this.carList = this.carList.concat(res.data.list);
                    this.listTotal = +res.data.total;
                }
            }).finally(()=> {
                this.loading = false;
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
        selectBrand(id) {
            this.activeBrand = id;

            // 重置列表
            this.carList = [];
            this.currPage = 1;

            this.getCarModelList();
        },
        toDetailLink(id) {
            this.$router.push({
                name: 'carModelDetail',
                params: {id}
            });
        }
    }
};
</script>

<style lang="less" scoped>
.car-model-lib {
    display: flex;
    flex-direction: row;
    margin-top: 24px;
    margin-bottom: 50px;
    .left-container {
        width: 230px;
        overflow: auto;
        .letter {
            position: sticky;
            top: 0;
            line-height: 32px;
            padding-left: 16px;
            font-size: 12px;
            color: #666;
            background: #f8f8f8;
        }
        .brand-letter-wrapper {
            .brand-list {
                .brand-item {
                    line-height: 52px;
                    padding-left: 16px;
                    cursor: pointer;
                    font-size: 16px;
                    &:hover {
                        color: #409eff;
                    }
                    &.active {
                        color: #409eff;
                        background-color: #f4f4f5;
                    }
                }
            }
        }
    }
    .right-container {
        display: inline-block;
        flex: 1;
        margin-left: 10px;
        .container-title {
            line-height: 60px;
            margin: 0 20px;
            font-size: 24px;
            font-weight: 500;
            box-shadow: 0 1px 0 0 #ededed;
        }
        .select-wrapper {
            .select-conditions {
                height: 54px;
                line-height: 54px;
                margin: 0 20px;
                box-sizing: border-box;
                font-size: 14px;
                border-bottom: 1px solid #ededed;
                .select-title {
                    color: #666;
                }
                .select-conditioin-list {
                    display: inline-block;
                    .select-conditioin-item {
                        display: inline-block;
                        padding: 4px 8px;
                        margin: 0 2px;
                        line-height: 20px;
                        cursor: pointer;
                        border-radius: 4px;
                        -webkit-transition: all 0.1s ease-in-out;
                        transition: all 0.1s ease-in-out;
                        &:hover {
                            background: rgba(68, 0, 255, 0.2);
                        }
                        &.selected {
                            background-color: #ffe100;
                        }
                    }
                }
            }
        }
        .selected-list {
            margin: 0 20px;
            .title {
                font-size: 14px;
                color: #666;
            }
            .selected-item {
                margin: 0 4px;
            }
        }
        .lib-header {
            height: 54px;
            line-height: 54px;
            margin: 0 20px;
            box-sizing: border-box;
            font-size: 16px;
            border-bottom: 1px solid #ededed;
            .light-num {
                margin-right: 5px;
                color: rgb(255, 145, 0);
            }
        }
        .lib-container {
            min-height: 300px;
            margin: 0 20px;
            .car-model-card {
                margin: 10px;
                cursor: pointer;
                .car-image {
                    width: 100%;
                }
                .car-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 10px 0;
                    .main {
                        line-height: 22px;
                        font-size: 16px;
                        margin-bottom: 4px;
                    }
                    .bottom {
                        display: inline-block;
                        height: 20px;
                        line-height: 20px;
                        color: rgb(255, 145, 0);
                    }
                }
            }
            .loading-more {
                text-align: center;
                line-height: 50px;
                background: #f4f4f5;
                .el-icon-loading {
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>