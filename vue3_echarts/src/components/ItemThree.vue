<template>
    <h2>库存统计</h2>
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
const all_data = reactive({
    data: []
})

onMounted(() => {
    getData().then(() => {
        const myChart = $echarts.init(chart.value)
        const options = {
            legend: {
                top: 'bottom'
            },
            tooltip: {},
            series: {
                type: 'pie',
                data: all_data.data,
                radius: [10, 100],
                center: ['50%', '45%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 10
                }
            }
        };
        myChart.setOption(options)
    })
})

async function getData() {
    const { data: res } = await $axios.get('three/data')
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