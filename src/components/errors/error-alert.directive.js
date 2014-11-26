'use strict';

angular.module('errors').directive('mjHttpError',
    function() {
        return {
            restrict: 'E',
            controller: function($scope) {
                $scope.httpError = null;

                $scope.$on('http-error', function(event, cause) {
                    $scope.httpError = cause;
                });

                $scope.close = function() {
                    $scope.httpError = null;
                };
            },
            templateUrl: 'components/errors/error-alert.html'
        };
    }
);