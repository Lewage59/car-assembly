<template>
    <section class="select-group">
        <div class="select-conditions">
            <span class="select-title">价格：</span>
            <ul class="select-conditioin-list">
                <li class="select-conditioin-item selected">不限</li>
                <li class="select-conditioin-item">不限</li>
            </ul>
        </div>
        <!-- <div class="select-conditions">
            <span class="select-title">价格：</span>
            <ul class="select-conditioin-list">
                <li class="select-conditioin-item selected">不限</li>
                <li class="select-conditioin-item">不限</li>
            </ul>
        </div>
        <div class="select-conditions">
            <span class="select-title">价格：</span>
            <ul class="select-conditioin-list">
                <li class="select-conditioin-item selected">不限</li>
                <li class="select-conditioin-item">不限</li>
            </ul>
        </div>
        <div class="select-conditions">
            <span class="select-title">价格：</span>
            <ul class="select-conditioin-list">
                <li class="select-conditioin-item selected">不限</li>
                <li class="select-conditioin-item">不限</li>
            </ul>
        </div> -->
    </section>
</template>

<script>
export default {
    name: 'selectGroup'
};
</script> 

<style lang="less" scoped>
.select-group {
    .select-conditions {
        height: 54px;
        line-height: 54px;
        margin: 0 20px;
        box-sizing: border-box;
        font-size: 14px;
        border-bottom: 1px solid #ededed;
        .select-title {
            color: #666;
        }
        .select-conditioin-list {
            display: inline-block;
            .select-conditioin-item {
                display: inline-block;
                padding: 4px 8px;
                margin: 0 2px;
                line-height: 20px;
                cursor: pointer;
                border-radius: 4px;
                -webkit-transition: all 0.1s ease-in-out;
                transition: all 0.1s ease-in-out;
                &:hover {
                    background: rgba(255, 225, 0, .2);
                }
                &.selected {
                    background-color: #ffe100;
                }
            }
        }
    }
        
}
</style>