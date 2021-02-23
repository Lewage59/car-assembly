<template>
    <div class="car-assembly app-container">
        <el-container>
            <el-container>
                <el-header height="140px">
                    <el-steps :active="activeSteps" align-center>
                        <el-step title="基本参数">
                            <template v-slot:description>
                                <el-card shadow="never" :body-style="cardStyle">
                                    从不显示<br/>
                                    从不显示<br/>
                                    从不显示
                                </el-card>
                            </template>
                        </el-step>
                        <el-step title="底盘转向">
                            <template v-slot:description>
                                <el-card shadow="never" :body-style="cardStyle">
                                    从不显示
                                </el-card>
                            </template>
                        </el-step>
                        <el-step title="变速箱">
                            <template v-slot:description>
                                <el-card shadow="never" :body-style="cardStyle">
                                    从不显示
                                </el-card>
                            </template>
                        </el-step>
                        <el-step title="内置配置">
                            <template v-slot:description>
                                <el-card shadow="never" :body-style="cardStyle">
                                    从不显示
                                </el-card>
                            </template>
                        </el-step>
                        <el-step title="安全装备">
                            <template v-slot:description>
                                <el-card shadow="never" :body-style="cardStyle">
                                    从不显示
                                </el-card>
                            </template>
                        </el-step>
                        <el-step title="发动机">
                            <template v-slot:description>
                                <el-card shadow="never" :body-style="cardStyle">
                                    从不显示
                                </el-card>
                            </template>
                        </el-step>
                        <el-step title="车轮/制动">
                            <template v-slot:description>
                                <el-card shadow="never" :body-style="cardStyle">
                                    从不显示
                                </el-card>
                            </template></el-step>
                        </el-steps>
                </el-header>
                <el-main>
                    <car-model ref="carModel" :modelStatus="modelStatus" />
                </el-main>
            </el-container>
            <el-aside width="230px">
                <el-button-group class="step-button-group">
                    <el-button type="primary" icon="el-icon-arrow-left" @click="preSteps">上一步</el-button>
                    <el-button type="primary" @click="nextSteps">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
                <el-button type="primary" class="save-button">保存</el-button>
                <ul class="param-list">
                    <li v-for="i in 10" :key="i" class="param-item">
                        <el-card shadow="hover">
                        {{i}}
                        </el-card>
                    </li>
                </ul>
                <el-pagination layout="total, prev, next" :total="50"></el-pagination>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
import CarModel from '@/components/CarModel';
import {nextTick} from 'vue';

// 各步骤执行工作
const modelParam = ['basicParam', 'chassis', 'gearbox', 'inconfig', 'safety', 'engine', 'wheel'];

export default {
    name: 'car-assembly',
    data() {
        return {
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
            modelParts: {}
        };
    },
    components: {
        CarModel
    },
    methods: {
        preSteps() {
            this.modelStatus[modelParam[this.activeSteps]] = false;

            if (this.activeSteps) {
                this.activeSteps--;
            }

            this.$refs.carModel.changeCarModel();
        },
        nextSteps() {
            this.modelStatus[modelParam[this.activeSteps]] = true;

            if (this.activeSteps++ > 7) {
                this.activeSteps = 0;
            }
            
            this.$refs.carModel.changeCarModel();
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
        overflow: hidden;
        .param-item {
            margin: 5px;
        }
    }
}
</style>