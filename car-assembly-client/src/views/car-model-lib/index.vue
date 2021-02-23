<template>
    <div class="car-model-lib app-container">
        <el-affix :offset="0">
            <ul class="left-container" :style="{'height': pageHeight}">
                <li class="brand-letter-wrapper" v-for="item in letter" :key="item">
                    <h3 class="letter">{{item}}</h3>
                    <ul class="brand-list">
                        <li class="brand-item">宝马</li>
                        <li class="brand-item">宝马</li>
                        <li class="brand-item">宝马</li>
                        <li class="brand-item">宝马</li>
                        <li class="brand-item">宝马</li>
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
                <span class="light-num">123</span>车系符合条件
            </div>
            <div class="lib-container">
                <el-row :gutter="1" type="flex" justify="start" align="top" v-infinite-scroll="load">
                    <el-col :span="6" v-for="(o) in list" :key="o">
                        <el-card :body-style="{ padding: '0px' }"  shadow="hover" class="car-model-card">
                            <img src="@/assets/404_images/empty_car.png" class="car-image" />
                            <div class="car-content">
                                <span class="main">思域</span>
                                <div class="bottom">11.9万</div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import {letter} from '@/config';

export default {
    name: 'carModelLib',
    data() {
        return {
            letter,
            pageHeight: 0,
            selectedList: ['阿三', '收到'],
            list: 12
        };
    },
    created() {
        this.computedPageHeight();
    },
    methods: {
        computedPageHeight() {
            this.pageHeight = window.innerHeight + 'px';
        },
        handleClose(tag) {
            this.selectedList.splice(this.selectedList.indexOf(tag), 1);
        },
        load() {
            this.list += 12;
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
        }
    }
}
</style>