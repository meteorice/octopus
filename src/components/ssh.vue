<template>
  <div>
    <a-row>
      <a-col :span="24">
        <a-menu mode="horizontal">
          <a-sub-menu @click="commCmd">
            <span slot="title" class="submenu-title-wrapper">
              <a-icon type="read"/>常用命令
            </span>
            <a-menu-item key="pwd">pwd</a-menu-item>
            <a-menu-item key="top">top</a-menu-item>
            <a-menu-item key="ss -s">ss -s</a-menu-item>
          </a-sub-menu>
          <a-sub-menu @click="templateCmd">
            <span slot="title" class="submenu-title-wrapper">
              <a-icon type="edit"/>命令模板
            </span>
            <a-menu-item key="awk">awk</a-menu-item>
            <a-menu-item key="sed">sed</a-menu-item>
            <a-menu-item key="whoami">whoami</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-input
          placeholder="执行命令"
          :disabled="areatextDisabled"
          v-model="cmdarea"
          @pressEnter="execCmd"
        />
      </a-col>
    </a-row>

    <div id="terminal"></div>
    <!-- <a-button type="primary" @click="toggleW">全屏</a-button>
    <a-button @click="selectall">全选</a-button>
    <a-button type="dashed" @click="connectssh">连接</a-button>-->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as Util from "./util";
import { Terminal } from "xterm";
import { attach } from "xterm/lib/addons/attach/attach";
import * as fit from "xterm/lib/addons/fit/fit";
// import * as fullscreen from "xterm/lib/addons/fullscreen/fullscreen";
import "xterm/dist/xterm.css";
import "xterm/dist/addons/fullscreen/fullscreen.css";
//Terminal.applyAddon(fit);
// Terminal.applyAddon(attach);
//fullscreen.apply(Terminal);
fit.apply(Terminal);

export default Vue.extend({
  name: "ssh",
  props: {
    terminal: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      cmdarea: "", //输入命令
      areatextDisabled: true, //输入框是否可用
      xterm: {} as Terminal,
      ws: {} as WebSocket,
      ops: {
        cursorBlink: true, //光标闪烁
        cursorStyle: "underline", //下划线
        convertEol: false, // ‘\n’ to ‘\r\n’
        disableStdin: false, //
        cols: 100,
        rows: 30
      }
    };
  },
  computed: {},
  mounted: function() {
    let self = this;
    this.xterm = new Terminal(<any>this.ops);
    let el = document.getElementById("terminal");
    this.xterm.open(<HTMLIFrameElement>el);
    this.xterm.focus();
    let search = document.location.search;
    let params = getParam(search);
    document.title = params.ip;
    setTimeout(() => {
      self.connectssh(params);
		}, 100);
  },
  methods: {
    templateCmd(cmd: any) {
      this.cmdarea = cmd.key;
    },
    commCmd(cmd: any) {
      this.ws.send(`${cmd.key} \n`);
    },
    handleMenuClick(e: any) {
      console.log("click", e);
    },
    execCmd: function() {
      let command = this.cmdarea;
      this.ws.send(`${command} \n`);
      this.cmdarea = "";
      command = "";
      //fullscreen.toggleFullScreen(this.xterm, true);
    },
    selectall: function() {
      this.xterm.selectAll();
    },
    connectssh: function(params: any) {
      let self = this;
      this.ws = new WebSocket(
        Util.getWsPath(`/sshconnect?token=${params.token}&ip=${params.ip}`)
      );
      // this.ws = new WebSocket(`ws://127.0.0.1:8080/sshconnect?token=${params.token}&ip=${params.ip}`);
      this.ws.onopen = function(event) {
        console.log("onpen");
        fit.fit(self.xterm);
        attach(self.xterm, self.ws, true, true);
        //self.xterm.writeln("欢迎使用 ");
        self.ws.send("\n");
        self.areatextDisabled = false;
			};
    }
  }
});

function getParam(search: string = "") {
  let res: { [key: string]: string } = {};
  if (search.indexOf("?") != -1) {
    search = search.substr(1);
    let arrs = search.split("&");
    for (const item of arrs) {
      let tmp = item.split("=");
      res[tmp[0]] = tmp[1];
    }
  }
  return res;
}
</script>


<style lang="scss">
</style>
