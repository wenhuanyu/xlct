<template>
    <div>
        <Table ref="list" :tableCheckbox="false"
               :info="info" :search-time="false"
               :tableTitle="tableTitle"
               :searchBtn="false"
               :searchUrl="url" :form="form" :back="back" :refresh="false" :InfoHref="InfoHref" >
        </Table>

    </div>
</template>

<script>
    import Table from '../components/Table';

    export default {
        name       : "SettingScale",
        components : {
            Table
        },
        data() {
            return {
                tableTitle : [
                    {
                        name  : '量表名称',
                        value : 'name',

                    },
                ],
                form       : {},
                back:{
                    text:'返回系统页'
                },
                info:{
                    text: '说明',
                    jumpData: ['id']
                },
                url        : 'api/scale/lst',
                tableData  : [],
                InfoHref: 'SettingScaleInfo',
            };
        },
        computed   : {},
        watch      : {},
        methods    : {

        },
    }
</script>

<style scoped>
    .el-form{
        width: 500px;
    }

</style>
