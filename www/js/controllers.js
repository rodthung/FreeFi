angular.module('app.controllers', [])

.controller('freeFiCtrl', function ($scope) {

})

.controller('loginCtrl', function ($scope) {

})

.controller('signupCtrl', function ($scope) {

})

.controller('mainCtrl', function ($scope, $rootScope, User, wifiFactory, $cordovaGeolocation, $http) {


    // Option for cordovaGeolocation
    var options = {
        timeout: 10000,
        enableHighAccuracy: true
    };

    //Get Current location
    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

        //----------------------- Search Map -----------------------//
        $rootScope.user = User;
        //$rootScope.user.firstname = "Vinoth";
        //Searching place
        var geocoder = new google.maps.Geocoder();

        // Get latitude and longitude
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        //Option for Map
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        //Create a map
        $rootScope.user.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        // Get All Wifi Spots
        wifiFactory.getAllSpots()
            .then(function (result) {
                var marker;
                var contentString = [];
                $scope.Markers = result.data;
                var infowindow = new google.maps.InfoWindow();


                for (var i = 0; i < $scope.Markers.length; i++) {

                    contentString[i] = '<div><b>Name: </b>' + $scope.Markers[i].name + '</div>' +
                        '<div><b>Wifi name: </b>' + $scope.Markers[i].wifiName + '</div>' +
                        '<div><b>Wifi password: </b>' + $scope.Markers[i].wifiPass + '</div>' +
                        '<div>' +
                        '<img class="like" src="img/like.png"><b>&nbsp;&nbsp;' + $scope.Markers[i].likes + '</b>&nbsp;&nbsp;' +
                        '<img class="unlike" src="img/dislike.png"><b>&nbsp;&nbsp;' + $scope.Markers[i].unlikes + '</b>' +
                        '</div>';
                    /*
                        '<button type="button" class="btn btn-success btn-sm" onclick="btnlike(\'' + $scope.Markers[i]._id + '\',\'' + marker + '\')">Like</button>' +
                        '<button type="button" id="btn-unlike" class="btn btn-danger btn-sm" onclick="btnunlike(\'' + $scope.Markers[i]._id + '\')">Unlike</button>';
                    */
                    marker = new google.maps.Marker({
                        id: i,
                        position: new google.maps.LatLng($scope.Markers[i].latitude, $scope.Markers[i].longitude),
                        map: $rootScope.user.map,
                        icon: 'img/freefi-point-blue.png'
                    });


                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infowindow.setContent(contentString[i]);
                            infowindow.open($rootScope.user.map, marker);
                        }
                    })(marker, i));

                }

            })

        //Function location change
        $scope.locationChanged = function (location) {
            geocoder.geocode({
                'address': location
            }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {

                    $rootScope.user.map.setOptions({
                        center: {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng()
                        },
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });
                }
            });
        };

        /*
        //----------------------------- Test with Browser --------------------------//

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
      },
            {
                "id": "570bc8f0275ed11100eb0e7c",
                "unlikes": 1,
                "likes": 6,
                "wifiPass": "Tankisthebest",
                "wifiName": "Tankwifi",
                "longitude": -118.13621886441803,
                "latitude": 34.08472317145596,
                "name": "El Rancho",
                "__v": 0
      }
    ]

        var contentString = [];
        var marker;
        var infowindow = new google.maps.InfoWindow();
        for (var i = 0; i < $scope.Markers.length; i++) {

            contentString[i] = '<div><b>Name: </b>' + $scope.Markers[i].name + '</div>' +
                '<div><b>Wifi name: </b>' + $scope.Markers[i].wifiName + '</div>' +
                '<div><b>Wifi password: </b>' + $scope.Markers[i].wifiPass + '</div>' +
                '<div>' +
                '<img class="like" src="img/like.png"><b>&nbsp;&nbsp;' + $scope.Markers[i].likes + '</b>&nbsp;&nbsp;' +
                '<img class="unlike" src="img/dislike.png"><b>&nbsp;&nbsp;' + $scope.Markers[i].unlikes + '</b>' +
                '</div>' +
                '<button type="button" class="btn btn-success btn-sm" onclick="btnlike(\'' + $scope.Markers[i].id + '\')">Like</button>' +
                '<button type="button" id="btn-unlike" class="btn btn-danger btn-sm" onclick="btnunlike(\'' + $scope.Markers[i].id + '\')">Unlike</button>';


            marker = new google.maps.Marker({
                id: i,
                position: new google.maps.LatLng($scope.Markers[i].latitude, $scope.Markers[i].longitude),
                map: $scope.map,
                icon: 'img/freefi-point-blue.png'
            });


            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(contentString[i]);
                    infowindow.open($scope.map, marker);
                }
            })(marker, i));

        }*/
        //----------------------------- Test with Mobile Phone --------------------------


    }, function (error) {
        console.log("Could not get location");
    });

    $scope.btnlike = function (marker) {

        console.log(marker);
        $http.post("https://salty-tor-54109.herokuapp.com/api/wifiSpot/like/" + marker._id)
            .then(function () {
                marker.likes++
            });
    };

    $scope.btnunlike = function (marker) {
        $http.post("https://salty-tor-54109.herokuapp.com/api/wifiSpot/unlike/" + marker._id)
            .then(function () {
                marker.unlikes++
            });
    };

    $scope.selectTab = function () {
        console.log("hello tab");
        wifiFactory.getAllSpots()
            .then(function (result) {
                var marker;
                var contentString = [];
                $scope.Markers = result.data;
                var infowindow = new google.maps.InfoWindow();


                for (var i = 0; i < $scope.Markers.length; i++) {

                    contentString[i] = '<div><b>Name: </b>' + $scope.Markers[i].name + '</div>' +
                        '<div><b>Wifi name: </b>' + $scope.Markers[i].wifiName + '</div>' +
                        '<div><b>Wifi password: </b>' + $scope.Markers[i].wifiPass + '</div>' +
                        '<div>' +
                        '<img class="like" src="img/like.png"><b>&nbsp;&nbsp;' + $scope.Markers[i].likes + '</b>&nbsp;&nbsp;' +
                        '<img class="unlike" src="img/dislike.png"><b>&nbsp;&nbsp;' + $scope.Markers[i].unlikes + '</b>' +
                        '</div>';
                    /*
                        '<button type="button" class="btn btn-success btn-sm" onclick="btnlike(\'' + $scope.Markers[i]._id + '\',\'' + marker + '\')">Like</button>' +
                        '<button type="button" id="btn-unlike" class="btn btn-danger btn-sm" onclick="btnunlike(\'' + $scope.Markers[i]._id + '\')">Unlike</button>';
                    */
                    marker = new google.maps.Marker({
                        id: i,
                        position: new google.maps.LatLng($scope.Markers[i].latitude, $scope.Markers[i].longitude),
                        map: $rootScope.user.map,
                        icon: 'img/freefi-point-blue.png'
                    });


                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infowindow.setContent(contentString[i]);
                            infowindow.open($rootScope.user.map, marker);
                        }
                    })(marker, i));

                }

            })

    };

})

.controller('addWifiLocationCtrl', function ($scope, $rootScope, User, wifiFactory, $cordovaGeolocation, $ionicPopup, $timeout) {




    //----------------------- Get Current Location -----------------------//
    $scope.wifiPoint = {};

    var options = {
        timeout: 10000,
        enableHighAccuracy: true
    };

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

        $rootScope.user = User;

        var geocoder = new google.maps.Geocoder();
        var addMap = new google.maps.Map(document.getElementById("addMap"));
        var marker = new google.maps.Marker();

        $scope.wifiPoint.lat = position.coords.latitude;
        $scope.wifiPoint.lon = position.coords.longitude;

        //----------------------- Change Marker location -----------------------//
        $scope.addLocationChanged = function (location) {
            geocoder.geocode({
                'address': location
            }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {

                    addMap.setOptions({
                        center: {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng()
                        }
                    })
                    marker.setOptions({
                        position: {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng()
                        }
                    })
                }
            });
        };

        //----------------------- Create Map -----------------------//
        addMap.setOptions({
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            zoom: 18,
        });

        addMap.addListener('click', function (e) {

            marker.setOptions({
                position: {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                }
            })
            console.log(e.latLng.lat() + " : " + e.latLng.lng());
        });

        //----------------------- Create Markers -----------------------//
        marker.setOptions({
            id: 0,
            position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            draggable: true,
            icon: 'img/freefi-point-mango.png',
            map: addMap

        });

        marker.addListener('dragend', function (e) {

            $scope.wifiPoint.lat = e.latLng.lat();
            $scope.wifiPoint.lon = e.latLng.lng();
            console.log(e.latLng.lat() + " : " + e.latLng.lng());

        });

    });

    //----------------------- Save Wifi Point -----------------------//

    $scope.showLocationNameError = false;
    $scope.showWifiNameError = false;
    $scope.showWifiPassError = false;

    var checkForm = function () {

        var result = true;

        if (!$scope.wifiPoint.locationName || $scope.wifiPoint.locationName == "") {
            result = false;
            $scope.showLocationNameError = true;
        } else {
            $scope.showLocationNameError = false;
        }

        if (!$scope.wifiPoint.wifiName || $scope.wifiPoint.wifiName == "") {
            result = false;
            $scope.showWifiNameError = true;
        } else {
            $scope.showWifiNameError = false;
        }

        if (!$scope.wifiPoint.pass || $scope.wifiPoint.pass == "") {
            result = false;
            $scope.showWifiPassError = true;
        } else {
            $scope.showWifiPassError = false;
        }

        return result;
    };

    $scope.saveWifiPoint = function () {

        //console.log($scope.wifiPoint);

        if (checkForm()) {
            wifiFactory.addSpot($scope.wifiPoint)
                .then(function (result) {
                    console.log(result.data);
                })

            wifiFactory.getAllSpots()
                .then(function (result) {
                    var marker;
                    var contentString = [];
                    var markers = result.data;
                    var infowindow = new google.maps.InfoWindow();


                    for (var i = 0; i < markers.length; i++) {

                        contentString[i] = '<div><b>Name: </b>' + markers[i].name + '</div>' +
                            '<div><b>Wifi name: </b>' + markers[i].wifiName + '</div>' +
                            '<div><b>Wifi password: </b>' + markers[i].wifiPass + '</div>' +
                            '<div>' +
                            '<img class="like" src="img/like.png"><b>&nbsp;&nbsp;' + markers[i].likes + '</b>&nbsp;&nbsp;' +
                            '<img class="unlike" src="img/dislike.png"><b>&nbsp;&nbsp;' + markers[i].unlikes + '</b>' +
                            '</div>';
                        /*
                            '<button type="button" class="btn btn-success btn-sm" onclick="btnlike(\'' + markers[i]._id + '\',\'' + marker + '\')">Like</button>' +
                            '<button type="button" id="btn-unlike" class="btn btn-danger btn-sm" onclick="btnunlike(\'' + markers[i]._id + '\')">Unlike</button>';*/

                        marker = new google.maps.Marker({
                            id: i,
                            position: new google.maps.LatLng(markers[i].latitude, markers[i].longitude),
                            map: $rootScope.user.map,
                            icon: 'img/freefi-point-blue.png'
                        });


                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {
                                infowindow.setContent(contentString[i]);
                                infowindow.open($rootScope.user.map, marker);
                            }
                        })(marker, i));

                    }

                })

            var alertPopup = $ionicPopup.alert({
                title: 'New Wifi Spot Added!',
                template: 'Thank you for sharing'
            });

            window.location = '#/index';
            //window.location.refresh()
            //$rootScope.$emit("CallParentMethod", {});
        } else {
            console.log("some error appeal");
        }


    }
})

/*function btnlike(marker) {
    console.log("LIKE!!!");
    console.log(marker.id);
    //console.log(marker);
    //angular.element(document.getElementById('mainCtrl')).scope().get();
    // httpPost("https://salty-tor-54109.herokuapp.com/api/wifiSpot/like/" + id);



}

function btnunlike(marker) {
    console.log("UNLIKE!!!");
    console.log(marker.id);
    //httpPost("https://salty-tor-54109.herokuapp.com/api/wifiSpot/unlike/" + id);
}*/

function httpPost(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}