 
let map = AmCharts.makeChart("chartdivEditUser", {
  "type": "map",
  "theme": "dark",
  "projection": "eckert3",
  "dataProvider": {
    "map": "worldLow",
    "getAreasFromMap": true
  },
  "areasSettings": {
    "selectedColor": "#CC0000",
    "selectable": true,
    "autoZoom": true,
  },
  /* Add click event to track country selection/unselection */
  "listeners": [{
    "event": "clickMapObject",
    "method": function(e) {
      
      // Ignore any click not on area
      if (e.mapObject.objectType !== "MapArea")
        return;
      
      var area = e.mapObject;
      
      // Toggle showAsSelected
      area.showAsSelected = !area.showAsSelected;
      e.chart.returnInitialColor(area);
      
      // Update the list
      document.getElementById("selected").innerHTML = JSON.stringify(getSelectedCountries());
      document.getElementById("countriesVisited").value = JSON.stringify(getSelectedCountries());
      
    }
  }]
});

/* Function which extracts currently selected country list.
 */
function getSelectedCountries() {
  var selected = [];
    
  for(var i = 0; i < map.dataProvider.areas.length; i++) {
    if(map.dataProvider.areas[i].showAsSelected)
      selected.push(map.dataProvider.areas[i].enTitle);
  }
  return selected;
}


module.exports = { map }
