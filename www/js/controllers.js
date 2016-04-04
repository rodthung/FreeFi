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

        //----------------------- Search Map -----------------------//
        //Searching place
        var geocoder = new google.maps.Geocoder();

        $scope.locationChanged = function (location) {
            geocoder.geocode({
                'address': location
            }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    $scope.map.center.latitude = results[0].geometry.location.lat();
                    $scope.map.center.longitude = results[0].geometry.location.lng();

                }
            });
        };

        //----------------------- Map -----------------------//
        //Display a map
        $scope.map = {
            center: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            zoom: 13
        };

        //----------------------- Markers -----------------------//
        //Create Model of markers
        $scope.randomMarkers = [];

        //Add marker option 
        $scope.markersOptions = {
            icon: '../img/freefi-point-blue.png'
        };

        //Create random markers
        var createRandomMarker = function (i, idKey) {

            if (idKey == null) {
                idKey = "id";
            }

            var latitude = (Math.random() * (120 - (-120)) + 0.0200).toFixed(4);
            var longitude = (Math.random() * (180 - (-180)) + 0.0200).toFixed(4);
            var ret = {
                latitude: latitude,
                longitude: longitude,
                title: 'm' + i,
                show: false
            };
            ret[idKey] = i;
            return ret;
        }

        //Fill markers with fake data
        var markers = [];
        for (var i = 0; i < 20; i++) {
            markers.push(createRandomMarker(i));
        }
        $scope.randomMarkers = markers;

        //Add Click event to marker 
        $scope.onClick = function (marker, eventName, model) {
            console.log("Clicked!");
            model.show = !model.show;
        };
    });

})

.controller('addWifiLocationCtrl', function ($scope) {

    //----------------------- Search Location -----------------------//
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
        //----------------------- Map -----------------------//
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

        //----------------------- Markers -----------------------//
        $scope.marker = {
            id: 0,
            coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            options: {
                draggable: true,
                icon: '../img/freefi-point-mango.png'
            },
            events: {
                dragend: function (marker) {
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