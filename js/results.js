'use strict';

angular.module('results', [])
.controller('ResultsController', ['$scope', '$rootScope', function($scope, $rootScope) {

    $scope.results = [];
    $scope.orderType = 'dTime';
    
    $rootScope.$on('searchResultsEvent', function (evt, param) {
       $scope.results = param;
    });

}])
.filter('formatMoney', function () {
    
    return function (item) {
        var keys = Object.keys(item);
        return item[keys[0]] + ' ' + keys[0];
    };
});
