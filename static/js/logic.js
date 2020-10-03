// mapbox specifics
const mapboxUrl = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
const mapboxAttribution = "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"


var streets = L.tileLayer(mapboxUrl, {
  id: 'mapbox/streets-v11', 
  tileSize: 512,
  maxZoom: 18, 
  zoomOffset: -1, 
  attribution: mapboxAttribution,
  accessToken: API_KEY
});

var light = L.tileLayer(mapboxUrl, {
  id: 'mapbox/light-v10', 
  tileSize: 512,
  maxZoom: 18, 
  zoomOffset: -1, 
  attribution: mapboxAttribution,
  accessToken: API_KEY
});

var dark = L.tileLayer(mapboxUrl, {
  id: 'mapbox/dark-v10', 
  tileSize: 512,
  maxZoom: 18, 
  zoomOffset: -1, 
  attribution: mapboxAttribution,
  accessToken: API_KEY
});

var map = L.map('map', {
    center: [30, 0],
    zoom: 2,
    layers: [dark]
});

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

var tremors = L.layerGroup();

d3.json(url, function(response) {
  var earthquakes = response.features;
  for (var i = 0; i < earthquakes.length; i++) {
    
    // declare variables for eaach record
    var lat = earthquakes[i].geometry.coordinates[1];
    var lon = earthquakes[i].geometry.coordinates[0];
    var depth = earthquakes[i].geometry.coordinates[2];
    var mag = earthquakes[i].properties.mag;
    var title = earthquakes[i].properties.title;

    var color = "";
    if (depth > 40) {
      color = color1;
    }
    else if (depth > 30) {
      color = color2;
    }
    else if (depth > 20) {
      color = color3;
    }
    else if (depth > 10) {
      color = color4;
    }
    else if (depth > 0) {
      color = color5;
    }
    else {
      color = color6;
    }

    // Add circles to map
    L.circle([lat, lon], {
      fillOpacity: .75,
      color: '#000000',
      weight: 0.5,
      fillColor: color,
      stroke: false,
      radius: mag * 15000
    }).bindPopup("<h1>" + title + "</h1>").addTo(tremors);
  
  };



});

  // // Set up the legend
  // var legend = L.control({ position: "bottomright" });
  // legend.onAdd = function() {
  //   var div = L.DomUtil.create("div", "info legend");
  //   var limits = geojson.options.limits;
  //   var colors = geojson.options.colors;
  //   var labels = [];

  //   // Add min & max
  //   var legendInfo = "<h1>Median Income</h1>" +
  //     "<div class=\"labels\">" +
  //       "<div class=\"min\">" + limits[0] + "</div>" +
  //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  //     "</div>";

  //   div.innerHTML = legendInfo;

  //   limits.forEach(function(limit, index) {
  //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  //   });

  //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  //   return div;
  // };

  // // Adding legend to the map
  // legend.addTo(map);

var baseMaps = {
  "Light": light,
  "Dark": dark,
  "Streets": streets,
};

var overlayMaps = {
  "Tremors": tremors
};



L.control.layers(baseMaps, overlayMaps).addTo(map);

