'use strict';

angular.module('holybook', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.bootstrap', 'ui.router', 'angularUtils.directives.dirPagination'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/search");

        $stateProvider
            .state('search', {
                url: '/search',
                templateUrl: 'app/search/search.html',
                controller: 'Search'
            })
            .state('book', {
                abstract: true,
                url: '/book',
                templateUrl: 'app/reader/reader.html'
            })
            .state('book.browser', {
                url: "/",
                templateUrl: 'app/reader/book.browser.html',
                controller: 'BookBrowser'
            })
            .state('book.reader', {
                url: "/:id",
                templateUrl: 'app/reader/book.reader.html',
                controller: 'BookReader'
            })
            .state('roadmap', {
                url: '/roadmap',
                templateUrl: 'app/roadmap/roadmap.html'
            });

    }
);

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}