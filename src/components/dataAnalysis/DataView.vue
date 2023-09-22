<template>
  <div class="data-view">
    <el-card><div id="main1"></div></el-card>
    <el-card><div id="main2"></div></el-card>
  </div>
</template>
<script>
import { dataView } from "../../api/api.js";
export default {
  data() {
    return {};
  },

  created() {
    dataView().then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        let { legend, xAxis, series } = res.data.data;
        this.draw(legend, xAxis, series);
      }
    });
  },
  methods: {
    draw(legend, xAxis, series) {
      let myChart = this.$echarts.init(document.getElementById("main2"));
      let option = {
        title: {
          text: "会话量",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: legend,
        },
        xAxis: {
          type: "category",
          data: xAxis,
        },
        yAxis: {
          type: "value",
        },
        series,
      };
      myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss">
.data-view {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 50%;
    #main1,
    #main2 {
      height: 500px;
    }
  }
}
</style>
