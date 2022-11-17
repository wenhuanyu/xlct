<template>
    <div class="setting-plan">
        <div class="programme">
            <div class="programme_title programme_action" @click="tab">
                测评方案
            </div>
            <div class="programme_title" @click="tabThree">
                PAD量表管理
            </div>
        </div>
        <Table :tableTitle="tableTitle" :searchBtn="true" :form="form"
               :searchTime="true"
               :addHref="addHref"
               :detailHref="detailHref" :deleteUrl="deleteUrl" :searchUrl="url" :qrcode="true" @qrcode="qrcode"
               class="programme-right"
               :page-footer="true"
        >

        </Table>

        <el-dialog :visible.sync="qrDialog" :show-close="false" class="dialog" width="1000px" top="50px"
                   :close-on-click-modal="false">
            <div class="dialog_body " ref="print">
                <img src="../assets/images/qr-dialog-bg.png" alt="" class="qrcode-bg">
                <div class="button-wrap no-print">
                    <el-button type="primary" v-print="'#print'" class="no-print">打印</el-button>
                    <el-button @click="qrDialog = false" class="no-print">关闭</el-button>
                </div>
                <div class="dialog-body-main" ref="print" id="print">
                    <div class="logo-name">
                        <img src="../assets/images/hospital.png" alt="">
                        <div>
                            <h3>{{ $store.state.user.hospital.hospital_name }}</h3>
                            <p>{{ $store.state.user.hospital.second_name }}</p>
                        </div>
                    </div>
                    <p class="plan-name">{{ currentRow.name }}</p>
                    <div class="qrcode-wrap">
                        <img src="../assets/images/qrcode-big.png" alt="">
                    </div>
                    <div class="explain">
                        <div class="explain-title">
                            <div></div>
                            <span>答题说明</span>
                            <div></div>
                        </div>
                        <p>手机扫描上方二维码</p>
                        <p>如果提示需要完善信息，则先完善信息，再进行答题</p>
                        <p>完成后告知医务人员打印报告</p>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Table from '../components/Table';

export default {
    name: "SettingPlan",
    components: {
        Table
    },
    data() {
        return {
            qrDialog: false,
            tableTitle: [
                // {
                //     name: '编号',
                //     value: "id",
                //     width: 120
                // },
                {
                    name: '名称',
                    value: 'name',
                    width: 180
                },
                {
                    name: '已选量表',
                    value: 'names',
                    formatter: (row) => {
                        let text = [];
                        row.names.map((item, key) => {
                            if (key < 10) {
                                text.push(item.name)
                            }
                        });
                        console.log()
                        return text.join('，') + (row.names.length > text.length ? '...' : '')
                    },
                    align: 'left'
                },
                {
                    name: '时间',
                    value: 'create_at',
                    width: 200
                },
            ],
            form: {
                keyword: '',
                id: 0
            },
            url: 'api/policy/lst',
            deleteUrl: 'api/policy/delete',
            addHref: 'SettingPlanAdd',
            detailHref: 'SettingPlanDetail',
            tableData: [],
            currentRow: '',
        };
    },
    computed: {},
    watch: {},
    mounted() {

    },
    methods: {
        tab(index) {
            this.$router.push('/SettingPlan')
        },
        tabTwo(index) {
            this.$router.push('/SettingPlanQ')
        },
        tabThree(index) {
            this.$router.push('/SettingPlanPad')
        },
        qrcode(row) {
            this.currentRow = row;
            this.qrDialog = true;
            console.log(row)
        },
        // printPage() {
        //     this.$print(this.$refs.print)
        // }
    },
}
</script>

<style scoped lang="scss">

::v-deep .el-dialog__header {
    padding: 0;
}

::v-deep .el-dialog__body {
    padding: 0;
}

::v-deep .el-table__body-wrapper {
    overflow: auto;
    height: 74vh;
}

//::v-deep .content_top{
//    margin-bottom: 8px;
//}
::v-deep .dialog {
    width: 100%;
}

.dialog_body {
    padding: 30px 20px;
    position: relative;
}

.qrcode-bg {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: auto;
}

.button-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.logo-name {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333333;

    > img {
        width: 100px;
        height: 100px;
    }

    > div {
        margin-left: 20px;
        text-align: center;

        > h3 {
            font-size: 54px;
        }

        > p {
            font-size: 30px;
        }
    }
}

.plan-name {
    font-size: 60px;
    text-align: center;
    margin: 85px 0;
    color: #333333;

}

.qrcode-wrap {
    margin-left: auto;
    margin-right: auto;
    width: 478px;
    height: 478px;
    padding: 20px;
    border: 1px solid #979797;
    border-radius: 10px;

    > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.explain-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 100px auto 40px;

    > span {
        padding: 0 10px;
        color: #333333;
        font-size: 24px;
    }

    > div {
        width: 24px;
        height: 1px;
        background-color: #7A40F2;
    }
}

.explain {
    margin-bottom: 200px;

    > p {
        text-align: center;
        color: #333333;
        font-weight: 600;
        margin-bottom: 0.5em;
        font-size: 30px;
    }
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
