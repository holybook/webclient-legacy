'use strict';

angular.module('holybook').controller('Book',
    function ($scope, $stateParams, $location, $anchorScroll, $document, api, utils) {

        var BookCtrl = this;

        var paragraphsPerPage = 25;

        utils.connect($scope, 'BookCtrl.pagination.current', 'page', function(page) {
            getParagraphs(page);
        }, parseInt);

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

            BookCtrl.book = book;
            BookCtrl.pagination.total = Math.ceil(book.paragraphs / paragraphsPerPage);
        });

        function insertText(text) {
            var startIndex = (BookCtrl.pagination.current - 1)*paragraphsPerPage;
            var endIndex = startIndex + paragraphsPerPage;
            BookCtrl.visibleSections = Lazy(BookCtrl.book.sections).reduce(function(agg, section) {
                if (section.start <= startIndex && section.end > startIndex) {
                    agg.push({
                        'start' : section.start,
                        'offset' : startIndex - section.start,
                        'text' : text.slice(0, Math.min(section.end, endIndex) - startIndex),
                        'title' : section.title
                    });
                } else if (section.start >= startIndex && section.start < endIndex) {
                    agg.push({
                        'start' : section.start,
                       'offset' : 0,
                        'text' : text.slice(section.start - startIndex, Math.min(section.end, endIndex) - startIndex),
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
                BookCtrl.hasResult = true;

                insertText(text);

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
            console.log(BookCtrl.absIndex(section, $index));
            return (BookCtrl.selected == BookCtrl.absIndex(section, $index));
        };

        BookCtrl.selectedClass = function(section, $index) {
            return BookCtrl.isSelected(section, $index) ? 'book-paragraph-selected' : '';
        };

        return $scope.BookReaderCtrl = BookCtrl;

    }
);
