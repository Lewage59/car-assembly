<template>
  <div class="official-car app-container">
    <div class="filter-container">
      <div class="left">
        <!-- <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加用户</el-button> -->
        <el-button v-waves :loading="downloadLoading" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
      </div>
      <div class="right">
        <el-input v-model="listQuery.username" placeholder="查询车型名称" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <!-- <el-select v-model="listQuery.role" placeholder="筛选用户角色" clearable style="width: 150px" class="filter-item">
          <el-option v-for="item in roleOptions" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="listQuery.status" placeholder="筛选用户状态" style="width: 150px" class="filter-item" @change="handleFilter">
          <el-option v-for="item in statusOptions" :key="item.label" :label="item.label" :value="item.value" />
        </el-select> -->
        <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="carList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" />
      <el-table-column label="品牌" prop="brand.brandName" width="150px" align="center" />
      <el-table-column label="车系" prop="series.seriesName" width="150px" align="center" />
      <el-table-column label="车型" prop="modelName" align="center" />
      <el-table-column label="销售状态" prop="salesStatus" width="100px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.salesStatus === '停售' ? 'info' : 'success'" size="medium">{{ row.salesStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="年代款" prop="period" width="100px" align="center" />
      <el-table-column label="厂商指导价(元)" prop="basicParam.guidePrice" width="150px" align="center" />
      <el-table-column label="级别" prop="basicParam.level" width="150px" align="center" />
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="toDetailLink(row)">
            查看详情
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.currPage"
      :limit.sync="listQuery.pageSize"
      @pagination="getCarModelList"
    />
  </div>
</template>

<script>
import { getCarModelList } from '@/api/car'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils/index'
import { setSession } from '@/utils/session_stroage'
import { CODE_OK } from '@/config'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'OfficialCar',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      carList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        currPage: 1,
        pageSize: 20
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑用户信息',
        create: '创建用户'
      },
      rules: {
        username: [{ required: true, message: '请输入合法用户名', trigger: 'change' }],
        password: [{ required: true, message: '请输入合法密码', trigger: 'change' }],
        email: [{ message: '请输入合法邮箱', trigger: 'change' }],
        tel: [{ message: '请输入合法电话', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  computed: {
    dialogType() {
      return this.dialogStatus === 'create'
    }
  },
  created() {
    this.getCarModelList()
  },
  methods: {
    getCarModelList() {
      this.listLoading = true
      getCarModelList(this.listQuery).then(res => {
        if (res.code === CODE_OK) {
          this.carList = res.data.list
          this.total = res.data.total
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getCarModelList()
    },
    toDetailLink(row) {
      setSession('car_model_info', row)

      this.$router.push({
        name: 'carDetail',
        params: {
          id: row.id
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该车型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.deleteUser(row, index)
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.carList.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.official-car {
  .filter-container {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .filter-item {
      margin-right: 10px;
    }
  }
}
</style>
