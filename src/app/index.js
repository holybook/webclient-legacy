'use strict';

angular.module('holybook', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.bootstrap', 'ui.router', 'angularUtils.directives.dirPagination', 'angular-loading-bar', 'duScroll', 'errors'])
    .config(function ($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

        $urlRouterProvider.otherwise('/search');

        //$locationProvider.html5Mode(true);
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
                url: '/',
                templateUrl: 'app/reader/book.browser.html',
                controller: 'BookBrowser'
            })
            .state('book.reader', {
                url: '/:id?page&select',
                templateUrl: 'app/reader/book.reader.html',
                controller: 'BookReader'
            })
            .state('roadmap', {
                url: '/roadmap',
                templateUrl: 'app/roadmap/roadmap.html'
            });

        cfpLoadingBarProvider.includeSpinner = false;

    }
);

if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) === str;
    };
}
