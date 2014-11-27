'use strict';

angular.module('holybook').factory('api', function ($http, $resource) {

    var basePath = 'http://localhost:9200/_public'; // Todo: Generalize

    function path(suffix) {
        return basePath + suffix;
    }

    return {

        book : $resource(path('/book/:language/:religion/:author/:title')),

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
