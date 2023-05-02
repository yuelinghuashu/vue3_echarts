<template>
    <h2>产品月销</h2>
    <div class="chart" ref="chart"></div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
/*
    通过getCurrentInstance方法获取当前实例
    再根据当前实例找到全局实例对象appContext，进而拿到全局实例的config.globalProperties。
*/
const currentInstance = getCurrentInstance()
const { $axios, $echarts } = currentInstance.appContext.config.globalProperties

const chart = ref()
// 保存图表数据
const all_data = reactive({
    data: []
})

onMounted(() => {
    getData().then(() => {
        const myChart = $echarts.init(chart.value)
        const options = {
            color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,  // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
                    data: all_data.data.day,
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '服饰',
                    type: 'line',
                    stack: 'Total',
                    smooth: true, // 是否平滑曲线显示。
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
                    areaStyle: {
                        opacity: 0.8,
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(128, 255, 165)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(1, 191, 236)'
                            }
                        ])
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: all_data.data.num.Clothes
                },
                {
                    name: '数码',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(0, 221, 255)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(77, 119, 255)'
                            }
                        ])
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: all_data.data.num.digit
                },
                {
                    name: '家电',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(55, 162, 255)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(116, 21, 219)'
                            }
                        ])
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: all_data.data.num.Electrical
                },
                {
                    name: '家居',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(255, 0, 135)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(135, 0, 157)'
                            }
                        ])
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: all_data.data.num.gear
                },
                {
                    name: '日化',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    label: {
                        show: true,
                        position: 'top'
                    },
                    areaStyle: {
                        opacity: 0.8,
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(255, 191, 0)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(224, 62, 76)'
                            }
                        ])
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: all_data.data.num.Chemicals
                }
            ]
        };
        myChart.setOption(options)
    })
})

// 获取图表数据
async function getData() {
    const { data: res } = await $axios.get('two/data')
    all_data.data = res
    console.log(all_data.data)
}

</script>

<style scoped>
h2 {
    color: #fff;
    text-align: center;
    height: .6rem;
    line-height: .6rem;
    font-size: 0.25rem;
}

.chart {
    height: 4.5rem
}
</style>