// 追兔子
<template>
    <div class="container">
        <div class="TuImg" :class="started">
            <ul :class="started">
                <li><img src="../assets/games/45/1.png"></li>
                <li><img src="../assets/games/45/2.png"></li>
                <li><img src="../assets/games/45/3.png"></li>
            </ul>
        </div>
        <div class="ren">
            <img src="../assets/games/45/ren.gif">
        </div>
        <div class="tuzi">
            <img src="../assets/games/45/tuzi.gif">
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
    @keyframes play {
        from {
            margin-left: -3840px;
        }
        to {
            margin-left: 0;
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
    .TuImg {
        ul {
            width: 5760px;
            height: 100vh;
            li {
                width: 1920px;
                height: 100%;
                float: left;
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
    .ren {
        position: fixed;
        top: 400px;
        right: 94px;
        width: 292px;
        height: 448px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .tuzi {
        position: fixed;
        top: 500px;
        right: 438px;
        width: 274px;
        height: 348px;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>
