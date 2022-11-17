<template>
    <div>
        <Table
            :tableTitle="tableTitle"
            :deleteUrl="'api/exam/table_del'"
            :searchUrl="url"
            :tableType = "1"
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
    name: "TestReportInfo",
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
            url: 'api/exam/table_lst',
            reportUrl: '',
            form:{
                type:'',
                id:'',
            },
            operationList: [{img: 'look.png', method: '1'}]
        };
    },
    computed: {},
    watch: {},
    methods: {
        edit(val){
            this.$router.push({
                name: 'AssessDetail',
                query: {
                    'liangbiao_id': val.exam_id,
                    'id': val.id,
                    'patient_id':this.$route.query.patient_id
                }
            })
        },
        listInterface() {
            this.$axios.post('api/exam/exam_list', this.$qs.stringify({
                patient_id: this.$route.query.patient_id,
            })).then(res => {
                this.form.id = res.data.data
            })
        },
        add() {
        },
        removeBtn(ids) {
            // console.log(ids)
        }
    },
    mounted() {
        this.listInterface()
        if(this.$route.query.type) {
            this.form.type = this.$route.query.type
        }
        sessionStorage.setItem("detail_", true);
    }
}
</script>

<style scoped>

</style>
