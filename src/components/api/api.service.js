'use strict';

angular.module('holybook').factory('api', function ($http, $resource) {

    var basePath = 'http://localhost:3030'; // Todo: Generalize

    function path(suffix) {
        return basePath + suffix;
    }

    var service = {

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

        wiki: function(obj) {
            return $http.jsonp('http://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    format: 'json',
                    prop: 'extracts|pageimages|info',
                    piprop: 'thumbnail|name|original',
                    pithumbsize: 500,
                    inprop: 'url',
                    exchars: '500',
                    exintro: '',
                    explaintext: '',
                    pageids: obj.wikipedia_id,
                    callback: 'JSON_CALLBACK'
                }
            }).then(function (res) {
                return res.data.query.pages[obj.wikipedia_id];
            }).then(function (res) {
                console.log(res);
                obj.title = obj.title || res.title;
                obj.extract = res.extract;
                obj.wikipedia = res.fullurl;
                if (res.thumbnail) {
                    obj.picture = obj.picture || res.thumbnail.source;
                }

                return obj;
            });

        }

    };

    return service;

});
