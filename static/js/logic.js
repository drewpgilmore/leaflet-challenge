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
    layers: light
});


var pastWeek = L.layerGroup(); 

d3.json(pastWeekUrl, function(response) {
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
    }).bindPopup("<h1>" + place + "</h1><br><h2>Magnitude " + mag + "</h2>").addTo(pastWeek);
  };
});

var baseMaps = {
  "Light": light,
  "Dark": dark,
  "Streets": streets,
};

var overlayMaps = {
  "Past Week": pastWeek
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

