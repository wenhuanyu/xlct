<template>
    <div class="terminal-bg">
        <div class="sheet">
            <div class="typeface">
                <img src="../../assets/images/zijiada.png" @click="sizeBig">
                <img src="../../assets/images/zijianxiao.png" @click="sizeSmall">
            </div>
            <div class="timer" v-if="time_show">
                <img src="../../assets/images/shijian.png">
                <span>{{ hourString + ':' + minuteString + ':' + secondString }}</span>
            </div>
            <div class="page-count">{{ topic.now }} <span>/{{ topic.total }}</span></div>
            <div style="width: 1450px;height: 600px;overflow-y: auto;">
                <div class="title" id="title" style="font-size: 24px">
                    <h3 v-html="topic.title">
                    </h3>
                </div>
                <div class="options-wrap">
                    <div class="options-list">
                        <!--          v-if="topic.type_id === 1"-->
                        <template v-if="topic.type_id === 1">
                            <el-radio-group v-model="options"
                                            @change="answer"
                                            :class="(topic.answer || '').length > 4 ? 'radio-wrap' : ''"
                                            id="radio" style="font-size: 20px">
                                <el-radio :label="item.id"
                                          v-for="item in topic.answer"
                                          :key="item.id"
                                          :class="(topic.answer || '').length > 4 ? 'radio' : ''"
                                >
                                    {{ item.title }}
                                </el-radio>
                            </el-radio-group>
                        </template>
                        <template v-if="topic.type_id === 7">
                            <el-checkbox-group  v-model="options_"
                                                :class="(topic.answer || '').length > 4 ? 'radio-wrap' : ''"
                                                id="radio" style="font-size: 20px">
                                <el-checkbox :label="item.id"
                                             v-for="item in topic.answer"
                                             :key="item.id"
                                             :class="(topic.answer || '').length > 4 ? 'radio' : ''"
                                >
                                    {{ item.title }}
                                </el-checkbox>
                            </el-checkbox-group >
                        </template>
                        <template v-if="topic.type_id === 5">
                            <el-radio-group v-model="options"
                                            @change="answer"
                                            :class="(topic.answer || '').length > 4 ? 'radio-wrap' : ''"
                                            id="radio" style="font-size: 20px">
                                <el-radio :label="item.id"
                                          v-for="item in topic.answer"
                                          :key="item.id"
                                          :class="(topic.answer || '').length > 4 ? 'radio' : ''"
                                >
                                    {{ item.title }}
                                </el-radio>
                            </el-radio-group>
                            <div class="input">其他：<input type="text" v-model="count"></div>
                        </template>
                        <template v-if="topic.type_id === 9 || topic.type_id === 12">
                            <div v-if="topic.type_id == 12" class="input_line">请填写：<input type="text" v-model="count__"></div>
                            <el-radio-group v-model="options"
                                            :class="(topic.answer || '').length > 4 ? 'radio-wrap' : ''"
                                            id="radio" style="font-size: 20px">
                                <el-radio :label="item.id"
                                          v-for="item in topic.answer"
                                          :key="item.id"
                                          :class="(topic.answer || '').length > 4 ? 'radio' : ''"
                                >
                                    {{ item.title }}
                                </el-radio>
                            </el-radio-group>
                            <div v-if="topic.type_id == 9" class="input">请填写：<input type="text" v-model="count__"></div>
                        </template>
                        <template v-if="topic.type_id === 8">
                            <div class="input_">
                                <input type="text" v-model="count_">
                                <template v-if="topic.answer && topic.answer.length > 0">{{topic.answer[0].title}}</template>
                            </div>
                        </template>
                        <p v-else-if="topic.type_id === 6" v-html="gap">

                        </p>
                        <template v-if="topic.type_id === 3">
                            <div v-for="item in topic.answer">
                                <div v-html="item.title"></div>
                            </div>
                        </template>
                        <template v-if="topic.type_id === 11">
                            <div class="segment_list">
                                <div class="segment">
                                    <div v-html="topic.extend1" class="extend1"></div>
                                    <div v-html="topic.extend2" class="extend2"></div>
                                    <div v-for="(item,index) in topic.answer">
                                        <div class="line_box"></div>
                                        <div v-html="item.title" class="line_text" v-if="item.checked == 0" style="color: #7A40F2" @click="textClick(item,index)"></div>
                                        <div v-html="item.title" class="line_text" v-if="item.checked !== 0" @click="textClick(item,index)"></div>
                                    </div>
                                    <div class="line_box"></div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <img :src="topic.image" alt="" class="options-img" v-if="topic.image" @click="showImage">
                </div>
                <div class="button-wrap">
                    <div class="prev prev1" @click="readTopic">
                        <span>重复语言</span>
                    </div>
                    <div class="prev prev2" style="margin-left: 70px;" @click="prevTopic">
                        <img src="../../assets/images/prev.png" alt="">
                        <span>上一题</span>
                    </div>
                    <div class="prev prev3" style="margin-left: 70px;" @click="nextTopic">
                        <span>下一题</span>
                        <img src="../../assets/images/next.png" alt="">
                    </div>
                    <!--                    <el-button class="skip-question" @click="nextTopic">-->
                    <!--                        <span>跳过</span>-->
                    <!--                        <img src="../../assets/images/skip.png" alt="">-->
                    <!--                    </el-button>-->
                    <div class="prev prev4" style="margin-left: 70px;" @click="endExam">
                        <span>结 束</span>
                        <img src="../../assets/images/submit.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <!--弹出导出-->
        <el-dialog :visible.sync="exportShow" width="30vw" top="30vh" :show-close='false'>
            <img src="../../assets/images/huanying.png" style="display:block;width: 332px;height: 107px; margin: 0 auto;">
            <div slot="footer" class="dialog-footer padding-20 no-padding-left no-padding-right no-padding-top" style="display: flex;justify-content: center;margin-top: 25px;">
                <el-button type="primary" round @click="exportClick">继续答题</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import 'viewerjs/dist/viewer.css'
import $ from 'jquery'
export default {
    name: "TerminalAnswer",
    data() {
        return {
            options: '',
            options_:[],
            examInfo: {},
            topic: {},
            test_paper_id: '',
            titleVoice: '',
            answerVoice: '',
            gap_filling: [],
            gap: '',
            hour: '',
            minute: '',
            second: '',
            promiseTimer: '',
            time_show: true,
            limit_Time: '',
            music_time: '',
            music_path: '',
            music_cover: '',
            music_name: '',
            count: '',
            count_:'',
            count__:'',
            prompt_message: '',
            exportShow:false
        };
    },
    props: {
        // 倒计时间总秒数
        remainTime: {
            default: '1800'
        }
    },
    computed: {
        hourString() {
            return this.formatNum(this.hour)
        },
        minuteString() {
            return this.formatNum(this.minute)
        },
        secondString() {
            return this.formatNum(this.second)
        }
    },
    watch: {},
    async mounted() {
        await this.getExam();
        await this.startAnswer();
        await this.getTopic();
        this.readTopic();

        if (this.remainTime > 0) {
            this.hour = Math.floor((this.remainTime / 3600) % 24)
            this.minute = Math.floor((this.remainTime / 60) % 60)
            this.second = Math.floor(this.remainTime % 60)
            this.countDowm()
        }
    },
    methods: {
        //图片查看
        showImage() {
            let images = []
            images.push(this.topic.image)
            this.$viewerApi({
                images: images
            })
        },
        //继续答题弹框
        exportClick() {
          this.exportShow = false
        },
        //线段图点击选择
        textClick(i,eve) {
            console.log('i',i)
            let text_answer = i.id
            let params = {
                exam_id: this.examInfo.exam_id,
                question_id: this.topic.id,
                patient_id:this.examInfo.patient_id,
                answer_id: text_answer,
                count: this.count
            }
            this.$axios.post('term/user/answer', this.$qs.stringify(params)).then(res => {
                if (res.data.code === 1) {
                    this.count = ''
                    if (this.topic.total > this.topic.now) {
                        this.nextTopic()
                    } else if (this.topic.total === this.topic.now && this.topic.all_total > this.topic.all_now) {
                        // this.topic.id = 0;
                        this.nextTopic();
                        this.$router.push({name: 'TerminalWait', query: {test_paper_id: this.test_paper_id}})
                    } else if (this.topic.all_total === this.topic.all_now) {
                        this.$router.push({
                            name: 'TerminalEnd',
                            query: {
                                exam_id: this.examInfo.exam_id,
                                patient_id:this.examInfo.patient_id,
                                type: this.examInfo.practiceType,
                                music_path: this.music_path,
                                music_time: this.music_time,
                                music_cover: this.music_cover,
                                music_name: this.music_name,
                                prompt_message: this.prompt_message
                            }
                        })
                    }
                } else {
                    this.$message.error(res.data.info)
                }
            })
        },
        sizeBig() {
            let titleNum = parseFloat(document.getElementById('title').style.fontSize);
            let radioNum = parseFloat(document.getElementById('radio').style.fontSize);
            titleNum = titleNum + 1;
            radioNum = radioNum + 1;
            document.getElementById('title').style.fontSize = titleNum + 'px';
            document.getElementById('radio').style.fontSize = radioNum + 'px';
            if (titleNum > 50 && radioNum > 48) {
                document.getElementById('title').style.fontSize = 50 + 'px';
                document.getElementById('radio').style.fontSize = 48 + 'px';
            }
        },
        sizeSmall() {
            let titleNum = parseFloat(document.getElementById('title').style.fontSize);
            let radioNum = parseFloat(document.getElementById('radio').style.fontSize);
            titleNum = titleNum - 1;
            radioNum = radioNum - 1;
            document.getElementById('title').style.fontSize = titleNum + 'px';
            document.getElementById('radio').style.fontSize = radioNum + 'px';
            document.getElementById('radio').style.fontSize = radioNum + 'px';
            if (titleNum < 14 && radioNum < 12) {
                document.getElementById('title').style.fontSize = 14 + 'px';
                document.getElementById('radio').style.fontSize = 12 + 'px';
            }
        },
        countDowm() {
            let self = this
            clearInterval(this.promiseTimer)
            this.promiseTimer = setInterval(function () {
                if (self.hour === 0) {
                    if (self.minute !== 0 && self.second === 0) {
                        self.second = 59
                        self.minute -= 1
                    } else if (self.minute === 0 && self.second === 0) {
                        self.second = 0
                        self.$emit('countDowmEnd', true)
                        clearInterval(self.promiseTimer)
                        self.$router.push(
                            {
                                name: 'TerminalEnd',
                                query: {
                                    exam_id: self.examInfo.exam_id,
                                    patient_id:this.examInfo.patient_id,
                                    type: self.examInfo.practiceType,
                                    music_path: self.music_path,
                                    music_time: self.music_time,
                                    music_cover: self.music_cover,
                                    music_name: self.music_name,
                                    prompt_message: self.prompt_message
                                }
                            }
                        )
                    } else {
                        self.second -= 1
                    }
                } else {
                    if (self.minute !== 0 && self.second === 0) {
                        self.second = 59
                        self.minute -= 1
                    } else if (self.minute === 0 && self.second === 0) {
                        self.hour -= 1
                        self.minute = 59
                        self.second = 59
                    } else {
                        self.second -= 1
                    }
                }
            }, 1000)
        },
        formatNum(num) {
            return num < 10 ? '0' + num : '' + num
        },
        async getExam() {
            let params = {terminal_id: this.$store.state.user.terminal.userInfo.uid};
            this.limit_Time = this.$store.state.examObj.limit_Time;
            console.log('limit_Time', this.limit_Time)

            this.remainTime = this.limit_Time * 60;
            this.examInfo = this.$store.state.examObj;
            this.music_path = this.$store.state.examObj.music_path
            this.music_time = this.$store.state.examObj.music_time
            this.music_name = this.$store.state.examObj.music_name
            this.music_cover = this.$store.state.examObj.music_cover
            this.test_paper_id = this.$route.query.test_paper_id || this.examInfo.test_paper_id;
            this.prompt_message = this.examInfo.examInfo.prompt_message

            if (this.limit_Time === 0) {
                this.time_show = false
            }
            // if (this.limit_Time === 1) {
            //     this.time_show = false
            // }
            /*await this.$axios.post('term/index/user', params).then(res => {
                console.log(res)
                this.limit_Time = res.data.data.exam.limit_time;
                this.remainTime = this.limit_Time * 60;
                this.examInfo = res.data.data;
                this.music_path = res.data.data.music_path
                this.music_time = res.data.data.music_time
                this.music_name = res.data.data.music_name
                this.music_cover = res.data.data.music_cover
                this.test_paper_id = this.$route.query.test_paper_id || this.examInfo.exam.test_paper_id;
                console.log(this.limit_Time)

            })*/
        },
        // 开始答题
        async startAnswer() {
            let params = {
                exam_id: this.examInfo.exam_id,
                test_paper_id:this.examInfo.test_paper_id,
                patient_id:this.examInfo.patient_id,
                practice_type: this.$store.state.examObj.practiceType
            }
            await this.$axios.post('term/index/start', params).then(res => {

                if(res.data.data.type == 1) {
                    this.exportShow = true
                    this.$store.state.examObj.question_id = res.data.data.question_id
                    this.test_paper_id = res.data.data.test_paper_id
                }
            })
        },
        //获取题目
        async getTopic() {
            let params = {
                exam_id: this.examInfo.exam_id,
                question_id: this.$store.state.examObj.question_id,
                test_paper_id: this.test_paper_id,
                patient_id:this.examInfo.patient_id,
            }
            await this.$axios.post('term/user/question', params).then(res => {
                this.topic = res.data.data;
                this.test_paper_id = res.data.data.test_paper_id;
                this.options = Number(this.topic.answer_id);
                if (this.topic.type_id === 6) {
                    let gaps = this.topic.answer.map((item, index) => {
                        item.title = item.title.replace(/（）/g, `(<input style="font-size: 18px" name="${index}"/>)`);
                        item.title = item.title.replace(/\(\)/g, `(<input style="font-size: 18px" name="${index}"/>)`);
                        return item.title;
                    });
                    this.gap = gaps.join(',')
                }
                if (this.topic.type_id === 5) {
                    this.topic.title = this.topic.title.replace(/（）/, '（' + this.topic.count + '）');
                }
                if (this.topic.type_id === 8) {
                    this.count_ = this.topic.count
                }
                if(this.topic.type_id === 3) {
                    this.topic.answer.map((item, index) => {
                        item.title = item.title.replace(/（）/g, `(<input style="font-size: 18px" class="tiankong" name="${index}"/>)`);
                        item.title = item.title.replace(/\(\)/g, `(<input style="font-size: 18px" class="tiankong" name="${index}"/>)`);
                        return item.title;
                    });
                    this.$nextTick(function (){
                        let countArr  = JSON.parse(this.topic.count)
                        $('.tiankong').each(function (index,item){
                            $(this).val(countArr[index])
                        });
                    })
                }
                if (this.topic.type_id === 9 || this.topic.type_id === 12) {
                    this.count__ = this.topic.count
                    this.options = Number(this.topic.answer_id);
                }
                if(this.topic.type_id == 11) {
                    this.options = Number(this.topic.answer_id);
                    if (this.options){
                        this.topic.answer.map((item,index) => {
                            if(item.id == this.options) {
                                item.checked = 0
                            }
                        })
                    }
                }
            })
        },
        //重复语言
        readTopic() {
            this.presetVoice();
            var synth = window.speechSynthesis;
            window.speechSynthesis.cancel();
            var utterThis = this.topic.now==1?new SpeechSynthesisUtterance('请听题：' + this.titleVoice):new SpeechSynthesisUtterance(this.titleVoice);
            utterThis.volume = 1  // 声音的音量
            utterThis.rate = 1 // 语速，数值，默认值是1，范围是0.1到10
            utterThis.pitch = 1 // 表示说话的音高，数值，范围从0（最小）到2（最大）。默认值为1
            synth.speak(utterThis);
            utterThis = new SpeechSynthesisUtterance('请听答案：' + this.answerVoice);
            utterThis.volume = 1  // 声音的音量
            utterThis.rate = 1 // 语速，数值，默认值是1，范围是0.1到10
            utterThis.pitch = 1 // 表示说话的音高，数值，范围从0（最小）到2（最大）。默认值为1
            synth.speak(utterThis);

        },
        presetVoice() {
            // this.titleVoice = this.topic.title.split('.')[1];
            this.titleVoice = this.topic.title.replace(/\.|\(|\)/g, '、')
            let a = this.topic.answer.map(item => {
                return item.title
            })
            this.answerVoice = a.join(',').split('.').map((item, index) => {
                if (index === a.length - 1) {
                    return item
                } else {
                    return item + '。'
                }
            }).join(',');
        },
        // 答题
        answer(answer_id) {
            let params = {
                exam_id: this.examInfo.exam_id,
                question_id: this.topic.id,
                patient_id:this.examInfo.patient_id,
                answer_id: answer_id,
                count: this.count
            }
            console.log("~ params", params)
            this.$axios.post('term/user/answer', this.$qs.stringify(params)).then(res => {
                if (res.data.code === 1) {
                    this.count = ''
                    if (this.topic.total > this.topic.now) {
                        this.nextTopic()
                    } else if (this.topic.total === this.topic.now && this.topic.all_total > this.topic.all_now) {
                        // this.topic.id = 0;
                        this.nextTopic();
                        this.$router.push({name: 'TerminalWait', query: {test_paper_id: this.test_paper_id}})
                    } else if (this.topic.all_total === this.topic.all_now) {
                        console.log('结束')
                        this.$router.push({
                            name: 'TerminalEnd',
                            query: {
                                exam_id: this.examInfo.exam_id,
                                patient_id:this.examInfo.patient_id,
                                type: this.examInfo.practiceType,
                                music_path: this.music_path,
                                music_time: this.music_time,
                                music_cover: this.music_cover,
                                music_name: this.music_name,
                                prompt_message: this.prompt_message
                            }
                        })
                    }
                } else {
                    this.$message.error(res.data.info)
                }
            })
        },
        xia() {
            if (this.topic.total === this.topic.now && this.topic.all_total > this.topic.all_now) {
                // this.topic.id = 0;
                this.$router.push({name: 'TerminalWait', query: {test_paper_id: this.test_paper_id}})
            } else if (this.topic.all_total === this.topic.all_now) {
                console.log('结束')
                this.$router.push({
                    name: 'TerminalEnd',
                    query: {
                        exam_id: this.examInfo.exam_id,
                        patient_id:this.examInfo.patient_id,
                        type: this.examInfo.practiceType,
                        music_path: this.music_path,
                        music_time: this.music_time,
                        music_cover: this.music_cover,
                        music_name: this.music_name,
                        prompt_message: this.prompt_message
                    }
                })
            }
        },
        // 点击下一题
        async nextTopic() {
            if (this.topic.type_id !== 8 && this.topic.type_id !== 9 && this.topic.type_id !==12) {
                this.count__ = ''
                this.count_ = ''
            }
            if(this.topic.type_id == 3) {
                let input = document.getElementsByTagName('input')
                let a=[]
                for (let i=0;i<input.length;i++) {
                    a.push(input[i].value)
                }
                let params = {
                    exam_id: this.examInfo.exam_id,
                    question_id: this.topic.id,
                    patient_id:this.examInfo.patient_id,
                    answer_id: this.options_,
                    count: a
                }
                this.$axios.post('term/user/answer', this.$qs.stringify(params)).then(res => {
                    this.options_ = []
                    this.xia()
                })
            }
            if (this.options_.length > 0) {
                let params = {
                    exam_id: this.examInfo.exam_id,
                    question_id: this.topic.id,
                    answer_id: this.options_,
                    patient_id:this.examInfo.patient_id,
                    count: this.count
                }
                this.$axios.post('term/user/answer', this.$qs.stringify(params)).then(res => {
                    this.options_ = []
                    this.xia()
                })

            }
            if (this.count_) {
                let params = {
                    exam_id: this.examInfo.exam_id,
                    question_id: this.topic.id,
                    answer_id: this.options_,
                    patient_id:this.examInfo.patient_id,
                    count: this.count_
                }
                console.log("~ params", params)
                this.$axios.post('term/user/answer', this.$qs.stringify(params)).then(res => {
                    this.count = ''
                    this.xia()
                })
            }
            if(this.count__) {
                let params = {
                    exam_id: this.examInfo.exam_id,
                    question_id: this.topic.id,
                    answer_id: this.options,
                    patient_id:this.examInfo.patient_id,
                    count: this.count__
                }
                this.$axios.post('term/user/answer', this.$qs.stringify(params)).then(res => {
                    this.count__ = ''
                    this.xia()
                })
            }
            if (this.topic.all_total === this.topic.all_now) {
                // console.log('结束')
                this.$message.error('已经是最后一题了!')
                return
            }
            if (this.topic.total === this.topic.now && this.topic.all_total > this.topic.all_now) {
                // this.topic.id = 0;
                this.$router.push({name: 'TerminalWait', query: {test_paper_id: this.test_paper_id}})
                return;
            }
            let params = {
                exam_id: this.examInfo.exam_id,
                question_id: this.topic.now === this.topic.total ? 0 : this.topic.id,
                test_paper_id: this.test_paper_id,
                patient_id:this.examInfo.patient_id,
            }
            await this.$axios.post('term/user/question', this.$qs.stringify(params)).then(res => {
                // console.log(res)
                this.topic = res.data.data;
                this.test_paper_id = res.data.data.test_paper_id;
                this.options = Number(this.topic.answer_id);
                this.readTopic()
                if (this.topic.type_id === 6) {
                    let gaps = this.topic.answer.map((item, index) => {
                        item.title = item.title.replace(/（）/g, `(<input style="font-size: 18px" name="${index}"/>)`);
                        item.title = item.title.replace(/\(\)/g, `(<input style="font-size: 18px" name="${index}"/>)`);
                        return item.title;
                    });
                    this.gap = gaps.join(',')
                }
                if (this.topic.type_id === 5) {
                    this.topic.title = this.topic.title.replace(/（）/, '（' + this.topic.count + '）');
                }
                if (this.topic.type_id === 7) {
                    if (this.topic.answer_id) {
                        let a = this.topic.answer_id
                        this.options_ = a.split(',')
                        this.options_ = this.options_.map(item => Number(item))
                    }
                }
                if (this.topic.type_id === 8) {
                    this.count_ = this.topic.count
                }
                if (this.topic.type_id === 9 || this.topic.type_id === 12) {
                    this.count__ = this.topic.count
                    this.options = Number(this.topic.answer_id);
                }
                if(this.topic.type_id === 3) {
                    this.topic.answer.map((item, index) => {
                        item.title = item.title.replace(/（）/g, `(<input style="font-size: 18px" class="tiankong" name="${index}"/>)`);
                        item.title = item.title.replace(/\(\)/g, `(<input style="font-size: 18px" class="tiankong" name="${index}"/>)`);
                        return item.title;
                    });
                    this.$nextTick(function (){
                        let countArr  = JSON.parse(this.topic.count)
                        $('.tiankong').each(function (index,item){
                            $(this).val(countArr[index])
                        });
                    })
                }
                if(this.topic.type_id == 11) {
                    this.options = Number(this.topic.answer_id);
                    if (this.options){
                        console.log('this.options',this.options)
                        this.topic.answer.map((item,index) => {
                            if(item.id == this.options) {
                                item.checked = 0
                            }
                        })
                    }
                }

            })

        },
        // 点击上一题
        async prevTopic() {
            console.log('this.gap',this.gap)
            if (this.topic.now === 1) {
                this.$message.error('已经是第一题了!')
                return;
            }
            let params = {
                exam_id: this.examInfo.exam_id,
                question_id: this.topic.id,
                test_paper_id: this.test_paper_id,
                patient_id:this.examInfo.patient_id,
            }
            await this.$axios.post('term/user/prev_question', this.$qs.stringify(params)).then(res => {
                this.topic = res.data.data;
                this.options = Number(this.topic.answer_id);
                this.test_paper_id = res.data.data.test_paper_id
                this.readTopic();
                if (this.topic.type_id === 6) {
                    let gaps = this.topic.answer.map((item, index) => {
                        item.title = item.title.replace(/（）/g, `(<input style="font-size: 18px" name="${index}"/>)`);
                        item.title = item.title.replace(/\(\)/g, `(<input style="font-size: 18px" name="${index}"/>)`);
                        return item.title;
                    });
                    this.gap = gaps.join(',')
                }
                if (this.topic.type_id === 5) {
                    this.topic.title = this.topic.title.replace(/（）/, '（' + this.topic.count + '）');
                }
                if (this.topic.type_id === 7) {
                    if (this.topic.answer_id) {
                        let a = this.topic.answer_id
                        this.options_ = a.split(',')
                        this.options_ = this.options_.map(item => Number(item))
                    }

                }
                if (this.topic.type_id === 8) {
                    this.count_ = this.topic.count
                }
                if (this.topic.type_id === 9 || this.topic.type_id === 12)   {
                    console.log('this.count',this.count)
                    this.count__ = this.topic.count
                    this.options = Number(this.topic.answer_id);
                }
                if(this.topic.type_id === 3) {
                    this.topic.answer.map((item, index) => {
                        item.title = item.title.replace(/（）/g, `(<input style="font-size: 18px" class="tiankong" name="${index}"/>)`);
                        item.title = item.title.replace(/\(\)/g, `(<input style="font-size: 18px" class="tiankong" name="${index}"/>)`);
                        return item.title;
                    });
                    this.$nextTick(function (){
                        let countArr  = JSON.parse(this.topic.count)
                        $('.tiankong').each(function (index,item){
                            $(this).val(countArr[index])
                        });
                    })
                }
                if(this.topic.type_id == 11) {
                    this.options = Number(this.topic.answer_id);
                    if (this.options){
                        console.log('this.options',this.options)
                        this.topic.answer.map((item,index) => {
                            if(item.id == this.options) {
                                item.checked = 0
                            }
                        })
                    }
                }
            })
        },
        // 结束按钮点击事件
        endExam() {
            this.$confirm('确定结束吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push(
                    {
                        name: 'TerminalEnd',
                        query: {
                            exam_id: this.examInfo.exam_id,
                            patient_id:this.examInfo.patient_id,
                            type: this.examInfo.practiceType,
                            music_path: this.music_path,
                            music_time: this.music_time,
                            music_cover: this.music_cover,
                            music_name: this.music_name,
                            prompt_message: this.prompt_message
                        }
                    }
                )
            })

        },
        screenshot() {

        }
    },
}
</script>

<style scoped lang="scss">
::v-deep .el-checkbox__label {
    margin-bottom: 40px;
    color: #333333;
    font-weight: 500;
    font-size: 22px !important;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
    font-weight: 500;
    font-size: 22px;
    color: #7A40F2;
}
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
    border-color: #7A40F2;
    background: #7A40F2;
}
::v-deep .el-radio__input.is-checked + .el-radio__label {
    color: #7A40F2;
}
::v-deep .el-radio__input.is-checked .el-radio__inner {
    border-color: #7A40F2;
    background: #7A40F2;
}
.segment_list {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .segment {
        margin-left: -300px;
        display: flex;
        position: absolute;
        .line_text {
            width: 100px;
            text-align: center;
            font-size: 20px;
            color: #999999;
            position: relative;
            top: 10px;
            left: 50%;
            cursor: pointer;
        }
        .line_box {
            width: 100px;
            height: 10px;
            border: 1px solid #999999;
            border-top: none;
        }
        .extend1 {
            width: 120px;
            text-align: center;
            position: relative;
            top: -50px;
            left: 13%;
            font-size: 24px;
        }
        .extend2 {
            width: 120px;
            text-align: center;
            position: relative;
            top: -50px;
            left: 87%;
            font-size: 24px;
        }
    }
}
.terminal-bg {
    width: 100vw;
    height: 100vh;
    background-image: url(../../assets/images/terminal-bg.png);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    padding: 77px 161px;
}

.sheet {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    width: 1750px;
    height: 840px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.69) 0%, #FFFFFF 100%);
    padding: 60px 200px 0;
}

.page-count {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-100%);
    font-size: 54px;
    color: #FFFFFF;
    display: flex;
    align-items: center;

    > span {
        color: #DECEFF;
        font-size: 30px;
        margin-top: 10px;
    }

}
::v-deep .el-button > span {
    display: flex;
    justify-content: center;
    align-items: center;
}

.submit-question {
    background: linear-gradient(0deg, #32D25B 0%, #FA084E 0%, #FF669D 100%);
    box-shadow: 0px 6px 0px 0px #D40A5D;
    border-radius: 35px;
    margin-left: 72px;

    img {
        margin-left: 10px;
    }
}

.button-wrap {
    // margin-top: 150px;
    // display: flex;
    // justify-content: space-around;
    position: fixed;
    left: 0;
    bottom: 80px;
    margin: 0 265px;
    display: flex;
    justify-content: space-around;
}
.prev {
    width: 222px;
    height: 78px;
    //background-size: 100% 100%;
    //background-position: center;
    //background-repeat: no-repeat;
    line-height: 78px;
    font-size: 25px;
    font-weight: bold;
    color: #FFFFFF;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 28px;
        height: 28px;
    }
}
.prev1 {
    background: linear-gradient(180deg, #FFB89A 0%, #FF8F5F 100%);
    box-shadow: 0px 6px 0px 0px #F57741;
    border-radius: 34px 35px 35px 34px;
    //background-image: url(../../assets/images/button2.png);
}
.prev2 {
    background: linear-gradient(180deg, #AF88FF 0%, #7A40F2 100%);
    box-shadow: 0px 6px 0px 0px #601FE6;
    border-radius: 34px 35px 35px 34px;
    img {
        margin-right: 15px;
    }
}
.prev3 {
    background: linear-gradient(180deg, #AF88FF 0%, #7A40F2 100%);
    box-shadow: 0px 6px 0px 0px #601FE6;
    border-radius: 34px 35px 35px 34px;
    img {
        margin-left: 15px;
    }
}
.prev4 {
    background: linear-gradient(180deg, #61E2FC 0%, #1ABDDE 100%);
    box-shadow: 0px 6px 0px 0px #06A8C9;
    border-radius: 34px 35px 35px 34px;
    img {
        margin-left: 15px;
    }
}
.title {
    font-size: 24px;
    font-family: Microsoft YaHei;
    color: #000000;
    line-height: 45px;
    position: relative;

    > h3 {
        font-weight: normal !important;
    }

    > h3 > span {
        position: absolute;
        left: 0;
        top: 0;
        transform: translateX(-120%);
    }
}

.options-list {
    width: 100%;
    height: 530px;
    margin-top: 25px;
    font-size: 20px;

    ::v-deep .el-radio {
        display: flex;
        align-items: center;
        color: #000000;
        margin-bottom: 25px;
        white-space: pre-wrap;
        font-size: inherit;
    }

    ::v-deep .el-radio__label {
        font-size: inherit !important;
        line-height: 30px;
    }
}

.radio {
    width: 100%;
}

.radio-wrap {
    display: flex;
    flex-wrap: wrap;
}

.options-wrap {
    display: flex;
    align-items: center;
}

.options-img {
    height: 400px;
    width: auto;
}

.typeface {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    cursor: pointer;
}

.typeface img {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
    margin-right: 2px;
}

.timer {
    width: 200px;
    height: 37px;
    position: absolute;
    top: -13px;
    left: 50%;
    margin-left: -100px;
    transform: translateY(-100%);
    display: flex;
}

.timer img {
    width: 37px;
    height: 38px;
}

.timer span {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #DECEFF;
    margin-left: 12px;
}

.input {
    display: flex;
    text-align: center;
    line-height: 50px;
    width: 270px;
    height: 50px;

    input {
        width: 180px;
        line-height: 50px;
        font-size: 18px;
        border-bottom: 1px solid #333333;
    }
}
.input_line {
    display: flex;
    text-align: center;
    line-height: 50px;
    height: 50px;
    margin-bottom: 15px;
    margin-top: -30px;
    input {
        width: 300px;
        line-height: 50px;
        font-size: 18px;
        border-bottom: 1px solid #333333;
    }
}
.input_ {
    display: flex;
    text-align: center;
    line-height: 50px;
    // width: 300px;
    height: 50px;

    input {
        width: 300px;
        line-height: 50px;
        font-size: 18px;
        border-bottom: 1px solid #333333;
    }
}
</style>
