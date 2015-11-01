'use strict';

angular.module('holybook').controller('Religion',
    function ($scope, $stateParams, api) {

        var ReligionCtrl = this;

        $scope.$watch('ReligionCtrl.page', function(page) {
            if (page !== undefined) {
                api.book.query({
                    language: "en",
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
            language: "en",
            id: $stateParams.id
        }, function (religion) {
            ReligionCtrl.religion = religion;
        });

        api.author.query({
            language: "en",
            religion: $stateParams.id
        }, function (authors) {
            ReligionCtrl.authors = authors;
        });

        ReligionCtrl.page = 1;
        ReligionCtrl.authorsVisible = true;

        api.wiki().then(function(response) {
            console.log(response);
            ReligionCtrl.religion.title = response.title;
            ReligionCtrl.religion.extract = response.extract;

            api.wikiImg(response.images[0].title).then(function (response) {
               console.log(response);
                ReligionCtrl.religion.picture = response;
            });
        });

        return $scope.ReligionCtrl = ReligionCtrl;

    }
);
