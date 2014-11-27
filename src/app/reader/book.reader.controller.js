'use strict';

angular.module('holybook').controller('BookReader',
    function ($scope, $stateParams, api) {

        $scope.result = api.book.get({
           language : $stateParams.language,
            religion : $stateParams.religion,
            author : $stateParams.author,
            title : $stateParams.title
        });

    }
);
