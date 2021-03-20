// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5
  // layers: [streetmap, earthquakes]
});

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function (earthquakeData) {
  // Once we get a response, send the data.features object to the createFeatures function
  // createFeatures(data.features);
  // Create circles from query URL and set style
  function mapCircles(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: circleColor(feature.properties.mag),
      color: "#000000",
      radius: circleRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

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
  }
  // Function to make magnitude to radius
  function circleRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }

    return magnitude * 4;
  }
});

function createFeatures(earthquakeData) {
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  // look up L.geojson examples - circle markers javacript based on radius 
  L.geoJSON(earthquakeData, {
    // onEachFeature: onEachFeature
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, mapCircles)
    }
  })
  // // Sending our earthquakes layer to the createMap function
  // createMap(earthquakes);
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "Magnitude: " feature.properties.mag + "</p>");
  }
}.addto(myMap);

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


  // Define a baseMaps object to hold our base layers
  // var baseMaps = {
  //   "Street Map": streetmap
  //   // "Light Map": lightmap;
  // };

  // // Create overlay object to hold our overlay layer
  // var overlayMaps = {
  //   Earthquakes: earthquakes
  // };

  
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  // L.control.layers(baseMaps, overlayMaps, {
  //   collapsed: false
  // }).addTo(myMap);
}
