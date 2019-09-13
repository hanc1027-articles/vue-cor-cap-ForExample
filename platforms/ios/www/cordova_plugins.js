cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-ble-central.ble",
      "file": "plugins/cordova-plugin-ble-central/www/ble.js",
      "pluginId": "cordova-plugin-ble-central",
      "clobbers": [
        "ble"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-compat": "1.2.0",
    "cordova-plugin-ble-central": "1.2.2",
    "cordova-plugin-whitelist": "1.3.4"
  };
});