// Create an initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map").setView([40, -95], 4);

// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

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
    if (depth > 90) {
      color = "red";
    }
    else if (depth > 60) {
      color = "orange";
    }
    else if (depth > 30) {
      color = "yellow";
    }
    else {
      color = "green";
    }

    // Add circles to map
    L.circle([lat, lon], {
      fillOpacity: 0.75,
      color: color,
      fillColor: color,
      // Adjust radius
      radius: mag * 10000
    }).bindPopup("<h1>" + title + "</h1>").addTo(myMap);
  
  }


})

