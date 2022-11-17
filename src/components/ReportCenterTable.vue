<template>
    <div class="content">
        <div class="content_top">
            <div class="content_top_left">
                <a v-if="deleteUrl && check('删除')" @click="deleteBtn" class="all_del" href="javascript:"><img
                    src="../assets/images/top_del.png" alt=""></a>
                <a v-if="refresh" @click="onRefresh" class="reload" href="javascript:"><img
                    src="../assets/images/top_reload.png" alt=""></a>
                <a class="report" href="javascript:;" @click="AdeleteClick" v-if="Adelete" style="color: #FF8F5F">
                    <img src="../assets/images/yjsc.png" alt="">
                    一键删除
                </a>
                <a class="report" href="javascript:;" @click="AdownloadClick" v-if="Adownload" style="color: #39CBE9">
                    <img src="../assets/images/download.png" alt="">
                    一键下载
                </a>
                <a class="report" href="javascript:;" @click="RiskClick" v-if="RiskEarlywarning" style="color: #7A40F2">
                    危险预警报告
                </a>
            </div>
            <el-form class="search-bar" ref="form" :inline="true" :model="form">
                <template v-if="customSearch.length>0">
                    <el-form-item v-for="(item,index) in customSearch" :key="item + index" :prop="item.prop">
                        <el-input v-model="form[item.prop]" :placeholder="item.placeholder" clearable></el-input>
                    </el-form-item>
                </template>
                <el-form-item v-if="form.keyword || form.keyword == ''" prop="keyword">
                    <el-input v-model="form.keyword" placeholder="输入关键词" clearable></el-input>
                </el-form-item>
                <el-form-item v-if="searchBtn">
                    <el-button type="primary" round @click="onSubmit"
                               style="background: #7A40F2;width:90px;border:none">搜索
                    </el-button>
                </el-form-item>
                <el-form-item v-if="back">
                    <el-button class="pink" plain @click="backPage" icon="el-icon-arrow-left">
                        {{ back.text ? back.text : '返回上一页' }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
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
                v-if="tableCheckbox"
                center
                align="center"
                type="selection"
                 width="100">
            </el-table-column>
            <el-table-column v-for="item in tableTitle" :key="item.name"
                             :prop="item.value"
                             :label="item.name"
                             :width="item.width"
                             :align="item.align || 'left'  "
                             :formatter="item.formatter">
            </el-table-column>
            <el-table-column v-if="setting" :label="operation" width="350" align="center">
                <template slot-scope="scope">
                    <div style="display: inline-block;min-width: 100px;" v-if="operationLeft">
                        <template v-if="userSelectTerminal">
                        <span v-for="userI in userSelectTerminal" :key="userI.user.id"
                              v-if="userI.user.id == scope.row.id">
                                {{ userI.terminal.nickname }}
                        </span>
                        </template>
                        <el-row>
                            <el-button v-if="check('测评报告')" @click="goTestReport(scope.row)" style="background: #7A40F2;color: #fff;font-size: 16px">
                                测评报告
                            </el-button>
<!--                            <el-button v-if="check('情绪调节报告')" @click="EmotionDetail(scope.row)" style="background: #33D196;color: #fff;font-size: 16px">-->
<!--                                训练治疗报告-->
<!--                            </el-button>-->
                        </el-row>
                    </div>
                </template>
            </el-table-column>

        </el-table>

        <div class="bottom_bottom" v-if="pageFooter">
            <div class="page_total_wrap">
                <div class="page_total">
                    <span class="total-count">共{{ searchData.total_count }}项</span>
                    <span class="total-tip">
                        当前显示{{ searchData.start_count }}到{{ searchData.end_count }}项，共{{ searchData.end_count }}项</span>
                </div>
                <div class="page_button" v-if="bottomButton.length > 0">
                    <el-button type="primary" round v-for="item in bottomButton" :key="item.text"
                               @click="$emit('bottomClick',item.method)">
                        {{ item.text }}
                    </el-button>
                </div>
            </div>
            <el-pagination :current-page.sync="form.page"
                           :pager-count="9"
                           :hide-on-single-page="true"
                           :total="searchData.total_count"
                           layout="prev, pager, next, jumper"
                           @current-change="handleCurrentChange" background>
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: "Table",
    props: {
        tableType: Number,
        tableTitle: Array,
        searchUrl: String,
        deleteUrl: String,
        addHref: String,
        InfoHref: String,
        detailHref: String,
        Adelete: {
            default:false,
            type:Boolean
        },
        Adownload: {
            default:false,
            type:Boolean
        },
        RiskEarlywarning: {
            default:false,
            type:Boolean
        },
        setting: {
            default: true,
            type: Boolean
        },
        qrcode: {
            default: false,
            type: Boolean
        },
        statistics: {
            default: false,
            type: Boolean
        },
        statisHref: String,
        operationList: Array,
        info: {
            default: () => {
                return {
                    icon: false,
                    jumpData: ['id']
                }
            },
            type: Object
        },
        isAssess: {
            default: false,
            type: Boolean
        },
        searchTime: {
            default: true,
            type: Boolean
        },
        refresh: {
            default: true,
            type: Boolean
        },
        tableCheckbox: {
            default: true,
            type: Boolean
        },
        InfoText: {
            type: String
        },
        userSelectTerminal: Array,
        add: Boolean,
        edit: Boolean,
        searchBtn: {
            default: true,
            type: Boolean
        },
        bottomButton: {
            default: () => {
                return []
            }, type: Array
        },
        back: Object,
        operation: {
            default: '操作',
            type: String
        },
        form: {
            // eslint-disable-next-line vue/require-valid-default-prop
            default: () => {
                return {
                    keyword: '',
                    start_time: '',
                    end_time: '',
                    page: 1,
                    limit: 10,
                }
            },
            type: Object
        },
        pageFooter: {
            default: false,
            type: Boolean
        },
        customSearch: {
            default: () => {
                return []
            },
            type: Array
        },
        operationLeft: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            searchData: [],
            tableData: [],
            loading: false,
            multipleSelection: [],
        };
    },
    computed: {},
    watch: {},
    mounted() {
        //获取权限列表
        this.$store.dispatch('GetAuth')
        //消息接口
        this.$store.dispatch('GetXiao')


        for (const key in this.form) {
            if (this.$route.query[key]) {
                this.form[key] = this.$route.query[key]
            }
        }
        if (this.$route.query.id) {
            this.form.id = this.$route.query.id
        }
        this.getLastPage()
    },
    methods: {
        RiskClick() {
            this.$router.replace({name: "RiskEarlyWarning"})
        },
        AdeleteClick() {
            if (this.multipleSelection.length === 0) {
                this.$message({
                    type: 'info',
                    message: '请先选择一条信息'
                });
                return;
            }
            this.$confirm('是否选中删除该信息', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delete(this.multipleSelection.join(','));
            }).catch(() => {
            });
        },
        AdownloadClick() {
            if (this.multipleSelection.length === 0) {
                this.$message({
                    type: 'info',
                    message: '请先选择一条信息'
                });
                return;
            }
            this.$emit('zip_add', this.multipleSelection)
            if(this.tableType == 1) {
                this.$axios.post('api/zip/zip_add', this.$qs.stringify({
                    patient_id: this.multipleSelection
                })).then(res => {

                })
            } else {
                this.$axios.post('api/zip/zip_add', this.$qs.stringify({
                    exam_id: this.multipleSelection
                })).then(res => {

                })
            }

        },
        getLastPage() {
            if(sessionStorage.getItem('detail_')) {
                this.form.page = sessionStorage.getItem("currentPage_")
                this.handleCurrentChange(sessionStorage.getItem("currentPage_")-0||1)
                sessionStorage.removeItem("detail_")
            } else {
                this.form.page = 1
                this.handleCurrentChange(1)
            }
        },
        check(_name) {
            let show = false
            this.$store.state.auth.map(item => {
                if (item.name === this.$store.state.cmenu) {
                    let child = item.child
                    child.map(item2 => {
                        if (_name === item2.name) {
                            show = true
                        }
                    })
                }
            })
            return show
        },
        async handleStart(val) {
            await this.$axios.post('api/exam/start', this.$qs.stringify({id: val.id})).then(res => {
                this.InterfaceList()
            })
        },
        async handleStop(val) {
            await this.$axios.post('api/exam/suspend', this.$qs.stringify({id: val.id})).then(res => {
                this.InterfaceList()
            })
        },
        async handleEnd(val) {
            await this.$axios.post('api/exam/end', this.$qs.stringify({id: val.id})).then(res => {
                this.InterfaceList()
            })
        },
        handleCurrentChange(val) {
            if (this.form.page) {
                this.form.page = val;
                setTimeout(() =>{
                    if(sessionStorage.getItem('detail_')) {
                    } else {
                        sessionStorage.setItem('currentPage_', val)
                    }
                },1000)
            }
            this.InterfaceList()
        },
        // 搜索
        onSubmit() {
            this.form.page = 1
            this.InterfaceList()
        },
        InterfaceList() {
            this.loading = true
            if(this.tableType == 3) {
                this.form.type = 2
            }
            this.$axios.post(this.searchUrl, this.$qs.stringify(
                this.form
            )).then(res => {
                let data = res.data.data;
                this.searchData = data;
                this.tableData = data.list;
                if (data.list == null) {
                    this.tableData = data;
                }
                setTimeout(() => {
                    this.loading = false
                },2000)
            })
        },
        delete(id) {
            this.$axios.post(this.deleteUrl, this.$qs.stringify({id: id})).then(res => {
                if(res.data.data.name) {
                    this.$emit('delinfo',res.data,this.multipleSelection,id)
                } else {
                    this.handleCurrentChange(1)
                }
            })
        },
        // 删除图标（左上）
        deleteBtn() {
            if (this.multipleSelection.length === 0) {
                this.$message({
                    type: 'info',
                    message: '请先选择一条信息'
                });
                return;
            }
            this.$confirm('是否选中删除该信息', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delete(this.multipleSelection.join(','));
            }).catch(() => {
            });
        },
        handleSelectionChange(val) {
            // console.log('val',val)
            let ids = val.map(item => {
                return item.id
            })
            this.multipleSelection = ids;
        },
        handleClick(val) {
            let query = {};
            for (const key in val) {
                if (key.indexOf(this.info.jumpData) > -1) {
                    query[key] = val[key];
                }
            }
            this.$router.push({
                name: this.InfoHref, query: query
            })
        },
        //编辑按钮
        handleDetail(val) {
            this.$router.push({
                name: this.detailHref, query: {
                    id: val.id
                }
            })
        },
        // 跳转
        handleJump(href, val) {
            this.$router.push({
                name: href, query: {
                    id: val.id
                }
            })
        },
        // 删除单条数据
        handleDel(val) {
            this.$confirm('是否选中删除该信息', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delete(val.id);
            }).catch(() => {
            });
        },
        // 返回上一页
        backPage() {
            this.$router.go(-1);
        },
        // 刷新（左上）
        onRefresh() {
            this.loading = true
            this.$refs.form.resetFields()
            this.form.page = 1
            this.InterfaceList()
        },
        // 测评报告按钮
        goTestReport(val) {
            // console.log('val',val)
            if(val.type == 1) {
                this.$router.replace({name: "TestReportInfoTeam",query:{exam_id:val.id,type:2}})
            } else if(val.type == 2) {
                this.$router.replace({name: "TestReportInfoPublic",query:{exam_id:val.id,type:2}})
            }else {
                this.$router.replace({name: "TestReportInfo",query:{patient_id:val.id,type:2}})
            }

        },
    },
}
</script>

<style scoped lang="scss">
.content {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 150px) !important;
}


.content_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
}
.content_top_left {
    display: flex;
}
.content_top_left a {
    display: inline-block;
    width: 48px;
    height: 48px;
    margin-right: 15px;
    background: #FFF;
}

.content_top_left a img {
    display: block;
    margin: 10px auto 0;
}
.content_top_left a.report {
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
.content_top_right {
    display: flex;
    align-items: center;
}

.content_top_right input {
    height: 45px;
    line-height: 45px;
    background: #FFF;
    font-size: 14px;
    padding-left: 10px;
}

.content_top_right input.search {
    width: 290px;
    margin-right: 10px;
}

.content_top_right input.time {
    color: #666;
    width: 190px;
    background: #FFF url(../assets/images/rili.png) no-repeat 95% center;
}

.content_top_right input::-webkit-input-placeholder {
    color: #999;
}

.content_top_right p {
    margin: 0 10px;
}

.content_top_right a {
    display: block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    color: #FFF;
    text-align: center;
    font-size: 18px;
    background: #FE9834;
    box-shadow: 4px 7px 10px 0px rgba(254, 152, 52, 0.2);
    border-radius: 50px;
    margin-left: 20px;
}

.content_bottom {
    background: #FFF;
    height: 850px;
}

.bottom_top .el-table {
    height: 580px;
    overflow-y: auto;
}

.bottom_top .el-table::before {
    height: 0;
}

.table_list {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
}

.el-table {
    overflow-y: auto;
}

.table_list th {
    background: #FFF;
    font-size: 16px;
}

.table_list td {
    font-size: 14px;
}

.table_list tr {
    height: 55px;
}

.table_list tr:nth-child(odd) {
    background: #F4F4F4;
}
//
//::v-deep .el-table .el-table__row:hover > td {
//    background-color: #FFE5E4 !important;
//}

.table_list th, td {
    width: 157px;
}

td:last-child {
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 35%;
}

.table_list img {
    display: block;
    margin-right: 10px;
}

.table_list img:last-child {
    margin: 0;
}


.page_top {
    display: flex;
    align-items: center;
    margin-top: 20px;
    color: #444;
    font-size: 14px;
}

.page_top span {
    background: #F2ECFC;
    color: #7A40F2;
    font-size: 14px;
    border-radius: 50px;
    height: 25px;
    line-height: 25px;
    width: 85px;
    text-align: center;
    margin-right: 15px;
}

.page_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
}

.page_box a {
    width: 35px;
    height: 35px;
    border: 1px solid #CCCCCC;
    font-size: 16px;
    color: #444;
    text-align: center;
    line-height: 35px;
    margin-right: 5px;
}

.page_box a.active {
    background: #F2ECFC;
    color: #7A40F2;
    border: 1px solid #7A40F2;
}

.page_box p {
    margin: 0 20px;
    font-size: 16px;
    color: #555;
}

.page_box p input {
    width: 35px;
    height: 35px;
    border: 1px solid #CCCCCC;
    font-size: 16px;
    color: #555;
    text-align: center;
    line-height: 35px;
}

.page_box .sure {
    display: block;
    width: 110px;
    text-align: center;
    color: #FFF;
    font-size: 16px;
    margin-left: 25px;
    height: 35px;
    line-height: 35px;
    background: #7A40F2;
    box-shadow: 2px 3px 5px 0px rgba(245, 96, 90, 0.2);
    border-radius: 50px;
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

.bottom_bottom {
    padding: 30px 45px;
    background-color: #FFF;
}


.bottom_bottom .page_total_wrap {
    margin-bottom: 11px;
    display: flex;
    justify-content: space-between;
}

.page_button {

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

.bottom_bottom .el-pagination {
    display: flex;
    justify-content: center;
}

::v-deep .cell-class {
    text-align: center;
    font-size: 16px;
}

.date-search {
    display: inline-block;
}

.date-search ::v-deep .el-form-item {
    margin-right: 0;
}

::v-deep .el-table::before {
    height: 0;
}

::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    border-color: #7A40F2;
    background-color: #7A40F2;
}
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
    border-color: #7A40F2;
    background-color: #7A40F2;
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
