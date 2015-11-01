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
        }

    };

});
