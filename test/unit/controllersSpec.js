'use strict';

/* jasmine specs for controllers go here */

describe('SearchController', function() {

  beforeEach(module("holybook"));

  it("should return a search result", inject(function($controller) {
      var scope = {};
      var controller = $controller("SearchController", {$scope:scope});
      expect(scope.searchResults.length).toBe(1);
  }));

});
