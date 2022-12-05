<template>
    <div>
        <Table :add="true" @add="add()" :tableTitle="tableTitle" :delete-url="deleteUrl" :isAssess="true"
               :pageFooter="true"
               :InfoHref="InfoHref" :deleteUrl="deleteUrl" :qrcode="true" @qrcode="qrcode"
               :searchUrl="url" :statistics="statistics" :statis-href="`AssessStatistics`"
               :startUrl="startUrl" :suspendUrl="suspendUrl" :endUrl="endUrl"
               :statistics_="true" :importAnswer="true" :exportAnswer="true"
               @exportAnswerClick="exportAnswerClick"
               @importAnswerClick="importAnswerClick"
               ref="table" :state_title="state_title">
        </Table>
        <!--弹出导出-->
        <el-dialog :visible.sync="exportShow" :close-on-click-modal="false" width="30vw" top="12vh">
            <div slot="title" style="display: flex;justify-content: center;font-size: 26px;font-weight: 500;color: #333333">导出答案</div>
            <el-form ref="form" :rules="rules" :model="importData" label-width="110px">
                <el-form-item label="选择量表" prop="test_paper_id">
                    <el-select v-model="test_paper_id" placeholder="请选择" style="width: 90%;" @change="getScaleExport($event)">
                        <el-option v-for="item in scaleList" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <div class="is-loading" style="width: 100%;" v-if="isLoading">
                    <div class="balls" >
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                </div>
                <el-form-item label="输入答案">

                    <template>
                        <div class="importBox" style="background: #F6F6F6;">
                            <div style="width: 15%;text-align: center;border-right: 1px solid #CDCDCD;">序号</div>
                            <div style="width: 76%;padding-left: 20px;">答案</div>
                        </div>
                    </template>
                    <template v-for="(item,index) in exportData.medical_history">
                        <div class="importBox" style="border-top: none;">
                            <div style="width: 15%;text-align: center;border-right: 1px solid #CDCDCD;">{{item.num}}</div>
                            <div style="width: 76%; padding-left: 5px;">
                                <el-input
                                    class="add-input"
                                    :ref="'add'+index"
                                    v-model="exportData.medical_history[index].answer"
                                    @keydown.native="handleKeydown($event,index)"
                                    @input="
                                        exportData.medical_history[index].answer = exportData.medical_history[index].answer.replace(
                                            /[^\[A-Z]/g,
                                            ''
                                        )"
                                    disabled
                                ></el-input>
                            </div>
                        </div>
                    </template>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer padding-20 no-padding-left no-padding-right no-padding-top" style="display: flex;justify-content: center">
                <a class="report" href="javascript:;" @click="exportClick" style="color: #FFFFFF" v-if="test_paper_id==''">
                    导出
                </a>
                <a class="report" :href="'http://xlct.shoupinkangda.com/api/exam/question_out?type=1&exam_id='
                +exam_id+'&patient_id='
                +patientId+'&test_paper_id='
                +test_paper_id"  style="color: #FFFFFF" v-else>
                    导出
                </a>
            </div>
        </el-dialog>
        <!--弹出导入-->
        <el-dialog :visible.sync="importShow" :close-on-click-modal="false" width="30vw" top="12vh">
            <div slot="title" style="display: flex;justify-content: center;font-size: 26px;font-weight: 500;color: #333333">导入答案</div>
            <el-form ref="form" :rules="rules" :model="importData" label-width="110px">
                <el-form-item label="选择量表" prop="test_paper_id">
                    <el-select v-model="test_paper_id" placeholder="请选择" style="width: 90%;" @change="getScale($event)">
                        <el-option v-for="item in scaleList" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <div class="is-loading" style="width: 100%;" v-if="isLoading">
                    <div class="balls">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <el-form-item label="输入答案">

                    <template>
                        <div class="importBox" style="background: #F6F6F6;">
                            <div style="width: 15%;text-align: center;border-right: 1px solid #CDCDCD;">序号</div>
                            <div style="width: 76%;padding-left: 20px;">答案</div>
<!--                            <div class="add-btn"@click="addItem('medical_history')">+</div>-->
                        </div>
                    </template>
                    <template v-for="(item,index) in importData.medical_history">
                        <div class="importBox" style="border-top: none;">
                            <div style="width: 15%;text-align: center;border-right: 1px solid #CDCDCD;">{{item.sort}}</div>
                            <div style="width: 76%; padding-left: 5px;">
                                <el-input
                                    class="add-input"
                                    :ref="'add'+index"
                                    v-model="importData.medical_history[index].answer"
                                    @keydown.native="handleKeydown($event,index)"
                                    @input="
                                        importData.medical_history[index].answer = importData.medical_history[index].answer.replace(
                                            /[^\[A-Z]/g,
                                            ''
                                        )"
                                ></el-input>
                            </div>
<!--                            <div class="add-btn" @click="reduceItem('medical_history',key)">-</div>-->
                        </div>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer padding-20 no-padding-left no-padding-right no-padding-top" style="display: flex;justify-content: center">
                <el-button type="primary" round @click="importClick">导入</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="qrDialog" :modal="false" width="25vw" top="35vh" :close-on-click-modal="false">
            <div class="dialog-body">
                <img :src="qr_url" alt="">
                <div class="dialog-text">
                    <h3>根据步骤扫码测评</h3>
                    <p>扫码答题，如果提示需要完善信息，则先完善信息，再进行答题</p>
                </div>
            </div>
        </el-dialog>
        <!--弹出-->
        <el-dialog :visible.sync="dialogFormXuan" :close-on-click-modal="false" width="50vw" top="25vh">
            <div slot="title" class="new-evaluationTitle">选择新建测评</div>
            <div style="display: flex;">
                <div style="margin-left: 50px;cursor: pointer;" class="t1" @click="single_training">
                    <img src="../assets/images/danrenxuanzhong.png" v-if="type == 1" style="width: 267px;height: 304px">
                    <img src="../assets/images/danren.png" v-else style="width: 267px;height: 304px">
                </div>
                <div style="margin-left: 14px;cursor: pointer;"class="t1" @click="team_training">
                    <img src="../assets/images/tuandui.png"  v-if="type == 2" style="width: 267px;height: 304px">
                    <img src="../assets/images/tuantiweixuanz.png" v-else style="width: 267px;height: 304px">
                </div>
                <div style="margin-left: 14px;cursor: pointer;"class="t1" @click="public_training">
                    <img src="../assets/images/gonggongxuanze.png"  v-if="type == 3" style="width: 267px;height: 304px">
                    <img src="../assets/images/gonggong.png" v-else style="width: 267px;height: 304px">
                </div>
            </div>
<!--            <div slot="footer" class="dialog-footer padding-20 no-padding-left no-padding-right no-padding-top">-->
<!--                <el-button type="warning" style="background: #39CBE9;border: 1px solid #CDCDCD;color: #FFFFFF;box-shadow:none;" round @click="dialogFormXuan = false">取消-->
<!--                </el-button>-->
<!--                <el-button type="primary" round style="margin-right:165px" @click="nextStep">下一步</el-button>-->
<!--            </div>-->
        </el-dialog>
        <el-dialog custom-class="dialog" :destroy-on-close="true" title="" :visible.sync="dialogFormVisible"
                   ref="dialog" @close="onDialogClose" :width="el_dialog_width">
            <div slot="title" class="new-evaluationTitle" v-if="type == 1">新建单人测评</div>
            <div slot="title" class="new-evaluationTitle" v-if="type == 2">新建团体测评</div>
            <div slot="title" class="new-evaluationTitle" v-if="type == 3">新建公共测评</div>
            <div class="new-evaluation padding-30">
                <el-row>
                    <el-col :span="12" v-if="type !== 3">
                        <el-row>
                            <el-col :span="3" class="text-center size-24 text-bold dialog-form-title gauga">患者</el-col>
                            <el-col :span="16">
                                <div>
                                    <el-row>
                                        <el-col :span="12">
                                            <el-select placeholder="请选择患者"
                                                       v-model="patientListName"
                                                       filterable :filter-method="dataFilter"
                                                       @visible-change="visibleHideSelectInput"
                                                       @change="onPatientChange($event)"
                                                       clearable
                                            >
                                                <el-option v-for="item in deviceIdList"
                                                           :key="item.id"
                                                           :value="item.id"
                                                           :label="item.name +'  '+ item.age+'岁'+'  '+item.medical_num"></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-select placeholder="请选择终端"
                                                       v-model="terminal_nickname"
                                                       filterable :filter-method="dataFilterTerminal"
                                                       @visible-change="visibleHideSelectInputTerminal"
                                                       @change="hanldClickTerminal($event)"
                                                       style="width: 100%;"
                                                       clearable
                                            >
                                                <el-option v-for="item in terminalIdList"
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
                                                        <div>{{ scope.row.patient_ + ' ' + scope.row.patient_num }}
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
                        <div class="time-select gauga_warp padding-20 no-padding-left no-padding-right">
                            <span>选择时间：</span>
                            <el-radio-group v-model="limit_time_radio" @change="changeRadio">
                                <el-radio :label="0">不限</el-radio>
                                <el-radio :label="30">30分</el-radio>
                                <el-radio :label="20">20分</el-radio>
                                <el-radio :label="10">10分</el-radio>
                            </el-radio-group>
                            <div class="input-suffix">
                                其他:
                                <el-input class="inline-input" v-model="limit_time_input"
                                          @change="changeTime"></el-input>
                                分钟
                            </div>
                        </div>
<!--                        <div class="space-20"></div>-->
<!--                        <div class="period_content gauga_warp">-->
<!--                            <el-checkbox v-model="needMusic" style="margin-right: 20px;" @change="period($event)"><p-->
<!--                                class="period">静息期</p>-->
<!--                            </el-checkbox>-->
<!--                            <template>-->
<!--                                <el-select v-model="music" placeholder="请选择" @change="onMusicChange($event)">-->
<!--                                    <el-option-->
<!--                                        v-for="item in musicList"-->
<!--                                        :key="item.id"-->
<!--                                        :label="item.name"-->
<!--                                        :value="item.id">-->
<!--                                    </el-option>-->
<!--                                </el-select>-->
<!--                            </template>-->
<!--                            <template>-->
<!--                                <el-select v-model="periodTime" placeholder="请选择" @change="onPeriodTimeChange($event)"-->
<!--                                           style="width: 140px; margin-left: 15px;">-->
<!--                                    <el-option-->
<!--                                        v-for="item in periodTime_list"-->
<!--                                        :key="item.id"-->
<!--                                        :label="item.name"-->
<!--                                        :value="item.id">-->
<!--                                    </el-option>-->
<!--                                </el-select>-->
<!--                            </template>-->
<!--                        </div>-->

                    </el-col>
                    <el-col :span="el_col_span" :offset="1">
                        <el-row>
                            <el-col :span="3" class="gauga">量表</el-col>
                            <el-col :span="20">
                                <div class="gauga_content">

                                    <div class="gauga_contentTop">
                                        <el-checkbox @change="setCheckedNodes"></el-checkbox>
                                        <p class="margin-10 no-margin-top no-margin-bottom no-margin-right">全部量表</p>
                                    </div>

                                    <div class="content_top">
                                        <el-row class="demo-autocomplete">
                                            <el-col>
                                                <el-autocomplete
                                                    v-model="state1"
                                                    :fetch-suggestions="querySearch"
                                                    placeholder="关键词搜索"
                                                    :trigger-on-focus="false"
                                                    @select="handleSelect"
                                                    style="display: block"
                                                ></el-autocomplete>
                                            </el-col>
                                        </el-row>
                                    </div>

                                    <div class="content_body">
                                        <el-tree
                                            :indent="16"
                                            :data="papeList"
                                            :key="treeKey"
                                            show-checkbox
                                            ref="tree"
                                            node-key="id"
                                            @check-change="handleCheckChange"
                                            :props="defaultProps">
                                        </el-tree>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="time-select gauga_warp padding-20 no-padding-left no-padding-right" v-if="type == 3">
                            <span>选择时间：</span>
                            <el-radio-group v-model="limit_time_radio" @change="changeRadio">
                                <el-radio :label="0">不限</el-radio>
                                <el-radio :label="30">30分</el-radio>
                                <el-radio :label="20">20分</el-radio>
                                <el-radio :label="10">10分</el-radio>
                            </el-radio-group>
                            <div class="input-suffix">
                                其他:
                                <el-input class="inline-input" v-model="limit_time_input"
                                          @change="changeTime"></el-input>
                                分钟
                            </div>
                        </div>
                    </el-col>
                </el-row>
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
import Table from '../components/Table';

export default {
    name: "Assess",
    components: {
        Table
    },
    data() {
        return {
            treeKey: new Date().getTime()+'',
            tableTitle: [
                {
                    name: '编号',
                    value: 'num',
                    width: 130
                },
                {
                    name: '姓名',
                    value: 'name',
                    width: 180
                },
                {
                    name: '终端',
                    value: 'terminal_name',
                    width: 180
                },
                {
                    name: '类型',
                    value: 'type_name',
                    width: 100
                },
                {
                    name: '测评时间',
                    value: 'create_at',
                    width: 250
                },
                {
                    name: '量表名称',
                    value: 'test_paper_name',
                    width: 300
                },
                {
                    name: '状态',
                    value: 'status_text',
                    width: 130
                }
            ],
            startUrl: 'api/exam/start',
            suspendUrl: 'api/exam/suspend',
            endUrl: 'api/exam/end',
            url: 'api/exam/index',
            deleteUrl: 'api/exam/delete',
            addHref: 'AddAssess',
            InfoHref: 'InfoAssess',
            tableData: [],
            qrDialog: false,
            currentRow: '',
            qr_url:'',
            dialogFormVisible: false,
            dialogFormXuan:false,
            state_title: true,
            addForm: {
                name: ''
            },
            infoForm: [],
            papeForm: [],
            form: {
                'patient_ids': [],
                'terminal_ids': [],
                'test_paper_ids': [],
                'limit_time': 0,
                'policy_id': []
            },
            limit_time_radio: 0,
            limit_time_input: '',
            needMusic: false,
            music: '',
            musicList: [],
            state1: '',
            papeList: [],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
            terminalList: [],
            terminal_nickname: '',
            patientList: [],
            patientListName: '',
            add_newList: [],
            patient_id: '',
            terminal_id: '',
            patient_id_name: '',
            terminal_id_name: '',
            terminalListId: [],
            patient_num: '',
            onMusicChange_id: '',
            periodTime: '',
            periodTime_list: [
                {
                    id: 1,
                    name: '3分'
                }, {
                    id: 2,
                    name: '5分'
                }
            ],
            onPeriodTimeChange_id: '',
            period_e: '',
            statistics: true,
            policyIds: '',
            type:'',
            importShow:false,
            rules: {
                test_paper_id: [{
                    required: true,
                    message: '请选择量表',
                    trigger: 'blur'
                }],
            },
            importData:{
            },
            scaleList:[],
            test_paper_id:'',
            exam_id:'',
            patientId:'',
            exportShow:false,
            exportData:{},
            isLoading:false,
            el_dialog_width:'80vw',
            el_col_span:'11',
            terminalIdList:[],
            deviceIdList:[],
        };
    },
    mounted() {
        this.getMusic();
        this.getTerminal();
        this.onPatient();
        // this.getPape()
    },
    computed: {},
    watch: {},
    methods: {
        // 自定义筛选方法
        dataFilter(val) {
            if (val) {
                let filterResult = [];
                let originalData = JSON.parse(JSON.stringify(this.patientList));
                originalData.filter((item) => {
                    if (item.medical_num.includes(val) || item.name.includes(val)) {
                        filterResult.push(item);
                    }
                })
                this.deviceIdList = filterResult

            } else {
                this.deviceIdList = this.patientList;
            }
        },
        // 当下拉框出现时触发
        visibleHideSelectInput(val) {
            if(val) {
                this.deviceIdList = JSON.parse(JSON.stringify(this.patientList));
            }
        },
        // 自定义筛选方法
        dataFilterTerminal(val) {
            if (val) {
                let filterResult = [];
                let originalData = JSON.parse(JSON.stringify(this.terminalList));
                originalData.filter((item) => {
                    if (item.nickname.includes(val)) {
                        filterResult.push(item);
                    }
                })
                this.terminalIdList = filterResult

            } else {
                this.terminalIdList = this.terminalList;
            }
        },
        // 当下拉框出现时触发
        visibleHideSelectInputTerminal(val) {
            if(val) {
                this.terminalIdList = JSON.parse(JSON.stringify(this.terminalList));
            }
        },
        //导出量表点击
        getScaleExport(prov) {
            this.isLoading = true
            this.test_paper_id = prov
            this.$axios.post('api/exam/question_out', this.$qs.stringify({
                exam_id:this.exam_id,
                patient_id:this.patientId,
                test_paper_id: prov,
                type:0
            })).then(res => {
                this.isLoading = false
                this.exportData.medical_history = res.data.data
            })
        },
        //导出按钮点击
        exportClick() {
            if (this.test_paper_id=== '') {
                this.$message({
                    type: 'info',
                    message: '请先选择量表'
                });
                return;
            }
            // window.open(
            //     'http://xlct.shoupinkangda.com/api/exam/question_out?type=1&exam_id='
            //     +this.exam_id+'&patient_id='
            //     +this.patientId+'&test_paper_id='
            //     +this.test_paper_id
            // )
        },
        //导入量表点击
        getScale(prov) {
            this.isLoading = true
            this.test_paper_id = prov
            this.$axios.post('api/exam/question_all', this.$qs.stringify({
                id: prov,
            })).then(res => {
                this.isLoading = false
                let list = []
                list = res.data.data
                list.map((item,index) => {
                    item.answer = ''
                })
                this.importData.medical_history = list
            })
        },
        //导入答案点击
        importAnswerClick(id) {
            this.exam_id = id[0]
            this.test_paper_id = ''
            this.importData ={
                medical_history: [''],
            },
                this.$axios.post('api/exam/table_lst', this.$qs.stringify({
                    id: id[0],
                })).then(res => {
                    this.scaleList = res.data.data
                })
            this.importShow = true
        },
        //导入按钮点击
        importClick() {
            if (this.test_paper_id=== '') {
                this.$message({
                    type: 'info',
                    message: '请先选择量表'
                });
                return;
            }
            this.isLoading = true
            let list = []
            this.importData.medical_history.map((item,index) => {
                list.push({question_id:item.id,type_id:item.type_id,answer:item.answer})
            })
            this.$axios.post('api/exam/question_enter', this.$qs.stringify({
                test_paper_id:this.test_paper_id,
                exam_id:this.exam_id,
                data: list,
            })).then(res => {
                this.isLoading = false
                this.importShow = false
                this.Refresh()
            })
        },
        //上下键，回车键点击 input获取焦点
        handleKeydown(event,index) {
            if(event.keyCode == 40) {
                if((index+1) == this.importData.medical_history.length) {
                    this.$message.error('当前为最后一题');
                    return;
                }
                this.$nextTick(() => {
                    this.$refs[`add${index+1}`][0].focus();
                })
            } else if (event.keyCode == 38){
                if((index) == 0) {
                    this.$message.error('当前为第一题');
                    return;
                }
                this.$nextTick(() => {
                    this.$refs[`add${index-1}`][0].focus();
                })
            } else if(event.keyCode == 13) {
                if((index+1) == this.importData.medical_history.length) {
                    this.$message.error('当前为最后一题');
                    return;
                }
                this.$nextTick(() => {
                    this.$refs[`add${index+1}`][0].focus();
                })
            }
        },
        // addItem(name) {
        //     this.importData[name].push('')
        // },
        // reduceItem(name, key) {
        //     this.importData[name].splice(key, 1)
        // },
        //导出答案点击
        exportAnswerClick(id,data) {
            this.exam_id = id[0]
            this.exportData ={
                medical_history: [''],
            },
                this.test_paper_id = ''
            this.patientId = data.patient_id
            this.$axios.post('api/exam/table_lst', this.$qs.stringify({
                id: id[0],
            })).then(res => {
                this.scaleList = res.data.data
            })
            this.exportShow = true
        },

        //单人训练点击
        single_training() {
            this.type = 1
            this.el_dialog_width = '80vw'
            this.el_col_span = '11'
            this.nextStep()
        },
        //团队训练点击
        team_training() {
            this.type = 2
            this.el_dialog_width = '80vw'
            this.el_col_span = '11'
            this.nextStep()
        },
        //公共训练点击
        public_training() {
            this.type = 3
            this.el_dialog_width = '50vw'
            this.el_col_span = '20'
            this.nextStep()
        },
        period(e) {
            this.period_e = e
        },
        onDialogClose() {
            this.add_newList = [];
            this.patientListName = '';
            this.terminal_nickname = '';
            this.music = '';
            this.limit_time_radio = '';
            this.needMusic = false;
            this.limit_time_input = '';
            this.limit_time_radio = 0
            this.periodTime = ''
        },

        deleteRow(index, rows) {
            this.add_newList.splice(index, 1)
        },

        Refresh() {
            this.$refs.table.onRefresh()
        },

        onPatientChange(e) {
            this.patient_id = e
            this.patient_id_name = e ? this.patientList.find(ele => ele.id === e).name : ''
            this.patient_id_num = e ? this.patientList.find(ele => ele.id === e).medical_num : ''
        },

        add_new() {
            if(this.patientListName == '') {
                this.$message.error('请选择患者');
                return;;
            }
            if (this.patientListName) {
                for (let i = 0; i < this.add_newList.length; i++) {
                    let item = this.add_newList[i];
                    if (item.patient_id === this.patient_id) {
                        this.$message.error('该用户已被指定');
                        return;
                    }
                    // if (item.terminal_id === this.terminal_id) {
                    //     this.$message.error('该终端已被使用');
                    //     return;
                    // }
                    if(item.terminal_id>0 && item.terminal_id === this.terminal_id) {
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
        },
        //终端接口
        getTerminal() {
            this.$axios.post('api/common/termLst').then(res => {
                if (res.data.code === 1) {
                    let terminalListId = {};
                    this.terminalList = res.data.data.map(item => {
                        terminalListId[item.id] = item;
                        return item;
                    })
                    this.terminalListId = terminalListId
                }
            })
        },
        //患者接口
        async onPatient() {
            await this.$axios.post('api/patient/index', this.$qs.stringify({
                type: 1,
            })).then(res => {
                if (res.data.code == 1) {
                    this.patientList = res.data.data
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
            var isSelect = false;
            this.infoForm.map(infoI => {
                if (infoI.terminal.id == item.id) {
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
            // console.log(this.terminal_id_name)
        },
        deleteInfo(key) {
            this.infoForm.splice(key, 1)
        },
        setCheckedNodes(e) {
            if (e === true) {
                this.$refs.tree.setCheckedNodes(this.papeList);
            } else {
							this.$refs.tree.setCheckedNodes([]);
							this.treeKey = new Date().getTime() + ''
            }
        },
        async getPape() {
            if(this.type == 2) {
                this.papeList = []
                this.$axios.post('api/common/tableLst', this.$qs.stringify({
                    type: 1,
                })).then(res => {
                    if (res.data.code === 1) {
                        var papeFormId = {};
                        this.papeList = this.papeList.concat(res.data.data.map(item => {
                            item.child.map(i => {
                                papeFormId[i.id] = i
                            });
                            return item
                        }))
                        let b=[]
                        this.papeList.map((item=>{
                            item.child.map((item2)=>{
                                b.push(item2)
                            })
                        }))
                        this.papeFormId = b
                        // this.papeFormId = papeFormId
                    }
                })
            } else {
                await this.$axios.post('api/common/tableLst').then(res => {
                    if (res.data.code === 1) {
                        var papeFormId = {};
                        this.papeList = this.papeList.concat(res.data.data.map(item => {
                            item.child.map(i => {
                                papeFormId[i.id] = i
                            });
                            return item
                        }))
                        let b=[]
                        this.papeList.map((item=>{
                            item.child.map((item2)=>{
                                b.push(item2)
                            })
                        }))
                        this.papeFormId = b
                        // this.papeFormId = papeFormId

                    }
                })
            }

        },
        async getPolicy() {
            this.papeForm = []
            this.papeList = []
            this.papeFormId = []
            await this.$axios.post('api/policy/lst',{
                type:1
            }).then(res => {
                if (res.data.code === 1) {
                    this.papeList = res.data.data.map(item => {
                        item.child = item.names
                        return item;
                    })

                }

                this.getPape()
            })
        },
        handleCheckChange() {
            var papeForm = []
            var policyIds_ = []
            this.$refs.tree.getCheckedNodes().map(item => {
                if ('child' in item == false) {
                    papeForm.push(item);
                }

                if (item.hasOwnProperty('ids')) {
                    // console.log(item.id)
                    policyIds_.push(item.id)
                }
            })
            this.policyIds = policyIds_
            this.papeForm = papeForm
        },
        querySearch(queryString, cb) {
            var restaurants = [];
            for (const key in this.papeFormId) {
                var item = this.papeFormId[key];
                item.value = item.name
                restaurants.push(item)
            }
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
            //console.log('res',results)
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
            };
        },
        async getMusic() {
            await this.$axios.post('api/common/music_lst',).then(res => {
                if (res.data.code == 1) {
                    this.musicList = res.data.data;
                }
            })
        },
        handleSelect(val) {
            // console.log('val',val)
            this.$refs.tree.setCheckedKeys([...this.$refs.tree.getCheckedKeys(),val.id]);
            this.$refs.tree.getHalfCheckedNodes().map((item)=>{
                this.$refs.tree.store.nodesMap[item.id].expanded = true
            })
            this.state1 = '';
            if ('chirld' in val == true) {
                return;
            }
            var isSet = true;
            this.papeForm.map(item => {
                if (item.id == val.id) {
                    isSet = false;
                    return;
                }
            })
            if (isSet == true) {
                this.papeForm.push(val)
                this.$forceUpdate()
            }
        },
        //二维码弹窗点击显示事件
        async qrcode(row) {
            this.qrDialog = true;
            let id = row.id
            await this.$axios.post('api/exam/getQr',{
                    id:id
                }
            ).then(res => {
                if (res.data.code === 1) {
                    this.qr_url = res.data.data.url
                }
            })
        },
        add() {
            this.dialogFormXuan = true
            this.qingkong()
            this.type = ''

        },
        nextStep() {
            if(this.type == 2) {
                this.getPape()
            } else {
                this.getPolicy()
            }
            this.dialogFormXuan = false
            this.dialogFormVisible = true
        },
        onMusicChange(e) {
            // console.log(e)
            this.onMusicChange_id = e
        },
        onPeriodTimeChange(e) {
            // console.log(e)
            // console.log(this.periodTime)
        },
        qingkong() {
            this.add_newList = [];
            this.patientListName = '';
            this.terminal_nickname = '';
            this.music = '';
            this.limit_time_radio = '';
            this.needMusic = false;
            this.limit_time_input = '';
            this.limit_time_radio = 0
            this.periodTime = ''
            this.limit_Time =''
            this.curindex = 0;
            this.infoForm = []
            this.curInfo = ''
            this.terminal_id = ''
            this.terminal_id_name = ''
        },
        async buttonSubmit() {
            if (this.period_e === true) {
                if (this.music === '') {
                    this.$message('请选择音乐')
                    return;
                }
                if (this.periodTime === '') {
                    this.$message('请选择音乐时间')
                    return;
                }
                this.period_e = ''
            }
            let patient_ids = [];
            let terminal_ids = [];
            let test_paper_ids = [];
            let policy_id = [];

            this.add_newList.map(item => {
                patient_ids.push(item.patient_id)
            })
            // console.log(patient_ids)

            this.add_newList.map(item => {
                terminal_ids.push(item.terminal_id)
            })
            // console.log(terminal_ids)
            this.papeForm.map(item => {
                test_paper_ids.push(item.id)
                // console.log(item)
            })

            if  (this.policyIds !=='') {
                this.policyIds.map(item => {
                    policy_id.push(item)
                })
            }

            if (patient_ids.length<=0 && this.type !== 3) {
                this.$message.error('请选择患者');
                return;
            }
            // console.log(test_paper_ids)
            this.form.patient_ids = patient_ids.join(',')
            this.form.terminal_ids = terminal_ids.join(',')
            this.form.test_paper_ids = test_paper_ids.join(',');
            this.form.music_id = this.onMusicChange_id;
            this.form.music_time = this.periodTime;
            this.form.policy_id = policy_id.join(',')
            // console.log(this.form)
            console.log('this.type',this.type)
            if(this.type == 2) {
                this.form.type = 1
            }else if(this.type == 3) {
                this.form.type = 2
            } else {
                this.form.type = 0
            }
            await this.$axios.post('api/exam/add', this.$qs.stringify(this.form)).then(res => {
                if (res.data.code === 1) {
                    this.dialogFormVisible = false
                    this.Refresh()
                    this.qingkong()
                }
                // console.log(res.data.info)
            })
            // console.log(patient_ids)

        },

        changeRadio() {
            this.limit_time_input = '';
            this.form.limit_time = this.limit_time_radio
            // console.log(this.limit_time_radio);

        },
        changeTime() {
            this.limit_time_radio = '';
            this.form.limit_time = this.limit_time_input
        },
    }
    ,
}
</script>
<style>
/*.dialog {*/
/*    width: 80%;*/
/*    height: 75%;*/
/*}*/

@media (max-width: 1024px) {
    .dialog {
        width: 767px;
    }
}
</style>

<style scoped lang="scss">
.report {
    width: 150px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background: #7A40F2;
    border-radius: 25px;
    font-size: 20px;
}
.is-loading {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(255, 255, 255, .8);
    display: flex;
    justify-content: center;
    align-items: center;
    .balls {
        height: 100%;
        margin: auto;
        width: 4em;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
    }

    .balls div {
        width: 0.8em;
        height: 0.8em;
        border-radius: 50%;
        background-color: #7A40F2;
    }

    .balls div:nth-of-type(1) {
        transform: translateX(-100%);
        animation: left-swing 0.5s ease-in alternate infinite;
    }

    .balls div:nth-of-type(3) {
        transform: translateX(-95%);
        animation: right-swing 0.5s ease-out alternate infinite;
    }

    @keyframes left-swing {
        50%,
        100% {
            transform: translateX(95%);
        }
    }

    @keyframes right-swing {
        50% {
            transform: translateX(-95%);
        }
        100% {
            transform: translateX(100%);
        }
    }
}
::v-deep .el-form-item__content {
    max-height: 450px;
    overflow: scroll;
}
::v-deep .el-input.is-disabled .el-input__inner {
    background: #FFFFFF;
    color: #666666;
}
.importBox {
    width: 90%;
    position: relative;
    display: flex;
    border: 1px solid #CDCDCD;
    margin-right: 10px;
    color: #666666;
    .add-btn {
        width: 40px;
        height: 40px;
        background: #F2F2F2;
        border-radius: 2px;
        border-left: 1px solid #D2D2D2;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
    }
    ::v-deep .el-input__inner {
        border: none!important;
    }
}

.dialog-form-title {
    line-height: 40px;
}

.dialog-body {
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
        width: 200px;
        height: 200px;
    }
}

.dialog-text {
    margin-left: 50px;
    width: 13em;
    color: #333333;

    > h3 {
        font-size: 18px;
        margin-bottom: 5px;
    }

    > p {
        font-size: 16px;
    }
}

.new-evaluation {
    margin: 0 20px;
    border-radius: 4px;
    border: 1px solid #7A40F2;
}

.new-evaluationTitle {
    font-size: 28px;
    font-weight: 600;
    color: #333333;
    margin-left: 20px;
}

.evaluationBtn {
    margin-right: 50px;
    margin-bottom: 10px;
}

::v-deep .el-table__body-wrapper {
    height: 100%;
    overflow: auto;
}

.time-select {
    border-bottom: 1px solid #cccccc;
    display: flex;
    align-items: center;
    font-size: 17px;

    span {
        font-weight: bold;
        color: #000000;
        margin-bottom: 6px;
    }
}

.input-suffix {
    margin-left: 20px;
    display: flex;
    width: 150px;
    white-space: nowrap;
    align-items: flex-end;

    ::v-deep .el-input__inner {
        border-top: none;
        border-left: none;
        border-right: none;
        line-height: 20px;
        height: 20px;
        text-align: center;
    }
}

.period_content {
    font-size: 17px;
}

.period {
    font-weight: bold;
    font-size: 17px;
    color: #000000;
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

.gauga {
    font-size: 24px;
    font-weight: 600;
    color: #333333;
    line-height: 33px;
}

.gauga_title {
    margin: 0 0 10px 30px;
}


.gauga_content {
    border-radius: 2px;
    border: 1px solid #cdcdcd;
    margin-left: 30px;
}

.content_top {
    margin: 15px;
}

.content_body {
    overflow: auto;
    height: 235px;
    padding: 0 17px;
}

.demo-autocomplete {
    width: 100%;
}

.gauga_contentTop {
    height: 50px;
    border-bottom: 1px solid #cccccc;
    display: flex;
    align-items: center;
    padding-left: 40px;
}
::v-deep {
    .el-select .el-input__inner:focus {
        border-color: #7A40F2;
    }
    .el-select .el-input.is-focus .el-input__inner {
        border-color: #7A40F2;
    }
    .el-radio__input.is-checked + .el-radio__label {
        color: #7A40F2;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }
    .el-button--warning {
        border-color: #39CBE9;
        background-color: #39CBE9;
    }
    .el-button--primary {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }

}
.new-evaluationPatient_add {
    width: 100px;
    height: 35px;
    background: #7A40F2;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.02);
    border-radius: 2px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    margin-left: 10px;
    margin-top: 2px;
}

.content_body::-webkit-scrollbar, .el-table__body-wrapper::-webkit-scrollbar {
    display: block;
    width: 9px;
    height: 9px;
}

.content_body::-webkit-scrollbar-thumb, .el-table__body-wrapper::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background: #D8D8D8;;
}

.content_body::-webkit-scrollbar-track, .el-table__body-wrapper::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background: #F7F7F7;
    border-radius: 10px;
}
</style>
