<template>
    <div>
        <Table ref="list" :tableCheckbox="false" :search-time="false" :tableTitle="tableTitle"
               :operationList="operationList" @operation-click="operation" :operationLeft="false"
               :searchBtn="false" :searchUrl="url" :form="form" :back="back" :refresh="true"
               >
        </Table>
    </div>
</template>

<script>
import Table from '../components/Table';

export default {
    name: "SettingDoctorSay",
    components: {
        Table
    },
    data() {
        return {
            tableTitle: [
                {
                    name: '量表名称',
                    value: 'name',
                },
            ],
            form: {},
            back: {
                text: '返回系统页'
            },
            info: {
                icon: true,
                jumpData: ['test_paper_id',],
            },
            url: '',
            tableData: [],
            // InfoHref: 'SettingDoctorSayInfo',
            dialogFormVisible: false,
            operationList: [{img: 'look.png', method: '1'}]
        };
    },
    computed: {},
    watch: {},
    created() {
        // this.url = `api/template/scale_lst?type=${this.$route.query.type}`;
        // console.log(this.tableTitle[0].name)
        if(this.$route.query.type == 1){
            this.tableTitle[0].name = '量表说明'
            this.url = `api/template/scale_lst?type=${this.$route.query.type}`;
        }else if(this.$route.query.type == 2){
            this.tableTitle[0].name = '提示或建议'
            this.url = `api/template/scale_lst?type=${this.$route.query.type}`;
        }else if(this.$route.query.type == 5){
            this.tableTitle[0].name = '医生建议'
            this.url = `api/template/scale_lst?type=${this.$route.query.type}`;
        }else if(this.$route.query.type == 6){
            this.tableTitle[0].name = '总结与印象'
            this.url = `api/template/lst?type=${this.$route.query.type}`;
        }else if(this.$route.query.type == 7){
            this.tableTitle[0].name = '建议'
            this.url = `api/template/lst?type=${this.$route.query.type}`;
        }
    },
    methods: {
        operation(row) {
            this.$router.push({
                path: '/SettingDoctorSayInfo',
                query: {test_paper_id: row.test_paper_id, type: this.$route.query.type}
            })
        }
    },
    beforeRouteEnter(to, from, next) {
        console.log(to.meta.subtitle);
        switch (to.query.type) {
            case 1 : {
                to.meta.subtitle = '量表说明'
                break;
            }
            case 2 : {
                to.meta.subtitle = '提示或建议'
                break;
            }
            case 5 : {
                to.meta.subtitle = '医生建议'
                break;
            }
            case 6 : {
                to.meta.subtitle = '总结与印象'
                break;
            }
            case 7 : {
                to.meta.subtitle = '建议'
                break;
            }
        }
        next();
    }
}
</script>

<style scoped>
.el-form {
    width: 500px;
}

</style>
