<template>
    <div>
        <Table ref="list"  :searchTime="false" :add="true" @add="add()" :tableTitle="tableTitle" :searchBtn="false" :form="form" :back="back"  :deleteUrl="deleteUrl" :searchUrl="url">
        </Table>
        <el-dialog class="new-dialog" title="新增来源" :visible.sync="dialogFormVisible">
            <el-form :model="addForm">
                <el-form-item label="选择部门" label-width="80px">
                    <el-radio-group v-model="addForm.department_id">
                        <el-radio
                            v-for="(item) in districtList"
                            :key="item.id"
                            :value ="item.id"
                            :label = "item.id"
                        >
                            {{item.name}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="病区名称" label-width="80px"  >
                    <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入病房名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" round>取 消</el-button>
                <el-button type="primary" @click="onAdd" round style="background-color: #7A40F2; border-color: #7A40F2;">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Table from '../components/Table';

    export default {
        name       : "SettingWard",
        components : {
            Table
        },
        data() {
            return {
                tableTitle : [
                    {
                        name  : '编号',
                        value : 'num',
                    },
                    {
                        name  : '部门',
                        value : 'department_name',
                    },
                    {
                        name  : '病区名称',
                        value : 'name',
                    },
                    {
                        name  : '添加时间',
                        value : 'create_at',
                        width : 300
                    },
                ],
                form       : {

                },
                addForm: {
                    name: '',
                    department_id:'',
                },
                back:{
                    text:'返回系统页'
                },
                url        : 'api/district/index',
                deleteUrl  : 'api/district/delete',
                tableData  : [],
                dialogFormVisible: false,
                districtList:[],
            };
        },
        computed   : {},
        watch      : {},
        async mounted() {
            await this.getWard();
        },
        methods    : {
            add() {
                this.dialogFormVisible = true
            },
            async onAdd(){
                if(this.addForm.department_id == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择部门'
                    });
                    return;
                }
                if(this.addForm.name == '') {
                    this.$message({
                        type: 'info',
                        message: '请输入病区名称'
                    });
                    return;
                }

                await this.$axios.post('api/district/add',this.$qs.stringify( this.addForm)).then(res => {
                    if(res.data.code == 1){
                        this.$refs.list.onSubmit()
                        this.addForm.name = '';
                        this.addForm.department_id = '';
                        this.dialogFormVisible = false
                    }
                })
            },
            async getWard() {
                await this.$axios.post('api/district/department').then(res => {
                    this.districtList = res.data.data
                })
            }
        },
    }
</script>

<style lang="scss">
    //.el-form{
    //    width: 400px;
    //}
    .el-dialog {
        width: 30%;
    }
</style>
