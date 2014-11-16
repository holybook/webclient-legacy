var controllers = angular.module('controllers', ['ngSanitize']);

controllers.controller('SearchController', ['$scope', '$http',
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

controllers.controller('BookController', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.book.id = $routeParams.id;
    }
]);