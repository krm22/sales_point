((app) => {
    'use strict'
    app.component("map", {
        templateUrl: 'js/components/map/map.html',
        controller: [function() {
            angular.extend(this, {
                isCollapsed: true,
                $onInit() {
                    let map = L.map('map', {
                        center: [51.5074, 0.1278],
                        zoom: 13,
                        scrollWheelZoom: false
                    });

                    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map);


                    L.marker([51.5, -0.09]).addTo(map)
                    .bindPopup('Lefties Corner')
                    .openPopup();

                    L.marker([51.5, -0.08]).addTo(map)
                    .bindPopup('Whities Corner')
                    .openPopup();


                }
            })
        }]
    })
})(angular.module('app.common'))
