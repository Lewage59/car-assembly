<template>
  <div class="carDetail-container app-container">
    <el-page-header content="参数配置详情" @back="goBack" />
    <el-card class="car-card-wrapper">
      <template #header>
        <span>车型参数</span>
      </template>
      <div class="car-info">
        <el-row>
          <el-col :span="8">
            <img class="car-image" src="@/assets/404_images/empty_car.png" alt="">
          </el-col>
          <el-col :span="16">
            <h1 class="car-name">{{ carModelInfo.series ? carModelInfo.series.seriesName : '-' }}（{{ carModelInfo.modelName }}）</h1>
            <div class="param-wrapper">
              <div class="param-block">
                <p class="dealer">厂商指导价：<span class="price-text">{{ carModelInfo.basicParam.guidePrice }}</span></p>
                <p class="dealer">年代款：<span class="vendor-text">{{ carModelInfo.period }}</span></p>
              </div>
              <div class="param-block">
                <p class="dealer">厂商：{{ carModelInfo.basicParam.vendor }}</p>
                <p class="dealer">级别：{{ carModelInfo.basicParam.level }}</p>
              </div>
              <div class="param-block">
                <p class="dealer">发动机：{{ carModelInfo.basicParam.engine }}</p>
                <p class="dealer">销售状态：
                  <el-tag
                    :type="carModelInfo.salesStatus === '停售' ? 'info' : 'success'"
                    size="medium"
                    effect="dark"
                  >{{ carModelInfo.salesStatus || '-' }}</el-tag>
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-tabs type="border-card" @tab-click="handleTabClick">
      <el-tab-pane v-for="item in paramList" :key="item" v-loading="isLoading" :label="item">
        <column-table :value="paramValue" :curr-param="currParam" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getSession } from '@/utils/session_stroage'
import { getCarParam } from '@/api/car'
import ColumnTable from './components/ColumnTable'
import { CODE_OK } from '@/config/index'

const paramMap = {
  '基本参数': 'basicParam',
  '发动机': 'engine',
  '变速箱': 'gearbox',
  '底盘转向': 'chassis',
  '车轮/制动': 'wheel',
  '安全装备': 'safety',
  '内置配置': 'inconfig'
}

export default {
  name: 'CarDetail',
  components: {
    ColumnTable
  },
  data() {
    return {
      modelId: null,
      carModelInfo: null,
      paramValue: null,
      isLoading: false,
      currParam: 'basicParam'
    }
  },
  computed: {
    paramList() {
      return Object.keys(paramMap)
    }
  },
  created() {
    this.modelId = this.$route.params && this.$route.params.id
    this.carModelInfo = getSession('car_model_info')
    this.getCarParam('基本参数')
  },
  methods: {
    getCarParam(paramType) {
      this.currParam = paramMap[paramType]
      const temp = this.carModelInfo.userId ? {
        modelId: this.carModelInfo[`${this.currParam}Id`],
        isCustom: true
      } : {
        modelId: this.modelId
      }
      const param = Object.assign({
        paramType: this.currParam
      }, temp)

      this.isLoading = true
      getCarParam(param).then(res => {
        if (res.code === CODE_OK) {
          this.paramValue = res.data.paramResult
        }
      }).finally(() => {
        this.isLoading = false
      })
    },
    handleTabClick(tab) {
      const tabName = Object.keys(paramMap)[tab.index]

      this.getCarParam(tabName)
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.carDetail-container {
    padding: 20px;

    .car-card-wrapper {
        margin: 20px 0;
        .car-info {
            .car-image {
                width: 280px;
            }
            .car-name {
                line-height: 40px;
                margin-top: 25px;
                margin-bottom: 12px;
                font-size: 28px;
                font-weight: 500;
            }
            .param-block {
                display: inline-block;
                vertical-align: top;
                font-size: 16px;
                color: rgb(102, 102, 102);
                .dealer {
                    margin: 0;
                }
            }
            .param-block:nth-child(1) {
                padding-right: 16px;
                .dealer:nth-child(1) {
                    line-height: 33px;
                    margin-top: -7px;
                    margin-bottom: 7px;
                }
                .price-text {
                    font-size: 24px;
                    font-weight: 500;
                    vertical-align: middle;
                    color: rgb(255, 145, 0);
                }
                .vendor {
                    line-height: 22px;
                    font-size: 16px;
                    color: rgb(102, 102, 102);
                }
                .vendor-text {
                    color: rgb(26, 26, 26);
                }
            }
            .param-block:nth-child(2) {
                padding-left: 15px;
                padding-right: 16px;
                border-width: 0px 1px;
                border-style: solid solid;
                border-color: rgb(230, 230, 230) rgb(230, 230, 230);
                border-image: initial;
                border-top: 0px;
                border-bottom: 0px;
                .dealer:nth-child(1) {
                    line-height: 22px;
                    font-size: 16px;
                    color: rgb(102, 102, 102);
                }
                .dealer:nth-child(2) {
                    margin-top: 13px;
                }
            }
            .param-block:nth-child(3) {
                padding-left: 16px;
                    .dealer:nth-child(1) {
                    line-height: 22px;
                    font-size: 16px;
                    color: rgb(102, 102, 102);
                }
                .dealer:nth-child(2) {
                    margin-top: 10px;
                }
            }
        }
    }

}
</style>
