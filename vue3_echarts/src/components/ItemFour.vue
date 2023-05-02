<template>
    <h2>产品类别</h2>
    <div ref="chart" class="chart"></div>
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
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: 'true'
            },
            xAxis: {
                type: 'category',
                data: all_data.data.fourChart.day,
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            legend: {

            },
            tooltip: {
                trigger: 'axis',
                axisPoint: {
                    type: 'shadow'
                }
            },
            series: [
                {
                    name: '服饰',
                    type: 'bar',
                    data: all_data.data.fourChart.num.Clothes,
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series'
                    }
                },
                {
                    name: '数码',
                    type: 'bar',
                    data: all_data.data.fourChart.num.digit,
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series'
                    }
                },
                {
                    name: '家电',
                    type: 'bar',
                    data: all_data.data.fourChart.num.Electrical,
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series'
                    }
                },
                {
                    name: '家居',
                    type: 'bar',
                    data: all_data.data.fourChart.num.gear,
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series'
                    }
                },
                {
                    name: '日化',
                    type: 'bar',
                    data: all_data.data.fourChart.num.Chemicals,
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series'
                    }
                },
            ]
        }
        myChart.setOption(options)
    })
})

async function getData() {
    const { data: res } = await $axios.get('four/data')
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