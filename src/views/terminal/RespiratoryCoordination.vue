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
            <div class="content_right_title">呼吸协调训练</div>
            <div class="con-r">
                <div class="circle" :style="{ animationDuration: ballSpeed +'s' }"></div>
                <div class="con-r-top">
                    <div class="pinkB-bg1">
                        <div class="pinkS-bg1"></div>
                    </div>
                    <div class="pinkB-bg1">
                        <div class="pinkS-bg1"></div>
                    </div>
                    <div class="pinkB-bg1">
                        <div class="pinkS-bg1"></div>
                    </div>
                    <div class="pinkB-bg1">
                        <div class="pinkS-bg1"></div>
                    </div>
                </div>
                <div class="con-r-btm">
                    <div class="pinkB-bg">
                        <div class="pinkS-bg"></div>
                    </div>
                    <div class="pinkB-bg">
                        <div class="pinkS-bg"></div>
                    </div>
                    <div class="pinkB-bg">
                        <div class="pinkS-bg"></div>
                    </div>
                    <div class="pinkB-bg">
                        <div class="pinkS-bg"></div>
                    </div>
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
    name: "RespiratoryCoordination",
    data(){
        return{
            from:{
                id:''
            },
            duration:{},
            frequency:'',
            ballSpeed:''
        }
    },
    mounted() {
        this.from=this.$route.query
        this.getInfo()
        this.timer = setInterval(() => {
            if (this.duration.game_time === 0) {
                this.$router.push({name: 'TerminalGame', query: {id: this.from.id}});
            } else {
                this.duration.game_time--;
                console.log(this.duration.game_time)
            }
        }, 1000)
    },
    destroyed() {
        clearInterval(this.timer)
    },
    methods: {
        async getInfo() {
            await this.$axios.post('term/breath/info', this.$qs.stringify(this.from)).then(res => {
                console.log(res.data.data.list.game_time)
                this.duration = res.data.data.list[2]
                this.frequency = res.data.data.breath_freq
                this.ballSpeed = res.data.data.ball_speed
            });
        },
    }
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
.content_right_title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: bold;
    color: #333333;
    margin: 60px 0;
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

.con-r {
    position: relative;
    top: 30%;
    transform: translateY(-50%);
}

.con-r-top {
    width: 100%;
    float: right;
}

.pinkB-bg {
    width: 10%;
    height: 179px;
    background: url('../../assets/images/pinkB.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 10%;
    display: inline-block;
}

.pinkS-bg {
    width: 100%;
    height: 145px;
    background: url('../../assets/images/pinkS.png') no-repeat;
    background-size: 100% 100%;
    display: inline-block;
}

.pinkB-bg1 {
    width: 10%;
    height: 179px;
    background: url('../../assets/images/pinkB1.png') no-repeat;
    background-size: 100% 100%;
    margin-right: 10%;
    display: inline-block;
    float: right;
}

.pinkS-bg1 {
    width: 100%;
    height: 145px;
    background: url('../../assets/images/pinkS1.png') no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    margin-top: 22%;
}

.circle {
    width: 24px;
    height: 24px;
    background: linear-gradient(180deg, #67F7D1 0%, #A6FFB5 100%);
    border-radius: 50%;
    animation: circle linear infinite;
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(-50%, -50%);
}

@keyframes circle {
    0% {
        transform: translateY(0px) translateX(0px);
    }

    12.5% {
        transform: translateY(130px) translateX(60px);

    }

    25% {
        transform: translateY(-150px) translateX(195px)
    }

    37.5% {
        transform: translateY(130px) translateX(360px)
    }

    50% {
        transform: translateY(-150px) translateX(490px)
    }

    62.5% {
        transform: translateY(130px) translateX(640px)
    }

    75% {
        transform: translateY(-150px) translateX(800px)
    }

    87.5% {
        transform: translateY(130px) translateX(940px)
    }

    100% {
        transform: translateY(-150px) translateX(1080px)
    }
}
</style>
