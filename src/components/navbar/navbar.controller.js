'use strict';

angular.module('holybook').controller('NavigationController',
    function ($scope, $location) {
        $scope.menuClass = function(page) {
            var current = $location.path();
            return (page.length > 1 && current.startsWith(page)) || (current == page) ? 'active' : '';
        };
    }
);
