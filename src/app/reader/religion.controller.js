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
            api.wiki(ReligionCtrl.religion.wikipedia_id).then(function(response) {
                console.log(response);
                ReligionCtrl.religion.title = response.title;
                ReligionCtrl.religion.extract = response.extract;
                ReligionCtrl.religion.wikipedia = response.fullurl;

                api.wikiImg(response.images[0].title).then(function (response) {
                    console.log(response);
                    ReligionCtrl.religion.picture = response;
                });
            });
        });

        api.author.query({
            language: "en",
            religion: $stateParams.id
        }, function (authors) {
            ReligionCtrl.authors = authors;
        });

        ReligionCtrl.page = 1;
        ReligionCtrl.authorsVisible = true;

        return $scope.ReligionCtrl = ReligionCtrl;

    }
);
