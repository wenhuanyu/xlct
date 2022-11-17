// 飞机动画
<template>
    <div class="container">
        <div class="planeImg">
            <ul :class="started">
                <li><img src="../assets/games/6/feiji3.png"></li>
                <li><img src="../assets/games/6/feiji2.png"></li>
                <li><img src="../assets/games/6/feiji1.png"></li>
            </ul>
        </div>
        <div class="plane">
            <img src="../assets/games/6/feiji.png">
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
    .planeImg {
        ul {
            width: 5760px;
            height: 100%;
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
    .plane {
        position: fixed;
        top: 260px;
        right: 22px;
        width: 181px;
        height: 92px;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>
