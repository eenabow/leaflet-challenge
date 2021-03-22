// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Function to make magnitude = radius
function circleRadius(magnitude) {
  return magnitude * 4;
};

// Function to change color based on magnitude of earthquake
function circleColor(magnitude) {
  switch (true) {
    case magnitude > 5:
      return "#ed0909";
    case magnitude > 4:
      return "#ed6c09";
    case magnitude > 3:
      return "#eda909";
    case magnitude > 2:
      return "#fff41c";
    case magnitude > 1:
      return "#b7ff1c";
    default:
      return "#2cea94";
  }
};

// Perform a GET request to the query URL
d3.json(queryUrl, function (earthquakeData) {
  // Create a GeoJSON layer containing the features array on the earthquakeData object  
  var earthquakes = L.geoJSON(earthquakeData.features, {
    onEachFeature: popup,
    pointToLayer: mapCircles
  });
  createMap(earthquakes);
});

// Create circles from query URL and set style
function mapCircles(feature, location) {
  options = {
    fillOpacity: .5,
    fillColor: circleColor(feature.properties.mag),
    radius: circleRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5,
    color: "#000000"
  }

  return L.circleMarker(location, options);
};

// Give each feature a popup describing the place and time of the earthquake
function popup(feature, layer) {
  return layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + Date(feature.properties.time) + "<br> Magnitude: " + feature.properties.mag + "</p>");
};


function createMap(earthquakes) {

  // Define lightmap layer
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });


  // Create our map, giving it the lightmap and earthquakes layers to display on load
  const myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [lightmap, earthquakes]
  });

  //Create the legend
  var legend = L.control({
    position: "bottomright"
  });

  //Add legend to map
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
    // Declare colors and values to add to legend
    var grades = [0, 1, 2, 3, 4, 5]
    var labels = ['<strong> MAGNITUDE </strong>']
    var colors = ["#2cea94", "#b7ff1c", "#fff41c", "#eda909","#ed6c09", "#ed0909"];


    // Loop through colors and add to legend label
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += labels.push(
        "<i style='background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+"));
    }
    div.innerHTML = labels.join('<br>');
    return div;

  };

  legend.addTo(myMap)

};
