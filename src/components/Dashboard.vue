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
            <span class="info-box-number">
              20
            </span>
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
            <span class="info-box-number">
              100
            </span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as Util from "./util";

export default Vue.extend({
  name: "dashboard",
  props: {},
  data() {
    return {};
  },
  computed: {},
  mounted: function() {
    let self = this;
  },
  methods: {}
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
