'use strict';

angular.module('holybook').factory('utils', function ($location) {

    function set($scope, path, val) {
        var len = path.length;
        var lpath = Lazy(path);
        var obj = lpath.first(len - 1).reduce(function(obj, key) {
            return obj[key];
        }, $scope);
        obj[path[len-1]] = val;
    }

    return {

        connect : function($scope, field, queryField, onChange) {

            var path = field.split(".");

            $scope.$watch(
                function () {
                    return $location.search();
                },
                function() {
                    var newValue = $location.search()[queryField];
                    set($scope, path, newValue);
                    onChange(newValue);
                }
            );

            $scope.$watch(field, function (newValue) {
                $location.search(queryField, newValue);
                onChange();
            });
        }

    };

});
