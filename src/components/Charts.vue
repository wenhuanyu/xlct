<template>
  <div>
    <v-chart :options="option"/>
  </div>
</template>

<script>

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'       //绘制不同的图表要引入不同的chart和component
import 'echarts/lib/component/polar'

export default {
  components: {'v-chart': ECharts},
  name: "Charts",
  data() {
    return {
      polar: {
        // 指定图表的配置项和数据
      },
      option: {}
    };
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
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
    
    this.option = {
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
  }
}
</script>

<style scoped>

</style>
