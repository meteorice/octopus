<template>
  <div id="terminal">
    <my-terminal></my-terminal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ssh from "@/components/tt.vue";

export default Vue.extend({
  name: "terminal",
  data() {
    return {};
  },
  computed: {},
  mounted: function() {},
  components: {
    "my-terminal": ssh
  }
});
</script>


<style lang="scss">
</style>
