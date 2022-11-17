<template>
    <div id="Terminal">
        <terminal-wait v-if="$route.name==='TerminalWait'" ref="termWait"></terminal-wait>
        <terminal-answer v-else-if="$route.name==='TerminalAnswer'" ref="termAnswer"></terminal-answer>
        <router-view v-else></router-view>
        <screenshot v-show="false" ref="screenshot" v-if="photoShow"></screenshot>
        <el-dialog title="信息" :visible.sync="suspend" :show-close="false" :close-on-click-modal="false" width="30%">
            <span>测评已暂停，请在主控端继续开启</span>
        </el-dialog>
    </div>
</template>

<script>
import terminalWait from './TerminalWait'
import terminalAnswer from './TerminalAnswer'
import Screenshot from './Screenshot'

export default {
    name      : "Index",
    components: {terminalWait, terminalAnswer, Screenshot},
    data() {
        return {
            ws       : '',
            ip       : '',
            suspend  : false,
            photoShow: false,
        };
    },
    computed  : {},
    watch     : {
        async $route(to, form) {
            // 取消语音服务
            window.speechSynthesis.cancel();

            // 连接Websocket
            if (to.name === 'TerminalWait') {
                if (this.$store.state.ws.ws.url) {
                    this.$nextTick(() => {
                    })
                    console.log('已连接')
                } else {
                    console.log('未连接');
                    await this.getInfo();
                    this.wsInit();
                }
            }

            if (to.name === 'TerminalWait' || to.name === 'TerminalAnswer' || to.name === 'TerminalLulls') {
                this.photoShow = true;
            } else {
                if (this.$refs.screenshot) {
                    this.$refs.screenshot.clearPhoto();
                }
                this.photoShow = false;
            }

            if (to.name === 'TerminalLogin') {
                if (this.ws) {
                    this.ws.send('3000' + this.ip);
                    this.$store.commit('closeWs');
                }

                // 关闭串口
                if (window.electronApi) {
                    window.electronApi.send('closeCom');
                }
            }
        }
    },

    async mounted() {
        this.$store.commit('setClient', true);
        if (this.$route.name !== 'TerminalLogin') {
            await this.getInfo();
            this.wsInit();
        }
    },

    methods: {
        // 初始化WebSocket
        wsInit() {
            console.log("初始化", this.ip)
            this.$store.commit('wsInit');
            this.ws           = this.$store.state.ws.ws;
            this.ws.onopen    = this.wsOpen();
            this.ws.onmessage = this.wsMsg();
            this.ws.onclose   = this.wsClose();
        },

        wsMsg() {
            return (e) => {
                console.log('socket:', e.data)
                switch (e.data) {
                case 'start' : {
                    console.log('start');
                    this.suspend = false;
                    this.$store.commit('setPlayed', true)
                    return;
                }
                case 'suspend': {
                    console.log('suspend');
                    this.$store.commit('setPlayed', false)
                    this.suspend = true;
                    return;
                }
                case '2000': {
                    console.log('判断查询')
                    //this.$refs.termWait.getInfo();
                    if (this.$refs.termWait && this.$refs.termWait.started) {
                        console.log('调用查询')
                        this.$refs.termWait.getInfo();
                    }


                    return;
                }
                case 'end': {
                    console.log('end');
                    this.$store.commit('setPlayed', false);
                    this.$store.commit('setStop', true);
                    let query = {}
                    if (this.$route.name === 'TerminalWait') {
                        query['exam_id'] = this.$refs.termWait.examInfo.exam_id;
                    } else if (this.$route.name === 'TerminalAnswer') {
                        query['exam_id'] = this.$refs.termAnswer.examInfo.exam_id;
                    }
                    query['type'] = this.$store.state.examObj.practiceType

                    if (this.$store.state.examObj.practiceType === 1) {
                        this.$router.push({
                            name : 'TerminalEnd',
                            query: query
                        })
                    } else {
                        let that = this
                        this.$axios.post('term/index/end', {
                            exam_id: this.$store.state.examObj.exam_id,
                            type   : this.$store.state.examObj.practiceType
                        }).then(res => {
                            this.$message.success(res.data.info);
                            this.$bus.$emit('event')
                            this.$router.push({
                                name    : 'TerminalWait',
                                query   : query,
                                isCancel: true
                            })
                        })
                    }
                    return;
                }
                case 'shutdown': {
                    console.log('onshutdown', window.window.shutdown());
                    let cmd = 'ipconfig'
                    //window.HTMLPackHelper.shutdownSystem();
                    try {
                        window.window.shutdown(cmd).then(
                            res => console.log(cmd, res)
                        )
                    } catch (e) {

                    }

                    return;
                }
                }
            }
        },

        wsOpen() {
            return () => {
                this.$store.commit('wsHeartbeatStart', this.ip);
            }
        },

        wsClose() {
            return (e) => {
                console.log(e);
                this.$store.commit('wsHeartbeatStop');
            }
        },

        async getInfo() {
            var terminalId = this.$store.state.user.terminal.userInfo.uid;
            if (terminalId) {
                await this.$axios.post('term/index/getIp', this.$qs.stringify({
                    terminal_id: terminalId
                })).then(res => {
                    this.ip = res.data.data.ip;
                })
            }
        },
    },
}
</script>

<style scoped>

</style>
