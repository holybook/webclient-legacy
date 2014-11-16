var holybook = angular.module('holybook', ['ngRoute', 'controllers']);

holybook.config(['$routeProvider', function($routeProvider) {
    //Enable cross domain calls
    //$httpProvider.defaults.useXDomain = true;

    $routeProvider.
        when('/search', {
            templateUrl: 'partials/search.html',
            controller: 'SearchController'
        }).
        when('/book/:id', {
            templateUrl: 'partials/book.html',
            controller: 'BookController'
        }).
        when('/roadmap', {
            templateUrl: 'partials/roadmap.html'
        }).
        otherwise({
            redirectTo: '/search'
        });
}]);