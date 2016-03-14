var addMarker = function(lat, lng, msg){
    L.marker([lat, lng]).addTo(map)
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
    weight: 5,
    opacity: 0.9
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