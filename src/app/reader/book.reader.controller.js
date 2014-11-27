'use strict';

angular.module('holybook').controller('BookReader',
    function ($scope, $stateParams, $location, $anchorScroll, api) {

        $scope.$watch(function () { return $location.search(); }, function() {
            $scope.pagination = {
                current: parseInt($location.search().page)
            };
            getParagraphs($scope.pagination.current);
        });

        $scope.$watch('pagination.current', function(page) {
            $location.search('page', page);
            getParagraphs(page);
        });

        var paragraphsPerPage = 50;
        function getParagraphs(page) {
            api.book.get({
                language: $stateParams.language,
                religion: $stateParams.religion,
                author: $stateParams.author,
                title: $stateParams.title,
                from: (page - 1)*paragraphsPerPage,
                size: paragraphsPerPage
            }, function (data) {
                $scope.book = data.book;
                $scope.pagination.current = page;
                $scope.pagination.total = Math.ceil(data.paragraphs / paragraphsPerPage);
                $scope.hasResult = true;
                $anchorScroll();
            });
        }

        $scope.nextPage = function() {
            $location.search('page', ++$scope.pagination.current);

        };

        $scope.prevPage = function() {
            $location.search('page', --$scope.pagination.current);
            //getParagraphs($scope.pagination.current);
        };



        //getParagraphs($scope.pagination.current);

    }
);
