var addMarker = function (latLng, msg) {
    L.marker(latLng).addTo(map)
        .bindPopup(msg)
        .openPopup();
};

var addPolylineToMap = function (polylinePoints, polylineOptions) {
    var polyline = new L.Polyline(polylinePoints, polylineOptions);
    map.addLayer(polyline);
    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());
};

var addAnimatedPolylineToMap = function (latlngs, options, start, end) {
    var path = L.polyline(latlngs, options);
    map.fitBounds(path.getBounds());
    map.fitBounds(L.latLngBounds(latlngs));
    addMarker([start.lat, start.lng], start.harbour);
    map.addLayer(path);
    path.snakeIn();
    path.on('snakeend', function () {
        addMarker([end.lat, end.lng], end.harbour);
    });
};

var polylineOptions = {
    color: 'blue',
    weight: 2,
    opacity: 0.9
};

var makeAnimatedPolyLineFromFile = function (fileString, callback) {
    var latlngs = [];
    $.getJSON(fileString)
        .done(function (data) {
            var points = data.points,
                start = points[0],
                end = points[data.points.length - 1];
            $.each(points, function (index) {
                latlngs.push(new L.LatLng(points[index].lat, points[index].lng));
            });
            //callback to addAnimatedPolylineToMap
            callback(latlngs, polylineOptions, start, end);
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