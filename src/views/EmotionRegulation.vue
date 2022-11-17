// 情绪调节报告
<template>
    <div>
        <Table :tableTitle="tableTitle"
               :pageFooter="true"
               :InfoHref="InfoHref"
               :deleteUrl="'api/emotion/delete'"
               :searchUrl="url"
               :statis-href="`AssessStatistics`"
               :add="false"
               :report="true"
               :reportHref="reportUrl"
               :form="form"
               :tableType = "3"/>

    </div>
</template>

<script>
import Table from "../components/Table";

export default {
    name: "EmotionRegulation",
    components: {Table},
    data() {
        return {
            tableTitle: [
                {
                    name: '编号',
                    value: 'id'
                },
                {
                    name: '测试时间',
                    value: 'create_time',

                },
                {
                    name: '训练名称',
                    value: 'program_name'
                }],
            url: 'api/emotion/lst',
            InfoHref: 'EmotionDetail',
            reportUrl:'EmotionDetail',
            form:{
                type:''
            }
        };
    },
    computed: {},
    watch: {},
    methods: {
        add() {
        },
        removeBtn(ids) {
            console.log(ids)
        }
    },
    mounted() {
        if(this.$route.query.type) {
            this.form.type = this.$route.query.type
        }
        sessionStorage.setItem("detail_", true);
    }
}
</script>

<style scoped>

</style>
