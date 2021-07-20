// use rest countires and get lat and long
var req = new XMLHttpRequest();

req.open("GET", "https://restcountries.eu/rest/v2/all", true);

req.send();
req.onload = function () {
  try {
    var data = JSON.parse(this.response);

    for (i = 0; i < data.length; ++i) {
      var name = data[i].name;
      var land = data[i].latlng;
      if (land.length === 0) {
        throw Error("No coordidate found");
      }
      currentWhether(name, ...land);
    }
  } catch (e) {
    console.log(`${e.message} for ${name}`);
  }
};

function currentWhether(name, lat, lon) {
  var reqwhether = new XMLHttpRequest();

  var url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=845b180d8d3512f806cbe2c92a4e15e9";
  reqwhether.open("GET", url, true);
  reqwhether.send();
  reqwhether.onload = function () {
    res = JSON.parse(this.response);

    console.log(`${name}:${res.main.temp}`);
  };
}
