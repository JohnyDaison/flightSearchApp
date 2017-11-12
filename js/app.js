'use strict';

angular.module('flightSearchApp',  ['ui.router', 'ui.bootstrap', 'results', 'searchform'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('index', { 
            url: '/',
            views: { 
                'form': {
                    templateUrl: 'templates/searchform.html',
                    controller: 'SearchFormController'
                },
                'results': {
                    templateUrl: 'templates/results.html',
                    controller: 'ResultsController'
                }
            }
        })
  }]);
