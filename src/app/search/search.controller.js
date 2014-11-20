'use strict';

angular.module('holybook').controller('Search',
    function ($scope, $http) {
        $scope.search = function() {
            $http.get('http://localhost:9200/_public/search', {
                params : {
                    q : $scope.query
                }
            }).success(function(data) {
                $scope.searchResult = data;
            });
        }
    }
);
