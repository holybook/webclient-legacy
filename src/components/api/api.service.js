'use strict';

angular.module('holybook').factory('api', function ($http, $resource) {

    var basePath = 'http://localhost:9200/_public'; // Todo: Generalize

    function path(suffix) {
        return basePath + suffix;
    }

    return {

        book : $resource(path('/:language/book/:id')),

        author : $resource(path('/:language/author/:id')),

        religion : $resource(path('/:language/religion/:id')),

        text : function(args) {
            return $http.get(path("/" + args.language +"/book/" + args.id + "/text"), {
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
        }

    };

});
