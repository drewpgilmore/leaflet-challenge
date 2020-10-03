// mapbox specifics

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
    center: [40, -100],
    zoom: 5,
    layers: [light, dark, streets]
});



var pastHour = L.layerGroup();
var pastDay = L.layerGroup();
var pastWeek = L.layerGroup(); 
var pastMonth = L.layerGroup();

var timePeriods = ['hour', 'day', 'week', 'month'];

for (var i = 0; i < 4; i++) {
  var url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${timePeriods[i]}.geojson`;
  d3.json(url, function(response) {
    var earthquakes = response.features;
    for (var j = 0; j < earthquakes.length; j++) {
      
      // declare variables for eaach record
      var lat = earthquakes[j].geometry.coordinates[1];
      var lon = earthquakes[j].geometry.coordinates[0];
      var depth = earthquakes[j].geometry.coordinates[2];
      var mag = earthquakes[j].properties.mag;
      var place = earthquakes[j].properties.place;

      var color = returnColor(depth);

      // Add circles to map
      var circle = L.circle([lat, lon], {
        fillOpacity: .7,
        color: '#000000',
        weight: 0.5,
        fillColor: color,
        radius: mag * 11000
      }).bindPopup("<h1>" + place + "</h1><br><h2>Magnitude " + mag + "</h2>")
      
      if (timePeriods[i] == 'hour') {
        circle.addTo(pastHour);
      }
      else if (timePeriods[i] == 'day') {
        circle.addTo(pastDay);
      }
      else if (timePeriods[i] == 'week') {
        circle.addTo(pastWeek);
      }
      else {
        circle.addTo(pastMonth);
      }
    };
  });
};

var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Depth</strong>'],
    categories = ['< 0','0 - 10','10 - 20','20 - 30','30 - 40', '> 40'];

    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + colors[i] + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(map);

// Set up the legend
var legend = L.control({ position: "bottomleft" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = geojson.options.limits;
  var colors = geojson.options.colors;
  var labels = [];

// Add min & max
var legendInfo = "<h1>Median Income</h1>" +
  "<div class=\"labels\">" +
    "<div class=\"min\">" + limits[0] + "</div>" +
    "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  "</div>";

div.innerHTML = legendInfo;
limits.forEach(function(limit, index) {
  labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
});
div.innerHTML += "<ul>" + labels.join("") + "</ul>";
return div;
};

// Adding legend to the map
legend.addTo(myMap);


var baseMaps = {
  "Light": light,
  "Dark": dark,
  "Streets": streets,
};

var overlayMaps = {
  "Past Hour": pastHour,
  "Past Day": pastDay,
  "Past Week": pastWeek,
  "Past Month": pastMonth,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

