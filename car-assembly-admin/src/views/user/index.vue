<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="left">
        <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加用户</el-button>
        <el-button v-waves :loading="downloadLoading" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
      </div>
      <div class="right">
        <el-input v-model="listQuery.username" placeholder="查找用户名" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-select v-model="listQuery.role" placeholder="筛选用户角色" clearable style="width: 150px" class="filter-item">
          <el-option v-for="item in roleOptions" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="listQuery.status" placeholder="筛选用户状态" style="width: 150px" class="filter-item" @change="handleFilter">
          <el-option v-for="item in statusOptions" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
        <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="userList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')" />
      <el-table-column label="头像" prop="avatar" width="150px" align="center" />
      <el-table-column label="用户名" prop="username" width="150px" align="center" />
      <el-table-column label="邮箱" prop="email" width="150px" align="center" />
      <el-table-column label="电话" prop="tel" width="150px" align="center" />
      <el-table-column label="更新时间" align="center" min-width="150px">
        <template slot-scope="{row}">
          {{ row.update_time | parseTime('{y}-{m}-{d} {h}:{i}') }}
        </template>
      </el-table-column>
      <el-table-column label="用户角色" align="center" min-width="150px">
        <template slot-scope="{row}">
          <el-tag v-if="row.role === 1" type="success">{{ userRole[row.role] }}</el-tag>
          <el-tag v-if="row.role === 2">{{ userRole[row.role] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" min-width="100px">
        <template slot-scope="{row}">
          <el-tag v-if="row.status === 0" type="info">{{ userStatus[row.status] }}</el-tag>
          <el-tag v-if="row.status === 1">{{ userStatus[row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" :type="row.status === 1 ? 'info' : 'primary'" @click="changeStatus(row)">
            {{ row.status === 1 ? '禁用' : '启用' }}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="temp.tel" type="email" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="用户角色" prop="role">
          <el-select v-model="temp.role" placeholder="选择用户角色">
            <el-option v-for="item in roleOptions" :key="item.label" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态">
          <el-select v-model="temp.status" placeholder="选择用户状态">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogType ? createData() : updateData()">
          {{ dialogType ? '创建' : '更新' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUserList, createUser, updateUserInfo, deleteUser } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import { userRole, userStatus, CODE_OK } from '@/config'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const roleOptions = [
  {
    label: '普通用户',
    value: 1
  }, {
    label: '超级管理员',
    value: 2
  }
]

const statusOptions = [
  {
    label: '启用',
    value: 1
  },
  {
    label: '禁用',
    value: 0
  }
]

export default {
  name: 'UserManager',
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
    },
    parseTime(value, format) {
      return parseTime(value, format)
    }
  },
  data() {
    return {
      userRole,
      userStatus,
      roleOptions,
      statusOptions,
      tableKey: 0,
      userList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        role: undefined,
        username: undefined,
        status: undefined
      },
      temp: {
        username: '',
        email: '',
        avatar: '',
        tel: '',
        password: '',
        role: 1,
        status: 1
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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getAllUserList().then(response => {
        this.userList = response.data.userList

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        username: '',
        email: '',
        avatar: '',
        tel: '',
        password: '',
        role: 1,
        status: 1
      }
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
          createUser(this.temp).then(() => {
            this.userList.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '操作',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
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
    changeStatus(row) {
      row.status ^= 1
      const param = {
        user_id: row.user_id,
        status: row.status
      }
      updateUserInfo(param).then((res) => {
        if (res.code === CODE_OK) {
          this.$notify({
            title: '操作',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateUserInfo(tempData).then((res) => {
            if (res.code === CODE_OK) {
              const index = this.userList.findIndex(v => v.id === this.temp.id)
              this.userList.splice(index, 1, this.temp)
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
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(row, index)
      })
    },
    deleteUser(row, index) {
      deleteUser(row.user_id).then((res) => {
        if (res.code === CODE_OK) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.userList.splice(index, 1)
        }
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '用户名', '邮箱', '电话', '更新时间', '用户角色', '状态']
        const filterVal = ['id', 'username', 'email', 'tel', 'update_time', 'role', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '用户列表信息'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.userList.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  .filter-item {
    margin-right: 10px;
  }
}
</style>
