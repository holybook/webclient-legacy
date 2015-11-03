'use strict';

angular.module('holybook').controller('BrowseRoot',
    function ($scope, api) {

        var BrowserCtrl = this;

        api.religion.query({
            language: "en"
        }, function (religions) {
            console.log(religions);
            BrowserCtrl.religions = religions;
        });

        return $scope.BrowserCtrl = BrowserCtrl;

    }
);
