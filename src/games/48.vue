// 放风筝的小男孩
<template>
    <div class="container">
        <div class="fengzhengImg" >
            <div class="fengzheng" :class="started">
                <img src="../assets/games/48/fengzheng.png">
            </div>
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
    @keyframes donghua {
        0%{-webkit-transform:rotate(0deg);}
        25%{-webkit-transform:rotate(10deg);}
        50%{-webkit-transform:rotate(20deg);}
        75%{-webkit-transform:rotate(10deg);}
        100%{-webkit-transform:rotate(0deg);}
    }
    .container {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: url(../assets/games/48/beijing.png) no-repeat center center / 100% 100%
    }
    .fengzhengImg {
        position: relative;
        width: 100%;
        height: 100%;
        .fengzheng {
            //margin-top: 18%;
            //margin-left: 24%;
            position: absolute;
            top: 34%;
            left: 26%;
            width: 37%;
            height: 50%;
            -webkit-transform-origin: 100% 100% 0;
            transform-origin: 100% 100% 0;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            &.started {
                animation:donghua 60s linear infinite;
            }
            &.paused {
                animation:donghua 60s linear infinite;
                animation-play-state: paused;
            }
            &.stop {
                animation: none;
            }
        }
    }
</style>
