<template>
  <div id="dashboard">
    <a-row>
      <a-col :span="12">
        <div class="info-box">
          <span class="info-box-icon bg-info elevation-1">
            <font-awesome-icon icon="heartbeat" :style="{ color: '#dc3545' }"/>
          </span>
          <div class="info-box-content">
            <span class="info-box-text">SSH会话数量</span>
            <span class="info-box-number">20</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a-col>
      <a-col :span="12">
        <div class="info-box">
          <span class="info-box-icon bg-info elevation-1">
            <font-awesome-icon icon="laptop" :style="{ color: '#17a2b8' }"/>
          </span>
          <div class="info-box-content">
            <span class="info-box-text">HOST数量</span>
            <span class="info-box-number">100</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <div id="cal" style="width: 100%;height:200px;"></div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <div id="detail" style="width: 100%;height:350px;"></div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import * as Util from "./util";

let echarts = require("echarts");
let now = moment().format("YYYY-MM-DD");

let visualMap = {
  type: "continuous",
  show: true,
  orient: "horizontal",
  left: "left",
  top: 0,
  min: 0,
  max: 100,
  inRange: {
    color: ["#ADE0FF", "#0150B3"]
  }
};

let calendar = {
  left: 40,
  range: moment().year(),
  cellSize: 20,
  dayLabel: {
    firstDay: 1, // 从周一开始
    nameMap: "cn"
  },
  monthLabel: {
    nameMap: "cn"
  },
  yearLabel: {
    show: false
  }
};

export default Vue.extend({
  name: "dashboard",
  props: {},
  data() {
    return {
      data: []
    };
  },
  computed: {},
  mounted: function() {
    let self = this;
    let myChart = echarts.init(document.getElementById("cal"));
    // let data = getVirtulData(2019);

    let detail = echarts.init(document.getElementById("detail"));

    detail.setOption({
      left: 20,
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        type: "category",
        data: (() => {
          let res = [];
          for (var val, i = 0; i < 24; i++) {
            res.push(i + ":00");
          }
          return res;
        })()
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "Step Start",
          type: "line",
          step: "start",
          data: [120, 132, 101, 134, 90, 230, 210]
        }
      ]
    });

    myChart.on("click", function(params: any) {
      // 控制台打印数据的名称
      console.log(params);
    });

    this.axios.get("host/getSshLog", {}).then(res => {
      if (res.data.flag) {
        let data = [];
        for (let item of res.data.message) {
          data.push([item.ddate, item.times]);
          if (item.times > visualMap.max) {
            visualMap.max = item.times;
          }
        }
        var option = {
          title: {
            text: "年度登录统计",
            right: 0
          },
          visualMap: visualMap,
          calendar: calendar,
          tooltip: {
            formatter: "{c}"
          },
          series: [
            {
              type: "heatmap",
              coordinateSystem: "calendar",
              data: data
            },
            {
              data: data,
              symbolSize: (val: String) => {
                if (val[0] === now) {
                  return 25;
                } else {
                  return 0;
                }
              },
              name: "今天",
              type: "effectScatter",
              coordinateSystem: "calendar",
              showEffectOn: "render",
              rippleEffect: {
                brushType: "stroke"
              },
              hoverAnimation: true,
              zlevel: 1
            }
          ]
        };
        myChart.setOption(option);
      }
    });
  },
  methods: {
    // select(value: moment.Moment) {
    //   console.log(value);
    // },
    // getListData(value: moment.Moment) {
    //   let listData;
    //   switch (value.date()) {
    //     case 8:
    //       listData = ["登入5次", "事故1次", "告警2次"];
    //       break;
    //     case 10:
    //       listData = ["登入15次", "事故12次", "告警22次"];
    //       break;
    //     case 15:
    //       listData = ["登入52次", "事故1次", "告警21次"];
    //       break;
    //     default:
    //   }
    //   return listData || [];
    // },
    // getMonthData(value: moment.Moment) {
    //   if (value.month() === 8) {
    //     return 1394;
    //   }
    // }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*
 * Component: Info Box
 * -------------------
 */
.info-box {
  @extend .d-flex;
  @extend .mb-3;
  @include box-shadow($card-shadow);
  @include border-radius($border-radius);

  padding: 0.5rem;
  min-height: 80px;
  background: $white;
  margin-right: 8px;

  .progress {
    background-color: rgba(0, 0, 0, 0.125);
    margin: 5px 0;
    height: 2px;
    .progress-bar {
      background-color: $white;
    }
  }
}

.info-box-icon {
  @extend .d-flex;
  @extend .align-items-center;
  @extend .justify-content-center;

  @if $enable-rounded {
    border-radius: $border-radius;
  }

  display: block;
  width: 70px;
  text-align: center;
  font-size: 30px;

  > img {
    max-width: 100%;
  }
}

.info-box-content {
  padding: 5px 10px;
  flex: 1;
}

.info-box-number {
  display: block;
  font-weight: $font-weight-bold;
}

.progress-description,
.info-box-text {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@each $name, $color in $theme-colors {
  .info-box.bg-#{$name},
  .info-box.bg-#{$name}-gradient {
    color: color-yiq($color);

    .progress-bar {
      background-color: color-yiq($color);
    }
  }
}

.info-box-more {
  display: block;
}

.progress-description {
  margin: 0;
}
</style>
