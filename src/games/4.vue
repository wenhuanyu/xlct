// 过桥动画
<template>
    <div class="container">
        <div class="background">
            <ul :class="started">
                <li><img src="../assets/games/4/qiao3.png"></li>
                <li><img src="../assets/games/4/qiao2.png"></li>
                <li><img src="../assets/games/4/qiao1.png"></li>
            </ul>
        </div>
        <div class="qiao">
            <img src="../assets/games/4/qiao.gif">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'game_4',
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
            margin-top:-2160px;
        }
        to {
            margin-top:0;
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
            width: 100%;
            height: 3240px;
            li {
                width: 100%;
                height: 1080px;
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
    .qiao {
        position: fixed;
        top: 50%;
        left: 1020px;
        width: 52px;
        height: 128px;
        img {
            width: 100%;
            height: 100%;
        }
    }

</style>
