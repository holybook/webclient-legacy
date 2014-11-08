var holybook = angular.module('holybook', []);

holybook.controller('SearchController', function($scope) {
    $scope.searchResults = [
        {
            body : "abcdef",
            author : "Hannes Widmoser",
            title : "abc",
            section_title : "abc IV"
        }
    ];
});
