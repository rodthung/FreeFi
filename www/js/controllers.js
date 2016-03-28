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
        icon: '../img/freefi-point-blue.png'
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

      for(var i = 0; i < 2500; i++) {
        $scope.markers.push({
          id: i,
          coords: {
            latitude: (Math.random() * (99 - (-99)) + 0.0200).toFixed(4),
            longitude: (Math.random() * (180 - (-180)) + 0.0200).toFixed(4)
          }
        })
      }
    });

  })

  .controller('addWifiLocationCtrl', function ($scope) {
    $scope.wifiPoint = {};

    navigator.geolocation.getCurrentPosition(function (position) {

      var geocoder = new google.maps.Geocoder();
      $scope.map = {
        center: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        events: {
          click: function (e) {
            //$scope.marker.coords.latitude = e.center.lat();
            //$scope.marker.coords.longitude = e.center.lng();
            //$scope.$apply();
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

    $scope.saveWifiPoint = function() {
      console.log($scope.wifiPoint);
    }
  })

  .controller('tutorialCtrl', function ($scope) {

  })
