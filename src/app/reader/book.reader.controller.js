'use strict';

angular.module('holybook').controller('BookReader',
    function ($scope, $stateParams, $location, $anchorScroll, $document, api, utils) {

        var BookReaderCtrl = this;

        var paragraphsPerPage = 25;

        utils.connect($scope, 'BookReaderCtrl.pagination.current', 'page', function(page) {
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

            BookReaderCtrl.book = book;
            BookReaderCtrl.pagination.total = Math.ceil(book.paragraphs / paragraphsPerPage);
        });

        function insertText(text) {
            var startIndex = (BookReaderCtrl.pagination.current - 1)*paragraphsPerPage;
            var endIndex = startIndex + paragraphsPerPage;
            BookReaderCtrl.visibleSections = Lazy(BookReaderCtrl.book.sections).reduce(function(agg, section) {
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
                BookReaderCtrl.hasResult = true;

                insertText(text);

                if (typeof($stateParams.select) !== 'undefined') {
                    BookReaderCtrl.selected = $stateParams.select;
                }
            });
        }

        BookReaderCtrl.absIndex = function(section, $index) {
            return $index + section.start;
        };

        BookReaderCtrl.nextPage = function() {
            $location.search({
                'page' : ++BookReaderCtrl.pagination.current,
                'select' : undefined
            });
        };

        BookReaderCtrl.prevPage = function() {
            $location.search({
                'page' : --BookReaderCtrl.pagination.current,
                'select' : undefined
            });
        };

        BookReaderCtrl.isSelected = function(section, $index) {
            console.log(BookReaderCtrl.absIndex(section, $index));
            return (BookReaderCtrl.selected == BookReaderCtrl.absIndex(section, $index));
        };

        BookReaderCtrl.selectedClass = function(section, $index) {
            return BookReaderCtrl.isSelected(section, $index) ? 'book-paragraph-selected' : '';
        };

        return $scope.BookReaderCtrl = BookReaderCtrl;

    }
);
