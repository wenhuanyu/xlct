<template>
  <div class="terminal-bg">
    <div class="sheet">
      <h3>生理参数检测报告</h3>
      <div class="charts-wrap">
        <div ref="points"></div>
        <div ref="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TerminalLulls",
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
}
</script>

<style scoped lang="scss">
.terminal-bg {
  width: 100vw;
  height: 100vh;
  background-image: url(../../assets/images/terminal-bg.png);
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding: 77px 161px;
}

.sheet {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1702px;
  height: 840px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.69) 0%, #FFFFFF 100%);
  padding: 0;

  > h3 {
    font-size: 30px;
    font-weight: bold;
    color: #333333;
    padding: 0 50px;
    margin: 30px 0;
  }

}

.charts-wrap {
  padding: 0 50px 30px;
}

</style>
