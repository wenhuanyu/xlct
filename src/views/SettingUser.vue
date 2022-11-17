<template>
    <div>
        <Table :tableTitle="tableTitle" :searchBtn="false" :form="form" :back="back" :pageFooter="true"  :searchTime="false" :addHref="addHref" :detailHref="detailHref" :deleteUrl="deleteUrl" :searchUrl="url">
        </Table>
    </div>
</template>

<script>
    import Table from '../components/Table';

    export default {
        name       : "SettingUser",
        components : {
            Table
        },
        data() {
            return {
                tableTitle : [
                    {
                        name  : '编号',
                        value : 'num',
                        width : 100
                    },
                    {
                        name  : '姓名',
                        value : 'nickname',
                        width : 130
                    },
                    {
                        name  : '性别',
                        value : 'gender',
                        width : 160
                    },
                    {
                        name  : '电话',
                        value : 'contact_phone',
                        width : 180
                    },
                    {
                        name  : '邮箱',
                        value : 'email'
                    },
                    {
                        name  : '角色',
                        value : 'role_text.name',
                        width : 100
                    }
                ],
                form       : {
                    page  : 1,
                    limit : 10,
                },
                back:{
                    text:'返回系统页'
                },
                url        : 'api/setting/user_lst',
                deleteUrl  : 'api/setting/user_delete',
                addHref    : 'SettingUserDetail',
                detailHref : 'SettingUserDetail',
                tableData  : [],
            };
        },
        computed   : {},
        watch      : {},
        methods    : {

        },
    }
</script>

<style scoped>

</style>
