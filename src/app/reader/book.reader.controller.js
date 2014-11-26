'use strict';

angular.module('holybook').controller('BookReader',
    function ($scope, $stateParams, $http) {

        var path = 'http://localhost:9200/_public/book/' +
                $stateParams.language + "/" +
                $stateParams.religion + "/" +
                $stateParams.author + "/" +
                $stateParams.book;

        $http.get(path).success(function(data) {
            $scope.book = data.book;
        });
    }
);
