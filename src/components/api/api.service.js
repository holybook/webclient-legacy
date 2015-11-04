'use strict';

angular.module('holybook').factory('api', function ($http, $resource) {

    var basePath = 'http://localhost:3030/api'; // Todo: Generalize

    function path(suffix) {
        return basePath + suffix;
    }

    var service = {

            book: $resource(path('/book/:id')),

            author: $resource(path('/author/:id')),

            religion: $resource(path('/religion/:id')),

            text: function (args) {
                return $http.get(path('/book/' + args.id + '/text'), {
                    params: {
                        from: args.from,
                        size: args.size
                    }
                });
            },

            search: function (page, query, searchResultsPerPage) {
                return $http.get(path('/search'), {
                    params: {
                        q: query,
                        from: (page - 1) * searchResultsPerPage,
                        size: searchResultsPerPage
                    }
                });
            },

            total: function (headers) {
                return headers('pagination-total');
            },

            wiki: function (objs, thumbsize) {
                if (!_.isArray(objs)) {
                    objs = [objs];
                }
                var pageids = _.compact(_.map(objs, function (o) {
                    return o.wikipedia_id;
                }));
                if (pageids.length > 0) {
                    return $http.jsonp('http://en.wikipedia.org/w/api.php', {
                        params: {
                            action: 'query',
                            format: 'json',
                            prop: 'extracts|pageimages|info',
                            piprop: 'thumbnail|name|original',
                            pithumbsize: thumbsize || 256,
                            pilimit: 100,
                            inprop: 'url',
                            exchars: '500',
                            exintro: '',
                            explaintext: '',
                            pageids: pageids.join('|'),
                            callback: 'JSON_CALLBACK'
                        }
                    }).then(function (res) {
                        return res.data.query.pages;
                    }).then(function (res) {
                        console.log(res);
                        console.log(objs);
                        return _.map(objs, function (o) {
                            var r = res[o.wikipedia_id];
                            if (r) {
                                o.title = o.title || r.title;
                                o.extract = r.extract;
                                o.wikipedia = r.fullurl;
                                if (r.thumbnail) {
                                    o.picture = o.picture || r.thumbnail.source;
                                }
                            }
                            return o;
                        });
                    });
                }
            }

        };

    return service;

})
;
