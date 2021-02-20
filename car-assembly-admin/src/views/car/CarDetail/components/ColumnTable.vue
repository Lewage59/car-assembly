<template>
  <div v-if="tableList.length" class="column-table">
    <table border="1" class="table-container">
      <tr v-for="(item, index) in tableList" :key="index">
        <td>{{ item.key }}</td>
        <td>{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ColumnTable',
  props: {
    value: {
      type: Object,
      default: () => {}
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

      for (const key in this.value) {
        const tmp = {
          key: key,
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
.table-container {
  td {
    padding: 0;
    margin: 0;
  }
}
</style>
