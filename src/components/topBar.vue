<template>
  <div class="top">
    <div class="top_left">
      <img src="../assets/images/list_logo.png" alt="">
      <div>
        <router-link to="/">首页</router-link>
        <b></b>
		<p @click="jump($event)">{{ route.meta.title }}</p>
        <p style="margin-left: 20px;background-color:#F2ECFC;color: #7A40F2;" v-if="$route.meta.subtitle">
          {{ $route.meta.subtitle }}</p>
      </div>
    </div>
    <div class="top_right">
<!--      <router-link to="SystemAnalysis">-->
<!--        <el-button style="margin-right: 20px" type="warning" round v-if="$route.name == 'Assess'" >系统分析</el-button>-->
<!--      </router-link>-->
        <div style="margin-right: 60px;position: relative;">
            <div style="width:10px;height:10px;border-radius:50%;background: #FF8F5F;position: absolute;top: 0;left: 8px;" v-if="xiaoxi == 1"></div>
            <img src="../assets/images/xiaoxi.png" alt="" @click="messageClick"
                 style="width: 24px; height: 28px;margin-top: 6px;cursor: pointer;">
        </div>
      <img src="../assets/images/user_red.png" alt="">
      <div>
        <el-popover
            placement="top"
            width="160"
            v-model="logoutShow">
          <p>确定退出登录？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="logoutShow = false">取消</el-button>
            <el-button type="primary" size="mini" @click="logout">确定</el-button>
          </div>
          <button slot="reference" class="top-button">
            <p class="login_name">{{ $store.state.user.username }}</p>
            <img src="../assets/images/bottom_icon_gray.png" alt="">
          </button>
        </el-popover>
      </div>
      <img src="../assets/images/top_close.png" alt="" @click="close">

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "topBar",
  data() {
    return {
      logoutShow: false,
        // xiaoxi:'',
    };
  },
  computed: {
		route(){
			return this.$route
		},
      ...mapState(['xiaoxi'])
	},

  watch: {
      // "$store.state.xiaoxi":function(nv,ov) {
      //       if (nv === ov) {
      //            return
      //       }
      //       this.xiaoxi = nv
      //     console.log('this.xiaoxi',this.xiaoxi)
      //   },
  },
    mounted() {
    },


  methods: {
      messageClick() {
          this.$router.push('/messagePage')
      },
      jump: function (event) {
          var e = event.currentTarget;
          if (e.innerHTML === '系统设置') {
              this.$router.push('/SystemSetting')
          }
          if (e.innerHTML === '患者管理') {
              this.$router.push('/PatientManagement')
          }
          if (e.innerHTML === '评估测试') {
              this.$router.push('/Assess')
          }
          if (e.innerHTML === '训练治疗') {
              this.$router.push('/Emotion')
          }
          if (e.innerHTML === '报告中心') {
              this.$router.push('/ReportCenter')
          }
          if (e.innerHTML === '终端监控') {
              this.$router.push('/TermMonitor')
          }
      },
    close() {
      this.$confirm('确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUserInfo', {data: '', status: false});
        this.$router.push('/Login');
        this.$message({
          type: 'success',
          message: '成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    logout() {
      this.$store.commit('setUserInfo', {data: '', status: false});
      this.$router.push('/Login');
    }
  },

}
</script>

<style scoped>
::v-deep .el-button--primary {
    background-color: #7A40F2;
    border-color: #7A40F2;
}
::v-deep .el-button--text {
    color: #7A40F2;
}
.top {
  position: relative;
  height: 120px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 35px 0 25px;
}

.top_left, .top_right {
  display: flex;
  align-items: center;
}

.top_left img {
  /*height: 100px;*/
  margin-right: 125px;
}

.top_left div {
  display: flex;
  align-items: center;
}

.top_left div a {
  font-size: 20px;
  color: #7A40F2;
  font-weight: bold;
}

.top_left div b {
  display: block;
  height: 42px;
  border-left: 1px solid #b5b5b5;
  margin: 0 30px;
}

.top_left div p {
  background: #7A40F2;
  height: 60px;
  line-height: 60px;
  width: 175px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  border-radius: 4px;
  cursor: pointer;
}

.top_left div p .other {
  background: #DEF5DD;
  color: #7A40F2;
}

.top_right div {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #555;
  margin: 0 15px;
}

.top_right div img {
  margin-left: 5px;
}

.top_group {
  display: none;
  position: absolute;
  top: 85%;
  right: 25px;
  width: 220px;
  z-index: 100;
}

.login_name {
  display: inline-block;
  font-size: 18px;
}

.top-button {
  border: none;
  background-color: transparent;
}

.top_group a {
  display: block;
  width: 100%;
  text-align: center;
  height: 60px;
  background: #fff;
  border-radius: 50px;
  line-height: 60px;
  font-size: 18px;
  color: #333;
  box-shadow: 0px 3px 18px 0px rgba(0, 0, 0, 0.18);
}
</style>
