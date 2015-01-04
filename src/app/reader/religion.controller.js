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

        return $scope.ReligionCtrl = ReligionCtrl;

    }
);
