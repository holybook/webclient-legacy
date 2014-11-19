'use strict';

angular.module('holybook').controller('Search',
    function ($scope, $http) {
        $http.get('http://localhost:9200/_public/search', {
            params : {
                q : 'portion of some'
            }
        }).success(function(data) {
            $scope.search = data;
        });
    }
);
