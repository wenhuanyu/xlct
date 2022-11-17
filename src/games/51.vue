// 呼吸  拉玛泽助产呼吸法  第二步
<template>
    <div class="container">
        <div class="Img" :class="started">
            <img :src="tupian">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'game_51',
        components: {
        },
        data() {
            let that = this;
            return {
                ballSpeed : 24,
                num : 0,
                tupian : '',
                started: '',
                player: {
                    play : function(speed) {
                    console.log("~ speed", speed)
                        that.play(speed);
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
            this.tupian = require('../assets/games/51/1.png')
        },
        methods: {
            dier() {
                clearInterval(this.qiqiuTime)
                this.qiqiuTime = setInterval(()=> {
                    if (this.num < 6 ){
                            this.tupian = require('../assets/games/51/' + (this.num+1) + '.png')
                            this.num++
                    } else {
                        this.num = 0
                        this.tupian = require('../assets/games/51/' + (this.num+1) + '.png')
                    }
                },1000*this.ballSpeed/6)
            },
            play(speed) {
                console.log("~ speed", speed)
                this.ballSpeed = speed
                this.dier()
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
    .Img {
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>