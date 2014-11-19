'use strict';

angular.module('holybook').controller('BookReader',
    function ($scope, $routeParams) {
        $scope.book = {
            id: $routeParams.id
        };
    }
);
