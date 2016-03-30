angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      //.state('freeFi', {
      //  url: '/index',
      //  templateUrl: 'templates/freeFi.html',
      //  controller: 'freeFiCtrl'
      //})

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      })

      .state('freeFi', {
        url: '/index',
        templateUrl: 'templates/main.html',
        controller: 'mainCtrl'
      })

      .state('addWifiLocation', {
        url: '/add',
        templateUrl: 'templates/addWifiLocation.html',
        controller: 'addWifiLocationCtrl'
      })

      .state('tutorial', {
        url: '/tutorial',
        templateUrl: 'templates/tutorial.html',
        controller: 'tutorialCtrl'
      })

    $urlRouterProvider.otherwise('/index')
  });
