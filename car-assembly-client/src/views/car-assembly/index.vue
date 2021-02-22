<template>
    <div class="car-assembly">
        <el-container>
            <el-container>
                <el-header height="140px">
                    <el-steps :active="activeSteps" align-center>
                        <el-step title="步骤1">
                            <template v-slot:description>
                                <el-card shadow="never">
                                    从不显示
                                </el-card>
                            </template>
                        </el-step>
                        <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                        <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                        <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                        <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                        <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                        <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                        <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                    </el-steps>
                </el-header>
                <el-main>
                    <!-- <car-model /> -->
                </el-main>
            </el-container>
            <el-aside width="230px">
                <el-button-group class="step-button-group">
                    <el-button type="primary" icon="el-icon-arrow-left" @click="preSteps">上一步</el-button>
                    <el-button type="primary" @click="nextSteps">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
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

export default {
    name: 'car-assembly',
    data() {
        return {
            activeSteps: 0
        };
    },
    components: {
        // CarModel
    },
    methods: {
        preSteps() {
            if (this.activeSteps) {
                this.activeSteps--;
            }
        },
        nextSteps() {
            if (this.activeSteps++ > 7) {
                this.activeSteps = 0;
            }
        }
    }
};
</script>

<style lang="less">
.car-assembly {
    width: 1200px;
    margin: 30px auto 30px;
    .step-button-group {
        display: flex;
        justify-content: center;
        width: 100%;
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