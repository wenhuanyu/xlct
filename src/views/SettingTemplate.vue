<template>
  <div  class="content">
      <div class="content_top">
          <div></div>
          <el-form class="search-bar">
              <el-button class="pink" plain @click="backPage" icon="el-icon-arrow-left">返回系统页</el-button>
          </el-form>
      </div>
      <div class="content_body">
          <router-link :to="{name:'SettingDoctorSayInfo',query:{type:2}}"><img src="../assets/images/template-icon2.png" alt="">提示或建议
          </router-link>
          <!--      <router-link :to="{name:'SettingDoctorSayInfo',query:{type:7}}"><img src="../assets/images/template-icon7.png" alt="">建议-->
          <!--      </router-link>-->
          <router-link :to="{name:'SettingDoctorSayInfo',query:{type:5}}"><img src="../assets/images/template-icon5.png" alt="">医生建议
          </router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: "SettingTemplate",
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
      backPage() {
          this.$router.go(-1);
      },
  },
}
</script>

<style scoped lang="scss">
.content_body {
  display: flex;
  //align-items: center;
  flex-wrap: wrap;
  overflow-y: auto;
}

.content_body a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 20%;
  height: 390px;
  font-size: 24px;
  color: #7A40F2;
}

.content_body img {
  min-width: 206px;
  height: 206px;
  margin-bottom: 22px;
  cursor: pointer;
}
</style>
