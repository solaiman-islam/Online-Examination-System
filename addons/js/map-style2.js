$(document).ready(function () {
    'use strict';

    if ($('#map-leaflet').length) {
        var map = L.map('map-leaflet', {
            zoom: 12,
            maxZoom: 30,
            tap: false,
            gestureHandling: true,
            center: [23.812052, 90.411532]
        });

        var marker_cluster = L.markerClusterGroup();

        map.scrollWheelZoom.disable();

        var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            scrollWheelZoom: false,
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        $.ajax('js/markers2.json', {
            success: function (markers) {
                $.each(markers, function (index, value) {
                    var icon = L.divIcon({
                        html: value.icon,
                        iconSize: [50, 50],
                        iconAnchor: [50, 50],
                        popupAnchor: [-20, -42]
                    });

                    var marker = L.marker(value.center, {
                        icon: icon
                    }).addTo(map);

                    marker.bindPopup(
                        '<div class="listing-window-image-wrapper">' +
                        '<a href="single-property-1.html">' +
                        '<div class="listing-window-image" style="background-image: url(' + value.image + ');"></div>' +
                        '<div class="listing-window-content">' +
                        '<div class="info">' +
                        '<h2>' + value.title + '</h2>' +
                        '<p>' + value.desc + '</p>' +
                        '<h3>' + value.price + '</h3>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</div>'
                    );

                    marker_cluster.addLayer(marker);
                });

                map.addLayer(marker_cluster);
            }
        });
    }

});
