'use strict';

angular.module('holybook').controller('Book',
    function ($scope, $stateParams, $location, $anchorScroll, $document, api, utils) {

        var BookCtrl = this;

        var paragraphsPerPage = 25;

        BookCtrl.pagination = {
            current: 1,
            total: 0
        };

        utils.connect($scope, 'BookCtrl.pagination.current', 'page', function(page) {
            if (page !== undefined && !isNaN(page)) {
                getParagraphs(page);
            }
        }, parseInt);

        api.book.get({
            language: 'en',
            id: $stateParams.id
        }, function (book) {
            BookCtrl.book = book;
            BookCtrl.pagination.total = Math.ceil(book.paragraphs / paragraphsPerPage);
        });

        function getParagraphs(page) {
            api.text({
                language: 'en',
                id: $stateParams.id,
                from: (page - 1)*paragraphsPerPage,
                size: paragraphsPerPage
            }).success(function (sections) {
                BookCtrl.sections = sections;
                if (typeof($stateParams.select) !== 'undefined') {
                    BookCtrl.selected = $stateParams.select;
                }
            });
        }

        BookCtrl.absIndex = function(section, $index) {
            return $index + section.start;
        };

        BookCtrl.nextPage = function() {
            $location.search({
                'page' : ++BookCtrl.pagination.current,
                'select' : undefined
            });
        };

        BookCtrl.prevPage = function() {
            $location.search({
                'page' : --BookCtrl.pagination.current,
                'select' : undefined
            });
        };

        BookCtrl.isSelected = function(section, $index) {
            return (BookCtrl.selected === BookCtrl.absIndex(section, $index));
        };

        BookCtrl.selectedClass = function(section, $index) {
            return BookCtrl.isSelected(section, $index) ? 'book-paragraph-selected' : '';
        };

        $scope.BookCtrl = BookCtrl;
        return BookCtrl;

    }
);
