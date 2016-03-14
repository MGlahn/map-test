var defaultLayerString = 'OpenStreetMap.Mapnik';
var map = L.map('map', {
    center: [48, -3],
    zoom: 2,
    zoomControl: false
});

map.setView([51.51032167, -0.187084072], 13);

addMarker(9.811916, 80.238647, 'Starting point');
addMarker(36.809285, -8.525391, 'End point');
addLayerControl(defaultLayerString);
makePolyLine('js/points.json', addPolylineToMap);
makePolyLine('js/points2.json', addPolylineToMap);