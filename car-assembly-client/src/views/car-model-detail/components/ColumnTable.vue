<template>
  <div v-if="tableList.length" class="column-table">
    <el-space wrap>
        <div class="column-block" v-for="(item, index) in tableList" :key="index">
            <span class="label">{{ item.key }}</span>
            <span class="text">{{ item.value }}</span>
        </div>
    </el-space>
  </div>
</template>

<script>
import {partsKeyToText} from '@/config';

export default {
    name: 'ColumnTable',
    props: {
        value: {
            type: Object,
            default: ()=> {}
        },
        currParam: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            tableList: []
        };
    },
    watch: {
        'value'() {
            this.formatValue();
        }
    },
    methods: {
        formatValue() {
            const arr = [];
            const paramKeyMap = partsKeyToText[this.currParam];

            for (const key in this.value) {
                const tmp = {
                    key: paramKeyMap[key],
                    value: this.value[key]
                };

                arr.push(tmp);
            }

            this.tableList = arr;
        }
    }
};
</script>

<style lang="less" scoped>
.column-table {
    min-height: 300px;
    .column-block {
        width: 500px;
        border: 1px solid #d9ecff;
        box-sizing: border-box;
        .label {
            width: 200px;
            display: inline-block;
            padding: 10px 20px;
            color: #fff;
            background-color: #66b1ff;
        }
        .text {
            display: inline-block;
            padding: 10px;
        }
    }
}   
</style>
