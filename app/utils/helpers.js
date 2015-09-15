var axios = require('axios');

var helpers = {
  getWeatherForecast: function(location) {
    return axios.get('http://api.wunderground.com/api/1772176a21b221f0/forecast/q/' + location.lat + ',' + location.lon + '.json');
  },
  getArrayBuffer: function(url) {
    return axios.get(url, {responseType: 'arraybuffer'});
  },
  convertBase64: function(arrayBuffer) {
    var uInt8Array = new Uint8Array(arrayBuffer);
    var i = uInt8Array.length;
    var biStr = [];
    while (i--) {
      biStr[i] = String.fromCharCode(uInt8Array[i]);
    }
    var data = biStr.join('');
    var base64 = 'data:image/gif;base64,' + window.btoa(data);

    return base64;
  }
};

module.exports = helpers;