// 热气球动画
<template>
    <div class="container">
        <div class="balloonImg" >
            <ul :class="started">
                <li><img src="../assets/games/3/beijing6.jpg"></li>
                <li><img src="../assets/games/3/beijing5.jpg"></li>
                <li><img src="../assets/games/3/beijing4.jpg"></li>
                <li><img src="../assets/games/3/beijing3.jpg"></li>
                <li><img src="../assets/games/3/beijing2.jpg"></li>
                <li><img src="../assets/games/3/beijing1.jpg"></li>
            </ul>
        </div>
        <div class="qiqiu">
            <img src="../assets/games/3/reqiqiu.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'game_3',
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
        computed: {
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
            margin-top:-5400px;
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
    .balloonImg {
        ul {
            width: 100%;
            height: 6480px;
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
    .qiqiu {
        position: fixed;
        top: 494px;
        left: 899px;
        width: 223px;
        height: 323px;
        img {
            width: 100%;
            height: 100%;
        }
    }

</style>
