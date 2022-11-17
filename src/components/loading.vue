<template>
  <div id="loading" v-if="isShow">
    <div class="balls">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loading',
  props: {
    isShow: Boolean,
    text: {
      type: String,
      default: '正在加载中...'
    }
  }
};
</script>
<style lang="scss" scoped>

#loading {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, .8);
  width: 100%;
  height: 100%;
}

.balls {
  height: 100%;
  margin: auto;
  width: 4em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.balls div {
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: #7A40F2;
}

.balls div:nth-of-type(1) {
  transform: translateX(-100%);
  animation: left-swing 0.5s ease-in alternate infinite;
}

.balls div:nth-of-type(3) {
  transform: translateX(-95%);
  animation: right-swing 0.5s ease-out alternate infinite;
}

@keyframes left-swing {
  50%,
  100% {
    transform: translateX(95%);
  }
}

@keyframes right-swing {
  50% {
    transform: translateX(-95%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
