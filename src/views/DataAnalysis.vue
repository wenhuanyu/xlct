<template>
    <div class="content">
        <div class="content_top">
            <el-form class="search-bar" ref="form" :inline="true" :model="form" style="display: flex;">
                <el-form-item prop="keyword">
                    <el-input v-model="form.keyword" placeholder="输入关键词" clearable></el-input>
                </el-form-item>
                <div class="date-search">
                    <el-col :span="11">
                        <el-form-item prop="start_time">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.start_time"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="end_time">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.end_time" style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </div>
                <el-form-item>
                    <el-button type="primary" round @click="onSubmit"
                               style="background: #7A40F2;width:90px;border:none">搜索
                    </el-button>
                </el-form-item>
                <el-form-item v-if="!echartsShow">
                    <el-button class="pink" plain @click="backPage" icon="el-icon-arrow-left"style="color: #7A40F2!important;" >
                       <a style="color: #333333!important;"> 返回主页面</a>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content_center" v-if="echartsShow">
            <div>
                <div class="content_center_text">患者数</div>
                <div class="content_center_text" style="color: #7A40F2">{{ formData.patient.all }}</div>
                <div class="content_center_text" style="display: flex;justify-content: center;align-items: center">
                    <img src="../assets/images/icon1_color.png" v-if="formData.patient.down!==0">
                    <img src="../assets/images/icon1.png" v-else>
                    <div style="margin-right: 30px">{{ formData.patient.down }}</div>
                    <img src="../assets/images/icon2.png"v-if="formData.patient.up!==0">
                    <img src="../assets/images/icon2_color.png" v-else>
                    <div>{{ formData.patient.up }}</div>
                </div>
            </div>
            <div class="content_center_line"></div>
            <div>
                <div class="content_center_text">门诊患者</div>
                <div class="content_center_text" style="color: #F4C424">{{ formData.outpatient.all }}</div>
                <div class="content_center_text" style="display: flex;justify-content: center;align-items: center">
                    <img src="../assets/images/icon3.png" v-if="formData.outpatient.down!==0">
                    <img src="../assets/images/icon3_color.png" v-else>
                    <div style="margin-right: 30px">{{ formData.outpatient.down }}</div>
                    <img src="../assets/images/icon4_color.png"v-if="formData.outpatient.up!==0">
                    <img src="../assets/images/icon4.png" v-else>
                    <div>{{ formData.outpatient.up }}</div>
                </div>
            </div>
            <div class="content_center_line"></div>
            <div>
                <div class="content_center_text">住院患者</div>
                <div class="content_center_text" style="color: #FF8F5F">{{ formData.hospitalization.all }}</div>
                <div class="content_center_text" style="display: flex;justify-content: center;align-items: center">
                    <img src="../assets/images/icon5_color.png" v-if="formData.hospitalization.down!==0">
                    <img src="../assets/images/icon5.png" v-else>
                    <div style="margin-right: 30px">{{ formData.hospitalization.down }}</div>
                    <img src="../assets/images/icon6.png" v-if="formData.hospitalization.up!==0">
                    <img src="../assets/images/icon6_color.png" v-else>
                    <div>{{ formData.hospitalization.up }}</div>
                </div>
            </div>
            <div class="content_center_line"></div>
            <div>
                <div class="content_center_text">男女比例</div>
                <div class="content_center_text" style="color: #39CBE9">{{ formData.sex.all }}</div>
                <div class="content_center_text" style="display: flex;justify-content: center;align-items: center">
                    <img src="../assets/images/icon7.png" style="width: 11px">
                    <div style="margin-right: 30px">{{ formData.sex.man }}</div>
                    <img src="../assets/images/icon8.png"style="width: 11px">
                    <div>{{ formData.sex.girl }}</div>
                </div>
            </div>
            <div class="content_center_line"></div>
            <div>
                <div class="content_center_text">测评数</div>
                <div  class="content_center_text" style="color: #507DEC">{{ formData.exam.all }}</div>
                <div class="content_center_text" style="display: flex;justify-content: center;align-items: center">
                    <img src="../assets/images/icon9_color.png" v-if="formData.exam.down !==0">
                    <img src="../assets/images/icon9.png" v-else>
                    <div style="margin-right: 30px">{{ formData.exam.down }}</div>
                    <img src="../assets/images/icon10.png" v-if="formData.exam.up !==0">
                    <img src="../assets/images/icon10_color.png" v-else>
                    <div>{{ formData.exam.up }}</div>
                </div>
            </div>
        </div>
        <div class="charts-wrap" v-if="echartsShow">
            <div id="myChart" :style="{width: '100%', height: '595px'}"></div>
        </div>
        <el-table
            v-if="!echartsShow"
            v-loading="loading"
            style="width: 100%"
            class=""
            stripe
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
                center
                type="selection"
                align="center"
                width="60"
            >
            </el-table-column>
            <el-table-column v-for="item in tableTitle" :key="item.name" :prop="item.value" :label="item.name"
                             :width="item.width" :align="item.align || 'left'  " :formatter="item.formatter">
            </el-table-column>
        </el-table>
        <div class="bottom_bottom" v-if="!echartsShow">
            <div class="page_total_wrap">
                <div class="page_total">
                    <span class="total-count">共{{ searchData.total_count }}项</span>
                    <span class="total-tip">
						当前显示{{ searchData.start_count }}到{{ searchData.end_count }}项，共{{ searchData.end_count }}项
					</span>
                </div>
            </div>
            <div class="bottom_bottom_box">
                <div></div>
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="form.page" :pager-count="9"
                               layout="prev, pager, next, jumper" :hide-on-single-page="true" :total="searchData.total_count">
                </el-pagination>
                <a class="report" href="javascript:;" @click="AdownloadClick" style="color: #FFFFFF" v-if="multipleSelection.length==0">
                    <img src="../assets/images/xiazai1.png" alt="">
                    下载
                </a>
                <a class="report" :href="'http://xlct.shoupinkangda.com/api/Analysis/index_list?type=1&exam_id='
                +multipleSelection+'&hospital_id='
                +formData.hospital_id"  style="color: #FFFFFF" v-else>
                    <img src="../assets/images/xiazai1.png" alt="">
                    下载
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DataAnalysis",
    data() {
        return {
            form: {
                keyword: '',
                page: 1,
                limit: 10,
                start_time: '',
                end_time: '',
            },
            searchData: [],
            tableTitle: [
                {
                    name: '序号',
                    value: 'num',
                    width:'60'
                },
                {
                    name: '测评时间',
                    value: 'exam_create_at',
                    width:'160'
                },

                {
                    name: '患者姓名',
                    value: 'name',
                    width:'90'
                },
                {
                    name: '性别',
                    value: 'gender',
                    formatter: (row) => {
                        if (row.gender == 0) {
                            return '男';
                        } else {
                            return '女';
                        }
                    },
                    width:'60'
                },
                {
                    name: '年龄',
                    value: 'age',
                    width:'50'
                },
                {
                    name: '病历号',
                    value: 'medical_num',
                    width:'90'
                },
                {
                    name: '医保号',
                    value: 'medical_insurance_num',
                    width:'90'
                },
                {
                    name: '患者来源',
                    value: 'source',
                    width:'90'
                },

                {
                    name: '入院时间',
                    value: 'in_time',
                    width:'160'
                },
                {
                    name: '户口类型',
                    value: 'hukou',
                    width:'90'
                },
                {
                    name: '手机号',
                    value: 'phone',
                    width:'120'
                },
                {
                    name: '民族',
                    value: 'nation_name',
                    width:'90'
                },
                // {
                //     name: '婚姻',
                //     value: 'marriage_name',
                //     width:'90'
                // },
                // {
                //     name: '学历',
                //     value: 'education_name',
                //     width:'90'
                // },
                // {
                //     name: '职业',
                //     value: 'occupation_name',
                //     width:'90'
                // },
                {
                    name: '量表名称',
                    value: 'test_paper_name',
                },
                // {
                //     name: '测评结果',
                //     value: 'score_all',
                //     width: '200'
                // },
            ],
            tableData: [],
            InfoHref: 'InfoAssess',
            echartsShow:true,
            loading: false,
            formData:{
                exam:{
                    all:'',
                    down:'',
                    up: 0
                },
                hospitalization:{
                    all:'',
                    down:'',
                    up: 0
                },
                outpatient:{
                    all:'',
                    down:'',
                    up: 0
                },
                patient:{
                    all:'',
                    down:'',
                    up: 0
                },
                sex:{
                    all:'',
                    girl:'',
                    man: 0
                },
            },
            multipleSelection:[]

        };
    },
    computed: {},
    watch: {},
    mounted() {
        //获取权限列表
        this.$store.dispatch('GetAuth')
        //消息接口
        this.$store.dispatch('GetXiao')
        this.listInterface()
    },
    methods: {
        AdownloadClick() {
            if (this.multipleSelection.length === 0) {
                this.$message({
                    type: 'info',
                    message: '请先选择一条信息'
                });
                return;
            }
            // window.open(
            //     'http://xlct.shoupinkangda.com/api/Analysis/index_list?type=1&exam_id='
            //     +this.multipleSelection+'&hospital_id='
            //     +this.formData.hospital_id
            // )
        },
        listInterface() {
            this.$axios.post('api/Analysis/index').then(res => {
                this.formData = res.data.data
                this.$nextTick(() => {
                    this.drawLine();
                })
            })
        },
        listTable() {
            this.$axios.post('api/Analysis/index_list', this.$qs.stringify(
                this.form
            )).then(res => {
                let data = res.data.data;
                this.searchData = data;
                this.tableData = data.list;
                // console.log("~ this.tableData", this.tableData)
                if (data.list == null) {
                    this.tableData = data;
                }
                setTimeout(() => {
                    this.loading = false
                },2000)
            })
        },
        handleCurrentChange(val) {
            this.listTable()
        },
        // 搜索
        onSubmit() {
            this.form.hospital_id = this.formData.hospital_id
            this.form.page = 1
            this.echartsShow = false
            this.listTable()
        },
        handleSelectionChange(val) {
            let ids = val.map(item => {
                return item.exam_id
            })
            this.multipleSelection = ids;
        },
        backPage() {
            this.echartsShow = true
            this.$nextTick(() => {
                this.drawLine();
            })
        },
        // echarts图
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '一周内'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                color:['#7938D0','#09ACF8'],
                legend: {
                    data: ['患者数', '测评数']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: this.formData.data.date
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '测评数',
                        type: 'line',
                        stack: 'Total',
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color:  '#E2D1FA'
                                },
                                {
                                    offset: 1,
                                    color: '#F3EEFA'
                                }
                            ])
                        },
                        data: this.formData.data.exam,
                    },
                    {
                        name: '患者数',
                        type: 'line',
                        stack: 'Total',
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color:  '#D3EEFC'
                                },
                                {
                                    offset: 1,
                                    color: '#F5FBFE'
                                }
                            ])
                        },
                        data: this.formData.data.patient,

                    },

                ]
            });
        }
    },

}
</script>
<style>
</style>
<style scoped lang="scss">

.content {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 150px) !important;
}
.content_center_line {
    width: 1px!important;
    height: 90px;
    border: 0.1px dashed #cccccc;
}
.content_center {
    width: 100%;
    padding: 30px 0px;
    background: #ffffff;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.content_center >div {
    width: 25%;
    text-align: center;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    color: #666666;
}
.content_center >div .content_center_text {
    width: 100%;
}
.content_center >div .content_center_text img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
}
.content_center >div  >div:nth-child(1) {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
}
.content_center >div  >div:nth-child(2) {
    font-size: 60px;
    font-weight: 400;
    margin-bottom: 10px;
}
.content_center >div  >div:nth-child(3) {
    font-size: 16px;
    font-weight: 400;
}
.date-search {
    display: inline-block;
}

.date-search ::v-deep .el-form-item {
    margin-right: 0;
}
 ::v-deep .el-form-item {
    margin-bottom: 0;
}
.line {
    color: #CCC;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
}
.content_top {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.charts-wrap {
    padding: 20px;
    background: #ffffff;
}
.bottom_bottom {
    padding: 30px 45px;
    background-color: #FFF;
}


.bottom_bottom .page_total_wrap {
    margin-bottom: 11px;
    display: flex;
    justify-content: space-between;
}
.page_total {
    display: flex;
    align-items: center;
}
.bottom_bottom .total-count {
    background: #F2ECFC;
    color: #7A40F2;
    font-size: 14px;
    border-radius: 50px;
    text-align: center;
    margin-right: 15px;
    padding: 6px 14px;

}

.bottom_bottom .total-tip {
    font-size: 14px;
    color: #444444;
}
.bottom_bottom a {
    display: inline-block;
    width: 48px;
    height: 48px;
    margin-right: 15px;
    background: #39CBE9;
    border-radius: 4px;
}
.bottom_bottom_box {
    display: flex;
    justify-content: space-between;
}
.bottom_bottom a img {
    display: block;
    margin: 10px auto 0;
}
.bottom_bottom a.report {
    width: 138px;
    line-height: 48px;
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 23px;
        height: 20px;
        margin: 0 5px 0 0;
    }
}
.bottom_bottom .el-pagination {
    display: flex;
    justify-content: center;
}
::v-deep .el-table {
    height: 580px;
    overflow-y: auto;
}
::v-deep .el-table::before {
    height: 0;
}
::v-deep .el-table .cell {
    padding-top: 12px;
    padding-bottom: 12px;
}
::v-deep .el-table th > .cell {
    padding-top: 0;
    padding-bottom: 0;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled) {
    border: 1px solid #CCCCCC;
    background-color: #fff;
    color: #333;
    font-weight: 400;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #7A40F2;
}

::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #F2ECFC;
    border: 1px solid #7A40F2;
    color: #7A40F2 !important;
}

::v-deep .el-pagination.is-background .btn-prev {
    border: 1px solid #CCCCCC;
    background-color: #fff;
    color: #333;
}
::v-deep .el-pagination.is-background .btn-next {
    border: 1px solid #CCCCCC;
    background-color: #fff;
    color: #333;
}
</style>
