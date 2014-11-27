'use strict';

angular.module('holybook').controller('BookReader',
    function ($scope, $stateParams, api) {

        var paragraphsPerPage = 50;
        $scope.pagination = {
            current: 1
        };

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
            });
        }

        $scope.pageChanged = function(newPage) {
            if (newPage !== $scope.pagination.current) {
                getParagraphs(newPage);
            }
        };

        getParagraphs(1);

    }
);
