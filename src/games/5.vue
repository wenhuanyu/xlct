// 小汽车动画
<template>
    <div class="container">
        <div class="background">
            <ul :class="started">
                <li><img src="../assets/games/5/qiche1.png"></li>
                <li><img src="../assets/games/5/qiche2.png"></li>
                <li><img src="../assets/games/5/qiche3.png"></li>
            </ul>
        </div>
        <div class="car">
            <img src="../assets/games/5/car.gif">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'game_5',
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
    @keyframes play {
        from {
            margin-left: 0;
        }
        to {
            margin-left:-3840px;
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
    .background {
        ul {
            width: 5760px;
            height: 100%;
            li {
                width: 1920px;
                height: 100%;
                float:left;
                list-style: none;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            &.started {
                animation: play 60s linear infinite;
            }
            &.paused {
                animation: play 60s linear infinite;
                animation-play-state: paused;
            }
            &.stop {
                animation: none;
            }
        }
    }
    .car {
        position: fixed;
        bottom: 18%;
        left: 300px;
        width: 402px;
        height: 184px;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>
