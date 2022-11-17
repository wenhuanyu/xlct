<template>
    <div class="breath_content">
        <div class="content_left">
            <div class="content_left_title">呼吸频率</div>
            <div class="breath-column">
                <div class="breath-columnB">
                    <div class="breath-columnM"></div>
                </div>
                <div class="space-20"></div>
                <div class="breath-columnS">
                    <p>呼吸频率</p>
                    <p>{{ frequency }}</p>
                </div>
            </div>
        </div>
        <div class="content_right">
            <div class="game-content">
                <Component v-bind:is="currentGameComponent" class="game-player" ref="gamePlayer" @onPlay="onPlay" @onInverted="onInverted" @onStop="onStop" @onPause="onPause" @onComplete="onComplete"></Component>

                <div class="toolbar">
                    <el-button @click="play">正放</el-button>
                    <el-button @click="inverted">倒放</el-button>
                    <el-button @click="pause">暂停</el-button>
                    <el-button @click="stop">结束</el-button>
                </div>
            </div>
        </div>
        <div class="countDown">
            {{ this.duration.game_time }}s
        </div>
        <audio  :src="duration.music_path" preload="auto" autoplay="autoplay"></audio>
    </div>

</template>

<script>

export default {
    name      : "TerminalGame",
    components: {},
    data() {
        return {
            currentGameComponent: null,
            from:{
                id:''
            },
            duration:{},
            frequency:'',
        };
    },
    computed  : {},
    watch     : {},
    mounted() {
        this.initGame(48);
        this.from=this.$route.query
        this.getInfo()
        this.timer = setInterval(() => {
            if (this.duration.game_time === 0) {
                this.$router.push({name: 'BreathingEnd', query: {id:this.from.id}});
            } else {
                this.duration.game_time--;
                console.log(this.duration.game_time)
            }
        }, 1000)
    },
    destroyed() {
        clearInterval(this.timer)
    },
    methods   : {
        async getInfo() {
            await this.$axios.post('term/breath/info', this.$qs.stringify(this.from)).then(res => {
                console.log(res.data.data.list)
                this.duration = res.data.data.list[3]
                this.frequency = res.data.data.breath_freq
            });
        },
        initGame(id) {
            this.currentGameComponent = () => import('../../games/' + id + '.vue');
        },

        /**
         * 正放
         */
        play() {
            this.$refs.gamePlayer.player.play();
        },

        /**
         * 倒放
         */
        inverted() {
            this.$refs.gamePlayer.player.inverted();
        },


        /**
         * 暂停
         */
        pause() {
            this.$refs.gamePlayer.player.pause();
        },

        /**
         * 停止
         */
        stop() {
            this.$refs.gamePlayer.player.stop();
        },

        /**
         * 开始正放事件
         */
        onPlay() {
            this.$message.info('开始正放');
        },

        /**
         * 开始倒放事件
         */
        onInverted() {
            this.$message.info('开始倒放');
        },

        /**
         * 暂停事件
         */
        onPause() {
            this.$message.info('暂停播放');
        },

        /**
         * 停止事件
         */
        onStop() {
            this.$message.info('停止播放');
        },

        /**
         * 播放完成事件
         */
        onComplete() {
            this.$message.info('播放完成');
        }
    },
}
</script>

<style scoped lang="scss">
.countDown{
    background: url("../../assets/images/countDown.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    width: 300px;
    height: 120px;
    margin-left: -167px;
    font-size: 68px;
    font-weight: 600;
    color: #7A40F2;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.game-content {
    width: 100%;
    height: 100%;
    position: relative;
}

.game-player {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
}

.toolbar {
    padding: 20px;
    position: absolute;
    top: 0;
}


.content_left_content {
    position: relative;
}

.content_left_content_ {
    position: absolute;
    top: 90px;
    left: 145px;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    z-index: 100;
}
.breath-column {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.breath-columnB {
    width: 50%;
    height: 450px;
    background: url('../../assets/images/BreathColumnBig.png') no-repeat;
    background-size: 100% 100%;
    //display: inline-block;
    position: relative;
}

.breath-columnM {
    width: 100%;
    height: 260px;
    background: url('../../assets/images/BreathColumnMiddle.png') no-repeat;
    background-size: 100% 100%;
    //display: inline-block;
    position: absolute;
    top: 70%;
    transform: translateY(-50%);
}

.breath-columnS {
    width: 50%;
    height: 136px;
    background: url('../../assets/images/BreathColumnSmall.png') no-repeat;
    background-size: 100% 100%;
    position: relative;

    p {
        font-size: 20px;
        font-weight: 500;
        color: #333333;
        text-align: center;
        position: relative;
    }

    p:first-child {
        top: 8%;
    }

    p:last-child {
        top: 40%;
    }
}

.content_left_content_loca {
    position: absolute;
    top: 50px;
    left: 130px;
    font-size: 16px;
    font-weight: bold;
    z-index: 100;
    color: #333333;
}

.content_left_title {
    font-size: 24px;
    font-weight: 500;
    color: #333333;
    line-height: 33px;
    margin: 69px 0;
    text-align: center;
}

.breath_content {
    width: 100%;
    height: 100vh;
    background: url('../../assets/images/indexBG.png') no-repeat;
    background-size: 100% 100%;
    padding: 60px 60px 70px;
    display: flex;
}

.content_left {
    width: 17.7%;
    height: 87vh;
    background: #fff;
}

.content_right {
    width: 81.3%;
    height: 87vh;
    background: #fff;
    margin-left: 18px;
}

.content_right img {
    width: 100%;
    height: 100%;
}
</style>
