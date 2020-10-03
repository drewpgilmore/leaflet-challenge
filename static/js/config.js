// API key
const API_KEY = "pk.eyJ1IjoiZHJld3BnaWxtb3JlIiwiYSI6ImNrZmRhYzEzOTA0c2oycXJ3Nzc4ZGN6ZHQifQ.59iOzOtMtCapARF4Rh6UXA";

var color1 = '#F94144';
var color2 = '#F3722C';
var color3 = '#F8961E';
var color4 = '#F9C74F';
var color5 = '#90BE6D';
var color6 = '#43AA8B';

var colors = [color1, color2, color3, color4, color5, color6];

const mapboxUrl = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
const mapboxAttribution = "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"

const pastHourURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
const pastDayURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
const pastSevenDaysURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
const pastThirthyDaysURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";


function returnColor(num) {
    var color = "";
    
    if (num > 40) {
      color = color1;
    }
    else if (num > 30) {
      color = color2;
    }
    else if (num > 20) {
      color = color3;
    }
    else if (num > 10) {
      color = color4;
    }
    else if (num > 0) {
      color = color5;
    }
    else {
      color = color6;
    }
    return color
}