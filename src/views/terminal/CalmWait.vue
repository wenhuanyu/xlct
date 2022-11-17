<template>
  <div class="terminal-bg">
      <bluetooth
              @onReceive="onReceive"
              @onInstability="onInstability"
              @onNoData="onNoData"
              @onError="onError"
              @onConnected="onConnected"
              ref="bluetooth"></bluetooth>
      <div class="terminal-bg-content flex flex-col">
          <div class="step-1 flex flex-col flex-grow1" v-if="step1">
              <div class="flex flex-col flex-grow1 height-0 flex-justify-content-end">
                  <h1 class="text-center flex flex-self-center text-no-bold size-22" v-if="!canStart">请戴好头戴点击进入静息期</h1>
                  <h1 class="text-center flex flex-self-center text-no-bold size-22" v-if="canStart">已戴好头戴，请开始</h1>
                  <div class="space-50"></div>
              </div>
              <div class="flex flex-col flex-grow1 height-0 flex-justify-content-end">
                  <el-button class="terminal-btn terminal-btn-primary flex flex-self-center" :disabled="!canStart" @click="start">进入静息期</el-button>
                  <div class="space-20"></div>
                  <el-button plain @click="out">退出</el-button>
                  <div class="space-50"></div>
                  <div class="space-50"></div>
              </div>
          </div>

          <div class="step-2 flex flex-col flex-grow1 flex-justify-content-center" v-if="step2">
              <div class="flex flex-col flex-self-center flex-child-center">
                  <div class="space-5"></div>
              </div>
              <div>
                  <div class="yuan flex flex-justify-content-center flex-child-center">
                      <div class="bj">
                          <img :src="music_cover">
                      </div>

                      <div class="ej">
                          <img src="../../assets/games/gameRelated/ej.png">
                      </div>
                  </div>

                  <div class="music-name">
                      <div class="mess" v-if="isShow">
                          <p>{{ prompt_message }}</p>
                      </div>
                      <div class="mingzi"><b>静息期</b>&nbsp;&nbsp;&nbsp;{{ music_name }}</div>
                  </div>
              </div>
              <audio
                  ref="audio"
                  :src="music_path"
                  preload="auto"
                  controls
                  autoplay="autoplay"
                  style="display: none"></audio>
              <!-- 倒计时 -->
              <div class="countDown">
                  {{ music_time }}s
              </div>
          </div>

          <div class="end-background" v-if="step3">
              <div class="box">
                  <div class="beijing">
                      测评结束
                  </div>
                  <div class="time">{{times}}s后自动关闭...</div>
                  <div class="button" @click="breath_end">
                      结束
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Bluetooth from "../../components/Bluetooth";

export default {
    name      : "CalmWait",
    components: {Bluetooth},
    data() {
        return {
            step1   : true,
            step2   : false,
            step3   : false,
            canStart: false,
            dataList: [],
            music_path :'',
            music_time : '',
            music_name :'',
            music_cover :'',
            times : 10,
            isShow:true,
            prompt_message:''
        };
    },

    mounted() {
        // 初始化蓝牙组件
        this.$refs.bluetooth.init();
    },

    methods: {
        //结束按钮点击事件
        breath_end() {
            this.$router.push({name: "TerminalWait"})
        },
        //结束页面倒计时
        jieshu() {
            clearInterval(this.shijian);
            this.shijian = setInterval(() => {
                this.times--;
                if (this.times <= 0) {
                    this.breath_end()
                    clearInterval(this.shijian);
                }
            }, 1000);
        },
        /**
         * 退出
         */
        out() {
            this.$router.push({name: "TerminalWait"})
        },


        /**
         * 开始
         */
        start() {
            this.step1 = false;
            this.step3 = false;
            this.step2 = true;
            this.music_path = this.$route.query.music_path
            this.music_time = this.$route.query.music_time
            this.music_name = this.$route.query.music_name,
            this.music_cover = this.$route.query.music_cover,
            this.prompt_message = this.$route.query.prompt_message
            if(this.prompt_message == ''){
                this.isShow = false
            }
            this.daojishi()
        },
        /**
         *  倒计时
         */
        daojishi() {
            clearInterval(this.time);
            this.time = setInterval(() => {
                this.music_time--;
                if (this.music_time <= 0) {
                    this.step3   = true
                    this.step2   = false
                    this.step1   = false;
                    this.jieshu()
                    clearInterval(this.time);
                    return;
                }
            }, 1000);
        },
        /**
         * 收到数据
         * @param {string} data 原始数据
         * @param {[number]} parse 解析后的数据
         */
        onReceive(data, parse) {
            this.$refs.bluetooth.hideLoading();
            this.canStart = true;
            // 静息期数据采集中
            if (this.step2) {
                this.resume();
                if (this.dataList.length >= 5) {
                    console.log(this.dataList);
                    let profile   = this.$store.state.user.terminal.profile || {};
                    let params    = {
                        exam_id   : profile.exam_id || '',
                        patient_id: (profile.patient || {}).id || '',
                        data      : JSON.stringify(this.dataList),
                        practice_type : 1
                    };
                    this.dataList = [];
                    this.$axios.post('term/rest_data/upload', this.$qs.stringify(params)).then(res => {
                    });
                } else {
                    this.dataList.push(data);
                }
            }
        },

        /**
         * 未戴好设备
         */
        onInstability() {
            console.log('未戴好设备');
            this.$message.error('未戴好设备');
            if (this.step2) {
                this.pause();
            }
        },
        /**
         * 暂停
         */
        pause() {
            if (this.isPause) {
                return;
            }
            this.isPause = true;
            if (this.$refs.audio) {
                if (this.isPlaying) {
                    this.$refs.audio.pause();
                    this.isPlaying = false
                }
            }
            clearInterval(this.time);
        },
        /**
         * 继续
         */
        resume() {
            if (this.isPause) {
                this.isPause = false;
                return;
            }
            this.daojishi()
            if (this.$refs.audio) {
                if (!this.isPlaying) {
                    this.$refs.audio.play();
                    this.isPlaying = true
                }
            }
        },
        /**
         * 无数据
         */
        onNoData() {
            console.log('未匹配到数据');
        },

        /**
         * 连接失败
         */
        onError() {
            console.log('连接失败');
            this.canStart = false;
            this.step1    = true;
            this.step2    = false;
            this.step3    = false;
        },

        /**
         * 已连接成功
         */
        onConnected() {
            console.log('已连接成功');
            this.$refs.bluetooth.showLoading('正在初始化...');
        }
    },
}
</script>
<style scoped lang="scss">
@-webkit-keyframes changeright {
    0% {
        -webkit-transform: rotate(0deg);
    }
    25% {
        -webkit-transform: rotate(90deg);
    }
    50% {
        -webkit-transform: rotate(180deg);
    }
    75% {
        -webkit-transform: rotate(270deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}
.mess {
    display: flex;
    margin: 0 auto 20px;
    width: 800px;
    padding: 10px 0;
    border-top: 1px solid red;
    border-bottom: 1px solid red;
    color: red;
    font-size: 25px;
    justify-content: center;
    align-items: center;
    text-align: initial;

    //p:nth-of-type(1) {
    //    margin-bottom: 29px;
    //}

    p{
        font-size: 21px;
        line-height: 31px;
        overflow: scroll;
    }
}
.yuan {
    width: 392px;
    height: 392px;
    background-color: #000000;
    border-radius: 50%;
    box-shadow: 0 2px 10px 0 #1E87F0;
    margin: 50px auto;
    position: relative;

    .bj {
        margin: 89px auto;
        width: 214px;
        height: 214px;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            -webkit-animation: changeright 30s linear infinite;
        }
    }

    .ej {
        width: 99px;
        height: 150px;
        position: absolute;
        top: -70px;
        left: 200px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}

.music-name {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    bottom: 11%;
    font-size: 28px;
    line-height: 40px;

    .leixing {
        font-weight: 600;
        color: #333333;
        margin-right: 35px;
    }

    .mingzi {
        font-weight: 400;
        color: #666666;
    }
}
.terminal-btn-primary {
    background: linear-gradient(180deg, #C9E3F9 0%, #3D97F1 100%) !important;
    box-shadow: 0 5px 0 #0044A9;
}
// 倒计时
.countDown {
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
    color: #1E87F0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.end-background {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .box {
        .beijing {
            width: 629px;
            height: 302px;
            margin: 162px auto;
            background: url(../../assets/games/gameRelated/taiyang.png) no-repeat center center / 100% 100%;
            font-size: 77px;
            font-weight: bold;
            color: #1E87F0;
            line-height: 114px;
            padding-top: 133px;
            padding-left: 152px;
        }

        .time {
            font-size: 36px;
            font-weight: bold;
            color: #1E87F0;
            line-height: 54px;
            margin-top: 190px;
            text-align: center;
        }

        .button {
            width: 223px;
            height: 71px;
            background: linear-gradient(180deg, #C9E3F9 0%, #3D97F1 100%);
            box-shadow: 0px 6px 0px 0px #0044A9;
            border-radius: 34px 35px 35px 34px;
            text-align: center;
            line-height: 71px;
            font-size: 27px;
            font-weight: bold;
            color: #ffffff;
            margin: 30px auto;
            cursor: pointer;
        }
    }
}
</style>
