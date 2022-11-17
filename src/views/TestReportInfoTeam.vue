<template>
    <div>
        <Table
            :tableTitle="tableTitle"
            :searchUrl="url"
            :tableType = "2"
            :form="form"
            :scale_title="true"
            :add="false"
            :operation-list="operationList"
            :operation-left="false"
            @operation-click="edit"
            :searchTime="false"
            :back="{}"
        />

    </div>
</template>

<script>
import Table from "../components/Table";

export default {
    name: "TestReportInfoTeam",
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
                    name: '姓名',
                    value: 'patient_name',

                },
                {
                    name: '测评时间',
                    value: 'create_at',

                },
                {
                    name: '量表名称',
                    value: 'name'
                },
                {
                    name: '时长',
                    value: 'use_time'
                },
                // {
                //     name: '得分',
                //     value: 'total_score'
                // },
            ],
            url: 'api/exam/team_info',
            reportUrl: '',
            form:{
                type:'',
            },
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
        if(this.$route.query.type) {
            this.form.type = this.$route.query.type
            this.form.exam_id = this.$route.query.exam_id
        }
        sessionStorage.setItem("detail_", true);
    }
}
</script>

<style scoped>

</style>
