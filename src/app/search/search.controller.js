'use strict';

angular.module('holybook').factory('searchConfig', function () {

    return {
        searchResultsPerPage : 25 // this should match however many results your API puts on one page
    };

});

angular.module('holybook').controller('Search',
    function ($scope, $state, $urlRouter, $stateParams, api, utils, searchConfig) {

        var SearchCtrl = this;

        function search() {
            api.search(SearchCtrl.page, SearchCtrl.query, SearchCtrl.searchResultsPerPage).success(
                function(data) {
                    SearchCtrl.result = data;
                    SearchCtrl.hasResult = true;
                }
            );
        }

        SearchCtrl.searchResultsPerPage = searchConfig.searchResultsPerPage;
        SearchCtrl.page = parseInt($stateParams.page) || 1;
        SearchCtrl.query = $stateParams.q;
        SearchCtrl.hasResult = false;

        if (typeof(SearchCtrl.query) !== 'undefined') {
            search();
        }

        SearchCtrl.pageChanged = function() {
            //$state.go("search", {
            //    q : SearchCtrl.query,
            //    page : SearchCtrl.page
            //});
        };

        SearchCtrl.pageFromIndex = function(index) {
            return Math.floor(index / 25) + 1; // todo link pagination configuration from reader
        };

        utils.connect($scope, 'SearchCtrl.page', 'page', function() {
            search();
        });

        return $scope.SearchCtrl = SearchCtrl;

    }
);
