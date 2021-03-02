<template>
  <div v-if="tableList.length" class="column-table">
    <div class="space-container">
      <div v-for="(item, index) in tableList" :key="index" class="column-block">
        <span class="label">{{ item.key }}</span>
        <span class="text">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { partsKeyToText } from '@/config'

export default {
  name: 'ColumnTable',
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    currParam: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableList: []
    }
  },
  watch: {
    'value'() {
      this.formatValue()
    }
  },
  methods: {
    formatValue() {
      const arr = []
      const paramKeyMap = partsKeyToText[this.currParam]

      for (const key in this.value) {
        const tmp = {
          key: paramKeyMap[key],
          value: this.value[key]
        }

        arr.push(tmp)
      }

      this.tableList = arr
    }
  }
}
</script>

<style lang="scss" scoped>
.column-table {
    min-height: 300px;
    .space-container {
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
    }
    .column-block {
        width: 500px;
        margin-bottom: 8px;
        margin-right: 8px;
        border: 1px solid #d9ecff;
        box-sizing: border-box;
        .label {
            width: 230px;
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
