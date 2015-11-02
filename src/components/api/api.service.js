'use strict';

angular.module('holybook').factory('api', function ($http, $resource) {

    var basePath = 'http://localhost:3030'; // Todo: Generalize

    function path(suffix) {
        return basePath + suffix;
    }

    return {

        book : $resource(path('/book/:id')),

        author : $resource(path('/author/:id')),

        religion : $resource(path('/religion/:id')),

        text : function(args) {
            return $http.get(path("/book/" + args.id + "/text"), {
                params : {
                    from : args.from,
                    size : args.size
                }
            });
        },

        search : function(page, query, searchResultsPerPage) {
            return $http.get(path('/search'), {
                params : {
                    q : query,
                    from : (page - 1)*searchResultsPerPage,
                    size : searchResultsPerPage
                }
            });
        },

        total : function(headers) {
            return headers('pagination-total');
        },

        wiki: function(id) {
            return $http.jsonp('http://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    format: 'json',
                    prop: 'extracts|images|info',
                    imlimit: '1',
                    inprop: 'url',
                    exchars: '500',
                    exintro: '',
                    explaintext: '',
                    pageids: id,
                    callback: 'JSON_CALLBACK'
                }
            }).then(function (res) {
                return res.data.query.pages[id];
            });

            //https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&pageids=4251

        },

        wikiImg: function(title) {

            return $http.jsonp('http://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    format: 'json',
                    prop: 'imageinfo',
                    iiprop: 'url',
                    iiurlwidth: 500,
                    imlimit: '1',
                    titles: title,
                    callback: 'JSON_CALLBACK'
                }
            }).then(function (res) {
                return res.data.query.pages['-1'].imageinfo[0].thumburl;
            });


            //w/api.php?action=query&prop=imageinfo&format=json&iiprop=url&titles=File%3A051907%20Wilmette%20IMG%201404%20The%20Greatest%20Name.jpg
        }

    };

});
