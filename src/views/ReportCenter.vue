<template>
    <div  class="setting-plan">
        <div class="programme">
            <div class="programme_title programme_action" @click="tab">
                单人测评报告
            </div>
            <div class="programme_title" @click="tabTwo">
                团体测评报告
            </div>
            <div class="programme_title" @click="tabThree">
                公共测评报告
            </div>
        </div>
        <ReportCenterTable
            :page-footer="true"
            :deleteUrl="'api/patient/report_delete'"
            :search-url="url"
            :InfoHref="InfoHref"
            :tableTitle="tableTitle"
            detail-href="TestReport"
            :Adownload="true"
            :Adelete = "true"
            :RiskEarlywarning = "true"
            @remove="removeBtn"
            class="programme-right"
            @zip_add = "zip_addClick"
            @delinfo="delinfoChange"
            :tableType = "1"
            ref="table"
        />
        <el-dialog :visible.sync="qrDialog" :modal="false" width="22vw" top="25vh" :close-on-click-modal="false">
            <div class="dialog-body">
                <div class="dialog-text" style="text-align: center">
                    <img src="../assets/images/tishi.png" style="width: 80px;height: 80px">
                    <h2 style="margin-top: 20px;margin-bottom: 10px;">下载提示</h2>
                    <div style="margin-top: 5px; margin-bottom: 20px" >
                        <h3>打包任务已提交，请稍后在信息中心进行下载</h3>
                    </div>
                    <el-button type="warning" style="background: #7A40F2;border: 1px solid #7A40F2;color: #FFFFFF;box-shadow:none;" round @click="qrDialog = false">知道了
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="qrDialog_del" :modal="false" width="22vw" top="25vh" :close-on-click-modal="false">
            <div class="dialog-body">
                <div class="dialog-text" style="text-align: center">
                    <img src="../assets/images/tishi.png" style="width: 80px;height: 80px">
                    <h2 style="margin-top: 20px;margin-bottom: 10px;">提示</h2>
                    <div style="margin-top: 5px; margin-bottom: 20px" >
                        <h3>{{ delinfoList }}</h3>
                    </div>
                    <div slot="footer">
                        <el-button type="warning" style="background: #ffffff;border: 1px solid #CDCDCD;color: #333333;box-shadow:none;" round @click="deleteZJ">直接删除
                        </el-button>
                        <el-button type="primary" round @click="buttonSubmit">一键下载</el-button>
                    </div>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
import ReportCenterTable from "../components/ReportCenterTable";

export default {
    name: "ReportCenter",
    components: {ReportCenterTable},
    data() {
        return {
            tableTitle: [
                {
                    name: '编号',
                    value: 'num',
                    width: '120',
                },
                {
                    name: '患者',
                    value: 'name',
                    width: '250',
                },
                {
                    name: '病历号',
                    value: 'medical_num',
                    width: '260',
                },
                {
                    name: '医保号',
                    value: 'medical_insurance_num',
                    width: '260',
                }],
            url: 'api/patient/index',
            InfoHref: 'InfoAssess',
            qrDialog: false,
            qrDialog_del:false,
            delinfoList:'',
            delid:'',
            delidxzL:'',
        };
    },
    computed: {},
    watch: {},
    methods: {
        deleteZJ() {
            this.$axios.post('api/patient/report_delete', this.$qs.stringify({
                id: this.delid,
                type:1
            })).then(res => {
                this.$refs.table.onRefresh()
                this.qrDialog_del = false;
            })
        },
        buttonSubmit() {
            this.$axios.post('api/zip/zip_add', this.$qs.stringify({
                patient_id: this.delidxzL,
            })).then(res => {
                if(res.data.code == 1) {
                    this.qrDialog = true
                    this.qrDialog_del = false;
                }

            })
        },
        delinfoChange(res,id,delid) {
            this.qrDialog_del = true;
            this.delinfoList = res.data.name
            this.delidxzL = id
            this.delid = delid
        },
        zip_addClick(res) {
            if(res) {
                this.qrDialog = true
            }
        },
        tab(index) {
            this.$router.push('/ReportCenter')
        },
        tabTwo(index) {
            this.$router.push('/ReportCenterTeam')
        },
        tabThree(index) {
            this.$router.push('/ReportCenterPublic')
        },
        add() {
        },
        removeBtn(ids) {
            console.log(ids)
        }
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog__body {
    padding: 20px;
}
::v-deep .el-dialog {
    border-radius: 5px;
}
.setting-plan {
    display: flex;
}

.programme {
    width: 266px;
    height: 100%;
    background: #fff;
    padding: 10px;
}

.programme-right {
    min-width: 1284px;
    margin-left: 20px;
    width: 100%;
}

.programme_title {
    width: 246px;
    height: 58px;
    border-radius: 6px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
}

.programme_action {
    background: #7A40F2;
    color: #fff;
}

.hide {
    display: none;
}

.show {
    display: block;
}
</style>
