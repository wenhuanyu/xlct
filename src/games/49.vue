// 太阳升起落下
<template>
    <div class="container">
        <div class="fengzhengImg">
            <img src="../assets/games/49/beijing.png">
        </div>
        <div class="beijing">
            <img src="../assets/games/49/qianbeijing.png">
        </div>
        <div class="yun">
            <img src="../assets/games/49/yun.png">
        </div>
        <div class="taiyang" :class="started">
            <img src="../assets/games/49/taiyang.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'game_6',
        components: {
        },
        data() {
            let that = this;
            return {
                started: '',
                player : {
                    play    : function () {
                        that.started = 'started';
                    },
                    stop    : function () {
                        that.started = 'stop';
                    },
                    pause   : function () {
                        that.started = 'paused';
                    },
                    inverted: function () {
                    }
                }
            }
        },
        created() {
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    @keyframes play  {
        0% {
            transform: translateX(0) translateY(0);
        }
        12.5% {
            transform: translateX(200px) translateY(-200px);
        }
        25% {
            transform: translateX(400px) translateY(-300px);
        }
        37.5% {
            transform: translateX(600px) translateY(-400px);
        }
        50% {
            transform: translateX(800px) translateY(-400px);
        }
        62.5% {
            transform: translateX(1000px) translateY(-400px);
        }
        75% {
            transform: translateX(1200px) translateY(-300px);
        }
        85.5% {
            transform: translateX(1400px) translateY(-200px);
        }
        100% {
            transform: translateX(1600px) translateY(0);
        }
    }
    .container {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
    }
    .fengzhengImg {
        z-index: 1;
        width: 100vw;
        height: 987px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .beijing {
        position: fixed;
        bottom: 0;
        z-index: 4;
        width: 100vw;
        height: 640px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .yun {
        position: fixed;
        top: 50px;
        width: 100vw;
        height: 282px;
        z-index: 2;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .taiyang {
        position: fixed;
        top: 450px;
        left: 100px;
        z-index: 3;
        width: 192px;
        height: 195px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &.started {
            animation: play  60s linear infinite;
        }
        &.paused {
            animation: play  60s linear infinite;
            animation-play-state: paused;
        }
        &.stop {
            animation: none;
        }
    }
</style>
