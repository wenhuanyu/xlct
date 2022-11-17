<template>
    <div class="content">
        <div class="content_top">
            <div></div>
            <div>
                <el-button type="primary" @click="printPreview" icon="el-icon-reading">
                    打印预览
                </el-button>
                <el-button type="primary" v-print="printObj" icon="el-icon-printer">
                    打印
                </el-button>
                <el-button type="warning" @click="dialogPrint = true" icon="el-icon-s-tools" style="background-color: #39CBE9; border-color: #39CBE9;">
                    打印设置
                </el-button>
                <el-button class="pink"  plain @click="$router.go(-1)" icon="el-icon-arrow-left" style="color: #333333!important;">
                    返回主页面
                </el-button>
            </div>
        </div>
        <div class="content_body">
            <div class="print_html" ref="print" id="print">
                <div class="title">
                    <img :src="form.hospital_info.logo">
                    <div>
                        <p>{{form.hospital_info.hospital_name}}</p>
                        <span>{{form.hospital_info.second_name}}</span>
                    </div>
                </div>
                <div class="table-name">
                    <p></p>
                    <p style="font-size: 28px;">统计分析对比报表</p>
                    <div>
                        <p class="no-print"><span class="edit-btn" @click="xiu" v-if="isShow"><img
                            src="../assets/images/bianzu.png">修改报告</span></p>
                    </div>

                </div>
                <div class="print-body">
                    <div class="first">
                        <div class="first-group">
                            <div class="row">
                                <span>姓名</span>
                                <p>{{form.patient_info.name}}</p>
                            </div>
                            <div class="row">
                                <span>病历号</span>
                                <p>{{form.patient_info.medical_num}}</p>
                            </div>
                            <div class="row">
                                <span>入院时间</span>
                                <p>{{form.patient_info.in_time}}</p>
                            </div>
                        </div>
                        <div class="first-group">
                            <div class="row">
                                <span>性别</span>
                                <p>{{form.patient_info.gender == 1 ? '女' : '男'}}</p>
                            </div>
                            <div class="row">
                                <span>医保号</span>
                                <p>{{form.patient_info.medical_insurance_num}}</p>
                            </div>
                            <div class="row">
                                <span>量表名称</span>
                                <p>{{form.test_paper_name}}</p>
                            </div>
                        </div>
                        <div class="first-group">
                            <div class="row">
                                <span>年龄</span>
                                <p>{{form.patient_info.age}}</p>
                            </div>
                            <div class="row">
                                <span>患者来源</span>
                                <p>{{form.patient_info.source}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="print-row1" style="">
                        <div class="table_title" style="font-size: 18px; font-weight:bold; color:#000; display: flex;justify-content: center;flex-direction:column; align-items: center;">测评时间</div>
                        <div class="first1">
                        <div class="first-group">
                            <div class="row">
                                <span>测评时间</span>
                                <p>{{form.patient_info.exam_time}}</p>
                            </div>
                            <div class="row">
                                <span>完成时间</span>
                                <p>{{form.patient_info.complete_time}}</p>
                            </div>
                        </div>
                        <div class="first-group">
                            <div class="row">
                                <span>测评时间</span>
                                <p>{{form1.patient_info.exam_time}}</p>
                            </div>
                            <div class="row">
                                <span>完成时间</span>
                                <p>{{form1.patient_info.complete_time}}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="print-row" v-if="showBar=printData[0].value"
                         style="display: flex;justify-content: center;flex-direction:column;align-items: center;padding-left: 0;padding-right: 0;">
                        <div class="table_title">检查总体印象</div>
                        <div class="charts-wrap">
                            <div id="myChart_heart" :style="{width: '820px', height: '300px' ,marginTop:'70px' , marginLeft:'50px' }"></div>
                        </div>
                    </div>
                    <div class="print-row2" style="padding-top:20px;" v-if="showBar = printData[2].value">
                        <div class="table-name">
                            <p></p>
                            <p class="print-row_title">检测结果</p>
                        </div>
                        <div class="flex" style="border-top: 1px solid #E6E6E6; border-bottom: 1px solid #E6E6E6;">
                            <div class="report-text-content" style="width:50%; border-right: 1px solid #E6E6E6; padding-left:55px; padding-top:30px; padding-bottom:30px;">
                                <div v-for="item in form.yinzi_lst" class="margin-20 no-margin-left no-margin-right no-margin-right">
                                    <div v-html="item.name"></div>
                                    <div class="flex">
                                        <div v-html="item.title"></div>
                                        <div v-html="item.score"></div>
                                    </div>
                                    <div v-html="item.desc"></div>
                                </div>
                            </div>
                            <div class="report-text-content" style="width:50%; padding-left:55px; padding-top:30px; padding-bottom: 30px">
                                <div v-for="item in form1.yinzi_lst" class="margin-20 no-margin-left no-margin-right no-margin-right">
                                    <div v-html="item.name"></div>
                                    <div class="flex">
                                        <div v-html="item.title"></div>
                                        <div v-html="item.score"></div>
                                    </div>
                                    <div v-html="item.desc"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="print-last-row">
                        <div class="group">
                            <span>检测时间：</span>
                            <p></p>
                        </div>
                        <div class="group">
                            <span>检测时间：</span>
                            <p></p>
                        </div>
                    </div>
                    <div class="print-last-row">
                        <div class="group">
                            <span>操作员：</span>
                            <p>{{ form.user_img === "" ? form.user : '' }}</p>
                            <p><img style="height: 55px" :src="form.user_img"></p>
                        </div>
                        <div class="group">
                            <span>操作员：</span>
                            <p>{{ form1.user_img === "" ? form1.user : '' }}</p>
                            <p><img style="height: 55px" :src="form1.user_img"></p>
                        </div>
                    </div>
                </div>
                <div class="tip">***本报告不对任何决定负责！应为被试的报告内容保密！***</div>

            </div>
        </div>
        <el-dialog class="new-dialog text-dialog" title="修改报告" :visible.sync="dialogReport" width="50%">
            <div class="button-wrap">
                <el-button type="primary" @click="dialogReport=false;">确 定</el-button>
                <el-button @click="dialogReport = false" style="border: 1px solid #CDCDCD !important;">取 消</el-button>
            </div>
            <!--            </div>-->
        </el-dialog>
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
        <el-dialog class="new-dialog text-dialog" title="修改报告" :visible.sync="dialogReport" width="50%"
                   :close-on-click-modal="false"
                   :show-close="false">
            <div style="width: 75%;">
                <el-form label-width="120px" style="max-height: unset;">
                    <el-form-item label="姓名">
                        <el-input v-model="xiugai.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="xiugai.gender">
                            <el-radio :label="0" name="0">男</el-radio>
                            <el-radio :label="1" name="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="xiugai.age"></el-input>
                    </el-form-item>
                    <el-form-item label="入院时间">
                        <el-date-picker type="date" placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd"
                                        v-model="xiugai.in_time"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="病历号">
                        <el-input v-model="xiugai.medical_num"></el-input>
                    </el-form-item>
                    <el-form-item label="医保号">
                        <el-input v-model="xiugai.medical_insurance_num"></el-input>
                    </el-form-item>
                    <el-form-item label="患者来源">
                        <el-select v-model="xiugai.source" style="width: 100%;">
                            <el-option v-for="item in wardList" :label="item.name" :key="item.id"
                                       :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="button-wrap">
                    <el-button type="primary" @click="xiuqueding">确 定</el-button>
                    <el-button @click="xiuquxiao" style="border: 1px solid #CDCDCD !important;">取 消</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogPreview">
            <template slot="title">
                <div style="display: flex;justify-content: space-between;">
                    <span>打印预览</span>
                    <el-button type="primary" style="margin-right: 30px;" size="mini" v-print="printObj" icon="el-icon-printer">
                        打印
                    </el-button>
                </div>
            </template>

            <div class="page-A4">
                <img :src="previewImg" alt="" v-if="previewImg" class="previewImg">
            </div>
        </el-dialog>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
import $ from 'jquery'
export default {
    name: "AssessDetailContrast",
    data() {
        return {
            printObj: {
                id: "print",//要打印的id名 无#号
                popTitle:'&nbsp;',//页眉标题 默认浏览器标题 空字符串时显示undefined 使用html语言
                extraHead:'&nbsp;',//头部文字 默认空
            },
            xiugai:[],
            concl_list:[],
            conclusion: false,
            isFinished: false,
            info: [],
            detailForm: [],
            printForm: [],
            district: [],
            printer: [],
            printData: [
                {id: '1', name: '是否打印图片', value: false},
                {id: '2', name: '患者详细数据打印', value: false},
                {id: '3', name: '检测结果', value: false},
            ],
            infoData: [],
            dialogPrint: false,
            dialogIpt: false,
            doctorAdvised: '',
            current: {},
            currentMethod: '',
            dialogProposal: false,
            doctorProposalList: '',
            doctorProposal: '',
            dialogReport: false,
            wardList: [],
            printPageSize: '',
            displayBlock: '2',
            Block:"1",
            dialogPreview: false,
            previewImg: '',
            print_page: 1,
            templateText: '',
            isShow: false,
            showBar:'',
            form: '',
            form1:'',
            showEdit: '',
            zhi:'',
            hrv:true,
            rate:true
        }
    },
    async mounted() {
        await this.getInfo()
        await this.getPrinter();
    },
    methods: {
        xiu() {
            this.dialogReport = true
            this.xiugai = JSON.parse(JSON.stringify(this.form.patient_info));
        },
        xiuqueding() {
            this.form.patient_info = JSON.parse(JSON.stringify(this.xiugai))
            this.dialogReport = false

        },
        xiuquxiao() {
            this.dialogReport = false
        },
        /**
         * 打印预览
         */
        printPreview() {
            let $printNone = $('.print-none').hide();
            let dialog     = this.$loading('请稍后...');
            html2canvas(this.$refs.print,{
                allowTaint: true,
                useCORS: true
            }).then(canvas => {
                let dom           = document.body.appendChild(canvas);
                dom.style.display = 'none';

                let a           = document.createElement('a');
                a.style.display = 'none';
                document.body.removeChild(dom);

                this.previewImg    = URL.createObjectURL(this.dataURLToBlob(dom.toDataURL('image/png')));
                this.dialogPreview = true;
                $printNone.hide();
                dialog.close();
                $('.print-none_').show();
            });
        },
        /**
         * data转URLBlob
         * @param data
         * @returns {Blob}
         */
        dataURLToBlob(data) {
            let arr   = data.split(',');
            let mime  = arr[0].match(/:(.*?);/)[1];
            let bstr  = atob(arr[1]);
            let n     = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type: mime});
        },

        // 调取接口
        async getInfo() {
            let params = {
                exam_id: this.$route.query.ids[0],
                test_paper_id:this.$route.query.test
            }
            await this.$axios.post('api/exam/report', this.$qs.stringify(params)).then(res => {
                let result = res.data
                if (result.code === 1) {
                    this.form = result.data
                }
            })
            let params1 = {
                exam_id: this.$route.query.ids[1],
                test_paper_id:this.$route.query.test
            }
            await this.$axios.post('api/exam/report', this.$qs.stringify(params1)).then(res => {
                let result1 = res.data
                if (result1.code === 1) {
                    this.form1 = result1.data
                }
            })
        },

        // 打印设置里面的显示设置
        changeRadio(e) {

        },
        // 打印确定按钮
        async printSet() {
            this.printData.map(item => {
                item.value = this.printForm.indexOf(item.id) !== -1;
            })
            await this.$axios.post('api/setting/printer_set', {
                item: this.printForm,
                paper: this.printPageSize,
                edit: this.displayBlock,
                type: 5
            }).then(res => {
                this.dialogPrint = false
                this.getPrinter()
            })
        },

        /**
         * 获取打印设置
         */
        async getPrinter() {
            await this.$axios.post('api/setting/printer_set_info',{
                type: 5
            }).then(res => {
                if (res.data.code === 1) {
                    this.printForm     = res.data.data.item.map(item => item);
                    this.printPageSize = res.data.data.paper;
                    this.displayBlock = res.data.data.edit
                }
                this.printData.map(item => {
                    item.value = this.printForm.indexOf(item.id) !== -1;
                })
                this.$forceUpdate();
                 this.$nextTick(() => {
                    this.drawLine();
                });
            });
            if(this.displayBlock == 1){
                this.isShow = true
            }else if(this.displayBlock == 2){
                this.isShow = false
            }
        },


        // echarts图
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart_heart = this.$echarts.init(document.getElementById('myChart_heart'))
            // 绘制图表
            let zhi1 = [];
            let zhi2  =[];
            let biaoti =[];
            for(var i =0;i<this.form.result.length;i++) {
                zhi1.push(this.form.result[i])
            }
            for(var i =0;i<this.form1.result.length;i++) {
                zhi2.push(this.form1.result[i])
            }
            for(var i =0;i<this.form1.title.length;i++) {
                biaoti.push(this.form1.title[i])
            }
            console.log('zhi1',zhi1)
            console.log('zhi2',zhi2)
            myChart_heart.setOption({
                title: {
                    subtext: '单位 ： 分'
                },
                legend: {},
                tooltip: {},
                xAxis: {
                    type: 'category',
                    axisTick: {show: false},
                    data: biaoti,
                    axisLabel: {
                        interval:0,
                        rotate:20,
                        fontSize:10,
                        formatter:function(value,index)
                        {
                            if (index % 2 != 0) {
                                return '\n\n' + value;
                            }
                            else {
                                return value;
                            }
                        }
                    },
                },
                yAxis: [{
                    type: 'value'
                }],
                series: [
                    {
                        name: this.$route.query.time[0],
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: zhi1
                    },
                    {
                        name: this.$route.query.time[1],
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: zhi2
                    }
                ]
            })
        }
    }
}
</script>
<style media="print">
@page{
    size :auto;
    margin: 25px;
}
</style>
<style scoped lang="scss">

::v-deep{
    .el-radio-group {
        margin-left: 20px;
    }
}
@media print {
    .no-print {
        display: none;
    }
}
::v-deep {
    .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #7A40F2;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }
    .el-checkbox__inner:hover {
        border-color: #7A40F2;
    }
    .el-radio__input.is-checked + .el-radio__label {
        color: #7A40F2;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }
    .el-button--primary {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }
    .el-button [class*=el-icon-] + span {

    }

}
::v-deep .new-dialog span,
::v-deep .new-dialog label {
    font-size: 16px;
}

::v-deep .el-dialog {
    width: 35%;
}

.dialog-footer {
    .el-button {
        border-radius: 25px;
        width: 150px;
    }
}

.el-form-item {
    margin-bottom: 10px;
}

.el-form-item:last-child {
    margin-bottom: 0;
}

::v-deep .el-checkbox {
    padding-left: 20px;
    width: 98%;
}

.content_body {
    padding: 25px;
    overflow-y: auto;
    @media print {
        overflow: visible;
        height: unset;
    }
}

.remark {
    color: #999;
    font-size: 16px;
    margin: 0;
    text-align: center;

}

.print-html {
    width: 1100px;
    margin: 0 auto;
    @media print {
        width: 700px;
        height: 1200px;
    }
}

.print-html > .title {
    color: #333;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
}


.print-html > .title p {
    font-size: 38px;
    margin-bottom: 5px;
}

.table-name {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
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
.print-row1 .first1 {
    display: flex;
    .first-group {
        flex: 1;
        border-right: 1px solid #E6E6E6;
        border-top: 1px solid #E6E6E6;
        border-bottom: 1px solid #E6E6E6;
        padding: 10px 0;
        span {
            width: 80px;
            text-align-last: justify;
            font-weight: 400;
        }
        p {
            margin-left: 15px;
            font-weight: bold;
        }
    }
}
.print-body .row {

    display: flex;
    align-items: center;
    font-size: 16px;
    color: #333;
    padding-left: 25px;
    margin-bottom: 5px;
}

.print-last-row,
.first,
.print-row {
    border-bottom: 1px solid #E6E6E6;
}

.print-row .title {
    text-align: center;
    line-height: 50px;
}

.print-row .table-name p {
    height: 28px;
    font-size: 28px;
}

.print-row .table-name span {
    font-size: 14px;
}

.print-last-row {
    // padding: 10px 55px;
    display: flex;
    .group {
        padding-left: 55px ;
        width: 50%;
        flex: 1;
        display: flex;
        line-height: 55px;
        font-size: 20px;
        border-right: 1px solid #E6E6E6;
    }
}
.print-row {
    padding: 10px 25px;
    color: #333;
    font-size: 20px;
    font-weight: bold;

    > p {
        font-size: 18px;
    }
}

.check-result {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    > span {
        display: block;
        font-size: 16px;
    }

    span:nth-child(1) {
        width: 45%;
    }

    span:nth-child(2) {
        width: 10%;
    }

    span:nth-child(3) {
        width: 45%;
    }
}

.text-dialog ::v-deep .el-dialog__header {
    padding: 0;
}

.text-content {
    border: 1px solid #e6e6e6;

    > textarea {
        width: 100%;
        height: 100%;
        padding: 8px;
        box-sizing: border-box;
        font-size: 18px;
    }
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
        border: 1px solid #CDCDCD;
        box-sizing: border-box;
    }

    ::v-deep .el-select-dropdown {
        max-width: 50em;
        top: unset !important;
        left: unset !important;
    }
}

.print-none {
    @media print {
        display: none !important;
    }
}

.page-A4 {
    img {
        width: 100%;
        height: auto;
    }
}

.physical-signs {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #E6E6E6;

    > div {
        width: 50%;
        font-size: 16px;

        > span {
            color: #333333;
            margin-right: 4em;
        }
    }

    > div:first-child {
        color: #7A40F2;
    }
}

.physical-signs:last-child {
    border: none;
}

.result_content {
    width: 90%;
    border-bottom: 2px solid #171616;

}

#result_content_ {
    border-bottom: 0px;
    height: 21px;
    margin: 5px 0;
    width: 100%;
}

.result_title_ {
    width: 90%;
    height: 40px;
    border-bottom: 2px solid #171616;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.result_title_ p {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
}

.result_title {
    width: 90%;
    height: 40px;
    border-bottom: 2px solid #171616;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #7A40F2;
    display: flex;
    align-items: center;
}

.result {
    width: 50%;
    height: 100%;
    padding: 20px;
}

.tip {
    margin-top: 36px;
    text-align: center;
    height: 22px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 22px;
    margin-bottom: 90px;
}

.group {
    flex: 1;
    display: flex;
    line-height: 55px;
    font-size: 16px;
}

.group > p {
    margin-left: 15px;
    font-weight: bold;
}

.print-row_con {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-top: 10px;
    position: relative;
    padding-left: 30px;
}

.print-row_con span {
    position: absolute;
    top: 7px;
    left: 0;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #7A40F2;
}

.print-row_title {
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    margin: 0 auto;
}

.print-row {
    padding: 10px 25px;
    color: #333;
    font-size: 20px;
    font-weight: bold;
}

.table_title {
    margin: 20px auto;
}

.charts-wrap {
    width: 880px;
    height: 500px;
    display: flex;
}

.print-row {
    padding: 10px 25px;
    color: #333;
    font-size: 22px;
    font-weight: bold;

    > p {
        font-size: 18px;
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
}
.report-text-content {
    font-size: 22px;
    font-weight: 400;
    line-height: 1.6em;
}
.print-body .row {

    display: flex;
    align-items: start;
    font-size: 20px;
    color: #333;
    padding-left: 25px;
    margin-bottom: 5px;
}

.print-body .first > .first-group span {
    width: 80px;
    text-align-last: justify;
}

.print-body .first > .first-group p {
    width: 195px;
    margin-left: 15px;
    font-weight: bold;
}

.print-last-row,
.first,
.print-row {
    border-bottom: 1px solid #E6E6E6;
}

.content_body {
    overflow: scroll;
}


.print_html {
    width: 1100px;
    margin: 0 auto;
}

.title {
    color: #333;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    margin-top: 42px;
}

.title img {
    width: auto;
    height: 75px;
    // border-radius: 50%;
    margin-right: 15px;
}

.title p {
    font-size: 38px;
    margin-bottom: 5px;
}


.table-name p:nth-of-type(1) {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
}

.table-name p:nth-of-type(2) {
    font-size: 28px;
    font-weight: bold;
}

.table-name span {
    cursor: pointer;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #7A40F2;
    display: flex;
    align-items: center;
}

</style>



