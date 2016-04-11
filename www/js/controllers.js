angular
    .module('app.controllers', [])

.controller('freeFiCtrl', function ($scope) {

})

.controller('loginCtrl', function ($scope) {

})

.controller('signupCtrl', function ($scope) {

})

.controller('mainCtrl', function ($scope, wifiFactory) {




    navigator.geolocation.getCurrentPosition(function (position) {

        //----------------------- Search Map -----------------------//
        //Searching place
        var geocoder = new google.maps.Geocoder();

        $scope.locationChanged = function (location) {
            geocoder.geocode({
                'address': location
            }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results[0]);
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

        $scope.Markers = [
                {
                    "id": "570bc8d7275ed11100eb0e7b",
                    "unlikes": 0,
                    "likes": 0,
                    "wifiPass": "Jonisthebest",
                    "wifiName": "Newwifi",
                    "longitude": -3.0109835,
                    "latitude": 43.356388,
                    "name": "Newone",
                    "__v": 0
  },
                {
                    "id": "570bc8f0275ed11100eb0e7c",
                    "unlikes": 0,
                    "likes": 0,
                    "wifiPass": "Jonisthebest",
                    "wifiName": "Newwifi",
                    "longitude": -3.0094117255173387,
                    "latitude": 43.35659862418748,
                    "name": "Another",
                    "__v": 0
  }
]
            //Add marker option 
        $scope.markersOptions = {
            icon: 'img/freefi-point-blue.png'
        };
        //----------------------- Call API -----------------------//
        wifiFactory.getAllSpots()
            .then(function (result) {
                $scope.Markers = result.data;
                for (var i = 0; i < $scope.Markers.length; i++) {
                    $scope.Markers[i].id = i
                }

            })



    });

})

.controller('addWifiLocationCtrl', function ($scope, wifiFactory) {

    //----------------------- Search Location -----------------------//
    $scope.wifiPoint = {};

    navigator.geolocation.getCurrentPosition(function (position) {

        var geocoder = new google.maps.Geocoder();
        $scope.wifiPoint.lat = position.coords.latitude;
        $scope.wifiPoint.lon = position.coords.longitude;

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
                icon: 'img/freefi-point-mango.png'
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

        wifiFactory.addSpot($scope.wifiPoint)
            .then(function (result) {
                console.log(result.data);
            })
    }
})

.controller('wifiInfoCtrl', function ($scope) {
    console.log('in wifiInfo');
})

