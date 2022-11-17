<template>
  <div class="content">
    <div class="content_top">
      <div></div>
      <el-form class="search-bar">
        <el-button style="color: #000000;" plain @click="backPage" icon="el-icon-arrow-left">返回系统页</el-button>
      </el-form>
    </div>
    <div class="content_body">
      <div class="row">
        <el-form ref="form" :rules="rules" :model="form" label-width="90px" width="300px">
          <el-form-item label="工号" prop="work_num">
            <el-input v-model="form.work_num"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="nickname">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" :prop="id ? '': 'password'">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio :label=1>男</el-radio>
              <el-radio :label=2>女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话" prop="contact_phone">
            <el-input v-model="form.contact_phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role_id">
            <el-select v-model="form.role_id" placeholder="角色">
              <el-option v-for="item in role_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="margin-top-80 box-nowrap">
            <el-button type="primary" round @click="onSubmit('form')">保存</el-button>
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
          <img v-if="form.headimg" :src="form.headimg" class="avatar">
          <img v-else src="../assets/images/signature.png">
          <el-button type="warning" round style="background-color: #FAA05A; border-color: #FAA05A">上传签名</el-button>
        </el-upload>

      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "SettingUserDetail",
  data() {
    return {
      form: {
        work_num: '',
        nickname: '',
        username: '',
        password: '',
        gender: 1,
        contact_phone: '',
        email: '',
        role_id: '',
        headimg: ''
      },
      rules: {
        username: [
          {required: true, message: '请填写账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请填写密码', trigger: 'blur'}
        ],
        work_num: [
          {required: true, message: '请填写工号', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请填写姓名', trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        role_id: [
          {required: true, message: '请选择角色', trigger: 'blur'}
        ],
        contact_phone: [
          {message: '请填写电话', trigger: 'blur'}
        ],
        email: [
          {message: '请填写邮箱', trigger: 'blur'}
        ],

      },
      submitUrl: 'api/setting/user_add',
      id: 0,
      role_list: [],
      token: ''
    }
  },
  mounted() {
    this.onRole()
    this.id = this.$route.query.id;
    if (this.$route.query.id) {
      this.submitUrl = 'api/setting/user_edit'
      this.onDetail();
    }
      this.token = store.state.user.token
      sessionStorage.setItem("detail", true);
  },
  methods: {
    backPage() {
      this.$router.go(-1);
    },
    async onRole() {
      await this.$axios.post('api/setting/role_lst', this.$qs.stringify({id: this.id})).then(res => {
        if (res.data.code == 1) {
          this.role_list = res.data.data
        }
      })
    },
    async onDetail() {
      await this.$axios.post('api/setting/user_info', this.$qs.stringify({id: this.id})).then(res => {
        console.log(res)
        if (res.data.code == 1) {
          this.form.id = this.id
          let data = res.data.data;
          for (const key in this.form) {
            this.form[key] = data[key];
          }
          console.log(this.form)

        }
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form, this.$qs.stringify(this.form))
          this.$axios.post(this.submitUrl, this.$qs.stringify(this.form)).then(res => {
            if (res.data.code == 1) {
              this.backPage()
            }
          })
        } else {
          console.log(valid)
          return false;
        }
      });

    },
    handleAvatarSuccess(res) {
      this.form.headimg = res.data;
      console.log(this.form);
    },
    beforeAvatarUpload(file) {
      console.log(123)
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
::v-deep {
    .el-button--primary {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }
    .el-button--warning {
        border-color: #39CBE9;
        background-color: #39CBE9;
    }
    .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before {
        color: #7A40F2;
    }
    .el-radio__input.is-checked + .el-radio__label {
        color: #7A40F2;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }
    .el-form-item__error {
        color: #7A40F2;
    }
    .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus {
        border-color: #7A40F2;
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
