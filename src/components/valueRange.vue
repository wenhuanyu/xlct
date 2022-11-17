// 左上角阈值范围
<template>
    <div class="valueRangeBox">
        <div class="rectangular">
            {{physiology_param}} {{attention}}
        </div>
        <div class="threshold">
            <div class="thresholdScope">
                阈值范围
            </div>
            <div class="thresholdValue">
                <div class="left">{{start_value}}</div>
                <div class="right">/{{end_value}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            "start_value",
            "physiology_param",
            "end_value",
            "attention"
        ],
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .valueRangeBox {
        z-index: 10;
        position: fixed;
        top: 0;
        width: 327px;
        height: 110px;
        background: url(../assets/images/juxing.png) no-repeat center center / 100% 100%;
        overflow: hidden;
        font-size: 16px;
        display: flex;
        .rectangular {
            width: 142px;
            height: 50px;
            background: #1473FF;
            border: 1px solid #1473FF;
            margin-top: 30px;
            margin-left: 30px;
            padding-left: 15px;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 50px;
        }
        .threshold {
            margin-left: 14px;
            margin-top: 33px;
        }
        .thresholdScope {
            height: 22px;
            font-size: 16px;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 22px;
        }
        .thresholdValue {
            margin-top: 4px;
            font-weight: 400;
            display: flex;
            .left {
                color: #1473FF;
            }
            .right {
                color: #FFFFFF;
            }
        }
    }
</style>
