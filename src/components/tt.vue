<template>
  <div>
    <a-button type="primary" @click="toggleW">全屏</a-button>
    <a-button @click="selectall">全选</a-button>
    <a-button type="dashed" @click="connectssh">连接</a-button>
    <div id="terminal"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Terminal } from "xterm"
import { attach } from "xterm/lib/addons/attach/attach"
import * as fullscreen from "xterm/lib/addons/fullscreen/fullscreen"
import "xterm/dist/xterm.css"
import "xterm/dist/addons/fullscreen/fullscreen.css"
//Terminal.applyAddon(fit);
// Terminal.applyAddon(attach);
fullscreen.apply(Terminal)

export default Vue.extend({
  name: "ssh",
  props: {
    terminal: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      xterm: {} as Terminal,
      ws: {} as WebSocket,
      ops: {
        cursorBlink: true, //光标闪烁
        cursorStyle: "underline", //下划线
        convertEol: false, // ‘\n’ to ‘\r\n’
        disableStdin: false, //
        cols: 180
      }
    };
  },
  computed: {},
  mounted: function() {
    let self = this
  },
  methods: {
    toggleW: function() {
      fullscreen.toggleFullScreen(this.xterm, true)
    },
    selectall: function() {
      this.xterm.selectAll()
    },
    connectssh: function() {
      let self = this
      this.xterm = new Terminal(<any>this.ops)
      this.ws = new WebSocket("ws://127.0.0.1:8888/myHandler/ID=888")
      this.ws.onopen = function(event) {
        console.log("onpen")
        let el = document.getElementById("terminal")
        self.xterm.open(<HTMLIFrameElement>el)
        self.xterm.focus()
        //fit(this.xterm);
        attach(self.xterm, self.ws, true, true)
		self.xterm.writeln("欢迎使用 ")
		self.ws.send("pwd\r\n")
      };
    }
  }
});

function send(ws: WebSocket) {
  var postValue = {} as any
  postValue.sessionId = 88888
  postValue.cmd = "pwd \n"
  ws.send(JSON.stringify(postValue))
}
</script>


<style lang="scss">
</style>
