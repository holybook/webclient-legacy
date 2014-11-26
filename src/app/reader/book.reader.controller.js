'use strict';

angular.module('holybook').controller('BookReader',
    function ($scope, $stateParams) {
        $scope.book = {
            id: $stateParams.id
        };
    }
);
