<template>
    <div class="content">
        <div class="content_top">
            <div class="content_top_left">
                <a @click="onRefresh" class="reload" href="javascript:;"><img
                    src="../assets/images/top_reload.png" alt=""></a>
            </div>
            <div>
                <el-button type="warning" class="btn-height-40" round @click="closeTerminal" style="background-color: #39CBE9;border-color: #39CBE9"><img
                    src="../assets/images/guanbi.png" alt="">关闭终端
                </el-button>
            </div>
        </div>
        <div class="content_body">
            <div class="terminal-box">
                <div v-for="item in list" :key="item.id" class="box">
                    <div :class="'terminal-item terminal-item' + item.run_status">
                        <div class="right-state">{{ item.run_status_text }}</div>
                        <div class="title">{{ item.nickname }} 监控</div>
                        <div class="box-body">
                            <div class="body-img">
                                <img v-if="item.is_camera" :src="item.camera_img"
                                     style="width: 163px;height: 161px;object-fit: contain">
                                <img v-else :src="item.run_status_img"
                                     style="width: 163px;height: 161px;object-fit: contain">
                            </div>

                            <div>
                                <div v-if="item.run_status == 2" class=" zd-text">
                                    <p>患者：{{ item.patient_name }}</p>
                                    <p>耗时：{{ item.time }}</p>
                                    <p v-if="item.type == 1">评估进度：{{ item.jindu }}道题</p>
                                    <p v-if="item.type == 2">训练进度：{{ item.jindutiao }}%</p>
                                    <p v-if="item.type == 3">训练进度：{{ item.jindutiao }}%</p>
                                    <span v-if="item.type == 1">{{ item.jindutiao }}%</span>
                                    <el-progress :percentage="item.jindutiao" :show-text="false"></el-progress>
                                </div>
                                <div v-else class="zd-img">
                                    <img :src="item.zd_img">
                                </div>
                                <div class="btn-box">
                                    <template v-if="item.run_status == 2">
                                        <template v-if="item.status == 1">
                                            <el-button class="pink" round @click="stop(item.exam_id,item)">暂停</el-button>
                                        </template>
                                        <template v-if="item.status == 2">
                                            <el-button class="pink" round @click="start(item.exam_id,item)">开始</el-button>
                                        </template>
                                        <el-button style="color:#19BBDD " round @click="clearTask(item.exam_id,item)">清空任务
                                        </el-button>
                                    </template>
                                    <template v-if="item.run_status == 3">
                                        <el-button class="pink" round @click="clearTasRecord(item.term_record_id)" >
                                            清空任务
                                        </el-button>
                                    </template>
                                    <template v-if="item.run_status == 1">
                                        <div class="space-15"></div>
                                        <router-link to="Assess">
                                            <el-button class="blue" round>新建测评任务</el-button>
                                        </router-link>
                                        <div class="space-15"></div>
<!--                                        <router-link to="Emotion">-->
<!--                                            <el-button class="blue" round>新建训练任务</el-button>-->
<!--                                        </router-link>-->
<!--                                        <div class="space-15"></div>-->
                                    </template>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>

</template>

<script>

export default {
    name: "Terminal",
    data() {
        return {
            url: 'api/patient/index',
            list: [],
            time: '',
            timeout: 200
        };
    },
    computed: {},
    watch: {},
    mounted() {
        //消息接口
        this.$store.dispatch('GetXiao')
        this.getList()
        this.time = setInterval(this.getImg, this.timeout)
    },
    destroyed() {
        clearInterval(this.time)
    },
    methods: {
        async getImg() {
            return
            await this.$axios.post('api/term/image').then(res => {
                if (res.data.code === 1 && res.data.data.length > 0) {
                    var newData = {};
                    res.data.data.map(item => {
                        newData[item.id] = item.image;
                    });
                    // console.log(res.data.data);
                    this.timeout = res.data.data.length == 0 ? 1000 : 200;
                    clearInterval(this.time)
                    this.time = setInterval(this.getImg, this.timeout)
                    this.list = this.list.map(item => {
                        item.is_camera = newData[item.id] ? true : false;
                        item.camera_img = newData[item.id]
                        return item;
                    })
                }
            });
        },
        async getList() {
            await this.$axios.post('api/term/lst').then(res => {
                // console.log(res)
                if (res.data.code === 1) {
                    this.list = res.data.data.map(item => {
                        var run_status_list = {
                            0: {'state': '离线', 'img': 'lixian_moren.png', 'zd_img': 'zd_icon_gray.png'},
                            1: {'state': '在线', 'img': 'zhanyong_moren.png', 'zd_img': 'zd_icon_skyblue.png'},
                            2: {'state': '占用', 'img': 'zaixian_moren.png'},
                            3: {'state': '异常', 'img': 'zaixian_moren.png', 'zd_img': 'zd_icon_green.png'}
                        }
                        var state = run_status_list[item.run_status] ? run_status_list[item.run_status] : {
                            'state': '',
                            'img': ''
                        };
                        item.run_status_text = state.state;
                        item.run_status_img = require('../assets/images/' + state.img);
                        item.zd_img = state.zd_img ? require('../assets/images/' + state.zd_img) : '';


                        return item;
                    })
                }
            })
        },
        onRefresh() {
            this.getList();
        },
        closeTerminal() {
            this.$confirm('确认关闭所有终端吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('api/term/shutdown').then(res => {
                    this.getList()
                })
            }).catch(() => {

            });
        },
        clearTask(id,item) {
            // console.log(id)
            this.$confirm('是否确定提前结束测试？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // console.log("确认清空")
                let api = ''
                switch (item.type) {
                    case 1: {
                        api = 'api/exam/end'
                        break
                    }
                    case 2: {
                        api = 'api/breath/end'
                        break
                    }
                    case 3: {
                        api = 'api/emotion/end'
                        break
                    }
                }
                this.$axios.post(api, this.$qs.stringify({id: id})).then(res => {
                    this.getList()

                })
            })
        },
        stop(id,item) {
            let api = ''
            switch (item.type) {
                case 1: {
                    api = 'api/exam/suspend'
                    break
                }
                case 2: {
                    api = 'api/breath/suspend'
                    break
                }
                case 3: {
                    api = 'api/emotion/suspend'
                    break
                }
            }
            this.$axios.post(api, this.$qs.stringify({id: id})).then(res => {
                this.getList()
            })
        },
        start(id,item) {
            let api = ''
            switch (item.type) {
                case 1: {
                    api = 'api/exam/start'
                    break
                }
                case 2: {
                    api = 'api/breath/start'
                    break
                }
                case 3: {
                    api = 'api/emotion/start'
                    break
                }
            }
            this.$axios.post(api, this.$qs.stringify({id: id})).then(res => {
                this.getList()
            })
        },
        clearTasRecord(id) {
            // console.log('异常清空')
            this.$confirm('是否确定清空任务？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('api/term/clearError', this.$qs.stringify({term_record_id: id})).then(res => {
                    this.getList()
                    // console.log("确认成功")

                })
            })
        }
    },
}
</script>

<style scoped lang="scss">
::v-deep .el-button > span {
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-button img {
    margin-right: 10px;
}

.terminal-box {
    padding-right: -20px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
}

.terminal-item {
    display: inline-block;
    width: 366px;
    height: 270px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    margin-bottom: 22px;
    color: #FFF;
    font-size: 16px;
}

.terminal-item0 {
    background-color: #BFB7BF;
}

.terminal-item1 {
    background-color: #7A40F2;
}

.terminal-item2 {
    background-color: #39CBE9;
}

.terminal-item3 {
    background-color: #39CBE9;
}

.right-state {
    border-radius: 0 10px 0 10px;
    height: 35px;
    line-height: 35px;
    width: 75px;
    text-align: center;
    font-size: 14px;
    background: #AEA2AE;
    position: absolute;
    right: 0;
    top: 0;
}


.terminal-item1 .right-state {
    background-color: #672FDB;
}

.terminal-item2 .right-state, .terminal-item3 .right-state {
    background-color: #19BBDD;
}

.content_body {
    padding: 32px;
    overflow: scroll;
}

.box {
    width: 25%;
    min-width: 371px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.terminal-item .title {
    color: #FFF;
    font-size: 20px;
    margin-bottom: 30px;

}

p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.terminal-item .box-body {
    display: flex;
}

.terminal-item .box-body > div {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.zd-text {
    width: 100%;
}

.zd-text p {
    font-size: 14px;
    margin-bottom: 5px;
}

.zd-text span {
    font-size: 12px;
    margin-top: 10px;
}

::v-deep .el-progress-bar__inner {
    background: linear-gradient(90deg, #FE9834, #FFD02C);
}

::v-deep .el-progress-bar__outer {
    height: 11px !important;
    background-color: #985B20;
}

.blue {
    color: #7A40F2;
}

::v-deep .terminal-item .el-button.blue:hover {
    background-color: #DDF8F8;
}

::v-deep .terminal-item .el-button {
    background-color: #fff;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    padding: 0;
    margin: 0;
}

::v-deep .terminal-item .el-button + .el-button {
    margin-top: 10px;
}

.terminal-item .box-body .body-img {
    margin-right: 10px;
}

.btn-box {
    margin-top: 3px;
    flex: 1;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    justify-content: space-evenly;
}
</style>
