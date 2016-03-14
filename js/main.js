var defaultLayerString = 'OpenStreetMap.Mapnik';
var map = L.map('map', {
    center: [48, -3],
    zoom: 2,
    zoomControl: false
});

map.setView([51.51032167, -0.187084072], 13);

addLayerControl(defaultLayerString);
//makePolyLine('js/points.json', addPolylineToMap);
//makePolyLine('js/points2.json', addPolylineToMap);

makeAnimatedPolyLineFromFile('js/points.json', addAnimatedPolylineToMap);