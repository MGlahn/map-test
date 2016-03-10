var map = L.map('map', {
    center: [48, -3],
    zoom: 5,
    zoomControl: false
});

map.setView([51.51032167, -0.187084072], 13);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

var defaultLayer = L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);

var baseLayers = {
    'OpenStreetMap Default': defaultLayer,
    'OpenStreetMap German Style': L.tileLayer.provider('OpenStreetMap.DE'),
    'OpenStreetMap Black and White': L.tileLayer.provider('OpenStreetMap.BlackAndWhite'),
    'OpenStreetMap H.O.T.': L.tileLayer.provider('OpenStreetMap.HOT'),
    'Thunderforest OpenCycleMap': L.tileLayer.provider('Thunderforest.OpenCycleMap'),
    'Thunderforest Transport': L.tileLayer.provider('Thunderforest.Transport'),
    'Thunderforest Landscape': L.tileLayer.provider('Thunderforest.Landscape'),
    'Hydda Full': L.tileLayer.provider('Hydda.Full'),
    'MapQuest OSM': L.tileLayer.provider('MapQuestOpen.OSM'),
    'MapQuest Aerial': L.tileLayer.provider('MapQuestOpen.Aerial'),
    'Stamen Toner': L.tileLayer.provider('Stamen.Toner'),
    'Stamen Terrain': L.tileLayer.provider('Stamen.Terrain'),
    'Stamen Watercolor': L.tileLayer.provider('Stamen.Watercolor'),
    'Esri WorldStreetMap': L.tileLayer.provider('Esri.WorldStreetMap'),
    'Esri DeLorme': L.tileLayer.provider('Esri.DeLorme'),
    'Esri WorldTopoMap': L.tileLayer.provider('Esri.WorldTopoMap'),
    'Esri WorldImagery': L.tileLayer.provider('Esri.WorldImagery'),
    'Esri WorldTerrain': L.tileLayer.provider('Esri.WorldTerrain'),
    'Esri WorldShadedRelief': L.tileLayer.provider('Esri.WorldShadedRelief'),
    'Esri WorldPhysical': L.tileLayer.provider('Esri.WorldPhysical'),
    'Esri OceanBasemap': L.tileLayer.provider('Esri.OceanBasemap'),
    'Esri NatGeoWorldMap': L.tileLayer.provider('Esri.NatGeoWorldMap'),
    'Esri WorldGrayCanvas': L.tileLayer.provider('Esri.WorldGrayCanvas')
};

var overlayLayers = {
    //    'OpenSeaMap': L.tileLayer.provider('OpenSeaMap'),
    //    'OpenWeatherMap Precipitation': L.tileLayer.provider('OpenWeatherMap.Precipitation'),
    //    'OpenWeatherMap PrecipitationClassic': L.tileLayer.provider('OpenWeatherMap.PrecipitationClassic'),
    //    'OpenWeatherMap Rain': L.tileLayer.provider('OpenWeatherMap.Rain'),
    //    'OpenWeatherMap RainClassic': L.tileLayer.provider('OpenWeatherMap.RainClassic'),
    //    'OpenWeatherMap Pressure': L.tileLayer.provider('OpenWeatherMap.Pressure'),
    //    'OpenWeatherMap Temperature': L.tileLayer.provider('OpenWeatherMap.Temperature'),
    //    'OpenWeatherMap Snow': L.tileLayer.provider('OpenWeatherMap.Snow')
};

var layerControl = L.control.layers(baseLayers, overlayLayers, {
    collapsed: false
}).addTo(map);

// resize layers control to fit into view.
function resizeLayerControl() {
    var layerControlHeight = document.body.clientHeight - (10 + 50);
    var layerControl = document.getElementsByClassName('leaflet-control-layers-expanded')[0];

    layerControl.style.overflowY = 'auto';
    layerControl.style.maxHeight = layerControlHeight + 'px';
}
map.on('resize', resizeLayerControl);
resizeLayerControl();

//Define an array of Latlng objects (points along the line)
var polylinePoints = [
            new L.LatLng(51.51032167, -0.187084072),
            new L.LatLng(51.51019814, -0.187030437),
            new L.LatLng(51.51013137, -0.187845822),
            new L.LatLng(51.50457546, -0.185415744),
            new L.LatLng(51.50476244, -0.181875224),
            new L.LatLng(51.50457546, -0.179622177),
            new L.LatLng(51.50409462, -0.175459380),
            new L.LatLng(51.50368057, -0.174365042),
            new L.LatLng(51.50299938, -0.174729820),
            new L.LatLng(51.50213117, -0.174686903),
            new L.LatLng(51.50199760, -0.177412030),
            new L.LatLng(51.50179725, -0.180373197),
            new L.LatLng(51.50143660, -0.180351735),
         ];

var polylineOptions = {
    color: 'blue',
    weight: 6,
    opacity: 0.9
};

var polyline = new L.Polyline(polylinePoints, polylineOptions);

map.addLayer(polyline);

// zoom the map to the polyline
map.fitBounds(polyline.getBounds());