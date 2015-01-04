'use strict';

angular.module('holybook').controller('Religion',
    function ($scope, $stateParams, api) {

        var ReligionCtrl = this;

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

        ReligionCtrl.authorsVisible = true;

        return $scope.ReligionCtrl = ReligionCtrl;

    }
);
