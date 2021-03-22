# Visualizing Earthquakes with Leaflet
Used geojson API from the USGS to display world-wide earthquake data from the past week (3/14/21-3/21/21)
![2-BasicMap](Images/2-BasicMap.png)
### Process
1. **Data**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visited the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and analyzed earthquake data from the past seven days.  

   ![4-JSON](Images/4-JSON.png)

2. **Map includes:**

  * Markers at the locations of the earthquakes 
  * Marker sizes reflect the magnitude in both radius and color
  * Popups provide additional information about the earthquake when a marker is clicked.
  * A legend that provides context for map data.

