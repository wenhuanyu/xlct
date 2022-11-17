<template>
    <div>
        <Table :tableTitle="tableTitle" :form="form" :search-url="url" :pageFooter="false" :searchTime="false" :searchBtn="false" :setting="false"
               >
        </Table>
    </div>
</template>

<script>
    import Table from "../components/Table";
    export default {
        name : "AddSystemAnalysis",
        components: {
            Table
        },

        data() {
            return {
                tableTitle: [
                    {
                        name: '编号',
                        value: 'id',
                        width: 180
                    },
                    {
                        name: '患者',
                        value: 'patient_name',
                        width: 200
                    },
                    {
                        name: '测评名称',
                        value: 'name',
                        align:'left'
                    }
                ],
                form:{
                    patient_id:'',
                    test_paper_id:''
                },
                url: 'api/statistics/exam_lst',
                deleteUrl: 'api/exam/delete',
                addHref: 'AddAssess',
                InfoHref: 'InfoAssess',
                tableData: [],
                qrDialog: false,
                currentRow: ''
            }
        },
        mounted() {
            this.form = this.$route.query
            console.log(this.form)
        },
        methods : {
            name() {

            }
        },
    }
</script>

<style scoped>

</style>
