<template>
  <div
    id="main"
    style="width: 60rem;height:40rem;"
  ></div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      option: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("main"));
    this.myChart.setOption(this.option);
  }
};
</script>

<style>
</style>