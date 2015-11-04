'use strict';

angular.module('holybook').controller('Author',
    function ($scope, $stateParams, api) {

        var AuthorCtrl = this;

        $scope.$watch('AuthorCtrl.page', function(page) {
            if (page !== undefined) {
                api.book.query({
                    language: 'en',
                    author: $stateParams.id,
                    from: (page - 1) * 25,
                    size: 25
                }, function (books, headers) {
                    AuthorCtrl.books = books;
                    AuthorCtrl.booksTotal = api.total(headers);
                });
            }
        });

        api.author.get({
            language: 'en',
            id: $stateParams.id
        }, function (author) {
            AuthorCtrl.author = author;
            return api.wiki(AuthorCtrl.author);
        });

        AuthorCtrl.page = 1;

        $scope.AuthorCtrl = AuthorCtrl;

        return AuthorCtrl;
    }
);
