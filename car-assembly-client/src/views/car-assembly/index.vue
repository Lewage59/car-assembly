<template>
    <div class="car-assembly app-container">
        <el-container>
            <el-container>
                <el-header height="140px">
                    <el-steps :active="activeSteps" align-center finish-status="success">
                        <el-step title="基本参数">
                            <template v-slot:description v-if="modelParts.basicParam">
                                <el-popover
                                    placement="right-start"
                                    :width="200"
                                    trigger="hover">
                                    <template #reference>
                                        <el-card shadow="never" :body-style="cardStyle">
                                            <p>{{modelParts.basicParam.level}}</p>
                                            <p>{{modelParts.basicParam.bodyStructure}}</p>
                                            <p>{{modelParts.basicParam.maxSpeed}}</p>
                                        </el-card>
                                    </template>
                                    <ul class="part-list">
                                        <li 
                                            class="param-item" 
                                            v-for="key in Object.keys(partsKeyToText['basicParam'])" 
                                            :key="key">{{keyAndValueCard(key, modelParts.basicParam, 'basicParam')}}</li>
                                    </ul>
                                </el-popover>
                            </template>
                        </el-step>
                        <el-step title="底盘转向">
                            <template v-slot:description v-if="modelParts.chassis">
                                <el-popover
                                    placement="right-start"
                                    :width="200"
                                    trigger="hover">
                                    <template #reference>
                                        <el-card shadow="never" :body-style="cardStyle">
                                            <p>{{modelParts.chassis.driveMethod}}</p>
                                            <p>{{modelParts.chassis.assistType}}</p>
                                            <p>{{modelParts.chassis.bodyStructure}}</p>
                                        </el-card>
                                    </template>
                                    <ul class="part-list">
                                        <li 
                                            class="param-item" 
                                            v-for="key in Object.keys(partsKeyToText['chassis'])" 
                                            :key="key">{{keyAndValueCard(key, modelParts.chassis, 'chassis')}}</li>
                                    </ul>
                                </el-popover>
                            </template>
                        </el-step>
                        <el-step title="变速箱">
                            <template v-slot:description v-if="modelParts.gearbox">
                                <el-popover
                                    placement="right-start"
                                    :width="200"
                                    trigger="hover">
                                    <template #reference>
                                        <el-card shadow="never" :body-style="cardStyle">
                                            <p>{{modelParts.gearbox.abbreviation}}</p>
                                            <p>{{modelParts.gearbox.gearboxType}}</p>
                                            <p>{{modelParts.gearbox.gearNum}}</p>
                                        </el-card>
                                    </template>
                                    <ul class="part-list">
                                        <li 
                                            class="param-item" 
                                            v-for="key in Object.keys(partsKeyToText['gearbox'])" 
                                            :key="key">{{keyAndValueCard(key, modelParts.gearbox, 'gearbox')}}</li>
                                    </ul>
                                </el-popover>
                            </template>
                        </el-step>
                        <el-step title="内置配置">
                            <template v-slot:description v-if="modelParts.inconfig">
                                <el-popover
                                    placement="right-start"
                                    :width="200"
                                    trigger="hover">
                                    <template #reference>
                                        <el-card shadow="never" :body-style="cardStyle">
                                            <p>{{modelParts.inconfig.speakerBrand}}</p>
                                            <p>{{modelParts.inconfig.speakerNum}}</p>
                                        </el-card>
                                    </template>
                                    <ul class="part-list">
                                        <li 
                                            class="param-item" 
                                            v-for="key in Object.keys(partsKeyToText['inconfig'])" 
                                            :key="key">{{keyAndValueCard(key, modelParts.inconfig, 'inconfig')}}</li>
                                    </ul>
                                </el-popover>
                            </template>
                        </el-step>
                        <el-step title="安全装备">
                            <template v-slot:description v-if="modelParts.safety">
                                <el-popover
                                    placement="right-start"
                                    :width="200"
                                    trigger="hover">
                                    <template #reference>
                                        <el-card shadow="never" :body-style="cardStyle">
                                            <p>{{modelParts.safety.centralLock}}</p>
                                            <p>{{modelParts.safety.driverSeatAirbag}}</p>
                                            <p>{{modelParts.safety.engineAntiTheft}}</p>
                                        </el-card>
                                    </template>
                                    <ul class="part-list">
                                        <li 
                                            class="param-item" 
                                            v-for="key in Object.keys(partsKeyToText['safety'])" 
                                            :key="key">{{keyAndValueCard(key, modelParts.safety, 'safety')}}</li>
                                    </ul>
                                </el-popover>
                            </template>
                        </el-step>
                        <el-step title="发动机">
                            <template v-slot:description v-if="modelParts.engine">
                                <el-popover
                                    placement="right-start"
                                    :width="200"
                                    trigger="hover">
                                    <template #reference>
                                        <el-card shadow="never" :body-style="cardStyle">
                                            <p>{{modelParts.engine.intakeForm}}</p>
                                            <p>{{modelParts.engine.fuelForm}}</p>
                                            <p>{{modelParts.engine.fuelSupply}}</p>
                                        </el-card>
                                    </template>
                                    <ul class="part-list">
                                        <li 
                                            class="param-item" 
                                            v-for="key in Object.keys(partsKeyToText['engine'])" 
                                            :key="key">{{keyAndValueCard(key, modelParts.engine, 'engine')}}</li>
                                    </ul>
                                </el-popover>
                            </template>
                        </el-step>
                        <el-step title="车轮/制动">
                            <template v-slot:description v-if="modelParts.wheel">
                                <el-popover
                                    placement="right-start"
                                    :width="200"
                                    trigger="hover">
                                    <template #reference>
                                        <el-card shadow="never" :body-style="cardStyle">
                                            <p>{{modelParts.wheel.frontBrakeType}}</p>
                                            <p>{{modelParts.wheel.frontTiresStandard}}</p>
                                            <p>{{modelParts.wheel.parkBrakeType}}</p>
                                        </el-card>
                                    </template>
                                    <ul class="part-list">
                                        <li 
                                            class="param-item" 
                                            v-for="key in Object.keys(partsKeyToText['wheel'])" 
                                            :key="key">{{keyAndValueCard(key, modelParts.wheel, 'wheel')}}</li>
                                    </ul>
                                </el-popover>
                            </template>
                        </el-step>
                    </el-steps>
                </el-header>
                <el-main>
                    <car-model ref="carModel" :modelStatus="modelStatus" />
                </el-main>
            </el-container>
            <el-aside width="230px">
                <el-button-group class="step-button-group">
                    <el-button type="primary" icon="el-icon-arrow-left" @click="preSteps" :disabled="activeSteps === 0">上一步</el-button>
                    <el-button 
                        type="primary" 
                        @click="nextSteps" 
                        :disabled="activeSteps === 7">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
                <el-button type="primary" class="save-button" @click="handleSaveModel" :disabled="activeSteps !== 7">保存</el-button>
                <template v-if="activeSteps < 7">
                    <ul class="param-list" v-if="partsList.length" v-loading="loadingParam">
                        <li v-for="item in partsList" :key="item.id" class="param-item">
                            <el-popover
                                placement="left"
                                :width="200"
                                trigger="hover">
                                <template #reference>
                                    <el-card 
                                        :shadow="modelParts[currPartKey] && item.id === modelParts[currPartKey].id ? 'always' : 'hover'" 
                                        @click="selectPart(item)">
                                        <p 
                                            class="card-text" 
                                            v-for="key in partsDisplay[currPartKey]" 
                                            :key="key">{{keyAndValue(key, item)}}</p>
                                    </el-card>
                                </template>
                                <ul class="part-list">
                                    <li 
                                        class="param-item" 
                                        v-for="key in Object.keys(partsKeyToText[currPartKey])" 
                                        :key="key">{{keyAndValue(key, item)}}</li>
                                </ul>
                            </el-popover>
                        </li>
                    </ul>
                    <el-pagination layout="total, prev, next" :total="50"></el-pagination>
                </template>
                <div class="list-finish" v-else>
                    <i class="el-icon-success"></i>
                    <span class="text">组装完成</span>
                </div>
            </el-aside>
            
            <el-dialog title="保存车型" v-model="dialogFormVisible" :destroy-on-close="destroyDialog">
                <el-form :model="carForm" class="car-form" ref="carForm" :rules="carRules" >
                    <el-form-item label="车型名称" :label-width="formLabelWidth" prop="modelName">
                        <el-input v-model="carForm.modelName" name="modelName" placeholder="请填写车型名称" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年代款" :label-width="formLabelWidth" prop="period">
                        <el-input v-model="carForm.period" name="period" placeholder="请填写车型名称" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitCarInfo">确 定</el-button>
                    </span>
                </template>
            </el-dialog>
        </el-container>
    </div>
</template>

<script>
import CarModel from '@/components/CarModel';
import {getAllCarParam, saveCustomInfo} from '@/api/car';
import {CODE_OK, partsKeyToText} from '@/config';

// 各步骤执行工作
const modelParam = ['basicParam', 'chassis', 'gearbox', 'inconfig', 'safety', 'engine', 'wheel'];
const partsDisplay = {
    basicParam: ['level', 'bodyStructure', 'maxSpeed'], 
    chassis: ['driveMethod', 'assistType', 'bodyStructure'], 
    gearbox: ['abbreviation', 'gearboxType', 'gearNum'],
    inconfig: ['speakerBrand', 'speakerNum'],
    safety: ['centralLock', 'driverSeatAirbag', 'engineAntiTheft'], 
    engine: ['intakeForm', 'fuelForm', 'fuelSupply'], 
    wheel: ['frontBrakeType', 'frontTiresStandard', 'parkBrakeType']
};

export default {
    name: 'car-assembly',
    components: {
        CarModel
    },
    data() {
        return {
            partsKeyToText,
            partsDisplay,
            activeSteps: 0,
            cardStyle: {
                padding: 0
            },
            modelStatus: {
                basicParam: false,
                engine: false,
                gearbox: false,
                chassis: false,
                wheel: false,
                safety: false,
                inconfig: false
            },
            modelParts: {},
            partsList: [],
            showShadow: 'hover',
            modelColor: null,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            carForm: {
                modelName: '',
                period: ''
            },
            destroyDialog: false,
            loadingParam: false,
            carRules: {
                modelName: [{
                    required: true,
                    message: '请填写车型名称',
                    trigger: 'change'
                }],
                period: [{
                    required: true,
                    trigger: 'change',
                    message: '请填写年代款式'
                }]
            }
        };
    },
    computed: {
        currPartKey() {
            return modelParam[this.activeSteps];
        }
    },
    created() {
        this.getAllCarParam();
    },
    methods: {
        preSteps() {
            this.modelStatus[modelParam[this.activeSteps]] = false;

            if (!this.activeSteps) {
                return;
            }

            this.activeSteps--;
            this.$refs.carModel.changeCarModel();
            this.getAllCarParam();
        },
        nextSteps() {
            const $carModel = this.$refs.carModel;

            if (!$carModel) {
                return;
            }

            if (!this.modelParts[modelParam[this.activeSteps]]) {
                this.$message({
                    message: '请组装配件',
                    type: 'warning'
                });
                return;
            }

            this.modelStatus[modelParam[this.activeSteps]] = true;
            this.activeSteps++;
            $carModel.changeCarModel();

            if (this.activeSteps < 7) {
                this.getAllCarParam();
            }
        },
        getAllCarParam() {
            const param = {
                paramType: this.currPartKey
            };

            this.loadingParam = true;
            getAllCarParam(param).then(res=> {
                if (res.code === CODE_OK) {
                    this.partsList = res.data.paramResult;
                }
            }).finally(()=> {
                this.loadingParam = false;
            });
        },
        keyAndValue(key, obj) {
            return partsKeyToText[this.currPartKey][key] + '：' + obj[key];
        },
        keyAndValueCard(key, obj, partName) {
            return partsKeyToText[partName][key] + '：' + obj[key];
        },
        selectPart(item) {
            this.modelParts[this.currPartKey] = item;
        },
        handleSaveModel() {
            this.dialogFormVisible = true;
            this.modelColor = this.$refs.carModel.carColor;
        },
        submitCarInfo() {
            const param = {
                userId: this.$store.getters.userInfo.id,
                exteriorColor: this.modelColor.body,
                interiorColor: this.modelColor.detail + ';' + this.modelColor.glass
            };

            for (const key in this.modelParts) {
                if (Object.hasOwnProperty.call(this.modelParts, key)) {
                    const tmpKey = key + 'Id';

                    param[tmpKey] = this.modelParts[key].id;
                }
            } 

            Object.assign(param, this.carForm);

            this.$refs.carForm.validate(valid=> {
                if (valid) {
                    saveCustomInfo(param).then(res=> {
                        if (res.code === CODE_OK) {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.destroyDialog = true;
                            this.dialogFormVisible = false;
                            this.$router.back();
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="less">
.car-assembly {
    margin: 30px auto 30px;
    .step-button-group {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .save-button {
        width: 206px;
        margin: 15px 12px 0;
    }
    .param-list {
        height: 680px;
        margin-top: 20px;
        overflow: auto;
        font-size: 14px;
        .param-item {
            margin: 5px;
            .is-always-shadow {
                border-color: #409eff;
            }
            .card-text {
                line-height: 24px;
            }
        }
    }
    .list-finish {
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .el-icon-success {
            color: #67c23a;
            font-size: 45px;
        }
        .text {
            font-size: 20px;
            margin-top: 10px;
        }
    }
    .car-form {
        width: 70%;
    }
}
</style>