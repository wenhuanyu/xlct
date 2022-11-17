<template>
    <div>
        <Table
            :tableTitle="tableTitle"
            :search-url="url"
            :tableType = "2"
            :add="false"
            :operation-list="operationList"
            :operation-left="false"
            @operation-click="edit"
            :searchTime="false"
            :deleteUrl="'api/exam/early_del'"
            :page-footer="true"
        />

    </div>
</template>

<script>
import Table from "../components/Table";

export default {
    name: "RiskEarlyWarning",
    components: {Table},
    data() {
        return {
            tableTitle: [
                {
                    name: '编号',
                    value: 'num',
                    width:'100'
                },
                {
                    name: '患者',
                    value: 'patient_name',
                    width:'180'

                },
                {
                    name: '病历号',
                    value: 'medical_num',
                    width:'180'
                },
                {
                    name: '医保号',
                    value: 'medical_insurance_num',
                    width:'180'
                },
                {
                    name: '量表名称',
                    value: 'test_paper_name',
                },
                {
                    name: '测评时间',
                    value: 'create_at',
                    width:'220'

                },
                // {
                //     name: '时长',
                //     value: 'use_time'
                // },
                // {
                //     name: '得分',
                //     value: 'total_score',
                //     width:'180'
                // },
            ],
            url: 'api/exam/early_info',
            reportUrl: '',
            // form:{
            //     type:'',
            // },
            operationList: [{img: 'look.png', method: '1'}]
        };
    },
    computed: {},
    watch: {},
    methods: {
        edit(val){
            console.log('val',val)
            this.$router.push({
                name: 'AssessDetail',
                query: {
                    'liangbiao_id': val.exam_id,
                    'id': val.test_paper_id,
                    'patient_id':val.patient_id
                }
            })
        },
        add() {
        },
        removeBtn(ids) {
            // console.log(ids)
        }
    },
    mounted() {
        // if(this.$route.query.type) {
        //     this.form.type = this.$route.query.type
        //     this.form.exam_id = this.$route.query.exam_id
        // }
        sessionStorage.setItem("detail_", true);
    }
}
</script>

<style scoped>

</style>
