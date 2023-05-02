<template>
    <!-- 头部区域 -->
    <header>
        <!-- 标题 -->
        <h1>大数据可视化--Vue3 + ECharts</h1>
    </header>

    <!-- 主体区域 -->
    <section class="container">
        <!-- 左容器 -->
        <section class="left_item">
            <ItemPage>
                <ItemOne></ItemOne>
            </ItemPage>
            <ItemPage>
                <ItemTwo></ItemTwo>
            </ItemPage>
        </section>
        <!-- 中容器 -->
        <section class="center_item">
            <MapPage></MapPage>
        </section>
        <!-- 右容器 -->
        <section class="right_item">
            <ItemPage>
                <ItemThree></ItemThree>
            </ItemPage>
            <ItemPage>
                <ItemFour></ItemFour>
            </ItemPage>
        </section>
    </section>
</template>

<script setup lang="ts">
// 在setup语法糖中，不需要component就能直接使用其他组件
import ItemPage from '../components/ItemPage.vue'
import ItemOne from '../components/ItemOne.vue'
import ItemTwo from '../components/ItemTwo.vue'
import ItemThree from '../components/ItemThree.vue'
import ItemFour from '../components/ItemFour.vue'
import MapPage from '../components/mapPage.vue'


console.log()

</script>

<style lang="less" scoped>
header {
    height: 1rem;
    line-height: 1rem;
    background-color: rgba(0, 0, 255, 0.2);

    h1 {
        color: #fff;
        font-size: .375rem;
        text-align: center;
    }
}

.container {
    // 设置最大最小的宽度
    min-width: 1200px;
    max-width: 2560px;
    width: 100%;
    height: 100%;
    padding: .125rem .125rem 0;
    display: flex;

    // 设置左右在页面的分数
    .left_item,
    .right_item {
        flex: 3;
    }

    .center_item {
        flex: 5;
        height: 10.5rem;
        border: 1px solid blue;
        padding: 0.125rem;
        margin: 20px;
    }
}
</style>