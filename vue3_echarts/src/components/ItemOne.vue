<template>
    <h2>销售总量</h2>
    <div ref="oneChart" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'

// 获取echart节点
const oneChart = ref()

// 保存图表的所有数据
const all_data = reactive({
    data: []
})

// y轴的数据
const y_data = reactive({
    data: []
})

// 系列的数据
const series_data = reactive({
    data: []
})


onMounted(() => {
    // 调用请求
    getData().then(() => {
        setData()

        const myChart = $echarts.init(oneChart.value)
        const options = {
            grid: {          // 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。可以在网格上绘制折线图，柱状图，散点图（气泡图）
                top: '3%',   // grid 组件离容器左侧的距离。
                left: '1%',
                right: '6%',
                bottom: '3%',
                /*
                    grid 区域是否包含坐标轴的刻度标签。
                        containLabel 为 false 的时候：
                            grid.left grid.right grid.top grid.bottom grid.width grid.height 决定的是由坐标轴形成的矩形的尺寸和位置。
                            这比较适用于多个 grid 进行对齐的场景，因为往往多个 grid 对齐的时候，是依据坐标轴来对齐的。
                        containLabel 为 true 的时候：
                            grid.left grid.right grid.top grid.bottom grid.width grid.height 决定的是包括了坐标轴标签在内的所有内容所形成的矩形的位置。
                            这常用于『防止标签溢出』的场景，标签溢出指的是，标签长度动态变化时，可能会溢出容器或者覆盖其他组件。
                */
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                type: 'category',
                data: y_data.data,
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }

            },
            series: {
                type: 'bar',
                data: series_data.data,
                itemStyle: {
                    barBorderRadius: [0, 20, 20, 0],
                    // 前四个参数用于配置渐变色的起止位置，这四个参数依次对应 右下左上 四个方位。也就是从右边开始顺时针方向。
                    // 通过修改前4个参数，可以实现不同的渐变方向
                    /*
                        第五个参数则是一个数组，用于配置颜色的渐变过程。
                        每项为一个对象，包含offset和color两个参数
                    */
                    color: new $echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        {
                            offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
                            color: '#005eaa'
                        }, {
                            offset: 0.5,
                            color: '#339ca8'
                        }, {
                            offset: 1, //  //指100%处的颜色
                            color: '#cda819'
                        }])
                },
                label: {
                    show: true,
                    position: 'inside'
                },
            }
        }

        myChart.setOption(options)
    })
})


/*
    通过getCurrentInstance方法获取当前实例
    再根据当前实例找到全局实例对象appContext，进而拿到全局实例的config.globalProperties。
*/
const currentInstance = getCurrentInstance()
const { $axios, $echarts } = currentInstance.appContext.config.globalProperties

// 获取图表所有数据
async function getData() {
    const { data: res } = await $axios.get('one/data')
    all_data.data = res
    console.log(all_data)
    console.log(y_data.data)
    console.log(series_data.data)

}

// 分配图表中的数据
function setData() {
    all_data.data.forEach(item => {
        y_data.data.push(item.title)
    });
    all_data.data.forEach(item => {
        series_data.data.push(item.num)
    });
}



</script>

<style lang="less" scoped>
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