<template>
    <div class="content">
        <div class="content_top">
            <a class="report" href="javascript:;"  style="color: #469FE9" @click="beifen">
                <img src="../assets/images/beifen.png" alt="">
                一键备份
            </a>
            <el-form class="search-bar">
                <el-button style="color: #000000;" plain @click="backPage" icon="el-icon-arrow-left">返回系统页</el-button>
            </el-form>
        </div>
        <div class="content_body">
            <div class="row">
                <el-form ref="form" :model="form" label-width="90px" width="300px">
                    <el-form-item label="医院名称">
                        <el-input v-model="form.hospital_name"></el-input>
                    </el-form-item>
                    <el-form-item label="医院副名称">
                        <el-input v-model="form.second_name"></el-input>
                    </el-form-item>
                    <el-form-item class="margin-top box-nowrap">
                        <el-button type="primary" round @click="onSubmit">保存</el-button>
                        <el-button type="warning" round @click="backPage">取消</el-button>
                    </el-form-item>
                </el-form>
                <el-upload
                    class="avatar-uploader border"
                    :show-file-list="false"
                    :action="`${$axios.defaults.baseURL}/api/common/upload_file`"
                    :headers={token}
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="(form || '').logo" :src="(form || '').logo" class="avatar">
                    <img v-else src="../assets/images/morenImg.png">
                    <el-button type="warning" round style="background-color: #FAA05A; border-color: #FAA05A" >上传图标</el-button>
                </el-upload>

            </div>
        </div>
        <el-dialog :visible.sync="qrDialog" :modal="false" width="22vw" top="25vh" :close-on-click-modal="false">
            <div class="dialog-body">
                <div class="dialog-text" style="text-align: center">
                    <img src="../assets/images/tishi.png" style="width: 80px;height: 80px">
                    <h2 style="margin-top: 20px;margin-bottom: 10px;">下载提示</h2>
                    <div style="margin-top: 5px; margin-bottom: 20px" >
                        <h3>备份成功，请稍后在信息中心进行下载</h3>
                    </div>
                    <el-button type="warning" style="background: #7A40F2;border: 1px solid #7A40F2;color: #FFFFFF;box-shadow:none;" round @click="qrDialog = false">知道了
                    </el-button>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
import store from "../store";

export default {
    name: "SettingConfig",
    data() {
        return {
            form: {
                hospital_name: '',
                second_name: '',
                logo: ''
            },
            token: '',
            qrDialog: false,
        }
    },
    mounted() {
        //消息接口
        this.$store.dispatch('GetXiao')
        this.onList();

        this.token = store.state.user.token
    },
    methods: {
        beifen() {
            this.$axios.post('api/sql/tabledatasql', {}).then(res => {
                if(res.data.code == 1) {
                    this.qrDialog = true
                }
            })
        },
        backPage() {
            this.$router.go(-1);
        },
        onList() {
            this.$axios.post('api/setting/config_info', {}).then(res => {
                this.form = res.data.data ||  {};
                this.$store.commit('setHospital', this.form);
            })
        },
        onSubmit() {
            this.$axios.post('api/setting/config', this.form).then(res => {
                this.onList()
            })
        },
        handleAvatarSuccess(res) {
            (this.form || '').logo = res.data;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
    padding: 20px;
}
::v-deep .el-dialog {
    border-radius: 5px;
}
::v-deep {
    .el-button--primary {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }
    .el-button--warning {
        border-color: #39CBE9;
        background-color: #39CBE9;
    }
}
.el-button.is-round {
    width: 150px;
    height: 50px;
}

.el-button + .el-button {
    margin-left: 50px;
}

.content_body .el-form {
    min-width: 400px;
}

.content_body {
    padding: 82px 0 0;
}
.content_top a {
    display: inline-block;
    width: 48px;
    height: 48px;
    margin-right: 15px;
    background: #FFF;
}
.content_top a.report {
    width: 138px;
    line-height: 48px;
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 21px;
        height: 20px;
        margin: 0 5px 0 0;
    }
}
.border {
    width: 240px;
    height: 240px;
    border: 1px dotted #D2D2D2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.border img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
}

.border button {
    height: 40px;
    margin-top: 25px;
    font-size: 16px;
}

.row {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}
</style>
