'use strict';
angular.module('holybook', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'angular-loading-bar',
    'errors',
    'bb.scrollWhen',
    'angulartics',
    'angulartics.google.analytics'
])
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
            .state('browse', {
                abstract: true,
                url: '/browse',
                templateUrl: 'app/reader/browser.html'
            })
            .state('browse.root', {
                url: '/',
                templateUrl: 'app/reader/browse.html',
                controller: 'BrowseRoot'
            })
            .state('browse.religion', {
                url: '/religion/:id',
                templateUrl: 'app/reader/religion.html',
                controller: 'Religion'
            })
            .state('browse.author', {
                url: '/author/:id',
                templateUrl: 'app/reader/author.html',
                controller: 'Author'
            })
            .state('browse.book', {
                url: '/book/:id?page&select',
                templateUrl: 'app/reader/book.html',
                controller: 'Book'
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
