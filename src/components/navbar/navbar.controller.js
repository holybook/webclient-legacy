'use strict';

angular.module('holybook').controller('NavigationController',
    function ($scope, $state) {
        $scope.menuClass = function(s) {
            return $state.includes(s) ? 'active' : '';
        };
    }
);
