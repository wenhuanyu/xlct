<template>
    <div>
        <Table :add="true"
               :tableTitle="tableTitle"
               :delete-url="deleteUrl"
               :isAssess="true"
               :pageFooter="true"
               :InfoHref="InfoHref"
               :deleteUrl="deleteUrl"
               :searchUrl="url"
               :statis-href="`AssessStatistics`"
               @add="add()"
               @qrcode="qrcode"
               ref="table"
               :startUrl="startUrl" :suspendUrl="suspendUrl" :endUrl="endUrl"
               :state_title="state_title">
        </Table>
        <!--弹出-->
        <el-dialog custom-class="dialog"
                   title="新建训练任务"
                   :visible.sync="dialogFormVisible"
                   :destroy-on-close="true"
                   ref="dialog"
                   @close="onDialogClose">
            <div class="dialog_con">
                <el-form ref="form" :model="form">
                    <!--间值设置-->
                    <div class="slider_con padding-30">
                        <el-row>
                            <!-- 内容左侧-->
                            <el-col :span="12">
                                <!-- 左上-->
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="患者" prop="name"></el-form-item>
                                    </el-col>
                                    <el-col :span="16">
                                        <div>
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-select placeholder="请选择患者"
                                                               v-model="patientListName"
                                                               @change="onPatientChange($event)">
                                                        <el-option v-for="item in patientList"
                                                                   :key="item.id"
                                                                   :value="item.id"
                                                                   :label="item.name +'  '+ item.medical_num"></el-option>
                                                    </el-select>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-select placeholder="请选择终端"
                                                               v-model="terminal_nickname"
                                                               @change="hanldClickTerminal($event)">
                                                        <el-option v-for="item in terminalList"
                                                                   :key="item.id"
                                                                   :value="item.id"
                                                                   :label="item.nickname"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-row>
                                            <div class="space-30"></div>
                                            <el-row style="cursor: pointer">
                                                <template>
                                                    <el-table :data="add_newList"
                                                              :show-header="false"
                                                              border>
                                                        <el-table-column>
                                                            <template slot-scope="scope">
                                                                <div>
                                                                    {{
                                                                        scope.row.patient_ + ' ' + scope.row.patient_num
                                                                    }}
                                                                </div>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column prop="terminal_">
                                                            <template slot-scope="scope">
                                                                <img src="../assets/images/delete.png"
                                                                     class="pull-right"
                                                                     @click="deleteRow(scope.$index, tableData)"/>
                                                                <div>{{ scope.row.terminal_ }}</div>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>
                                                </template>
                                            </el-row>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="new-evaluationPatient_add" @click="add_new">添加</div>
                                    </el-col>
                                </el-row>

                            </el-col>
                            <!-- 内容右侧-->
                            <el-col :span="11" :offset="1">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="训练方案" prop="name"></el-form-item>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-row>
                                            <el-col :span="14">
                                                <el-select v-model="programme_options_name" placeholder="请选择"
                                                           class="select_prev" @change="onProgrammeChange($event)">
                                                    <el-option v-for="item in programme_options"
                                                               :key="item.id"
                                                               :label="item.name"
                                                               :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-col>

                                        </el-row>
                                        <el-row>
                                            <div class="slider_btm">
                                                <div class="scrollbar">
                                                    <el-row>
                                                        <el-col class="slider_list">
                                                            <div v-for="item in gameList.game_list" style="width: 45%">
                                                                <img :src=item.game_cover alt="">
                                                                <p>{{ item.game_name }}</p>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                            </div>
                                        </el-row>
                                    </el-col>
                                </el-row>
                                <div class="space-25"></div>
                                <!-- 右下 -->
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="生理参数" prop="name"></el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-select v-model="physiologyList_name" placeholder="请选择"
                                                   @change="onPhysiology($event)">
                                            <el-option
                                                v-for="item in physiologyList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="1"><span class="line">-</span></el-col>
                                    <el-col :span="8">
                                        <el-select v-model="difficulty_options_name" placeholder="请选择"
                                                   class="select_min" @change="onDifficulty($event)">
                                            <el-option v-for="item in difficulty_options"
                                                       :key="item.id"
                                                       :label="item.name"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer padding-30 no-padding-left no-padding-right no-padding-top">
                <el-button type="warning" round style="margin-right:20px" @click="dialogFormVisible = false">取消
                </el-button>
                <el-button type="primary" round style="margin-right:100px" @click="buttonSubmit">完成</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import Table from "../components/Table";

export default {
    name: "Emotion",
    components: {
        Table
    },
    data() {
        return {
            state_title: true,
            tableTitle: [
                {
                    name: '编号',
                    value: 'id',
                    width: 130
                },
                {
                    name: '患者',
                    value: 'patient_name',
                    width: 150
                },
                {
                    name: '终端',
                    value: 'term_name',
                    width: 150
                },
                {
                    name: '训练时间',
                    value: 'create_time',
                    width: 230
                }, {
                    name: '训练名称',
                    value: 'program_name',
                    width: 230
                },
                {
                    name: '难易级别',
                    value: 'level_name',
                    width: 180
                },
                {
                    name: '状态',
                    value: 'status_text',
                    width: 130
                }
            ],
            url: 'api/emotion/lst',
            startUrl: 'api/emotion/start',
            suspendUrl: 'api/emotion/suspend',
            endUrl: 'api/emotion/end',
            deleteUrl: 'api/emotion/delete',
            addHref: 'AddAssess',
            InfoHref: 'EmotionDetail',
            tableData: [],
            qrDialog: false,
            currentRow: '',
            dialogFormVisible: false,
            form: {
                'patient_ids': [],
                'terminal_ids': [],
                "program_id": ''
            },
            addForm: {
                name: ''
            },
            infoForm: [],
            papeForm: [],
            // 训练方案
            programme_options: [],
            programme_options_name: '',
            programme_options_id: '',
            physiologyList: [],
            physiologyList_name: '',
            physiology_options_id: '',
            difficulty_options: [],
            difficulty_options_name: '',
            difficulty_options_id: '',
            terminalList: [],
            terminal_nickname: '',
            patientList: [],
            patientListName: '',
            add_newList: [],
            patient_id: '',
            terminal_id: '',
            patient_id_name: '',
            terminal_id_name: '',
            music: '',
            musicList: [],
            gameList: [],
            patient_num: ''
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.getTerminal();
        this.onPatient();
        this.getMusic();
        this.getProgramme();
        // this.getPhysiology()
    },
    methods: {

        onDialogClose() {
            this.add_newList = [];
            this.patientListName = '';
            this.terminal_nickname = '';
            this.programme_options_name = '';
            this.difficulty_options_name = '';
            this.gameList = [];
            this.physiologyList_name = ''
        },
        // 删除
        deleteRow(index, rows) {
            this.add_newList.splice(index, 1)
        },

        onPatientChange(e) {
            this.patient_id = e
            this.patient_id_name = e ? this.patientList.find(ele => ele.id === e).name : ''
            this.patient_id_num = e ? this.patientList.find(ele => ele.id === e).medical_num : ''
            console.log(this.patient_id_name)
        },

        add_new() {
            if (this.patientListName && this.terminal_nickname) {

                for (let i = 0; i < this.add_newList.length; i++) {
                    let item = this.add_newList[i];
                    if (item.patient_id === this.patient_id) {
                        this.$message.error('该用户已被指定');
                        return;
                    }

                    if (item.terminal_id === this.terminal_id) {
                        this.$message.error('该终端已被使用');
                        return;
                    }
                }

                this.add_newList.push({
                    patient_: this.patient_id_name,
                    patient_id: this.patient_id,
                    terminal_id: this.terminal_id,
                    terminal_: this.terminal_id_name,
                    patient_num: this.patient_id_num
                })
            }

            console.log(this.add_newList)
        },
        async onPatient() {
            await this.$axios.post('api/patient/index').then(res => {
                if (res.data.code == 1) {
                    this.patientList = res.data.data.list
                }
            })
        },
        getTerminal() {
            this.$axios.post('api/common/termLst').then(res => {
                if (res.data.code === 1) {
                    var terminalListId = {};
                    this.terminalList = res.data.data.map(item => {
                        terminalListId[item.id] = item;
                        return item;
                    })
                    this.terminalListId = terminalListId
                }
            })
        },
        selectTerminal() {
            if (this.curindex === 0) {
                this.$message({
                    type: 'info',
                    message: '请选择终端'
                })
                return;
            }

            this.infoForm.push({'user': this.userInfo, 'terminal': this.curInfo});
            this.closeDialog()
        },
        hanldClickTerminal(e) {
            let isSelect = false;
            this.infoForm.map(infoI => {
                if (infoI.terminal.id == e.id) {
                    isSelect = true
                    return;
                }
            })
            if (isSelect) {
                this.$message({
                    type: 'info',
                    message: '终端已被选'
                })
                return;
            }
            this.curindex = e.id;
            this.curInfo = e

            // console.log(e)
            this.terminal_id = e
            this.terminal_id_name = e ? this.terminalList.find(ele => ele.id === e).nickname : ''
            console.log(111, this.terminal_id_name)
        },
        deleteInfo(key) {
            this.infoForm.splice(key, 1)
        },
        async buttonSubmit() {
            let patient_ids = [];
            let terminal_ids = [];

            this.add_newList.map(item => {
                patient_ids.push(item.patient_id)
            })

            this.add_newList.map(item => {
                terminal_ids.push(item.terminal_id)
            })

            await this.$axios.post('api/emotion/add', this.$qs.stringify({
                patient_ids: patient_ids.join(','),
                terminal_ids: terminal_ids.join(','),
                program_id: this.programme_options_id,
                level_id: this.difficulty_options_id,
                physiology_id: this.physiology_options_id
            })).then(res => {
                if (res.data.code === 1) {
                    this.dialogFormVisible = false
                    this.Refresh()
                }
                console.log(res.data.info)
            })

        },
        Refresh() {
            this.$refs.table.onRefresh()
        },
        async getMusic() {
            await this.$axios.post('api/common/music_lst',).then(res => {
                if (res.data.code === 1) {
                    this.musicList = res.data.data;
                }
            })
        },
        // async getPhysiology() {
        //     await this.$axios.post('api/common/physiology_param',).then(res => {
        //         if (res.data.code === 1) {
        //             this.physiologyList = res.data.data
        //         }
        //     })
        // },

        async getProgramme() {
            await this.$axios.post('api/common/emotion_lst',).then(res => {
                if (res.data.code === 1) {
                    this.programme_options = res.data.data
                }
            })
        },
        onProgrammeChange(e) {
            console.log(e)
            this.programme_options_id = e


            this.$axios.post('api/common/emotion_detail', this.$qs.stringify({program_id: this.programme_options_id})).then(res => {
                if (res.data.code === 1) {
                    this.gameList = res.data.data
                }
                console.log(this.gameList)
            })

            this.$axios.post('api/common/physiology_param', this.$qs.stringify({emotion_id: this.programme_options_id})).then(res => {
                if (res.data.code === 1) {
                    this.physiologyList = res.data.data
                }
                console.log(this.physiologyList)
            })

        },
        onDifficulty(e) {
            console.log(e)
            this.difficulty_options_id = e
        },
        onPhysiology(e) {
            console.log(e)
            this.physiology_options_id = e
            this.$axios.post('api/common/emotion_level_lst', this.$qs.stringify({
                program_id: this.programme_options_id,
                type: this.physiology_options_id
            })).then(res => {
                console.log(res.data)
                if (res.data.code === 1) {
                    this.difficulty_options = res.data.data
                }
                console.log(this.difficulty_options)
            })

        },
        qrcode(row) {
            this.currentRow = row;
            this.qrDialog = true;
        },
        add() {
            this.dialogFormVisible = true
        },
        // 按钮弹窗
        dialog_btn() {
            let _that = this
            _that.dialogFormVisible = true;     // alert('cap')
        },
    },
}
</script>


<style scoped lang="scss">
::v-deep {
    .el-select .el-input__inner:focus {
        border-color: #2085EF;
    }
    .el-select .el-input.is-focus .el-input__inner {
        border-color: #2085EF;
    }
    .el-button--warning {
        border-color: #33D196;
        background-color: #33D196;
    }
    .el-button--primary {
        border-color: #2085EF;
        background-color: #2085EF;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        border-color: #2085EF;
        background-color: #2085EF;
    }

}
/*弹框*/
::v-deep .dialog {
    width: 80%;
    height: 78%;
    //display: flex;
    flex-direction: column;

    .el-dialog__header {
        padding: 20px 40px 0 40px;
    }

    .el-dialog__title {
        font-size: 28px;
        font-weight: 600;
        color: #333333;
        line-height: 40px;
        width: 100%;
        margin-bottom: 22px;
    }

    .el-dialog__body {
        flex: 1;
        overflow: auto;
        padding: 30px 39px;

        .dialog_con {
            border-radius: 4px;
            border: 1px solid #2085EF;
            height: 100%;

            .dialog_left, .dialog_right {
                p {
                    font-size: 24px;
                    font-weight: 600;
                    color: #333333;
                    line-height: 33px;
                }
            }

            .el-select {
                width: 100%;
            }


            .el-form-item {
                font-size: 24px;
                font-weight: 600;
                color: #333333;
            }

            .el-form-item__label {
                text-align: left;
                font-size: 24px;
                font-weight: 600;
                color: #333333;
            }

            .line {
                height: 1px;
                color: #CDCDCD;
                margin: 0 6px;
                line-height: 35px;
            }


            .slider_btm {
                width: 100%;
                height: 300px;
                margin-top: 25px;
                overflow: auto;
                cursor: pointer;

                .scrollbar {
                    width: 100%;
                    height: 100%;
                    margin: 0 auto;

                    .slider_list {
                        div {
                            width: 100%;
                            height: 100%;
                            float: left;
                            text-align: center;
                            line-height: 60px;
                            margin-bottom: 15px;

                            img {
                                width: 100%;
                                height: 105px;
                                display: block;
                            }

                            p {
                                width: 100%;
                                height: 30px;
                                text-align: center;
                                font-size: 16px;
                                font-weight: 400;
                                color: #2085EF;
                                border: 1px solid #DCEDFE;
                                background: #DCEDFE;
                                line-height: 30px;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 1;
                                overflow: hidden;
                            }
                        }

                    }

                    .slider_list div:nth-child(odd) {
                        margin-right: 15px;
                    }

                    .slider_list:nth-child(even) {
                        margin-right: 5px;
                    }

                }
            }
        }

        .new-evaluationPatient_add {
            width: 90%;
            height: 35px;
            background: #2085EF;
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.02);
            border-radius: 2px;
            font-size: 16px;
            font-weight: bold;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            margin-left: 10px;
            margin-top: 2px;
        }

        .el-form-item__content {
            margin-left: 0 !important;
        }

    }

    .el-table__body-wrapper {
        height: 100%;
        overflow: auto;
    }

    .el-table--border {
        width: 100%;
        height: 193px;
        overflow: auto;
    }

    .slider_btm::-webkit-scrollbar, .el-table__body-wrapper::-webkit-scrollbar {
        display: block;
        width: 9px;
        height: 1px;
    }

    .slider_btm::-webkit-scrollbar-thumb, .el-table__body-wrapper::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: #D8D8D8;;
    }

    .slider_btm::-webkit-scrollbar-track, .el-table__body-wrapper::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        background: #F7F7F7;
        border-radius: 10px;
    }
}


</style>
