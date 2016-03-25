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

        var events = {
            places_changed: function (searchBox) {}
        }
        $scope.searchbox = {
            template: 'searchbox.tpl.html',
            events: events
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

})

.controller('tutorialCtrl', function ($scope) {

})