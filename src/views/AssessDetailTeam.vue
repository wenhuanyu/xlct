<template>
    <div class="content" v-if="isFinished">
        <div v-if="xianshi1">
            <div class="content_top">
                <div></div>
                <div>
                    <el-button type="primary" @click="printPreview" icon="el-icon-reading" style="background-color: #7A40F2; border-color: #7A40F2;">
                        打印预览
                    </el-button>
                    <el-button type="primary" v-print="printObj" icon="el-icon-printer" style="background-color: #7A40F2; border-color: #7A40F2;">
                        打印
                    </el-button>
                    <el-button type="warning" @click="dialogPrint = true" icon="el-icon-s-tools" style="background-color: #39CBE9; border-color: #39CBE9;">
                        打印设置
                    </el-button>
                    <el-button class="pink" style="color: #333333!important;" plain @click="$router.go(-1)" icon="el-icon-arrow-left">
                        返回主页面
                    </el-button>
                </div>
            </div>
            <div class="content_body" ref="contentBody">
                <div class="print-html" ref="print" id="print">
                    <div class="title">
                        <img :src="infoData.hospital_info && infoData.hospital_info.logo">
                        <div>
                            <p>{{ infoData.hospital_info && infoData.hospital_info.hospital_name }}</p>
                            <span>{{ infoData.hospital_info && infoData.hospital_info.second_name }}</span>
                        </div>
                    </div>
                    <div class="table-name">
                        <p style="font-size: 28px;">团体测评报告</p>
<!--                        <span class="edit-btn print-none  print-none_" @click="xiu" style="display: block">修改报告</span>-->
                    </div>
                    <div class="print-body">
                        <div class="first ">
                            <div class="first-group">
                                <div class="row">
                                    <span>量表名称</span>
                                    <p>{{ infoData.test_paper_name }}</p>
                                </div>
                            </div>
                            <div class="first-group">
                                <div class="row">
                                    <span>人数</span>
                                    <p>{{ infoData.count }}</p>
                                </div>
                            </div>
                            <div class="first-group">
                                <div class="row">
                                    <span>测评时间</span>
                                    <p>{{ infoData.create_at }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="print-row" :class="printData[0].value ? '' : 'print-none'">
                            <div class="table-name">
                                <p>检查总体印象</p>
                            </div>
                            <div
                                class="charts-wrap"
                                id="myChart"
                                :style="{width: '100%', height: '380px'}"
                            ></div>
                        </div>
                        <div class="MMPICT print-row" :class="printData[2].value ? '' : 'print-none'">
                            <div class="table-name">
                                <p>检测结果</p>
                            </div>
                            <div class="MMPICT-ii">
                                <div style="padding-right: 2px" class="table-one">
                                    <el-table
                                        border
                                        :data="additionalList"
                                        :header-row-style="{color:'#333333',fontSize:'16px'}"
                                        :header-cell-class-name="comCell3"
                                        :cell-class-name="comScoreClass"
                                        :header-row-class-name="'table-two-header-row'"
                                        style="width:100%">
                                        <el-table-column
                                            :label="infoData.title[0]"
                                            prop="name"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            :label="infoData.title[1]"
                                            prop="score"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            :label="infoData.title[2]"
                                            prop="score_bz"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            :label="infoData.title[3]"
                                            prop="desc"
                                        >
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                        <!--111-->
                        <template>

                            <div class="print-row" :class="printData[3].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>医生建议</p>
                                    <span class="edit-btn" v-if="showEdit"
                                          @click="getProposal({title:'医生建议',type:5,field:'doctor_proposal'})"><i
                                        class="el-icon-edit"></i>点击此处修改</span>
                                </div>
                                <!-- <textarea ref="test_one"  class="report-text-content"  v-html="doctor_proposal" style="height: 0"></textarea> -->
                                <!--                        <div v-html="infoData.doctor_proposal" class="report-text-content"></div>-->
                                <div v-html="doctor_proposal" class="report-text-content" style="font-weight: normal;white-space:pre-wrap;" contenteditable="true"></div>
                            </div>
                            <div class="print-last-row">
                                <div class="group">
                                    <span>操作员：</span>
                                    <p>{{ infoData.user_img === "" ? infoData.user : '' }}</p>
                                    <p><img style="height: 55px" :src="infoData.user_img"></p>
                                </div>
                                <div class="group">
                                    <span>检测时间：</span>
                                    <p></p>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="tip">***本报告不对任何决定负责！应为被试的报告内容保密！***</div>
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
                        <span>{{ modifyTitle.title }}</span>
                        <textarea v-model="templateText" rows="10"></textarea>
                    </div>
                    <div class="button-wrap">
                        <el-button type="primary" @click="proposalConfirm">确 定</el-button>
                        <el-button @click="dialogProposal = false" style="border: 1px solid #CDCDCD !important;">取 消</el-button>
                    </div>
                </div>
            </el-dialog>


            <el-dialog :visible.sync="dialogPreview">
                <template slot="title">
                    <div style="display: flex;justify-content: space-between;">
                        <span>打印预览</span>
                        <el-button type="primary" style="margin-right: 30px;" size="mini" v-print="printObj"
                                   icon="el-icon-printer">
                            打印
                        </el-button>
                    </div>
                </template>

                <div class="page-A4">
                    <img :src="previewImg" alt="" v-if="previewImg" class="previewImg">
                </div>
            </el-dialog>
        </div>

        <div v-if="xianshi2">
            <el-dialog class="new-dialog text-dialog" :visible.sync="dialogChuan" modal-append-to-body=true  :before-close="handleClose" width="20%">
                <div>
                    <div><img style="margin:0 auto; display: block; " src="../assets/images/kulian.png"></div>
                    <div style="margin-top: 20px; font-size: 24px; color: #333333; line-height: 31px; ">{{zhi}}</div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
import $ from 'jquery'
import Tscore from '/src/components/Tscore'

export default {
    name: "AssessDetail",
    data() {
        return {
            printObj: {
                id: "print",//要打印的id名 无#号
                popTitle:'&nbsp;',//页眉标题 默认浏览器标题 空字符串时显示undefined 使用html语言
                extraHead:'&nbsp;',//头部文字 默认空
            },
            xianshi1:false,
            xianshi2:false,
            dialogChuan:false,
            additionalList:[],
            isFinished: false,
            info: [],
            detailForm: [],
            printForm: [],
            district: [],
            printer: [],
            printData: [
                {id: '1', name: '是否打印图片', value: false},
                {id: '2', name: '患者详细数据打印', value: false},
                {id: '3', name: '检测结果打印', value: false},
                {id: '4', name: '医生建议', value: false},
            ],
            infoData: [],
            dialogPrint: false,
            dialogText: '',
            doctorAdvised: '',
            current: {},
            currentMethod: '',
            dialogProposal: false,
            dialogProposal_:false,
            options: [],
            doctorProposalList: [],
            doctorProposal: '',
            dialogReport: false,
            wardList: [],
            printPageSize: '',
            displayBlock: '2',
            dialogPreview: false,
            previewImg: '',
            print_page: 1,
            modifyTitle: {title: '医生建议', type: 5, field: 'doctor_proposal'},
            templateText: '',
            showEdit: false,
            doctor_proposal:'',
            textArea:'',
            height:'',
            scrollHeight:'',
            zhi:'',
        }
    },
    components: {
        't-score': Tscore
    },
    computed: {

    },
    watch:{
        'doctor_proposal':function(nv,ov) {
            if (nv === ov) {
                return
            }
            this.doctor_proposal = nv
            if(this.doctor_proposal) {
                this.changeHeight()
            }

        },
    },
    async mounted() {
        this.$vLoading.show();
        this.detailForm.uid = this.$store.state.user.userInfo.uid
        this.detailForm.exam_id = this.$route.query.liangbiao_id
        this.detailForm.test_paper_id = this.$route.query.id
        await this.getInfo();
        await this.getPrinter();
        this.isFinished = true;
        await this.getWard();
        this.$vLoading.hide();
        this.setChart(this.infoData.title, this.infoData.result);
    },

    methods: {
        comCell3(info){
            // if (info.rowIndex === 0 && info.columnIndex === 3) {
            //     return 'table-three-cell-slot'
            // }
            if (info.rowIndex === 0) {
                return 'table-two-cell-one'
            }
        },
        comScoreClass(info) {
            if (info.columnIndex === 3) {
                return 'tscore-col'
            }
        },
        /**
         * 获取打印设置
         */
        async getPrinter() {
            await this.$axios.post('api/setting/printer_set_info', {
                type: 12
            }).then(res => {
                if (res.data.code === 1) {
                    this.printForm = res.data.data.item.map(item => item);
                    this.printPageSize = res.data.data.paper;
                    this.displayBlock = res.data.data.edit
                }
                this.printData.map(item => {
                    item.value = this.printForm.indexOf(item.id) !== -1;
                })
                this.$forceUpdate();
            });
            if (this.displayBlock == 1) {
                this.showEdit = true
            } else if (this.displayBlock == 2) {
                this.showEdit = false
            }
        },


        /**
         * 获取报告数据
         */
        async getInfo() {
            await this.$axios.post('api/exam/team_report', this.$qs.stringify(this.detailForm)).then(res => {
                if (res.data.code === 1) {
                    this.xianshi1 = true
                    this.xianshi2 = false
                    this.infoData  = res.data.data;
                    this.additionalList = this.infoData.child
                    // console.log('this.infoData',this.infoData)
                    this.doctor_proposal = this.infoData.doctor_proposal

                }
                if (res.data.code === 400) {
                    this.xianshi1 = false
                    this.xianshi2 = true
                    this.zhi = res.data.info
                    this.dialogChuan = true;
                }
                try {
                } catch (e) {
                }
            });
        },
        handleClose() {
            this.$router.go(-1)
        },



        /**
         * 设置打印参数
         */
        async printSet() {
            this.printData.map(item => {
                item.value = this.printForm.indexOf(item.id) !== -1;
            })
            await this.$axios.post('api/setting/printer_set', {
                item: this.printForm,
                paper: this.printPageSize,
                edit: this.displayBlock,
                type: 12
            }).then(res => {
                this.dialogPrint = false
                this.getPrinter()
            })
        },


        /**
         * 显示编辑
         */
        changeRadio(e) {
            // console.log("~ e", e)
            // if(e == 1){
            //     this.showEdit = true
            //     console.log("~ this.showEdit", this.showEdit)
            // }else if(e == 2){
            //     this.showEdit = false
            //     console.log("~ this.showEdit", this.showEdit)
            // }
        },


        /**
         * 图表展示
         */
        setChart(column, data) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '分数'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: this.infoData.parent_name
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: this.infoData.parent_score_bz,
                        type: 'line',
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color:  '#FF8F5F'
                                },
                                {
                                    offset: 1,
                                    color: '#7A40F2'
                                }
                            ])
                        },
                    }
                ]
            })

        },

        /**
         * 打印设置确定按钮
         */
        textConfirm() {
            // console.log('this.current',this.current);
            if (this.current.desc) {
                this.current.desc = this.dialogText;
            }
            this.dialogText = '';
        },

        //点击医生建议 点击此处修改
        async getProposal({title, type, field}) {
            // console.log(type)
            this.modifyTitle = {title, type, field}
            this.doctorProposal = this.infoData[field];
            this.templateText = this.infoData[field];
            if(type == 3){
                this.dialogProposal_ = true;
                this.$axios.post('api/common/week_lst').then(res => {
                    if (res.data.code === 1) {
                        this.options = res.data.data
                    }
                })
                return;
            }
            await this.$axios.post('api/template/lst', {
                test_paper_id: this.$route.query.id,
                type: type
            },).then(res => {
                this.doctorProposalList = res.data.data;
            });
            this.dialogProposal = true;

        },

        //历史模板确定按钮
        async proposalConfirm() {
            if (!this.templateText) {
                return;
            }
            let list = this.doctorProposalList.map(item => item.content);
            // console.log('this.$route.query',this.$route.query)
            if (list.indexOf(this.templateText) === -1) {
                await this.$axios.post('api/template/add', {
                    test_paper_id: this.$route.query.id,
                    content: this.templateText,
                    type: this.modifyTitle.type,
                    patient_id:this.$route.query.patient_id,
                    exam_id:this.detailForm.exam_id
                })
            }
            this.dialogProposal = false;
            this.infoData[this.modifyTitle.field] = this.templateText;
            if (this.modifyTitle.type == 5) {
                this.doctor_proposal = this.infoData[this.modifyTitle.field]
            }
            this.templateText = '';
        },
        changeHeight () {
            let _this = this
            this.$nextTick(() => {
                if (_this.modifyTitle.type == 4) {
                    var textArea = _this.$refs.test_two
                }
                if (_this.modifyTitle.type == 5) {
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

        async getWard() {
            await this.$axios.post('api/district/index').then(res => {
                this.wardList = res.data.data;
            })
        },


        /**
         * 打印预览
         */
        printPreview() {
            let $printNone = $('.print-none').hide();
            let dialog = this.$loading('请稍后...');
            html2canvas(this.$refs.print,{
                allowTaint: true,
                useCORS: true
            }).then(canvas => {
                let dom = document.body.appendChild(canvas);
                dom.style.display = 'none';

                let a = document.createElement('a');
                a.style.display = 'none';
                document.body.removeChild(dom);

                this.previewImg = URL.createObjectURL(this.dataURLToBlob(dom.toDataURL('image/png')));
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
            let arr = data.split(',');
            let mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type: mime});
        },


        /**
         * 实现两个元素中心点的连线
         * @author 渀波儿灞 2021-02-20
         * @param  {Object} startObj  jquery对象，起点元素
         * @param  {Object} endObj    jquery对象，终点元素
         * @return {String}           返回连线的dom
         */
        drawLine(startObj, endObj) {
            const yStart = startObj.position().top + startObj.height() / 2;
            const xStart = startObj.position().left + startObj.width() / 2;
            const yEnd = endObj.position().top + endObj.height() / 2;
            const xEnd = endObj.position().left + endObj.width() / 2;

            //用勾股定律计算出斜边长度及其夹角（即连线的旋转角度）
            const lx = xEnd - xStart;
            const ly = yEnd - yStart;

            //计算连线长度
            const length = Math.sqrt(lx * lx + ly * ly);
            //弧度值转换为角度值
            const c = 360 * Math.atan2(ly, lx) / (2 * Math.PI);

            //连线中心坐标
            const midX = (xEnd + xStart) / 2;
            const midY = (yEnd + yStart) / 2;
            const deg = c <= -90 ? (360 + c) : c;  //负角转换为正角

            return `<div class='charts-16pf-line' style='top:${midY}px;left:${midX - length / 2}px;width:${length}px;transform:rotate(${deg}deg);'></div>`
        }
    },

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
.psychology_title{
    font-size: 20px;
    font-weight: bold;
    color: #333333;
}
.psychology_name{
    font-size: 18px;
    color: #333;
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    p{
        width: 45%;
        margin-top: 7px;
    }
}
.check_jiance {
    font-size: 22px !important;
    margin-bottom:20px;
    ::v-deep .el-checkbox__label {
        font-size: 22px !important;
        color: #333333!important;
        font-weight: 600;
    }
}
.pull_left {
    display: inline-block;
    width: 95%;
    overflow: hidden;
}

::v-deep .new-dialog span,
::v-deep .new-dialog label {
    font-size: 20px;
}
::v-deep .el-table {
    font-size: 16px;
}
::v-deep .el-dialog {
    //width: 35%;
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
    color: #999999;
    font-size: 16px;
    margin: 0;
    text-align: center;

}


.print-html {
    max-width: 1100px;
    margin: 0 auto;

    .print-none {
        display: none;
    }

    .edit-btn.active {
        display: block;
    }

    @media print {
        table td,
        table th {
            border: 1px #000000 solid;
        }
    }
}

.print-html > .title {
    color: #333333;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
}

.print-html > .title img {
    width: auto;
    height: 75px;
    // border-radius: 50%;
    margin-right: 15px;
}

.print-html > .title p {
    font-size: 38px;
    margin-bottom: 5px;
}

.table-name {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 0 auto 15px;
    font-size: 16px;
    color: #333333;
}

.table-name p {
    font-size: 26px;
    font-weight: bold;
}

.print-html .edit-btn {
    color: #7A40F2;
    position: absolute;
    right: 0;
    cursor: pointer;
    @media print {
        display: none !important;
    }
}

.print-body {
    border: 1px solid #e6e6e6;
    border-bottom: none;
}

.print-body .first {
    display: flex;
}

.print-body .first > .first-group {
    flex: 1;
    padding: 10px 25px;
    border-right: 1px solid #e6e6e6;
    @media print {
        padding: 10px 0;
    }
}

.print-body .row {

    display: flex;
    align-items: center;
    font-size: 20px;
    color: #333333;
    //padding-left: 25px;
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
    border-bottom: 1px solid #e6e6e6;
}

.print-row {
    padding: 20px;
    color: #333333;
    font-size: 28px;
    font-weight: bold;
}

.print-row .title {
    text-align: center;
    line-height: 50px;
    margin-bottom: 20px;
}

.tip {
    margin-top: 36px;
    text-align: center;
    height: 22px;
    font-size: 18px;
    font-weight: 400;
    color: #333333;
    line-height: 22px;
}

.print-row .table-name p {
    height: 30px;
    font-size: 28px;
    margin-bottom: 20px;
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
    //line-height: 55px;
    font-size: 20px;
    align-items: center;
    height: 50px;
}

.group > p {
    margin-left: 15px;
    font-weight: bold;
}
.jiance {
    font-size: 22px;
    >p {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        >span {
            display: block;
        }
        span:nth-child(1) {
            width: 40%;
            padding-right: 50px;
        }

        span:nth-child(2) {
            width: 20%;
        }

        span:nth-child(3) {
            width: 40%;
        }
    }
}
.check-result {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    > div {
        font-size: 22px;
    }

    div:nth-child(1) {
        width: 40%;
        padding-right: 50px;
    }

    div:nth-child(2) {
        width: 20%;
    }

    div:nth-child(3) {
        width: 40%;
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
        border: 1px solid #cdcdcd;
        box-sizing: border-box;
    }

    ::v-deep .el-select-dropdown {
        max-width: 30em;
        top: unset !important;
        left: unset !important;
    }
}



.page-A4 {
    img {
        width: 100%;
        height: auto;
    }
}

.scl90-analysis {
    > * {
        font-size: 18px;
        margin-bottom: 1em;
    }
}

.report-text-content {
    width: 100%;
    display: block;
    flex: 1;
    font-size: 22px;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif, "Microsoft YaHei";
}
.charts-16pf {
    position: relative;

    table {
        border-collapse: collapse;
        width: 100%;

        th, td {
            border: 1px #eeeeee solid;
            padding: 8px;
            font-size: 18px;
            font-weight: normal;
        }

        thead {
            background: #e5e5e5;
        }

        .flex {
            height: 40px;
        }

        .flex-grow1 {
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;

            i {
                display: block;
                width: 4px;
                height: 4px;
                border-radius: 4px;
                position: relative;
                z-index: 2;
            }

            &.active {
                i {
                    background: #7A40F2;
                    box-shadow: 0 0 5px #7A40F2;
                }
            }
        }

        .line {
            &:before {
                content: " ";
                display: block;
                width: 0;
                border-right: 1px #e5e5e5 solid;
                height: 100%;
                margin-right: -2px;
                position: relative;
                z-index: 1;
            }
        }

        tfoot {
            td {
                border: 0;

                .flex-grow1 {
                    flex-direction: column;
                    justify-content: flex-start;

                    i {
                        width: 0;
                        height: 10px;
                        border-right: 1px #e5e5e5 solid;
                    }

                    span {
                        color: #999;
                    }
                }
            }
        }
    }
}
.MMPICT-ii {
    .score {
        display: flex;
        justify-content: center;
        margin-top: 23px;

        .item {
            margin-right: 24px;
            margin-bottom: 5px;
            font-size: 22px;
            font-weight: 500;
            color: #000000;
            line-height: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            &:last-child {
                margin-right: 0;
            }

        }
    }

    .table-two {
        width: 100%;
        margin-top: 30px;
    }
}



</style>
<style>
.report-text-content p,
.report-text-content div {
    margin-bottom: 0.8em;
}

.scl90-table-header th {
    background: #e5e5e5;
    color: #000000;
}


.charts-16pf-line {
    position: absolute;
    background-image: linear-gradient(to right, #7A40F2, #b293fb);
    height: 1px;
    z-index: 1;
}

@media print {
    body {
        -webkit-print-color-adjust: exact;
    }
}


</style>

<style lang="scss">
.tscore-col {
    * {
        overflow: visible !important;

        div {
            width: 100% !important;
            //padding-right: 10px !important;
        }
    }
}

/*.table-two-header-row{
    border: none;
}*/

.tscore {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    * {
        overflow: visible !important;
        width: 100%;
    }
}

.head-row {
    height: 120px;

    .cell {
        height: 100% !important;
        padding-top: 10px
    }

    *[type="ho"] {
        height: 100%;
        display: flex;
        align-items: flex-end;
    }

    *[type="ver"] {
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        line-height: 20px;

        .tone {
            color: #333333;
            font-size: 18px;
            height: 4em !important;
            overflow: hidden;

            writing-mode: vertical-lr;
            display: flex;
            align-items: center;
            justify-content: space-between;

            & > div {
                height: fit-content;

                &:nth-child(1) {
                }
            }

        }

        .ttwo {
            margin-top: 5px;
        }
    }
}

.table-left {
    display: flex;
    width: 12em;
    justify-content: space-between;

    div {
        float: left;
    }
}

.overline {
    width: 12em;
    text-align-last: justify;
    text-align: justify;
}

.table-two-cell-one {
    background: #F6F6F6 !important;
    border-right: none !important;

    &:last-child {
        border-right: 1px solid #EBEEF5;
    }
}


.table-two-cell-slot {
    @extend .table-two-cell-one;
    /*padding-top: 24px !important;
    padding-bottom: 0 !important;*/
    display: flex;
    align-items: flex-end;
    overflow: visible !important;


    .cell {
        margin-top: 12px;
        margin-bottom: -12px;
        display: flex !important;
        padding: 0 20px 0 0 !important;
        justify-content: space-between;
        overflow: visible !important;


        .table2-head {
            margin-left: -5px;
            display: flex;
            height: fit-content;
            justify-content: space-between;
        }
    }
}
.table-three-cell-slot{
    @extend .table-two-cell-one;
    /*padding-top: 24px !important;
    padding-bottom: 0 !important;*/
    display: flex;
    align-items: flex-end;
    overflow: visible !important;
    text-align: center !important;


    .cell {


        .table2-head {
            margin-left: -5px;
            display: flex;
            height: fit-content;
            justify-content: space-between;
        }
    }
}


</style>
