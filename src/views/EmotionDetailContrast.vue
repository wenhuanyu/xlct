<template>
    <div class="content" v-if="isFinished">
        <div class="content_top">
            <div></div>
            <div>
                <el-button type="primary" @click="printPreview" icon="el-icon-reading">
                    打印预览
                </el-button>
                <el-button type="primary" v-print="'#print'" icon="el-icon-printer">
                    打印
                </el-button>
                <el-button type="warning" @click="dialogPrint = true" icon="el-icon-s-tools" style="background-color: #32D296; border-color: #32D296;">
                    打印设置
                </el-button>
                <el-button class="pink" plain @click="$router.go(-1)" icon="el-icon-arrow-left">
                    返回主页面
                </el-button>
            </div>
        </div>
        <div class="content_body">
            <div class="print_html" ref="print" id="print">
                <div class="title">
                    <img :src="form.hospital_info.logo" >
                    <div>
                        <p>{{form.hospital_info.hospital_name}}</p>
                        <span>{{form.hospital_info.second_name}}</span>
                    </div>
                </div>
                <div class="table-name">
                    <p></p>
                    <p>{{form.program_name}}</p>
                    <div class="no-print">
                        <p><span class="edit-btn" @click="dialogReport = true" v-if="isShow"><img src="../assets/images/bianzu.png">修改报告</span></p>
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
                                <span>训练时间</span>
                                <p>{{form.patient_info.exam_time}}</p>
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
                            <div class="row">
                                <span>完成时间</span>
                                <p>{{form.patient_info.complete_time}}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="print-row" v-if="showBar=printData[0].value"
                             style="display: flex;justify-content: center;flex-direction:column;align-items: center;padding-left: 0;padding-right: 0;">
                            <div class="table_title">注意力得分统计</div>
                            <div class="charts-wrap">
                                <div id="myChart_heart" :style="{width: '730px', height: '400px'}"></div>
                            </div>
                        </div>
                        <div class="print-row" v-if="showBar=printData[0].value"
                             style="display: flex;justify-content: center;flex-direction:column;align-items: center;padding-left: 0;padding-right: 0;">
                            <div class="table_title">放松度统计</div>
                            <div class="charts-wrap">
                                <div id="myChart_heart1" :style="{width: '730px', height: '400px'}"></div>
                            </div>
                        </div>
                        <div class="print-row" v-if="showBar=printData[0].value"
                             style="display: flex;justify-content: center;flex-direction:column;align-items: center;padding-left: 0;padding-right: 0;">
                            <div class="table_title">皮温得分统计</div>
                            <div class="charts-wrap">
                                <div id="myChart_heart2" :style="{width: '730px', height: '400px'}"></div>
                            </div>
                        </div>
                    </div>
                    <div class="print-row" style="padding: 30px" v-if="showBar = printData[2].value">
                        <div class="print-row">
                            <div class="table-name">
                                <p></p>
                                <p class="print-row_title">结论</p>
                                <div>
                                    <p class="no-print">
                                        <span class="edit-btn print-none" v-if="isShow" @click="getProposal({title:'结论',type:11,field:'conclusion'})"><img src="../assets/images/bianzu.png"></i>点击此处修改</span>
                                    </p>
                                </div>
                            </div>
<!--                            <textarea ref="test" class="report-text-content"  v-html="jielun" style="height: 0"></textarea>-->
<!--                            <div v-html="jielun" class="report-text-content"></div>-->
                            <div v-html="jielun" class="report-text-content" style="font-weight: normal;white-space:pre-wrap;" contenteditable="true"></div>

                        </div>
                    </div>
                    <div class="print-row" style="padding: 30px" v-if="showBar = printData[3].value">
                        <div class="print-row">
                            <div class="table-name">
                                <p></p>
                                <p class="print-row_title">医生建议</p>
                                <div>
                                    <p class="no-print">
                                        <span class="edit-btn print-none" v-if="isShow" @click="getProposal({title:'医生建议',type:9,field:'doctor_proposal'})"><img src="../assets/images/bianzu.png">点击此处修改</span>
                                    </p>
                                </div>
                            </div>
<!--                            <textarea ref="test_one" class="report-text-content"  v-html="doctor_proposal" style="height: 0"></textarea>-->
<!--                            <div v-html="form.doctor_proposal" class="report-text-content"></div>-->
                            <div v-html="doctor_proposal" class="report-text-content" style="font-weight: normal;white-space:pre-wrap;" contenteditable="true"></div>

                        </div>
                    </div>
                    <div class="print-last-row">
                        <div class="group">
                            <span>操作员：</span>
                            <p>{{ form.user_img === "" ? form.user : '' }}</p>
                            <p><img style="height: 55px" :src="form.user_img"></p>
                        </div>
                        <div class="group">
                            <span>检测时间：</span>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div class="tip">***本报告不对任何决定负责！应为被试的报告内容保密！***</div>

            </div>
        </div>
        <el-dialog class="new-dialog text-dialog" :title="modifyTitle.title" :visible.sync="dialogProposal" width="35%">
            <div style="width: 100%;">
                <div class="proposal-text">
                    <span>历史模板</span>
                    <el-select style="width: 80%;" v-model="doctorProposal" @change="templateText = $event;"
                               :popper-append-to-body="false" popper-class="popper-class">
                        <el-option v-for="item in doctorProposalList" :key="item.id" :label="item.content"
                                   :value="item.content"></el-option>
                    </el-select>
                </div>
                <div class="proposal-text">
                    <span>{{ modifyTitle.title }}</span>
                    <textarea v-model="templateText" rows="10"></textarea>
                </div>
                <div class="button-wrap">
                    <el-button type="primary" @click="proposalConfirm">确 定</el-button>
                    <el-button @click="dialogProposal = false" style="border: 1px solid #CDCDCD !important;">取 消</el-button>
                </div>
            </div>
        </el-dialog>
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
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.patient_info.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="form.patient_info.gender">
                            <el-radio :label="0" name="0">男</el-radio>
                            <el-radio :label="1" name="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄" prop="birth">
                        <el-input v-model="form.patient_info.age"></el-input>
                    </el-form-item>
                    <el-form-item label="入院时间" prop="in_time">
                        <el-date-picker type="date" placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd"
                                        v-model="form.patient_info.in_time"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="测评时间" prop="exam_time">
                        <el-date-picker type="date" placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd"
                                        v-model="form.patient_info.exam_time"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="病历号" prop="medical_num">
                        <el-input v-model="form.patient_info.medical_num"></el-input>
                    </el-form-item>
                    <el-form-item label="医保号" prop="medical_insurance_num">
                        <el-input v-model="form.patient_info.medical_insurance_num"></el-input>
                    </el-form-item>
                    <el-form-item label="患者来源" prop="district_id">
                        <el-select v-model="form.patient_info.source" style="width: 100%;">
                            <el-option v-for="item in wardList" :label="item.name" :key="item.id"
                                       :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="完成时间" prop="complete_time">
                        <el-input v-model="form.patient_info.complete_time"></el-input>
                    </el-form-item>
                </el-form>
                <div class="button-wrap">
                    <el-button type="primary" @click="$forceUpdate;dialogReport=false;">确 定</el-button>
                    <el-button @click="dialogReport = false" style="border: 1px solid #CDCDCD !important;">取 消</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogPreview">
            <template slot="title">
                <div style="display: flex;justify-content: space-between;">
                    <span>打印预览</span>
                    <el-button type="primary" style="margin-right: 30px;" size="mini" v-print="'#print'" icon="el-icon-printer">
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
    name: "EmotionDetail",
    data(){
        return{
            concl_top: [],
            concl_list: [],
            isFinished: false,
            info: [],
            detailForm: [],
            printForm: [],
            district: [],
            printer: [],
            printData: [
                {id: '1', name: '是否打印图片', value: false},
                {id: '2', name: '患者详细数据打印', value: false},
                {id: '3', name: '结论', value: false},
                {id: '4', name: '医生建议', value: false},
            ],
            infoData: [],
            dialogPrint: false,
            dialogIpt: false,
            dialogText: '',
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
            dialogPreview: false,
            previewImg: '',
            print_page: 1,
            modifyTitle: [
                {title: '医生建议', type: 9, field: 'doctor_proposal'},
                {title: '结论', type: 11, field: 'conclusion'}
            ],
            templateText: '',
            isShow: false,
            form:'',
            zhi:'',
            jielun:'',
            doctor_proposal:''
        }
    },
    async mounted() {
        this.isFinished = true;
        await this.getInfo()
        await this.getPrinter();
    },
    watch:{
        jielun (nv,ov) {
            if (nv === ov) {
                return
            }
            this.jielun = nv
            this.changeHeight()
        },
        doctor_proposal(nv,ov) {
            if (nv === ov) {
                return
            }
            this.doctor_proposal = nv
            this.changeHeight()
        }
    },
    methods:{
        changeHeight () {
            let _this = this
            this.$nextTick(() => {
                if (_this.modifyTitle.type == 11) {
                    var textArea = _this.$refs.test
                }
                if (_this.modifyTitle.type == 9) {
                    var textArea = _this.$refs.test_one
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
        // 历史模板确定按钮
        async proposalConfirm() {
            if (!this.templateText) {
                return;
            }
            let list = this.doctorProposalList.map(item => item.content);
            if (list.indexOf(this.templateText) === -1) {
                await this.$axios.post('api/template/add', {
                    // test_paper_id: this.$route.query.id,
                    content      : this.templateText,
                    type         : this.modifyTitle.type
                })
            }
            this.dialogProposal                   = false;
            this.form[this.modifyTitle.field] = this.templateText;
            if (this.modifyTitle.type == 11) {
                console.log('this.modifyTitle.type == 11',this.modifyTitle.type == 11)
                this.jielun = this.templateText
            }
            if (this.modifyTitle.type == 9) {
                console.log('this.modifyTitle.type == 9',this.modifyTitle.type == 9)
                this.doctor_proposal = this.templateText
            }
            console.log('this.templateText',this.templateText)
            this.templateText                     = '';
        },
        // 医生建议
        async getProposal({title, type, field}) {
            await this.$axios.post('api/template/lst', {
                type         : type
            },).then(res => {
                this.doctorProposalList = res.data.data;
            });
            this.modifyTitle    = {title, type, field}
            this.doctorProposal = this.form[field];
            this.templateText   = this.form[field];
            this.dialogProposal = true;
        },
        // 调取接口
        async getInfo() {
            let params = {
                ids: this.$route.query.ids,
            }
            await this.$axios.post('api/emotion/compare_report', this.$qs.stringify(params)).then(res => {
                let result = res.data
                if (result.code === 1) {
                    this.form = result.data
                    console.log("~ this.form", this.form)
                }
            })
        },
        // 打印设置里的显示设置
        changeRadio(e) {
            this.zhi = e
        },
        // 打印确定按钮
        async printSet() {
            if (this.zhi == 2) {
                this.isShow = true
            } else {
                this.isShow = false
            }
            this.printData.map(item => {
                item.value = this.printForm.indexOf(item.id) !== -1;
            })
            await this.$axios.post('api/setting/printer_set', {
                item: this.printForm,
                paper: this.printPageSize,
                edit: this.displayBlock,
                type: 7
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
                type: 7
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
                    this.drawLine1();
                    this.drawLine2();
                });
            });
            if(this.displayBlock == 1){
                this.isShow = true
            }else if(this.displayBlock == 2){
                this.isShow = false
            }
        },
        // echarts图
        drawLine(){
            let myChart_heart = this.$echarts.init(document.getElementById('myChart_heart'))
            //绘制图表
            let lables = [];
            let datas  =[];
            let ids =[];
            for(var i =0;i<this.form.attention.length;i++) {
                datas.push(this.form.attention[i].score)
                lables.push(this.form.attention[i].level)
                ids.push(this.form.attention[i].id)
            }
            myChart_heart.setOption({
                title: { text: '' },
                tooltip: {

                },
                xAxis:{
                    type: 'category',
                    splitLine: {show: false},
                    data: lables,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel : {
                        formatter: function(){
                            return "";
                        }
                    }
                },
                yAxis: {
                    type:'value'
                },
                series:{
                    name: ids,
                    data: datas,
                    type: 'bar',
                    itemStyle : {
                        normal : {
                            color:'#1E86EF'
                        }
                    },
                    barWidth : 50,
                    smooth: true,
                    label: {
                        show:true,
                        position:'inside',
                        formatter:function(param) {
                            return param.name.split("").join("\n");
                        },
                        textStyle: {
                            color: '#fff',
                            fontSize: 17,
                        },
                    },
                }
            });
        },
        drawLine1(){
            let myChart_heart1 = this.$echarts.init(document.getElementById('myChart_heart1'))
            //绘制图表
            let lables = [];
            let datas  =[];
            let ids =[];
            for(var i =0;i<this.form.meditation.length;i++) {
                datas.push(this.form.meditation[i].score)
                lables.push(this.form.meditation[i].level)
                ids.push(this.form.meditation[i].id)
            }
            myChart_heart1.setOption({
                title: { text: '' },
                tooltip: {
                },
                xAxis:{
                    type: 'category',
                    splitLine: {show: false},
                    data: lables,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel : {
                        formatter: function(){
                            return "";
                        }
                    }
                },
                yAxis: {
                    type:'value'
                },
                series:{
                    name: lables,
                    data: datas,
                    type: 'bar',
                    itemStyle : {
                        normal : {
                            color:'#1E86EF'
                        }
                    },
                    barWidth : 50,
                    smooth: true,
                    label: {
                        show:true,
                        position:'inside',
                        formatter:function(param) {
                            return param.name.split("").join("\n");
                        },
                        textStyle: {
                            color: '#fff',
                            fontSize: 17,
                        },
                    },
                }
            });
        },
        drawLine2(){
            let myChart_heart2 = this.$echarts.init(document.getElementById('myChart_heart2'))
            //绘制图表
            let lables = [];
            let datas  =[];
            let ids =[];
            for(var i =0;i<this.form.head_temp.length;i++) {
                datas.push(this.form.head_temp[i].score)
                lables.push(this.form.head_temp[i].level)
                ids.push(this.form.head_temp[i].id)
            }
            myChart_heart2.setOption({
                title: { text: '' },
                tooltip: {

                },
                xAxis:{
                    type: 'category',
                    splitLine: {show: false},
                    data: lables,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel : {
                        formatter: function(){
                            return "";
                        }
                    }
                },
                yAxis: {
                    type:'value'
                },
                series:{
                    name: ids,
                    data: datas,
                    type: 'bar',
                    itemStyle : {
                        normal : {
                            color:'#1E86EF',
                        }
                    },
                    barWidth : 50,
                    smooth: true,
                    label: {
                        show:true,
                        position:'inside',
                        formatter:function(param) {
                            return param.name.split("").join("\n");
                        },
                        textStyle: {
                            color: '#fff',
                            fontSize: 17,
                        },
                    },
                }
            });
        }
    }
}
</script>

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
        color: #1E86EF;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        border-color: #1E86EF;
        background-color: #1E86EF;
    }
    .el-checkbox__inner:hover {
        border-color: #1E86EF;
    }
    .el-radio__input.is-checked + .el-radio__label {
        color: #1E86EF;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #1E86EF;
        background-color: #1E86EF;
    }
    .el-button--primary {
        border-color: #1E86EF;
        background-color: #1E86EF;
    }
    .el-button [class*=el-icon-] + span {

    }

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
.print-last-row {
    padding: 10px 55px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.group {
    flex: 1;
    display: flex;
    line-height: 55px;
    font-size: 20px;
}

.group > p {
    margin-left: 15px;
    font-weight: bold;
}
.print-row_con{
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-top: 10px;
    position: relative;
    padding-left: 30px;
}
.print-row_con span{
    position: absolute;
    top: 7px;
    left: 0;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #1E86EF;
}
.print-row_title{
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    margin: 0 auto;
}
.table_title{
    margin: 20px auto;
}
.charts-wrap {
    width: 880px;
    height: 500px;
    display: flex;
}
.print-row {
    padding: 15px 25px;
    color: #333;
    font-size: 20px;
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
    @media print {
        padding: 10px 0;
    }
}

.print-body .row {

    display: flex;
    align-items: center;
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
    margin-left: 15px;
    font-weight: bold;
}

.print-last-row,
.first,
.print-row {
    border-bottom: 1px solid #E6E6E6;
}

.content_body{
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
.table-name {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0 auto 20px;
    font-size: 16px;
    color: #333;
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
    color: #1E86EF;
    display: flex;
    align-items: center;
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
.daying {
    ::v-deep .el-checkbox {
        padding-left: 20px;
        width: 45%;
    }
}
.daying_ {
    ::v-deep .el-checkbox {
        padding-left: 20px;
        width: 30%;
    }
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

.table-name p {
    font-size: 28px;
    font-weight: bold;
}

.print-html .edit-btn {
    color: #1E86EF;
    position: absolute;
    right: 0;
    cursor: pointer;
    @media print {
        display: none;
    }
}
.report-text-content {
    width: 100%;
    display: block;
    color: #333;
    font-weight: 400;
    flex: 1;
    font-size: 22px;
}
.print-row .title {
    text-align: center;
    line-height: 50px;
}
.print-row .table-name span {
    font-size: 14px;
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
        max-width: 30em;
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
        color: #1E86EF;
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
    color: #1E86EF;
    display: flex;
    align-items: center;
}

.result {
    width: 50%;
    height: 100%;
    padding: 20px;
}
</style>
