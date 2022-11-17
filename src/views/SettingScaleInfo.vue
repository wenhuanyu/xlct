<template>
    <div class="content">
        <div class="content_top">
            <div></div>
            <el-form class="search-bar">
                <el-button style="color: #000000;" plain @click="backPage" icon="el-icon-arrow-left">返回系统页</el-button>
            </el-form>
        </div>
        <div class="content_body">
            <div v-html="remark" class="row">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name    : "SettingScaleInfo",
        data() {
            return {
                form : {
                   id: 0
                },
                remark: ''
            }
        },
        mounted() {
            this.form.id = this.$route.query.id
            this.onList();
        },
        methods : {
            backPage() {
                this.$router.go(-1);
            },
            onList() {
                this.$axios.post('api/scale/detail', this.$qs.stringify(this.form)).then(res => {
                    let data = res.data.data;
                    this.remark = data.remark
                })
            },
        },
    }
</script>

<style scoped>
    .el-button.is-round {
        width:  150px;
        height: 50px;
    }
    .el-button + .el-button {
        margin-left: 50px;
    }
    .content_body .el-form {
        min-width: 400px;
    }
    .content_body {
        padding: 82px 0;
        overflow: scroll;
    }

    .row {
        width:           80%;
        margin:          0 auto;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
    }
</style>
