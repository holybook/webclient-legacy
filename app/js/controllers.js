var holybook = angular.module('holybook', ['ngSanitize']);

holybook.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
});

holybook.controller('SearchController', ['$scope', '$http',
    function ($scope, $http) {
        $http.get("http://localhost:9200/_public/search", {
            params : {
                q : "portion of some"
            }
        }).success(function(data) {
            $scope.search = data;
        });
    }
]);
