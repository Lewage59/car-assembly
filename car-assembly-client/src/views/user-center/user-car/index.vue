<template>
    <div class="user-car">
        <el-table :data="customList" border style="width: 100%" stripe :loading="loading">
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="modelName" label="车型名称" width="150"></el-table-column>
            <el-table-column prop="period" label="年代款" width="150"></el-table-column>
            <el-table-column prop="basicParam.level" label="级别" width="150"></el-table-column>
            <el-table-column prop="basicParam.maxSpeed" label="最高车速" width="150"></el-table-column>
            <el-table-column prop="exteriorColor" label="外观颜色" width="150"></el-table-column>
            <el-table-column prop="interiorColor" label="内饰颜色" width="150"></el-table-column>
            <el-table-column prop="basicParam.bodyStructure" label="车身结构" width="150"></el-table-column>
            <el-table-column prop="basicParam.lwh" label="长*宽*高" width="150"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
            <template #default="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="medium">查看</el-button>
                <!-- <el-button type="text" size="medium">编辑</el-button> -->
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {getCustomList} from '@/api/car';
import {mapGetters} from 'vuex';
import {CODE_OK} from '@/config';
import {setSession} from '@/utils/session_stroage';

export default {
    name: 'userCar',
    data() {
        return {
            customList: [],
            loading: false
        };
    },
    computed: {
        ...mapGetters([
            'userInfo'
        ])
    },
    created() {
        this.getCustomList();
    },
    methods: {
        getCustomList() {
            const query = {
                userId: this.userInfo.id
            };

            this.loading = true;
            getCustomList(query).then(res=> {
                if (res.code === CODE_OK) {
                    this.customList = res.data.customList;
                }
            }).finally(()=> {
                this.loading = false;
            });
        },
        handleClick(item) {
            setSession('car_model_info', item);
            this.$router.push({
                name: 'carModelDetail',
                params: {
                    id: item.id
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.user-car {

}
</style>