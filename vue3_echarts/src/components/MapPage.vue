<template>
    <div class="map" ref="chart">

    </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
/*
    通过getCurrentInstance方法获取当前实例
    再根据当前实例找到全局实例对象appContext，进而拿到全局实例的config.globalProperties。
*/
const currentInstance = getCurrentInstance()
const { $axios, $echarts } = currentInstance.appContext.config.globalProperties

onMounted(() => {
    getChinaMap().then(() => {
        const myChart = $echarts.init(chart.value)
        // 注册当前使用的地图名
        $echarts.registerMap('chinaMap', all_data.data)

        const options = {
            title: {
                text: '城市销量',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: 20,
                    textShadowBlur: 10,
                    textShadowColor: '#33ffff'
                }
            },
            geo: {
                type: 'map',
                map: 'chinaMap',
                itemStyle: {
                    areaColor: '#0099ff',
                    borderColor: '#00ffff',
                    shadowColor: 'rgba(230,130,70,0.5)',
                    shadowBlur: 30,
                    emphasis: {
                        focus: 'self'
                    }
                }
            },
            tooltip: {
                trigger: 'item' // 触发类型。可选：'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
            },
            visualMap: {
                type: 'continuous', // 连续型视觉映射组件。visualMapContinuous中，可以通过 visualMap.calculable 来显示或隐藏手柄（手柄能拖拽改变值域）。
                min: 100,           // 指定 visualMapContinuous 组件的允许的最小值。
                max: 5000,          // 指定 visualMapContinuous 组件的允许的最大值。
                calculable: true,   // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
                inRange: {          // 定义 在选中范围中 的视觉元素。
                    color: ['#50a3ba', '#eac736', '#d94e5d'],
                },
                textStyle: {
                    color: '#fff'
                }
            },
            series: {
                type: 'scatter',
                coordinateSystem: 'geo', // 该系列使用的坐标系，可选：'cartesian2d','polar','geo','calendar'
                data: [
                    { name: '北京', value: [116.46, 39.92, 4367] },
                    { name: '上海', value: [121.48, 31.22, 8675] },
                    { name: '深圳', value: [114.07, 22.62, 2461] },
                    { name: '广西', value: [113.23, 23.16, 187] },
                    { name: '西安', value: [108.45, 34, 3421] },
                ],
                itemStyle: {
                    color: 'red'
                }
            }
        }

        myChart.setOption(options)
    })
})

// 获取echarts节点
const chart = ref()

// 保存地图全部数据
const all_data = reactive({
    data: []
})

// 获取地图全部数据
async function getChinaMap() {
    const { data: res } = await $axios.get('map/data')
    all_data.data = res
    console.log(all_data.data)

}
</script>

<style scoped>
.map {
    width: 100%;
    height: 100%;
}
</style>