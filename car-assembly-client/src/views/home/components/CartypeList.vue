<template>
    <ul class="cartype-list">
        <li 
            class="cartype-item" 
            @click="toLink" v-for="(item, index) in list" 
            :key="index" 
            :style="{'background-position-x': item + 'px'}"></li>
    </ul>
</template>

<script>

const cartypeNumber = 8;

export default {
    name: 'CartypeList',
    data() {
        return {
            list: []
        };
    },
    created() {
        this.initList();
    },
    methods: {
        initList() {
            let position = 0;

            for (let i = 0; i < cartypeNumber; i++) {
                this.list.push(position);
                position -= 149;
            }
        },
        toLink() {
            console.log(1);
        }
    }
};
</script>

<style lang="less">
.cartype-list {
    display: inline-block;
    margin-top: 16px;
    margin-bottom: 16px;
    height: 56px;
    .cartype-item {
        display: inline-block;
        width: 149px;
        height: 56px;
        background-repeat: no-repeat;
        background-image: url('~@/assets/logo/car-model.png');
        background-size: 1196px 112px;
        background-position: -0px 0px;
        cursor: pointer;
        &:hover {
            background-position-y: -56px;
        }
    }
}
</style>