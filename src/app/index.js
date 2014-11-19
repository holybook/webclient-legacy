'use strict';

angular.module('holybook', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap'])
    .config(function ($routeProvider) {

        $routeProvider.
            when('/', {
                templateUrl: 'app/search/search.html',
                controller: 'Search'
            }).
            when('/book', {
                templateUrl: 'app/reader/book.browser.html',
                controller: 'BookBrowser'
            }).
            when('/book/:id', {
                templateUrl: 'app/reader/book.reader.html',
                controller: 'BookReader'
            }).
            when('/roadmap', {
                templateUrl: 'app/roadmap/roadmap.html'
            }).
            otherwise({
                redirectTo: '/'
            });

    }
);

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}