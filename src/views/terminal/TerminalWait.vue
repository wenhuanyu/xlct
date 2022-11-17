<template>
    <div class="terminal-wait">
        <div class="sheet">
            <div class="sheet-item">
                <h3>个人信息：</h3>
                <div class="user-info">
                    <div class="user-item">
                        <p>姓名：</p>
                        <span>{{ patientInfo.name }}</span>
                    </div>
                    <div class="user-item">
                        <p>病历号：</p>
                        <span>{{ patientInfo.medical_num }}</span>
                    </div>
                    <div class="user-item">
                        <p>年龄：</p>
                        <span>{{ patientInfo.age }}</span>
                    </div>
                    <div class="user-item">
                        <p>医保号：</p>
                        <span>{{ patientInfo.medical_insurance_num }}</span>
                    </div>
                    <div class="user-item">
                        <p>患者来源：</p>
                        <span>{{ patientInfo.source }}</span>
                    </div>
                    <div class="user-item">
                        <p>入院时间：</p>
                        <span>{{ patientInfo.in_time }}</span>
                    </div>
                </div>
            </div>
            <div class="sheet-item">
                <h3>任务信息：</h3>
                <div class="user-item">
                    <span>{{ nowExam.name }} </span>
                </div>
            </div>
            <div class="sheet-item">
                <h3>指导语：</h3>
                <div class="instructions">
                    <div v-html="nowExam.zhidaoyu"></div>
                </div>
            </div>

            <div class="start-button-wrap">
                <div class="button" v-html="btnText" @click="toAnswer"></div>
            </div>
        </div>
        <div class="mask" v-if="started">
            <div><img src="../../assets/images/terminal.png" alt="">{{ terminal_name }}</div>
            <img src="../../assets/images/terminal-wait.gif" alt="">
            <p>等待分配任务</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "TerminalWait",
    data() {
        return {
            ip: '',
            terminal_name: '',
            started: false,
            examInfo: {},
            patientInfo: {},
            nowExam: {},
            practiceType: '',
            btnText: '',
            exam_id: '',
            patient_id:'',
        };
    },
    computed: {},
    watch: {},
    methods: {
        async getInfo() {
            console.log('getinfo')
            let params = {
                terminal_id: this.$store.state.user.terminal.userInfo.uid,
                test_paper_id: this.$route.query.test_paper_id || ''
            };

            await this.$axios.post('term/index/user', this.$qs.stringify(params)).then(res => {
                if (res.data.code === 1) {
                    this.examInfo = res.data.data;
                    this.patientInfo = res.data.data.patient;
                    this.nowExam = res.data.data.exam
                    this.exam_id = res.data.data.exam_id
                    this.patient_id = res.data.data.patient_id
                    this.$store.commit('setTerminalProfile', res.data.data);
                    this.started = false;
                    this.practiceType = res.data.data.practice_type;
                    console.log('res.data.data',res.data.data)
                    this.$store.commit('setPracticeType',res.data.data.practice_type)

                    let obj = {
                        limit_Time: res.data.data.exam.limit_time,
                        examInfo: this.examInfo,
                        patientInfo: this.patientInfo,
                        nowExam: this.patientInfo,
                        exam_id: this.exam_id,
                        patient_id:this.patient_id,
                        started: this.started,
                        practiceType: this.practiceType,
                        music_path: res.data.data.music_path,
                        music_time: res.data.data.music_time,
                        music_name: res.data.data.music_name,
                        music_cover: res.data.data.music_cover,
                        test_paper_id: res.data.data.exam.test_paper_id,
                        question_id:res.data.data.question_id
                    }
                    this.$store.commit('setExamObj',obj)

                    switch (res.data.data.practice_type) {
                        // 评测
                        case 1:
                            this.btnText = '开始评测';
                            break;
                        // 呼吸
                        case 2:
                            this.btnText = '开始训练';
                            break;
                        // 情绪
                        case 3:
                            this.btnText = '开始训练';
                            break;
                    }

                } else {
                    this.$store.commit('setTerminalProfile', {});
                    this.terminal_name = res.data.data.name;
                    this.started = true;
                }

                this.exam_id = res.data.data.exam_id
            });

            // await this.$axios.post('term/breath/info', this.$qs.stringify({id:this.exam_id})).then(res => {
            //     if (res.data.code === 1) {
            //         console.log(res)
            //     }
            //
            //     // this.nowExam     = res.data.data;
            // });
        },

        toAnswer() {

            switch (this.practiceType) {
                // 评测
                case 1:
                    if (this.$route.query.test_paper_id) {
                        this.$router.push({
                            name: 'TerminalAnswer',
                            query: {
                                patient_id:this.patient_id,
                                test_paper_id: this.$route.query.test_paper_id,
                                type: this.practiceType
                            }
                        });
                    } else {
                        this.$router.push({name: 'TerminalAnswer'});
                    }
                    break;
                // 情绪训练
                case 3:
                    //通知服务器开始
                    this.$axios.post('term/index/start', this.$qs.stringify({
                        exam_id: this.exam_id,
                        practice_type: this.practiceType
                    })).then(res => {
                        console.log(res.data.info)
                        this.$router.push({
                            name: 'EmotionGame',
                            query: {
                                id: this.exam_id,
                                practice_type: this.practiceType
                            }
                        })
                    });


                    break;
            }

            console.log(this.practiceType)
        }
    },

    async mounted() {
        let that = this
        this.$bus.$on('event',function(){
           that.started = true
           that.nowExam ={}
           that.patientInfo={}
       })
        await this.getInfo();
    }
}
</script>
<style scoped lang="scss">
.terminal-wait {
    width: 100vw;
    height: 100vh;
    background-image: url(../../assets/images/terminal-bg.png);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.sheet {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1702px;
    height: 893px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.69) 0%, #ffffff 100%);
    padding: 150px 200px;
}

.sheet-item {
    display: flex;
    margin-bottom: 60px;

    > h3 {
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
        width: 5em;
        text-align: right;
        margin-right: 70px;
        flex-shrink: 0;
    }
}

.user-info {
    display: flex;
    flex-wrap: wrap;
    font-size: 24px;
    color: #333333;
}

.user-item {
    width: 50%;
    margin-bottom: 30px;

    > p {
        display: inline;
    }

    > span {
        color: #7A40F2;
        font-size: 24px;
    }
}

.start-button-wrap {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    .button {
        width: 222px;
        height: 78px;
        background: linear-gradient(180deg, #AF88FF 0%, #7A40F2 100%);
        box-shadow: 0px 6px 0px 0px #601FE6;
        border-radius: 34px 35px 35px 34px;
        line-height: 78px;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: #FFFFFF;
        cursor: pointer;
    }

}

.instructions {
    color: #7A40F2;
    font-size: 24px;
    height: 6em;
    overflow-y: auto;
}

.mask {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .8);
    z-index: 10000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > img {
        width: 273px;
        height: 226px;
    }

    > p {
        margin-top: 40px;
        color: #ffffff;
        font-size: 36px;
    }

    > div {
        width: 291px;
        height: 75px;
        background: #ffffff;
        border-radius: 45px;
        font-size: 32px;
        color: #333333;
        padding: 16px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 60px;

        > img {
            width: 36px;
            height: 36px;
            margin-right: 20px;
        }

        > span {
            color: #7A40F2;
            font-size: 48px;
            margin: 0 5px;
        }
    }
}
</style>
