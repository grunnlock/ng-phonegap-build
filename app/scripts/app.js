'use strict';

/**
 * @ngdoc overview
 * @name ngApp
 * @description
 * # ngApp
 *
 * Main module of the application.
 */
angular
  .module('ngApp', [
    'ngAnimate',
    'ngRoute',
    'ngTouch',
    'snap'
  ])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .controller('ContainerCtrl', function ($scope, $location) {

    $scope.$on('$routeChangeStart', function(next, current) { 
      $scope.currentPage = $location.path();
    });

    // Set .view-container height
    $scope.viewHeight = $(window).height() - $('.navbar').height();

    // Side menu
    $scope.snapOptions = {
      disable: 'right'
    };

  });
