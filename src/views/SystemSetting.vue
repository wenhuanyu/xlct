<template>
  <div class="content_body">
    <router-link v-if="check('配置参数')" to="/SettingConfig"><img src="../assets/images/peizhicanshu.png" alt=""></router-link>
    <router-link v-if="check('系统用户')" to="/SettingUser"><img src="../assets/images/xitongyonghu.png" alt=""></router-link>
    <router-link v-if="check('患者来源')" to="/SettingWard"><img src="../assets/images/huanzhelaiyuan.png" alt=""></router-link>
    <router-link v-if="check('角色设置')" to="/SettingRole"><img src="../assets/images/jueseshezhi.png" alt=""></router-link>
    <router-link v-if="check('模块管理')" to="/SettingTemplate"><img src="../assets/images/yishengjianyi.png" alt=""></router-link>
    <router-link v-if="check('量表帮助')" to="/SettingScale"><img src="../assets/images/liangbiaobangzhu.png" alt=""></router-link>
    <router-link v-if="check('系统说明')" to="/SettingExplain"><img src="../assets/images/xitongshuoming.png" alt=""></router-link>
    <router-link v-if="check('测评方案')" to="/SettingPlan"><img src="../assets/images/fanganshezhi.png" alt=""></router-link>
  </div>
</template>

<script>
export default {
  name: "SystemSetting",
  data() {
    return {};
  },
  computed: {},
  watch: {},
    mounted() {
        //获取权限列表
        this.$store.dispatch('GetAuth')
        //消息接口
        this.$store.dispatch('GetXiao')
    },
  methods: {
      //检测按钮权限
      check(_name) {
          let show = false
          this.$store.state.auth.map(item => {
              if (item.name === this.$store.state.cmenu) {
                  let child = item.child
                  child.map(item2 => {
                      if (_name === item2.name) {
                          show = true
                      }
                  })
              }
          })
          return show
      },
  },
}
</script>

<style scoped>
.content_body {
  display: flex;
  /*justify-content: center;*/
  /*align-items: center;*/
  flex-wrap: wrap;
  overflow-y: auto;
}

.content_body a {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 25%;
  height: 388px;
  min-width: 350px;
}

.content_body img {
  min-width: 340px;
  height: 320px;
  cursor: pointer;
}
</style>
