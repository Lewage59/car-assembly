<template>
  <div class="">
    <el-table :data="list" style="width: 100%;padding-top: 15px;">
      <el-table-column label="排名" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="厂商" align="center">
        <template slot-scope="{row}">
          {{ row.vendor }}
        </template>
      </el-table-column>
      <el-table-column label="车型数量" align="center">
        <template slot-scope="{row}">
          {{ row.nums }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getVendorRank } from '@/api/home'
import { CODE_OK } from '@/config'

export default {
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getVendorRank().then(res => {
        if (res.code === CODE_OK) {
          this.list = res.data
          this.list.splice(0, 2)
        }
      })
    }
  }
}
</script>
