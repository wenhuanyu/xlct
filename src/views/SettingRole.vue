<template>
    <div>
        <Table ref="list" :add="true"  :searchTime="false" @add="add" :edit="true" @edit="edit" :tableTitle="tableTitle" :searchBtn="false" :form="form"
               :back="back" :deleteUrl="deleteUrl" :searchUrl="url">
        </Table>
        <el-dialog class="new-dialog" :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="addForm" :rules="rules">
                <el-form-item label="角色名称" label-width="80px" prop="name">
                    <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色权限" label-width="80px" prop="authList">
                    <div v-for="item in authList" :key="item.id">
                        <div class="row">
                            <el-checkbox class="select-all" :indeterminate="item.isIndeterminate" v-model="item.checked"
                                         @change="handleCheckAllChange(item)">{{ item.name }}
                            </el-checkbox>
                            <el-checkbox-group v-model="item.checkedCities" @change="handleCheckedCitiesChange(item)"
                            >
                                <el-checkbox v-for="child in item.child" :label="child.id" :key="child.id">{{ child.name
                                    }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>

                    </div>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" round>取 消</el-button>
                <el-button type="primary" @click="onAdd" round style="border-color: #7A40F2; background-color: #7A40F2;">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Table from '../components/Table';

    export default {
        name       : "SettingRole",
        components : {
            Table
        },
        data() {
            return {
                tableTitle        : [
                    {
                        name  : '角色名称',
                        value : 'name',
                        width : 200
                    },
                    {
                        name  : '角色权限',
                        value : 'auth_text',
                        align : 'left'
                    },
                ],
                rules: {
                    name: [
                        {required: true, message: '请输入角色名称'}
                    ],
                    authList: [
                        {required: true, message: '请选择角色权限'}
                    ],
                },
                form              : {},
                addForm           : {
                    name : ''
                },
                back              : {
                    text : '返回系统页'
                },
                url               : 'api/setting/role_lst',
                deleteUrl         : 'api/setting/role_delete',
                addHref           : 'SettingWardDetail',
                addApi            : 'api/setting/role_add',
                editApi           : 'api/setting/role_add',
                tableData         : [],
                dialogFormVisible : false,
                authList          : [],
                checkedAuth       : [],
                title:''

            };
        },
        computed   : {},
        watch      : {},
        mounted() {
            this.onAuthList()
        },
        methods    : {
            add() {
                this.authList.map(item => {
                    item.checked = false
                    item.isIndeterminate = false
                    item.checkedCities = []
                })
                this.title='新增角色'
                this.dialogFormVisible = true
                this.addApi = 'api/setting/role_add'
                this.addForm = {
                    name : '',
                    auth : [],
                }
            },
            edit(val) {
                this.title='编辑角色'
                this.addApi = 'api/setting/role_edit'
                let auth = val.auth.map(item=>{
                    return +item
                })
                this.addForm = {
                    id   : val.id,
                    name : val.name,
                    auth : auth,
                }

                this.authList = this.authList.map((item)=>{
                    console.log('item,',item)
                    let childIds = item.child.map((childItem)=>{
                        return +childItem.id
                    })
                    let select = [];
                     childIds.map(roleId=>{
                        if(auth.indexOf(roleId)  != -1){
                            select.push(roleId)
                        }
                    });
                    item.isIndeterminate = select > 0 && select < childIds;
                    if (select.length === childIds.length) {
                        item.checked = select.length === childIds.length
                    } else {
                        item.checked = select.length
                    }
                    item.checkedCities =  select
                    return item
                })
                this.$forceUpdate();
                this.dialogFormVisible = true

            },
            unique(arr) {
                const res = new Map();
                return arr.filter((arr) => !res.has(arr) && res.set(arr, 1))
            },
            async onAdd() {
                let auth = [];
                this.authList.map(item => {
                    auth = auth.concat(item.checkedCities)
                    return item;
                });
                let checkedParent = this.authList.filter(item => item.checkedCities.length!==0).map(item => item.id)
                auth = [...auth, ...checkedParent]
                this.addForm.auth = this.unique(auth).join(',');
                await this.$axios.post(this.addApi,this.$qs.stringify( this.addForm)).then(res => {
                    if (res.data.code == 1) {
                        this.$refs.list.onSubmit()
                        this.dialogFormVisible = false
                        //获取权限列表
                        this.$store.dispatch('GetAuth')
                    }
                })
            },
            async onAuthList() {
                await this.$axios.post('api/setting/auth', this.$qs.stringify(this.addForm)).then(res => {
                    console.log('res.data.data',res.data.data)
                    this.authList = res.data.data;
                    console.log('this.authList',this.authList)
                    this.authList = this.authList.map(item => {
                        item.checked = false
                        item.isIndeterminate = false
                        item.checkedCities = []
                        return item;
                    })
                    console.log('this.authList111111',this.authList)

                    this.$forceUpdate()
                })
            },
            handleCheckAllChange(val) {
                 console.log('val',val)
                val.checkedCities = val.checked ? val.child.map(item => {
                    return item.id
                }) : [];
                val.isIndeterminate = false;
                this.$forceUpdate()
            },
            handleCheckedCitiesChange(value) {
                console.log('value',value)
                let checkedCount = value.checkedCities.length;
                value.checked = checkedCount === value.child.length;
                value.isIndeterminate = checkedCount > 0 && checkedCount < value.child.length;
                this.$forceUpdate()
            }
        },
    }
</script>

<style lang="scss" scoped>
    ::v-deep {
        .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #7A40F2;
            border-color: #7A40F2;
        }
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: #7A40F2;
            border-color: #7A40F2;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #7A40F2;
        }
    }
    .el-form {
        width: 500px;
    }
    .row {
        display: flex;
    }
    ::v-deep .select-all {
        width: 30%;
    }
    ::v-deep .el-checkbox-group {
        width: 70%;
    }
</style>
