'use strict';

angular.module('holybook').factory('utils', function ($location) {

    function set($scope, parse, path, val) {
        var len = path.length;
        var lpath = Lazy(path);
        var obj = lpath.first(len - 1).reduce(function(obj, key) {
            if (!obj[key]) {
                obj[key] = {};
            }
            return obj[key];
        }, $scope);
        obj[path[len-1]] = parse(val);
    }

    return {

        connect : function($scope, field, queryField, onChange, parse) {

            if (typeof(parse) === 'undefined') {
                parse = function(v) {
                    return v;
                }
            }

            var path = field.split(".");

            $scope.$watch(
                function () {
                    return $location.search()[queryField];
                },
                function(newValue) {
                    set($scope, parse, path, newValue);
                }
            );

            $scope.$watch(field, function (newValue) {
                $location.search(queryField, newValue);
                onChange(newValue);
            });
        }

    };

});
