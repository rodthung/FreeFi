angular.module('app.services', [])

.factory('wifiFactory', function($http){
    var factory = {};
    
    factory.getAllSpots = function(){
        return $http.get('https://salty-tor-54109.herokuapp.com/api/wifiSpot');
    }
    
    factory.addSpot = function(spot) {
        
        return $http.post('https://salty-tor-54109.herokuapp.com/api/wifiSpot', spot);
    }
    return factory;
    
})

.service('BlankService', [function(){

}]);

