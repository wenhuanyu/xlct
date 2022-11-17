<template>
    <div class="content">
        <div class="content_top">
            <div></div>
            <div>
                <el-button class="pink" plain @click="$router.go(-1)" icon="el-icon-arrow-left">
                    返回主页面
                </el-button>
            </div>
        </div>
        <div class="content_body">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="请选择患者">
                    <el-select v-model="form.user" @change="onScale()" placeholder="请选择患者">
                        <el-option  v-for="item in patientList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请选择量表">
                    <el-select v-model="form.scale" placeholder="请选择量表">
                        <el-option v-for="item in scaleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" round @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name    : "SystemAnalysis",
        data() {
            return {
                form        : {
                    user  : '',
                    scale : ''
                },
                scaleList   : [],
                patientList : [],
            }
        },
        mounted() {
            this.onPatient()
        },
        methods : {
            onSubmit() {
                // if(this.form.user == ''){
                //     this.$message.warning('请选择患者');
                //     return;
                // }
                // if(this.form.scale == ''){
                //     this.$message.warning('请选择量表');
                //     return;
                // }
                this.$router.push({
                    name: 'AddSystemAnalysis',
                    query: {patient_id:this.form.user,test_paper_id:this.form.scale}
                })
            },
            async onScale() {
                await this.$axios.post('api/statistics/scale_lst', this.$qs.stringify({patient_id: this.form.user})).then(res => {
                    if (res.data.code == 1) {
                        this.scaleList = res.data.data
                    }
                })
            },
            async onPatient() {
                await this.$axios.post('api/statistics/patient_lst').then(res => {
                    if (res.data.code == 1) {
                        this.patientList = res.data.data
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .content_body {
        position:         relative;
        overflow:         hidden;
        box-sizing:       border-box;
        flex:             1;
        width:            100%;
        max-width:        100%;
        background-color: #FFFFFF;
        font-size:        14px;
        color:            #606266;
        padding:          25px;
        overflow-y:       auto;
    }
    ::v-deep .el-form {
        width: 400px;
    }
    ::v-deep .content_body .el-button {
        height:      40px;
        line-height: 40px;
        padding:     0;
    }
</style>
