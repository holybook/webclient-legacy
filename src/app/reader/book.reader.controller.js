'use strict';

angular.module('holybook').controller('BookReader',
    function ($scope, $stateParams, $location, $anchorScroll, $document, api) {

        var paragraphsPerPage = 25;

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

        api.book.get({
            language: "en",
            id: $stateParams.id
        }, function (book) {

            for (var i in book.sections) {
                if (i > 0) {
                    book.sections[i - 1].end = book.sections[i].start;
                }
            }
            book.sections[book.sections.length - 1].end = book.paragraphs;

            $scope.book = book;
            $scope.pagination.total = Math.ceil(book.paragraphs / paragraphsPerPage);
        });

        function insertText(text) {
            var startIndex = ($scope.pagination.current - 1)*paragraphsPerPage;
            var endIndex = startIndex + paragraphsPerPage;
            $scope.visibleSections = Lazy($scope.book.sections).reduce(function(agg, section) {
                if (section.start <= startIndex && section.end >= startIndex) {
                    agg.push({
                        'offset' : startIndex - section.start,
                        'text' : text.slice(0, Math.min(section.end, endIndex)),
                        'title' : section.title
                    });
                } else if (section.start >= startIndex && section.start < endIndex) {
                    agg.push({
                       'offset' : 0,
                        'text' : text.slice(section.start - startIndex, Math.min(section.end, endIndex)),
                        'title' : section.title
                    });
                }
                return agg;
            }, []);
        }

        function getParagraphs(page) {
            api.text({
                language: "en",
                id: $stateParams.id,
                from: (page - 1)*paragraphsPerPage,
                size: paragraphsPerPage
            }).success(function (text) {
                $scope.hasResult = true;

                insertText(text);

                if (typeof($stateParams.select) !== 'undefined') {
                    $scope.selected = $stateParams.select;
                    var paragraphElement = angular.element(document.getElementById($stateParams.select));
                    $document.scrollToElement(paragraphElement, 0, 1000);
                }
                $anchorScroll();
            });
        }

        $scope.absIndex = function($index) {
            return $index + ($scope.pagination.current-1)*25;
        }

        $scope.nextPage = function() {
            $location.search('page', ++$scope.pagination.current);
        };

        $scope.prevPage = function() {
            $location.search('page', --$scope.pagination.current);
        };

        $scope.isSelected = function($index) {
            return ($scope.selected == $scope.absIndex($index)) ? 'book-paragraph-selected' : ''
        };

    }
);
