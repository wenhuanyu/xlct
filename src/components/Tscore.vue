<template>
    <div style="width: 100%;height: 100%" :ref="id" :id="id" :key="id">
    </div>
</template>

<script>
export default {
    name: "Tscore",
    props: {
        id: String,
        table: {
            type: Number,
            default: 2
        },
        tick:{
            type:Boolean,
            default:false,
        },
        score: Number,
        first: {
            type: Boolean,
            default: false
        },
        last: {
            type: Boolean,
            default: false
        },
    },
    mounted() {
        this.$nextTick(() => {
            let score = this.$echarts.init(this.$refs[this.id])
            let option = {
                grid: {
                    // height:'100%'
                    left: -1,
                    right: -1,
                    top: 0,
                    bottom: 0
                },

                tooltip: {
                    trigger: 'axis',
                    formatter: '{b}'
                },

                xAxis: {
                    max: 110,
                    min: 0,
                    interval: 10,
                    axisTick: {
                        inside: true,
                        alignWithLabel: true,
                        lineStyle: {
                            color: '#CDCDCD'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#CDCDCD'
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                },
                yAxis: {
                    max: 50,
                    min: 0,
                    interval: 10,
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                },
                series: [{
                    data: [
                        {
                            value: [this.score, 25],
                            itemStyle: {
                                color: '#F5625C',
                                borderColor: '#FCCFCE',
                                borderWidth: 5
                            }
                        }
                    ],
                    type: 'scatter'
                }]
            };

            if (this.table === 2) {
            } else {
                option.grid = {
                    ...option.grid,
                    left: 30,
                    right: 30
                }
                if (this.first) {
                    option.xAxis = {
                        ...option.xAxis,
                        max: 10,
                        min: 1,
                        interval: 1,
                        axisLabel: {
                            show: true,
                            margin: -30
                        },
                    }
                } else if (this.last) {
                    option.xAxis = {
                        ...option.xAxis,
                        max: 10,
                        min: 1,
                        interval: 1,
                        axisLabel: {
                            show: true,
                            formatter:function (value,index){
                                switch (value){
                                    case 1:{
                                        return '很小'
                                        break
                                    }
                                    case 3:{
                                        return '小'
                                        break
                                    }
                                    case 5:{
                                        return '中'
                                        break
                                    }
                                    case 7:{
                                        return '大'
                                        break
                                    }
                                    case 9:{
                                        return '极大'
                                        break
                                    }
                                }
                            },
                            color:'#333',
                            margin: -30
                        },
                        axisTick:{
                            show:false
                        }
                    }
                } else {
                    option.xAxis = {
                        ...option.xAxis,
                        max: 10,
                        min: 1,
                        interval: 1,
                        axisTick: {
                            ...option.xAxis.axisTick,
                            show:this.tick
                        }
                    }
                }
            }
            score.setOption(option)

        })
    }
}
</script>

<style scoped>
</style>
