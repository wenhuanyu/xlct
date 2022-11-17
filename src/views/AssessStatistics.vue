<template>
    <div>
        <div class="content_top">
            <div></div>
            <div>
                <el-button type="primary" v-print="'#print'" icon="el-icon-printer">
                    打印
                </el-button>
                <el-button type="warning" @click="dialogPrint = true" icon="el-icon-s-tools">
                    打印设置
                </el-button>
                <el-button style="color: #000000;" plain @click="$router.go(-1)" icon="el-icon-arrow-left">
                    返回主页面
                </el-button>
            </div>
        </div>
        <div class="content_body">
            <div class="print-html" ref="print" id="print">
                <div class="title">
                    <div>
                        <p>孕周心理检查</p>
                        <span>综合评估报告</span>
                    </div>
                </div>

                <div class="print-body">
                    <div class="first ">
                        <div class="first-group">
                            <div class="row">
                                <span>姓名</span>
                                <p>{{ patient_infoList.name }}</p>
                            </div>
                            <div class="row">
                                <span>年龄</span>
                                <p>{{ patient_infoList.age }}</p>
                            </div>
                            <div class="row">
                                <span>检查次数</span>
                                <p>{{ patient_infoList.exam_count }}</p>
                            </div>
                        </div>
                        <div class="first-group">
                            <div class="row">
                                <span>性别</span>
                                <p>{{ patient_infoList.gender }}</p>
                            </div>
                            <div class="row">
                                <span>孕周</span>
                                <p>{{ patient_infoList.yunzhou }}</p>
                            </div>
                            <div class="row">
                                <span>方案内容</span>
                                <p>{{ patient_infoList.policy }}</p>
                            </div>
                        </div>
                        <div class="first-group" style="border-right: 0">
                            <div class="row">
                                <span>出生日期</span>
                                <p>{{ patient_infoList.birth }}</p>
                            </div>
                            <div class="row">
                                <span>检查者/指导者</span>
                                <p>{{ patient_infoList.user }}</p>
                            </div>
                            <div class="row">
                                <span>测试时间</span>
                                <p>{{ patient_infoList.exam_time }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="print-row">
                        <div class="table-name">
                            <p>受试者资料</p>
                            <span class="edit-btn"  v-if="showEdit"
                                  @click="getProposal_({title:'受试者资料',field:'shouhaizheziliao',})"><i
                                class="el-icon-edit"></i>点击此处修改</span>
                        </div>
                        <textarea ref="test__" v-html="currentValue__" class="report-text-content" style="height: 0"></textarea>
                    </div>
                    <div class="print-row">
                        <div class="table-name">
                            <p>病史</p>
                        </div>
                        <div v-for="item in this.patient_infoList.medical_history">
                            <p class="report-text-content">{{ item }}</p>
                        </div>
                    </div>
                    <div class="print-row">
                        <p>精神病史及药物滥用史</p>
                        <div v-for="item in this.patient_infoList.drug_history">
                            <p class="report-text-content">{{ item }}</p>
                        </div>
                    </div>
                    <div class="print-row">
                        <p>目前服用药物</p>
                        <div v-for="item in this.patient_infoList.take_medicine">
                            <p class="report-text-content">{{ item }}</p>
                        </div>
                    </div>
                    <div class="print-row">
                        <p>社会心理学史/教育史/执业史</p>
                        <div v-for="item in this.patient_infoList.edu_history">
                            <p class="report-text-content">{{ item }}</p>
                        </div>
                    </div>
                    <div class="print-row">
                        <p>目前居住环境及每日行动轨迹</p>
                        <div v-html="this.patient_infoList.live_environment" class="report-text-content">

                        </div>
                    </div>
                    <div class="print-row" :class="printData[1].value ? '' : 'print-none'">
                        <div class="table-name">
                            <p>评估采用的量表</p>
                        </div>
                        <div v-for="item in this.scaleList">
                            <div>{{ item.name }}</div>
                            <div class="flex_con">
                                <div v-for="item_ in item.list">
                                    <p class="scaleList_item">{{ item_ }}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="print-row" :class="printData[2].value ? '' : 'print-none'">
                        <div class="table-name">
                            <p>评估结果</p>
                        </div>
                        <div class="report print-row" style="border-bottom: none;">
                            <div class="report-item" v-for="item in this.resultList">
                                <p>{{ item.name }}</p>
                                <div class="item" v-for="item_ in item.list">
                                    <p>{{ item_.name }}</p>
                                    <div class="result-item">
                                        <span>{{ item_.score }}</span><span>{{item_.desc}}</span><span>{{item_.range}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="report-item" v-if="resting_period == 1">
                                <p>总体生理指标</p>
                                <div class="line-item item">
                                    <div v-for="item in this.physiologyList" style="display: flex">
                                        <div style="width: 50%">
                                            <span>{{ item.name }}</span><span class="item_score">{{ item.score }}</span>
                                        </div>
                                        <div style="width: 50%">
                                            <span>{{ item.title }}</span><span>{{ item.title_value }}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="print-row" :class="printData[3].value ? '' : 'print-none'">
                        <div class="table-name">
                            <p>总结和印象</p>
                            <span class="edit-btn" v-if="showEdit"
                                  @click="getProposal({title:'模板内容',type:6,field:'mobanneirong'})"><i
                                class="el-icon-edit"></i>点击此处修改</span>
                        </div>
                        <textarea ref="test" class="report-text-content"  v-html="currentValue" style="height: 0"></textarea>
                    </div>
                    <div class="print-row" :class="printData[4].value ? '' : 'print-none'">
                        <div class="table-name">
                            <p>建议</p>
                            <span class="edit-btn" v-if="showEdit"
                                  @click="getProposal({title:'建议内容',type:7,field:'jianyineirong'})"><i
                                class="el-icon-edit"></i>点击此处修改</span>
                        </div>
                        <textarea ref="test_" v-html="currentValue_" class="report-text-content" style="height: 0"></textarea>
                    </div>
                    <div class="print-last-row">
                        <div class="group">
                            <span>操作员：</span>
                            <p>{{ patient_infoList.user }}</p>
                            <!--                            <p>{{ patient_infoList.user_img === "" ? patient_infoList.user : '' }}</p>-->
                            <!--                            <p><img style="height: 55px" :src="patient_infoList.user_img"></p>-->
                        </div>
                        <div class="group">
                            <span>检测时间：</span>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div class="tip">***本报告不对任何决定负责！应为被试的报告内容保密！***</div>
                <div style="height: 20px"></div>
            </div>
        </div>
        <el-dialog class="new-dialog" title="打印设置" :visible.sync="dialogPrint">
            <el-form style="max-height: 550px;">
                <el-form-item label="打印项" label-width="130px">
                    <el-checkbox-group v-model="printForm">
                        <el-checkbox v-for="item in printData" :key="item.id" :label="item.id">
                            {{ item.name }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="打印大小" label-width="130px">
                    <el-radio-group v-model="printPageSize">
                        <el-radio label="1" style="display: block">A4</el-radio>
                        <div class="space-10"></div>
                        <el-radio label="2" style="display: block">A5</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="修改设置" label-width="130px">
                    <el-radio-group v-model="displayBlock">
                        <el-radio label="2" @change="changeRadio($event)">否</el-radio>
                        <el-radio label="1" @change="changeRadio($event)">是</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPrint = false" style="margin-right: 10px">取 消</el-button>
                <el-button type="primary" @click="printSet">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog class="new-dialog text-dialog" :title="modifyTitle.title" :visible.sync="dialogProposal" width="40%"
                   :close-on-click-modal="false"
                   :show-close="false">
            <div style="width: 100%;">
                <div class="proposal-text">
                    <span>历史模板</span>
                    <el-select style="width: 80%;" v-model="doctorProposal" @change="templateText = $event;"
                               :popper-append-to-body="false" popper-class="popper-class">
                        <el-option v-for="(item,index) in doctorProposalList" :key="item.id" :label="item.content"
                                   :value="item.content">
                        </el-option>

                    </el-select>
                </div>
                <div class="proposal-text">
                    <span class="proposal-text_span">{{ modifyTitle.title }}</span>
                    <textarea v-model="templateText" rows="10"></textarea>
                </div>
                <div class="button-wrap">
                    <el-button type="primary" @click="proposalConfirm">确 定</el-button>
                    <el-button @click="dialogProposal = false" style="border: 1px solid #DCDFE6 !important;">取 消</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog class="new-dialog text-dialog" :title="modifyTitle_.title" :visible.sync="dialogProposal_"
                   width="40%"
                   :close-on-click-modal="false"
                   :show-close="false">
            <div style="width: 100%;">
                <div class="proposal-text">
                    <textarea v-model="templateText_" rows="10" style="width: 100%"></textarea>
                </div>
                <div class="button-wrap">
                    <el-button type="primary" @click="proposalConfirm_">确 定</el-button>
                    <el-button @click="dialogProposal_ = false" style="border: 1px solid #DCDFE6 !important;">取 消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "AssessStatistics",
    data() {
        return {
            isFinished: false,
            info: [],
            detailForm: [],
            district: [],
            printer: [],
            printForm: [],
            dialogPrint: false,
            printData: [
                {id: '1', name: '患者详细数据打印', value: false},
                {id: '2', name: '评估采用的量表', value: false},
                {id: '3', name: '评估结果', value: false},
                {id: '4', name: '总结和印象', value: false},
                {id: '5', name: '建议', value: false},
            ],
            printPageSize: '',
            displayBlock: '2',
            showEdit: false,
            infoData: [],
            dialogIpt: false,
            dialogText: '',
            doctorAdvised: '',
            current: {},
            currentMethod: '',
            dialogProposal: false,
            dialogProposal_: false,
            doctorProposalList: [],
            doctorProposal: '',
            dialogReport: false,
            wardList: [],
            dialogPreview: false,
            previewImg: '',
            print_page: 1,
            modifyTitle: {title: '医生建议', type: 5, field: 'doctor_proposal'},
            templateText: '',
            templateText_: '',
            Leisure: false,
            LeisureList: [],
            calcName: '',
            printShow: true,
            printASKQX: false,
            patient_infoList: [],
            scaleList: [],
            resultList: [],
            modifyTitle_: {title: '', field: ''},
            physiologyList: [],
            currentValue: '',
            currentValue_: '',
            currentValue__: '',
            resting_period:'',
        }
    },
    async mounted() {
        await this.getPrinter();
        await this.getStatistics()
        sessionStorage.setItem("detail", true);
    },
    watch:{
        currentValue (nv, ov) {
            if (nv === ov) {
                return
            }
            this.currentValue = nv
            this.changeHeight()
        },
        currentValue_ (nv, ov) {
            if (nv === ov) {
                return
            }
            this.currentValue_ = nv
            this.changeHeight()
        },
        currentValue__ (nv, ov) {
            if (nv === ov) {
                return
            }
            this.currentValue__ = nv
            this.changeHeight_()
        }
    },
    methods: {
        changeHeight () {
            let _this = this
            this.$nextTick(() => {
                if(this.modifyTitle.type == 6){
                    var textArea = _this.$refs.test
                }

                if(this.modifyTitle.type == 7){
                    var textArea = _this.$refs.test_
                }
                let scrollHeight = textArea.scrollHeight // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
                let height = textArea.offsetHeight // 屏幕上显示的高度
                if (height <= scrollHeight) {
                    textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                    textArea.style.height = textArea.scrollHeight + 'px' // 拿到最新的高度改变textarea的高度
                }else {
                    textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                }
            })
        },
        changeHeight_ () {
            let _this = this
            this.$nextTick(() => {
                let textArea = _this.$refs.test__
                let scrollHeight = textArea.scrollHeight // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
                let height = textArea.offsetHeight // 屏幕上显示的高度
                if (height <= scrollHeight) {
                    textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                    textArea.style.height = textArea.scrollHeight + 'px' // 拿到最新的高度改变textarea的高度
                }else {
                    textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                }
            })
        },
        async getStatistics() {
            await this.$axios.post('api/report/comprehensive', {
                exam_id: this.$route.query.id
            }).then(res => {
                if (res.data.code === 1) {
                    this.resting_period = res.data.data.resting_period
                    this.patient_infoList = res.data.data.patient_info
                    this.scaleList = res.data.data.scale
                    this.resultList = res.data.data.result
                    this.physiologyList = res.data.data.physiology
                    console.log('this.physiologyList', this.physiologyList)
                }
                if (res.data.data.patient_info.gender === 0) {
                    res.data.data.patient_info.gender = '女'
                } else if (res.data.data.patient_info.gender === 1) {
                    res.data.data.patient_info.gender = '男'
                }
            });
        },
        /**
         * 获取打印设置
         */
        async getPrinter() {
            await this.$axios.post('api/setting/printer_set_info', {
                type: 4
            }).then(res => {
                if (res.data.code === 1) {
                    this.printForm = res.data.data.item.map(item => item);
                    this.printPageSize = res.data.data.paper;
                    this.displayBlock = res.data.data.edit
                }
                this.printData.map(item => {
                    item.value = this.printForm.indexOf(item.id) !== -1;
                })
                console.log(this.printData)
                this.$forceUpdate();
            });
            if(this.displayBlock == 1){
                this.showEdit = true
            }else if(this.displayBlock == 2){
                this.showEdit = false
            }
        },
        /**
         * 设置打印参数
         */
        async printSet() {
            this.printData.map(item => {
                console.log("~ item", item)
                item.value = this.printForm.indexOf(item.id) !== -1;
            })
            await this.$axios.post('api/setting/printer_set', {
                item: this.printForm,
                paper: this.printPageSize,
                edit: this.displayBlock,
                type: 4
            }).then(res => {
                this.dialogPrint = false
                this.getPrinter()
            })
        },
        /**
         * 显示编辑
         */
        changeRadio(e) {

        },
        async getProposal({title, type, field}) {
            console.log(type)
            await this.$axios.post('api/template/lst', {
                // test_paper_id: this.$route.query.id,
                type: type
            },).then(res => {
                this.doctorProposalList = res.data.data;
            });
            this.modifyTitle = {title, type, field}
            this.doctorProposal = this.infoData[field];
            this.templateText = this.infoData[field];
            this.dialogProposal = true;
        },
        getProposal_({title, field, type}) {
            this.dialogProposal_ = true;
            this.templateText_ = this.infoData[field];
            this.modifyTitle_ = {title, field,type}
            console.log('title',title)
        },
        proposalConfirm_() {
            this.dialogProposal_ = false;
            this.infoData[this.modifyTitle_.field] = this.templateText_;
            console.log(this.templateText_)
            this.templateText = '';
            this.currentValue__ =  this.infoData[this.modifyTitle_.field]
        },
        async proposalConfirm() {
            if (!this.templateText) {
                return;
            }
            let list = this.doctorProposalList.map(item => item.content);
            if (list.indexOf(this.templateText) === -1) {
                await this.$axios.post('api/template/add', {
                    // test_paper_id: this.$route.query.id,
                    content: this.templateText,
                    type: this.modifyTitle.type
                })
            }
            this.dialogProposal = false;
            this.infoData[this.modifyTitle.field] = this.templateText;
            this.templateText = '';
            if(this.modifyTitle.type == 6){
                this.currentValue = this.infoData[this.modifyTitle.field]
            }

            if(this.modifyTitle.type == 7){
                this.currentValue_ = this.infoData[this.modifyTitle.field]
            }


        },
    },
}
</script>

<style scoped lang="scss">
.flex_con {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
}

.scaleList_item {
    font-size: 16px;
    color: #666;
    margin-right: 20px;
}

.report-text-content {
    width: 100%;
    display: block;
    flex: 1;
    font-size: 16px;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif, "Microsoft YaHei";
}

.button-wrap {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.proposal-text {
    display: flex;
    align-items: center;
    margin-top: 30px;
    position: relative;

    > span {
        margin-right: 20px;
    }

    > textarea {
        width: 80%;
        font-size: 18px;
        padding: 8px;
        border: 1px solid #cdcdcd;
        box-sizing: border-box;
    }

    ::v-deep .el-select-dropdown {
        max-width: 30em;
        top: unset !important;
        left: unset !important;
    }
}

.text-dialog ::v-deep .el-dialog__header {
    padding: 0;
}

::v-deep .new-dialog span,
::v-deep .new-dialog label {
    font-size: 20px;
}

.dialog-footer {
    .el-button {
        border-radius: 25px;
        width: 150px;
    }
}

::v-deep .el-checkbox {
    padding-left: 20px;
    width: 98%;
}

.bold {
    font-weight: bold;
}

.content_body {
    position: relative;
    overflow: scroll;
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    max-width: 100%;
    background-color: #FFFFFF;
    font-size: 14px;
    color: #606266;
    padding: 18px;
}


.print-html {
    margin: 0 auto;
    width: 1050px;
    height: 76vh;

    .print-none {
        display: none;
    }

    .edit-btn.active {
        display: block !important;
    }

    @media print {
        width: 700px;
        height: 1200px;
    }
}

.print-html > .title {
    color: #333;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
}

.print-html > .title img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    margin-right: 15px;
}

.print-html > .title p {
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 5px;
}

.table-name {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 0 auto 10px;
    font-size: 16px;
    color: #333;
}

.table-name p {
    font-size: 24px;
    font-weight: bold;
}

.print-html .edit-btn {
    color: #7A40F2;
    position: absolute;
    right: 0;
    cursor: pointer;
    @media print {
        display: none;
    }
}

.print-body {
    border: 1px solid #E6E6E6;
    border-bottom: none;
}

.print-body .first {
    display: flex;
}

.print-body .first > .first-group {
    flex: 1;
    padding: 10px 25px;
    border-right: 1px solid #E6E6E6;
    @media print {
        padding: 10px 0;
    }
}

.print-body .row {

    display: flex;
    align-items: center;
    font-size: 16px;
    color: #333;
    //padding-left: 25px;
    margin-bottom: 5px;
}

.print-body .first > .first-group span {
    width: 105px;
    //text-align: right;
    text-align-last: justify;
}

.print-body .first > .first-group p {
    margin-left: 15px;
    font-weight: bold;
}

.print-last-row,
.first,
.print-row {
    border-bottom: 1px solid #E6E6E6;
}

.print-row {
    padding: 10px 25px;
    color: #333;
    font-size: 18px;

    .report-item > p,
    .item > p,
    > p {
        font-size: 20px;
        line-height: 72px;
    }

    > ul {
        margin-left: 1em;
        list-style-image: url("../assets/images/rond.png");
    }

    > ul li {
        font-weight: normal;
    }

    .result-item {
        color: #7A40F2;

        span {
            margin-right: 30px;
        }

        margin-bottom: 30px;
    }
}

.report {
    .report-item > p {
        font-weight: bold;
        line-height: 50px;
    }

    .item {
        margin: 0 2em;
    }

    .item + .item {
        border-top: 1px solid #E6E6E6;
    }

    .line-item {
        > div {
            //width: 50%;
            //display: inline-block;
            border-top: 1px solid #E6E6E6;
            line-height: 40px;

            span {
                display: inline-block;
                width: 130px;
            }
        }

        > div:nth-child(1){
            border-top: none;
        }

        .item_score {
            color: #7A40F2;
        }
    }
}

.print-row .title {
    text-align: center;
    line-height: 50px;
}

.tip {
    margin-top: 36px;
    text-align: center;
    height: 22px;
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    line-height: 22px;
}

.print-row .table-name p {
    height: 28px;
    font-size: 20px;
}

.print-row .table-name span {
    font-size: 14px;
}

.print-last-row {

    padding: 10px 55px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.print-last-row .group {
    flex: 1;
    display: flex;
    line-height: 55px;
    font-size: 16px;
}

.group > p {
    margin-left: 15px;
    font-weight: bold;
}

</style>
<style>
.report-text-content p,
.report-text-content div {
    margin-bottom: 0.8em;
}

</style>
