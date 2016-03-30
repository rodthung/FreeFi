angular
    .module('app.controllers', [])

.controller('freeFiCtrl', function ($scope) {

})

.controller('loginCtrl', function ($scope) {

})

.controller('signupCtrl', function ($scope) {

})

.controller('mainCtrl', function ($scope) {
    navigator.geolocation.getCurrentPosition(function (position) {

        var geocoder = new google.maps.Geocoder();

        $scope.locationChanged = function (location) {
            geocoder.geocode({
                'address': location
            }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results[0].geometry.location.lat());
                    console.log(results[0].geometry.location.lng());

                    $scope.map.center.latitude = results[0].geometry.location.lat();
                    $scope.map.center.longitude = results[0].geometry.location.lng();

                }
            });


        };

        $scope.map = {
            center: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            zoom: 13
        };

        $scope.markersOptions = {
            icon: '../img/connection.png'
        };

        $scope.markers = [
            {
                id: 0,
                coords: {
                    latitude: 40.1451,
                    longitude: -99.6680
                }
        },
            {
                id: 1,
                coords: {
                    latitude: 38.1451,
                    longitude: -23.6680
                }
        }
      ];

    });

})

.controller('addWifiLocationCtrl', function ($scope) {

    $scope.wifiPoint = {};

    navigator.geolocation.getCurrentPosition(function (position) {

        var geocoder = new google.maps.Geocoder();

        $scope.addLocationChanged = function (location) {
            geocoder.geocode({
                'address': location
            }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results[0].geometry.location.lat());
                    console.log(results[0].geometry.location.lng());

                    $scope.map.center.latitude = results[0].geometry.location.lat();
                    $scope.map.center.longitude = results[0].geometry.location.lng();

                    $scope.marker.coords.latitude = results[0].geometry.location.lat();
                    $scope.marker.coords.longitude = results[0].geometry.location.lng();

                }
            });
        };

        $scope.map = {
            center: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            events: {
                click: function (e) {
                    console.log(e.center.lat());
                    console.log(e.center.lng());
                    $scope.marker.coords.latitude = e.center.lat();
                    $scope.marker.coords.longitude = e.center.lng();
                }
            },
            zoom: 18
        };

        $scope.marker = {
            id: 0,
            coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            options: {
                draggable: true
            },
            events: {
                dragend: function (marker, eventName, args) {
                    $scope.wifiPoint.lat = marker.getPosition().lat();
                    $scope.wifiPoint.lon = marker.getPosition().lng();

                    $scope.marker.options = {
                        draggable: true,
                    };
                }
            }
        }
    });

    $scope.saveWifiPoint = function () {
        console.log($scope.wifiPoint);
    }
})

.controller('tutorialCtrl', function ($scope) {

})