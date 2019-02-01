<template>
  <div id="app">
    <a-layout id="components-layout">
      <a-layout-sider :trigger="null" collapsible v-model="collapsed">
        <div class="logo"/>
        <a-menu id="layout-menu" theme="dark" mode="inline" :defaultSelectedKeys="['1']">
          <a-menu-item key="1">
            <a-icon type="dashboard" />
            <span>
              <router-link to="/home">监控</router-link>
            </span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="laptop"/>
            <span>
              <router-link to="/sshmain">SSH</router-link>
            </span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="upload"/>
            <span>nav 3</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '20px 16px 0px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <router-view/>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign : 'center'}">© ShawnShi</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style lang="scss">
#components-layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#layout-menu  a {
  color: white;
}

#components-layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
