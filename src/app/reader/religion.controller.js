'use strict';

angular.module('holybook').controller('Religion',
    function ($scope, $stateParams, api) {

        var ReligionCtrl = this;

        $scope.$watch('ReligionCtrl.page', function(page) {
            if (page !== undefined) {
                api.book.query({
                    language: 'en',
                    religion: $stateParams.id,
                    from: (page - 1) * 25,
                    size: 25
                }, function (books, headers) {
                    ReligionCtrl.books = books;
                    ReligionCtrl.booksTotal = api.total(headers);
                });
            }
        });

        api.religion.get({
            language: 'en',
            id: $stateParams.id
        }, function (religion) {
            ReligionCtrl.religion = religion;
            return api.wiki(ReligionCtrl.religion);
        });

        api.author.query({
            language: 'en',
            religion: $stateParams.id
        }, function (authors) {
            ReligionCtrl.authors = authors;
            return api.wiki(ReligionCtrl.authors, 200);
        });

        ReligionCtrl.page = 1;
        ReligionCtrl.authorsVisible = true;

        $scope.ReligionCtrl = ReligionCtrl;

        return ReligionCtrl;
    }
);
