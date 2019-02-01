<template>
  <div class="sshmain">
    <a-layout style="padding: 24px 0; background: #fff">
      <a-layout-sider id="treelayout" width="250" style="background: #fff">
        <a-tree
          @rightClick="openssh"
          @select="selectNode"
          :loadData="onLoadData"
          :treeData="treeData"
        ></a-tree>
      </a-layout-sider>
      <a-layout-content :style="{ padding: '0 24px', minHeight: '518px' }">
        <a-card :title="activeHost.ip || activeHost.title || ''">
          <a href="#" slot="extra"></a>

          <a-card-meta></a-card-meta>
          <template class="ant-card-actions" slot="actions">
            <a-tooltip placement="top">
              <template slot="title">
                <span>打开终端</span>
              </template>
              <font-awesome-icon
                icon="terminal"
                style="width:18px;height:22px;"
                @click="openTerminal"
              />
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>权限配置</span>
              </template>
              <a-icon type="safety-certificate" @click="setting"/>
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>基本信息</span>
              </template>
              <a-icon type="setting"/>
            </a-tooltip>
          </template>
        </a-card>
      </a-layout-content>
    </a-layout>
    <a-modal
      :title="activeHost.ip || activeHost.title"
      :visible="visible"
      :okText="okText"
      :okType="okType"
      cancelText="取消"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
    >
      <div style="margin-bottom: 16px">
        <a-input v-model="loginname">
          <a-icon slot="prefix" type="user"/>
        </a-input>
      </div>
      <div style="margin-bottom: 16px">
        <a-input v-model="loginpwd" type="password">
          <a-icon slot="prefix" type="lock"/>
        </a-input>
      </div>
      <div style="margin-bottom: 16px">
        <a-input v-model="timeout" type="number">
          <a-icon slot="prefix" type="clock-circle"/>
        </a-input>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      okText: "OK",
      okType: "primary",
      timeout: 5000,
      loginname: "",
      loginpwd: "",
      visible: false,
      confirmLoading: false,
      activeHost: "",
      tabtitle: new Map(),
      treeData: [{ title: "主机列表", key: "0" }]
    };
  },
  computed: {},
  mounted: function() {
    let self = this;
  },
  methods: {
    onChange(e) {
      const { value } = e.target;
      this.timeout = value;
    },
    openTerminal() {
      if (!this.activeHost.ip) {
        this.$message.warning("请选择主机!");
        return;
      }
      this.openssh({
        node: {
          dataRef: this.activeHost
        }
      });
    },
    setting() {
      if (this.activeHost == "" || this.activeHost.type == 0) {
        this.$message.warning("请选择主机!");
        return;
      }
      this.axios
        .get("host/getAuth", {
          params: { ip: this.activeHost.ip }
        })
        .then(res => {
          if (!res.data.flag) {
            this.$message.error(res.data.message);
            return;
          }
          let data = res.data.message;
          this.loginname = "";
          this.loginpwd = "";
          this.timeout = 5000;
          if (data) {
            this.loginname = data.loginname;
            this.loginpwd = data.loginpwd;
            this.timeout = data.timeout;
            this.okType = "danger";
            this.okText = "修改";
          } else {
            this.okText = "新增";
          }
        });
      this.visible = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      this.axios
        .get("host/setAuth", {
          params: {
            matchstr: this.activeHost.ip,
            loginname: this.loginname,
            loginpwd: this.loginpwd,
            timeout: this.timeout
          }
        })
        .then(res => {
          if (res.data.flag) {
            this.visible = false;
            this.confirmLoading = false;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    //{selected: bool, selectedNodes, node, event}
    selectNode(selectedKeys, e) {
      let node = e.node.dataRef;
      this.activeHost = e.node.dataRef;
    },
    openssh(treeNode) {
      let ip = treeNode.node.dataRef.ip;
      let title = ip;
      if (this.tabtitle.has(title)) {
        let i = this.tabtitle.get(title) + 1;
        this.tabtitle.set(title, i);
        title = `${title}(${i})`;
      } else {
        this.tabtitle.set(ip, 0);
      }

      this.axios.get("/ssh/getToken", { params: { ip: ip } }).then(res => {
        if (!res.data.flag) {
          this.$message.error(`错误!${res.data.message}`);
        } else {
          window.open(
            `/terminal/main.html?ip=${ip}&token=${res.data.message}`,
            "_blank"
          );
        }
      });
    },
    onLoadData(treeNode) {
      let self = this;

      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }

        this.axios
          .get("host/getTreeNode", {
            params: { nodeId: treeNode.dataRef.key }
          })
          .then(res => {
            let chs = [];
            for (const it of res.data) {
              if (it.type == "1") {
                it.isLeaf = true;
                it.title = `${it.title}(${it.ip})`;
              }
              chs.push(it);
            }
            treeNode.dataRef.children = res.data;
            self.treeData = [...self.treeData];
            resolve();
          });
      });
    }
  }
};
</script>

<style lang="scss">
</style>
