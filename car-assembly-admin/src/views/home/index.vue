<template>
  <div class="dashboard-editor-container">
    <panel-group v-if="penalNum" :value="penalNum" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <bar-chart :data="levelNum" />
    </el-row>

    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <div class="chart-wrapper">
          <pie-chart v-if="sexNum.length" :data="sexNum" />
        </div>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <rank-table />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
// import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import RankTable from './components/RankTable'

import { getPanelNum, getLevelNum } from '@/api/home'
import { getSexNum } from '@/api/user'
import { CODE_OK } from '@/config'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    // RaddarChart,
    PieChart,
    BarChart,
    RankTable
  },
  data() {
    return {
      penalNum: null,
      levelNum: [],
      sexNum: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.getPanelNum()
      this.getLevelNum()
      this.getSexNum()
    },
    getPanelNum() {
      getPanelNum().then((res) => {
        if (res.code === CODE_OK) {
          this.penalNum = res.data
        }
      })
    },
    getLevelNum() {
      getLevelNum().then((res) => {
        if (res.code === CODE_OK) {
          this.levelNum = res.data
          this.levelNum.splice(0, 2)
        }
      })
    },
    getSexNum() {
      getSexNum().then((res) => {
        if (res.code === CODE_OK) {
          this.sexNum = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
