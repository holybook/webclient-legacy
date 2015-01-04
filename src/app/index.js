'use strict';

angular.module('holybook', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.bootstrap', 'ui.router', 'angular-loading-bar', 'errors', 'bb.scrollWhen'])
    .config(function ($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider, pagerConfig, cfpLoadingBarProvider) {

        $urlRouterProvider.otherwise('/search');

        //$locationProvider.html5Mode(true);
        $stateProvider
            .state('search', {
                url: '/search?q&page',
                templateUrl: 'app/search/search.html',
                controller: 'Search',
                reloadOnSearch: false
            })
            .state('book', {
                abstract: true,
                url: '/browse',
                templateUrl: 'app/reader/reader.html'
            })
            .state('book.browser.root', {
                url: '/',
                templateUrl: 'app/reader/book.browser.html',
                controller: 'BookBrowser'
            })
            .state('book.browser.religion', {
                url: '/religion/:id',
                templateUrl: 'app/reader/book.browser.religion.html',
                controller: 'BrowseReligion'
            })
            .state('book.reader', {
                url: '/book/:id?page&select',
                templateUrl: 'app/reader/book.reader.html',
                controller: 'BookReader'
            })
            .state('roadmap', {
                url: '/roadmap',
                templateUrl: 'app/roadmap/roadmap.html'
            });

        cfpLoadingBarProvider.includeSpinner = false;

        pagerConfig.previousText = "&lsaquo;";
        //{
        //    'previous-text' : "&lsaquo;",
        //    'next-text' : "&rsaquo;",
        //    'first-text' : "&laquo;",
        //    'last-text' :"&raquo;"
        //};

    }
);

if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) === str;
    };
}
