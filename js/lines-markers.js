var addMarker = function(latLng, msg){
    L.marker(latLng).addTo(map)
        .bindPopup(msg)
        .openPopup();
};

var addPolylineToMap = function(polylinePoints, polylineOptions){
    var polyline = new L.Polyline(polylinePoints, polylineOptions);
    map.addLayer(polyline);
    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());
};

var polylineOptions = {
    color: 'blue',
    weight: 2,
    opacity: 0.9
};

var makeAnimatedPolyLineFromFile = function (fileString) {
    var latlngs = [];
    $.getJSON(fileString)
        .done(function (data) {
            var len = data.points.length;
            $.each(data.points, function (index) {
                latlngs.push(new L.LatLng(data.points[index].lat, data.points[index].lng));
            });
            var path = L.polyline(latlngs, polylineOptions);
            map.fitBounds(path.getBounds());
            map.fitBounds(L.latLngBounds(latlngs));
            addMarker(latlngs[0], "start")
            map.addLayer(path);
            path.snakeIn();
            path.on('snakeend', function (ev) {
                addMarker(latlngs[len - 1], "end");
            });
        })
        .fail(function () {
            console.log("could not load the file");
        });
};



var makePolyLine = function (fileString, callback) {
    var newPolyLinePoints = [];
    $.getJSON(fileString)
        .done(function (data) {
            $.each(data.points, function (index) {
                newPolyLinePoints.push(new L.LatLng(data.points[index].lat, data.points[index].lng));
            });
            if (typeof callback === "function") {
                // callback to addNewPolyline to add the line to the map
                callback(newPolyLinePoints, polylineOptions);
            }
        })
        .fail(function () {
            console.log("could not load the file");
        });
};