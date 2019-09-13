<template>
  <div class="home">
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Vue_Cor_Ble_Nelson_Test</a>
    </nav>
    <button type="button" class="btn btn-info" @click="call">掃瞄</button>

    <ul class="list-group" v-for="l in list">
      <li class="list-group-item list-group-item-success">
        Name:{{l.name}}
        <br />
        RSSI:{{l.rssi}}
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: 'home',
  data() {
    return {
      list: []
    };
  },
  methods: {
    call() {
      this.list = [];
      ble.startScan(
        [],
        device => {
          var c = 0;
          for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].name == device.name) {
              c++;
              this.list[i] = device;
            }
          }
          if (c == 0) {
            this.list.push(device);
            c = 0;
          }
        },
        () => {
          console.log("失敗");
        }
      );

      setTimeout(
        ble.stopScan,
        5000,
        function() {
          console.log("掃瞄完成");
        },
        function() {
          console.log("stopScan 失敗");
        }
      );
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.btn {
  margin-top: 20pt;
  margin-bottom: 20pt;
}
</style>