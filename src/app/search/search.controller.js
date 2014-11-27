'use strict';

angular.module('holybook').controller('Search',
    function ($scope, api) {

        $scope.hasResult = false;

        $scope.searchResultsPerPage = 25; // this should match however many results your API puts on one page
        $scope.pagination = {
            current: 1
        };

        $scope.search = function(page) {
            api.search(page, $scope.query, $scope.searchResultsPerPage).success(
                function(data) {
                    $scope.searchResult = data;
                    $scope.pagination.current = page;
                    $scope.hasResult = true;
                }
            );
        };

        $scope.pageChanged = function(newPage) {
            if (newPage !== $scope.pagination.current) {
                $scope.search(newPage);
            }
        };

    }
);
