'use strict';

angular.module('holybook').directive('hbSrc', function() {
    return {
        link: function(scope, element, attrs) {
            attrs.$observe('hbSrc', function(url) {
                element.css({
                    'background-image': 'url(' + url +')',
                    display: 'inline-block'
                });
            });
        }
    };
});
