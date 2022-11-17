// 倒计时
<template>
    <div class="countdownBox">
        <div class="time">
            {{vdtText}}s
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            "vdtText"
        ],
        data() {
            return {}
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .countdownBox {
        position: fixed;
        top: 0;
        left: 783px;
        width: 354px;
        height: 128px;
        background: url(../assets/images/bianzu1.png) no-repeat center center / 100% 100%;
        padding-top: 22px;
        line-height: 95px;
        font-size: 68px;
        font-weight: 600;
        color: #F5605A;
        text-align: center;
    }
</style>