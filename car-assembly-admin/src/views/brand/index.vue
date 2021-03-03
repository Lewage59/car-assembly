<template>
  <div class="brand app-container">
    <div class="filter-container">
      <div class="left">
        <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加品牌</el-button>
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
      :data="brandList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" />
      <el-table-column label="首字母" prop="preLetter" width="150px" align="center" />
      <el-table-column label="品牌名" prop="brandName" align="center" />
      <el-table-column label="图片LOGO" prop="logoPath" align="center" />
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleDetail(row)">
            查看详情
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
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
      @pagination="getBrandList"
    />

    <!-- 品牌相关表单弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="品牌名" prop="brandName">
          <el-input v-model="temp.brandName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="首字母" prop="preLetter">
          <el-select v-model="temp.preLetter" placeholder="选择首字母">
            <el-option v-for="item in letterOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogType ? createData() : updateData()">
          {{ dialogType ? '添加' : '更新' }}
        </el-button>
      </div>
    </el-dialog>

    <!-- 品牌相关表格弹窗 -->
    <el-dialog title="品牌详情" :visible.sync="dialogTableVisible" class="brand-detail-dialog">
      <el-card class="brand-wrapper">
        品牌：{{ currBrandDetail.brandName }}
      </el-card>
      <h3>品牌系列</h3>
      <el-table v-loading="seriesListLoading" :data="seriesList">
        <el-table-column prop="id" label="ID" width="150" />
        <el-table-column prop="seriesName" label="系列名" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getBrandList, createBrand, updateBrand, deleteBrand, getSeriesList } from '@/api/brand'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils/index'
import { setSession } from '@/utils/session_stroage'
import { CODE_OK } from '@/config'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const letterOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export default {
  name: 'Brand',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      letterOptions,
      tableKey: 0,
      brandList: null,
      seriesList: null,
      total: 0,
      listLoading: true,
      seriesListLoading: true,
      listQuery: {
        currPage: 1,
        pageSize: 20
      },
      temp: {
        preLetter: '',
        brandName: '',
        logoPath: '/path'
      },
      dialogFormVisible: false,
      dialogTableVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑品牌信息',
        create: '添加品牌'
      },
      rules: {
        brandName: [{ required: true, message: '请输入合法名称', trigger: 'change' }]
      },
      downloadLoading: false,
      currBrandDetail: {}
    }
  },
  computed: {
    dialogType() {
      return this.dialogStatus === 'create'
    }
  },
  created() {
    this.getBrandList()
  },
  methods: {
    getBrandList() {
      this.listLoading = true
      getBrandList(this.listQuery).then(res => {
        if (res.code === CODE_OK) {
          this.brandList = res.data.list
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
      this.getBrandList()
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
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createBrand(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '操作',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
            this.getBrandList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({
            brandId: this.temp.id
          }, this.temp)
          updateBrand(tempData).then((res) => {
            if (res.code === CODE_OK) {
              const index = this.brandList.findIndex(v => v.id === this.temp.id)
              this.brandList.splice(index, 1, this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '操作',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该品牌, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteData(row, index)
      })
    },
    deleteData(row, index) {
      deleteBrand(row.id).then((res) => {
        if (res.code === CODE_OK) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.brandList.splice(index, 1)
        }
      })
    },
    handleDetail(row) {
      this.dialogTableVisible = true
      this.currBrandDetail = row
      this.getSeriesList(row.id)
    },
    getSeriesList(id) {
      this.seriesListLoading = true
      getSeriesList(id).then(res => {
        if (res.code === CODE_OK) {
          this.seriesList = res.data.list
          this.total = res.data.total
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.seriesListLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        preLetter: '',
        brandName: '',
        logoPath: '/path'
      }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '首字母', '品牌名', '图片LOGO']
        const filterVal = ['id', 'preLetter', 'brandName', 'logoPath']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '品牌列表信息'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.brandList.map(v => filterVal.map(j => {
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
.brand {
  .filter-container {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .filter-item {
      margin-right: 10px;
    }
  }
}
.brand-detail-dialog {
	.brand-wrapper {
		font-size: 16px;
		font-weight: bold;
	}
	.el-dialog {
		.el-dialog__body {
			padding-top: 0;
		}
	}
}
</style>
