'use strict';

angular.module('searchform', [])
.controller('SearchFormController', [ '$scope', '$rootScope', '$http', '$filter', function ($scope, $rootScope, $http, $filter) {
    
  var locale = 'en';
  var whisperLimit = 20;
  var daysAhead = 400;

  $scope.fromSelected = undefined;
  $scope.toSelected = undefined;
  $scope.popupsOpen = [];
  $scope.interval = false;
  
  $scope.getLocation = function(val) {
    return $http.get('https://api.skypicker.com/places', {
      params: {
        term: val,
        v: 2,
        locale: locale
      }
    }).then(function(response) {
      var firstData = [];
      if(response.data) {
          firstData = response.data.slice(0, whisperLimit);
      }

      return firstData;
    });
  };
  
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(new Date().valueOf() + (daysAhead * 24 * 60 * 60 * 1000)),
    minDate: new Date(),
    startingDay: 1
  };

  $scope.openPopup = function(index) {
    $scope.popupsOpen[index] = true;
  };

  $scope.format = 'shortDate';
  $scope.altInputFormats = ['M!/d!/yyyy'];

  
  $scope.getLocation = function(val) {
    return $http.get('https://api.skypicker.com/places', {
      params: {
        term: val,
        v: 2,
        locale: locale
      }
    }).then(function(response) {
      var firstData = [];
      if(response.data) {
          firstData = response.data.slice(0, whisperLimit);
      }

      return firstData;
    });
  };
  
  $scope.search = function() {
      var startDate = $filter('date')($scope.startDate, "dd/MM/yyyy");
      var endDate = $filter('date')($scope.endDate, "dd/MM/yyyy");
      
      $http.get('https://api.skypicker.com/flights', {
      params: {
        v: 2,
        locale: locale,
        flyFrom: $scope.fromSelected && $scope.fromSelected.id,
        to: $scope.toSelected && $scope.toSelected.id,
        dateFrom: startDate,
        dateTo: ($scope.interval ? endDate : startDate)
      }
    }).then(function(response) {
      var results = [];
      
      if(response.data && response.data.data) {
          results = response.data.data;
      }
      
      $rootScope.$broadcast('searchResultsEvent', results);
    });
      
  };

}]);