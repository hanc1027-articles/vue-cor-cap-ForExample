<template>
  <div class="home">
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Vue_Cor_Ble_Nelson_Test</a>
    </nav>
    <button type="button" class="btn btn-info" @click="call">掃瞄</button>
    <button type="button" class="btn btn-info" @click="photo">照相</button>

    <ul class="list-group" v-for="l in list">
      <li class="list-group-item list-group-item-success">
        Name:{{l.name}}
        <br />
        RSSI:{{l.rssi}}
      </li>
    </ul>
    <br />
    相片url：{{photo_url}}
    <router-view />
  </div>
</template>

<script>
import { Plugins, CameraResultType } from "@capacitor/core";
const { Camera } = Plugins;

export default {
  name: "home",
  data() {
    return {
      list: [],
      photo_url: ""
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
    },
    async photo() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.webPath;
      // Can be set to the src of an image now
      imageElement.src = imageUrl;
      this.photo_url = imageUrl;
    }
  }
};
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