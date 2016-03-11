var defaultLayerString = 'OpenStreetMap.Mapnik';
var map = L.map('map', {
    center: [48, -3],
    zoom: 5,
    zoomControl: false
});

map.setView([51.51032167, -0.187084072], 13);

//L.marker([51.5, -0.09]).addTo(map)
//    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//    .openPopup();

//Define an array of Latlng objects (points along the line)
var polylinePoints = [
            new L.LatLng(9.811916, 80.238647),
            new L.LatLng(-21.125498, 53.789063),
            new L.LatLng(-41.244772, 20.390625),
            new L.LatLng(14.944785, -21.445313),
            new L.LatLng(36.809285, -8.525391)
         ];

var polylineOptions = {
    color: 'blue',
    weight: 5,
    opacity: 0.9
};

var addMarker = function(lat, lng, msg){
    L.marker([lat, lng]).addTo(map)
        .bindPopup(msg)
        .openPopup();
};

var addNewPolyline = function(polylinePoints, polylineOptions){
    var polyline = new L.Polyline(polylinePoints, polylineOptions);
    map.addLayer(polyline);
    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());
};

addMarker(9.811916, 80.238647, 'Starting point');
addMarker(36.809285, -8.525391, 'End point');
addLayerControl(defaultLayerString);
addNewPolyline(polylinePoints, polylineOptions);

