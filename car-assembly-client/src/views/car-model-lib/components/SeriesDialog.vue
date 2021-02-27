<template>
    <el-dialog title="全部车型" v-model="visible" :width="960" top="5%">
        <el-row :gutter="24" class="series-header">
            <el-col :span="5">{{seriesInfo.series.seriesName}}</el-col>
            <el-col :span="8">{{seriesInfo.basicParam.vendor}}</el-col>
            <el-col :span="8">{{seriesInfo.basicParam.level}}</el-col>
        </el-row>
        <el-table :data="seriesList" :height="400" stripe v-loading="loading">
            <el-table-column property="modelName" label="车型名称"></el-table-column>
            <el-table-column property="basicParam.guidePrice" label="厂商指导价(元)" width="150"></el-table-column>
            <el-table-column property="basicParam.engine" label="发动机型号" width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button size="mini" type="primary" @click="toDetailLink(scope.row)">参数配置</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="series-footer">
            <el-pagination 
                :hide-on-single-page="true"
                background 
                layout="prev, pager, next" 
                v-model:currentPage="currPage"
                :total="total"
                :page-size="pageSize"
                @current-change="handleCurrentChange"></el-pagination>
        </div>
    </el-dialog>
</template>

<script>
import {getCarSeriesList} from '@/api/car';
import {CODE_OK} from '@/config';
import {setSession} from '@/utils/session_stroage';

export default {
    name: 'seriesDialog',
    data() {
        return {
            visible: false,
            seriesList: [],
            loading: false,
            seriesInfo: null,
            total: 0,
            currPage: 1,
            pageSize: 10
        };
    },
    methods: {
        toDetailLink(item) {
            this.visible = false;
            setSession('car_model_info', item);
            this.$router.push({
                name: 'carModelDetail',
                params: {
                    id: item.id
                }
            });
        },
        showDialog(series) {
            this.visible = true;
            this.seriesInfo = series;
            this.getCarSeriesList();
        },
        getCarSeriesList() {
            const param = {
                seriesId: this.seriesInfo.seriesId,
                currPage: this.currPage,
                pageSize: this.pageSize
            };

            this.loading = true;
            getCarSeriesList(param).then(res=> {
                if (res.code === CODE_OK) {
                    this.seriesList = res.data.list;
                    this.total = res.data.total;
                }
            }).finally(()=> {
                this.loading = false;
            });
        },
        handleCurrentChange(page) {
            this.currPage = page;
            this.getCarSeriesList();
        }
    }
};
</script>

<style lang="less">
.el-dialog__body {
    padding: 0 20px 20px;
}
.series-header {
    margin: 10px 0;
    font-size: 18px;
    font-weight: 800;
}
.series-footer {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 10px 0;
    .el-pagination {
        display: inline-block;
    }
}
</style>