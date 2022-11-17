// 风车动画
<template>
    <div class="container">
        <div class="windmillBackground">
            <img src="../assets/games/7/fengche.png">
        </div>
        <div class="windmill" :class="started">
            <img src="../assets/games/7/fengchepic.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'game_7',
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
    @keyframes changeright{
        0%{-webkit-transform:rotate(0deg);}
        25%{-webkit-transform:rotate(90deg);}
        50%{-webkit-transform:rotate(180deg);}
        75%{-webkit-transform:rotate(270deg);}
        100%{-webkit-transform:rotate(360deg);}
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
    .windmillBackground {
        width: 1920px;
        height: 100%;
        overflow: hidden;
        position: relative;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .windmill {
        position: fixed;
        top: 229px;
        left: 744px;
        width: 473px;
        height: 476px;
        img {
            width: 100%;
            height: 100%;
        }
        &.started {
            animation:changeright 60s linear infinite;
        }
        &.paused {
            animation:changeright 60s linear infinite;
            animation-play-state: paused;
        }
        &.stop {
            animation: none;
        }
    }
</style>
