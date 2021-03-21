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
      return "#2c99ea";
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
    // opacity: 1,
    fillOpacity: .2,
    fillColor: circleColor(feature.properties.mag),
    // color: "#000000",
    radius: circleRadius(feature.properties.mag),
    stroke: false
  }

  return L.circleMarker(location, options);
};

// Give each feature a popup describing the place and time of the earthquake
function popup(feature, layer) {
  return layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + Date(feature.properties.time) + "<br> Magnitude: " + feature.properties.mag + "</p>");
};


function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  //Create the legned
 var legend = L.control({ position: 'bottomright' });

  //Add legend to map
  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend')

    div.innerHTML = "<h3>Magnitude Legend</h3><table><tr><th> <= 5</th><td>Red</td></tr><tr><th> <= 4</th><td>Dark Orange</td></tr><tr><th> <= 3</th><td>Yellow Orange</td></tr><tr><th> <= 2</th><td>Yellow Green</td></tr><tr><th> >= 1</th><td>Blue Green</td></tr></table>";

    return div;
  };

  legend.addTo(myMap);

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap)
};
