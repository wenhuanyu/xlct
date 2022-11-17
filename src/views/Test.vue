<template>
  <div class="hello">
    <div ref="myChart" :style="{width: '800px', height: '800px'}"></div>
  </div>
</template>

<script>

export default {
  name: 'Test',
  components: {},
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawLine();
    this.$vLoading.show();
    setInterval(()=>{this.$vLoading.hide()},3000)
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart)
      // 绘制图表
      var base = +new Date(1988, 9, 3);
      var oneDay = 24 * 3600 * 1000;

      var data = [[base, Math.random() * 300]];

      for (var i = 1; i < 20000; i++) {
        var now = new Date(base += oneDay);
        data.push([
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])
        ]);
      }

      let option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: '大数据量面积图',
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 20
        }, {
          start: 0,
          end: 20
        }],
        series: [
          {
            name: '模拟数据',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: data
          }
        ]
      };
      myChart.setOption(option)

    }
  }
}
</script>
