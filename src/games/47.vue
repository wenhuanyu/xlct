// 吹气球
<template>
    <div class="container">
        <div class="qiqiuImg" :class="started">
            <div class="qiqiu">
                <img :src="tupian">
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
                num : 0,
                tupian : '',
                started: '',
                player: {
                    play : function() {
                        that.play();
                    },
                    pause : function() {
                        that.pause();
                    },
                    stop : function() {
                        // that.pause();
                    },
                    inverted : function() {

                    }
                }
            }
        },
        created() {
            this.tupian = require('../assets/games/47/1.png')
        },
        methods: {
            qiqiu() {
                clearInterval(this.qiqiuTime)
                this.qiqiuTime = setInterval(()=> {
                    if (this.num < 6 ){
                            this.tupian = require('../assets/games/47/' + (this.num+1) + '.png')
                            this.num++
                    } else {
                        this.num = 0
                        this.tupian = require('../assets/games/47/' + (this.num+1) + '.png')
                    }
                },800)
            },
            play() {
                this.qiqiu()
            },
            pause () {
                clearInterval(this.qiqiuTime)
            }
        }
    }
</script>

<style lang="scss" scoped>
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
    .qiqiuImg {
        width: 100vw;
        height: 100vh;
        background: url(../assets/games/47/beijing.png) no-repeat center center / 100% 100%;
        .qiqiu {
            margin-left: 400px;
            margin-top: 42px;
            width: 1063px;
            height: 982px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
</style>
