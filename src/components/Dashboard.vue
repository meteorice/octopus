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
        <div id="c1"></div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-calendar @select="select">
          <template slot="dateCellRender" slot-scope="value">
            <a-list size="small" bordered :dataSource="getListData(value)">
              <a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
            </a-list>
          </template>
          <template slot="monthCellRender" slot-scope="value">
            <div v-if="getMonthData(value)" class="notes-month">
              <section>{{getMonthData(value)}}</section>
              <span>Backlog number</span>
            </div>
          </template>
        </a-calendar>
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

import G2 from "@antv/g2";

const data = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 }
];

export default Vue.extend({
  name: "dashboard",
  props: {},
  data() {
    return {};
  },
  computed: {},
  mounted: function() {
    let self = this;

    const chart = new G2.Chart({
      container: "c1", // 指定图表容器 ID
      forceFit: true, // 指定图表宽度
      height: 300, // 指定图表高度
    });
    // Step 2: 载入数据源
    chart.source(data);
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart
      .interval()
      .position("genre*sold")
      .color("genre");
    // Step 4: 渲染图表
    chart.render();
  },
  methods: {
    select(value: moment.Moment) {
      console.log(value);
    },
    getListData(value: moment.Moment) {
      let listData;
      switch (value.date()) {
        case 8:
          listData = ["登入5次", "事故1次", "告警2次"];
          break;
        case 10:
          listData = ["登入15次", "事故12次", "告警22次"];
          break;
        case 15:
          listData = ["登入52次", "事故1次", "告警21次"];
          break;
        default:
      }
      return listData || [];
    },

    getMonthData(value: moment.Moment) {
      if (value.month() === 8) {
        return 1394;
      }
    }
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
