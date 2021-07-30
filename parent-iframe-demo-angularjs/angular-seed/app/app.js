'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'iframe',
  'myApp.version'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.when('/view1',{
    templateUrl:'views/view1/view1.html'
  })
  .when('/view2',{
    templateUrl:'views/view2/view2.html'
  })
  .when('/iframes',{
    templateUrl:'views/iframe/iframe.html',
    controller: 'DemoCtrl'
  })
}]);
